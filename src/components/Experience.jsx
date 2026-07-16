import React from 'react'
import { motion } from 'framer-motion'

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
            Where I <span className="gradient-text">worked</span>
          </h2>
        </motion.div>

        <motion.div
          className="projects-grid"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className="project-card glass-card">
            <div className="project-body">
              <div className="project-featured">Internship</div>
              <h3 className="project-title">Machine Learning Intern — Suvidha Foundation</h3>
              <div className="project-description">
                <p>Jun 2026 — Jul 2026 · Remote</p>
                <ul>
                  <li>Completed structured daily ML assignments and real-world project development tasks.</li>
                  <li>Applied machine learning techniques to domain-specific social impact problems.</li>
                </ul>
              </div>
              <div className="project-tech">
                <span>Machine Learning</span>
                <span>Python</span>
                <span>Data Science</span>
              </div>
            </div>
          </div>
          
          <div className="project-card glass-card" style={{ marginTop: '2rem' }}>
            <div className="project-body">
              <div className="project-featured">Internship</div>
              <h3 className="project-title">Frontend Developer Intern — HumbleServers</h3>
              <div className="project-description">
                <p>Dec 2025 — Jan 2026 · Remote</p>
                <ul>
                  <li>Customized and optimized web dashboards and client panels to improve usability and user experience.</li>
                  <li>Configured and deployed Pterodactyl Panel with node setup, Wings configuration, and server deployment.</li>
                  <li>Integrated WHMCS billing workflows for streamlined client management.</li>
                  <li>Improved panel reliability through debugging and performance optimization.</li>
                </ul>
              </div>
              <div className="project-tech">
                <span>Front-End Development</span>
                <span>User Interface Design</span>
                <span>WHMCS</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
