import React from 'react'
import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi'
import { personalInfo } from '../data/resumeData'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-inner">
        <a
          href="#home"
          className="navbar-logo"
          style={{ fontSize: '1.3rem' }}
          onClick={(e) => {
            e.preventDefault()
            document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          &lt;Pankaj /&gt;
        </a>

        <div className="footer-socials">
          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FiGithub />
          </a>
          <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FiLinkedin />
          </a>
          <a href={`mailto:${personalInfo.email}`} aria-label="Email">
            <FiMail />
          </a>
        </div>

        <p className="footer-text">
          © {currentYear} {personalInfo.name}. Built with{' '}
          <span className="heart">
            <FiHeart style={{ display: 'inline', verticalAlign: 'middle' }} />
          </span>{' '}
          using React & Three.js
        </p>
      </div>
    </footer>
  )
}
