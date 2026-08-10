import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { usePerformance, tieredValue } from './PerformanceTier'

/**
 * Section transition warp effect — starfield streaks
 * Intensity driven by scrollVelocity
 */
export default function SectionTransition3D({ scrollVelocity = 0 }) {
  const { tier } = usePerformance()
  const streaksRef = useRef()
  const count = tieredValue(tier, { high: 200, medium: 100, low: 50 })

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50
      vel[i] = Math.random() * 0.5 + 0.3
    }

    return [pos, vel]
  }, [count])

  useFrame(() => {
    if (!streaksRef.current) return
    const absVel = Math.abs(scrollVelocity)
    const warpActive = absVel > 3

    if (!warpActive) {
      streaksRef.current.visible = false
      return
    }

    streaksRef.current.visible = true
    const posArr = streaksRef.current.geometry.attributes.position

    for (let i = 0; i < count; i++) {
      let z = posArr.getZ(i)
      z += velocities[i] * absVel * 0.15

      if (z > 25) {
        z = -25
        posArr.setX(i, (Math.random() - 0.5) * 30)
        posArr.setY(i, (Math.random() - 0.5) * 30)
      }

      posArr.setZ(i, z)
    }
    posArr.needsUpdate = true

    // Size proportional to velocity
    streaksRef.current.material.size = Math.min(absVel * 0.015, 0.3)
    streaksRef.current.material.opacity = Math.min(absVel * 0.02, 0.6)
  })

  return (
    <points ref={streaksRef} visible={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#ffffff"
        transparent
        opacity={0}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}
