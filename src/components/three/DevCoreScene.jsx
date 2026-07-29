import React, { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stars, AdaptiveDpr, AdaptiveEvents, Float } from '@react-three/drei'
import * as THREE from 'three'
import { useTheme } from '../ThemeSwitcher'

/* ─────────────────────────────────────────────────────────────
   3D DEVELOPER QUANTUM CORE MESH
   ───────────────────────────────────────────────────────────── */
function DevCoreMesh({ accentColor, secondaryColor, assembling }) {
  const coreGroupRef = useRef()
  const innerSphereRef = useRef()
  const outerWireframeRef = useRef()
  const ring1Ref = useRef()
  const ring2Ref = useRef()

  useFrame((state, delta) => {
    if (!coreGroupRef.current) return
    const t = state.clock.elapsedTime

    // Core Rotation
    const rotSpeed = assembling ? 2.5 : 0.35
    coreGroupRef.current.rotation.y += delta * rotSpeed
    coreGroupRef.current.position.y = Math.sin(t * 1.5) * 0.15

    if (outerWireframeRef.current) {
      outerWireframeRef.current.rotation.x = t * 0.2
      outerWireframeRef.current.rotation.z = t * 0.15
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = -t * 0.4
      ring1Ref.current.rotation.x = Math.sin(t * 0.6) * 0.3
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = t * 0.3
      ring2Ref.current.rotation.y = Math.cos(t * 0.5) * 0.4
    }

    if (innerSphereRef.current) {
      const pulse = 1 + Math.sin(t * 3.5) * (assembling ? 0.25 : 0.08)
      innerSphereRef.current.scale.set(pulse, pulse, pulse)
    }
  })

  return (
    <group ref={coreGroupRef} scale={assembling ? 1.2 : 1}>
      {/* Inner Energy Core */}
      <mesh ref={innerSphereRef} position={[0, 0, 0]}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshBasicMaterial color={accentColor} transparent opacity={0.9} />
      </mesh>

      {/* Outer Geometric Wireframe */}
      <mesh ref={outerWireframeRef}>
        <icosahedronGeometry args={[1.35, 1]} />
        <meshStandardMaterial
          color={accentColor}
          emissive={accentColor}
          emissiveIntensity={assembling ? 2.5 : 1.2}
          wireframe
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Primary Tech Orbit Ring */}
      <group ref={ring1Ref}>
        <mesh>
          <torusGeometry args={[2.0, 0.035, 16, 100]} />
          <meshStandardMaterial
            color={accentColor}
            emissive={accentColor}
            emissiveIntensity={1.5}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        {/* Orbital Node Beads */}
        {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, idx) => (
          <mesh
            key={idx}
            position={[Math.cos(angle) * 2.0, Math.sin(angle) * 2.0, 0]}
          >
            <sphereGeometry args={[0.09, 16, 16]} />
            <meshBasicMaterial color={secondaryColor} />
          </mesh>
        ))}
      </group>

      {/* Secondary Tech Ring */}
      <group ref={ring2Ref}>
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[2.4, 0.025, 16, 100]} />
          <meshStandardMaterial
            color={secondaryColor}
            emissive={secondaryColor}
            emissiveIntensity={1.3}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </group>
    </group>
  )
}

/* ─────────────────────────────────────────────────────────────
   ORBITING DATA NODES
   ───────────────────────────────────────────────────────────── */
function OrbitingDataNodes({ accentColor, secondaryColor }) {
  const groupRef = useRef()

  const nodes = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      radius: 2.8 + (i % 3) * 0.4,
      speed: 0.4 + (i % 4) * 0.15,
      phase: (Math.PI / 4) * i,
      size: 0.1 + (i % 2) * 0.05,
    }))
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime

    groupRef.current.children.forEach((child, i) => {
      const node = nodes[i]
      const angle = t * node.speed + node.phase
      child.position.x = Math.cos(angle) * node.radius
      child.position.z = Math.sin(angle) * node.radius
      child.position.y = Math.sin(t * 1.2 + node.phase) * 0.4
      child.rotation.x += 0.02
      child.rotation.y += 0.02
    })
  })

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <mesh key={i}>
          <boxGeometry args={[node.size, node.size, node.size]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? accentColor : secondaryColor}
            emissive={i % 2 === 0 ? accentColor : secondaryColor}
            emissiveIntensity={1.5}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      ))}
    </group>
  )
}

/* ─────────────────────────────────────────────────────────────
   CODE MATRIX BACKGROUND PARTICLES
   ───────────────────────────────────────────────────────────── */
function CodeParticles({ color }) {
  const pointsRef = useRef()

  const [positions, colors] = useMemo(() => {
    const count = 350
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const baseColor = new THREE.Color(color || '#7dcfff')

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 22
      pos[i * 3 + 1] = (Math.random() - 0.5) * 22
      pos[i * 3 + 2] = (Math.random() - 0.5) * 22

      col[i * 3] = baseColor.r * (0.6 + Math.random() * 0.4)
      col[i * 3 + 1] = baseColor.g * (0.6 + Math.random() * 0.4)
      col[i * 3 + 2] = baseColor.b * (0.6 + Math.random() * 0.4)
    }

    return [pos, col]
  }, [color])

  useFrame((state) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/* ─────────────────────────────────────────────────────────────
   CAMERA RIG FOR INTERACTIVE PARALLAX
   ───────────────────────────────────────────────────────────── */
function DevCameraRig() {
  const { camera } = useThree()

  useFrame((state) => {
    const pointerX = state.pointer.x * 0.6
    const pointerY = state.pointer.y * 0.4
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointerX, 0.05)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, pointerY + 0.2, 0.05)
    camera.lookAt(0, 0, 0)
  })

  return null
}

/* ─────────────────────────────────────────────────────────────
   MAIN 3D DEV CORE SCENE
   ───────────────────────────────────────────────────────────── */
export default function DevCoreScene() {
  const { theme, themes } = useTheme()
  const activeVars = themes[theme]?.vars || {}

  const accentColor = activeVars['--accent'] || '#7dcfff'
  const secondaryColor = activeVars['--accent-purple'] || activeVars['--accent-dark'] || '#bb9af7'

  const [assembling, setAssembling] = useState(false)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  const handleCoreClick = () => {
    setAssembling(true)
    setTimeout(() => setAssembling(false), 1200)
  }

  return (
    <div
      className="w-full h-full relative cursor-pointer select-none"
      onClick={handleCoreClick}
      title="Click to pulse Dev Core"
    >
      <Canvas
        camera={{ position: [0, 0.5, 6.2], fov: 45 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        dpr={[1, isMobile ? 1.25 : 1.75]}
      >
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} color={accentColor} intensity={3.0} />
        <pointLight position={[-10, -10, -10]} color={secondaryColor} intensity={2.0} />

        <DevCameraRig />

        <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.5}>
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

        <CodeParticles color={accentColor} />
        <Stars radius={40} depth={50} count={isMobile ? 300 : 800} factor={4} saturation={0} fade speed={1} />

        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
      </Canvas>
    </div>
  )
}
