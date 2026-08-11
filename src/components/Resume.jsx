import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiDownload, FiFileText, FiBarChart2, FiLayers, FiCheckCircle, FiLoader } from 'react-icons/fi'
import { personalInfo } from '../data/resumeData'
import { downloadSdeResume, downloadDataAnalystResume, downloadBothResumes, getAssetUrl } from '../utils/downloadHelper'
import Magnetic from './worldclass/Magnetic'

export default function Resume() {
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

  return (
    <section id="resume" className="py-28 relative overflow-hidden bg-[var(--bg-primary)]">
      <div className="absolute inset-0 bg-noise opacity-10 mix-blend-overlay pointer-events-none" />
      <div className="max-w-[1400px] mx-auto px-6 relative z-10 flex justify-center">
        
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="glass-card p-10 md:p-16 rounded-[3rem] w-full max-w-5xl text-center relative overflow-hidden group border border-white/10 shadow-[0_0_60px_rgba(99,102,241,0.1)]"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-[var(--accent)]/10 via-transparent to-transparent blur-[100px] pointer-events-none transition-transform duration-700 group-hover:scale-125" />
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-20 h-20 rounded-3xl bg-white/10 border border-white/15 flex items-center justify-center text-4xl mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-2xl backdrop-blur-xl">
              📑
            </div>
            
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[var(--accent)] mb-3 font-semibold">
              [ OFFICIAL CREDENTIALS ]
            </span>

            <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter text-white mb-4">
              Get My <span className="text-gradient">Resumes</span>
            </h2>
            
            <p className="text-base md:text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto mb-10">
              Download specialized PDF resumes tailored for Software Development Engineering (SDE) or Data Analytics & Business Intelligence roles.
            </p>
            
            {/* Dual & Combined Download Options */}
            <div className="flex flex-wrap items-center justify-center gap-4 w-full">
              <Magnetic>
                <a 
                  href={sdeUrl} 
                  download="Pankaj_SDE_FullStack_Resume.pdf"
                  onClick={handleSdeDownload}
                  className="h-14 px-8 rounded-full bg-white text-black font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-3 hover:scale-105 hover:bg-cyan-300 transition-all duration-300 shadow-xl cursor-pointer" 
                >
                  {loadingType === 'sde' ? (
                    <FiLoader size={18} className="animate-spin" />
                  ) : (
                    <FiFileText size={18} />
                  )}
                  <span>SDE / Full-Stack PDF</span>
                </a>
              </Magnetic>

              <Magnetic>
                <a 
                  href={daUrl} 
                  download="Pankaj_DataAnalyst_BI_Resume.pdf"
                  onClick={handleDaDownload}
                  className="h-14 px-8 rounded-full glass-panel border border-white/20 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-3 hover:scale-105 hover:bg-white/15 transition-all duration-300 cursor-pointer shadow-lg" 
                >
                  {loadingType === 'da' ? (
                    <FiLoader size={18} className="animate-spin text-purple-400" />
                  ) : (
                    <FiBarChart2 size={18} className="text-purple-400" />
                  )}
                  <span>Data Analyst PDF</span>
                </a>
              </Magnetic>

              <Magnetic>
                <button 
                  onClick={handleDownloadBoth}
                  className="h-14 px-9 rounded-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-600 text-white font-mono text-xs font-extrabold uppercase tracking-wider flex items-center gap-3 hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(99,102,241,0.4)] cursor-pointer" 
                >
                  {loadingType === 'both' ? (
                    <FiLoader size={18} className="animate-spin" />
                  ) : (
                    <FiLayers size={18} />
                  )}
                  <span>⚡ Download Both PDFs</span>
                </button>
              </Magnetic>
            </div>

            <div className="mt-8 flex items-center gap-4 text-xs font-mono text-gray-400">
              <span className="flex items-center gap-1.5"><FiCheckCircle className="text-emerald-400" /> ATS Optimized</span>
              <span>•</span>
              <span className="flex items-center gap-1.5"><FiCheckCircle className="text-emerald-400" /> Updated 2026</span>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  )
}
