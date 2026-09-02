import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMail, FiGithub, FiLinkedin, FiPhone, FiSend, FiExternalLink, FiCheck, FiFileText, FiBarChart2, FiLayers, FiCheckCircle, FiLoader } from 'react-icons/fi'
import { personalInfo } from '../data/resumeData'
import { downloadSdeResume, downloadDataAnalystResume, downloadBothResumes, getAssetUrl } from '../utils/downloadHelper'
import Magnetic from './worldclass/Magnetic'

const contactInfo = [
  { icon: <FiMail />, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}`, color: '#6366f1' },
  { icon: <FiGithub />, label: 'GitHub', value: 'github.com/psahani3486', href: personalInfo.github, color: '#a855f7' },
  { icon: <FiLinkedin />, label: 'LinkedIn', value: 'linkedin.com/in/pankaj-sahani', href: personalInfo.linkedin, color: '#3b82f6' },
  { icon: <FiExternalLink />, label: 'LeetCode', value: 'leetcode.com/u/Pankaj9643', href: personalInfo.leetcode, color: '#22d3ee' },
]

/* ═══════════════════════════════════════════════
   NEON FLOATING INPUT
   ═══════════════════════════════════════════════ */
const FloatingInput = ({ label, id, type = 'text', value, onChange, required }) => {
  const [focused, setFocused] = useState(false)
  const isTextarea = type === 'textarea'

  return (
    <div className="relative mb-6 group">
      {isTextarea ? (
        <textarea
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required={required}
          className="peer w-full bg-transparent border-b-2 border-white/10 text-white placeholder-transparent focus:outline-none transition-all py-3.5 min-h-[110px] resize-y neon-input text-sm font-mono"
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
          className="peer w-full bg-transparent border-b-2 border-white/10 text-white placeholder-transparent focus:outline-none transition-all py-3.5 neon-input text-sm font-mono"
          style={{
            borderColor: focused ? 'var(--accent)' : undefined,
            boxShadow: focused ? '0 2px 15px rgba(99, 102, 241, 0.2)' : 'none',
          }}
          placeholder={label}
        />
      )}
      
      <label 
        htmlFor={id}
        className={`absolute left-0 transition-all duration-300 pointer-events-none font-mono
          ${focused || value ? '-top-3 text-[11px] text-[var(--accent)] font-semibold' : 'top-3.5 text-xs text-gray-500'}
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
   CONTACT INFO CARD
   ═══════════════════════════════════════════════ */
function ContactInfoCard({ info, index }) {
  return (
    <motion.a
      href={info.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: 0.08 * index }}
      whileHover={{ x: 5, transition: { duration: 0.2 } }}
      className="flex items-center gap-3.5 group p-2.5 rounded-xl hover:bg-white/5 transition-all border border-transparent hover:border-white/10"
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 6 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="w-9 h-9 rounded-xl border flex items-center justify-center text-sm group-hover:scale-105 transition-all duration-300 shrink-0 shadow-sm"
        style={{
          borderColor: `${info.color}40`,
          backgroundColor: `${info.color}10`,
          color: info.color,
        }}
      >
        {info.icon}
      </motion.div>
      <div>
        <div className="text-[9px] font-mono uppercase tracking-widest text-gray-500">{info.label}</div>
        <div className="text-xs font-mono text-white font-semibold group-hover:text-[var(--accent)] transition-colors">{info.value}</div>
      </div>
    </motion.a>
  )
}

/* ═══════════════════════════════════════════════
   MERGED CONTACT & OFFICIAL CREDENTIALS SECTION
   ═══════════════════════════════════════════════ */
