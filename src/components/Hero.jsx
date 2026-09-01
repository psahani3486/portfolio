import React, { Suspense, lazy, useState, useRef, useEffect, useMemo } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { FiArrowRight, FiDownload, FiTerminal, FiGlobe, FiSend, FiCornerDownLeft, FiCpu, FiZap, FiActivity, FiCode, FiGithub, FiLinkedin } from 'react-icons/fi'
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

/* ═══════════════════════════════════════════════
   CODE RAIN BACKGROUND — elegant code keywords
   ═══════════════════════════════════════════════ */
function CodeRain() {
  const columns = useMemo(() => {
    const keywords = ['const', 'let', 'async', 'await', 'return', 'import', 'export', 'function', 'class', 'if', 'for', 'map', 'filter', 'reduce', 'useState', 'useEffect', 'fetch', 'Promise', 'try', 'catch', '=>', '()', '{}', '[]', '<>', '/>', '===', '!==', '&&', '||', 'true', 'false', 'null', 'React', 'Node', 'API', 'SQL', 'AI', 'ML', 'RAG', 'LLM']
    const cols = []
    const count = Math.floor(window.innerWidth / 45)
    for (let i = 0; i < count; i++) {
      cols.push({
        keyword: keywords[Math.floor(Math.random() * keywords.length)],
        x: i * 45 + Math.random() * 20,
        duration: Math.random() * 8 + 6,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.06 + 0.02,
      })
    }
    return cols
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {columns.map((col, i) => (
        <div
          key={i}
          className="absolute text-[9px] font-mono text-indigo-400/40 animate-matrix-fall"
          style={{
            left: col.x,
            opacity: col.opacity,
            '--fall-duration': `${col.duration}s`,
            '--fall-delay': `${col.delay}s`,
          }}
        >
          {col.keyword}
        </div>
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════════════
   DYNAMIC ROLE FLIPPER — cinematic text animation
   ═══════════════════════════════════════════════ */
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
          initial={{ y: 28, opacity: 0, filter: 'blur(6px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: -28, opacity: 0, filter: 'blur(6px)' }}
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

/* ═══════════════════════════════════════════════
   STAGGERED LETTER ANIMATION
   ═══════════════════════════════════════════════ */
function CinematicText({ text, className, delay = 0 }) {
  return (
    <span className={className}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.03,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block"
          style={{ minWidth: char === ' ' ? '0.3em' : undefined }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  )
}

/* ═══════════════════════════════════════════════
   FLOATING PHOTO CARD — with parallax & holographic border
   ═══════════════════════════════════════════════ */
function FloatingPhotoCard() {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: y * -18, y: x * 18 })
  }

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 })

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0.85, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full h-full flex items-center justify-center"
      style={{ perspective: '1400px' }}
    >
      {/* Dynamic Background Glow behind 3D animation */}
      <div className="absolute w-[380px] h-[500px] sm:w-[460px] sm:h-[600px] lg:w-[520px] lg:h-[680px] rounded-full bg-gradient-to-tr from-[var(--accent)]/25 via-cyan-500/20 to-purple-500/25 blur-[90px] pointer-events-none animate-pulse" style={{ animationDuration: '4s' }} />

      <motion.div
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
        }}
        transition={{ type: 'spring', stiffness: 180, damping: 18 }}
        className="relative w-[320px] h-[440px] sm:w-[380px] sm:h-[520px] md:w-[420px] md:h-[570px] lg:w-[460px] lg:h-[620px] rounded-[2.5rem] overflow-hidden photo-frame shadow-[0_25px_80px_rgba(0,0,0,0.9)] border border-white/20"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Photo */}
        <motion.img
          src="/images/pankaj-workspace.png"
          alt="Pankaj — Developer Workspace"
          className="w-full h-full object-cover rounded-[2.5rem] filter brightness-105 contrast-105"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.6 }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/10 rounded-[2.5rem] pointer-events-none" />

        {/* Scan line */}
        <div className="absolute inset-0 overflow-hidden rounded-[2.5rem] pointer-events-none">
          <div
            className="absolute left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-cyan-400/90 to-transparent animate-scan-line shadow-[0_0_12px_#22d3ee]"
          />
        </div>

        {/* Bottom info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-10">
          <div className="text-white font-display font-bold text-2xl sm:text-3xl tracking-tight drop-shadow-lg">Pankaj Sahani</div>
          <div className="text-xs sm:text-sm font-mono text-cyan-300 uppercase tracking-widest font-semibold mt-1">NSUT • CSE • Full-Stack & AI</div>
        </div>

        {/* Floating HUD badge */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-6 right-6 z-10 px-4 py-2 rounded-full border border-emerald-500/50 bg-black/75 backdrop-blur-xl text-xs font-mono text-emerald-300 font-bold flex items-center gap-2 shadow-xl"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          AVAILABLE FOR ROLES
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════
   INTERACTIVE HERO TERMINAL
   ═══════════════════════════════════════════════ */
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

/* ═══════════════════════════════════════════════
   MAIN HERO SECTION
   ═══════════════════════════════════════════════ */
export default function Hero() {
  const [viewMode, setViewMode] = useState('photo') // 'photo' | 'cli'
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  // Staggered tech badges
  const techBadges = ['React', 'Next.js', 'FastAPI', 'Python', 'PyTorch', 'RAG AI', 'PostgreSQL', 'DSA 400+']

  return (
    <section id="home" ref={sectionRef} className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      
      {/* Code Rain Background */}
      <CodeRain />

      {/* Background Ambient Spotlights */}
      <motion.div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" style={{ y: bgY }}>
        <div className="absolute -top-[20%] left-[10%] w-[55vw] h-[55vw] rounded-full bg-[var(--accent)]/12 blur-[180px] animate-aurora" />
        <div className="absolute top-[25%] -right-[15%] w-[45vw] h-[45vw] rounded-full bg-[var(--accent-purple)]/12 blur-[160px] animate-aurora" style={{ animationDelay: '3s' }} />
        <div className="absolute bottom-[10%] left-[40%] w-[30vw] h-[30vw] rounded-full bg-cyan-500/6 blur-[140px] animate-aurora" style={{ animationDelay: '6s' }} />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff06_1px,transparent_1px)] [background-size:28px_28px] opacity-30" />
      </motion.div>

      <div className="max-w-[1440px] mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Column: Cinematic Typography & CTAs */}
        <div className="lg:col-span-6 flex flex-col items-start pt-4 lg:pt-0">
          
          {/* Status Badge & Mode Switcher */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-xl flex items-center gap-2.5 shadow-[0_0_25px_rgba(16,185,129,0.15)] animate-neon-pulse"
              style={{ '--neon-color': 'rgba(16, 185, 129, 0.3)' }}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-mono font-semibold tracking-wider uppercase text-emerald-300">
                Available for Roles 2026–2027
              </span>
            </motion.div>

            {/* Mode Switcher Pill */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-1 rounded-full border border-white/15 bg-black/60 backdrop-blur-xl flex items-center gap-1 shadow-lg"
            >
              <button
                onClick={() => setViewMode('photo')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'photo'
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold shadow-[0_0_15px_rgba(99,102,241,0.5)]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <FiGlobe size={14} /> PORTFOLIO
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
            </motion.div>
          </div>

          {/* Dynamic Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xs md:text-sm font-mono uppercase tracking-[0.3em] text-[var(--accent)] mb-3 font-semibold flex items-center gap-2"
          >
            <FiCode className="animate-spin text-cyan-400" style={{ animationDuration: '6s' }} />
            <span>Computer Science Engineer @ NSUT</span>
          </motion.div>

          {/* Cinematic Main Title — letter by letter */}
          <h1 className="text-5xl md:text-7xl lg:text-[5.8rem] font-display font-black leading-[1.05] tracking-tighter mb-4 uppercase">
            <CinematicText text="HI, I'M" className="text-white block" delay={0.2} />
            <span className="block">
              <CinematicText 
                text={personalInfo.name}
                className="bg-gradient-to-r from-white via-cyan-200 to-[var(--accent)] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(99,102,241,0.3)]"
                delay={0.5}
              />
            </span>
          </h1>

          {/* Dynamic Role Flipper */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mb-6 py-1 px-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md"
          >
            <DynamicRole />
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-xl mb-8 font-normal"
          >
            Engineering full-stack architectures, predictive AI models, anti-hallucination RAG frameworks, and high-performance business intelligence applications.
          </motion.p>

          {/* Floating Tech Badges — staggered */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex flex-wrap gap-2 mb-10"
          >
            {techBadges.map((tech, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 15, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, delay: 1 + i * 0.06 }}
                whileHover={{ scale: 1.08, borderColor: 'rgba(99, 102, 241, 0.5)' }}
                className="px-3 py-1.5 text-xs font-mono rounded-lg border border-white/10 bg-white/5 text-gray-300 backdrop-blur-md hover:text-white transition-all shadow-sm cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>

          {/* Action CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="group h-13 px-8 rounded-full bg-gradient-to-r from-white via-gray-100 to-gray-200 text-black font-mono text-xs uppercase tracking-wider font-bold flex items-center gap-3 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-all duration-300 cursor-pointer shadow-xl relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Explore Projects <FiArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </Magnetic>
            <Magnetic>
              <button 
                onClick={() => document.getElementById('resume')?.scrollIntoView({ behavior: 'smooth' })}
                className="h-13 px-8 rounded-full glass-panel text-white font-mono text-xs uppercase tracking-wider font-bold flex items-center gap-3 hover:bg-white/15 hover:border-white/30 transition-all cursor-pointer shadow-lg neon-glow"
              >
                Get Resume <FiDownload size={16} />
              </button>
            </Magnetic>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="flex items-center gap-3 mt-8"
          >
            <a href={personalInfo.github} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all">
              <FiGithub size={16} />
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all">
              <FiLinkedin size={16} />
            </a>
            <div className="h-px w-12 bg-gradient-to-r from-white/20 to-transparent ml-2" />
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Connect with me</span>
          </motion.div>
        </div>

        {/* Right Column: Photo / CLI Switcher */}
        <div className="lg:col-span-6 relative h-[560px] lg:h-[700px] w-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            {viewMode === 'photo' ? (
              <motion.div
                key="photo-hero"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full relative flex items-center justify-center"
              >
                <FloatingPhotoCard />
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
