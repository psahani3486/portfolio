import React from 'react'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { experience } from '../data/resumeData'
import { Briefcase, Calendar, MapPin, CheckCircle2, Sparkles, Terminal, Cpu } from 'lucide-react'
import FourDxTiltCard from './fourD/FourDxTiltCard'

/* ═══════════════════════════════════════════════
   EXPERIENCE VERTICAL CARD
   ═══════════════════════════════════════════════ */
function ExperienceCard({ exp, index }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  const isML = exp.role.toLowerCase().includes('machine learning') || exp.role.toLowerCase().includes('ai')

  return (
    <FourDxTiltCard tiltIntensity={6}>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        onMouseMove={handleMouseMove}
        className="group relative rounded-2xl overflow-hidden glass-card flex flex-col h-full min-h-[460px] gradient-border-card"
      >
        {/* Interactive Glow */}
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100 z-20 mix-blend-overlay"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                400px circle at ${mouseX}px ${mouseY}px,
                rgba(255,255,255,0.06),
                transparent 40%
              )
            `,
          }}
        />

        {/* Top Header Banner */}
        <div className="relative h-44 sm:h-48 bg-[#060610] overflow-hidden border-b border-[var(--border-color)] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/15 via-purple-500/10 to-cyan-500/15 opacity-40 group-hover:opacity-75 transition-opacity duration-700 mix-blend-overlay" />
          <div className="absolute inset-0 bg-noise opacity-15" />

          {/* Mini Terminal / HUD Frame */}
          <div className="relative z-10 w-full max-w-[300px] rounded-xl border border-white/10 bg-black/60 p-3.5 flex flex-col justify-between shadow-xl backdrop-blur-sm">
            <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500/80" />
                <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
                <span className="w-2 h-2 rounded-full bg-green-500/80" />
              </div>
              <span className="text-[9px] font-mono text-cyan-400 tracking-wider uppercase flex items-center gap-1">
                <Terminal size={10} /> Verified Experience
              </span>
            </div>

            <div className="flex items-center gap-3 my-1.5">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[var(--accent)] shrink-0 shadow-inner">
                {isML ? <Cpu size={22} className="text-cyan-400" /> : <Briefcase size={22} className="text-purple-400" />}
              </div>
              <div>
                <div className="text-xs font-mono text-white font-bold tracking-tight">
                  {exp.company}
                </div>
                <div className="text-[10px] font-mono text-[var(--accent)] flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  {exp.type} • {exp.location}
                </div>
              </div>
            </div>

            <div className="mt-1 pt-1.5 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-gray-400">
              <span className="flex items-center gap-1 text-gray-300">
                <Calendar size={11} className="text-[var(--accent)]" /> {exp.period}
              </span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 size={11} /> Completed
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Content Body */}
        <div className="p-5 md:p-6 flex flex-col flex-1 relative z-30">
          <div className="mb-3">
            <span className="inline-block px-2.5 py-0.5 text-[9px] font-mono font-bold tracking-widest uppercase rounded-full bg-white/5 border border-white/10 text-gray-300 mb-2">
              {exp.period}
            </span>
            <h3 className="text-lg md:text-xl font-display font-bold text-white mb-1 tracking-tight leading-snug">
              {exp.role}
            </h3>
            <div className="text-xs font-mono text-[var(--accent)] font-semibold flex items-center gap-1.5">
              <Sparkles size={12} className="text-cyan-400" /> {exp.company}
            </div>
          </div>

          <ul className="space-y-2.5 mb-6 flex-1">
            {exp.highlights.map((highlight, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + idx * 0.05 }}
                className="flex items-start gap-2.5 text-xs text-[var(--text-secondary)] leading-relaxed"
              >
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0 shadow-[0_0_8px_var(--accent)]" />
                <span>{highlight}</span>
              </motion.li>
            ))}
          </ul>

          <div className="mt-auto pt-4 border-t border-white/5">
            <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-2">
              Technologies & Core Domains
            </div>
            <div className="flex flex-wrap gap-1.5">
              {exp.tech.map((t, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.02 }}
                  whileHover={{ scale: 1.05, borderColor: 'rgba(99, 102, 241, 0.4)' }}
                  className="px-2.5 py-0.5 text-[10px] font-mono rounded-md border border-white/10 bg-white/5 text-gray-300 cursor-default transition-all"
                >
                  {t}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </FourDxTiltCard>
  )
}

/* ═══════════════════════════════════════════════
   EXPERIENCE SECTION
   ═══════════════════════════════════════════════ */
export default function Experience() {
  return (
    <section id="experience" className="py-16 md:py-20 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* Title */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-xs font-mono tracking-[0.25em] uppercase text-[var(--accent)] mb-2 block"
            >
              [ 05 / ENGINEERING EXPERIENCE ]
            </motion.h2>
            <motion.h3
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-display font-bold uppercase tracking-tighter text-white"
            >
              Professional <span className="text-gradient">Experience</span>
            </motion.h3>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-xs font-mono text-[var(--text-secondary)] uppercase tracking-widest max-w-xs text-left md:text-right">
              Production internships & engineering roles in Machine Learning & Full-Stack Systems
            </p>
          </motion.div>
        </div>

        {/* Vertical Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {experience.map((exp, index) => (
            <ExperienceCard key={index} exp={exp} index={index} />
          ))}
        </div>

      </div>
    </section>
  )
}
