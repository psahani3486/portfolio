import React, { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { skillCategories } from '../data/resumeData'

// Skill proficiency scores (0-100) for radar shape
const proficiencyScores = {
  'Languages': 85,
  'Frontend': 90,
  'Backend': 85,
  'Database': 75,
  'AI / ML': 80,
  'Core CS': 88,
}

export default function SkillRadar() {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })
  const [hovered, setHovered] = useState(null)
  const [animProgress, setAnimProgress] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let start = null
    const duration = 1500

    const animate = (ts) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      setAnimProgress(eased)
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [isInView])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1

    const size = Math.min(400, window.innerWidth - 48)
    canvas.width = size * dpr
    canvas.height = size * dpr
    canvas.style.width = `${size}px`
    canvas.style.height = `${size}px`
    ctx.scale(dpr, dpr)

    const cx = size / 2
    const cy = size / 2
    const maxR = size * 0.38
    const categories = skillCategories
    const n = categories.length

    ctx.clearRect(0, 0, size, size)

    // Draw concentric rings
    for (let ring = 1; ring <= 4; ring++) {
      const r = (maxR / 4) * ring
      ctx.beginPath()
      for (let i = 0; i <= n; i++) {
        const angle = (Math.PI * 2 * i) / n - Math.PI / 2
        const x = cx + Math.cos(angle) * r
        const y = cy + Math.sin(angle) * r
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
      }
      ctx.closePath()
      ctx.strokeStyle = `rgba(255, 255, 255, ${ring === 4 ? 0.08 : 0.04})`
      ctx.lineWidth = 1
      ctx.stroke()
    }

    // Draw axis lines
    for (let i = 0; i < n; i++) {
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.lineTo(cx + Math.cos(angle) * maxR, cy + Math.sin(angle) * maxR)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)'
      ctx.lineWidth = 1
      ctx.stroke()
    }

    // Draw data polygon (animated)
    ctx.beginPath()
    for (let i = 0; i <= n; i++) {
      const idx = i % n
      const cat = categories[idx]
      const score = (proficiencyScores[cat.title] || 50) / 100
      const r = maxR * score * animProgress
      const angle = (Math.PI * 2 * idx) / n - Math.PI / 2
      const x = cx + Math.cos(angle) * r
      const y = cy + Math.sin(angle) * r
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
    }
    ctx.closePath()

    // Gradient fill
    const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR)
    gradient.addColorStop(0, 'rgba(0, 245, 255, 0.15)')
    gradient.addColorStop(1, 'rgba(123, 97, 255, 0.08)')
    ctx.fillStyle = gradient
    ctx.fill()
    ctx.strokeStyle = 'rgba(0, 245, 255, 0.6)'
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw vertex dots & labels
    for (let i = 0; i < n; i++) {
      const cat = categories[i]
      const score = (proficiencyScores[cat.title] || 50) / 100
      const r = maxR * score * animProgress
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2
      const x = cx + Math.cos(angle) * r
      const y = cy + Math.sin(angle) * r

      // Glow dot
      ctx.beginPath()
      ctx.arc(x, y, hovered === i ? 6 : 4, 0, Math.PI * 2)
      ctx.fillStyle = hovered === i ? '#00f5ff' : cat.color
      ctx.fill()
      ctx.shadowColor = cat.color
      ctx.shadowBlur = 12
      ctx.fill()
      ctx.shadowBlur = 0

      // Labels
      const labelR = maxR + 22
      const lx = cx + Math.cos(angle) * labelR
      const ly = cy + Math.sin(angle) * labelR

      ctx.fillStyle = hovered === i ? '#ffffff' : '#a8a8a8'
      ctx.font = `${hovered === i ? 'bold ' : ''}11px "JetBrains Mono", monospace`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(cat.title, lx, ly)

      // Score percentage
      ctx.fillStyle = hovered === i ? '#00f5ff' : 'rgba(168, 168, 168, 0.5)'
      ctx.font = '9px "JetBrains Mono", monospace'
      ctx.fillText(`${proficiencyScores[cat.title] || 50}%`, lx, ly + 14)
    }
  }, [animProgress, hovered])

  const handleCanvasHover = (e) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const mx = e.clientX - rect.left
    const my = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    const maxR = rect.width * 0.38
    const n = skillCategories.length

    let closest = null
    let closestDist = Infinity

    for (let i = 0; i < n; i++) {
      const score = (proficiencyScores[skillCategories[i].title] || 50) / 100
      const r = maxR * score * animProgress
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2
      const x = cx + Math.cos(angle) * r
      const y = cy + Math.sin(angle) * r
      const dist = Math.sqrt((mx - x) ** 2 + (my - y) ** 2)
      if (dist < 20 && dist < closestDist) {
        closestDist = dist
        closest = i
      }
    }
    setHovered(closest)
  }

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center"
    >
      <canvas
        ref={canvasRef}
        onMouseMove={handleCanvasHover}
        onMouseLeave={() => setHovered(null)}
        className="cursor-crosshair"
      />
    </motion.div>
  )
}
