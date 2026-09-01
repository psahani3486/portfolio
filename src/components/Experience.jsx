import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { experience } from '../data/resumeData'
import { Briefcase } from 'lucide-react'

/* ═══════════════════════════════════════════════
   ANIMATED TIMELINE LINE — draws as you scroll
   ═══════════════════════════════════════════════ */
function AnimatedTimelineLine() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end center'],
  })
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <div ref={ref} className="absolute left-[28px] md:left-1/2 top-0 bottom-0 md:-translate-x-1/2 w-px">
      {/* Background track */}
      <div className="absolute inset-0 w-full bg-white/5" />
      {/* Animated fill */}
      <motion.div
        className="absolute top-0 left-0 w-full origin-top"
        style={{
          scaleY,
          height: '100%',
          background: 'linear-gradient(180deg, var(--accent), var(--accent-purple), var(--accent))',
          boxShadow: '0 0 10px rgba(99, 102, 241, 0.3), 0 0 20px rgba(99, 102, 241, 0.15)',
        }}
      />
    </div>
  )
}

/* ═══════════════════════════════════════════════
   PULSING TIMELINE NODE
   ═══════════════════════════════════════════════ */
function TimelineNode({ index, isEven }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: 300 }}
      className={`absolute left-0 md:left-1/2 w-10 h-10 bg-[var(--bg-primary)] border-2 rounded-full flex items-center justify-center transform md:-translate-x-1/2 z-20 ${isEven ? '' : 'md:order-1'}`}
      style={{ borderColor: isInView ? 'var(--accent)' : 'var(--border-color)' }}
    >
      <motion.div
        animate={isInView ? {
          boxShadow: [
            '0 0 0px rgba(99, 102, 241, 0)',
            '0 0 15px rgba(99, 102, 241, 0.4)',
            '0 0 0px rgba(99, 102, 241, 0)',
          ]
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
        className="w-7 h-7 rounded-full bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)]"
      >
        <Briefcase size={13} />
      </motion.div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════
   EXPERIENCE CARD
   ═══════════════════════════════════════════════ */
function ExperienceCard({ exp, index, isEven }) {
  return (
    <div className={`w-full md:w-1/2 ${isEven ? 'md:pr-10 text-left md:text-right' : 'md:pl-10 md:order-2 text-left'}`}>
      <motion.div
        initial={{ opacity: 0, x: isEven ? -40 : 40, rotateY: isEven ? -4 : 4 }}
        whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.12 }}
        whileHover={{ y: -3, transition: { duration: 0.25 } }}
        className="glass-card p-5 md:p-6 rounded-2xl ml-[50px] md:ml-0 relative group gradient-border-card overflow-hidden"
      >
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)]/0 via-[var(--accent)]/5 to-[var(--accent-purple)]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2.5 flex-wrap justify-start" style={{ justifyContent: isEven ? 'inherit' : 'flex-start' }}>
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-gray-300"
            >
              {exp.period}
            </motion.span>
          </div>
          
          <h4 className="text-lg md:text-xl font-bold text-white mb-1 tracking-tight">{exp.role}</h4>
          <div className="text-sm text-[var(--accent)] font-medium mb-3">{exp.company}</div>
          
          <ul className="space-y-2 mb-4">
            {exp.highlights.map((highlight, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: isEven ? -15 : 15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + idx * 0.08 }}
                className="flex items-start gap-2.5 text-xs md:text-sm text-[var(--text-secondary)] text-left"
              >
                <span className="mt-1.5 w-1 h-1 rounded-full bg-[var(--accent)] shrink-0 animate-pulse" />
                <span className="leading-relaxed">{highlight}</span>
              </motion.li>
            ))}
          </ul>

          <div className={`flex flex-wrap gap-1.5 ${isEven ? 'md:justify-end' : 'justify-start'}`}>
            {exp.tech.map((tech, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + idx * 0.04 }}
                className="px-2.5 py-0.5 text-[11px] font-mono rounded-md bg-[#0c0c12] border border-white/5 text-gray-400 hover:border-[var(--accent)]/30 hover:text-gray-300 transition-all"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

/* ═══════════════════════════════════════════════
   EXPERIENCE SECTION
   ═══════════════════════════════════════════════ */
export default function Experience() {
  return (
    <section id="experience" className="py-16 md:py-20 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Title */}
        <div className="mb-10 text-left">
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
              [ 05 / ENGINEERING EXPERIENCE ]
            </motion.h2>
            <motion.h3
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-display font-bold uppercase tracking-tighter text-white"
            >
              Professional <span className="text-gradient">Timeline</span>
            </motion.h3>
          </motion.div>
        </div>

        {/* Timeline Cards */}
        <div className="relative">
          {/* Animated Timeline Line */}
          <AnimatedTimelineLine />

          <div className="space-y-8 md:space-y-10 relative z-10">
            {experience.map((exp, index) => {
              const isEven = index % 2 === 0
              
              return (
                <div key={index} className="relative flex flex-col md:flex-row items-center w-full">
                  <ExperienceCard exp={exp} index={index} isEven={isEven} />
                  <TimelineNode index={index} isEven={isEven} />
                  <div className="hidden md:block w-1/2" />
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}
