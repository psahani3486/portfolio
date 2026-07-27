import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSearch, FiCode, FiUser, FiFolder, FiMail, FiDownload, FiCpu, FiX, FiCheck, FiArrowRight } from 'react-icons/fi'
import { personalInfo, projects } from '../data/resumeData'

export default function CommandPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        onClose(!isOpen)
      }
      if (e.key === 'Escape' && isOpen) {
        onClose(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const items = [
    {
      id: 'projects',
      title: 'View Selected Works',
      category: 'Navigation',
      icon: <FiFolder className="text-cyan-400" />,
      action: () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
        onClose(false)
      },
    },
    {
      id: 'skills',
      title: 'Technical Skills & Stack',
      category: 'Navigation',
      icon: <FiCode className="text-purple-400" />,
      action: () => {
        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })
        onClose(false)
      },
    },
    {
      id: 'dsa',
      title: 'DSA & Problem Solving (400+ LeetCode)',
      category: 'Navigation',
      icon: <FiCpu className="text-emerald-400" />,
      action: () => {
        document.getElementById('dsa')?.scrollIntoView({ behavior: 'smooth' })
        onClose(false)
      },
    },
    {
      id: 'about',
      title: 'About Pankaj (B.Tech CSE NSUT)',
      category: 'Navigation',
      icon: <FiUser className="text-amber-400" />,
      action: () => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
        onClose(false)
      },
    },
    {
      id: 'resume',
      title: 'Download Resume (PDF)',
      category: 'Actions',
      icon: <FiDownload className="text-pink-400" />,
      action: () => {
        const link = document.createElement('a')
        link.href = personalInfo.resumeUrl
        link.download = 'Pankaj_Resume.pdf'
        link.click()
        onClose(false)
      },
    },
    {
      id: 'copy-email',
      title: `Copy Email (${personalInfo.email})`,
      category: 'Actions',
      icon: <FiMail className="text-blue-400" />,
      action: () => {
        navigator.clipboard.writeText(personalInfo.email)
        setCopied(true)
        setTimeout(() => {
          setCopied(false)
          onClose(false)
        }, 1200)
      },
    },
    ...projects.map((p, idx) => ({
      id: `project-${idx}`,
      title: `Project: ${p.title}`,
      category: 'Projects',
      icon: <span className="text-base">{p.emoji}</span>,
      action: () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
        onClose(false)
      },
    })),
  ]

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-2xl glass-card rounded-3xl border border-white/10 shadow-2xl overflow-hidden bg-[#0d0d12]/95"
        >
          {/* Header Input */}
          <div className="flex items-center px-6 py-4 border-b border-white/10 gap-3">
            <FiSearch className="text-gray-400 text-xl" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command or search (e.g. projects, resume, email)..."
              className="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none text-base font-mono"
              autoFocus
            />
            <button
              onClick={() => onClose(false)}
              className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              <FiX size={18} />
            </button>
          </div>

          {/* List Items */}
          <div className="max-h-[380px] overflow-y-auto p-3 space-y-1">
            {filteredItems.length === 0 ? (
              <div className="py-12 text-center text-gray-400 font-mono text-sm">
                No commands found matching "{query}"
              </div>
            ) : (
              filteredItems.map((item) => (
                <button
                  key={item.id}
                  onClick={item.action}
                  className="w-full text-left px-4 py-3 rounded-2xl flex items-center justify-between hover:bg-white/10 transition-all group cursor-pointer border border-transparent hover:border-white/5"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white group-hover:text-[var(--accent)] transition-colors">
                        {item.title}
                      </div>
                      <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                        {item.category}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 group-hover:text-white text-xs font-mono">
                    <span>Jump</span>
                    <FiArrowRight />
                  </div>
                </button>
              ))
            )}
          </div>

          {/* Footer Shortcuts */}
          <div className="px-6 py-3 border-t border-white/10 bg-black/40 flex items-center justify-between text-xs font-mono text-gray-400">
            <div className="flex items-center gap-4">
              <span><kbd className="px-2 py-0.5 rounded bg-white/10 text-gray-300">↑↓</kbd> navigate</span>
              <span><kbd className="px-2 py-0.5 rounded bg-white/10 text-gray-300">esc</kbd> close</span>
            </div>
            {copied && (
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <FiCheck size={14} /> Email Copied!
              </span>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
