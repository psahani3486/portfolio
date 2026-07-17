import React from 'react'
import { motion } from 'framer-motion'
import { FiDownload } from 'react-icons/fi'
import { personalInfo } from '../data/resumeData'

export default function Resume() {
  return (
    <section id="resume" style={{ position: 'relative' }}>
      <div className="section-container resume-section">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Resume</span>
          <h2 className="section-title">
            Get my <span className="gradient-text">resume</span>
          </h2>
        </motion.div>

        <motion.div
          className="resume-card glass-card"
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className="resume-icon">📄</div>
          <h3>My Resume</h3>
          <p>
            Download my resume to learn more about my education, experience,
            skills, and projects. Always updated with latest work.
          </p>
          <a href={personalInfo.resumeUrl} className="btn-primary" download="Pankaj_Resume.pdf">
            <FiDownload />
            <span>Download Resume</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
