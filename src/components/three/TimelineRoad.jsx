import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, AdaptiveDpr, CatmullRomLine } from '@react-three/drei'
import * as THREE from 'three'
import { usePerformance } from './PerformanceTier'
import { useTheme } from '../ThemeSwitcher'

/**
 * 3D Timeline Road — a glowing path with milestone nodes
 * for the Experience section
 */
function TimelinePath({ accentColor, secondaryColor }) {
  const pathRef = useRef()
  const particlesRef = useRef()

  // Create a curved path
  const curvePoints = useMemo(() => [
    new THREE.Vector3(-6, 0, 0),
    new THREE.Vector3(-3, 0.5, -1),
    new THREE.Vector3(0, 0.2, -0.5),
    new THREE.Vector3(3, -0.3, 0.5),
    new THREE.Vector3(6, 0, 0),
  ], [])

  const curve = useMemo(() =>
    new THREE.CatmullRomCurve3(curvePoints, false, 'catmullrom', 0.5),
    [curvePoints]
  )

  // Flowing particles along the path
  const particleCount = 60
  const particleData = useMemo(() => {
    const offsets = new Float32Array(particleCount)
    const speeds = new Float32Array(particleCount)
    for (let i = 0; i < particleCount; i++) {
      offsets[i] = Math.random()
      speeds[i] = 0.03 + Math.random() * 0.04
    }
    return { offsets, speeds }
  }, [])

  useFrame((state) => {
    if (!particlesRef.current) return
    const positions = particlesRef.current.geometry.attributes.position
    const t = state.clock.elapsedTime

    for (let i = 0; i < particleCount; i++) {
      const progress = (particleData.offsets[i] + t * particleData.speeds[i]) % 1
      const point = curve.getPointAt(progress)
      positions.setXYZ(i,
        point.x + Math.sin(t * 2 + i) * 0.1,
        point.y + Math.cos(t * 3 + i) * 0.08,
        point.z + Math.sin(t + i * 0.5) * 0.1
      )
    }
    positions.needsUpdate = true
  })

  const particlePositions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      const point = curve.getPointAt(i / particleCount)
      pos[i * 3] = point.x
      pos[i * 3 + 1] = point.y
      pos[i * 3 + 2] = point.z
    }
    return pos
  }, [curve])

  return (
    <group ref={pathRef}>
      {/* Glowing path tube */}
      <mesh>
        <tubeGeometry args={[curve, 64, 0.04, 8, false]} />
        <meshStandardMaterial
          color={accentColor}
          emissive={accentColor}
          emissiveIntensity={1.5}
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Outer glow tube */}
      <mesh>
        <tubeGeometry args={[curve, 64, 0.12, 8, false]} />
        <meshBasicMaterial
          color={accentColor}
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Flowing particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color={secondaryColor}
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}

function MilestoneNode({ position, experience, index, accentColor, secondaryColor }) {
  const groupRef = useRef()
  const ringRef = useRef()
  const dotRef = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(t * 1.5 + index * 2) * 0.08
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.5 + index
      ringRef.current.rotation.x = Math.sin(t * 0.3 + index) * 0.3
    }
    if (dotRef.current) {
      const pulse = 1 + Math.sin(t * 3 + index) * 0.2
      dotRef.current.scale.set(pulse, pulse, pulse)
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Central glowing dot */}
      <mesh ref={dotRef}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial color={accentColor} />
      </mesh>

      {/* Glow sphere */}
      <mesh>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshBasicMaterial
          color={accentColor}
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Rotating ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[0.35, 0.015, 8, 32]} />
        <meshStandardMaterial
          color={secondaryColor}
          emissive={secondaryColor}
          emissiveIntensity={1.5}
          metalness={0.9}
        />
      </mesh>

      {/* Role text */}
      <Text
        position={[0, 0.65, 0]}
        fontSize={0.16}
        color="white"
        anchorX="center"
        maxWidth={2.5}
        outlineWidth={0.008}
        outlineColor="black"
        textAlign="center"
      >
        {experience.role}
      </Text>

      {/* Company text */}
      <Text
        position={[0, 0.4, 0]}
        fontSize={0.11}
        color={accentColor}
        anchorX="center"
        outlineWidth={0.005}
        outlineColor="black"
      >
        {experience.company}
      </Text>

      {/* Period text */}
      <Text
        position={[0, -0.45, 0]}
        fontSize={0.09}
        color="#888888"
        anchorX="center"
        outlineWidth={0.005}
        outlineColor="black"
      >
        {experience.period}
      </Text>
    </group>
  )
}

function TimelineScene({ experiences }) {
  const groupRef = useRef()
  const { theme, themes } = useTheme()
  const activeVars = themes[theme]?.vars || {}
  const accentColor = activeVars['--accent'] || '#7dcfff'
  const secondaryColor = activeVars['--accent-purple'] || '#a855f7'

  // Position milestones along the curve
  const milestonePositions = useMemo(() => {
    const positions = []
    const count = experiences.length
    for (let i = 0; i < count; i++) {
      const t = (i + 0.5) / count
      const x = -6 + t * 12
      const y = 0.3 + Math.sin(t * Math.PI) * 0.3
      const z = Math.sin(t * Math.PI * 2) * -0.5
      positions.push([x, y, z])
    }
    return positions
  }, [experiences.length])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} color={accentColor} intensity={2.0} />
      <pointLight position={[-5, 3, -5]} color={secondaryColor} intensity={1.5} />

      <TimelinePath accentColor={accentColor} secondaryColor={secondaryColor} />

      {experiences.map((exp, i) => (
        <MilestoneNode
          key={i}
          position={milestonePositions[i]}
          experience={exp}
          index={i}
          accentColor={accentColor}
          secondaryColor={secondaryColor}
        />
      ))}
    </group>
  )
}

export default function TimelineRoad({ experiences }) {
  const { tier } = usePerformance()
  if (tier === 'low') return null

  return (
    <div className="w-full h-[350px] md:h-[400px] relative">
      <Canvas
        camera={{ position: [0, 2.5, 7], fov: 50 }}
        gl={{ alpha: true, antialias: false, powerPreference: 'default' }}
        dpr={[1, 1.5]}
      >
        <TimelineScene experiences={experiences} />
        <AdaptiveDpr pixelated />
      </Canvas>
    </div>
  )
}
