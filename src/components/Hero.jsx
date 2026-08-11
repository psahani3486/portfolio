import React, { Suspense, lazy, useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowRight, FiDownload, FiTerminal, FiGlobe, FiSend, FiCornerDownLeft, FiCpu, FiZap, FiActivity, FiCode } from 'react-icons/fi'
import { personalInfo, projects, skillCategories } from '../data/resumeData'
import { downloadSdeResume, downloadDataAnalystResume, downloadBothResumes } from '../utils/downloadHelper'
import Magnetic from './worldclass/Magnetic'

const DevCoreScene = lazy(() => import('./three/DevCoreScene'))

const roles = [
  'Full-Stack Systems Engineer',
  'AI & BI Analytics Specialist',
  'RAG & LLM Architect',
  '400+ LeetCode Problem Solver',
]

function DynamicRole() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length)
    }, 2800)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="h-8 overflow-hidden inline-block align-middle font-mono font-bold text-[var(--accent)]">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ y: 24, opacity: 0, filter: 'blur(4px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: -24, opacity: 0, filter: 'blur(4px)' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2"
        >
          <span className="text-cyan-400">⚡</span>
          <span>{roles[index]}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  )
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
      case 'resume sde':
        newHistory.push({
          type: 'system',
          content: '📄 Triggering SDE / Full-Stack resume download...',
        })
        downloadSdeResume()
        break
      case 'resume da':
      case 'resume data':
      case 'resume analyst':
        newHistory.push({
          type: 'system',
          content: '📊 Triggering Data Analyst & BI resume download...',
        })
        downloadDataAnalystResume()
        break
      case 'resume both':
      case 'resume all':
        newHistory.push({
          type: 'system',
          content: '⚡ Triggering download for both resumes (SDE & Data Analyst)...',
        })
        downloadBothResumes()
        break
      case 'clear':
        setHistory([])
        setInput('')
        return
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
    <div className="w-full h-full glass-card rounded-3xl p-5 font-mono text-xs md:text-sm border border-emerald-500/30 bg-black/90 flex flex-col justify-between shadow-[0_0_50px_rgba(0,255,170,0.12)]">
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
          placeholder="Type command ('help', 'projects', 'skills', 'about')..."
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
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      
      {/* Background Ambient Spotlights & Cyber Lines */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] left-[15%] w-[55vw] h-[55vw] rounded-full bg-[var(--accent)]/15 blur-[160px] animate-pulse" />
        <div className="absolute top-[25%] -right-[15%] w-[45vw] h-[45vw] rounded-full bg-[var(--accent-purple)]/15 blur-[160px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      </div>

      <div className="max-w-[1380px] mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Column: Futuristic Swiss Typography & CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start pt-4 lg:pt-0">
          
          {/* Status Badge & Mode Switcher */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-xl flex items-center gap-2.5 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-mono font-semibold tracking-wider uppercase text-emerald-300">
                Available for Roles 2026–2027
              </span>
            </motion.div>

            {/* Mode Switcher Pill */}
            <div className="p-1 rounded-full border border-white/15 bg-black/60 backdrop-blur-xl flex items-center gap-1 shadow-lg">
              <button
                onClick={() => setViewMode('3d')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === '3d'
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold shadow-[0_0_15px_rgba(99,102,241,0.5)]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <FiGlobe size={14} /> 3D DEV CORE
              </button>
              <button
                onClick={() => setViewMode('cli')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'cli'
                    ? 'bg-emerald-400 text-black font-bold shadow-[0_0_15px_rgba(52,211,153,0.5)]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <FiTerminal size={14} /> TERMINAL CLI
              </button>
            </div>
          </div>

          {/* Dynamic Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs md:text-sm font-mono uppercase tracking-[0.3em] text-[var(--accent)] mb-3 font-semibold flex items-center gap-2"
          >
            <FiCode className="animate-spin text-cyan-400" style={{ animationDuration: '6s' }} />
            <span>Computer Science Engineer @ NSUT</span>
          </motion.div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl lg:text-[5.8rem] font-display font-black leading-[1.05] tracking-tighter mb-4 uppercase">
            <span className="text-white block">HI, I'M</span>
            <span className="bg-gradient-to-r from-white via-cyan-200 to-[var(--accent)] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(99,102,241,0.3)] block">
              {personalInfo.name}
            </span>
          </h1>

          {/* Dynamic Role Flipper */}
          <div className="mb-6 py-1 px-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
            <DynamicRole />
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-xl mb-8 font-normal"
          >
            Engineering full-stack architectures, predictive AI models, anti-hallucination RAG frameworks, and high-performance business intelligence applications.
          </motion.p>

          {/* Floating Tech Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap gap-2 mb-10"
          >
            {['React', 'Next.js', 'FastAPI', 'Python', 'PyTorch', 'RAG AI', 'PostgreSQL', 'DSA 400+'].map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1 text-xs font-mono rounded-lg border border-white/10 bg-white/5 text-gray-300 backdrop-blur-md hover:border-[var(--accent)]/50 hover:text-white transition-all shadow-sm"
              >
                {tech}
              </span>
            ))}
          </motion.div>

          {/* Action CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="h-13 px-8 rounded-full bg-gradient-to-r from-white via-gray-100 to-gray-200 text-black font-mono text-xs uppercase tracking-wider font-bold flex items-center gap-3 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-300 cursor-pointer shadow-xl"
              >
                Explore Projects <FiArrowRight size={16} />
              </button>
            </Magnetic>
            <Magnetic>
              <button 
                onClick={() => document.getElementById('resume')?.scrollIntoView({ behavior: 'smooth' })}
                className="h-13 px-8 rounded-full glass-panel text-white font-mono text-xs uppercase tracking-wider font-bold flex items-center gap-3 hover:bg-white/15 hover:border-white/30 transition-all cursor-pointer shadow-lg"
              >
                Get Resume <FiDownload size={16} />
              </button>
            </Magnetic>
          </motion.div>
        </div>

        {/* Right Column: Prominent Interactive 3D Quantum Core Container */}
        <div className="lg:col-span-5 relative h-[520px] lg:h-[620px] w-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            {viewMode === '3d' ? (
              <motion.div
                key="3d-hero"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full relative rounded-3xl overflow-hidden glass-card border border-indigo-500/20 bg-gradient-to-b from-black/80 via-[#0b0c16]/90 to-black/80 shadow-[0_0_60px_rgba(99,102,241,0.15)] flex flex-col justify-between p-4"
              >
                {/* 3D Canvas Frame Top Bar */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3 px-2 z-20">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="text-[11px] font-mono text-cyan-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <FiCpu /> Dev Core Engine v3.0
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-gray-400">
                    <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-emerald-400">
                      60 FPS
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-purple-400">
                      WebGL 2.0
                    </span>
                  </div>
                </div>

                {/* Main 3D Dev Core Visual Container — 100% FULL COVER */}
                <div className="absolute inset-0 z-10 w-full h-full overflow-hidden rounded-3xl group">
                  {/* High-Definition 3D Visual Asset */}
                  <motion.img
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    src="/images/3d_coding_workspace.png"
                    alt="3D Holographic Coding Workspace"
                    className="w-full h-full object-cover rounded-3xl filter brightness-115 contrast-120 group-hover:scale-108 transition-transform duration-700"
                  />

                  {/* Holographic Cyber Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/60 pointer-events-none" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/20 to-black/80 pointer-events-none" />

                  {/* Floating Holographic Badge Labels */}
                  <div className="absolute top-16 left-4 z-20 px-3.5 py-1.5 rounded-full border border-cyan-400/40 bg-black/70 backdrop-blur-md text-[10px] font-mono text-cyan-300 font-bold tracking-wider flex items-center gap-2 shadow-2xl">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    3D NEURAL CORE ENGINE
                  </div>
                  <div className="absolute bottom-16 right-4 z-20 px-3.5 py-1.5 rounded-full border border-purple-400/40 bg-black/70 backdrop-blur-md text-[10px] font-mono text-purple-300 font-bold tracking-wider flex items-center gap-2 shadow-2xl">
                    <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                    RAG & FULL-STACK MESH
                  </div>
                </div>

                {/* Handcrafted Floating HUD Stat Cards */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="absolute right-4 top-16 z-20 glass-card px-4 py-3 rounded-2xl border border-cyan-500/30 backdrop-blur-2xl bg-black/60 shadow-xl"
                >
                  <div className="text-2xl font-mono font-extrabold text-white mb-0.5 flex items-center gap-1">
                    <FiZap className="text-cyan-400 text-lg" /> 5+
                  </div>
                  <div className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Production Apps</div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="absolute left-4 bottom-16 z-20 glass-card px-4 py-3 rounded-2xl border border-purple-500/30 backdrop-blur-2xl bg-black/60 shadow-xl"
                >
                  <div className="text-2xl font-mono font-extrabold text-[var(--accent)] mb-0.5 flex items-center gap-1">
                    <FiActivity className="text-purple-400 text-lg" /> 400+
                  </div>
                  <div className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">LeetCode Solved</div>
                </motion.div>

                {/* 3D Canvas Frame Bottom Bar */}
                <div className="flex items-center justify-between border-t border-white/10 pt-3 px-2 z-20 text-[10px] font-mono text-gray-400">
                  <span className="text-indigo-400 font-bold uppercase tracking-widest">
                    ★ Click Core to Pulse Energy
                  </span>
                  <span className="text-gray-500 hidden sm:inline">
                    Interactive Orbital Mesh
                  </span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="cli-hero"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full max-h-[520px]"
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


