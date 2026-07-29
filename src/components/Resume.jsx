import React from 'react'
import { motion } from 'framer-motion'
import { FiDownload, FiFileText, FiBarChart2, FiLayers } from 'react-icons/fi'
import { personalInfo } from '../data/resumeData'
import Magnetic from './worldclass/Magnetic'

export default function Resume() {
  const handleDownloadBoth = () => {
    const link1 = document.createElement('a')
    link1.href = personalInfo.sdeResumeUrl || '/resume.pdf'
    link1.download = 'Pankaj_SDE_FullStack_Resume.pdf'
    document.body.appendChild(link1)
    link1.click()
    document.body.removeChild(link1)

    setTimeout(() => {
      const link2 = document.createElement('a')
      link2.href = personalInfo.dataAnalystResumeUrl || '/data_analyst_Resume.pdf'
      link2.download = 'Pankaj_DataAnalyst_BI_Resume.pdf'
      document.body.appendChild(link2)
      link2.click()
      document.body.removeChild(link2)
    }, 400)
  }

  return (
    <section id="resume" className="py-24 relative overflow-hidden bg-[var(--bg-primary)]">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
      <div className="max-w-[1400px] mx-auto px-6 relative z-10 flex justify-center">
        
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="glass-card p-10 md:p-14 rounded-[2.5rem] w-full max-w-4xl text-center relative overflow-hidden group border border-white/10"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-[var(--accent)]/5 rounded-[100%] blur-[80px] pointer-events-none transition-transform duration-700 group-hover:scale-150 group-hover:bg-[var(--accent)]/10" />
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-4xl mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-[0_0_30px_rgba(255,255,255,0.02)]">
              📑
            </div>
            
            <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tighter text-white mb-4">
              Get My <span className="text-gradient">Resumes</span>
            </h2>
            
            <p className="text-base md:text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto mb-10">
              Download specialized resumes tailored for Software Engineering or Data Analytics & BI roles.
            </p>
            
            {/* Dual & Combined Download Options */}
            <div className="flex flex-wrap items-center justify-center gap-4 w-full">
              <Magnetic>
                <a 
                  href={personalInfo.sdeResumeUrl || '/resume.pdf'} 
                  download="Pankaj_SDE_FullStack_Resume.pdf"
                  className="h-14 px-7 rounded-full bg-white text-black font-medium tracking-wide flex items-center gap-2.5 hover:scale-105 hover:bg-[var(--accent)] transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.1)] cursor-pointer text-sm" 
                >
                  <FiFileText size={18} />
                  <span>SDE / Full-Stack PDF</span>
                </a>
              </Magnetic>

              <Magnetic>
                <a 
                  href={personalInfo.dataAnalystResumeUrl || '/data_analyst_Resume.pdf'} 
                  download="Pankaj_DataAnalyst_BI_Resume.pdf"
                  className="h-14 px-7 rounded-full glass-panel border border-white/20 text-white font-medium tracking-wide flex items-center gap-2.5 hover:scale-105 hover:bg-white/10 transition-all duration-300 cursor-pointer text-sm" 
                >
                  <FiBarChart2 size={18} className="text-[var(--accent)]" />
                  <span>Data Analyst PDF</span>
                </a>
              </Magnetic>

              <Magnetic>
                <button 
                  onClick={handleDownloadBoth}
                  className="h-14 px-8 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-purple)] text-black font-bold tracking-wide flex items-center gap-2.5 hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(0,245,255,0.3)] cursor-pointer text-sm" 
                >
                  <FiLayers size={18} />
                  <span>⚡ Download Both PDFs</span>
                </button>
              </Magnetic>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  )
}

