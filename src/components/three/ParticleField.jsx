import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { usePerformance, tieredValue } from './PerformanceTier'

/**
 * Global 3D particle field — depth-creating ambient particles
 * Reacts to scroll velocity (stretches into streaks) and mouse position
 */
export default function ParticleField({ scrollVelocity = 0, accentColor = '#7dcfff', secondaryColor = '#a855f7' }) {
  const pointsRef = useRef()
  const { tier } = usePerformance()
  const count = tieredValue(tier, { high: 2500, medium: 1200, low: 500 })

  const [positions, sizes, randoms] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const siz = new Float32Array(count)
    const rnd = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      // Distribute in a large box around the camera path
      pos[i * 3] = (Math.random() - 0.5) * 60
      pos[i * 3 + 1] = (Math.random() - 0.5) * 200
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40

      siz[i] = Math.random() * 0.08 + 0.02

      rnd[i * 3] = Math.random() * Math.PI * 2
      rnd[i * 3 + 1] = Math.random() * 0.5 + 0.2  // speed factor
      rnd[i * 3 + 2] = Math.random() // brightness variation
    }

    return [pos, siz, rnd]
  }, [count])

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uScrollVelocity: { value: 0 },
    uColor1: { value: new THREE.Color(accentColor) },
    uColor2: { value: new THREE.Color(secondaryColor) },
    uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
  }), [])

  useFrame((state) => {
    if (!pointsRef.current) return
    const t = state.clock.elapsedTime

    uniforms.uTime.value = t
    uniforms.uScrollVelocity.value = THREE.MathUtils.lerp(
      uniforms.uScrollVelocity.value,
      Math.abs(scrollVelocity),
      0.1
    )
    uniforms.uColor1.value.set(accentColor)
    uniforms.uColor2.value.set(secondaryColor)

    // Slow global rotation for organic feel
    pointsRef.current.rotation.y = t * 0.008
    pointsRef.current.rotation.x = Math.sin(t * 0.01) * 0.05
  })

  const vertexShader = /* glsl */ `
    attribute float aSize;
    attribute vec3 aRandom;
    uniform float uTime;
    uniform float uScrollVelocity;
    uniform float uPixelRatio;
    varying float vBrightness;
    varying float vColorMix;

    void main() {
      vec3 pos = position;

      // Organic floating motion
      float phase = aRandom.x;
      float speed = aRandom.y;
      pos.x += sin(uTime * speed + phase) * 0.8;
      pos.y += cos(uTime * speed * 0.7 + phase) * 0.5;
      pos.z += sin(uTime * speed * 0.5 + phase * 2.0) * 0.6;

      // Scroll velocity stretches particles vertically (warp effect)
      float warp = min(uScrollVelocity * 0.03, 3.0);
      pos.y += pos.y * warp * 0.15;

      vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
      gl_Position = projectionMatrix * mvPos;

      // Size attenuation
      float sizeScale = 1.0 + warp * 0.5;
      gl_PointSize = aSize * uPixelRatio * 120.0 * sizeScale / -mvPos.z;

      // Varyings
      vBrightness = aRandom.z;
      vColorMix = sin(pos.y * 0.1 + uTime * 0.3) * 0.5 + 0.5;
    }
  `

  const fragmentShader = /* glsl */ `
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform float uTime;
    varying float vBrightness;
    varying float vColorMix;

    void main() {
      // Circular particle shape
      float dist = length(gl_PointCoord - vec2(0.5));
      if (dist > 0.5) discard;

      float glow = exp(-dist * 6.0);
      vec3 color = mix(uColor1, uColor2, vColorMix);

      // Twinkle
      float twinkle = sin(uTime * 2.0 + vBrightness * 30.0) * 0.3 + 0.7;
      float alpha = glow * (0.3 + vBrightness * 0.5) * twinkle;

      gl_FragColor = vec4(color * 1.5, alpha);
    }
  `

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aSize"
          count={count}
          array={sizes}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aRandom"
          count={count}
          array={randoms}
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
