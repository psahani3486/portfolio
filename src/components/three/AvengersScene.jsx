import React, { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stars, AdaptiveDpr, AdaptiveEvents, Float } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'
import { useTheme } from '../ThemeSwitcher'
import { fourDxAudio } from '../fourD/FourDxAudioSynth'

/* ─────────────────────────────────────────────────────────────
   AVENGERS HERO THEMES CONFIGURATION
   ───────────────────────────────────────────────────────────── */
export const AVENGERS_THEMES = {
  ironman: {
    id: 'ironman',
    name: 'Iron Man (Arc Core)',
    icon: '⚡',
    primaryColor: '#ef4444',     // Crimson Gold & Red
    secondaryColor: '#f59e0b',   // Gold
    glowColor: '#06b6d4',        // Arc Cyan
    coreEmissive: '#00f0ff',
    metalness: 0.9,
    roughness: 0.15,
    bgParticles: '#00f0ff',
    hudColor: '#00f0ff',
    lightIntensity: 3.5,
  },
  infinity: {
    id: 'infinity',
    name: 'Infinity Gauntlet',
    icon: '💎',
    primaryColor: '#eab308',     // Gold
    secondaryColor: '#a855f7',   // Cosmic Purple
    glowColor: '#ec4899',        // Power Pink/Red
    coreEmissive: '#ffd700',
    metalness: 0.85,
    roughness: 0.2,
    bgParticles: '#f43f5e',
    hudColor: '#eab308',
    lightIntensity: 4.0,
  },
  thor: {
    id: 'thor',
    name: 'Thor (Thunder God)',
    icon: '🔨',
    primaryColor: '#38bdf8',     // Lightning Blue
    secondaryColor: '#94a3b8',   // Asgardian Steel
    glowColor: '#60a5fa',        // Plasma White/Blue
    coreEmissive: '#38bdf8',
    metalness: 0.95,
    roughness: 0.1,
    bgParticles: '#38bdf8',
    hudColor: '#60a5fa',
    lightIntensity: 4.5,
  },
  wakanda: {
    id: 'wakanda',
    name: 'Wakanda (Vibranium)',
    icon: '🐾',
    primaryColor: '#a855f7',     // Vibranium Purple
    secondaryColor: '#3b82f6',   // Kinetic Blue
    glowColor: '#c084fc',        // Violet Glow
    coreEmissive: '#a855f7',
    metalness: 0.9,
    roughness: 0.25,
    bgParticles: '#c084fc',
    hudColor: '#a855f7',
    lightIntensity: 3.0,
  },
  cap: {
    id: 'cap',
    name: 'Captain (Shield)',
    icon: '🛡️',
    primaryColor: '#2563eb',     // Freedom Blue
    secondaryColor: '#dc2626',   // Vibrant Red
    glowColor: '#ffffff',        // Pure Silver/White
    coreEmissive: '#3b82f6',
    metalness: 0.8,
    roughness: 0.2,
    bgParticles: '#60a5fa',
    hudColor: '#ef4444',
    lightIntensity: 3.2,
  },
  strange: {
    id: 'strange',
    name: 'Dr. Strange (Time)',
    icon: '👁️',
    primaryColor: '#10b981',     // Time Stone Emerald
    secondaryColor: '#f59e0b',   // Eldritch Gold
    glowColor: '#34d399',        // Mystic Green
    coreEmissive: '#10b981',
    metalness: 0.7,
    roughness: 0.3,
    bgParticles: '#34d399',
    hudColor: '#f59e0b',
    lightIntensity: 3.8,
  },
}

// 6 Authentic Marvel Infinity Stones
const INFINITY_STONES = [
  { name: 'Space', color: '#00f0ff', emissive: '#00c8ff', orbitRadius: 2.2, speed: 0.8, phase: 0 },
  { name: 'Mind', color: '#facc15', emissive: '#eab308', orbitRadius: 2.5, speed: 0.6, phase: (Math.PI / 3) * 1 },
  { name: 'Reality', color: '#ef4444', emissive: '#dc2626', orbitRadius: 2.8, speed: 0.9, phase: (Math.PI / 3) * 2 },
  { name: 'Power', color: '#c084fc', emissive: '#a855f7', orbitRadius: 3.1, speed: 0.7, phase: (Math.PI / 3) * 3 },
  { name: 'Time', color: '#10b981', emissive: '#059669', orbitRadius: 3.4, speed: 0.5, phase: (Math.PI / 3) * 4 },
  { name: 'Soul', color: '#f97316', emissive: '#ea580c', orbitRadius: 3.7, speed: 0.65, phase: (Math.PI / 3) * 5 },
]

