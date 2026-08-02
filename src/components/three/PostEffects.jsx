import React from 'react'
import { EffectComposer, Bloom, ChromaticAberration, Vignette, Noise } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { usePerformance } from './PerformanceTier'

/**
 * Global post-processing pipeline
 * HIGH tier: Bloom + Chromatic Aberration + Vignette + Noise
 * MEDIUM tier: Bloom + Vignette only
 * LOW tier: nothing (returns null)
 */
export default function PostEffects({ scrollVelocity = 0 }) {
  const { tier } = usePerformance()

  if (tier === 'low') return null

  // Chromatic aberration increases with scroll speed
  const caOffset = Math.min(Math.abs(scrollVelocity) * 0.00015, 0.004)

  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={tier === 'high' ? 1.2 : 0.6}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      {tier === 'high' && (
        <ChromaticAberration
          offset={[caOffset, caOffset]}
          blendFunction={BlendFunction.NORMAL}
          radialModulation={false}
          modulationOffset={0.0}
        />
      )}
      <Vignette
        offset={0.3}
        darkness={0.7}
        blendFunction={BlendFunction.NORMAL}
      />
      {tier === 'high' && (
        <Noise
          premultiply
          blendFunction={BlendFunction.SOFT_LIGHT}
          opacity={0.15}
        />
      )}
    </EffectComposer>
  )
}
