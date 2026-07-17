import React from 'react'
import { motion } from 'framer-motion'
import { FiExternalLink, FiGithub, FiStar } from 'react-icons/fi'
import { projects } from '../data/resumeData'

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
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
          <p className="section-description">
            A selection of projects that showcase my skills in full-stack development and AI/ML.
          </p>
        </motion.div>

        <motion.div
          className="projects-bento"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              className={`project-card glass-card ${project.featured ? 'featured' : ''}`}
              variants={cardVariants}
            >
              {project.featured ? (
                <div className="project-body">
                  <div className="project-image">
                    <span style={{ position: 'relative', zIndex: 1 }}>{project.emoji}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', padding: '28px 32px 28px 0' }}>
                    <div className="project-featured">
                      <FiStar size={11} /> Featured Project
                    </div>
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
                </div>
              ) : (
                <>
                  <div className="project-image">
                    <span style={{ position: 'relative', zIndex: 1 }}>{project.emoji}</span>
                  </div>
                  <div className="project-body">
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-description">{project.description}</p>
                    <div className="project-tech">
                      {project.tech.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                    <div className="project-links">
                      <a href={project.liveUrl} className="link-demo" target="_blank" rel="noopener noreferrer">
                        <FiExternalLink size={14} /> Live
                      </a>
                      <a href={project.githubUrl} className="link-github" target="_blank" rel="noopener noreferrer">
                        <FiGithub size={14} /> Code
                      </a>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
