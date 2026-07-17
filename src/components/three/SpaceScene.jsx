import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stars, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'

/* ───── Floating Particles ───── */
function Particles({ count = 80 }) {
  const mesh = useRef()
  const { viewport } = useThree()

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15
      sizes[i] = Math.random() * 2 + 0.5
    }
    return { positions, sizes }
  }, [count])

  useFrame((state) => {
    if (!mesh.current) return
    const time = state.clock.elapsedTime
    const positions = mesh.current.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 1] += Math.sin(time * 0.3 + i) * 0.002
      positions[i * 3] += Math.cos(time * 0.2 + i * 0.5) * 0.001
    }
    mesh.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={particles.sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#6366f1"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

/* ───── Nebula (glowing orbs) ───── */
function Nebula() {
  const group = useRef()

  useFrame((state) => {
    if (!group.current) return
    group.current.rotation.y = state.clock.elapsedTime * 0.02
    group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.05
  })

  const orbs = useMemo(
    () => [
      { pos: [3, 1.5, -5], color: '#6366f1', scale: 2.5 },
      { pos: [-4, -1, -6], color: '#a855f7', scale: 2 },
      { pos: [1, -2, -4], color: '#06b6d4', scale: 1.5 },
      { pos: [-2, 3, -7], color: '#ec4899', scale: 1.8 },
    ],
    []
  )

  return (
    <group ref={group}>
      {orbs.map((orb, i) => (
        <mesh key={i} position={orb.pos}>
          <sphereGeometry args={[orb.scale, 16, 16]} />
          <meshBasicMaterial
            color={orb.color}
            transparent
            opacity={0.06}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  )
}

/* ───── Floating geometry ───── */
function FloatingShapes() {
  const group = useRef()

  useFrame((state) => {
    if (!group.current) return
    const t = state.clock.elapsedTime
    group.current.children.forEach((child, i) => {
      child.rotation.x = t * 0.15 + i
      child.rotation.y = t * 0.1 + i * 0.5
      child.position.y = Math.sin(t * 0.4 + i * 2) * 0.3 + child.userData.baseY
    })
  })

  const shapes = useMemo(
    () => [
      { pos: [5, 2, -3], baseY: 2, scale: 0.3, type: 'icosahedron' },
      { pos: [-5, -1.5, -4], baseY: -1.5, scale: 0.25, type: 'octahedron' },
      { pos: [3, -3, -5], baseY: -3, scale: 0.2, type: 'dodecahedron' },
    ],
    []
  )

  return (
    <group ref={group}>
      {shapes.map((shape, i) => (
        <mesh key={i} position={shape.pos} userData={{ baseY: shape.baseY }}>
          {shape.type === 'icosahedron' && <icosahedronGeometry args={[shape.scale, 0]} />}
          {shape.type === 'octahedron' && <octahedronGeometry args={[shape.scale, 0]} />}
          {shape.type === 'dodecahedron' && <dodecahedronGeometry args={[shape.scale, 0]} />}
          <meshBasicMaterial
            color="#6366f1"
            wireframe
            transparent
            opacity={0.15}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  )
}

/* ───── Mouse Parallax Camera Rig ───── */
function CameraRig() {
  const { camera } = useThree()
  const mouse = useRef({ x: 0, y: 0 })

  React.useEffect(() => {
    const handleMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  useFrame(() => {
    camera.position.x += (mouse.current.x * 0.3 - camera.position.x) * 0.02
    camera.position.y += (-mouse.current.y * 0.2 - camera.position.y) * 0.02
    camera.lookAt(0, 0, 0)
  })

  return null
}

/* ───── Main Scene Component ───── */
export default function SpaceScene() {
  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Detect mobile for simplified scene
  const isMobile =
    typeof window !== 'undefined' && window.innerWidth < 768

  if (prefersReducedMotion) {
    return null // Graceful fallback — CSS gradient will show behind
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      dpr={[1, isMobile ? 1.5 : 2]}
      style={{
        position: 'absolute',
        inset: 0,
        background: 'transparent',
      }}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
    >
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />

      {/* Ambient stars */}
      <Stars
        radius={80}
        depth={60}
        count={isMobile ? 1000 : 3000}
        factor={3}
        saturation={0}
        fade
        speed={0.5}
      />

      {/* Custom particles */}
      <Particles count={isMobile ? 30 : 80} />

      {/* Nebula glow orbs */}
      <Nebula />

      {/* Wireframe geometry */}
      {!isMobile && <FloatingShapes />}

      {/* Mouse parallax */}
      {!isMobile && <CameraRig />}

      {/* Post-processing */}
      {!isMobile && (
        <EffectComposer>
          <Bloom
            intensity={0.3}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
          <Vignette eskil={false} offset={0.1} darkness={0.8} />
        </EffectComposer>
      )}
    </Canvas>
  )
}
