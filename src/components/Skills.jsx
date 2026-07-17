import React from 'react'
import { motion } from 'framer-motion'
import { FiCode, FiServer, FiDatabase, FiCpu, FiTool, FiLayout } from 'react-icons/fi'
import { skillCategories } from '../data/resumeData'

const iconMap = {
  code: <FiCode />,
  layout: <FiLayout />,
  server: <FiServer />,
  database: <FiDatabase />,
  cpu: <FiCpu />,
  tool: <FiTool />,
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, rotateX: 10 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function Skills() {
  return (
    <section id="skills" style={{ position: 'relative', background: 'var(--bg-secondary)' }}>
      <div className="grid-bg" />
      <div className="section-container" style={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Skills</span>
          <h2 className="section-title">
            My <span className="gradient-text">tech stack</span> & expertise
          </h2>
          <p className="section-description">
            Technologies I work with to build modern, scalable, and intelligent applications.
          </p>
        </motion.div>

        <motion.div
          className="skills-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {skillCategories.map((cat) => (
            <motion.div
              key={cat.title}
              className="skill-category glass-card"
              variants={cardVariants}
              style={{ '--_cat-color': cat.color }}
            >
              <div className="skill-category-icon">{iconMap[cat.icon] || <FiCode />}</div>
              <h3 className="skill-category-title">{cat.title}</h3>
              <div className="skill-tags">
                {cat.skills.map((skill) => (
                  <span key={skill} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
