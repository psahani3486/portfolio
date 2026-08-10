import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiVolume2, FiVolumeX } from 'react-icons/fi'
import { fourDxAudio } from './FourDxAudioSynth'

export default function FourDxExperience() {
  const [audioActive, setAudioActive] = useState(true)
  const [isWarping, setIsWarping] = useState(false)

  // Global Mouse & Audio Trigger Setup
  useEffect(() => {
    const handleGlobalClick = (e) => {
      const target = e.target.closest('button, a, input, [role="button"], .glass-card')
      if (target) fourDxAudio.playClick()
    }

    const handleGlobalHover = (e) => {
      const target = e.target.closest('button, a, [role="button"]')
      if (target && !target.dataset.soundPlayed) {
        fourDxAudio.playHover()
        target.dataset.soundPlayed = 'true'
        setTimeout(() => { delete target.dataset.soundPlayed }, 300)
      }
    }

    window.addEventListener('click', handleGlobalClick)
    window.addEventListener('mouseover', handleGlobalHover)

    return () => {
      window.removeEventListener('click', handleGlobalClick)
      window.removeEventListener('mouseover', handleGlobalHover)
    }
  }, [])

  const toggleAudio = () => {
    const newState = fourDxAudio.toggle()
    setAudioActive(newState)
    if (newState) fourDxAudio.playWarp()
  }

  return (
    <>
      {/* Speed Warp Flash */}
      <AnimatePresence>
        {isWarping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.12 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none fixed inset-0 z-30 bg-gradient-to-b from-cyan-500/15 via-transparent to-purple-500/15 mix-blend-screen"
          />
        )}
      </AnimatePresence>

      {/* Floating 4DX Audio Controller */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5 }}
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2"
      >
        <button
          onClick={toggleAudio}
          className={`px-4 py-2.5 rounded-full border backdrop-blur-xl flex items-center gap-2.5 font-mono text-xs shadow-2xl transition-all cursor-pointer ${
            audioActive
              ? 'bg-[#0f172a]/90 border-cyan-500/40 text-cyan-300 shadow-[0_0_20px_rgba(0,245,255,0.15)] hover:scale-105'
              : 'bg-black/80 border-white/10 text-gray-500 hover:text-white'
          }`}
          title="Toggle 4DX Spatial Sound Effects"
        >
          <div className="flex items-center gap-1">
            {audioActive ? <FiVolume2 size={16} className="animate-pulse text-cyan-400" /> : <FiVolumeX size={16} />}
            <span className="font-bold tracking-wider">4DX</span>
          </div>

          {audioActive ? (
            <div className="flex items-end gap-0.5 h-3">
              <span className="w-0.5 bg-cyan-400 h-full animate-[bounce_0.6s_infinite]" />
              <span className="w-0.5 bg-purple-400 h-2/3 animate-[bounce_0.8s_infinite]" />
              <span className="w-0.5 bg-cyan-400 h-4/5 animate-[bounce_0.5s_infinite]" />
            </div>
          ) : (
            <span className="text-[10px] uppercase text-gray-500">OFF</span>
          )}
        </button>
      </motion.div>
    </>
  )
}
