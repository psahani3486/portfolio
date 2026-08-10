import React, { useEffect, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export default function CustomCursor() {
  const [cursorState, setCursorState] = useState('default') // 'default' | 'hover' | 'text' | 'card' | 'hidden'
  const [clicked, setClicked] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Spring physics for smooth lerped cursor movement
  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const handleMouseDown = () => {
      setClicked(true)
      setTimeout(() => setClicked(false), 300)
    }

    const handleMouseOver = (e) => {
      const target = e.target.closest('button, a, input, textarea, [role="button"], .magnetic')
      const textTarget = e.target.closest('p, h1, h2, h3, h4, span')
      const cardTarget = e.target.closest('.glass-card, .glass-panel')

      if (target) {
        setCursorState('hover')
      } else if (cardTarget) {
        setCursorState('card')
      } else if (textTarget && textTarget.innerText && textTarget.innerText.trim().length > 0) {
        setCursorState('text')
      } else {
        setCursorState('default')
      }
    }

    const handleMouseLeaveWindow = () => {
      setCursorState('hidden')
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseover', handleMouseOver)
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
      {/* Outer Glowing Ring */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: clicked ? 0.7 : cursorState === 'hover' ? 2.2 : cursorState === 'card' ? 1.6 : cursorState === 'text' ? 0.4 : 1,
          opacity: cursorState === 'text' ? 0.3 : 0.8,
          borderColor: cursorState === 'hover' ? 'var(--accent)' : 'rgba(255, 255, 255, 0.4)',
          backgroundColor: cursorState === 'hover' ? 'rgba(0, 245, 255, 0.15)' : 'transparent',
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        className="pointer-events-none fixed top-0 left-0 -ml-5 -mt-5 z-[9999] w-10 h-10 rounded-full border border-white/30 backdrop-blur-[1px] shadow-[0_0_15px_rgba(0,245,255,0.2)] mix-blend-difference"
      />

      {/* Inner Precision Dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
        }}
        animate={{
          scale: clicked ? 2 : cursorState === 'hover' ? 0 : cursorState === 'text' ? 0.5 : 1,
          backgroundColor: cursorState === 'hover' ? 'var(--accent)' : '#ffffff',
        }}
        transition={{ type: 'spring', stiffness: 800, damping: 35 }}
        className="pointer-events-none fixed top-0 left-0 -ml-1 -mt-1 z-[9999] w-2 h-2 rounded-full shadow-[0_0_10px_#00f5ff]"
      />

      {/* Click Shockwave Ripple */}
      {clicked && (
        <motion.div
          style={{ x: mouseX, y: mouseY }}
          initial={{ scale: 0.2, opacity: 0.8 }}
          animate={{ scale: 3.5, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="pointer-events-none fixed top-0 left-0 -ml-6 -mt-6 z-[9998] w-12 h-12 rounded-full border-2 border-[var(--accent)]"
        />
      )}
    </>
  )
}
