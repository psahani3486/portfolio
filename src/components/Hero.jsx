import React, { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiArrowRight, FiDownload, FiExternalLink } from 'react-icons/fi'
import { personalInfo } from '../data/resumeData'

// Lazy-load the 3D scene to keep initial bundle small
const SpaceScene = lazy(() => import('./three/SpaceScene'))

export default function Hero() {
  return (
    <section className="hero" id="home">
      {/* 3D Background */}
      <div className="hero-canvas">
        <Suspense fallback={null}>
          <SpaceScene />
        </Suspense>
      </div>

      {/* Gradient fallback behind 3D (visible during load or on low-end) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 30% 50%, rgba(99,102,241,0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 20%, rgba(168,85,247,0.06) 0%, transparent 50%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div className="section-container">
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="hero-badge">
              <span className="dot" />
              Open to opportunities
            </div>
          </motion.div>

          <motion.p
            className="hero-greeting"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Hello, I&apos;m
          </motion.p>

          <motion.h1
            className="hero-name"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <span className="gradient-text">{personalInfo.name}</span>
          </motion.h1>

          <motion.p
            className="hero-role"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
          >
            {personalInfo.role}
          </motion.p>

          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
          >
            {personalInfo.description}
          </motion.p>

          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
          >
            <a
              href="#projects"
              className="btn-primary"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              <span>View Projects</span>
              <FiArrowRight />
            </a>
            <a href={personalInfo.resumeUrl} className="btn-secondary" download="Pankaj_Resume.pdf">
              <FiDownload />
              <span>Download Resume</span>
            </a>
          </motion.div>

          <motion.div
            className="hero-socials"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.95 }}
          >
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FiGithub />
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FiLinkedin />
            </a>
            <a href={personalInfo.leetcode} target="_blank" rel="noopener noreferrer" aria-label="LeetCode">
              <FiExternalLink />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <span>Scroll</span>
        <div className="scroll-indicator-line" />
      </motion.div>
    </section>
  )
}
