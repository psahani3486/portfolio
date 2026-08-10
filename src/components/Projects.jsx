import React, { useState, Suspense, lazy } from 'react'
import { motion, AnimatePresence, useMotionTemplate, useMotionValue } from 'framer-motion'
import { FiGithub, FiExternalLink, FiLayers, FiCpu, FiCheckCircle, FiX, FiActivity, FiZap } from 'react-icons/fi'
import { projects } from '../data/resumeData'
import FourDxTiltCard from './fourD/FourDxTiltCard'

const ProjectHologram = lazy(() => import('./three/ProjectHologram'))

// Interactive System Architecture Diagrams
const SystemArchitectureDiagram = ({ projectTitle }) => {
  if (projectTitle.includes('RAG')) {
    return (
      <div className="w-full p-6 rounded-2xl bg-black/60 border border-cyan-500/20 font-mono text-xs text-gray-300">
        <div className="text-center font-bold text-cyan-400 mb-6 uppercase tracking-wider text-sm flex items-center justify-center gap-2">
          <FiCpu /> Parallel RAG Anti-Hallucination Architecture
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center text-center">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="font-bold text-white mb-1">1. User Query</div>
            <div className="text-[10px] text-gray-400">FastAPI REST</div>
          </div>
          <div className="text-cyan-400 font-bold hidden md:block">➔</div>
          <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30">
            <div className="font-bold text-cyan-300 mb-1">2. Parallel Retrieval</div>
            <div className="text-[10px] text-cyan-400">Python ThreadPool</div>
          </div>
          <div className="text-cyan-400 font-bold hidden md:block">➔</div>
          <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30">
            <div className="font-bold text-purple-300 mb-1">3. Grounding & LLM</div>
            <div className="text-[10px] text-purple-400">Latency 8-14s</div>
          </div>
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
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="font-bold text-white mb-1">Food Donor</div>
            <div className="text-[10px] text-gray-400">Next.js Dashboard</div>
          </div>
          <div className="text-emerald-400 font-bold hidden md:block">➔</div>
          <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30">
            <div className="font-bold text-emerald-300 mb-1">PostgreSQL & Prisma</div>
            <div className="text-[10px] text-emerald-400">Role JWT & Realtime</div>
          </div>
          <div className="text-emerald-400 font-bold hidden md:block">➔</div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="font-bold text-white mb-1">NGO & QR Verify</div>
            <div className="text-[10px] text-gray-400">Volunteer Dispatch</div>
          </div>
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
        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
          <div className="font-bold text-white mb-1">Data Ingestion</div>
          <div className="text-[10px] text-gray-400">Preprocessing & Scaling</div>
        </div>
        <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30">
          <div className="font-bold text-purple-300 mb-1">ML Inference Engine</div>
          <div className="text-[10px] text-purple-400">TensorFlow / Spark</div>
        </div>
        <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30">
          <div className="font-bold text-cyan-300 mb-1">Analytics Dashboard</div>
          <div className="text-[10px] text-cyan-400">Real-time Visualization</div>
        </div>
      </div>
    </div>
  )
}

// Project Detail Modal
const ProjectModal = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState('architecture')

  if (!project) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="w-full max-w-3xl glass-card rounded-3xl border border-white/10 overflow-hidden bg-[#0d0d14]/95 shadow-2xl flex flex-col max-h-[90vh]"
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
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* Modal Tabs */}
          <div className="flex items-center gap-2 px-6 pt-4 border-b border-white/10 bg-black/20 font-mono text-xs">
            <button
              onClick={() => setActiveTab('architecture')}
              className={`px-4 py-2 rounded-t-xl transition-all ${activeTab === 'architecture'
                  ? 'bg-white/10 text-white font-bold border-t border-x border-white/10'
                  : 'text-gray-400 hover:text-white'
                }`}
            >
              System Architecture
            </button>
            <button
              onClick={() => setActiveTab('details')}
              className={`px-4 py-2 rounded-t-xl transition-all ${activeTab === 'details'
                  ? 'bg-white/10 text-white font-bold border-t border-x border-white/10'
                  : 'text-gray-400 hover:text-white'
                }`}
            >
              Engineering Deep Dive
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-1">
            {activeTab === 'architecture' ? (
              <div className="space-y-6">
                <SystemArchitectureDiagram projectTitle={project.title} />
                <div>
                  <h4 className="text-sm font-mono uppercase text-gray-400 mb-2">Core System Objectives:</h4>
                  <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                    {project.description}
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
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
              </div>
            )}
          </div>

          {/* Modal Footer Links */}
          <div className="p-6 border-t border-white/10 bg-black/40 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {project.githubUrl !== '#' && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-full glass-panel text-xs font-mono font-bold text-white flex items-center gap-2 hover:bg-white/20 transition-all"
                >
                  <FiGithub size={16} /> GitHub Source
                </a>
              )}
              {project.liveUrl !== '#' && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-full bg-[var(--accent)] text-black text-xs font-mono font-bold flex items-center gap-2 hover:scale-105 transition-all"
                >
                  <FiExternalLink size={16} /> Live Application
                </a>
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
      </div>
    </AnimatePresence>
  )
}

