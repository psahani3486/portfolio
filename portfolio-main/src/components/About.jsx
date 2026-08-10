import React, { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiAward, FiBookOpen, FiCpu, FiCode, FiCheckCircle } from 'react-icons/fi'

const Counter = ({ end, duration = 2, label, icon: Icon, color = 'var(--accent)' }) => {
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
    <div ref={ref} className="flex items-center gap-5 p-6 glass-card rounded-2xl border border-white/10 hover:border-cyan-500/40 transition-all duration-300 group">
      <div 
        className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl border shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-lg"
        style={{ backgroundColor: `${color}15`, color: color, borderColor: `${color}30` }}
      >
        <Icon />
      </div>
      <div>
        <div className="text-4xl md:text-5xl font-display font-extrabold text-white mb-0.5 tracking-tight">
          {count}+
        </div>
        <div className="text-xs font-mono text-gray-400 uppercase tracking-wider font-medium">
          {label}
        </div>
      </div>
    </div>
  )
}

export default function About() {
  const [activeTab, setActiveTab] = useState('education')

  const highlights = {
    education: {
      title: 'Netaji Subhas University of Technology (NSUT)',
      subtitle: 'B.Tech in Computer Science (Mathematics & Computing) · 2023–2027',
      bullets: [
        'Advanced coursework in Algorithms, Operating Systems, Machine Learning & DBMS.',
        'Strong mathematical foundation in Linear Algebra, Probability & Optimization.',
        'Active problem solver and technical project lead across AI and Web domains.',
      ]
    },
    philosophy: {
      title: 'Architectural Philosophy',
      subtitle: 'Precision, Scalability & Zero-Hallucination AI',
      bullets: [
        'Designing modular micro-backends (FastAPI/Node.js) decoupled for horizontal scale.',
        'Constructing Anti-Hallucination RAG frameworks with multi-threaded parallel retrieval.',
        'Fusing clean aesthetic frontends with high-performance mathematical backends.',
      ]
    },
    impact: {
      title: 'Real-World Production Impact',
      subtitle: '5+ Enterprise & Open Source Apps Deployed',
      bullets: [
        'Delhi TrafficAI: Predictive neural models for city traffic optimization.',
        'Sentinel AI: Autonomous data observability with real-time anomaly detection.',
        'FeedLink: Role-based food redistribution platform connecting NGOs and donors.',
      ]
    }
  }

  return (
    <section id="about" className="py-32 relative overflow-hidden border-t border-white/[0.06]">
      {/* Background Glow */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-[var(--accent)]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 -right-32 w-96 h-96 bg-[var(--accent-purple)]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1380px] mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Swiss Editorial Header & Interactive Tabs */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-xs font-mono tracking-[0.3em] uppercase text-[var(--accent)] mb-4 block font-semibold">
                [ 01 / ARCHITECTURE & BACKGROUND ]
              </h2>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-display font-black leading-tight mb-6 uppercase text-white">
                FUSING <span className="bg-gradient-to-r from-cyan-300 via-white to-[var(--accent)] bg-clip-text text-transparent">INTELLIGENT AI</span> WITH SCALABLE SYSTEMS.
              </h3>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed mb-8 font-normal"
            >
              Final year B.Tech student in Mathematics &amp; Computing at NSUT. Specialized in constructing high-speed RAG pipelines, predictive machine learning engines, and modern full-stack web applications.
            </motion.p>

            {/* Interactive Detail Tabs */}
            <div className="flex gap-2 mb-6 border-b border-white/10 pb-3 font-mono text-xs">
              {[
                { id: 'education', label: 'NSUT Education' },
                { id: 'philosophy', label: 'AI & Systems' },
                { id: 'impact', label: 'Production Work' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-xl transition-all cursor-pointer font-bold ${
                    activeTab === tab.id
                      ? 'bg-[var(--accent)] text-black shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Details Box */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="glass-card p-6 rounded-2xl border border-white/10 bg-black/40"
            >
              <h4 className="text-lg font-bold text-white mb-1">{highlights[activeTab].title}</h4>
              <p className="text-xs font-mono text-[var(--accent)] mb-4">{highlights[activeTab].subtitle}</p>
              <ul className="space-y-2.5">
                {highlights[activeTab].bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-gray-300 font-mono">
                    <FiCheckCircle className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Right Column: Handcrafted Metric Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5 relative">
            <Counter end={5} label="Production Applications" icon={FiCpu} color="#00f5ff" />
            <Counter end={400} label="LeetCode Solved" icon={FiCode} color="#a855f7" />
            <Counter end={20} label="Core Tech Stack" icon={FiBookOpen} color="#3b82f6" />
            <Counter end={2} label="Software Internships" icon={FiAward} color="#10b981" />
          </div>

        </div>

      </div>
    </section>
  )
}