/* ─────────────────────────────────────────────────────────────
   PROCEDURAL AVENGERS "A" LOGO 3D SHAPE
   ───────────────────────────────────────────────────────────── */
function createAvengersLogoShape() {
  const shape = new THREE.Shape()

  // Outer 'A' geometry contour
  shape.moveTo(0, 1.8)           // Apex top
  shape.lineTo(1.2, -1.5)        // Bottom right leg
  shape.lineTo(0.65, -1.5)       // Inner right bottom
  shape.lineTo(0.38, -0.6)       // Right inner slant
  shape.lineTo(-0.38, -0.6)      // Left inner slant
  shape.lineTo(-0.65, -1.5)      // Inner left bottom
  shape.lineTo(-1.2, -1.5)       // Bottom left leg
  shape.closePath()

  // Triangle inner cutout (Hole)
  const hole = new THREE.Path()
  hole.moveTo(0, 1.1)
  hole.lineTo(-0.25, 0.1)
  hole.lineTo(0.25, 0.1)
  hole.closePath()
  shape.holes.push(hole)

  return shape
}

// Arrow bar piercing horizontally through the Avengers A
function createArrowBarShape() {
  const shape = new THREE.Shape()
  shape.moveTo(-1.4, -0.2)
  shape.lineTo(0.8, -0.2)
  shape.lineTo(1.3, -0.05)
  shape.lineTo(0.8, 0.1)
  shape.lineTo(-1.4, 0.1)
  shape.closePath()
  return shape
}

/* ─────────────────────────────────────────────────────────────
   AVENGERS 3D EMBLEM COMPONENT
   ───────────────────────────────────────────────────────────── */
