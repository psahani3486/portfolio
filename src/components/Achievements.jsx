import React from 'react'
import { motion } from 'framer-motion'
import { FiAward } from 'react-icons/fi'
import { achievements } from '../data/resumeData'

export default function Achievements() {
  return (
    <section id="achievements" className="py-32 relative overflow-hidden bg-[#050505]">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        <div className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-mono tracking-[0.3em] uppercase text-[var(--accent)] mb-4 block">
              Recognitions
            </span>
            <h2 className="text-5xl md:text-6xl font-display font-bold uppercase tracking-tighter text-white">
              Awards & <span className="text-gradient">Certifications</span>
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-8 rounded-[2rem] flex flex-col gap-6 group hover:border-[var(--accent)]/30 hover:shadow-[0_0_30px_rgba(0,245,255,0.05)]"
            >
              <div className="w-14 h-14 rounded-full bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] border border-[var(--accent)]/20 group-hover:scale-110 group-hover:bg-[var(--accent)] group-hover:text-black transition-all duration-300">
                <FiAward size={24} />
              </div>
              <p className="text-lg text-[var(--text-secondary)] font-medium leading-relaxed group-hover:text-white transition-colors">
                {achievement}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
