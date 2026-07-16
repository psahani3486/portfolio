import React from 'react'
import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-inner">
        <a href="#home" className="navbar-logo" style={{ fontSize: '1.3rem' }} onClick={(e) => { e.preventDefault(); document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' }) }}>
          &lt;Pankaj /&gt;
        </a>

        <div className="footer-socials">
          <a href="https://github.com/pankaj" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FiGithub />
          </a>
          <a href="https://linkedin.com/in/pankaj" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FiLinkedin />
          </a>
          <a href="mailto:pankaj@example.com" aria-label="Email">
            <FiMail />
          </a>
        </div>

        <p className="footer-text">
          © {currentYear} Pankaj. Built with <span className="heart"><FiHeart style={{ display: 'inline', verticalAlign: 'middle' }} /></span> using React & Tailwind CSS
        </p>
      </div>
    </footer>
  )
}
