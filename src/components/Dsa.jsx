import React from 'react'
import { motion } from 'framer-motion'
import { dsaStats } from '../data/resumeData'

export default function Dsa() {
  return (
    <section id="dsa" className="py-32 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        <div className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-mono tracking-[0.3em] uppercase text-[var(--accent)] mb-4 block">
              Problem Solving
            </span>
            <h2 className="text-5xl md:text-6xl font-display font-bold uppercase tracking-tighter text-white">
              DSA &amp; <span className="text-gradient">Logic</span>
            </h2>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="glass-card p-10 md:p-16 rounded-[2.5rem] relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent)]/10 rounded-full blur-[100px] pointer-events-none transition-transform duration-1000 group-hover:scale-150" />
          
          <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
            
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="w-48 h-48 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-[5rem] shadow-[0_0_50px_rgba(0,245,255,0.1)] relative">
                <div className="absolute inset-0 rounded-full border border-[var(--accent)] animate-[spin_10s_linear_infinite] opacity-30 border-dashed" />
                ⚡
              </div>
            </div>

            <div className="w-full md:w-2/3">
              <h3 className="text-3xl font-display font-bold text-white mb-6 leading-tight">
                Solved <span className="text-gradient">{dsaStats.problemsSolved}</span> DSA Problems
              </h3>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-10">
                Focused on arrays, strings, linked lists, trees, graphs, dynamic programming,
                and greedy algorithms. Consistently practicing on LeetCode to sharpen
                problem-solving skills and prepare for placement interviews.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                <div className="flex flex-col border-l border-white/10 pl-6">
                  <div className="text-3xl font-bold text-[var(--accent)] mb-1">{dsaStats.problemsSolved}</div>
                  <div className="text-xs font-mono uppercase text-gray-500">Problems Solved</div>
                </div>
                <div className="flex flex-col border-l border-white/10 pl-6">
                  <div className="text-3xl font-bold text-[var(--accent-purple)] mb-1">{dsaStats.topicsCovered}</div>
                  <div className="text-xs font-mono uppercase text-gray-500">Topics Covered</div>
                </div>
                <div className="flex flex-col border-l border-white/10 pl-6">
                  <div className="text-3xl font-bold text-white mb-1">{dsaStats.practiceStreak}</div>
                  <div className="text-xs font-mono uppercase text-gray-500">Practice Streak</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {dsaStats.focus.map((topic) => (
                  <span key={topic} className="px-3 py-1.5 text-xs font-mono rounded-md border border-[var(--border-color)] bg-black/40 text-gray-300">
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
