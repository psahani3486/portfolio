import React, { useState, Suspense, lazy } from 'react'
import { motion, AnimatePresence, useMotionTemplate, useMotionValue } from 'framer-motion'
import { FiGithub, FiExternalLink, FiLayers, FiCpu, FiCheckCircle, FiX, FiActivity, FiZap } from 'react-icons/fi'
import { projects } from '../data/resumeData'
import FourDxTiltCard from './fourD/FourDxTiltCard'

const ProjectHologram = lazy(() => import('./three/ProjectHologram'))

/* ═══════════════════════════════════════════════
   ANIMATED PROJECT ICON
   ═══════════════════════════════════════════════ */
function AnimatedProjectIcon({ emoji, featured }) {
  return (
    <motion.div
      animate={{
        y: [0, -4, 0],
        rotate: [0, 3, -3, 0],
      }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      className="relative flex items-center justify-center"
    >
      <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl shadow-inner backdrop-blur-md">
        <span>{emoji}</span>
      </div>
      {featured && (
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -inset-2 rounded-2xl bg-[var(--accent)]/20 blur-lg"
        />
      )}
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════
   SYSTEM ARCHITECTURE DIAGRAMS
   ═══════════════════════════════════════════════ */
const SystemArchitectureDiagram = ({ projectTitle }) => {
  if (projectTitle.includes('RAG')) {
    return (
      <div className="w-full p-6 rounded-2xl bg-black/60 border border-cyan-500/20 font-mono text-xs text-gray-300">
        <div className="text-center font-bold text-cyan-400 mb-6 uppercase tracking-wider text-sm flex items-center justify-center gap-2">
          <FiCpu /> Parallel RAG Anti-Hallucination Architecture
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center text-center">
          <motion.div whileHover={{ scale: 1.05 }} className="p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="font-bold text-white mb-1">1. User Query</div>
            <div className="text-[10px] text-gray-400">FastAPI REST</div>
          </motion.div>
          <div className="text-cyan-400 font-bold hidden md:block">➔</div>
          <motion.div whileHover={{ scale: 1.05 }} className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30">
            <div className="font-bold text-cyan-300 mb-1">2. Parallel Retrieval</div>
            <div className="text-[10px] text-cyan-400">Python ThreadPool</div>
          </motion.div>
          <div className="text-cyan-400 font-bold hidden md:block">➔</div>
          <motion.div whileHover={{ scale: 1.05 }} className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30">
            <div className="font-bold text-purple-300 mb-1">3. Grounding & LLM</div>
            <div className="text-[10px] text-purple-400">Latency 8-14s</div>
          </motion.div>
        </div>
      </div>
    )
  }

  if (projectTitle.includes('FeedLink')) {
    return (
      <div className="w-full p-6 rounded-2xl bg-black/60 border border-emerald-500/20 font-mono text-xs text-gray-300">
        <div className="text-center font-bold text-emerald-400 mb-6 uppercase tracking-wider text-sm flex items-center justify-center gap-2">
          <FiLayers /> Donor-to-NGO Redistribution Pipeline
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center text-center">
          <motion.div whileHover={{ scale: 1.05 }} className="p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="font-bold text-white mb-1">Food Donor</div>
            <div className="text-[10px] text-gray-400">Next.js Dashboard</div>
          </motion.div>
          <div className="text-emerald-400 font-bold hidden md:block">➔</div>
          <motion.div whileHover={{ scale: 1.05 }} className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30">
            <div className="font-bold text-emerald-300 mb-1">PostgreSQL & Prisma</div>
            <div className="text-[10px] text-emerald-400">Role JWT & Realtime</div>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="font-bold text-white mb-1">NGO & QR Verify</div>
            <div className="text-[10px] text-gray-400">Volunteer Dispatch</div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full p-6 rounded-2xl bg-black/60 border border-purple-500/20 font-mono text-xs text-gray-300">
      <div className="text-center font-bold text-purple-400 mb-6 uppercase tracking-wider text-sm flex items-center justify-center gap-2">
        <FiActivity /> AI Data Processing & Inference Pipeline
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <motion.div whileHover={{ scale: 1.05 }} className="p-3 rounded-xl bg-white/5 border border-white/10">
          <div className="font-bold text-white mb-1">Data Ingestion</div>
          <div className="text-[10px] text-gray-400">Preprocessing & Scaling</div>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30">
          <div className="font-bold text-purple-300 mb-1">ML Inference Engine</div>
          <div className="text-[10px] text-purple-400">TensorFlow / Spark</div>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30">
          <div className="font-bold text-cyan-300 mb-1">Analytics Dashboard</div>
          <div className="text-[10px] text-cyan-400">Real-time Visualization</div>
        </motion.div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════
   PROJECT DETAIL MODAL
   ═══════════════════════════════════════════════ */
const ProjectModal = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState('architecture')

  if (!project) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 30 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-3xl glass-card rounded-3xl border border-white/10 overflow-hidden bg-[#080810]/98 shadow-[0_0_80px_rgba(99,102,241,0.1)] flex flex-col max-h-[90vh]"
          onClick={e => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="p-6 md:p-8 border-b border-white/10 flex items-start justify-between bg-black/40">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{project.emoji}</span>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-white uppercase tracking-tight">
                  {project.title}
                </h3>
              </div>
              <p className="text-sm font-mono text-[var(--accent)]">
                {project.tech.join(' • ')}
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            >
              <FiX size={20} />
            </motion.button>
          </div>

          {/* Modal Tabs */}
          <div className="flex items-center gap-2 px-6 pt-4 border-b border-white/10 bg-black/20 font-mono text-xs">
            {['architecture', 'details'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-4 py-2 rounded-t-xl transition-all ${activeTab === tab
                    ? 'text-white font-bold'
                    : 'text-gray-400 hover:text-white'
                  }`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="projectModalTab"
                    className="absolute inset-0 bg-white/10 rounded-t-xl border-t border-x border-white/10"
                    style={{ zIndex: -1 }}
                  />
                )}
                <span className="relative z-10">{tab === 'architecture' ? 'System Architecture' : 'Engineering Deep Dive'}</span>
              </button>
            ))}
          </div>

          {/* Modal Content */}
          <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-1">
            <AnimatePresence mode="wait">
              {activeTab === 'architecture' ? (
                <motion.div
                  key="arch"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <SystemArchitectureDiagram projectTitle={project.title} />
                  <div>
                    <h4 className="text-sm font-mono uppercase text-gray-400 mb-2">Core System Objectives:</h4>
                    <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                      {project.description}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div>
                    <h4 className="text-sm font-mono uppercase text-[var(--accent)] mb-3">Key Technical Wins:</h4>
                    <ul className="space-y-2 text-sm text-gray-300 font-mono">
                      <li className="flex items-start gap-2">
                        <FiZap className="text-amber-400 mt-1 shrink-0" />
                        <span>Optimized response pipeline with multi-threading and caching strategies.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FiCheckCircle className="text-emerald-400 mt-1 shrink-0" />
                        <span>Built for high availability and low resource footprint.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FiCpu className="text-cyan-400 mt-1 shrink-0" />
                        <span>Decoupled backend API architecture for effortless horizontal scaling.</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Modal Footer Links */}
          <div className="p-6 border-t border-white/10 bg-black/40 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {project.githubUrl !== '#' && (
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-full glass-panel text-xs font-mono font-bold text-white flex items-center gap-2 hover:bg-white/20 transition-all"
                >
                  <FiGithub size={16} /> GitHub Source
                </motion.a>
              )}
              {project.liveUrl !== '#' && (
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-full bg-[var(--accent)] text-black text-xs font-mono font-bold flex items-center gap-2 transition-all neon-glow"
                >
                  <FiExternalLink size={16} /> Live Application
                </motion.a>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-xs font-mono text-gray-400 hover:text-white"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

/* ═══════════════════════════════════════════════
   PROJECT CARD — with holographic effects
   ═══════════════════════════════════════════════ */
const ProjectCard = ({ project, index, onOpenModal }) => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <FourDxTiltCard tiltIntensity={6}>
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
        onMouseMove={handleMouseMove}
        className="group relative rounded-2xl overflow-hidden glass-card flex flex-col lg:flex-row min-h-[320px] h-full gradient-border-card"
      >
        {/* Interactive Glow */}
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100 z-20 mix-blend-overlay"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                500px circle at ${mouseX}px ${mouseY}px,
                rgba(255,255,255,0.06),
                transparent 40%
              )
            `,
          }}
        />

        {/* Left: Graphic Mockup Container with 3D Hologram */}
        <div className="lg:w-[38%] relative bg-[#060610] overflow-hidden border-b lg:border-b-0 lg:border-r border-[var(--border-color)] flex items-center justify-center p-5 md:p-6">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/15 to-[var(--accent-purple)]/15 opacity-40 group-hover:opacity-70 transition-opacity duration-700 mix-blend-overlay" />
          <div className="absolute inset-0 bg-noise opacity-15" />

          {/* 3D Hologram Background */}
          <Suspense fallback={null}>
            <ProjectHologram featured={project.featured} />
          </Suspense>

          {/* Animated App Frame Mockup */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 w-full rounded-xl border border-white/10 bg-black/60 p-4 flex flex-col justify-between shadow-xl backdrop-blur-sm"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500/80" />
                <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
                <span className="w-2 h-2 rounded-full bg-green-500/80" />
              </div>
              <span className="text-[9px] font-mono text-cyan-400 tracking-wider uppercase">System Architecture</span>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center my-3">
              <AnimatedProjectIcon emoji={project.emoji} featured={project.featured} />
              <div className="text-[11px] font-mono text-white font-bold uppercase tracking-wider text-center mt-2.5">
                {project.title.split('—')[0]}
              </div>
            </div>

            <motion.button
              whileHover={{ backgroundColor: 'var(--accent)' }}
              onClick={() => onOpenModal(project)}
              className="w-full py-2 rounded-lg bg-white/10 font-mono text-[11px] font-bold transition-all text-white flex items-center justify-center gap-1.5 cursor-pointer hover:text-black mt-1"
            >
              <FiLayers size={13} /> View Architecture & Flow
            </motion.button>
          </motion.div>
        </div>

        {/* Right: Content */}
        <div className="lg:w-[62%] p-5 md:p-6 lg:p-8 flex flex-col justify-center relative z-30">

          {project.featured && (
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="mb-2"
            >
              <span className="px-3 py-1 text-[10px] font-mono font-bold tracking-widest uppercase rounded-full bg-[var(--accent)] text-black animate-neon-pulse">
                Featured Project
              </span>
            </motion.div>
          )}

          <h3 className="text-lg md:text-xl lg:text-2xl font-display font-bold text-white mb-2 leading-tight uppercase tracking-tight">
            {project.title}
          </h3>

          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tech.map((t, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                whileHover={{ scale: 1.05, borderColor: 'rgba(99, 102, 241, 0.4)' }}
                className="px-2.5 py-0.5 text-[11px] font-mono rounded-md border border-white/10 bg-white/5 text-gray-300 cursor-default transition-all"
              >
                {t}
              </motion.span>
            ))}
          </div>

          <div className="flex items-center gap-4 mt-auto pt-4 border-t border-white/5">
            <motion.button
              whileHover={{ scale: 1.03 }}
              onClick={() => onOpenModal(project)}
              className="text-[11px] font-mono font-bold uppercase tracking-widest text-[var(--accent)] hover:underline flex items-center gap-1 cursor-pointer"
            >
              System Deep Dive ➔
            </motion.button>

            {project.githubUrl !== '#' && (
              <motion.a whileHover={{ scale: 1.08 }} href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-white hover:text-[var(--accent)] transition-colors ml-auto">
                <FiGithub size={14} /> Code
              </motion.a>
            )}
            {project.liveUrl !== '#' && (
              <motion.a whileHover={{ scale: 1.08 }} href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-white hover:text-[var(--accent)] transition-colors">
                <FiExternalLink size={14} /> Demo
              </motion.a>
            )}
          </div>

        </div>
      </motion.div>
    </FourDxTiltCard>
  )
}

/* ═══════════════════════════════════════════════
   PROJECTS SECTION
   ═══════════════════════════════════════════════ */
export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <section id="projects" className="py-16 md:py-20 relative">
      <div className="max-w-[1400px] mx-auto px-6">

        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-xs font-mono tracking-[0.25em] uppercase text-[var(--accent)] mb-2 block"
            >
              [ 04 / FEATURED PROJECTS & SYSTEMS ]
            </motion.h2>
            <motion.h3
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-display font-bold uppercase tracking-tighter text-white"
            >
              Featured <span className="text-gradient">Projects</span>
            </motion.h3>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-xs font-mono text-[var(--text-secondary)] uppercase tracking-widest max-w-xs text-left md:text-right">
              Click any project for interactive architecture diagrams & engineering deep dive
            </p>
          </motion.div>
        </div>

        <div className="flex flex-col gap-6 md:gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              index={index}
              onOpenModal={(p) => setSelectedProject(p)}
            />
          ))}
        </div>

        {/* Project Modal */}
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}

      </div>
    </section>
  )
}
