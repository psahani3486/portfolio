import { useState, useEffect, useCallback, useRef } from 'react'

/**
 * Returns normalized scroll progress for the overall page and per-section.
 * - `totalProgress`: 0 → 1 for entire page
 * - `sectionProgress`: object keyed by section id, each 0 → 1
 * - `scrollVelocity`: current scroll speed (px/frame), useful for warp effects
 * - `direction`: 'down' | 'up'
 */
const SECTION_IDS = ['home', 'about', 'skills', 'experience', 'projects', 'contact']

export default function useScrollProgress() {
  const [totalProgress, setTotalProgress] = useState(0)
  const [sectionProgress, setSectionProgress] = useState({})
  const [scrollVelocity, setScrollVelocity] = useState(0)
  const [direction, setDirection] = useState('down')
  const lastScrollY = useRef(0)
  const velocityRef = useRef(0)
  const rafId = useRef(null)

  const update = useCallback(() => {
    const scrollY = window.scrollY
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const total = maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0

    // Velocity
    const delta = scrollY - lastScrollY.current
    velocityRef.current = velocityRef.current * 0.8 + delta * 0.2 // smooth
    lastScrollY.current = scrollY

    setTotalProgress(total)
    setScrollVelocity(velocityRef.current)
    setDirection(delta >= 0 ? 'down' : 'up')

    // Per-section progress
    const newSectionProgress = {}
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id)
      if (!el) continue
      const rect = el.getBoundingClientRect()
      const sectionTop = rect.top + scrollY
      const sectionHeight = rect.height
      const viewportCenter = scrollY + window.innerHeight * 0.5

      // 0 = section just entering viewport, 1 = section fully passed
      const raw = (viewportCenter - sectionTop) / sectionHeight
      newSectionProgress[id] = Math.max(0, Math.min(1, raw))
    }
    setSectionProgress(newSectionProgress)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      if (rafId.current) cancelAnimationFrame(rafId.current)
      rafId.current = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    update() // initial

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [update])

  return { totalProgress, sectionProgress, scrollVelocity, direction }
}
