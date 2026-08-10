import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiCode, FiAward, FiTrendingUp, FiGithub, FiCheckCircle, FiExternalLink, FiTerminal, FiZap } from 'react-icons/fi'
import { dsaStats, personalInfo } from '../data/resumeData'

export default function Dsa() {
  const [leetcodeData, setLeetcodeData] = useState({
    totalSolved: 400,
    easySolved: 160,
    mediumSolved: 200,
    hardSolved: 40,
    ranking: 'Top 15%',
    loading: true,
  })

  useEffect(() => {
    // Fetch live LeetCode stats with graceful fallback
    fetch('https://leetcode-api-faisalshohag.vercel.app/Pankaj9643')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.totalSolved) {
          setLeetcodeData({
            totalSolved: data.totalSolved,
            easySolved: data.easySolved || 160,
            mediumSolved: data.mediumSolved || 200,
            hardSolved: data.hardSolved || 40,
            ranking: data.ranking ? `#${data.ranking}` : 'Top 15%',
            loading: false,
          })
        }
      })
      .catch(() => {
        setLeetcodeData((prev) => ({ ...prev, loading: false }))
      })
  }, [])

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
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-[var(--accent)] mb-3 block font-semibold">
              [ 08 / ALGORITHMIC MASTERY & OPEN SOURCE ]
            </span>
            <h2 className="text-5xl md:text-6xl font-display font-black uppercase tracking-tighter text-white">
              Data Structures &amp; <span className="text-gradient">Open Source</span>
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main LeetCode Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 glass-card p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden group flex flex-col justify-between border border-amber-500/20 shadow-[0_0_50px_rgba(245,158,11,0.05)]"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none transition-transform duration-1000 group-hover:scale-150" />

            <div>
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8 border-b border-white/10 pb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-3xl text-amber-400 shadow-lg">
                    ⚡
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-bold text-white flex items-center gap-2">
                      LeetCode Metrics <span className="text-xs font-mono text-amber-400">@Pankaj9643</span>
                    </h3>
                    <a
                      href={personalInfo.leetcode}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-mono text-[var(--accent)] hover:underline flex items-center gap-1 mt-0.5"
                    >
                      View Live LeetCode Profile <FiExternalLink />
                    </a>
                  </div>
                </div>

                <div className="px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-xs font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  {leetcodeData.loading ? 'Fetching Stats...' : `Rank: ${leetcodeData.ranking}`}
                </div>
              </div>

              {/* Solved Big Numbers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                <div className="p-6 rounded-2xl bg-black/40 border border-white/10 hover:border-amber-500/40 transition-colors">
                  <div className="text-4xl font-display font-black text-amber-400 mb-1">
                    {leetcodeData.totalSolved}+
                  </div>
                  <div className="text-xs font-mono uppercase text-gray-400">Total Solved</div>
                </div>
                <div className="p-6 rounded-2xl bg-black/40 border border-white/10 hover:border-purple-500/40 transition-colors">
                  <div className="text-4xl font-display font-black text-[var(--accent-purple)] mb-1">
                    {dsaStats.topicsCovered}
                  </div>
                  <div className="text-xs font-mono uppercase text-gray-400">Topics Mastered</div>
                </div>
                <div className="p-6 rounded-2xl bg-black/40 border border-white/10 hover:border-emerald-500/40 transition-colors">
                  <div className="text-4xl font-display font-black text-emerald-400 mb-1">
                    {dsaStats.practiceStreak}
                  </div>
                  <div className="text-xs font-mono uppercase text-gray-400">Practice Streak</div>
                </div>
              </div>

              {/* Difficulty Breakdown Bars */}
              <div className="space-y-4 mb-8 p-6 rounded-2xl bg-black/40 border border-white/10">
                <div className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-2 font-bold flex items-center gap-1.5">
                  <FiTrendingUp className="text-amber-400" /> Problem Difficulty Distribution
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1 text-emerald-400 font-bold">
                    <span>Easy Level</span>
                    <span>{leetcodeData.easySolved} Solved</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-emerald-400 rounded-full shadow-[0_0_10px_#34d399]" style={{ width: '65%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1 text-amber-400 font-bold">
                    <span>Medium Level</span>
                    <span>{leetcodeData.mediumSolved} Solved</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full shadow-[0_0_10px_#fbbf24]" style={{ width: '75%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1 text-rose-400 font-bold">
                    <span>Hard Level</span>
                    <span>{leetcodeData.hardSolved} Solved</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-rose-400 rounded-full shadow-[0_0_10px_#fb7185]" style={{ width: '35%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Topic Badges */}
            <div>
              <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-3">Core Algorithmic Focus</div>
              <div className="flex flex-wrap gap-2">
                {dsaStats.focus.map((topic) => (
                  <span key={topic} className="px-3.5 py-1.5 text-xs font-mono rounded-lg border border-white/10 bg-white/5 text-gray-300 hover:border-amber-400/50 hover:text-white transition-all">
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* GitHub Activity & Open Source Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 glass-card p-8 md:p-10 rounded-[2.5rem] relative overflow-hidden flex flex-col justify-between bg-black/60 border border-white/10 shadow-xl"
          >
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-2xl text-white">
                    <FiGithub />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold text-white">GitHub Architecture</h3>
                    <a
                      href={personalInfo.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-mono text-[var(--accent)] hover:underline"
                    >
                      @psahani3486
                    </a>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-[10px] font-bold">
                  ACTIVE COMMITER
                </span>
              </div>

              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                Architecting enterprise full-stack repositories, FastAPI backend microservices, and AI data pipelines.
              </p>

              {/* GitHub Contribution Heatmap Mockup Visual */}
              <div className="p-5 rounded-2xl bg-black/80 border border-white/10 mb-6">
                <div className="text-[10px] font-mono text-gray-400 mb-3 uppercase tracking-widest flex items-center justify-between">
                  <span>2026 Commit Activity</span>
                  <span className="text-emerald-400 font-bold">300+ Commits</span>
                </div>
                <div className="grid grid-cols-12 gap-1.5">
                  {Array.from({ length: 60 }).map((_, i) => {
                    const intensity = [
                      'bg-white/5',
                      'bg-emerald-950',
                      'bg-emerald-800',
                      'bg-emerald-500',
                      'bg-emerald-400',
                    ][i % 5]
                    return <div key={i} className={`h-3.5 rounded-sm ${intensity} transition-transform hover:scale-125`} />
                  })}
                </div>
              </div>

              <div className="space-y-3 font-mono text-xs text-gray-300 p-4 rounded-xl bg-white/5 border border-white/5 mb-6">
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="text-emerald-400 shrink-0" />
                  <span>5 Production Repositories Deployed</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="text-emerald-400 shrink-0" />
                  <span>FastAPI + Next.js Stack</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="text-emerald-400 shrink-0" />
                  <span>Docker & CI/CD Pipelines</span>
                </div>
              </div>
            </div>

            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 rounded-xl bg-white text-black font-mono text-xs font-bold text-center block hover:bg-[var(--accent)] hover:text-white transition-all shadow-lg"
            >
              Explore GitHub Repositories ➔
            </a>
          </motion.div>

        </div>

      </div>
    </section>
  )
}
