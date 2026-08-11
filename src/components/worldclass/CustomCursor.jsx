import React, { useEffect, useState, useRef } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export default function CustomCursor() {
  const [cursorState, setCursorState] = useState('default')
  const [clicked, setClicked] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const lastStateRef = useRef('default')

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Lightweight spring config for 60fps cursor lerp
  const springConfig = { damping: 30, stiffness: 350, mass: 0.2 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile, { passive: true })

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
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
      {/* Outer Ring — GPU Accelerated (No backdrop-blur / mix-blend for max performance) */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: clicked ? 0.7 : cursorState === 'hover' ? 1.8 : cursorState === 'card' ? 1.3 : 1,
          opacity: cursorState === 'hover' ? 0.9 : 0.6,
          borderColor: cursorState === 'hover' ? 'var(--accent)' : 'rgba(255, 255, 255, 0.4)',
          backgroundColor: cursorState === 'hover' ? 'rgba(0, 245, 255, 0.1)' : 'transparent',
        }}
        transition={{ type: 'spring', stiffness: 450, damping: 30 }}
        className="pointer-events-none fixed top-0 left-0 -ml-4 -mt-4 z-[9999] w-8 h-8 rounded-full border border-cyan-400/40 shadow-[0_0_12px_rgba(0,245,255,0.25)] transform-gpu"
      />

      {/* Inner Precision Dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
        }}
        animate={{
          scale: clicked ? 2 : cursorState === 'hover' ? 0 : 1,
          backgroundColor: cursorState === 'hover' ? 'var(--accent)' : '#ffffff',
        }}
        transition={{ type: 'spring', stiffness: 850, damping: 35 }}
        className="pointer-events-none fixed top-0 left-0 -ml-1 -mt-1 z-[9999] w-2 h-2 rounded-full shadow-[0_0_8px_#00f5ff] transform-gpu"
      />

      {/* Click Shockwave Ripple */}
      {clicked && (
        <motion.div
          style={{ x: mouseX, y: mouseY }}
          initial={{ scale: 0.2, opacity: 0.8 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="pointer-events-none fixed top-0 left-0 -ml-5 -mt-5 z-[9998] w-10 h-10 rounded-full border-2 border-[var(--accent)] transform-gpu"
        />
      )}
    </>
  )
}
