import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, AdaptiveDpr } from '@react-three/drei'
import * as THREE from 'three'
import { usePerformance, tieredValue } from './PerformanceTier'
import { useTheme } from '../ThemeSwitcher'

/**
 * 3D Contact Portal — swirling vortex with particles
 */
function VortexRing({ radius, thickness, speed, offset, color, opacity }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime
    meshRef.current.rotation.z = t * speed
    meshRef.current.rotation.x = Math.sin(t * 0.5 + offset) * 0.3
    meshRef.current.rotation.y = Math.cos(t * 0.3 + offset) * 0.2

    const pulse = 1 + Math.sin(t * 2 + offset) * 0.1
    meshRef.current.scale.set(pulse, pulse, 1)
  })

  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[radius, thickness, 16, 64]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.5}
        metalness={0.9}
        roughness={0.1}
        transparent
        opacity={opacity}
      />
    </mesh>
  )
}

function PortalParticles({ count, accentColor, secondaryColor }) {
  const pointsRef = useRef()

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = 1.5 + Math.random() * 2
      pos[i * 3] = Math.cos(angle) * radius
      pos[i * 3 + 1] = Math.sin(angle) * radius
      pos[i * 3 + 2] = (Math.random() - 0.5) * 3
    }
    return pos
  }, [count])

  useFrame((state) => {
    if (!pointsRef.current) return
    const t = state.clock.elapsedTime
    const posArr = pointsRef.current.geometry.attributes.position

    for (let i = 0; i < count; i++) {
      const x = posArr.getX(i)
      const y = posArr.getY(i)

      // Spiral inward
      const angle = Math.atan2(y, x) + 0.02
      const radius = Math.sqrt(x * x + y * y)
      const newRadius = radius > 0.3 ? radius - 0.008 : 1.5 + Math.random() * 2

      posArr.setX(i, Math.cos(angle) * newRadius)
      posArr.setY(i, Math.sin(angle) * newRadius)
      posArr.setZ(i, posArr.getZ(i) + 0.01)

      // Reset particles that go too far
      if (posArr.getZ(i) > 2 || newRadius < 0.3) {
        const resetAngle = Math.random() * Math.PI * 2
        const resetRadius = 1.5 + Math.random() * 2
        posArr.setX(i, Math.cos(resetAngle) * resetRadius)
        posArr.setY(i, Math.sin(resetAngle) * resetRadius)
        posArr.setZ(i, -1.5)
      }
    }
    posArr.needsUpdate = true

    pointsRef.current.rotation.z = t * 0.1
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
        size={0.04}
        color={accentColor}
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function PortalCore({ accentColor, secondaryColor }) {
  const coreRef = useRef()

  useFrame((state) => {
    if (!coreRef.current) return
    const t = state.clock.elapsedTime
    const pulse = 1 + Math.sin(t * 2) * 0.15
    coreRef.current.scale.set(pulse, pulse, pulse)
  })

  return (
    <group ref={coreRef}>
      {/* Inner glow */}
      <mesh>
        <sphereGeometry args={[0.5, 24, 24]} />
        <meshBasicMaterial
          color={accentColor}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Outer glow */}
      <mesh>
        <sphereGeometry args={[0.8, 24, 24]} />
        <meshBasicMaterial
          color={accentColor}
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  )
}

function PortalScene() {
  const groupRef = useRef()
  const { theme, themes } = useTheme()
  const { tier } = usePerformance()
  const activeVars = themes[theme]?.vars || {}
  const accentColor = activeVars['--accent'] || '#7dcfff'
  const secondaryColor = activeVars['--accent-purple'] || '#a855f7'
  const particleCount = tieredValue(tier, { high: 300, medium: 150, low: 80 })

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 3]} color={accentColor} intensity={3.0} />
      <pointLight position={[0, 0, -3]} color={secondaryColor} intensity={2.0} />

      <PortalCore accentColor={accentColor} secondaryColor={secondaryColor} />

      {/* Concentric vortex rings */}
      <VortexRing radius={1.2} thickness={0.02} speed={0.8} offset={0} color={accentColor} opacity={0.5} />
      <VortexRing radius={1.6} thickness={0.015} speed={-0.6} offset={1} color={secondaryColor} opacity={0.4} />
      <VortexRing radius={2.0} thickness={0.012} speed={0.4} offset={2} color={accentColor} opacity={0.3} />
      <VortexRing radius={2.5} thickness={0.01} speed={-0.3} offset={3} color={secondaryColor} opacity={0.2} />

      <PortalParticles
        count={particleCount}
        accentColor={accentColor}
        secondaryColor={secondaryColor}
      />

      {/* Portal label */}
      <Text
        position={[0, -2.8, 0]}
        fontSize={0.2}
        color={accentColor}
        anchorX="center"
        outlineWidth={0.008}
        outlineColor="black"
        letterSpacing={0.15}
      >
        TRANSMIT MESSAGE
      </Text>
    </group>
  )
}

export default function ContactPortal() {
  const { tier } = usePerformance()
  if (tier === 'low') return null

  return (
    <div className="w-full h-[350px] md:h-[420px] relative">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ alpha: true, antialias: false, powerPreference: 'default' }}
        dpr={[1, 1.5]}
      >
        <PortalScene />
        <AdaptiveDpr pixelated />
      </Canvas>
    </div>
  )
}
