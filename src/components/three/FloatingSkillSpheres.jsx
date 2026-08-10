import React, { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame, extend } from '@react-three/fiber'
import { Float, Text, AdaptiveDpr } from '@react-three/drei'
import * as THREE from 'three'
import { usePerformance, tieredValue } from './PerformanceTier'
import { useTheme } from '../ThemeSwitcher'

/**
 * Interactive 3D Skill Sphere — each category is a glowing polyhedron
 * that orbits and reveals skills on hover
 */
const GEOMETRIES = ['icosahedron', 'octahedron', 'dodecahedron', 'tetrahedron', 'icosahedron', 'octahedron']

function SkillNode({ category, index, total, hovered, onHover, onUnhover }) {
  const meshRef = useRef()
  const glowRef = useRef()
  const textGroupRef = useRef()
  const isHovered = hovered === index

  // Position on a circle
  const angle = (index / total) * Math.PI * 2
  const radius = 3.5
  const basePos = useMemo(() => [
    Math.cos(angle) * radius,
    Math.sin(angle * 0.5) * 0.8,
    Math.sin(angle) * radius,
  ], [angle, radius])

  const color = useMemo(() => new THREE.Color(category.color), [category.color])

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime

    // Orbit slowly
    const orbitAngle = angle + t * 0.15
    meshRef.current.position.x = Math.cos(orbitAngle) * radius
    meshRef.current.position.z = Math.sin(orbitAngle) * radius
    meshRef.current.position.y = Math.sin(t * 0.8 + index) * 0.4

    // Self rotation
    meshRef.current.rotation.x = t * 0.3
    meshRef.current.rotation.y = t * 0.2

    // Scale on hover
    const targetScale = isHovered ? 1.6 : 1
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.08
    )

    // Glow pulse
    if (glowRef.current) {
      const pulse = 1 + Math.sin(t * 2 + index) * 0.3
      glowRef.current.material.opacity = isHovered ? 0.4 * pulse : 0.15 * pulse
      glowRef.current.scale.set(pulse * 1.8, pulse * 1.8, pulse * 1.8)
    }

    // Text group follows mesh
    if (textGroupRef.current) {
      textGroupRef.current.position.copy(meshRef.current.position)
      textGroupRef.current.position.y += isHovered ? 1.8 : 1.2
      textGroupRef.current.lookAt(state.camera.position)
      textGroupRef.current.visible = isHovered
    }
  })

  const GeometryComponent = useMemo(() => {
    const type = GEOMETRIES[index % GEOMETRIES.length]
    switch (type) {
      case 'octahedron': return <octahedronGeometry args={[0.5, 0]} />
      case 'dodecahedron': return <dodecahedronGeometry args={[0.5, 0]} />
      case 'tetrahedron': return <tetrahedronGeometry args={[0.6, 0]} />
      default: return <icosahedronGeometry args={[0.5, 0]} />
    }
  }, [index])

  return (
    <>
      <group
        ref={meshRef}
        position={basePos}
        onPointerOver={(e) => { e.stopPropagation(); onHover(index) }}
        onPointerOut={() => onUnhover()}
      >
        {/* Main polyhedron */}
        <mesh>
          {GeometryComponent}
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={isHovered ? 2.0 : 0.8}
            wireframe={!isHovered}
            transparent
            opacity={isHovered ? 0.9 : 0.7}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* Glow sphere behind */}
        <mesh ref={glowRef}>
          <sphereGeometry args={[0.6, 16, 16]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.15}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Category label */}
        <Text
          position={[0, -0.9, 0]}
          fontSize={0.18}
          color="white"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter-Bold.woff"
          outlineWidth={0.01}
          outlineColor="black"
        >
          {category.title.toUpperCase()}
        </Text>
      </group>

      {/* Expanded skill tags */}
      <group ref={textGroupRef}>
        {category.skills.map((skill, si) => (
          <Text
            key={si}
            position={[0, -si * 0.28, 0]}
            fontSize={0.14}
            color={category.color}
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.008}
            outlineColor="black"
          >
            {skill}
          </Text>
        ))}
      </group>
    </>
  )
}

function ConnectionBeams({ categories, accentColor }) {
  const linesRef = useRef()
  const count = categories.length

  useFrame((state) => {
    if (!linesRef.current) return
    linesRef.current.rotation.y = state.clock.elapsedTime * 0.05
  })

  const points = useMemo(() => {
    const pts = []
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      const r = 3.5
      pts.push(new THREE.Vector3(Math.cos(angle) * r, 0, Math.sin(angle) * r))
    }
    return pts
  }, [count])

  return (
    <group ref={linesRef}>
      {points.map((p1, i) =>
        points.slice(i + 1).map((p2, j) => {
          const curve = new THREE.QuadraticBezierCurve3(
            p1,
            new THREE.Vector3(
              (p1.x + p2.x) * 0.5,
              0.8,
              (p1.z + p2.z) * 0.5
            ),
            p2
          )
          return (
            <mesh key={`${i}-${j}`}>
              <tubeGeometry args={[curve, 20, 0.008, 4, false]} />
              <meshBasicMaterial
                color={accentColor}
                transparent
                opacity={0.12}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
          )
        })
      )}
    </group>
  )
}

function SkillScene({ categories }) {
  const [hovered, setHovered] = useState(null)
  const { theme, themes } = useTheme()
  const activeVars = themes[theme]?.vars || {}
  const accentColor = activeVars['--accent'] || '#7dcfff'

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[8, 8, 8]} color={accentColor} intensity={2.0} />
      <pointLight position={[-8, -5, -8]} color="#a855f7" intensity={1.2} />

      <ConnectionBeams categories={categories} accentColor={accentColor} />

      {categories.map((cat, i) => (
        <SkillNode
          key={cat.title}
          category={cat}
          index={i}
          total={categories.length}
          hovered={hovered}
          onHover={setHovered}
          onUnhover={() => setHovered(null)}
        />
      ))}
    </>
  )
}

export default function FloatingSkillSpheres({ categories }) {
  const { tier } = usePerformance()
  if (tier === 'low') return null

  return (
    <div className="w-full h-[500px] md:h-[600px] relative">
      <Canvas
        camera={{ position: [0, 2, 8], fov: 50 }}
        gl={{ alpha: true, antialias: false, powerPreference: 'default' }}
        dpr={[1, 1.5]}
      >
        <SkillScene categories={categories} />
        <AdaptiveDpr pixelated />
      </Canvas>
    </div>
  )
}
