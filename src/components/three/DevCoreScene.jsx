import React, { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber'
import { Stars, AdaptiveDpr, AdaptiveEvents, Float, Text } from '@react-three/drei'
import * as THREE from 'three'
import { useTheme } from '../ThemeSwitcher'
import { usePerformance, tieredValue } from './PerformanceTier'

// Target FPS Cap
const TARGET_FPS = 60
const FRAME_INTERVAL = 1 / TARGET_FPS

/* ─────────────────────────────────────────────────────────────
   HOLOGRAPHIC PARTICLE VORTEX — spiraling particles around the core
   ───────────────────────────────────────────────────────────── */
function ParticleVortex({ accentColor, secondaryColor, count = 400 }) {
  const pointsRef = useRef()

  const [positions, randoms] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const rnd = new Float32Array(count * 2)

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = 1.5 + Math.random() * 2.5
      const height = (Math.random() - 0.5) * 4

      pos[i * 3] = Math.cos(angle) * radius
      pos[i * 3 + 1] = height
      pos[i * 3 + 2] = Math.sin(angle) * radius

      rnd[i * 2] = Math.random() * Math.PI * 2 // phase
      rnd[i * 2 + 1] = 0.3 + Math.random() * 0.7 // speed
    }

    return [pos, rnd]
  }, [count])

  useFrame((state) => {
    if (!pointsRef.current) return
    const t = state.clock.elapsedTime
    const posArr = pointsRef.current.geometry.attributes.position

    for (let i = 0; i < count; i++) {
      const phase = randoms[i * 2]
      const speed = randoms[i * 2 + 1]
      const angle = phase + t * speed * 0.5
      const baseRadius = 1.5 + (i / count) * 2.5
      const radius = baseRadius + Math.sin(t * 2 + phase) * 0.3

      posArr.setX(i, Math.cos(angle) * radius)
      posArr.setY(i, Math.sin(t * speed + phase) * 1.5)
      posArr.setZ(i, Math.sin(angle) * radius)
    }
    posArr.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color={accentColor}
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

/* ─────────────────────────────────────────────────────────────
   HOLOGRAPHIC RING — custom shader ring with scan effect
   ───────────────────────────────────────────────────────────── */
function HolographicRing({ radius, accentColor, secondaryColor, speed, tilt }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime
    meshRef.current.rotation.z = t * speed
    meshRef.current.rotation.x = tilt + Math.sin(t * 0.5) * 0.1

    // Pulse opacity
    meshRef.current.material.opacity = 0.4 + Math.sin(t * 2 + radius) * 0.15
    meshRef.current.material.emissiveIntensity = 1.5 + Math.sin(t * 3) * 0.5
  })

  return (
    <mesh ref={meshRef} rotation={[tilt, 0, 0]}>
      <torusGeometry args={[radius, 0.015, 16, 64]} />
      <meshStandardMaterial
        color={accentColor}
        emissive={accentColor}
        emissiveIntensity={1.5}
        metalness={0.95}
        roughness={0.05}
        transparent
        opacity={0.5}
      />
    </mesh>
  )
}

/* ─────────────────────────────────────────────────────────────
   3D DEVELOPER QUANTUM CORE MESH — enhanced version
   ───────────────────────────────────────────────────────────── */
function DevCoreMesh({ accentColor, secondaryColor, assembling }) {
  const coreGroupRef = useRef()
  const innerSphereRef = useRef()
  const outerWireframeRef = useRef()
  const innerGlowRef = useRef()

  useFrame((state, delta) => {
    if (!coreGroupRef.current) return
    const t = state.clock.elapsedTime

    // Core Rotation
    const rotSpeed = assembling ? 3.0 : 0.4
    coreGroupRef.current.rotation.y += delta * rotSpeed
    coreGroupRef.current.position.y = Math.sin(t * 1.2) * 0.15

    if (outerWireframeRef.current) {
      outerWireframeRef.current.rotation.x = t * 0.25
      outerWireframeRef.current.rotation.z = t * 0.18
    }

    if (innerSphereRef.current) {
      const pulse = 1 + Math.sin(t * 3.5) * (assembling ? 0.3 : 0.1)
      innerSphereRef.current.scale.set(pulse, pulse, pulse)
    }

    if (innerGlowRef.current) {
      const glowPulse = 1.2 + Math.sin(t * 2) * 0.3
      innerGlowRef.current.scale.set(glowPulse, glowPulse, glowPulse)
      innerGlowRef.current.material.opacity = 0.15 + Math.sin(t * 3) * 0.08
    }
  })

  return (
    <group ref={coreGroupRef} scale={assembling ? 1.3 : 1}>
      {/* Inner Energy Core */}
      <mesh ref={innerSphereRef}>
        <icosahedronGeometry args={[0.5, 2]} />
        <meshStandardMaterial
          color={accentColor}
          emissive={accentColor}
          emissiveIntensity={2.5}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Inner Glow Sphere */}
      <mesh ref={innerGlowRef}>
        <sphereGeometry args={[0.9, 24, 24]} />
        <meshBasicMaterial
          color={accentColor}
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Outer Geometric Wireframe */}
      <mesh ref={outerWireframeRef}>
        <icosahedronGeometry args={[1.4, 1]} />
        <meshStandardMaterial
          color={accentColor}
          emissive={accentColor}
          emissiveIntensity={assembling ? 3.0 : 1.5}
          wireframe
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Secondary wireframe layer */}
      <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <dodecahedronGeometry args={[1.1, 0]} />
        <meshStandardMaterial
          color={secondaryColor}
          emissive={secondaryColor}
          emissiveIntensity={0.8}
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  )
}

