import React, { useState } from 'react'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { FiCode, FiServer, FiDatabase, FiCpu, FiGlobe, FiLayers, FiCheck } from 'react-icons/fi'

const architectureLayers = [
  {
    id: 'frontend',
    title: 'Frontend & Web UI',
    icon: <FiGlobe />,
    color: '#a855f7',
    description: 'Ultra-fast, responsive web interfaces built with React, Next.js, and Framer Motion animations.',
    items: [
      { name: 'React 19', proficiency: 95 },
      { name: 'Next.js 15', proficiency: 90 },
      { name: 'Tailwind CSS v4', proficiency: 95 },
      { name: 'Framer Motion', proficiency: 90 },
      { name: 'Three.js / React Three Fiber', proficiency: 85 },
    ],
  },
  {
    id: 'backend',
    title: 'Backend & High-Performance APIs',
    icon: <FiServer />,
    color: '#00f5ff',
    description: 'Decoupled, RESTful, and asynchronous API microservices designed for low-latency execution.',
    items: [
      { name: 'FastAPI (Python)', proficiency: 95 },
      { name: 'Node.js & Express', proficiency: 90 },
      { name: 'RESTful API Architecture', proficiency: 95 },
      { name: 'SQLAlchemy / Prisma ORM', proficiency: 88 },
      { name: 'Authentication & JWT', proficiency: 92 },
    ],
  },
  {
    id: 'database',
    title: 'Databases & Storage',
    icon: <FiDatabase />,
    color: '#f59e0b',
    description: 'Relational, document, and vector databases optimized for analytical queries and production integrity.',
    items: [
      { name: 'PostgreSQL', proficiency: 92 },
      { name: 'MongoDB', proficiency: 88 },
      { name: 'MySQL', proficiency: 90 },
      { name: 'DuckDB', proficiency: 85 },
    ],
  },
  {
    id: 'ai-ml',
    title: 'AI, ML & RAG Systems',
    icon: <FiCpu />,
    color: '#10b981',
    description: 'Production RAG frameworks, predictive XGBoost/Prophet pipelines, and Explainable AI (SHAP / Grad-CAM).',
    items: [
      { name: 'RAG & Vector Search', proficiency: 92 },
      { name: 'XGBoost & Prophet Forecasting', proficiency: 90 },
      { name: 'SHAP & Grad-CAM Explainability', proficiency: 88 },
      { name: 'MLflow Model Tracking', proficiency: 85 },
      { name: 'Scikit-Learn & Pandas', proficiency: 95 },
    ],
  },
  {
    id: 'languages',
    title: 'Core Programming Languages',
    icon: <FiCode />,
    color: '#6366f1',
    description: 'Strong foundation in object-oriented, functional, and algorithmic problem solving.',
    items: [
      { name: 'Python', proficiency: 95 },
      { name: 'C++', proficiency: 92 },
      { name: 'JavaScript (ES6+)', proficiency: 95 },
      { name: 'SQL', proficiency: 92 },
    ],
  },
  {
    id: 'devops',
    title: 'DevOps & Observability',
    icon: <FiLayers />,
    color: '#ec4899',
    description: 'Containerized deployment workflows, version control, and data quality observability platforms.',
    items: [
      { name: 'Git & GitHub Workflows', proficiency: 95 },
      { name: 'Docker & Containerization', proficiency: 88 },
      { name: 'Linux Server Administration', proficiency: 85 },
      { name: 'Vercel / Cloud Deployment', proficiency: 92 },
    ],
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
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      onMouseMove={handleMouseMove}
      className="group relative p-8 rounded-3xl glass-card overflow-hidden flex flex-col justify-between"
    >
      {/* Interactive Radial Spotlight Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              ${layer.color}25,
              transparent 80%
            )
          `,
        }}
      />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div 
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl border transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-lg"
            style={{ 
              backgroundColor: `${layer.color}15`, 
              color: layer.color, 
              borderColor: `${layer.color}30` 
            }}
          >
            {layer.icon}
          </div>

          <span className="text-[10px] font-mono px-3 py-1 rounded-full border border-white/10 bg-white/5 text-gray-400 uppercase tracking-widest">
            {layer.items.length} Techs
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2 tracking-tight uppercase">
          {layer.title}
        </h3>

        <p className="text-xs text-gray-400 leading-relaxed mb-6">
          {layer.description}
        </p>
        
        <div className="space-y-3.5 pt-4 border-t border-white/10">
          {layer.items.map((item, idx) => (
            <div key={idx} className="w-full">
              <div className="flex justify-between items-center mb-1 text-xs font-mono">
                <span className="text-gray-300 font-medium flex items-center gap-1.5">
                  <FiCheck className="text-emerald-400 text-xs" /> {item.name}
                </span>
                <span className="text-gray-500 font-bold">{item.proficiency}%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden p-[1px] border border-white/5">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.proficiency}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 + (idx * 0.1) }}
                  className="h-full rounded-full shadow-[0_0_10px_currentColor]"
                  style={{ backgroundColor: layer.color, color: layer.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function TechStack() {
  const [filter, setFilter] = useState('all')

  const filteredLayers = filter === 'all' 
    ? architectureLayers 
    : architectureLayers.filter(l => l.id === filter)

  return (
    <section id="tech-stack" className="py-32 relative">
      <div className="max-w-[1400px] mx-auto px-6">
        
        <div className="mb-16 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-[var(--accent)] mb-3 block font-semibold">
              [ 02 / SYSTEM ARCHITECTURE ]
            </span>
            <h2 className="text-5xl md:text-6xl font-display font-black uppercase tracking-tighter text-white mb-6">
              Production <span className="text-gradient">Tech Stack</span>
            </h2>
          </motion.div>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-xs p-1.5 rounded-2xl glass-card border border-white/10 bg-black/60 backdrop-blur-xl">
            {[
              { id: 'all', label: 'All Layers' },
              { id: 'frontend', label: 'Frontend' },
              { id: 'backend', label: 'Backend' },
              { id: 'database', label: 'Databases' },
              { id: 'ai-ml', label: 'AI & ML' },
              { id: 'languages', label: 'Languages' },
              { id: 'devops', label: 'DevOps' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                  filter === tab.id
                    ? 'bg-white text-black font-extrabold shadow-md'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLayers.map((layer, index) => (
            <TechCard key={layer.title} layer={layer} index={index} />
          ))}
        </div>

      </div>
    </section>
  )
}