const ProjectCard = ({ project, index, onOpenModal }) => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <FourDxTiltCard tiltIntensity={8}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: index * 0.1 }}
        onMouseMove={handleMouseMove}
        className="group relative rounded-[2rem] overflow-hidden glass-card flex flex-col lg:flex-row min-h-[480px] h-full"
      >
        {/* Interactive Glow */}
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-20 mix-blend-overlay"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                600px circle at ${mouseX}px ${mouseY}px,
                rgba(255,255,255,0.1),
                transparent 40%
              )
            `,
          }}
        />

        {/* Left: Graphic Mockup Container with 3D Hologram */}
        <div className="lg:w-[45%] relative bg-[#0a0a10] overflow-hidden border-b lg:border-b-0 lg:border-r border-[var(--border-color)] flex items-center justify-center p-8">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/20 to-[var(--accent-purple)]/20 opacity-40 group-hover:opacity-60 transition-opacity duration-700 mix-blend-overlay" />
          <div className="absolute inset-0 bg-noise opacity-20" />

          {/* 3D Hologram Background */}
          <Suspense fallback={null}>
            <ProjectHologram featured={project.featured} />
          </Suspense>

          {/* Animated App Frame Mockup */}
          <div className="relative z-10 w-full h-full max-h-[300px] rounded-2xl border border-white/10 bg-black/60 p-5 flex flex-col justify-between shadow-2xl group-hover:scale-105 transition-transform duration-700 backdrop-blur-sm">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              <span className="text-[10px] font-mono text-cyan-400 tracking-wider uppercase">System Architecture</span>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center my-4">
              <span className="text-6xl mb-3">{project.emoji}</span>
              <div className="text-xs font-mono text-white font-bold uppercase tracking-widest text-center">
                {project.title.split('—')[0]}
              </div>
            </div>

            <button
              onClick={() => onOpenModal(project)}
              className="w-full py-2 rounded-xl bg-white/10 hover:bg-[var(--accent)] hover:text-black font-mono text-xs font-bold transition-all text-white flex items-center justify-center gap-2 cursor-pointer"
            >
              <FiLayers /> View Architecture & Flow
            </button>
          </div>
        </div>

        {/* Right: Content */}
        <div className="lg:w-[55%] p-8 lg:p-14 flex flex-col justify-center relative z-30">

          {project.featured && (
            <div className="mb-4">
              <span className="px-4 py-1.5 text-xs font-mono font-bold tracking-widest uppercase rounded-full bg-[var(--accent)] text-black">
                Featured Project
              </span>
            </div>
          )}

          <h3 className="text-2xl lg:text-4xl font-display font-bold text-white mb-4 leading-tight uppercase tracking-tight">
            {project.title}
          </h3>

          <p className="text-base text-[var(--text-secondary)] leading-relaxed mb-8">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-10">
            {project.tech.map((t, i) => (
              <span key={i} className="px-3 py-1.5 text-xs font-mono rounded-md border border-white/10 bg-white/5 text-gray-300">
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-6 mt-auto pt-6 border-t border-white/5">
            <button
              onClick={() => onOpenModal(project)}
              className="text-xs font-mono font-bold uppercase tracking-widest text-[var(--accent)] hover:underline flex items-center gap-1 cursor-pointer"
            >
              System Deep Dive ➔
            </button>

            {project.githubUrl !== '#' && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white hover:text-[var(--accent)] transition-colors ml-auto">
                <FiGithub size={16} /> Code
              </a>
            )}
            {project.liveUrl !== '#' && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white hover:text-[var(--accent)] transition-colors">
                <FiExternalLink size={16} /> Demo
              </a>
            )}
          </div>

        </div>
      </motion.div>
    </FourDxTiltCard>
  )
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <section id="projects" className="py-32 relative">
      <div className="max-w-[1400px] mx-auto px-6">

        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xs font-mono tracking-[0.25em] uppercase text-[var(--accent)] mb-3 block">
              [ 04 / FEATURED PROJECTS & SYSTEMS ]
            </h2>
            <h3 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tighter text-white">
              Featured <br /><span className="text-gradient">Projects</span>
            </h3>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-sm font-mono text-[var(--text-secondary)] uppercase tracking-widest max-w-xs text-left md:text-right">
              Click any project for interactive architecture diagrams & engineering deep dive
            </p>
          </motion.div>
        </div>

        <div className="flex flex-col gap-16">
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
