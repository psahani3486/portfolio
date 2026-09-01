import React, { useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue, useInView } from 'framer-motion'
import { FiCode, FiServer, FiDatabase, FiCpu, FiTool, FiLayout } from 'react-icons/fi'
import { skillCategories } from '../data/resumeData'
import FourDxTiltCard from './fourD/FourDxTiltCard'
import SkillRadar from './SkillRadar'

// Map missing icons
const iconLookup = {
  code: <FiCode />,
  layout: <FiLayout />,
  server: <FiServer />,
  database: <FiDatabase />,
  cpu: <FiCpu />,
  tool: <FiTool />,
  'bar-chart': <FiCpu />,
}

/* ═══════════════════════════════════════════════
   SKILL PROFICIENCY DATA
   ═══════════════════════════════════════════════ */
const skillProficiency = {
  'Languages': 90,
  'Data Science & BI': 85,
  'Frontend & UI': 92,
  'Backend & APIs': 88,
  'Databases & Tools': 85,
  'Core CS & AI': 90,
}

/* ═══════════════════════════════════════════════
   LIQUID PROFICIENCY BAR
   ═══════════════════════════════════════════════ */
function LiquidBar({ percentage, color, delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <div ref={ref} className="mt-5">
      <div className="flex justify-between items-center mb-2">
        <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Proficiency</span>
        <span className="text-[10px] font-mono font-bold" style={{ color }}>{percentage}%</span>
      </div>
      <div className="w-full h-1.5 bg-white/5 rounded-full liquid-bar overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration: 1.5, delay: delay, ease: [0.4, 0, 0.2, 1] }}
          className="h-full rounded-full relative"
          style={{
            background: `linear-gradient(90deg, ${color}, ${color}cc)`,
            boxShadow: `0 0 10px ${color}40`,
          }}
        />
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════
   SKILL CARD — Vertical holographic card
   ═══════════════════════════════════════════════ */
const SkillCard = ({ cat, index }) => {
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
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
        onMouseMove={handleMouseMove}
        className="group relative p-6 sm:p-7 rounded-2xl glass-card overflow-hidden h-full flex flex-col justify-between gradient-border-card min-h-[320px]"
      >
        {/* Mouse follow glow */}
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100 z-0 mix-blend-overlay"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                400px circle at ${mouseX}px ${mouseY}px,
                ${cat.color}25,
                transparent 80%
              )
            `,
          }}
        />
        
        <div className="relative z-10 flex flex-col h-full justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 6 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="w-11 h-11 rounded-xl flex items-center justify-center text-lg border shadow-lg"
                style={{ 
                  backgroundColor: `${cat.color}15`, 
                  color: cat.color, 
                  borderColor: `${cat.color}30`,
                  boxShadow: `0 0 15px ${cat.color}20`
                }}
              >
                {iconLookup[cat.icon] || <FiCode />}
              </motion.div>

              <span className="text-[10px] font-mono px-2.5 py-1 rounded-full border border-white/10 bg-white/5 text-gray-400 uppercase tracking-wider">
                {cat.skills.length} Skills
              </span>
            </div>
            
            <h3 className="text-lg font-display font-bold text-white mb-2 tracking-tight uppercase">
              {cat.title}
            </h3>
            
            <div className="flex flex-wrap gap-1.5 mt-3 mb-6">
              {cat.skills.map((skill, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 + idx * 0.02 }}
                  whileHover={{ scale: 1.05, borderColor: `${cat.color}60` }}
                  className="px-2.5 py-1 text-xs font-mono rounded-md border border-white/10 bg-white/5 text-gray-300 transition-all cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Liquid proficiency bar at bottom */}
          <div className="pt-3 border-t border-white/5">
            <LiquidBar 
              percentage={skillProficiency[cat.title] || 85} 
              color={cat.color} 
              delay={index * 0.08}
            />
          </div>
        </div>
      </motion.div>
    </FourDxTiltCard>
  )
}

/* ═══════════════════════════════════════════════
   SKILLS SECTION
   ═══════════════════════════════════════════════ */
export default function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32 relative overflow-hidden bg-[var(--bg-primary)]">
      <div className="absolute inset-0 bg-noise opacity-8 mix-blend-overlay pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        <div className="mb-12 text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-xs font-mono tracking-[0.25em] uppercase text-[var(--accent)] mb-2 block font-semibold"
            >
              [ 03 / TECHNICAL CAPABILITIES ]
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-display font-bold uppercase tracking-tighter text-white"
            >
              Skills &amp; <span className="text-gradient">Proficiency</span>
            </motion.h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {skillCategories.map((cat, index) => (
            <SkillCard key={cat.title} cat={cat} index={index} />
          ))}
        </div>

        {/* Skill Radar Constellation */}
        <div className="mt-20 flex flex-col items-center">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs font-mono tracking-[0.3em] uppercase text-[var(--accent)] mb-8 font-semibold"
          >
            [ Proficiency Radar Map ]
          </motion.h3>
          <SkillRadar />
        </div>

      </div>
    </section>
  )
}
