import React, { useRef, useEffect, useCallback } from 'react'

export default function AnimatedBackground() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const particlesRef = useRef([])
  const animationRef = useRef(null)

  const initParticles = useCallback((width, height) => {
    const count = Math.min(Math.floor((width * height) / 8000), 180)
    const particles = []
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
        hue: Math.random() > 0.5 ? 240 : 270, // indigo or purple
        pulse: Math.random() * Math.PI * 2,
      })
    }
    particlesRef.current = particles
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      if (particlesRef.current.length === 0) {
        initParticles(canvas.width, canvas.height)
      }
    }

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX / window.innerWidth
      mouseRef.current.y = e.clientY / window.innerHeight
    }

    resize()
    window.addEventListener('resize', resize, { passive: true })
    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    let time = 0
    const animate = () => {
      time += 0.005
      const { width, height } = canvas
      ctx.clearRect(0, 0, width, height)

      // Aurora gradient waves
      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      
      // Aurora blob 1
      const a1x = width * (0.3 + Math.sin(time * 0.7) * 0.15 + mx * 0.05)
      const a1y = height * (0.25 + Math.cos(time * 0.5) * 0.1 + my * 0.03)
      const grad1 = ctx.createRadialGradient(a1x, a1y, 0, a1x, a1y, width * 0.4)
      grad1.addColorStop(0, 'rgba(99, 102, 241, 0.08)')
      grad1.addColorStop(0.5, 'rgba(99, 102, 241, 0.03)')
      grad1.addColorStop(1, 'transparent')
      ctx.fillStyle = grad1
      ctx.fillRect(0, 0, width, height)

      // Aurora blob 2
      const a2x = width * (0.7 + Math.cos(time * 0.6) * 0.12 - mx * 0.04)
      const a2y = height * (0.7 + Math.sin(time * 0.4) * 0.12 - my * 0.03)
      const grad2 = ctx.createRadialGradient(a2x, a2y, 0, a2x, a2y, width * 0.35)
      grad2.addColorStop(0, 'rgba(168, 85, 247, 0.07)')
      grad2.addColorStop(0.5, 'rgba(168, 85, 247, 0.025)')
      grad2.addColorStop(1, 'transparent')
      ctx.fillStyle = grad2
      ctx.fillRect(0, 0, width, height)

      // Aurora blob 3 (cyan accent)
      const a3x = width * (0.5 + Math.sin(time * 0.8 + 2) * 0.2)
      const a3y = height * (0.5 + Math.cos(time * 0.3 + 1) * 0.15)
      const grad3 = ctx.createRadialGradient(a3x, a3y, 0, a3x, a3y, width * 0.25)
      grad3.addColorStop(0, 'rgba(34, 211, 238, 0.04)')
      grad3.addColorStop(1, 'transparent')
      ctx.fillStyle = grad3
      ctx.fillRect(0, 0, width, height)

      // Particles
      const particles = particlesRef.current
      const connectionDist = 120

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        
        // Mouse influence
        const dx = mx * width - p.x
        const dy = my * height - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 200) {
          const force = (200 - dist) / 200 * 0.002
          p.vx += dx * force
          p.vy += dy * force
        }

        // Damping
        p.vx *= 0.99
        p.vy *= 0.99

        // Move
        p.x += p.vx
        p.y += p.vy
        p.pulse += 0.02

        // Wrap
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        // Draw particle
        const pulseOp = p.opacity + Math.sin(p.pulse) * 0.1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 70%, 70%, ${pulseOp})`
        ctx.fill()

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const cdx = p.x - p2.x
          const cdy = p.y - p2.y
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy)
          if (cdist < connectionDist) {
            const lineOp = (1 - cdist / connectionDist) * 0.12
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(99, 102, 241, ${lineOp})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [initParticles])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none transform-gpu"
      style={{ opacity: 0.9 }}
    />
  )
}
