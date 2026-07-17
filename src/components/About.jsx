import React, { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { personalInfo, education } from '../data/resumeData'

function CountUp({ target, suffix = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const numericTarget = parseInt(target)

  useEffect(() => {
    if (!isInView || !ref.current || isNaN(numericTarget)) return
    let start = 0
    const duration = 1500
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.floor(eased * numericTarget)
      if (ref.current) {
        ref.current.textContent = current + suffix
      }
      if (progress < 1) requestAnimationFrame(animate)
    }
    animate()
  }, [isInView, numericTarget, suffix])

  return (
    <span ref={ref} className="gradient-text">
      {isNaN(numericTarget) ? target : `0${suffix}`}
    </span>
  )
}

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6 },
}

export default function About() {
  return (
    <section id="about" style={{ position: 'relative' }}>
      <div className="grid-bg" />
      <div className="section-container">
        <motion.div {...fadeInUp}>
          <span className="section-label">About Me</span>
          <h2 className="section-title">
            Passionate about building{' '}
            <span className="gradient-text">impactful</span> solutions
          </h2>
        </motion.div>

        <div className="about-grid">
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p>
              Hi, I'm {personalInfo.name} — a {personalInfo.tagline}.
              I enjoy building scalable and user-centric web applications and AI-based solutions
              using React.js, Next.js, Node.js, Python, PostgreSQL, and MongoDB.
            </p>
            <p style={{ marginTop: '1rem' }}>
              🎓 <strong>Education:</strong>
              {education.map((edu, i) => (
                <React.Fragment key={i}>
                  <br />• <strong>{edu.degree}</strong> — {edu.institution} ({edu.year})
                </React.Fragment>
              ))}
            </p>
            <p style={{ marginTop: '1rem' }}>
              Currently exploring: Full Stack Development, Backend Systems, System Design, AI/ML.
              Open to: Software Engineering Internships & Full Stack Roles.
            </p>

            <div className="about-stats">
              <motion.div
                className="stat-card glass-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="stat-number">
                  <CountUp target="5" suffix="+" />
                </div>
                <div className="stat-label">Live Projects</div>
              </motion.div>
              <motion.div
                className="stat-card glass-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="stat-number">
                  <CountUp target="400" suffix="+" />
                </div>
                <div className="stat-label">DSA Problems</div>
              </motion.div>
              <motion.div
                className="stat-card glass-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="stat-number">
                  <CountUp target="10" suffix="+" />
                </div>
                <div className="stat-label">Technologies</div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="about-image-wrapper"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="about-code-block">
              <div className="code-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <code>
                <span className="code-keyword">const</span>{' '}
                <span className="code-property">pankaj</span>{' '}
                <span className="code-bracket">=</span>{' '}
                <span className="code-bracket">{'{'}</span>
                <br />
                &nbsp;&nbsp;<span className="code-property">name</span>:{' '}
                <span className="code-string">&quot;Pankaj&quot;</span>,
                <br />
                &nbsp;&nbsp;<span className="code-property">role</span>:{' '}
                <span className="code-string">&quot;Full Stack Dev&quot;</span>,
                <br />
                &nbsp;&nbsp;<span className="code-property">skills</span>:{' '}
                <span className="code-bracket">[</span>
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span className="code-string">&quot;React/Next.js&quot;</span>,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span className="code-string">&quot;Node/FastAPI&quot;</span>,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span className="code-string">&quot;TensorFlow/RAG&quot;</span>,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span className="code-string">&quot;C++/Python&quot;</span>
                <br />
                &nbsp;&nbsp;<span className="code-bracket">]</span>,
                <br />
                &nbsp;&nbsp;<span className="code-property">status</span>:{' '}
                <span className="code-string">&quot;Building cool stuff 🚀&quot;</span>
                <br />
                <span className="code-bracket">{'}'}</span>;
              </code>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
