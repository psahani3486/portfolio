import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Career' },
  { id: 'projects', label: 'Projects' },
  { id: 'dsa', label: 'DSA' },
  { id: 'contact', label: 'Contact' },
]

export default function ScrollProgress() {
  const [scrollPercent, setScrollPercent] = useState(0)
  const [activeSection, setActiveSection] = useState('home')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setScrollPercent(percent)
      setIsVisible(scrollTop > 300)

      // Determine active section
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= window.innerHeight / 3) {
            setActiveSection(sections[i].id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-1"
        >
          {/* Progress Track */}
          <div className="relative w-[3px] rounded-full bg-white/5 overflow-hidden" style={{ height: '180px' }}>
            <motion.div
              className="absolute top-0 left-0 w-full rounded-full bg-gradient-to-b from-[var(--accent)] to-[var(--accent-purple)]"
              style={{ height: `${scrollPercent}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Section Milestone Dots */}
          <div className="flex flex-col items-center gap-3 mt-3">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="group relative flex items-center cursor-pointer"
                title={section.label}
              >
                <div
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeSection === section.id
                      ? 'bg-[var(--accent)] shadow-[0_0_8px_rgba(0,245,255,0.6)] scale-125'
                      : 'bg-white/15 hover:bg-white/40'
                  }`}
                />
                {/* Tooltip */}
                <span
                  className={`absolute right-5 px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider whitespace-nowrap transition-all duration-200 pointer-events-none ${
                    activeSection === section.id
                      ? 'opacity-100 bg-[var(--accent)] text-black font-bold'
                      : 'opacity-0 group-hover:opacity-100 bg-black/80 text-gray-300 border border-white/10'
                  }`}
                >
                  {section.label}
                </span>
              </button>
            ))}
          </div>

          {/* Percentage Badge */}
          <div className="mt-3 px-2 py-1 rounded-md bg-black/60 border border-white/10 text-[9px] font-mono text-gray-400 tabular-nums">
            {Math.round(scrollPercent)}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
