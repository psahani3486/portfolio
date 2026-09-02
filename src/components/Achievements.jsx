import React from 'react'
import { motion } from 'framer-motion'
import { FiAward, FiCheckCircle, FiExternalLink } from 'react-icons/fi'
import { personalInfo } from '../data/resumeData'

const certificates = [
  {
    title: 'Google AI Essentials Professional Certificate',
    issuer: 'Google × Coursera',
    date: 'June 2026',
    color: '#4285F4',
    verified: true,
    url: personalInfo.linkedin,
  },
  {
    title: 'Microsoft Azure Essentials Professional Certificate',
    issuer: 'Microsoft & LinkedIn',
    date: 'May 2026',
    color: '#00A4EF',
    verified: true,
    url: personalInfo.linkedin,
  },
  {
    title: 'Basics of Data Analytics Professional Certification',
    issuer: 'Physics Wallah × Microsoft',
    date: 'April 2026',
    color: '#F25022',
    verified: true,
    url: personalInfo.linkedin,
  },
  {
    title: 'Deloitte Data Analytics Job Simulation',
    issuer: 'Deloitte × Forage',
    date: 'May 2026',
    color: '#86BC25',
    verified: true,
    url: personalInfo.linkedin,
  },
  {
    title: 'DSA Supreme 3.0 Batch Graduate',
    issuer: 'CodeHelp (Babbar)',
    date: 'Comprehensive DSA',
    color: '#A855F7',
    verified: true,
    url: personalInfo.leetcode,
  },
  {
    title: '400+ LeetCode DSA Problem Solutions',
    issuer: 'LeetCode',
    date: 'Daily Active Streak',
    color: '#FFA116',
    verified: true,
    url: personalInfo.leetcode,
  },
]

export default function Achievements() {
  return (
    <section id="achievements" className="py-32 relative overflow-hidden bg-[#050508]">
      <div className="absolute inset-0 bg-noise opacity-10 mix-blend-overlay pointer-events-none" />
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        <div className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-[var(--accent)] mb-3 block font-semibold">
              [ 06 / HONORS & CREDENTIALS ]
            </span>
            <h2 className="text-5xl md:text-6xl font-display font-black uppercase tracking-tighter text-white">
              Certifications & <span className="text-gradient">Recognitions</span>
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="glass-card p-8 rounded-[2rem] flex flex-col justify-between group hover:border-white/20 transition-all duration-300 relative overflow-hidden"
            >
              <div 
                className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] opacity-20 pointer-events-none transition-opacity group-hover:opacity-40"
                style={{ backgroundColor: cert.color }}
              />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl border transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-lg"
                    style={{ 
                      backgroundColor: `${cert.color}15`, 
                      color: cert.color, 
                      borderColor: `${cert.color}30` 
                    }}
                  >
                    <FiAward />
                  </div>

                  <span className="flex items-center gap-1 text-[10px] font-mono px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-bold uppercase tracking-wider">
                    <FiCheckCircle /> Verified
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 leading-snug group-hover:text-cyan-300 transition-colors">
                  {cert.title}
                </h3>

                <div className="text-xs font-mono text-gray-400 mb-1">
                  Issued by <span className="text-white font-semibold">{cert.issuer}</span>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-gray-500">
                <span>{cert.date}</span>
                <a
                  href={cert.url || personalInfo.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[var(--accent)] font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 hover:underline cursor-pointer"
                >
                  Verify <FiExternalLink />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
