import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowUp, FiHeart } from 'react-icons/fi'
import { Link } from 'react-scroll'
import { personalInfo } from '../data/resumeData'

export default function Footer() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata', // Assuming IST for NSUT student
    })
  }

  return (
    <footer className="relative bg-[#020202] pt-24 pb-8 overflow-hidden border-t border-white/5">
      
      {/* Massive Background Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full overflow-hidden flex justify-center pointer-events-none opacity-[0.02]">
        <h2 className="text-[20vw] font-display font-bold uppercase whitespace-nowrap text-white leading-none">
          PANKAJ SAHANI
        </h2>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-12 border-b border-white/10 pb-12 mb-8">
          
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-4xl font-display font-bold text-white tracking-tighter mb-4">
              Pankaj<span className="text-[var(--accent)]">.dev</span>
            </h3>
            <p className="text-[var(--text-secondary)] font-mono text-sm uppercase tracking-widest max-w-xs">
              Building intelligent systems and premium digital experiences.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-6">
            
            {/* Scroll to top */}
            <Link 
              to="home" 
              smooth={true} 
              duration={1000}
              className="w-14 h-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 cursor-pointer group"
            >
              <FiArrowUp className="group-hover:-translate-y-1 transition-transform" />
            </Link>

            {/* Local Time */}
            <div className="flex items-center gap-3 glass-panel px-5 py-2.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="font-mono text-sm text-gray-300 uppercase tracking-widest flex items-center gap-2">
                Local Time <span className="text-white font-bold">{formatTime(time)}</span>
              </span>
            </div>

          </div>

        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono uppercase tracking-widest text-gray-500">
          <p>© {new Date().getFullYear()} Pankaj Sahani. All Rights Reserved.</p>
          <p className="flex items-center gap-2">
            Built with <FiHeart className="text-[var(--accent)]" /> by Pankaj
          </p>
        </div>

      </div>
    </footer>
  )
}
