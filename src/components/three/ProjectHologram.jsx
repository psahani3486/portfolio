import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { AdaptiveDpr } from '@react-three/drei'
import * as THREE from 'three'
import { usePerformance, tieredValue } from './PerformanceTier'
import { useTheme } from '../ThemeSwitcher'

/**
 * ProjectHologram — 3D holographic floating panel for project cards
 * Renders a wireframe frame with scan-line effect and glow
 */
function HologramPanel({ width = 3, height = 2, accentColor, secondaryColor, featured }) {
  const groupRef = useRef()
  const scanRef = useRef()
  const frameRef = useRef()

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime

    // Gentle floating
    groupRef.current.position.y = Math.sin(t * 1.2) * 0.08
    groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.05
    groupRef.current.rotation.x = Math.cos(t * 0.3) * 0.02

    // Scan line moving down the panel
    if (scanRef.current) {
      const scanY = ((t * 0.8) % 1) * height - height / 2
      scanRef.current.position.y = scanY
    }

    // Frame pulse for featured
    if (frameRef.current && featured) {
      const pulse = 1 + Math.sin(t * 2) * 0.02
      frameRef.current.scale.set(pulse, pulse, 1)
    }
  })

  const hw = width / 2
  const hh = height / 2

  // Frame edge geometry — 4 edges as thin boxes
  const edges = useMemo(() => [
    { pos: [0, hh, 0], scale: [width + 0.04, 0.02, 0.02] },    // top
    { pos: [0, -hh, 0], scale: [width + 0.04, 0.02, 0.02] },   // bottom
    { pos: [-hw, 0, 0], scale: [0.02, height, 0.02] },          // left
    { pos: [hw, 0, 0], scale: [0.02, height, 0.02] },           // right
  ], [width, height, hw, hh])

  // Corner nodes
  const corners = useMemo(() => [
    [-hw, hh, 0], [hw, hh, 0], [-hw, -hh, 0], [hw, -hh, 0]
  ], [hw, hh])

  return (
    <group ref={groupRef}>
      {/* Glass panel background */}
      <mesh>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial
          color={accentColor}
          transparent
          opacity={0.04}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Grid lines */}
      {Array.from({ length: 5 }).map((_, i) => {
        const y = -hh + (i + 1) * (height / 6)
        return (
          <mesh key={`h-${i}`} position={[0, y, 0.001]}>
            <planeGeometry args={[width * 0.9, 0.003]} />
            <meshBasicMaterial color={accentColor} transparent opacity={0.08} />
          </mesh>
        )
      })}
      {Array.from({ length: 3 }).map((_, i) => {
        const x = -hw + (i + 1) * (width / 4)
        return (
          <mesh key={`v-${i}`} position={[x, 0, 0.001]}>
            <planeGeometry args={[0.003, height * 0.9]} />
            <meshBasicMaterial color={accentColor} transparent opacity={0.06} />
          </mesh>
        )
      })}

      {/* Frame edges */}
      <group ref={frameRef}>
        {edges.map((edge, i) => (
          <mesh key={i} position={edge.pos} scale={edge.scale}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color={featured ? secondaryColor : accentColor}
              emissive={featured ? secondaryColor : accentColor}
              emissiveIntensity={2.0}
              metalness={0.9}
            />
          </mesh>
        ))}

        {/* Corner nodes */}
        {corners.map((pos, i) => (
          <mesh key={`c-${i}`} position={pos}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshBasicMaterial color="white" />
          </mesh>
        ))}
      </group>

      {/* Moving scan line */}
      <mesh ref={scanRef} position={[0, 0, 0.002]}>
        <planeGeometry args={[width, 0.04]} />
        <meshBasicMaterial
          color={accentColor}
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Outer glow */}
      <mesh position={[0, 0, -0.1]}>
        <planeGeometry args={[width + 0.6, height + 0.6]} />
        <meshBasicMaterial
          color={accentColor}
          transparent
          opacity={0.03}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  )
}

function HologramScene({ featured }) {
  const { theme, themes } = useTheme()
  const activeVars = themes[theme]?.vars || {}
  const accentColor = activeVars['--accent'] || '#7dcfff'
  const secondaryColor = activeVars['--accent-purple'] || '#a855f7'

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[3, 3, 3]} color={accentColor} intensity={2.0} />

      <HologramPanel
        width={3.5}
        height={2.2}
        accentColor={accentColor}
        secondaryColor={secondaryColor}
        featured={featured}
      />
    </>
  )
}

export default function ProjectHologram({ featured = false }) {
  const { tier } = usePerformance()
  if (tier === 'low') return null

  return (
    <div className="w-full h-full absolute inset-0 pointer-events-none opacity-60">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
        dpr={[1, 1.25]}
      >
        <HologramScene featured={featured} />
        <AdaptiveDpr pixelated />
      </Canvas>
    </div>
  )
}
