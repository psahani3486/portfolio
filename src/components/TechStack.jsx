import React from 'react'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { FiCode, FiServer, FiDatabase, FiCpu, FiGlobe, FiLayers } from 'react-icons/fi'

const architectureLayers = [
  {
    title: 'Frontend',
    icon: <FiGlobe />,
    color: '#a855f7',
    items: ['React', 'Next.js', 'Tailwind', 'Framer Motion'],
  },
  {
    title: 'Backend',
    icon: <FiServer />,
    color: '#06b6d4',
    items: ['Node.js', 'FastAPI', 'Express', 'NestJS'],
  },
  {
    title: 'Database',
    icon: <FiDatabase />,
    color: '#f59e0b',
    items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Prisma'],
  },
  {
    title: 'AI / ML',
    icon: <FiCpu />,
    color: '#22c55e',
    items: ['TensorFlow', 'RAG', 'LLMs', 'Scikit-Learn'],
  },
  {
    title: 'Languages',
    icon: <FiCode />,
    color: '#6366f1',
    items: ['C++', 'Python', 'JavaScript', 'TypeScript'],
  },
  {
    title: 'DevOps',
    icon: <FiLayers />,
    color: '#ec4899',
    items: ['Git', 'Docker', 'Vercel', 'REST APIs'],
  },
]

const TechCard = ({ layer, index }) => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      className="group relative p-8 rounded-3xl glass-card overflow-hidden"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              ${layer.color}20,
              transparent 80%
            )
          `,
        }}
      />
      
      <div className="relative z-10">
        <div 
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6 border transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
          style={{ 
            backgroundColor: `${layer.color}15`, 
            color: layer.color, 
            borderColor: `${layer.color}30` 
          }}
        >
          {layer.icon}
        </div>
        
        <h3 className="text-xl font-bold text-white mb-4 tracking-tight uppercase">
          {layer.title}
        </h3>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {layer.items.map((item, idx) => {
            const widthPercentage = Math.floor(Math.random() * 20) + 75; // Generate realistic mastery percentage
            return (
              <div key={idx} className="w-full">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-mono text-[var(--text-secondary)]">{item}</span>
                  <span className="text-xs font-mono text-gray-500">{widthPercentage}%</span>
                </div>
                <div className="h-1 w-full rounded-full bg-white/5 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${widthPercentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 + (idx * 0.1) }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: layer.color }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}

export default function TechStack() {
  return (
    <section id="tech-stack" className="py-32 relative">
      <div className="max-w-[1400px] mx-auto px-6">
        
        <div className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-mono tracking-[0.3em] uppercase text-[var(--accent)] mb-4 block">
              06. Architecture
            </span>
            <h2 className="text-5xl md:text-6xl font-display font-bold uppercase tracking-tighter text-white">
              System <span className="text-gradient">Stack</span>
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {architectureLayers.map((layer, index) => (
            <TechCard key={layer.title} layer={layer} index={index} />
          ))}
        </div>

      </div>
    </section>
  )
}
