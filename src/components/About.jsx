import React, { useEffect, useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { FiAward, FiBookOpen, FiCpu, FiCode, FiCheckCircle } from 'react-icons/fi'

/* ═══════════════════════════════════════════════
   ANIMATED COUNTER — with 3D flip effect
   ═══════════════════════════════════════════════ */
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
      // Eased progress for smoother feel
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress < 1) {
        window.requestAnimationFrame(step)
      }
    }
    window.requestAnimationFrame(step)
  }, [isInView, end, duration])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.02, y: -2 }}
      className="group relative flex items-center gap-4 p-4 md:p-5 glass-card rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-all duration-500 overflow-hidden"
      style={{ perspective: '800px' }}
    >
      {/* Background glow on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: `radial-gradient(circle at 30% 50%, ${color}10, transparent 70%)` }}
      />

      <div 
        className="w-10 h-10 rounded-xl flex items-center justify-center text-lg border shrink-0 transition-all duration-500 group-hover:scale-105 group-hover:rotate-6 shadow-md relative z-10"
        style={{ backgroundColor: `${color}15`, color: color, borderColor: `${color}30` }}
      >
        <Icon />
      </div>
      <div className="relative z-10">
        <div className="text-2xl md:text-3xl font-display font-extrabold text-white mb-0.5 tracking-tight tabular-nums">
          {count}+
        </div>
        <div className="text-[11px] font-mono text-gray-400 uppercase tracking-wider font-medium">
          {label}
        </div>
      </div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════
   PHOTO CARD — holographic border + tilt
   ═══════════════════════════════════════════════ */
function AboutPhotoCard() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: y * -10, y: x * 10 })
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative lg:col-span-6 flex justify-center lg:justify-end"
      style={{ perspective: '1000px' }}
    >
      <motion.div
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="relative w-[280px] h-[360px] md:w-[330px] md:h-[430px] rounded-[2rem] overflow-hidden photo-frame holographic-border shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/15"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <motion.img
          src="/images/pankaj-formal.png"
          alt="Pankaj Sahani — Professional"
          className="w-full h-full object-cover rounded-[2rem]"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.5 }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent rounded-[2rem] pointer-events-none" />
        
        {/* Scan line */}
        <div className="absolute inset-0 overflow-hidden rounded-[2rem] pointer-events-none">
          <div className="absolute left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[var(--accent)]/70 to-transparent animate-scan-line shadow-[0_0_8px_var(--accent)]" />
        </div>

        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="text-white font-display font-bold text-lg md:text-xl tracking-tight">Pankaj Sahani</div>
          <div className="text-[10px] font-mono text-cyan-300 uppercase tracking-widest font-semibold mt-0.5">Software Engineer • NSUT</div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════
   ABOUT SECTION
   ═══════════════════════════════════════════════ */
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
    <section id="about" className="py-32 relative overflow-hidden border-t border-white/[0.04]">
      {/* Background Glow */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-[var(--accent)]/8 rounded-full blur-[160px] pointer-events-none animate-aurora" />
      <div className="absolute bottom-1/3 -right-32 w-96 h-96 bg-[var(--accent-purple)]/8 rounded-full blur-[160px] pointer-events-none animate-aurora" style={{ animationDelay: '5s' }} />

      <div className="max-w-[1380px] mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Photo + Header + Tabs */}
          <div className="lg:col-span-7">
            <div className="flex flex-col lg:flex-row gap-10 items-start">
              
              {/* Photo Card */}
              <AboutPhotoCard />

              {/* Text Content */}
              <div className="flex-1">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="text-xs font-mono tracking-[0.3em] uppercase text-[var(--accent)] mb-4 block font-semibold">
                    [ 01 / ARCHITECTURE & BACKGROUND ]
                  </h2>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-display font-black leading-tight mb-6 uppercase text-white">
                    FUSING <span className="bg-gradient-to-r from-cyan-300 via-white to-[var(--accent)] bg-clip-text text-transparent animate-text-shimmer" style={{ backgroundSize: '200% auto' }}>INTELLIGENT AI</span> WITH SCALABLE SYSTEMS.
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
              </div>
            </div>

            {/* Interactive Detail Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8"
            >
              <div className="flex gap-2 mb-6 border-b border-white/10 pb-3 font-mono text-xs relative">
                {[
                  { id: 'education', label: 'NSUT Education' },
                  { id: 'philosophy', label: 'AI & Systems' },
                  { id: 'impact', label: 'Production Work' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative px-4 py-2 rounded-xl transition-all cursor-pointer font-bold ${
                      activeTab === tab.id
                        ? 'text-black'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="aboutTabIndicator"
                        className="absolute inset-0 bg-[var(--accent)] rounded-xl shadow-lg"
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        style={{ zIndex: -1 }}
                      />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Tab Details Box */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 15, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="glass-card p-6 rounded-2xl border border-white/10 bg-black/40"
                >
                  <h4 className="text-lg font-bold text-white mb-1">{highlights[activeTab].title}</h4>
                  <p className="text-xs font-mono text-[var(--accent)] mb-4">{highlights[activeTab].subtitle}</p>
                  <ul className="space-y-2.5">
                    {highlights[activeTab].bullets.map((b, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-2.5 text-xs text-gray-300 font-mono"
                      >
                        <FiCheckCircle className="text-emerald-400 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Right Column: Metric Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-5 relative">
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
