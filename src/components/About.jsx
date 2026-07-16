import React from 'react'
import { motion } from 'framer-motion'

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6 },
}

export default function About() {
  return (
    <section id="about" style={{ position: 'relative' }}>
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
              Hi, I’m Pankaj — a 3rd year B.Tech CSE (Mathematics & Computing) student at NSUT.
              I enjoy building scalable and user-centric web applications and AI-based solutions
              using React.js, Next.js, Node.js, Python, PostgreSQL, and MongoDB.
            </p>
            <p style={{ marginTop: '1rem' }}>
              🎓 <strong>Education:</strong>
              <br />• <strong>B.Tech CSE (MAC)</strong> — Netaji Subhas University of Technology (2023–2027)
              <br />• <strong>Class XII (CBSE)</strong> — Govt. Co-Ed Sarvodaya Vidyalaya (2022)
              <br />• <strong>Class X (CBSE)</strong> — Indraprastha Convent Sr. Sec. School (2020)
            </p>
            <p style={{ marginTop: '1rem' }}>
              Currently exploring: Full Stack Development, Backend Systems, System Design, AI/ML.
              Open to: Software Engineering Internships & Full Stack Roles.
            </p>

            <div className="about-stats">
              <div className="stat-card glass-card">
                <div className="stat-number gradient-text">5+</div>
                <div className="stat-label">Live Projects</div>
              </div>
              <div className="stat-card glass-card">
                <div className="stat-number gradient-text">400+</div>
                <div className="stat-label">DSA Problems</div>
              </div>
              <div className="stat-card glass-card">
                <div className="stat-number gradient-text">10+</div>
                <div className="stat-label">Technologies</div>
              </div>
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
