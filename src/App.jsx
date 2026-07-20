import React, { Suspense, lazy, useState, useEffect } from 'react'
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

function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [hide, setHide] = useState(false)

  useEffect(() => {
    let current = 0
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 15) + 5
      if (current >= 100) {
        current = 100
        clearInterval(interval)
        setTimeout(() => setHide(true), 800)
      }
      setProgress(current)
    }, 150)
    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {!hide && (
        <motion.div
          exit={{ y: "-100%", opacity: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Animated Noise & Glow */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-[var(--accent)]/10 rounded-full blur-[100px] animate-pulse" />
          
          <div className="relative z-10 flex flex-col items-center">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-6xl md:text-8xl font-display font-bold text-white tracking-tighter mb-8 overflow-hidden"
            >
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                Pankaj<span className="text-[var(--accent)]">.dev</span>
              </motion.div>
            </motion.div>

            <div className="flex items-end gap-2 text-white">
              <span className="text-5xl md:text-7xl font-mono font-light tracking-tighter tabular-nums">
                {progress}
              </span>
              <span className="text-xl md:text-2xl font-mono text-[var(--accent)] mb-1 md:mb-2">%</span>
            </div>
            
            <div className="w-64 md:w-80 h-[2px] bg-white/10 mt-8 overflow-hidden">
              <motion.div 
                className="h-full bg-[var(--accent)]"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function App() {
  return (
    <>
      <LoadingScreen />
      <div className="app bg-[#050505] min-h-screen">
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <TechStack />
        <Experience />
        <Projects />
        <Achievements />
        <Dsa />
        <Resume />
        <Contact />
        <Footer />
        <AiAssistant />
      </div>
    </>
  )
}

export default App
