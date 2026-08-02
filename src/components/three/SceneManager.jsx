import React, { useRef, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { AdaptiveDpr, AdaptiveEvents, Stars } from '@react-three/drei'
import * as THREE from 'three'
import ParticleField from './ParticleField'
import PostEffects from './PostEffects'
import SectionTransition3D from './SectionTransition3D'
import { usePerformance, tieredValue } from './PerformanceTier'
import { useTheme } from '../ThemeSwitcher'

/**
 * SceneManager — persistent full-viewport Three.js canvas
 * Renders behind all HTML content with scroll-driven camera
 */

function ScrollCamera({ totalProgress, scrollVelocity }) {
  const { camera } = useThree()
  const targetPos = useRef(new THREE.Vector3(0, 0, 15))
  const mouseRef = useRef({ x: 0, y: 0 })

  useFrame((state) => {
    // Camera path: dolly along Y based on total scroll
    // Creates sensation of descending through space
    const scrollY = -totalProgress * 80

    // Mouse parallax
    const mx = state.pointer.x * 0.8
    const my = state.pointer.y * 0.4

    targetPos.current.set(
      mx,
      scrollY + my + 2,
      15
    )

    // Smooth interpolation
    camera.position.lerp(targetPos.current, 0.06)

    // Look slightly ahead of scroll direction
    const lookTarget = new THREE.Vector3(0, scrollY - 2, 0)
    const currentLookAt = new THREE.Vector3()
    camera.getWorldDirection(currentLookAt)
    camera.lookAt(
      THREE.MathUtils.lerp(camera.position.x, lookTarget.x, 0.05),
      THREE.MathUtils.lerp(camera.position.y - 5, lookTarget.y, 0.05),
      0
    )
  })

  return null
}

function SceneContent({ totalProgress, scrollVelocity, accentColor, secondaryColor }) {
  const { tier } = usePerformance()
  const starCount = tieredValue(tier, { high: 800, medium: 400, low: 150 })

  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.15} />
      <pointLight position={[10, 10, 10]} color={accentColor} intensity={1.0} distance={50} />
      <pointLight position={[-10, -10, -10]} color={secondaryColor} intensity={0.8} distance={50} />

      {/* Scroll camera */}
      <ScrollCamera totalProgress={totalProgress} scrollVelocity={scrollVelocity} />

      {/* Global particle field */}
      <ParticleField
        scrollVelocity={scrollVelocity}
        accentColor={accentColor}
        secondaryColor={secondaryColor}
      />

      {/* Warp streaks on fast scroll */}
      <SectionTransition3D scrollVelocity={scrollVelocity} />

      {/* Star background */}
      <Stars
        radius={60}
        depth={80}
        count={starCount}
        factor={3}
        saturation={0}
        fade
        speed={0.5}
      />

      {/* Post-processing */}
      {tier !== 'low' && <PostEffects scrollVelocity={scrollVelocity} />}

      {/* Performance adapters */}
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
    </>
  )
}

export default function SceneManager({ totalProgress = 0, scrollVelocity = 0 }) {
  const { tier } = usePerformance()
  const { theme, themes } = useTheme()
  const activeVars = themes[theme]?.vars || {}
  const accentColor = activeVars['--accent'] || '#7dcfff'
  const secondaryColor = activeVars['--accent-purple'] || '#a855f7'

  if (tier === 'low') return null

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.85 }}
    >
      <Canvas
        camera={{ position: [0, 2, 15], fov: 60 }}
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: tier === 'high' ? 'high-performance' : 'default',
          stencil: false,
          depth: true,
        }}
        dpr={tieredValue(tier, { high: [1, 2], medium: [1, 1.5], low: [1, 1] })}
      >
        <Suspense fallback={null}>
          <SceneContent
            totalProgress={totalProgress}
            scrollVelocity={scrollVelocity}
            accentColor={accentColor}
            secondaryColor={secondaryColor}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
