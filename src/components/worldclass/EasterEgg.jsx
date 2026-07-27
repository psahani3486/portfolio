import React, { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiAward, FiTerminal } from 'react-icons/fi'
import { fourDxAudio } from '../fourD/FourDxAudioSynth'

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
]

export default function EasterEgg() {
  const [active, setActive] = useState(false)
  const [secretUnlocked, setSecretUnlocked] = useState(false)
  const keySequenceRef = useRef([])
  const canvasRef = useRef(null)

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key
      keySequenceRef.current.push(key)

      if (keySequenceRef.current.length > KONAMI_CODE.length) {
        keySequenceRef.current.shift()
      }

      // Check Konami Code
      const matchesKonami = KONAMI_CODE.every(
        (codeKey, idx) => keySequenceRef.current[idx]?.toLowerCase() === codeKey.toLowerCase()
      )

      // Also check typing 'matrix'
      const recentTyped = keySequenceRef.current.join('')
      const matchesMatrix = recentTyped.includes('matrix')

      if (matchesKonami || matchesMatrix) {
        triggerEasterEgg()
        keySequenceRef.current = []
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const triggerEasterEgg = () => {
    setActive(true)
    setSecretUnlocked(true)
    fourDxAudio.playWarp()
    fourDxAudio.playChime()
  }

  // Cyber Matrix Rain Effect
  useEffect(() => {
    if (!active) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリイルレロワヲン'
    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)
    const drops = Array(columns).fill(1)

    let animId

    const draw = () => {
      ctx.fillStyle = 'rgba(5, 5, 5, 0.08)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#00f5ff'
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length))
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => cancelAnimationFrame(animId)
  }, [active])

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-md"
        >
          {/* Matrix Rain Canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.8, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 30 }}
            className="relative z-10 max-w-md w-full mx-4 glass-card p-8 rounded-3xl border-2 border-[var(--accent)] text-center shadow-[0_0_50px_rgba(0,245,255,0.3)]"
          >
            <button
              onClick={() => setActive(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-2"
            >
              <FiX size={20} />
            </button>

            <div className="w-16 h-16 rounded-2xl bg-[var(--accent)]/10 border border-[var(--accent)] flex items-center justify-center text-[var(--accent)] mx-auto mb-6">
              <FiAward size={32} className="animate-bounce" />
            </div>

            <div className="inline-block px-3 py-1 rounded-full bg-[var(--accent)]/15 border border-[var(--accent)]/30 text-xs font-mono text-[var(--accent)] mb-3">
              🔓 SECRET ACHIEVER UNLOCKED
            </div>

            <h3 className="text-2xl font-display font-bold text-white mb-2">
              Matrix Mode Unlocked!
            </h3>

            <p className="text-sm text-gray-300 mb-6 leading-relaxed">
              Congratulations! You discovered Pankaj's secret easter egg by triggering the Konami Code. You've earned the <strong>Elite Recruiter Badge 🎖️</strong>.
            </p>

            <div className="p-4 rounded-xl bg-black/60 border border-white/10 text-xs font-mono text-left text-cyan-300 mb-6 flex items-center gap-2">
              <FiTerminal className="text-cyan-400 shrink-0" />
              <span>Status: Candidate is 100% SDE Ready. Hire Immediately.</span>
            </div>

            <button
              onClick={() => setActive(false)}
              className="w-full py-3 rounded-full bg-[var(--accent)] text-black font-semibold hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,245,255,0.4)] cursor-pointer"
            >
              Return to Portfolio
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