function AvengersEmblem({ theme, assembling }) {
  const logoGroup = useRef()
  const outerRingRef = useRef()
  const innerCoreRef = useRef()

  const logoShape = useMemo(() => createAvengersLogoShape(), [])
  const arrowShape = useMemo(() => createArrowBarShape(), [])

  const extrudeSettings = useMemo(
    () => ({
      depth: 0.35,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.05,
      bevelThickness: 0.05,
    }),
    []
  )

  useFrame((state, delta) => {
    if (!logoGroup.current) return
    const t = state.clock.elapsedTime

    // Rotation & assemble shockwave surge
    const rotSpeed = assembling ? 3.5 : 0.4
    logoGroup.current.rotation.y += delta * rotSpeed
    logoGroup.current.position.y = Math.sin(t * 1.5) * 0.12

    if (outerRingRef.current) {
      outerRingRef.current.rotation.z = -t * 0.5
      outerRingRef.current.rotation.x = Math.sin(t * 0.8) * 0.2
    }

    if (innerCoreRef.current) {
      const scale = 1 + Math.sin(t * 4) * (assembling ? 0.3 : 0.08)
      innerCoreRef.current.scale.set(scale, scale, scale)
    }
  })

  return (
    <group ref={logoGroup} scale={assembling ? 1.25 : 1}>
      {/* Main Extruded Avengers 'A' */}
      <mesh position={[0, 0, -0.17]}>
        <extrudeGeometry args={[logoShape, extrudeSettings]} />
        <meshStandardMaterial
          color={theme.primaryColor}
          emissive={theme.primaryColor}
          emissiveIntensity={assembling ? 1.5 : 0.35}
          metalness={theme.metalness}
          roughness={theme.roughness}
        />
      </mesh>

      {/* Iconic Horizontal Arrow Bar */}
      <mesh position={[0, 0, -0.14]}>
        <extrudeGeometry args={[arrowShape, extrudeSettings]} />
        <meshStandardMaterial
          color={theme.secondaryColor}
          emissive={theme.glowColor}
          emissiveIntensity={assembling ? 2.0 : 0.5}
          metalness={0.95}
          roughness={0.1}
        />
      </mesh>

      {/* Central Arc Reactor / Quantum Core Light */}
      <mesh ref={innerCoreRef} position={[0, 0, 0]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshBasicMaterial color={theme.coreEmissive} transparent opacity={0.9} />
      </mesh>

      {/* Outer Vibranium Circle Ring */}
      <group ref={outerRingRef}>
        <mesh>
          <torusGeometry args={[2.0, 0.04, 16, 100]} />
          <meshStandardMaterial
            color={theme.glowColor}
            emissive={theme.glowColor}
            emissiveIntensity={1.2}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      </group>
    </group>
  )
}

/* ─────────────────────────────────────────────────────────────
   ORBITING INFINITY STONES COMPONENT
   ───────────────────────────────────────────────────────────── */
function OrbitingInfinityStones({ theme, assembling }) {
  const groupRef = useRef()

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime

    groupRef.current.children.forEach((child, i) => {
      const stone = INFINITY_STONES[i]
      if (!stone) return

      const currentRadius = assembling ? stone.orbitRadius * 0.5 : stone.orbitRadius
      const currentSpeed = assembling ? stone.speed * 4 : stone.speed

      const angle = t * currentSpeed + stone.phase
      const x = Math.cos(angle) * currentRadius
      const z = Math.sin(angle) * currentRadius
      const y = Math.sin(angle * 2) * 0.45

      child.position.set(x, y, z)
      child.rotation.x = t * 1.5
      child.rotation.y = t * 2.0
    })
  })

  return (
    <group ref={groupRef}>
      {INFINITY_STONES.map((stone) => (
        <group key={stone.name} position={[stone.orbitRadius, 0, 0]}>
          {/* Faceted Octahedron Gem */}
          <mesh>
            <octahedronGeometry args={[0.18, 0]} />
            <meshStandardMaterial
              color={stone.color}
              emissive={stone.emissive}
              emissiveIntensity={assembling ? 3.0 : 1.5}
              roughness={0.1}
              metalness={0.9}
            />
          </mesh>
          {/* Glowing Gem Aura Sphere */}
          <mesh>
            <sphereGeometry args={[0.26, 16, 16]} />
            <meshBasicMaterial
              color={stone.color}
              transparent
              opacity={0.35}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}

/* ─────────────────────────────────────────────────────────────
   STARK HUD HOLOGRAPHIC RINGS
   ───────────────────────────────────────────────────────────── */
function StarkHudRings({ theme }) {
  const hudRef = useRef()

  useFrame((state) => {
    if (!hudRef.current) return
    const t = state.clock.elapsedTime
    hudRef.current.children[0].rotation.z = t * 0.2
    hudRef.current.children[1].rotation.z = -t * 0.35
    hudRef.current.children[2].rotation.x = Math.sin(t * 0.5) * 0.15
  })

  return (
    <group ref={hudRef}>
      {/* Ring 1 - Outer Tech Ring */}
      <mesh position={[0, 0, -0.4]}>
        <ringGeometry args={[2.7, 2.73, 64]} />
        <meshBasicMaterial
          color={theme.hudColor}
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Ring 2 - Inner Dotted Ring */}
      <mesh position={[0, 0, -0.2]}>
        <ringGeometry args={[1.5, 1.52, 48]} />
        <meshBasicMaterial
          color={theme.glowColor}
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Geodesic Vibranium Forcefield Cage */}
      <mesh position={[0, 0, 0]}>
        <icosahedronGeometry args={[3.6, 1]} />
        <meshBasicMaterial
          color={theme.hudColor}
          wireframe
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  )
}

/* ─────────────────────────────────────────────────────────────
   THOR LIGHTNING ARCS & QUANTUM VORTEX PARTICLES
   ───────────────────────────────────────────────────────────── */
function LightningVortex({ theme, assembling }) {
  const pointsRef = useRef()

  const { positions, colors } = useMemo(() => {
    const count = 250
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const pColor = new THREE.Color(theme.bgParticles)

    for (let i = 0; i < count; i++) {
      const radius = 1.0 + Math.random() * 5.0
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = radius * Math.cos(phi)

      col[i * 3] = pColor.r
      col[i * 3 + 1] = pColor.g
      col[i * 3 + 2] = pColor.b
    }
    return { positions: pos, colors: col }
  }, [theme])

  useFrame((state) => {
    if (!pointsRef.current) return
    const t = state.clock.elapsedTime
    pointsRef.current.rotation.y = t * (assembling ? 1.2 : 0.15)
    pointsRef.current.rotation.z = Math.sin(t * 0.3) * 0.1
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
        size={0.05}
        vertexColors
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

/* ─────────────────────────────────────────────────────────────
   MOUSE PARALLAX RIG
   ───────────────────────────────────────────────────────────── */
function CameraRig() {
  const { camera } = useThree()
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  useFrame(() => {
    camera.position.x += (mouse.current.x * 0.4 - camera.position.x) * 0.03
    camera.position.y += (-mouse.current.y * 0.3 - camera.position.y) * 0.03
    camera.lookAt(0, 0, 0)
  })

  return null
}

/* ─────────────────────────────────────────────────────────────
   SYNTHETIC MARVEL AUDIO SFX (Web Audio API)
   ───────────────────────────────────────────────────────────── */
function playAssembleSound() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!AudioCtx) return
    const ctx = new AudioCtx()

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(150, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.4)
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.9)

    gain.gain.setValueAtTime(0.3, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.0)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start()
    osc.stop(ctx.currentTime + 1.0)
  } catch (e) {
    // Graceful fallback
  }
}