/* ─────────────────────────────────────────────────────────────
   ORBITING DATA NODES — enhanced with trails
   ───────────────────────────────────────────────────────────── */
function OrbitingDataNodes({ accentColor, secondaryColor }) {
  const groupRef = useRef()

  const nodes = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      radius: 2.2 + (i % 3) * 0.5,
      speed: 0.3 + (i % 4) * 0.12,
      phase: (Math.PI / 4) * i,
      size: 0.06 + (i % 2) * 0.04,
      tilt: (i * Math.PI) / 8,
    }))
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime

    groupRef.current.children.forEach((child, i) => {
      if (i >= nodes.length) return
      const node = nodes[i]
      const angle = t * node.speed + node.phase
      child.position.x = Math.cos(angle) * node.radius
      child.position.z = Math.sin(angle) * node.radius
      child.position.y = Math.sin(t * 1.5 + node.phase) * 0.5
      child.rotation.x += 0.03
      child.rotation.y += 0.02
    })
  })

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <mesh key={i}>
          <octahedronGeometry args={[node.size, 0]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? accentColor : secondaryColor}
            emissive={i % 2 === 0 ? accentColor : secondaryColor}
            emissiveIntensity={2.0}
            metalness={0.95}
            roughness={0.05}
          />
        </mesh>
      ))}
    </group>
  )
}

/* ─────────────────────────────────────────────────────────────
   FLOATING 3D NAME TEXT
   ───────────────────────────────────────────────────────────── */
function FloatingName({ accentColor }) {
  const groupRef = useRef()

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    groupRef.current.position.y = -2.8 + Math.sin(t * 0.8) * 0.1
    groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.05
  })

  return (
    <group ref={groupRef} position={[0, -2.8, 0]}>
      <Text
        fontSize={0.5}
        color={accentColor}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.2}
        outlineWidth={0.015}
        outlineColor="#000000"
      >
        {'PANKAJ.DEV'}
      </Text>

      {/* Underline glow */}
      <mesh position={[0, -0.35, 0]}>
        <planeGeometry args={[3.0, 0.01]} />
        <meshBasicMaterial
          color={accentColor}
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  )
}

/* ─────────────────────────────────────────────────────────────
   CAMERA RIG FOR INTERACTIVE PARALLAX
   ───────────────────────────────────────────────────────────── */
function DevCameraRig() {
  const { camera } = useThree()

  useFrame((state) => {
    const pointerX = state.pointer.x * 0.8
    const pointerY = state.pointer.y * 0.5
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointerX, 0.04)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, pointerY + 0.3, 0.04)
    camera.lookAt(0, 0, 0)
  })

  return null
}

/* ─────────────────────────────────────────────────────────────
   MAIN 3D DEV CORE SCENE — fully upgraded
   ───────────────────────────────────────────────────────────── */
export default function DevCoreScene() {
  const { theme, themes } = useTheme()
  const { tier } = usePerformance()
  const activeVars = themes[theme]?.vars || {}

  const accentColor = activeVars['--accent'] || '#7dcfff'
  const secondaryColor = activeVars['--accent-purple'] || activeVars['--accent-dark'] || '#bb9af7'

  const [assembling, setAssembling] = useState(false)
  const particleCount = tieredValue(tier, { high: 500, medium: 250, low: 100 })

  const handleCoreClick = () => {
    setAssembling(true)
    setTimeout(() => setAssembling(false), 1500)
  }

  return (
    <div
      className="w-full h-full relative cursor-pointer select-none"
      onClick={handleCoreClick}
      title="Click to pulse Dev Core"
    >
      <Canvas
        camera={{ position: [0, 0.5, 6.5], fov: 45 }}
        gl={{ alpha: true, antialias: false, powerPreference: 'default' }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} color={accentColor} intensity={3.5} />
        <pointLight position={[-10, -10, -10]} color={secondaryColor} intensity={2.5} />
        <pointLight position={[0, 5, -5]} color="#ffffff" intensity={0.8} />

        <DevCameraRig />

        <Float speed={1.0} rotationIntensity={0.15} floatIntensity={0.2}>
          <group position={[0, 0, 0]}>
            <DevCoreMesh
              accentColor={accentColor}
              secondaryColor={secondaryColor}
              assembling={assembling}
            />
            <OrbitingDataNodes
              accentColor={accentColor}
              secondaryColor={secondaryColor}
            />
          </group>
        </Float>

        {/* Holographic orbiting rings */}
        <HolographicRing radius={2.8} accentColor={accentColor} secondaryColor={secondaryColor} speed={-0.3} tilt={Math.PI / 5} />
        <HolographicRing radius={3.2} accentColor={secondaryColor} secondaryColor={accentColor} speed={0.2} tilt={-Math.PI / 3.5} />
        <HolographicRing radius={3.6} accentColor={accentColor} secondaryColor={secondaryColor} speed={-0.15} tilt={Math.PI / 2.5} />

        {/* Particle vortex */}
        <ParticleVortex
          accentColor={accentColor}
          secondaryColor={secondaryColor}
          count={particleCount}
        />

        {/* Floating name */}
        <FloatingName accentColor={accentColor} />

        {/* Stars */}
        <Stars radius={35} depth={50} count={tieredValue(tier, { high: 400, medium: 200, low: 80 })} factor={3} saturation={0} fade speed={0.6} />

        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
      </Canvas>
    </div>
  )
}
