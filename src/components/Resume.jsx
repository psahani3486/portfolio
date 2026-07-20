import React from 'react'
import { motion } from 'framer-motion'
import { FiDownload } from 'react-icons/fi'
import { personalInfo } from '../data/resumeData'

export default function Resume() {
  return (
    <section id="resume" className="py-24 relative overflow-hidden bg-[var(--bg-primary)]">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
      <div className="max-w-[1400px] mx-auto px-6 relative z-10 flex justify-center">
        
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="glass-card p-12 md:p-16 rounded-[2.5rem] w-full max-w-4xl text-center relative overflow-hidden group"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-[var(--accent)]/5 rounded-[100%] blur-[80px] pointer-events-none transition-transform duration-700 group-hover:scale-150 group-hover:bg-[var(--accent)]/10" />
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-4xl mb-8 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-[0_0_30px_rgba(255,255,255,0.02)]">
              📄
            </div>
            
            <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tighter text-white mb-6">
              Get my <span className="text-gradient">Resume</span>
            </h2>
            
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto mb-10">
              Download my resume to learn more about my education, experience,
              skills, and projects. Always updated with latest work.
            </p>
            
            <a 
              href={personalInfo.resumeUrl} 
              className="h-14 px-10 rounded-full bg-white text-black font-medium tracking-wide flex items-center gap-3 hover:scale-105 hover:bg-[var(--accent)] transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.1)]" 
              download="Pankaj_Resume.pdf"
            >
              <FiDownload size={18} />
              <span>Download Resume</span>
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
