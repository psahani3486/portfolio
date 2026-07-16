import React from 'react'
import { motion } from 'framer-motion'
import { FiCode, FiServer, FiDatabase, FiCpu, FiTool } from 'react-icons/fi'

const skillCategories = [
  {
    title: 'Frontend',
    icon: <FiCode />,
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js'],
  },
  {
    title: 'Backend',
    icon: <FiServer />,
    skills: ['Node.js', 'Express', 'FastAPI', 'REST API', 'JWT'],
  },
  {
    title: 'Database',
    icon: <FiDatabase />,
    skills: ['PostgreSQL', 'MongoDB', 'MySQL', 'Prisma'],
  },
  {
    title: 'AI / ML',
    icon: <FiCpu />,
    skills: ['Machine Learning', 'LLMs', 'RAG', 'TensorFlow', 'Scikit-Learn'],
  },
  {
    title: 'Core CS',
    icon: <FiTool />,
    skills: ['DSA', 'DBMS', 'OS', 'CN', 'OOPs'],
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Skills() {
  return (
    <section id="skills" style={{ position: 'relative', background: 'var(--color-bg-secondary)' }}>
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
          <p style={{ color: 'var(--color-text-secondary)', maxWidth: 560, fontSize: '1.05rem', lineHeight: 1.8 }}>
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
            <motion.div key={cat.title} className="skill-category glass-card" variants={cardVariants}>
              <div className="skill-category-icon">{cat.icon}</div>
              <h3 className="skill-category-title">{cat.title}</h3>
              <div className="skill-tags">
                {cat.skills.map((skill) => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
