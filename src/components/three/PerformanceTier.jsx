import React, { createContext, useContext, useState, useEffect } from 'react'

/**
 * Performance Tier System
 * HIGH   = full effects, high particle count, bloom, post-processing
 * MEDIUM = reduced particles, simpler shaders, no post-processing
 * LOW    = minimal 3D, CSS-only fallbacks
 */
const PerformanceContext = createContext({ tier: 'high', isMobile: false })

export function usePerformance() {
  return useContext(PerformanceContext)
}

function detectTier() {
  // Mobile detection
  const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
    navigator.userAgent
  ) || window.innerWidth < 768

  if (isMobile) return { tier: 'low', isMobile: true }

  // GPU detection via WebGL
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    if (!gl) return { tier: 'low', isMobile: false }

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
    const renderer = debugInfo
      ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL).toLowerCase()
      : ''

    // Low-end GPU indicators
    const lowGPU = ['intel hd', 'intel uhd', 'intel(r) hd', 'mali', 'adreno 5', 'adreno 4', 'swiftshader', 'llvmpipe']
    const isLowGPU = lowGPU.some((g) => renderer.includes(g))

    // CPU core count
    const cores = navigator.hardwareConcurrency || 4

    if (isLowGPU || cores <= 2) return { tier: 'low', isMobile: false }
    if (cores <= 4) return { tier: 'medium', isMobile: false }
    return { tier: 'high', isMobile: false }
  } catch {
    return { tier: 'medium', isMobile: false }
  }
}

export function PerformanceProvider({ children }) {
  const [perf, setPerf] = useState({ tier: 'high', isMobile: false })

  useEffect(() => {
    setPerf(detectTier())
  }, [])

  return (
    <PerformanceContext.Provider value={perf}>
      {children}
    </PerformanceContext.Provider>
  )
}

/** Helper: returns values based on tier */
export function tieredValue(tier, { high, medium, low }) {
  if (tier === 'high') return high
  if (tier === 'medium') return medium ?? high
  return low ?? medium ?? high
}
