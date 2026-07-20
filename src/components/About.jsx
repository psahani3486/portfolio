import React, { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const Counter = ({ end, duration = 2, label }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  useEffect(() => {
    if (!isInView) return
    let startTimestamp = null
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) {
        window.requestAnimationFrame(step)
      }
    }
    window.requestAnimationFrame(step)
  }, [isInView, end, duration])

  return (
    <div ref={ref} className="flex flex-col border-l-2 border-[var(--border-color)] pl-6">
      <div className="text-5xl md:text-6xl font-display font-bold text-white mb-2">{count}+</div>
      <div className="text-sm font-mono text-[var(--text-secondary)] uppercase tracking-widest">{label}</div>
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="py-32 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left: Editorial Header */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-sm font-mono tracking-[0.3em] uppercase text-[var(--accent)] mb-6 block">
                01. About Me
              </h2>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-8">
                Bridging the gap between <span className="text-gradient">Intelligent AI</span> and robust architecture.
              </h3>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-[var(--text-secondary)] leading-relaxed mb-12"
            >
              I am a final year B.Tech student specializing in Mathematics & Computing. 
              My expertise lies in architecting full-stack applications and deploying machine learning models 
              that solve real-world problems. I believe in clean code, premium user experiences, and scalable systems.
            </motion.p>
          </div>

          {/* Right: Glass Cards & Counters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[var(--accent-purple)]/20 rounded-full blur-[100px] pointer-events-none" />
            
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="glass-card p-8 rounded-3xl"
            >
              <Counter end={5} label="Production Apps" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="glass-card p-8 rounded-3xl sm:translate-y-12"
            >
              <Counter end={400} label="DSA Problems" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="glass-card p-8 rounded-3xl"
            >
              <Counter end={20} label="Technologies" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="glass-card p-8 rounded-3xl sm:translate-y-12"
            >
              <Counter end={2} label="Internships" />
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  )
}
