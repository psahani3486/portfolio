import React from 'react'

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Dynamic gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-[var(--accent)]/20 blur-[120px] animate-pulse mix-blend-screen" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[var(--accent-purple)]/20 blur-[150px] animate-pulse mix-blend-screen" style={{ animationDuration: '12s', animationDelay: '2s' }} />
      
      {/* Subtle Noise Overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay" />
    </div>
  )
}
