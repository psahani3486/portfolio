import React from 'react'
import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiArrowRight, FiDownload, FiExternalLink } from 'react-icons/fi'

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="grid-bg" />

      {/* Floating Orbs */}
      <div
        className="bg-orb"
        style={{
          width: 500,
          height: 500,
          background: 'linear-gradient(135deg, #6366f1, #a855f7)',
          top: '-10%',
          right: '-10%',
          animationDelay: '0s',
        }}
      />
      <div
        className="bg-orb"
        style={{
          width: 400,
          height: 400,
          background: 'linear-gradient(135deg, #06b6d4, #6366f1)',
          bottom: '-5%',
          left: '-5%',
          animationDelay: '4s',
        }}
      />
      <div
        className="bg-orb"
        style={{
          width: 250,
          height: 250,
          background: 'linear-gradient(135deg, #a855f7, #ec4899)',
          top: '40%',
          right: '20%',
          animationDelay: '2s',
        }}
      />

      <div className="section-container">
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
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
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Hello, I&apos;m
          </motion.p>

          <motion.h1
            className="hero-name"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="gradient-text">Pankaj</span>
          </motion.h1>

          <motion.p
            className="hero-role"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            Full Stack &amp; AI Developer
          </motion.p>

          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            I build scalable web apps and AI-based solutions using React,
            Node.js, MongoDB, and Machine Learning. Passionate about turning
            ideas into elegant, production-ready products.
          </motion.p>

          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
          >
            <a href="#projects" className="btn-primary" onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }) }}>
              <span>View Projects</span>
              <FiArrowRight />
            </a>
            <a href="/resume.pdf" className="btn-secondary" download>
              <FiDownload />
              <span>Download Resume</span>
            </a>
          </motion.div>

          <motion.div
            className="hero-socials"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
          >
            <a href="https://github.com/psahani3486" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FiGithub />
            </a>
            <a href="https://www.linkedin.com/in/pankaj-sahani/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FiLinkedin />
            </a>
            <a href="https://leetcode.com/u/Pankaj9643/" target="_blank" rel="noopener noreferrer" aria-label="LeetCode">
              <FiExternalLink />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
