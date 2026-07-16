import React from 'react'
import { motion } from 'framer-motion'

export default function Dsa() {
  return (
    <section id="dsa" style={{ position: 'relative', background: 'var(--color-bg-secondary)' }}>
      <div className="grid-bg" />
      <div className="section-container" style={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Problem Solving</span>
          <h2 className="section-title">
            DSA &amp; <span className="gradient-text">Competitive Coding</span>
          </h2>
        </motion.div>

        <motion.div
          className="dsa-card glass-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className="dsa-icon">⚡</div>
          <div className="dsa-content">
            <h3>
              Solved <span className="gradient-text">300+</span> DSA Problems
            </h3>
            <p>
              Focused on arrays, strings, linked lists, trees, graphs, dynamic programming,
              and greedy algorithms. Consistently practicing on LeetCode to sharpen
              problem-solving skills and prepare for placement interviews.
            </p>
            <div className="dsa-stats">
              <div className="dsa-stat">
                <div className="dsa-stat-value gradient-text">300+</div>
                <div className="dsa-stat-label">Problems Solved</div>
              </div>
              <div className="dsa-stat">
                <div className="dsa-stat-value gradient-text">50+</div>
                <div className="dsa-stat-label">Topics Covered</div>
              </div>
              <div className="dsa-stat">
                <div className="dsa-stat-value gradient-text">Daily</div>
                <div className="dsa-stat-label">Practice Streak</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
