import React from 'react'
import { motion } from 'framer-motion'
import { experience } from '../data/resumeData'
import { Briefcase } from 'lucide-react'

export default function Experience() {
  return (
    <section id="experience" className="py-32 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Title */}
        <div className="mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-mono tracking-[0.3em] uppercase text-[var(--accent)] mb-4 block">
              04. Career
            </h2>
            <h3 className="text-5xl md:text-6xl font-display font-bold uppercase tracking-tighter text-white">
              Professional <span className="text-gradient">Timeline</span>
            </h3>
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-px bg-[var(--border-color)] md:-translate-x-1/2" />

          <div className="space-y-16 relative z-10">
            {experience.map((exp, index) => {
              const isEven = index % 2 === 0
              
              return (
                <div key={index} className="relative flex flex-col md:flex-row items-center w-full">
                  
                  {/* Left Side (Desktop) */}
                  <div className={`w-full md:w-1/2 ${isEven ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 md:order-2 text-left'}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="glass-card p-8 rounded-3xl ml-[60px] md:ml-0 relative group"
                    >
                      {/* Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)]/0 via-[var(--accent)]/5 to-[var(--accent-purple)]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />
                      
                      <div className="relative z-10">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-300 mb-6">
                          {exp.period}
                        </span>
                        
                        <h4 className="text-2xl font-bold text-white mb-2">{exp.role}</h4>
                        <div className="text-lg text-[var(--accent)] font-medium mb-6">{exp.company}</div>
                        
                        <ul className="space-y-3 mb-8">
                          {exp.highlights.map((highlight, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-sm text-[var(--text-secondary)] text-left">
                              <span className="mt-1.5 w-1 h-1 rounded-full bg-[var(--accent)] shrink-0" />
                              <span className="leading-relaxed">{highlight}</span>
                            </li>
                          ))}
                        </ul>

                        <div className={`flex flex-wrap gap-2 ${isEven ? 'md:justify-end' : 'justify-start'}`}>
                          {exp.tech.map((tech, idx) => (
                            <span key={idx} className="px-3 py-1 text-xs font-mono rounded-md bg-[#181818] border border-white/5 text-gray-400">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Center Dot */}
                  <div className={`absolute left-0 md:left-1/2 w-14 h-14 bg-[var(--bg-primary)] border-2 border-[var(--border-color)] rounded-full flex items-center justify-center transform md:-translate-x-1/2 z-20 ${isEven ? '' : 'md:order-1'}`}>
                    <div className="w-10 h-10 rounded-full bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)]">
                      <Briefcase size={18} />
                    </div>
                  </div>

                  {/* Empty Right Side for layout */}
                  <div className="hidden md:block w-1/2" />
                  
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}
