import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMail, FiGithub, FiLinkedin, FiPhone, FiSend, FiExternalLink, FiCheck } from 'react-icons/fi'
import { personalInfo } from '../data/resumeData'

const contactInfo = [
  { icon: <FiMail />, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}`, color: '#6366f1' },
  { icon: <FiGithub />, label: 'GitHub', value: 'github.com/psahani3486', href: personalInfo.github, color: '#a855f7' },
  { icon: <FiLinkedin />, label: 'LinkedIn', value: 'linkedin.com/in/pankaj-sahani', href: personalInfo.linkedin, color: '#3b82f6' },
  { icon: <FiExternalLink />, label: 'LeetCode', value: 'leetcode.com/u/Pankaj9643', href: personalInfo.leetcode, color: '#22d3ee' },
]

/* ═══════════════════════════════════════════════
   NEON FLOATING INPUT — with glow focus
   ═══════════════════════════════════════════════ */
const FloatingInput = ({ label, id, type = 'text', value, onChange, required }) => {
  const [focused, setFocused] = useState(false)
  const isTextarea = type === 'textarea'

  return (
    <div className="relative mb-8 group">
      {isTextarea ? (
        <textarea
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required={required}
          className="peer w-full bg-transparent border-b-2 border-white/10 text-white placeholder-transparent focus:outline-none transition-all py-4 min-h-[120px] resize-y neon-input"
          style={{
            borderColor: focused ? 'var(--accent)' : undefined,
            boxShadow: focused ? '0 2px 15px rgba(99, 102, 241, 0.2)' : 'none',
          }}
          placeholder={label}
        />
      ) : (
        <input
          type={type}
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required={required}
          className="peer w-full bg-transparent border-b-2 border-white/10 text-white placeholder-transparent focus:outline-none transition-all py-4 neon-input"
          style={{
            borderColor: focused ? 'var(--accent)' : undefined,
            boxShadow: focused ? '0 2px 15px rgba(99, 102, 241, 0.2)' : 'none',
          }}
          placeholder={label}
        />
      )}
      
      <label 
        htmlFor={id}
        className={`absolute left-0 transition-all duration-300 pointer-events-none
          ${focused || value ? '-top-4 text-xs text-[var(--accent)] font-semibold' : 'top-4 text-base text-gray-500'}
        `}
      >
        {label}
      </label>
      
      {/* Animated Bottom Border with glow */}
      <motion.div 
        className="absolute bottom-0 left-0 h-[2px] rounded-full"
        style={{
          background: 'linear-gradient(90deg, var(--accent), var(--accent-purple))',
          boxShadow: '0 0 10px rgba(99, 102, 241, 0.3)',
        }}
        initial={{ width: 0 }}
        animate={{ width: focused ? '100%' : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  )
}

/* ═══════════════════════════════════════════════
   CONTACT INFO CARD — magnetic hover
   ═══════════════════════════════════════════════ */
function ContactInfoCard({ info, index }) {
  return (
    <motion.a
      href={info.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: 0.1 * index }}
      whileHover={{ x: 6, transition: { duration: 0.2 } }}
      className="flex items-center gap-4 group p-3 -ml-3 rounded-xl hover:bg-white/5 transition-all"
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 6 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="w-9 h-9 rounded-xl border flex items-center justify-center text-sm group-hover:scale-105 transition-all duration-300 shrink-0"
        style={{
          borderColor: `${info.color}40`,
          backgroundColor: `${info.color}10`,
          color: info.color,
          boxShadow: `0 0 0px ${info.color}00`,
        }}
      >
        {info.icon}
      </motion.div>
      <div>
        <div className="text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-0.5">{info.label}</div>
        <div className="text-sm text-white font-medium group-hover:text-[var(--accent)] transition-colors">{info.value}</div>
      </div>
    </motion.a>
  )
}

/* ═══════════════════════════════════════════════
   CONTACT SECTION
   ═══════════════════════════════════════════════ */
export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    setTimeout(() => {
      const mailtoLink = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
        formData.subject
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
      )}`
      window.open(mailtoLink)
      setIsSubmitting(false)
      setIsSuccess(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setIsSuccess(false), 3000)
    }, 800)
  }

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      
      {/* Background grid pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[var(--bg-primary)]" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:40px_40px] opacity-60" />
        {/* Intersection glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-[var(--accent)]/5 rounded-full blur-[200px]" />
      </div>
      
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-xs font-mono tracking-[0.25em] uppercase text-[var(--accent)] mb-3 block"
            >
              [ 06 / INITIATE CONTACT ]
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tighter text-white"
            >
              Let's <span className="text-gradient">Connect</span>
            </motion.h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24">
          
          {/* Left: Contact Info */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8"
            >
              Whether you have a question, a project idea, or just want to say hi, I'll try my best to get back to you!
            </motion.p>

            <div className="space-y-4">
              {contactInfo.map((info, idx) => (
                <ContactInfoCard key={info.label} info={info} index={idx} />
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-3">
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="glass-card p-8 md:p-12 rounded-[2.5rem] neon-glow"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                <FloatingInput label="Your Name" id="name" value={formData.name} onChange={handleChange} required />
                <FloatingInput label="Email Address" id="email" type="email" value={formData.email} onChange={handleChange} required />
              </div>
              
              <FloatingInput label="Subject" id="subject" value={formData.subject} onChange={handleChange} required />
              <FloatingInput label="Message" id="message" type="textarea" value={formData.message} onChange={handleChange} required />
              
              <motion.button 
                type="submit" 
                disabled={isSubmitting || isSuccess}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="mt-6 h-14 px-10 rounded-full bg-white text-black font-medium tracking-wide flex items-center gap-3 transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.15)] overflow-hidden relative group cursor-pointer"
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-purple)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <AnimatePresence mode="wait">
                  {isSubmitting ? (
                    <motion.div key="loading" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="flex items-center gap-2 relative z-10">
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      <span className="group-hover:text-white">Sending...</span>
                    </motion.div>
                  ) : isSuccess ? (
                    <motion.div key="success" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="flex items-center gap-2 relative z-10">
                      <FiCheck size={18} />
                      <span className="group-hover:text-white">Sent Successfully</span>
                    </motion.div>
                  ) : (
                    <motion.div key="idle" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="flex items-center gap-2 relative z-10">
                      <span className="group-hover:text-white">Send Message</span>
                      <FiSend className="group-hover:translate-x-1 group-hover:text-white transition-transform" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.form>
          </div>

        </div>
      </div>
    </section>
  )
}
