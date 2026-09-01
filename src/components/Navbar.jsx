import React, { useState, useEffect } from 'react'
import { Link } from 'react-scroll'
import { motion, AnimatePresence } from 'framer-motion'
import { navLinks } from '../data/resumeData'
import { Menu, X } from 'lucide-react'
import Magnetic from './worldclass/Magnetic'

export default function Navbar({ onOpenCommandPalette }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50)

          const sections = navLinks.map(link => link.href.substring(1))
          const current = sections.find(section => {
            const element = document.getElementById(section)
            if (element) {
              const rect = element.getBoundingClientRect()
              return rect.top <= 100 && rect.bottom >= 100
            }
            return false
          })

          if (current) setActiveSection(current)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 py-5 pointer-events-none"
      >
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between pointer-events-auto">

          {/* Logo */}
          <Link
            to="home"
            smooth={true}
            duration={800}
            className="text-base font-mono font-medium tracking-tight text-white cursor-pointer flex items-center gap-2 group glass-panel px-4 py-2 rounded-full"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
            <span className="font-semibold text-white">pankaj</span>
            <span className="text-[var(--text-secondary)] text-xs">/ dev</span>
          </Link>

          {/* Floating Pill Nav Bar */}
          <div className="hidden md:flex items-center gap-1 glass-panel rounded-full px-2 py-1.5 border border-white/10 shadow-2xl">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href.substring(1)}
                smooth={true}
                duration={800}
                className="relative px-4 py-1.5 text-xs font-mono tracking-wide text-[var(--text-secondary)] hover:text-white transition-colors cursor-pointer rounded-full"
                onSetActive={() => setActiveSection(link.href.substring(1))}
              >
                {activeSection === link.href.substring(1) && (
                  <motion.div
                    layoutId="navIndicator"
                    className="absolute inset-0 bg-white/10 rounded-full border border-white/15"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </Link>
            ))}
          </div>

          {/* Actions: Command Palette & Contact Button */}
          <div className="hidden md:flex items-center gap-2.5">
            <button
              onClick={() => onOpenCommandPalette && onOpenCommandPalette(true)}
              className="px-3.5 py-2 rounded-full text-xs font-mono text-[var(--text-secondary)] hover:text-white glass-panel transition-all flex items-center gap-2 cursor-pointer"
              title="Open Command Palette (Ctrl + K)"
            >
              <span>⌘K</span>
            </button>
            <Magnetic>
              <Link
                to="contact"
                smooth={true}
                duration={800}
                className="px-5 py-2 rounded-full text-xs font-mono uppercase tracking-wider bg-white text-black font-semibold hover:bg-[var(--accent)] hover:text-white transition-all duration-300 cursor-pointer shadow-lg block"
              >
                Contact
              </Link>
            </Magnetic>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white p-2 glass-panel rounded-full"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#050505]/95 backdrop-blur-2xl flex flex-col items-center justify-center space-y-8"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={link.href.substring(1)}
                  smooth={true}
                  duration={800}
                  className="text-4xl font-display font-medium text-white hover:text-gradient transition-colors cursor-pointer"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
