import React from 'react'
import { motion } from 'framer-motion'
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

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

const nodeVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function TechStack() {
  return (
    <section style={{ position: 'relative' }}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Architecture</span>
          <h2 className="section-title">
            System <span className="gradient-text">architecture</span>
          </h2>
          <p className="section-description">
            The technology layers I use to build production-grade applications.
          </p>
        </motion.div>

        <div className="architecture-container">
          {/* Animated connection lines */}
          <svg
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          >
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.15" />
                <stop offset="50%" stopColor="#a855f7" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.05" />
              </linearGradient>
            </defs>
          </svg>

          <motion.div
            className="arch-graph"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {architectureLayers.map((layer) => (
              <motion.div
                key={layer.title}
                className="arch-node glass-card"
                variants={nodeVariants}
              >
                <div
                  className="arch-node-icon"
                  style={{
                    background: `${layer.color}15`,
                    color: layer.color,
                    border: `1px solid ${layer.color}25`,
                  }}
                >
                  {layer.icon}
                </div>
                <h3 className="arch-node-title">{layer.title}</h3>
                <div className="arch-node-items">
                  {layer.items.map((item) => (
                    <span key={item} className="arch-node-item">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
