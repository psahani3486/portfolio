import React from 'react'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import { projects } from '../data/resumeData'

const ProjectCard = ({ project, index }) => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      className="group relative rounded-[2rem] overflow-hidden glass-card flex flex-col lg:flex-row min-h-[500px]"
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

      {/* Left: Media Placeholder */}
      <div className="lg:w-[45%] relative bg-[#0a0a0a] overflow-hidden border-b lg:border-b-0 lg:border-r border-[var(--border-color)]">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/20 to-[var(--accent-purple)]/20 opacity-40 group-hover:opacity-60 transition-opacity duration-700 mix-blend-overlay" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        <div className="absolute inset-0 flex items-center justify-center text-[10rem] opacity-30 transform group-hover:scale-110 transition-transform duration-700 ease-out">
          {project.emoji}
        </div>
      </div>

      {/* Right: Content */}
      <div className="lg:w-[55%] p-10 lg:p-16 flex flex-col justify-center relative z-30">
        
        {project.featured && (
          <div className="mb-6">
            <span className="px-4 py-1.5 text-xs font-mono font-bold tracking-widest uppercase rounded-full bg-[var(--accent)] text-black">
              Featured Project
            </span>
          </div>
        )}
        
        <h3 className="text-3xl lg:text-4xl font-display font-bold text-white mb-6 leading-tight uppercase tracking-tight">
          {project.title}
        </h3>
        
        <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-10">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-12">
          {project.tech.map((t, i) => (
            <span key={i} className="px-3 py-1.5 text-xs font-mono rounded-md border border-white/10 bg-white/5 text-gray-300">
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-6 mt-auto pt-8 border-t border-white/5">
          {project.githubUrl !== '#' && (
            <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white hover:text-[var(--accent)] transition-colors">
              <FiGithub size={18} /> Source Code
            </a>
          )}
          {project.liveUrl !== '#' && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white hover:text-[var(--accent)] transition-colors">
              <FiExternalLink size={18} /> Live Demo
            </a>
          )}
        </div>

      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="py-32 relative">
      <div className="max-w-[1400px] mx-auto px-6">
        
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-mono tracking-[0.3em] uppercase text-[var(--accent)] mb-4 block">
              05. Selected Works
            </h2>
            <h3 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tighter text-white">
              Featured <br/><span className="text-gradient">Projects</span>
            </h3>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-sm font-mono text-[var(--text-secondary)] uppercase tracking-widest max-w-xs text-left md:text-right">
              Showcasing my latest full-stack & AI solutions
            </p>
          </motion.div>
        </div>

        <div className="flex flex-col gap-16">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>

      </div>
    </section>
  )
}
