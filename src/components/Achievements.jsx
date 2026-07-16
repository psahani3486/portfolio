import React from 'react'
import { motion } from 'framer-motion'

const achievements = [
  'Data Analytics Certification',
  'DSA Supreme 3.0',
  '400+ DSA Questions Solved',
]

export default function Achievements() {
  return (
    <section id="achievements" style={{ position: 'relative', background: 'var(--color-bg-secondary)' }}>
      <div className="grid-bg" />
      <div className="section-container" style={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Achievements</span>
          <h2 className="section-title">
            Recognitions & <span className="gradient-text">Awards</span>
          </h2>
        </motion.div>

        <motion.div
          className="projects-grid"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {achievements.map((a) => (
            <div key={a} className="project-card glass-card">
              <div className="project-body">
                <h3 className="project-title">{a}</h3>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
