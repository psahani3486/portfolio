import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiGithub, FiLinkedin, FiPhone, FiSend, FiExternalLink } from 'react-icons/fi'
import { personalInfo } from '../data/resumeData'

const contactInfo = [
  {
    icon: <FiMail />,
    label: 'Email',
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
  },
  {
    icon: <FiGithub />,
    label: 'GitHub',
    value: 'github.com/psahani3486',
    href: personalInfo.github,
  },
  {
    icon: <FiLinkedin />,
    label: 'LinkedIn',
    value: 'linkedin.com/in/pankaj-sahani',
    href: personalInfo.linkedin,
  },
  {
    icon: <FiPhone />,
    label: 'Phone',
    value: personalInfo.phone,
    href: `tel:${personalInfo.phone.replace(/-/g, '')}`,
  },
  {
    icon: <FiExternalLink />,
    label: 'LeetCode',
    value: 'leetcode.com/u/Pankaj9643',
    href: personalInfo.leetcode,
  },
]

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const mailtoLink = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
      formData.subject
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    )}`
    window.open(mailtoLink)
  }

  return (
    <section id="contact" style={{ position: 'relative', background: 'var(--bg-secondary)' }}>
      <div className="grid-bg" />
      <div className="section-container" style={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Contact</span>
          <h2 className="section-title">
            Let&apos;s <span className="gradient-text">connect</span>
          </h2>
          <p className="section-description">
            Have a project in mind or want to discuss opportunities? Feel free to reach out!
          </p>
        </motion.div>

        <div className="contact-grid">
          <motion.div
            className="contact-info-cards"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {contactInfo.map((info) => (
              <div key={info.label} className="contact-info-card glass-card">
                <div className="contact-info-icon">{info.icon}</div>
                <div>
                  <div className="contact-info-label">{info.label}</div>
                  <div className="contact-info-value">
                    <a href={info.href} target="_blank" rel="noopener noreferrer">
                      {info.value}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="What's this about?"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Tell me about your project or opportunity..."
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }}>
              <FiSend />
              <span>Send Message</span>
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
