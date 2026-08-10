import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { fourDxAudio } from './FourDxAudioSynth'

export default function FourDxTiltCard({ children, className = '', tiltIntensity = 15 }) {
  const cardRef = useRef(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth springs for 3D tilt angles
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [tiltIntensity, -tiltIntensity]), {
    stiffness: 300,
    damping: 30,
  })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-tiltIntensity, tiltIntensity]), {
    stiffness: 300,
    damping: 30,
  })

  // Spotlight position
  const glareX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), { stiffness: 300, damping: 30 })
  const glareY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), { stiffness: 300, damping: 30 })

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height

    const relativeX = (e.clientX - rect.left) / width - 0.5
    const relativeY = (e.clientY - rect.top) / height - 0.5

    mouseX.set(relativeX)
    mouseY.set(relativeY)
  }

  const handleMouseEnter = () => {
    fourDxAudio.playHover()
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`relative perspective-1000 ${className}`}
    >
      {/* 4D Spotlight Glare Overlay */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-30 mix-blend-overlay"
        style={{
          background: `radial-gradient(600px circle at ${glareX.get()}% ${glareY.get()}%, rgba(255,255,255,0.15), transparent 40%)`,
        }}
      />
      {children}
    </motion.div>
  )
}
