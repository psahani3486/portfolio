import React, { useEffect } from 'react'

export default function SmoothScroll({ children }) {
  useEffect(() => {
    // Enable smooth scroll behavior globally
    document.documentElement.style.scrollBehavior = 'smooth'

    // Keyboard smooth scroll handling
    const handleKeyDown = (e) => {
      if (['Space', 'PageDown', 'PageUp'].includes(e.code)) {
        // native smooth scroll handles it cleanly with CSS
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return <>{children}</>
}
