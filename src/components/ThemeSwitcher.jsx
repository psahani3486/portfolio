import React, { useState, useEffect, createContext, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const themes = {
  'linear-dark': {
    label: 'Linear Obsidian',
    icon: '⚡',
    vars: {
      '--bg-primary': '#09090b',
      '--bg-cards': '#121215',
      '--bg-surface': '#18181b',
      '--accent': '#6366f1',
      '--accent-dark': '#4f46e5',
      '--accent-purple': '#a855f7',
      '--text-primary': '#f4f4f5',
      '--text-secondary': '#a1a1aa',
      '--border-color': 'rgba(255, 255, 255, 0.08)',
      '--glass-bg': 'rgba(18, 18, 21, 0.65)',
    },
  },
  'apple-dark': {
    label: 'Apple Space Gray',
    icon: '🍎',
    vars: {
      '--bg-primary': '#000000',
      '--bg-cards': '#111111',
      '--bg-surface': '#1c1c1e',
      '--accent': '#f4f4f5',
      '--accent-dark': '#a1a1aa',
      '--accent-purple': '#d4d4d8',
      '--text-primary': '#ffffff',
      '--text-secondary': '#8e8e93',
      '--border-color': 'rgba(255, 255, 255, 0.1)',
      '--glass-bg': 'rgba(17, 17, 17, 0.7)',
    },
  },
  'vercel-dark': {
    label: 'Vercel Precision',
    icon: '▲',
    vars: {
      '--bg-primary': '#0a0a0a',
      '--bg-cards': '#141414',
      '--bg-surface': '#1e1e1e',
      '--accent': '#38bdf8',
      '--accent-dark': '#0284c7',
      '--accent-purple': '#818cf8',
      '--text-primary': '#ededed',
      '--text-secondary': '#888888',
      '--border-color': 'rgba(255, 255, 255, 0.09)',
      '--glass-bg': 'rgba(20, 20, 20, 0.7)',
    },
  },
  'stripe-dark': {
    label: 'Stripe Slate',
    icon: '💳',
    vars: {
      '--bg-primary': '#0b0e14',
      '--bg-cards': '#121722',
      '--bg-surface': '#1a2232',
      '--accent': '#635bff',
      '--accent-dark': '#00d4b6',
      '--accent-purple': '#8093ff',
      '--text-primary': '#f6f9fc',
      '--text-secondary': '#adbdcc',
      '--border-color': 'rgba(255, 255, 255, 0.08)',
      '--glass-bg': 'rgba(18, 23, 34, 0.65)',
    },
  },
  'tokyo-editorial': {
    label: 'Tokyo Editorial',
    icon: '🌙',
    vars: {
      '--bg-primary': '#16161e',
      '--bg-cards': '#1a1b26',
      '--bg-surface': '#24283b',
      '--accent': '#7dcfff',
      '--accent-dark': '#7aa2f7',
      '--accent-purple': '#bb9af7',
      '--text-primary': '#c0caf5',
      '--text-secondary': '#9aa5ce',
      '--border-color': 'rgba(125, 207, 255, 0.15)',
      '--glass-bg': 'rgba(26, 27, 38, 0.65)',
    },
  },
}

export const ThemeContext = createContext({
  theme: 'linear-dark',
  setTheme: () => {},
})

export function useTheme() {
  return useContext(ThemeContext)
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio-theme')
      return (saved && themes[saved]) ? saved : 'linear-dark'
    } catch {
      return 'linear-dark'
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