/* ─────────────────────────────────────────────────────────────
   MAIN AVENGERS 3D SCENE & THEME CONTROLLER
   ───────────────────────────────────────────────────────────── */
export default function AvengersScene() {
  const { theme: globalThemeKey, setTheme: setGlobalTheme } = useTheme()
  const currentThemeKey = AVENGERS_THEMES[globalThemeKey] ? globalThemeKey : 'ironman'
  
  const [assembling, setAssembling] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)

  const activeTheme = AVENGERS_THEMES[currentThemeKey] || AVENGERS_THEMES.ironman

  const handleSelectTheme = (key) => {
    setGlobalTheme(key)
    if (soundEnabled) playAssembleSound()
  }

  const handleAssembleTrigger = () => {
    setAssembling(true)
    fourDxAudio.playBubble(4)
    setTimeout(() => setAssembling(false), 2500)
  }

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  return (
    <div className="relative w-full h-full flex flex-col justify-between items-center select-none">
      
      {/* 3D WebGL Canvas */}
      <div 
        className="absolute inset-0 cursor-pointer"
        onClick={handleAssembleTrigger}
        title="Click to ASSEMBLE!"
      >
        <Canvas
          camera={{ position: [0, 0, 5.8], fov: 55 }}
          dpr={[1, isMobile ? 1.5 : 2]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />

          {/* Cinematic Studio Lighting */}
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={activeTheme.lightIntensity} color={activeTheme.primaryColor} />
          <pointLight position={[-4, -3, -2]} intensity={2.0} color={activeTheme.glowColor} />
          <pointLight position={[0, 0, 2]} intensity={assembling ? 6.0 : 2.5} color={activeTheme.coreEmissive} />

          {/* Deep Space Stars */}
          <Stars radius={60} depth={50} count={isMobile ? 800 : 2000} factor={4} saturation={0.5} fade speed={1.2} />

          {/* Core 3D Components */}
          <Float speed={assembling ? 5 : 2} rotationIntensity={0.5} floatIntensity={0.5}>
            <AvengersEmblem theme={activeTheme} assembling={assembling} />
            <OrbitingInfinityStones theme={activeTheme} assembling={assembling} />
            {!isMobile && <StarkHudRings theme={activeTheme} />}
          </Float>

          {/* Quantum Particle Vortex */}
          <LightningVortex theme={activeTheme} assembling={assembling} />

          {/* Mouse Movement Parallax */}
          {!isMobile && <CameraRig />}

          {/* Cinematic Bloom Post-processing */}
          {!isMobile && (
            <EffectComposer>
              <Bloom
                intensity={assembling ? 1.8 : 0.8}
                luminanceThreshold={0.2}
                luminanceSmoothing={0.9}
                mipmapBlur
              />
              <Vignette eskil={false} offset={0.1} darkness={0.7} />
            </EffectComposer>
          )}
        </Canvas>
      </div>





    </div>
  )
}
