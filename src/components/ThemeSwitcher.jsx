import React, { useState, useEffect, createContext, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const themes = {
  'ironman': {
    label: 'Iron Man Arc',
    icon: '⚡',
    vars: {
      '--bg-primary': '#0a0304',
      '--bg-cards': '#17090b',
      '--bg-surface': '#260e12',
      '--accent': '#00f0ff',
      '--accent-dark': '#ef4444',
      '--accent-purple': '#f59e0b',
      '--text-primary': '#ffffff',
      '--text-secondary': '#fda4af',
      '--border-color': 'rgba(239, 68, 68, 0.25)',
      '--glass-bg': 'rgba(23, 9, 11, 0.5)',
    },
  },
  'infinity': {
    label: 'Infinity Gauntlet',
    icon: '💎',
    vars: {
      '--bg-primary': '#0c051a',
      '--bg-cards': '#160a30',
      '--bg-surface': '#220e4a',
      '--accent': '#eab308',
      '--accent-dark': '#a855f7',
      '--accent-purple': '#ec4899',
      '--text-primary': '#ffffff',
      '--text-secondary': '#e9d5ff',
      '--border-color': 'rgba(234, 179, 8, 0.25)',
      '--glass-bg': 'rgba(22, 10, 48, 0.5)',
    },
  },
  'thor': {
    label: 'Thor Thunder',
    icon: '🔨',
    vars: {
      '--bg-primary': '#020a17',
      '--bg-cards': '#07162e',
      '--bg-surface': '#0b2347',
      '--accent': '#38bdf8',
      '--accent-dark': '#0284c7',
      '--accent-purple': '#60a5fa',
      '--text-primary': '#f0f9ff',
      '--text-secondary': '#7dd3fc',
      '--border-color': 'rgba(56, 189, 248, 0.25)',
      '--glass-bg': 'rgba(7, 22, 46, 0.5)',
    },
  },
  'wakanda': {
    label: 'Wakanda Vibranium',
    icon: '🐾',
    vars: {
      '--bg-primary': '#0a0414',
      '--bg-cards': '#15092a',
      '--bg-surface': '#200c3e',
      '--accent': '#c084fc',
      '--accent-dark': '#7e22ce',
      '--accent-purple': '#e879f9',
      '--text-primary': '#faf5ff',
      '--text-secondary': '#d8b4fe',
      '--border-color': 'rgba(192, 132, 252, 0.25)',
      '--glass-bg': 'rgba(21, 9, 42, 0.5)',
    },
  },
  'cap': {
    label: 'Captain Shield',
    icon: '🛡️',
    vars: {
      '--bg-primary': '#03091c',
      '--bg-cards': '#091538',
      '--bg-surface': '#102254',
      '--accent': '#3b82f6',
      '--accent-dark': '#dc2626',
      '--accent-purple': '#ef4444',
      '--text-primary': '#ffffff',
      '--text-secondary': '#93c5fd',
      '--border-color': 'rgba(59, 130, 246, 0.25)',
      '--glass-bg': 'rgba(9, 21, 56, 0.5)',
    },
  },
  'strange': {
    label: 'Dr. Strange Time',
    icon: '👁️',
    vars: {
      '--bg-primary': '#02140c',
      '--bg-cards': '#062618',
      '--bg-surface': '#0b3824',
      '--accent': '#10b981',
      '--accent-dark': '#d97706',
      '--accent-purple': '#34d399',
      '--text-primary': '#ecfdf5',
      '--text-secondary': '#6ee7b7',
      '--border-color': 'rgba(16, 185, 129, 0.25)',
      '--glass-bg': 'rgba(6, 38, 24, 0.5)',
    },
  },
  'dark-cyber': {
    label: 'Dark Cyber',
    icon: '🌑',
    vars: {
      '--bg-primary': '#050505',
      '--bg-cards': '#111111',
      '--bg-surface': '#181818',
      '--accent': '#00F5FF',
      '--accent-dark': '#008f96',
      '--accent-purple': '#7B61FF',
      '--text-primary': '#ffffff',
      '--text-secondary': '#A8A8A8',
      '--border-color': 'rgba(255, 255, 255, 0.08)',
      '--glass-bg': 'rgba(17, 17, 17, 0.4)',
    },
  },
  'midnight-purple': {
    label: 'Midnight Purple',
    icon: '🔮',
    vars: {
      '--bg-primary': '#0a0614',
      '--bg-cards': '#14102a',
      '--bg-surface': '#1c1636',
      '--accent': '#c084fc',
      '--accent-dark': '#7c3aed',
      '--accent-purple': '#f472b6',
      '--text-primary': '#f0e6ff',
      '--text-secondary': '#a78bfa',
      '--border-color': 'rgba(168, 85, 247, 0.12)',
      '--glass-bg': 'rgba(20, 16, 42, 0.5)',
    },
  },
  'aurora-light': {
    label: 'Aurora Light',
    icon: '☀️',
    vars: {
      '--bg-primary': '#f8fafc',
      '--bg-cards': '#ffffff',
      '--bg-surface': '#f1f5f9',
      '--accent': '#0891b2',
      '--accent-dark': '#155e75',
      '--accent-purple': '#7c3aed',
      '--text-primary': '#0f172a',
      '--text-secondary': '#64748b',
      '--border-color': 'rgba(0, 0, 0, 0.08)',
      '--glass-bg': 'rgba(255, 255, 255, 0.7)',
    },
  },
}

export const ThemeContext = createContext({
  theme: 'dark-cyber',
  setTheme: () => {},
})

export function useTheme() {
  return useContext(ThemeContext)
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('portfolio-theme') || 'dark-cyber'
    } catch {
      return 'dark-cyber'
    }
  })

  useEffect(() => {
    const root = document.documentElement
    const vars = themes[theme]?.vars
    if (vars) {
      Object.entries(vars).forEach(([key, value]) => {
        root.style.setProperty(key, value)
      })
    }
    try {
      localStorage.setItem('portfolio-theme', theme)
    } catch {}
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function ThemeSwitcher() {
  const { theme, setTheme, themes: allThemes } = useTheme()
  const [open, setOpen] = useState(false)

  const themeKeys = Object.keys(allThemes)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 text-xs font-mono text-gray-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
        title="Switch Theme"
      >
        <span className="text-sm">{allThemes[theme]?.icon || '🎨'}</span>
        <span className="font-semibold tracking-wide">Switch Theme</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-12 w-48 glass-panel rounded-xl p-2 z-[60]"
          >
            {themeKeys.map((key) => (
              <button
                key={key}
                onClick={() => {
                  setTheme(key)
                  setOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all cursor-pointer ${
                  theme === key
                    ? 'bg-[var(--accent)]/15 text-[var(--accent)] font-semibold'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="text-base">{allThemes[key].icon}</span>
                <span className="font-mono text-xs tracking-wide">{allThemes[key].label}</span>
                {theme === key && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
