import React, { Suspense, lazy } from 'react'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { FiCode, FiServer, FiDatabase, FiCpu, FiTool, FiLayout } from 'react-icons/fi'
import { skillCategories } from '../data/resumeData'
import FourDxTiltCard from './fourD/FourDxTiltCard'
import SkillRadar from './SkillRadar'

const FloatingSkillSpheres = lazy(() => import('./three/FloatingSkillSpheres'))

const iconMap = {
  code: <FiCode />,
  layout: <FiLayout />,
  server: <FiServer />,
  database: <FiDatabase />,
  cpu: <FiCpu />,
  tool: <FiTool />,
}

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

const SkillCard = ({ cat, index }) => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <FourDxTiltCard tiltIntensity={12}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        onMouseMove={handleMouseMove}
        className="group relative p-8 rounded-3xl glass-card overflow-hidden h-full"
      >
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-0"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                400px circle at ${mouseX}px ${mouseY}px,
                ${cat.color}20,
                transparent 80%
              )
            `,
          }}
        />
        
        <div className="relative z-10">
          <div 
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6 border transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
            style={{ 
              backgroundColor: `${cat.color}15`, 
              color: cat.color, 
              borderColor: `${cat.color}30` 
            }}
          >
            {iconLookup[cat.icon] || <FiCode />}
          </div>
          
          <h3 className="text-xl font-bold text-white mb-4 tracking-tight uppercase">
            {cat.title}
          </h3>
          
          <div className="flex flex-wrap gap-2 mt-4">
            {cat.skills.map((skill, idx) => (
              <span key={idx} className="px-3 py-1.5 text-xs font-mono rounded-md border border-white/10 bg-white/5 text-gray-300 transition-colors group-hover:border-white/20">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </FourDxTiltCard>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="py-32 relative overflow-hidden bg-[var(--bg-primary)]">
      <div className="absolute inset-0 bg-noise opacity-10 mix-blend-overlay pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        <div className="mb-16 text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-mono tracking-[0.3em] uppercase text-[var(--accent)] mb-4 block">
              03. Skills
            </span>
            <h2 className="text-5xl md:text-6xl font-display font-bold uppercase tracking-tighter text-white">
              Tech <span className="text-gradient">Stack</span>
            </h2>
          </motion.div>
        </div>

        {/* 3D Interactive Skill Spheres */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <Suspense fallback={
            <div className="w-full h-[400px] flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border-2 border-white/10 border-t-[var(--accent)] animate-spin" />
            </div>
          }>
            <FloatingSkillSpheres categories={skillCategories} />
          </Suspense>
          <div className="text-center mt-4">
            <span className="text-[10px] font-mono text-[var(--text-secondary)] uppercase tracking-widest">
              ↑ Hover over spheres to explore skills · Orbiting in 3D space
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
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
            className="text-sm font-mono tracking-[0.3em] uppercase text-[var(--accent)] mb-8"
          >
            Proficiency Radar
          </motion.h3>
          <SkillRadar />
        </div>

      </div>
    </section>
  )
}
