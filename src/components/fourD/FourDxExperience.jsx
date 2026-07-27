import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiVolume2, FiVolumeX } from 'react-icons/fi'
import { fourDxAudio } from './FourDxAudioSynth'

export default function FourDxExperience() {
  const [audioActive, setAudioActive] = useState(true)
  const [isWarping, setIsWarping] = useState(false)
  const bgCanvasRef = useRef(null)
  const fgCanvasRef = useRef(null)
  const scrollTimeoutRef = useRef(null)

  // Global Mouse & Audio Trigger Setup
  useEffect(() => {
    const handleGlobalClick = (e) => {
      const target = e.target.closest('button, a, input, [role="button"], .glass-card')
      if (target) fourDxAudio.playClick()
    }

    const handleGlobalHover = (e) => {
      const target = e.target.closest('button, a, [role="button"]')
      if (target && !target.dataset.soundPlayed) {
        fourDxAudio.playHover()
        target.dataset.soundPlayed = 'true'
        setTimeout(() => { delete target.dataset.soundPlayed }, 300)
      }
    }

    window.addEventListener('click', handleGlobalClick)
    window.addEventListener('mouseover', handleGlobalHover)

    return () => {
      window.removeEventListener('click', handleGlobalClick)
      window.removeEventListener('mouseover', handleGlobalHover)
    }
  }, [])

  // ── Premium 4DX Cosmic Neural Network Background ──
  useEffect(() => {
    const canvas = bgCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let animId
    let mouse = { x: canvas.width / 2, y: canvas.height / 2 }
    let time = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const handleMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    window.addEventListener('mousemove', handleMove)

    // Create floating orbs
    const orbCount = 5
    const orbs = Array.from({ length: orbCount }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 180 + 80,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      hue: Math.random() > 0.5 ? 185 : 270, // Cyan or Purple
    }))

    // Create constellation nodes
    const nodeCount = Math.min(Math.floor(window.innerWidth / 30), 55)
    const nodes = Array.from({ length: nodeCount }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 0.5,
      pulse: Math.random() * Math.PI * 2,
    }))

    const render = () => {
      time += 0.008
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // ── 1. Deep space ambient glow orbs ──
      orbs.forEach((orb) => {
        orb.x += orb.vx + Math.sin(time + orb.hue) * 0.15
        orb.y += orb.vy + Math.cos(time * 0.7 + orb.hue) * 0.15

        // Bounce off edges softly
        if (orb.x < -100) orb.x = canvas.width + 100
        if (orb.x > canvas.width + 100) orb.x = -100
        if (orb.y < -100) orb.y = canvas.height + 100
        if (orb.y > canvas.height + 100) orb.y = -100

        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius)
        gradient.addColorStop(0, `hsla(${orb.hue}, 90%, 60%, 0.06)`)
        gradient.addColorStop(0.5, `hsla(${orb.hue}, 80%, 40%, 0.025)`)
        gradient.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient
        ctx.fillRect(orb.x - orb.radius, orb.y - orb.radius, orb.radius * 2, orb.radius * 2)
      })

      // ── 2. Neural constellation nodes & connections ──
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        n.x += n.vx
        n.y += n.vy
        n.pulse += 0.02

        if (n.x < 0 || n.x > canvas.width) n.vx *= -1
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1

        // Cursor gravitational attraction
        const dxM = mouse.x - n.x
        const dyM = mouse.y - n.y
        const distM = Math.sqrt(dxM * dxM + dyM * dyM)

        if (distM < 200) {
          n.x += dxM * 0.002
          n.y += dyM * 0.002
        }

        // Draw pulsing node dot
        const pulseSize = n.size + Math.sin(n.pulse) * 0.5
        const nodeAlpha = 0.4 + Math.sin(n.pulse) * 0.15

        ctx.beginPath()
        ctx.arc(n.x, n.y, pulseSize, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 245, 255, ${nodeAlpha})`
        ctx.fill()

        // Cursor connection laser
        if (distM < 180) {
          const lineAlpha = 0.3 * (1 - distM / 180)
          ctx.beginPath()
          ctx.moveTo(n.x, n.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.strokeStyle = `rgba(0, 245, 255, ${lineAlpha})`
          ctx.lineWidth = 0.8
          ctx.stroke()
        }

        // Node-to-node connections
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j]
          const dx = n.x - n2.x
          const dy = n.y - n2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 130) {
            const alpha = 0.08 * (1 - dist / 130)
            ctx.beginPath()
            ctx.moveTo(n.x, n.y)
            ctx.lineTo(n2.x, n2.y)
            ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }

      // ── 3. Subtle scanning horizontal line ──
      const scanY = ((time * 40) % (canvas.height + 200)) - 100
      const scanGrad = ctx.createLinearGradient(0, scanY - 30, 0, scanY + 30)
      scanGrad.addColorStop(0, 'transparent')
      scanGrad.addColorStop(0.5, 'rgba(0, 245, 255, 0.03)')
      scanGrad.addColorStop(1, 'transparent')
      ctx.fillStyle = scanGrad
      ctx.fillRect(0, scanY - 30, canvas.width, 60)

      animId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMove)
      cancelAnimationFrame(animId)
    }
  }, [])

  // ── Foreground Interactive Sparks & Scroll Warp ──
  useEffect(() => {
    const canvas = fgCanvasRef.current
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

      if (Math.random() < 0.4) {
        particles.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 2 + mouse.vx * 0.08,
          vy: (Math.random() - 0.5) * 2 + mouse.vy * 0.08,
          size: Math.random() * 2 + 0.8,
          alpha: 0.7,
          color: Math.random() > 0.5 ? '#00f5ff' : '#a855f7',
        })
      }
    }

    const handleScroll = () => {
      setIsWarping(true)
      clearTimeout(scrollTimeoutRef.current)

      for (let i = 0; i < 4; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.8,
          vy: Math.random() * 10 + 5,
          size: Math.random() * 1.5 + 0.5,
          alpha: 0.85,
          isStreak: true,
          color: Math.random() > 0.3 ? '#00f5ff' : '#a855f7',
        })
      }

      scrollTimeoutRef.current = setTimeout(() => {
        setIsWarping(false)
      }, 200)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll)

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.alpha -= p.isStreak ? 0.035 : 0.02

        if (p.alpha <= 0) {
          particles.splice(i, 1)
          continue
        }

        ctx.save()
        ctx.globalAlpha = p.alpha
        ctx.fillStyle = p.color
        ctx.shadowColor = p.color
        ctx.shadowBlur = 10

        if (p.isStreak) {
          ctx.fillRect(p.x, p.y, p.size * 0.8, Math.abs(p.vy) * 2.5)
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
    if (newState) fourDxAudio.playWarp()
  }

  return (
    <>
      {/* 4DX Cosmic Neural Network Background */}
      <canvas
        ref={bgCanvasRef}
        className="pointer-events-none fixed inset-0 z-0"
      />

      {/* 4DX Foreground Interactive Sparks */}
      <canvas
        ref={fgCanvasRef}
        className="pointer-events-none fixed inset-0 z-40"
      />

      {/* Speed Warp Flash */}
      <AnimatePresence>
        {isWarping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.12 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none fixed inset-0 z-30 bg-gradient-to-b from-cyan-500/15 via-transparent to-purple-500/15 mix-blend-screen"
          />
        )}
      </AnimatePresence>

      {/* Floating 4DX Audio Controller */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5 }}
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
            <span className="font-bold tracking-wider">4DX</span>
          </div>

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
