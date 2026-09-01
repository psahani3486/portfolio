import React, { useEffect, useState, useRef } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export default function CustomCursor() {
  const [cursorState, setCursorState] = useState('default')
  const [clicked, setClicked] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const lastStateRef = useRef('default')
  const trailsRef = useRef([])

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Lightweight spring config for 60fps cursor lerp
  const springConfig = { damping: 28, stiffness: 400, mass: 0.15 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  // Trail particles state
  const [trails, setTrails] = useState([])
  const trailIdRef = useRef(0)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile, { passive: true })

    let lastTrailTime = 0

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)

      // Spawn trail particles every 75ms
      const now = Date.now()
      if (now - lastTrailTime > 75) {
        lastTrailTime = now
        const id = trailIdRef.current++
        setTrails(prev => {
          const next = [...prev, { id, x: e.clientX, y: e.clientY }]
          if (next.length > 6) next.shift()
          return next
        })
      }
    }

    const handleMouseDown = () => {
      setClicked(true)
      setTimeout(() => setClicked(false), 250)
    }

    const handleMouseOver = (e) => {
      const target = e.target.closest('button, a, input, textarea, [role="button"], .magnetic')
      const cardTarget = e.target.closest('.glass-card, .glass-panel')
      const nextState = target ? 'hover' : cardTarget ? 'card' : 'default'

      if (nextState !== lastStateRef.current) {
        lastStateRef.current = nextState
        setCursorState(nextState)
      }
    }

    const handleMouseLeaveWindow = () => {
      lastStateRef.current = 'hidden'
      setCursorState('hidden')
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mousedown', handleMouseDown, { passive: true })
    window.addEventListener('mouseover', handleMouseOver, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeaveWindow)

    return () => {
      window.removeEventListener('resize', checkMobile)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseleave', handleMouseLeaveWindow)
    }
  }, [mouseX, mouseY])

  if (isMobile || cursorState === 'hidden') return null

  return (
    <>
      {/* Trail Particles */}
      {trails.map((trail, i) => (
        <motion.div
          key={trail.id}
          initial={{ opacity: 0.4, scale: 1 }}
          animate={{ opacity: 0, scale: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          onAnimationComplete={() => {
            setTrails(prev => prev.filter(t => t.id !== trail.id))
          }}
          className="pointer-events-none fixed top-0 left-0 z-[9997] w-1.5 h-1.5 rounded-full transform-gpu"
          style={{
            left: trail.x - 3,
            top: trail.y - 3,
            background: `radial-gradient(circle, ${i % 2 === 0 ? 'rgba(99, 102, 241, 0.6)' : 'rgba(168, 85, 247, 0.6)'}, transparent)`,
          }}
        />
      ))}

      {/* Outer Ring — GPU Accelerated */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: clicked ? 0.6 : cursorState === 'hover' ? 2.0 : cursorState === 'card' ? 1.4 : 1,
          opacity: cursorState === 'hover' ? 1 : 0.5,
          borderColor: cursorState === 'hover' ? 'var(--accent)' : 'rgba(255, 255, 255, 0.3)',
          backgroundColor: cursorState === 'hover' ? 'rgba(99, 102, 241, 0.08)' : 'transparent',
        }}
        transition={{ type: 'spring', stiffness: 450, damping: 28 }}
        className="pointer-events-none fixed top-0 left-0 -ml-5 -mt-5 z-[9999] w-10 h-10 rounded-full border border-cyan-400/30 shadow-[0_0_15px_rgba(99,102,241,0.2)] transform-gpu"
      />

      {/* Inner Precision Dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
        }}
        animate={{
          scale: clicked ? 2.5 : cursorState === 'hover' ? 0 : 1,
          backgroundColor: cursorState === 'hover' ? 'var(--accent)' : '#ffffff',
        }}
        transition={{ type: 'spring', stiffness: 850, damping: 35 }}
        className="pointer-events-none fixed top-0 left-0 -ml-1 -mt-1 z-[9999] w-2 h-2 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.4)] transform-gpu"
      />

      {/* Click Shockwave Ripple */}
      {clicked && (
        <motion.div
          style={{ x: mouseX, y: mouseY }}
          initial={{ scale: 0.2, opacity: 0.8 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="pointer-events-none fixed top-0 left-0 -ml-6 -mt-6 z-[9998] w-12 h-12 rounded-full border-2 border-[var(--accent)] transform-gpu"
        />
      )}
    </>
  )
}
