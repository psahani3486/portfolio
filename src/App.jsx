import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import TechStack from './components/TechStack'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Achievements from './components/Achievements'
import Dsa from './components/Dsa'
import Resume from './components/Resume'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AiAssistant from './components/AiAssistant'
import CommandPalette from './components/CommandPalette'
import FourDxExperience from './components/fourD/FourDxExperience'
import ScrollProgress from './components/ScrollProgress'
import Testimonials from './components/Testimonials'
import { ThemeProvider } from './components/ThemeSwitcher'
import CustomCursor from './components/worldclass/CustomCursor'
import EasterEgg from './components/worldclass/EasterEgg'
import { LanguageProvider } from './components/worldclass/LanguageContext'
import SmoothScroll from './components/worldclass/SmoothScroll'
import { PerformanceProvider } from './components/three/PerformanceTier'
import AnimatedBackground from './components/AnimatedBackground'

/* ═══════════════════════════════════════════════
   MATRIX CODE RAIN — cinematic loading effect
   ═══════════════════════════════════════════════ */
function MatrixRain() {
  const columns = useMemo(() => {
    const cols = []
    const symbols = 'PANKAJ.DEV(){}[]<>/=+*&|!?#@$%^~;:0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZconst function return import export async await promise react node python'
    const colCount = Math.floor(window.innerWidth / 20)
    for (let i = 0; i < colCount; i++) {
      const charCount = Math.floor(Math.random() * 15) + 5
      const chars = []
      for (let j = 0; j < charCount; j++) {
        chars.push(symbols[Math.floor(Math.random() * symbols.length)])
      }
      cols.push({
        chars: chars.join('\n'),
        x: i * 20,
        duration: Math.random() * 4 + 2,
        delay: Math.random() * 3,
        opacity: Math.random() * 0.3 + 0.05,
      })
    }
    return cols
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden opacity-40 pointer-events-none">
      {columns.map((col, i) => (
        <div
          key={i}
          className="absolute top-0 text-[10px] font-mono text-green-500/60 whitespace-pre leading-5 animate-matrix-fall"
          style={{
            left: col.x,
            opacity: col.opacity,
            '--fall-duration': `${col.duration}s`,
            '--fall-delay': `${col.delay}s`,
          }}
        >
          {col.chars}
        </div>
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════════════
   BOOT MESSAGES — terminal-style loading
   ═══════════════════════════════════════════════ */
const bootMessages = [
  '> Initializing neural core...',
  '> Loading Three.js WebGL engine...',
  '> Mounting React component tree...',
  '> Connecting particle universe...',
  '> Activating 4DX spatial audio...',
  '> Rendering 3D holographic mesh...',
  '> Calibrating custom cursor system...',
  '> All systems operational ✓',
]

/* ═══════════════════════════════════════════════
   CINEMATIC LOADING SCREEN
   ═══════════════════════════════════════════════ */
function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [hide, setHide] = useState(false)
  const [visibleMessages, setVisibleMessages] = useState([])
  const [glitchActive, setGlitchActive] = useState(false)

  useEffect(() => {
    let current = 0
    let msgIndex = 0
    
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 12) + 4
      if (current >= 100) {
        current = 100
        clearInterval(interval)
        setTimeout(() => setHide(true), 1000)
      }
      setProgress(current)

      // Trigger glitch at random intervals
      if (Math.random() > 0.7) {
        setGlitchActive(true)
        setTimeout(() => setGlitchActive(false), 150)
      }
    }, 180)

    // Boot messages
    const msgInterval = setInterval(() => {
      if (msgIndex < bootMessages.length) {
        setVisibleMessages(prev => [...prev, bootMessages[msgIndex]])
        msgIndex++
      } else {
        clearInterval(msgInterval)
      }
    }, 350)

    return () => {
      clearInterval(interval)
      clearInterval(msgInterval)
    }
  }, [])

  return (
    <AnimatePresence>
      {!hide && (
        <motion.div
          exit={{ y: "-100%", opacity: 0, transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[100] bg-[#020205] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Matrix Rain Background */}
          <MatrixRain />

          {/* Animated Noise & Glow */}
          <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-[var(--accent)]/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute top-1/3 right-1/4 w-[30vw] h-[30vw] bg-[var(--accent-purple)]/8 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />

          <div className="relative z-10 flex flex-col items-center">
            {/* Glitch Title */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative mb-8"
            >
              <h1 
                className={`text-6xl md:text-8xl font-display font-bold text-white tracking-tighter ${glitchActive ? 'animate-glitch' : ''}`}
                style={{ textShadow: glitchActive ? '2px 0 #ff0040, -2px 0 #00f5ff' : 'none' }}
              >
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block"
                >
                  Pankaj
                </motion.span>
                <span className="text-[var(--accent)]">.dev</span>
              </h1>
              
              {/* Glitch layers */}
              {glitchActive && (
                <>
                  <span className="absolute inset-0 text-6xl md:text-8xl font-display font-bold text-cyan-400/30 tracking-tighter" 
                    style={{ clipPath: 'inset(10% 0 60% 0)', transform: 'translate(-3px, 0)' }}>
                    Pankaj<span className="text-[var(--accent)]">.dev</span>
                  </span>
                  <span className="absolute inset-0 text-6xl md:text-8xl font-display font-bold text-rose-400/30 tracking-tighter" 
                    style={{ clipPath: 'inset(50% 0 10% 0)', transform: 'translate(3px, 0)' }}>
                    Pankaj<span className="text-[var(--accent)]">.dev</span>
                  </span>
                </>
              )}
            </motion.div>

            {/* Progress Counter */}
            <div className="flex items-end gap-2 text-white mb-2">
              <span className="text-5xl md:text-7xl font-mono font-light tracking-tighter tabular-nums">
                {progress}
              </span>
              <span className="text-xl md:text-2xl font-mono text-[var(--accent)] mb-1 md:mb-2">%</span>
            </div>

            {/* Multi-segment gradient progress bar */}
            <div className="w-72 md:w-96 h-[3px] bg-white/5 mt-4 overflow-hidden rounded-full">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #6366f1, #a855f7, #22d3ee, #6366f1)',
                  backgroundSize: '200% 100%',
                }}
                initial={{ width: "0%" }}
                animate={{ 
                  width: `${progress}%`,
                  backgroundPosition: ['0% 0%', '200% 0%'],
                }}
                transition={{ 
                  width: { duration: 0.3 },
                  backgroundPosition: { duration: 2, repeat: Infinity, ease: 'linear' }
                }}
              />
            </div>

            {/* Boot Messages */}
            <motion.div 
              className="mt-8 w-72 md:w-96 max-h-32 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {visibleMessages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`text-[10px] font-mono py-0.5 ${
                    i === visibleMessages.length - 1 
                      ? 'text-emerald-400' 
                      : 'text-gray-600'
                  }`}
                >
                  {msg}
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-[10px] font-mono text-[var(--text-secondary)] uppercase tracking-[0.3em]"
            >
              Initializing 3D Experience
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function AppContent() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)

  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <EasterEgg />
      <FourDxExperience />
      <ScrollProgress />

      {/* Global Particle Universe Background */}
      <AnimatedBackground />

      <div className="app bg-transparent min-h-screen transition-colors duration-500 relative z-[1]">
        <Navbar onOpenCommandPalette={setCommandPaletteOpen} />
        <Hero />
        <About />
        <Skills />
        <TechStack />
        <Experience />
        <Testimonials />
        <Projects />
        <Achievements />
        <Dsa />
        <Resume />
        <Contact />
        <Footer />
        <AiAssistant />
        <CommandPalette
          isOpen={commandPaletteOpen}
          onClose={setCommandPaletteOpen}
        />
      </div>
    </>
  )
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <PerformanceProvider>
          <SmoothScroll>
            <AppContent />
          </SmoothScroll>
        </PerformanceProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App
