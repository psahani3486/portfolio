import React, { Suspense, lazy, useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import TechStack from './components/TechStack'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Achievements from './components/Achievements'
import Dsa from './components/Dsa'
import Resume from './components/Resume'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AiAssistant from './components/AiAssistant'

function LoadingScreen() {
  const [hide, setHide] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setHide(true), 2200)
    return () => clearTimeout(timer)
  }, [])

  if (hide) return null

  return (
    <div className="loading-screen" style={{ opacity: hide ? 0 : 1, transition: 'opacity 0.6s' }}>
      <div className="loading-logo">&lt;Pankaj /&gt;</div>
      <div className="loading-bar-track">
        <div className="loading-bar-fill" />
      </div>
    </div>
  )
}

function App() {
  return (
    <>
      <LoadingScreen />
      <div className="app">
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <TechStack />
        <Experience />
        <Projects />
        <Achievements />
        <Dsa />
        <Resume />
        <Contact />
        <Footer />
        <AiAssistant />
      </div>
    </>
  )
}

export default App
