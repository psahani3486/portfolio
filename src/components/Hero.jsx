import React, { Suspense, lazy, useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowRight, FiDownload, FiTerminal, FiGlobe, FiSend, FiCornerDownLeft } from 'react-icons/fi'
import { personalInfo, projects, skillCategories } from '../data/resumeData'
import Magnetic from './worldclass/Magnetic'

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

function HeroTerminal() {
  const [history, setHistory] = useState([
    { type: 'system', content: 'Pankaj Dev CLI v2.5 [Type "help" for commands]' },
    { type: 'system', content: 'Status: Open for SDE / Full-Stack & AI Roles (2026-2027)' },
  ])
  const [input, setInput] = useState('')
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const handleCommand = (e) => {
    if (e.key !== 'Enter') return
    const cmd = input.trim().toLowerCase()
    if (!cmd) return

    const newHistory = [...history, { type: 'user', content: `$ ${input}` }]

    switch (cmd) {
      case 'help':
        newHistory.push({
          type: 'system',
          content: `Available Commands:
• about     - Who is Pankaj?
• skills    - Tech stack breakdown
• projects  - Featured production apps
• contact   - Reach out to Pankaj
• themes    - World-class developer coding themes
• matrix    - Toggle Matrix digital rain effect
• resume    - Download Pankaj's Resume PDF
• clear     - Clear screen`,
        })
        break
      case 'about':
        newHistory.push({
          type: 'system',
          content: `${personalInfo.name} — ${personalInfo.role}\n${personalInfo.description}`,
        })
        break
      case 'skills':
        newHistory.push({
          type: 'system',
          content: skillCategories.map((cat) => `> ${cat.title}: ${cat.skills.join(', ')}`).join('\n'),
        })
        break
      case 'projects':
        newHistory.push({
          type: 'system',
          content: projects.map((p) => `${p.emoji} ${p.title} (${p.tech.join(', ')})`).join('\n'),
        })
        break
      case 'contact':
        newHistory.push({
          type: 'system',
          content: `📧 Email: ${personalInfo.email}\n📱 Phone: ${personalInfo.phone}\n🔗 GitHub: ${personalInfo.github}\n💼 LinkedIn: ${personalInfo.linkedin}`,
        })
        break
      case 'resume':
        newHistory.push({
          type: 'system',
          content: '📄 Triggering dual resume downloads (SDE + Data Analyst)...',
        })
        const link1 = document.createElement('a')
        link1.href = personalInfo.sdeResumeUrl || '/resume.pdf'
        link1.download = 'Pankaj_SDE_FullStack_Resume.pdf'
        document.body.appendChild(link1)
        link1.click()
        document.body.removeChild(link1)

        setTimeout(() => {
          const link2 = document.createElement('a')
          link2.href = personalInfo.dataAnalystResumeUrl || '/data_analyst_Resume.pdf'
          link2.download = 'Pankaj_DataAnalyst_BI_Resume.pdf'
          document.body.appendChild(link2)
          link2.click()
          document.body.removeChild(link2)
        }, 400)
        break
      case 'clear':
        setHistory([])
        setInput('')
        return
      case 'matrix':
        newHistory.push({
          type: 'system',
          content: '🟢 01001000 01100001 01100011 01101011 00100000 01110100 01101000 01100101 00100000 01110000 01101100 01100001 01101110 01100101 01110100 00100001',
        })
        break
      case 'themes':
      case 'theme':
        newHistory.push({
          type: 'system',
          content: '⚡ WORLD-CLASS DEV CODING THEMES ACTIVE:\n• 🌙 Tokyo Night (Default)\n• ☕ Catppuccin Mocha\n• ⚛️ One Dark Pro\n• 🧛 Dracula Pro\n• ❄️ Nordic Frost\n• 🌑 Dark Cyber\n• 🔮 Midnight Purple\n• ☀️ Aurora Light',
        })
        break
      default:
        newHistory.push({
          type: 'error',
          content: `Command not found: "${cmd}". Type "help" for a list of commands.`,
        })
    }

    setHistory(newHistory)
    setInput('')
  }

  return (
    <div className="w-full h-full glass-card rounded-3xl p-5 font-mono text-xs md:text-sm border border-emerald-500/20 bg-black/85 flex flex-col justify-between shadow-[0_0_50px_rgba(0,255,170,0.08)]">
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3 text-gray-400 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <span className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="ml-2 font-bold text-emerald-400">pankaj@nsut-dev:~</span>
        </div>
        <span className="text-[10px] text-gray-500 uppercase tracking-widest">Interactive CLI</span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2.5 pr-2 max-h-[360px]">
        {history.map((item, idx) => (
          <div
            key={idx}
            className={`whitespace-pre-wrap ${
              item.type === 'user'
                ? 'text-cyan-400 font-semibold'
                : item.type === 'error'
                ? 'text-rose-400'
                : 'text-gray-300'
            }`}
          >
            {item.content}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="pt-3 border-t border-white/10 flex items-center gap-2 text-emerald-400">
        <span className="font-bold">$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleCommand}
          placeholder="Type command ('help', 'projects', 'skills', 'themes')..."
          className="flex-1 bg-transparent text-white focus:outline-none font-mono text-xs md:text-sm placeholder-gray-600"
          autoFocus
        />
        <FiCornerDownLeft className="text-gray-500 text-xs" />
      </div>
    </div>
  )
}

export default function Hero() {
  const [viewMode, setViewMode] = useState('3d') // '3d' | 'cli'

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-noise">
      
      {/* Background Ambient Lighting Mesh */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[15%] left-[20%] w-[45vw] h-[45vw] rounded-full bg-[var(--accent)]/12 blur-[140px]" />
        <div className="absolute top-[35%] -right-[10%] w-[35vw] h-[35vw] rounded-full bg-[var(--accent-purple)]/10 blur-[140px]" />
        <div className="absolute inset-0 bg-radial-grid opacity-[0.03]" />
      </div>

      <div className="max-w-[1340px] mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Swiss Editorial Typography & CTA */}
        <div className="lg:col-span-7 flex flex-col items-start pt-8 lg:pt-0">
          
          {/* Status Badge & Mode Switcher */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center gap-2.5"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-mono tracking-wider uppercase text-[var(--text-secondary)]">Available for Work 2026-2027</span>
            </motion.div>

            {/* Mode Switcher Pill */}
            <div className="p-1 rounded-full border border-white/10 bg-black/40 flex items-center gap-1">
              <button
                onClick={() => setViewMode('3d')}
                className={`px-3 py-1 rounded-full text-[11px] font-mono transition-all cursor-pointer ${
                  viewMode === '3d'
                    ? 'bg-white text-black font-semibold shadow-sm'
                    : 'text-[var(--text-secondary)] hover:text-white'
                }`}
              >
                <FiGlobe className="inline mr-1" /> 3D DEV CORE
              </button>
              <button
                onClick={() => setViewMode('cli')}
                className={`px-3 py-1 rounded-full text-[11px] font-mono transition-all cursor-pointer ${
                  viewMode === 'cli'
                    ? 'bg-emerald-400 text-black font-semibold shadow-sm'
                    : 'text-[var(--text-secondary)] hover:text-white'
                }`}
              >
                <FiTerminal className="inline mr-1" /> TERMINAL CLI
              </button>
            </div>
          </div>

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
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-xl mb-10 font-normal"
          >
            {personalInfo.description}
          </motion.p>

          {/* Tactile Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="h-12 px-7 rounded-full bg-white text-black font-mono text-xs uppercase tracking-wider font-semibold flex items-center gap-2.5 hover:bg-[var(--accent)] hover:text-white transition-all duration-300 shadow-xl cursor-pointer"
              >
                Selected Work <FiArrowRight />
              </button>
            </Magnetic>
            <Magnetic>
              <button 
                onClick={() => document.getElementById('resume')?.scrollIntoView({ behavior: 'smooth' })}
                className="h-12 px-7 rounded-full glass-panel text-white font-mono text-xs uppercase tracking-wider font-semibold flex items-center gap-2.5 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer"
              >
                Download Resume <FiDownload />
              </button>
            </Magnetic>
          </motion.div>
        </div>

        {/* Right Column: 3D Quantum Core / Interactive CLI Canvas */}
        <div className="lg:col-span-5 relative h-[50vh] lg:h-[70vh] w-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            {viewMode === '3d' ? (
              <motion.div
                key="3d"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full flex items-center justify-center relative"
              >
                <Suspense fallback={<div className="w-32 h-32 rounded-full border border-white/10 border-t-white animate-spin" />}>
                  <div className="absolute inset-0 scale-[1.1] lg:scale-[1.3]">
                    <SpaceScene />
                  </div>
                </Suspense>

                {/* Handcrafted Micro Metric Cards */}
                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="absolute right-2 top-[15%] glass-card p-4 rounded-xl hidden sm:block border border-white/10"
                >
                  <div className="text-2xl font-mono font-bold text-white mb-0.5">5+</div>
                  <div className="text-[10px] font-mono text-[var(--text-secondary)] uppercase tracking-wider">Production Apps</div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="absolute left-2 bottom-[15%] glass-card p-4 rounded-xl hidden sm:block border border-white/10"
                >
                  <div className="text-2xl font-mono font-bold text-[var(--accent)] mb-0.5">400+</div>
                  <div className="text-[10px] font-mono text-[var(--text-secondary)] uppercase tracking-wider">Algorithmic Problems</div>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="cli"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full max-h-[480px]"
              >
                <HeroTerminal />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}



