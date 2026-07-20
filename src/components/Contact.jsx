import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMail, FiGithub, FiLinkedin, FiPhone, FiSend, FiExternalLink, FiCheck } from 'react-icons/fi'
import { personalInfo } from '../data/resumeData'

const contactInfo = [
  { icon: <FiMail />, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
  { icon: <FiGithub />, label: 'GitHub', value: 'github.com/psahani3486', href: personalInfo.github },
  { icon: <FiLinkedin />, label: 'LinkedIn', value: 'linkedin.com/in/pankaj-sahani', href: personalInfo.linkedin },
  { icon: <FiExternalLink />, label: 'LeetCode', value: 'leetcode.com/u/Pankaj9643', href: personalInfo.leetcode },
]

const FloatingInput = ({ label, id, type = 'text', value, onChange, required }) => {
  const [focused, setFocused] = useState(false)
  const isTextarea = type === 'textarea'

  return (
    <div className="relative mb-8">
      {isTextarea ? (
        <textarea
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required={required}
          className="peer w-full bg-transparent border-b border-[var(--border-color)] text-white placeholder-transparent focus:outline-none focus:border-[var(--accent)] transition-colors py-4 min-h-[120px] resize-y"
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
          className="peer w-full bg-transparent border-b border-[var(--border-color)] text-white placeholder-transparent focus:outline-none focus:border-[var(--accent)] transition-colors py-4"
          placeholder={label}
        />
      )}
      
      <label 
        htmlFor={id}
        className={`absolute left-0 transition-all duration-300 pointer-events-none text-gray-500
          ${focused || value ? '-top-4 text-xs text-[var(--accent)]' : 'top-4 text-base'}
        `}
      >
        {label}
      </label>
      
      {/* Animated Bottom Border */}
      <motion.div 
        className="absolute bottom-0 left-0 h-[1px] bg-[var(--accent)]"
        initial={{ width: 0 }}
        animate={{ width: focused ? '100%' : 0 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  )
}

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
    
    // Simulate slight delay for premium feel
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
      
      <div className="absolute inset-0 bg-[var(--bg-primary)] pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-mono tracking-[0.3em] uppercase text-[var(--accent)] mb-4 block">
              07. Contact
            </span>
            <h2 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tighter text-white">
              Let's <span className="text-gradient">Connect</span>
            </h2>
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

            <div className="space-y-6">
              {contactInfo.map((info, idx) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.1 * idx }}
                  className="flex items-center gap-6 group p-4 -ml-4 rounded-2xl hover:bg-white/5 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full border border-[var(--border-color)] bg-white/5 flex items-center justify-center text-[var(--accent)] group-hover:scale-110 group-hover:border-[var(--accent)]/50 transition-all duration-300">
                    {info.icon}
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-1">{info.label}</div>
                    <div className="text-white font-medium group-hover:text-[var(--accent)] transition-colors">{info.value}</div>
                  </div>
                </motion.a>
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
              className="glass-card p-8 md:p-12 rounded-[2.5rem]"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                <FloatingInput label="Your Name" id="name" value={formData.name} onChange={handleChange} required />
                <FloatingInput label="Email Address" id="email" type="email" value={formData.email} onChange={handleChange} required />
              </div>
              
              <FloatingInput label="Subject" id="subject" value={formData.subject} onChange={handleChange} required />
              <FloatingInput label="Message" id="message" type="textarea" value={formData.message} onChange={handleChange} required />
              
              <button 
                type="submit" 
                disabled={isSubmitting || isSuccess}
                className="mt-6 h-14 px-10 rounded-full bg-white text-black font-medium tracking-wide flex items-center gap-3 hover:scale-105 hover:bg-[var(--accent)] transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] overflow-hidden relative"
              >
                <AnimatePresence mode="wait">
                  {isSubmitting ? (
                    <motion.div key="loading" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </motion.div>
                  ) : isSuccess ? (
                    <motion.div key="success" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="flex items-center gap-2">
                      <FiCheck size={18} /> Sent Successfully
                    </motion.div>
                  ) : (
                    <motion.div key="idle" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="flex items-center gap-2">
                      Send Message <FiSend />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.form>
          </div>

        </div>
      </div>
    </section>
  )
}
