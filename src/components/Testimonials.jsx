import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const testimonials = [
  {
    name: 'Suvidha Foundation',
    role: 'ML Internship Mentor',
    quote:
      'Pankaj demonstrated exceptional aptitude in applying machine learning techniques to real-world social impact problems. His daily assignments consistently showed strong analytical thinking and clean code practices.',
    avatar: '🏢',
  },
  {
    name: 'HumbleServers Team',
    role: 'Frontend Internship Supervisor',
    quote:
      'During his tenure, Pankaj optimized our web dashboards significantly and showed initiative in debugging complex panel configurations. His frontend skills and attention to UI detail were impressive for his experience level.',
    avatar: '🖥️',
  },
  {
    name: 'NSUT Faculty',
    role: 'B.Tech CSE Department',
    quote:
      'An outstanding student who consistently balances academic rigor with practical project development. His work in RAG systems and full-stack applications demonstrates a rare ability to bridge theory and production engineering.',
    avatar: '🎓',
  },
  {
    name: 'LeetCode Community',
    role: 'Peer Coder',
    quote:
      'Pankaj\'s 400+ problem streak and consistent daily practice is inspiring. His approach to dynamic programming and graph problems is methodical and well-structured.',
    avatar: '⚡',
  },
]

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const autoRef = useRef(null)

  const next = () => setActive((prev) => (prev + 1) % testimonials.length)
  const prev = () => setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  useEffect(() => {
    autoRef.current = setInterval(next, 5000)
    return () => clearInterval(autoRef.current)
  }, [])

  const resetAuto = (fn) => {
    clearInterval(autoRef.current)
    fn()
    autoRef.current = setInterval(next, 5000)
  }

  const t = testimonials[active]

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-[1000px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-mono tracking-[0.3em] uppercase text-[var(--accent)] mb-4 block">
            Endorsements
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tighter text-white">
            What They <span className="text-gradient">Say</span>
          </h2>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="glass-card rounded-3xl p-10 md:p-14 text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-[var(--accent)]/10 rounded-full blur-[80px] pointer-events-none" />

              <div className="relative z-10">
                <span className="text-5xl mb-6 block">{t.avatar}</span>

                <blockquote className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8 italic max-w-2xl mx-auto">
                  "{t.quote}"
                </blockquote>

                <div className="font-display font-bold text-white text-lg">{t.name}</div>
                <div className="text-xs font-mono text-[var(--accent)] uppercase tracking-widest mt-1">
                  {t.role}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => resetAuto(prev)}
              className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
            >
              <FiChevronLeft size={18} />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => resetAuto(() => setActive(idx))}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === active ? 'w-8 bg-[var(--accent)]' : 'w-3 bg-white/15 hover:bg-white/30'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => resetAuto(next)}
              className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
            >
              <FiChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
