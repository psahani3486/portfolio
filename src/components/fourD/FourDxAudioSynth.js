// Web Audio API Sound Synthesizer for 4DX Portfolio Experience
// Zero external mp3 dependencies — pure mathematical sound synthesis!
// Includes mobile haptic feedback via navigator.vibrate() API

let audioCtx = null

// Mobile haptic feedback utility
function haptic(pattern) {
  try {
    if (navigator && navigator.vibrate) {
      navigator.vibrate(pattern)
    }
  } catch (e) {}
}

function getAudioContext() {
  if (typeof window === 'undefined') return null
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    if (AudioContextClass) {
      audioCtx = new AudioContextClass()
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {})
  }
  return audioCtx
}

export const fourDxAudio = {
  enabled: true,

  toggle() {
    this.enabled = !this.enabled
    return this.enabled
  },

  // Soft high-frequency synth pop on hover
  playHover() {
    if (!this.enabled) return
    haptic(5) // Soft micro-tap for hover
    const ctx = getAudioContext()
    if (!ctx) return

    try {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(750, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(1100, ctx.currentTime + 0.04)

      gain.gain.setValueAtTime(0.02, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start()
      osc.stop(ctx.currentTime + 0.04)
    } catch (e) {
      // Ignore audio errors
    }
  },

  // Tactile punchy click sound
  playClick() {
    if (!this.enabled) return
    haptic(15) // Tactile punch for click
    const ctx = getAudioContext()
    if (!ctx) return

    try {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(320, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.05)

      gain.gain.setValueAtTime(0.06, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start()
      osc.stop(ctx.currentTime + 0.05)
    } catch (e) {}
  },

  // Resonant sci-fi pitch sweep on modal open or warp toggle
  playWarp() {
    if (!this.enabled) return
    haptic([10, 30, 20]) // Ascending vibration pattern for warp
    const ctx = getAudioContext()
    if (!ctx) return

    try {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(150, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(850, ctx.currentTime + 0.18)

      gain.gain.setValueAtTime(0.04, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start()
      osc.stop(ctx.currentTime + 0.18)
    } catch (e) {}
  },

  // Dual harmonic crystal chime
  playChime() {
    if (!this.enabled) return
    haptic([5, 20, 5, 20, 5]) // Triple-tap chime pattern
    const ctx = getAudioContext()
    if (!ctx) return

    try {
      const now = ctx.currentTime
      const freqs = [523.25, 659.25, 783.99] // C5, E5, G5 major triad

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, now + idx * 0.04)

        gain.gain.setValueAtTime(0.03, now + idx * 0.04)
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.04 + 0.25)

        osc.connect(gain)
        gain.connect(ctx.destination)

        osc.start(now + idx * 0.04)
        osc.stop(now + idx * 0.04 + 0.25)
      })
    } catch (e) {}
  },

  // Realistic popping Bubble sound effect
  playBubble(count = 3) {
    if (!this.enabled) return
    haptic(10)
    const ctx = getAudioContext()
    if (!ctx) return

    try {
      const now = ctx.currentTime
      for (let i = 0; i < count; i++) {
        const startTime = now + i * 0.04 + (Math.random() * 0.01)
        const baseFreq = 450 + Math.random() * 350
        const endFreq = baseFreq * (2.2 + Math.random() * 0.5)

        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        osc.type = 'sine'
        osc.frequency.setValueAtTime(baseFreq, startTime)
        osc.frequency.exponentialRampToValueAtTime(endFreq, startTime + 0.03)

        const vol = 0.18 * (1 - i * 0.2)
        gain.gain.setValueAtTime(vol, startTime)
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.035)

        osc.connect(gain)
        gain.connect(ctx.destination)

        osc.start(startTime)
        osc.stop(startTime + 0.035)
      }
    } catch (e) {}
  },
}
