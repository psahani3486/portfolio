import React from 'react'
import { motion } from 'framer-motion'
import { experience } from '../data/resumeData'

const timelineVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function Experience() {
  return (
    <section id="experience" style={{ position: 'relative' }}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Experience</span>
          <h2 className="section-title">
            Where I&apos;ve <span className="gradient-text">worked</span>
          </h2>
        </motion.div>

        <motion.div
          className="timeline"
          variants={timelineVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {experience.map((exp, index) => (
            <motion.div key={index} className="timeline-item" variants={itemVariants}>
              <div className="timeline-dot" />
              <div className="timeline-card glass-card">
                <div className="timeline-badge">{exp.type}</div>
                <h3 className="timeline-role">
                  {exp.role} — {exp.company}
                </h3>
                <p className="timeline-meta">
                  {exp.period} · {exp.location}
                </p>
                <ul className="timeline-highlights">
                  {exp.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
                <div className="timeline-tech">
                  {exp.tech.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
