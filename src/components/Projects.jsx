import React from 'react'
import { motion } from 'framer-motion'
import { FiExternalLink, FiGithub, FiStar } from 'react-icons/fi'

const projects = [
  {
    title: 'RAG Intelligence — AI Anti-Hallucination Framework',
    description:
      'Built a production-grade Retrieval-Augmented Generation (RAG) system to reduce hallucinations in LLM responses using parallel retrieval and entity-aware grounding. Reduced response latency from 25–40s to 8–14s using concurrent execution pipelines (Python ThreadPoolExecutor + FastAPI).',
    tech: ['FastAPI', 'Python', 'LLMs', 'RAG'],
    featured: true,
    emoji: '🧠',
    liveUrl: 'https://reduction-in-hallucination-llm.vercel.app',
    githubUrl: '#',
  },
  {
    title: 'FeedLink — Full Stack Food Redistribution Platform',
    description:
      'Built a full-stack food redistribution platform using Next.js, React.js, and PostgreSQL to reduce food wastage through efficient donor–NGO coordination. Designed role-based dashboards, real-time food tracking, QR verification, and volunteer workflows.',
    tech: ['Next.js', 'PostgreSQL', 'Prisma', 'JWT'],
    featured: false,
    emoji: '🍽️',
    liveUrl: 'https://www.feedlinkx.tech',
    githubUrl: '#',
  },
  {
    title: 'Delhi TrafficAI — Smart Traffic Prediction System',
    description:
      'Developed an AI-powered traffic prediction system using TensorFlow, FastAPI, and React.js to forecast congestion and travel time across Delhi zones. Built models and an analytics dashboard for route insights.',
    tech: ['TensorFlow', 'FastAPI', 'React'],
    featured: false,
    emoji: '🚦',
    liveUrl: 'https://smart-traffic-prediction-system.vercel.app',
    githubUrl: '#',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
}

export default function Projects() {
  return (
    <section id="projects" style={{ position: 'relative' }}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Projects</span>
          <h2 className="section-title">
            Featured <span className="gradient-text">work</span>
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', maxWidth: 560, fontSize: '1.05rem', lineHeight: 1.8 }}>
            A selection of projects that showcase my skills in full-stack development and AI/ML.
          </p>
        </motion.div>

        <motion.div
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {projects.map((project) => (
            <motion.div key={project.title} className="project-card glass-card" variants={cardVariants}>
              <div className="project-image">
                <span style={{ position: 'relative', zIndex: 1 }}>{project.emoji}</span>
              </div>
              <div className="project-body">
                {project.featured && (
                  <div className="project-featured">
                    <FiStar size={12} /> Featured
                  </div>
                )}
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                  {project.tech.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <div className="project-links">
                  <a href={project.liveUrl} className="link-demo" target="_blank" rel="noopener noreferrer">
                    <FiExternalLink size={14} /> Live Demo
                  </a>
                  <a href={project.githubUrl} className="link-github" target="_blank" rel="noopener noreferrer">
                    <FiGithub size={14} /> GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
