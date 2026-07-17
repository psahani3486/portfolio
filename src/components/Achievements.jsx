import React from 'react'
import { motion } from 'framer-motion'
import { FiAward } from 'react-icons/fi'
import { achievements } from '../data/resumeData'

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function Achievements() {
  return (
    <section id="achievements" style={{ position: 'relative', background: 'var(--bg-secondary)' }}>
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
          className="achievements-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              className="achievement-card glass-card"
              variants={cardVariants}
            >
              <div className="achievement-icon">
                <FiAward />
              </div>
              <span className="achievement-text">{achievement}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
