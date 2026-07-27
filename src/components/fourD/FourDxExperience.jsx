import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiVolume2, FiVolumeX, FiZap } from 'react-icons/fi'
import { fourDxAudio } from './FourDxAudioSynth'

export default function FourDxExperience() {
  const [audioActive, setAudioActive] = useState(true)
  const [isWarping, setIsWarping] = useState(false)
  const canvasRef = useRef(null)
  const scrollTimeoutRef = useRef(null)

  // Attach global mouse hover / click sound effects
  useEffect(() => {
    const handleGlobalClick = (e) => {
      const target = e.target.closest('button, a, input, [role="button"], .glass-card')
      if (target) {
        fourDxAudio.playClick()
      }
    }

    const handleGlobalHover = (e) => {
      const target = e.target.closest('button, a, [role="button"]')
      if (target && !target.dataset.soundPlayed) {
        fourDxAudio.playHover()
        target.dataset.soundPlayed = 'true'
        setTimeout(() => {
          delete target.dataset.soundPlayed
        }, 300)
      }
    }

    window.addEventListener('click', handleGlobalClick)
    window.addEventListener('mouseover', handleGlobalHover)

    return () => {
      window.removeEventListener('click', handleGlobalClick)
      window.removeEventListener('mouseover', handleGlobalHover)
    }
  }, [])

  // Interactive Particle Field & Hyper-Warp Scroll Effect
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let animationFrameId
    let particles = []
    let mouse = { x: -1000, y: -1000, vx: 0, vy: 0, lastX: 0, lastY: 0 }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const handleMouseMove = (e) => {
      mouse.vx = e.clientX - mouse.lastX
      mouse.vy = e.clientY - mouse.lastY
      mouse.x = e.clientX
      mouse.y = e.clientY
      mouse.lastX = e.clientX
      mouse.lastY = e.clientY

      // Spawn energy spark particles on mouse move
      if (Math.random() < 0.6) {
        particles.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 2 + mouse.vx * 0.1,
          vy: (Math.random() - 0.5) * 2 + mouse.vy * 0.1,
          size: Math.random() * 2.5 + 1,
          alpha: 0.8,
          color: Math.random() > 0.5 ? '#00f5ff' : '#a855f7',
        })
      }
    }

    const handleScroll = () => {
      setIsWarping(true)
      clearTimeout(scrollTimeoutRef.current)

      // Spawn warp streak particles
      for (let i = 0; i < 3; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 1,
          vy: Math.random() * 8 + 4,
          size: Math.random() * 1.5 + 0.5,
          alpha: 0.9,
          isStreak: true,
          color: '#00f5ff',
        })
      }

      scrollTimeoutRef.current = setTimeout(() => {
        setIsWarping(false)
      }, 250)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll)

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.alpha -= p.isStreak ? 0.04 : 0.025

        if (p.alpha <= 0) {
          particles.splice(i, 1)
          continue
        }

        ctx.save()
        ctx.globalAlpha = p.alpha
        ctx.fillStyle = p.color
        ctx.shadowColor = p.color
        ctx.shadowBlur = 8

        if (p.isStreak) {
          ctx.fillRect(p.x, p.y, p.size, p.vy * 3)
        } else {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.restore()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  const toggleAudio = () => {
    const newState = fourDxAudio.toggle()
    setAudioActive(newState)
    if (newState) {
      fourDxAudio.playWarp()
    }
  }

  return (
    <>
      {/* 4D Interactive Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-40"
      />

      {/* Speed Warp Flash Indicator when scrolling fast */}
      <AnimatePresence>
        {isWarping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.12 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none fixed inset-0 z-30 bg-gradient-to-b from-[var(--accent)]/20 via-transparent to-[var(--accent-purple)]/20 mix-blend-screen"
          />
        )}
      </AnimatePresence>

      {/* Floating 4DX Audio Controller */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2"
      >
        <button
          onClick={toggleAudio}
          className={`px-4 py-2.5 rounded-full border backdrop-blur-xl flex items-center gap-2.5 font-mono text-xs shadow-2xl transition-all cursor-pointer ${
            audioActive
              ? 'bg-[#0f172a]/90 border-cyan-500/40 text-cyan-300 shadow-[0_0_20px_rgba(0,245,255,0.15)] hover:scale-105'
              : 'bg-black/80 border-white/10 text-gray-500 hover:text-white'
          }`}
          title="Toggle 4DX Spatial Sound Effects"
        >
          <div className="flex items-center gap-1">
            {audioActive ? <FiVolume2 size={16} className="animate-pulse text-cyan-400" /> : <FiVolumeX size={16} />}
            <span className="font-bold tracking-wider">4DX AUDIO</span>
          </div>

          {/* Equalizer Spectrum Bars */}
          {audioActive ? (
            <div className="flex items-end gap-0.5 h-3">
              <span className="w-0.5 bg-cyan-400 h-full animate-[bounce_0.6s_infinite]" />
              <span className="w-0.5 bg-purple-400 h-2/3 animate-[bounce_0.8s_infinite]" />
              <span className="w-0.5 bg-cyan-400 h-4/5 animate-[bounce_0.5s_infinite]" />
            </div>
          ) : (
            <span className="text-[10px] uppercase text-gray-500">OFF</span>
          )}
        </button>
      </motion.div>
    </>
  )
}
