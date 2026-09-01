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
    <>
      {/* Top Gradient Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[60] h-[2px]"
        style={{
          background: 'linear-gradient(90deg, transparent, transparent)',
        }}
      >
        <motion.div
          className="h-full origin-left"
          style={{
            width: `${scrollPercent}%`,
            background: 'linear-gradient(90deg, var(--accent), var(--accent-purple), var(--accent-cyan, #22d3ee), var(--accent))',
            backgroundSize: '200% 100%',
            boxShadow: '0 0 10px rgba(99, 102, 241, 0.4), 0 0 30px rgba(99, 102, 241, 0.2)',
          }}
          animate={{
            backgroundPosition: ['0% 0%', '200% 0%'],
          }}
          transition={{
            backgroundPosition: { duration: 3, repeat: Infinity, ease: 'linear' },
          }}
        />
      </motion.div>

      {/* Side Navigation Dots */}
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
                className="absolute top-0 left-0 w-full rounded-full"
                style={{
                  height: `${scrollPercent}%`,
                  background: 'linear-gradient(180deg, var(--accent), var(--accent-purple))',
                  boxShadow: '0 0 8px rgba(99, 102, 241, 0.4)',
                }}
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
                  <motion.div
                    animate={{
                      scale: activeSection === section.id ? 1.4 : 1,
                      boxShadow: activeSection === section.id
                        ? '0 0 10px rgba(99, 102, 241, 0.6), 0 0 20px rgba(99, 102, 241, 0.3)'
                        : '0 0 0px transparent',
                    }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                      activeSection === section.id
                        ? 'bg-[var(--accent)]'
                        : 'bg-white/15 hover:bg-white/40'
                    }`}
                  />
                  {/* Tooltip */}
                  <span
                    className={`absolute right-5 px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider whitespace-nowrap transition-all duration-200 pointer-events-none ${
                      activeSection === section.id
                        ? 'opacity-100 bg-[var(--accent)] text-black font-bold shadow-lg'
                        : 'opacity-0 group-hover:opacity-100 bg-black/80 text-gray-300 border border-white/10'
                    }`}
                  >
                    {section.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Percentage Badge */}
            <motion.div
              className="mt-3 px-2.5 py-1 rounded-md border text-[9px] font-mono tabular-nums"
              animate={{
                borderColor: scrollPercent > 90 ? 'rgba(16, 185, 129, 0.4)' : 'rgba(255, 255, 255, 0.1)',
                color: scrollPercent > 90 ? 'rgb(52, 211, 153)' : 'rgb(156, 163, 175)',
                backgroundColor: scrollPercent > 90 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(0, 0, 0, 0.6)',
              }}
            >
              {Math.round(scrollPercent)}%
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