export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [loadingType, setLoadingType] = useState(null)

  const handleSdeDownload = async (e) => {
    e.preventDefault()
    setLoadingType('sde')
    await downloadSdeResume()
    setLoadingType(null)
  }

  const handleDaDownload = async (e) => {
    e.preventDefault()
    setLoadingType('da')
    await downloadDataAnalystResume()
    setLoadingType(null)
  }

  const handleDownloadBoth = async (e) => {
    e.preventDefault()
    setLoadingType('both')
    await downloadBothResumes()
    setLoadingType(null)
  }

  const sdeUrl = getAssetUrl(personalInfo.sdeResumeUrl || '/resume.pdf')
  const daUrl = getAssetUrl(personalInfo.dataAnalystResumeUrl || '/data_analyst_Resume.pdf')

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
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
      {/* Target anchor for navbar resume link */}
      <div id="resume" className="absolute -top-10" />

      {/* Background grid pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[var(--bg-primary)]" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:40px_40px] opacity-60" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-[var(--accent)]/5 rounded-full blur-[200px]" />
      </div>
      
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="mb-14">
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
              className="text-xs font-mono tracking-[0.25em] uppercase text-[var(--accent)] mb-3 block font-semibold"
            >
              [ 08 / OFFICIAL CREDENTIALS & CONTACT ]
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-display font-black uppercase tracking-tighter text-white"
            >
              Connect &amp; <span className="text-gradient">Credentials</span>
            </motion.h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Official Credentials & Contact Channels */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            
            {/* Official Credentials Download Box */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="glass-card p-6 md:p-8 rounded-3xl border border-white/10 gradient-border-card relative overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl shadow-inner">
                    📑
                  </div>
                  <div>
                    <h3 className="text-sm font-mono uppercase tracking-widest text-white font-bold">
                      Official Credentials
                    </h3>
                    <span className="text-[10px] font-mono text-[var(--accent)]">
                      PDF Resumes (Updated 2026)
                    </span>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 text-[9px] font-mono rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold">
                  ATS Verified
                </span>
              </div>

              <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-6 font-normal">
                Download specialized resumes tailored for Software Development Engineering or Data Analytics &amp; BI roles.
              </p>

              {/* Resume Download Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <Magnetic>
                  <a
                    href={sdeUrl}
                    download="Pankaj_SDE_FullStack_Resume.pdf"
                    onClick={handleSdeDownload}
                    className="w-full h-12 px-4 rounded-xl bg-white text-black font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:scale-[1.02] hover:bg-cyan-200 transition-all shadow-md cursor-pointer"
                  >
                    {loadingType === 'sde' ? (
                      <FiLoader size={15} className="animate-spin" />
                    ) : (
                      <FiFileText size={15} />
                    )}
                    <span>SDE / Full-Stack</span>
                  </a>
                </Magnetic>

                <Magnetic>
                  <a
                    href={daUrl}
                    download="Pankaj_DataAnalyst_BI_Resume.pdf"
                    onClick={handleDaDownload}
                    className="w-full h-12 px-4 rounded-xl glass-panel border border-white/20 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:scale-[1.02] hover:bg-white/15 transition-all shadow-md cursor-pointer"
                  >
                    {loadingType === 'da' ? (
                      <FiLoader size={15} className="animate-spin text-purple-400" />
                    ) : (
                      <FiBarChart2 size={15} className="text-purple-400" />
                    )}
                    <span>Data Analyst &amp; BI</span>
                  </a>
                </Magnetic>
              </div>

              <Magnetic>
                <button
                  onClick={handleDownloadBoth}
                  className="w-full h-12 px-4 rounded-xl bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-600 text-white font-mono text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)] cursor-pointer"
                >
                  {loadingType === 'both' ? (
                    <FiLoader size={15} className="animate-spin" />
                  ) : (
                    <FiLayers size={15} />
                  )}
                  <span>⚡ Download Both Resumes (ZIP/PDF)</span>
                </button>
              </Magnetic>
            </motion.div>

            {/* Direct Channels Box */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="glass-card p-6 rounded-3xl border border-white/10"
            >
              <h4 className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-4 font-semibold">
                Direct Communication Channels
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {contactInfo.map((info, idx) => (
                  <ContactInfoCard key={info.label} info={info} index={idx} />
                ))}
              </div>
            </motion.div>

          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-6">
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7 }}
              className="glass-card p-6 md:p-10 rounded-3xl border border-white/10 gradient-border-card shadow-2xl relative"
            >
              <div className="border-b border-white/10 pb-4 mb-6">
                <h3 className="text-lg md:text-xl font-display font-bold text-white uppercase tracking-tight">
                  Send a Direct Message
                </h3>
                <p className="text-xs text-[var(--text-secondary)] mt-1 font-mono">
                  Open for software engineering opportunities, AI research collaborations &amp; consultations.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                <FloatingInput label="Your Name" id="name" value={formData.name} onChange={handleChange} required />
                <FloatingInput label="Email Address" id="email" type="email" value={formData.email} onChange={handleChange} required />
              </div>
              
              <FloatingInput label="Subject / Role Inquiry" id="subject" value={formData.subject} onChange={handleChange} required />
              <FloatingInput label="Your Message" id="message" type="textarea" value={formData.message} onChange={handleChange} required />
              
              <motion.button 
                type="submit" 
                disabled={isSubmitting || isSuccess}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-4 w-full h-13 px-8 rounded-xl bg-white text-black font-mono text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2.5 transition-all duration-300 shadow-lg overflow-hidden relative group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-purple)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <AnimatePresence mode="wait">
                  {isSubmitting ? (
                    <motion.div key="loading" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="flex items-center gap-2 relative z-10">
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      <span className="group-hover:text-white">Sending...</span>
                    </motion.div>
                  ) : isSuccess ? (
                    <motion.div key="success" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="flex items-center gap-2 relative z-10">
                      <FiCheck size={16} />
                      <span className="group-hover:text-white">Message Dispatched!</span>
                    </motion.div>
                  ) : (
                    <motion.div key="idle" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="flex items-center gap-2 relative z-10">
                      <span className="group-hover:text-white">Transmit Message</span>
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
