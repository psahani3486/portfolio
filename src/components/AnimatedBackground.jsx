import React from 'react'

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none transform-gpu">
      {/* Dynamic gradients - hardware accelerated */}
      <div 
        className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-[var(--accent)]/15 blur-[90px] animate-pulse transform-gpu" 
        style={{ animationDuration: '8s' }} 
      />
      <div 
        className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[var(--accent-purple)]/15 blur-[100px] animate-pulse transform-gpu" 
        style={{ animationDuration: '12s', animationDelay: '2s' }} 
      />
      
      {/* Subtle Noise Overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.02]" />
    </div>
  )
}
