import React, { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { FiArrowRight, FiDownload } from 'react-icons/fi'
import { personalInfo } from '../data/resumeData'

const SpaceScene = lazy(() => import('./three/SpaceScene'))

const splitText = (text) => {
  return text.split('').map((char, index) => (
    <motion.span
      key={index}
      initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.8, delay: index * 0.03 + 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="inline-block"
    >
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  ))
}

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      
      {/* Background Aurora Glow */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[var(--accent)]/10 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-[var(--accent-purple)]/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left: Typography & CTA */}
        <div className="flex flex-col items-start pt-12 lg:pt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 flex items-center gap-3"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-gray-300">Available for work</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-display font-bold leading-[1.1] tracking-tighter mb-6 uppercase">
            <div className="flex overflow-hidden">
              {splitText("Hello, I'm")}
            </div>
            <div className="flex overflow-hidden text-gradient pb-2">
              {splitText(personalInfo.name)}
            </div>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed max-w-xl mb-10"
          >
            {personalInfo.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap items-center gap-4"
          >
            <button className="h-14 px-8 rounded-full bg-white text-black font-medium tracking-wide flex items-center gap-2 hover:scale-105 hover:bg-[var(--accent)] transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              View Projects <FiArrowRight />
            </button>
            <a 
              href={personalInfo.resumeUrl}
              download
              className="h-14 px-8 rounded-full glass-panel flex items-center gap-2 font-medium tracking-wide hover:bg-white/10 transition-colors"
            >
              Resume <FiDownload />
            </a>
          </motion.div>
        </div>

        {/* Right: 3D Scene & Glass Stats */}
        <div className="relative h-[60vh] lg:h-[80vh] w-full flex items-center justify-center">
          
          <Suspense fallback={<div className="w-64 h-64 rounded-full border border-white/10 border-t-[var(--accent)] animate-spin" />}>
            <div className="absolute inset-0 scale-[1.2] lg:scale-[1.5]">
              <SpaceScene />
            </div>
          </Suspense>

          {/* Floating Glass Stats */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute right-0 top-[20%] glass-panel p-5 rounded-2xl hidden md:block"
          >
            <div className="text-3xl font-display font-bold text-white mb-1">5+</div>
            <div className="text-xs font-mono text-[var(--text-secondary)] uppercase">Live Projects</div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="absolute left-0 bottom-[20%] glass-panel p-5 rounded-2xl hidden md:block"
          >
            <div className="text-3xl font-display font-bold text-[var(--accent)] mb-1">400+</div>
            <div className="text-xs font-mono text-[var(--text-secondary)] uppercase">DSA Solved</div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
