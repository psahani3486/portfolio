import React, { useState, useEffect } from 'react'
import { Link } from 'react-scroll'
import { motion, AnimatePresence } from 'framer-motion'
import { navLinks } from '../data/resumeData'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      
      // Update active section based on scroll position
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
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-4' : 'py-8'
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6">
          <div className={`flex items-center justify-between rounded-full transition-all duration-500 ${
            scrolled ? 'glass-panel px-6 py-3' : 'px-2'
          }`}>
            
            {/* Logo */}
            <Link 
              to="home" 
              smooth={true} 
              duration={800}
              className="text-xl font-display font-bold tracking-tighter cursor-pointer relative group"
            >
              <span className="text-white">Pankaj</span>
              <span className="text-gradient">.dev</span>
              <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[var(--accent)] transition-all duration-300 group-hover:w-full" />
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-1 bg-[#111111]/80 backdrop-blur-md rounded-full px-2 py-2 border border-white/5 shadow-2xl">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href.substring(1)}
                  smooth={true}
                  duration={800}
                  className="relative px-5 py-2 text-sm font-medium tracking-wide text-gray-300 hover:text-white transition-colors cursor-pointer rounded-full"
                  onSetActive={() => setActiveSection(link.href.substring(1))}
                >
                  {activeSection === link.href.substring(1) && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute inset-0 bg-white/10 rounded-full border border-white/10"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Link
                to="contact"
                smooth={true}
                duration={800}
                className="px-6 py-2.5 rounded-full text-sm font-medium bg-white text-black hover:bg-[var(--accent)] hover:scale-105 transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(0,245,255,0.2)]"
              >
                Let's Talk
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
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
