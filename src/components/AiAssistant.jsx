import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMessageCircle, FiX, FiSend } from 'react-icons/fi'
import {
  personalInfo,
  education,
  skillCategories,
  projects,
  experience,
  achievements,
  dsaStats,
} from '../data/resumeData'

/* ───── Knowledge Base for Pattern Matching ───── */
const knowledgeBase = [
  {
    keywords: ['hello', 'hi', 'hey', 'greet', 'sup', 'what\'s up'],
    response: `Hey there! 👋 I'm Pankaj's AI assistant. I can tell you about his skills, projects, experience, education, or how to get in touch. What would you like to know?`,
  },
  {
    keywords: ['who', 'about', 'tell me about', 'introduce', 'yourself', 'pankaj'],
    response: `${personalInfo.name} is a ${personalInfo.tagline} with hands-on experience in full-stack development and AI/ML systems. He's built ${projects.length} production-grade projects and solved ${dsaStats.problemsSolved} DSA problems on LeetCode. Currently seeking challenging SDE internships! 🚀`,
  },
  {
    keywords: ['skill', 'tech', 'stack', 'technology', 'language', 'framework', 'what can', 'know'],
    response: `Here's Pankaj's tech stack:\n\n${skillCategories
      .map((cat) => `**${cat.title}**: ${cat.skills.join(', ')}`)
      .join('\n')}\n\nHe's proficient across the full stack from frontend to AI/ML! 💻`,
  },
  {
    keywords: ['project', 'work', 'built', 'portfolio', 'app', 'website', 'rag', 'feedlink', 'traffic'],
    response: `Pankaj has built ${projects.length} notable projects:\n\n${projects
      .map((p) => `${p.emoji} **${p.title}** — ${p.tech.join(', ')}`)
      .join('\n')}\n\nThe featured one is the RAG Intelligence framework that reduces LLM hallucinations! Ask me about any specific project for more details.`,
  },
  {
    keywords: ['experience', 'intern', 'work', 'job', 'company', 'suvidha', 'humble'],
    response: `Pankaj has completed ${experience.length} internships:\n\n${experience
      .map((e) => `🏢 **${e.role}** at ${e.company} (${e.period})`)
      .join('\n')}\n\nHe's looking for his next opportunity in software engineering! 🎯`,
  },
  {
    keywords: ['education', 'college', 'university', 'nsut', 'degree', 'study', 'school'],
    response: `📚 **Education:**\n\n${education
      .map((e) => `• ${e.degree} — ${e.institution} (${e.year})`)
      .join('\n')}\n\nCurrently a 3rd year B.Tech CSE student at NSUT!`,
  },
  {
    keywords: ['dsa', 'leetcode', 'competitive', 'problem', 'algorithm', 'data structure', 'coding'],
    response: `Pankaj is an active problem solver! ⚡\n\n• **${dsaStats.problemsSolved}** problems solved\n• **${dsaStats.topicsCovered}** topics covered\n• **${dsaStats.practiceStreak}** practice streak\n\nFocus areas: ${dsaStats.focus.join(', ')}. Check out his LeetCode profile!`,
  },
  {
    keywords: ['contact', 'email', 'phone', 'reach', 'connect', 'hire', 'message'],
    response: `You can reach Pankaj through:\n\n📧 Email: ${personalInfo.email}\n📱 Phone: ${personalInfo.phone}\n🔗 GitHub: github.com/psahani3486\n💼 LinkedIn: linkedin.com/in/pankaj-sahani\n\nHe's always open to new opportunities! 🤝`,
  },
  {
    keywords: ['resume', 'cv', 'download'],
    response: `You can download Pankaj's resume by clicking the "Download Resume" button in the hero section or the resume section below. It's always updated with his latest work! 📄`,
  },
  {
    keywords: ['achievement', 'award', 'certification', 'certificate', 'google'],
    response: `🏆 **Achievements & Certifications:**\n\n${achievements
      .map((a) => `• ${a}`)
      .join('\n')}\n\nAlways learning and growing! 📈`,
  },
  {
    keywords: ['ai', 'ml', 'machine learning', 'artificial intelligence', 'rag', 'llm', 'tensorflow'],
    response: `Pankaj is deeply interested in AI/ML! His work includes:\n\n🧠 **RAG Intelligence** — Anti-hallucination framework for LLMs\n🚦 **Delhi TrafficAI** — TensorFlow-based traffic prediction\n🩻 **Chest X-ray Classifier** — Deep learning with Grad-CAM\n🛡️ **Fraud Detection** — Apache Spark ML pipeline\n\nHis AI stack: TensorFlow, Scikit-Learn, LLMs, RAG, Apache Spark`,
  },
  {
    keywords: ['react', 'next', 'frontend', 'web', 'javascript', 'node'],
    response: `Pankaj's web dev stack:\n\n**Frontend:** React, Next.js, Tailwind CSS, Framer Motion\n**Backend:** Node.js, Express, NestJS, FastAPI\n**Database:** PostgreSQL, MongoDB, MySQL with Prisma ORM\n\nHe's built full-stack apps like FeedLink (food redistribution) and this very portfolio! ✨`,
  },
]

function getResponse(input) {
  const lower = input.toLowerCase().trim()

  if (!lower || lower.length < 2) {
    return "Could you ask a more specific question? I can tell you about Pankaj's skills, projects, experience, education, or contact info! 😊"
  }

  // Score each knowledge base entry
  let bestMatch = null
  let bestScore = 0

  for (const entry of knowledgeBase) {
    let score = 0
    for (const keyword of entry.keywords) {
      if (lower.includes(keyword)) {
        score += keyword.length // Longer keyword matches = higher confidence
      }
    }
    if (score > bestScore) {
      bestScore = score
      bestMatch = entry
    }
  }

  if (bestMatch && bestScore >= 2) {
    return bestMatch.response
  }

  return `I'm not sure about that, but I can help with:\n\n• 🧑‍💻 **Skills & Tech Stack**\n• 🚀 **Projects**\n• 💼 **Experience**\n• 📚 **Education**\n• 🏆 **Achievements**\n• 📧 **Contact Info**\n\nTry asking about any of these topics!`
}

const quickReplies = [
  'What are your skills?',
  'Tell me about projects',
  'How to contact you?',
  'What\'s your experience?',
]

export default function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: `Hi! 👋 I'm Pankaj's AI assistant. Ask me anything about his skills, projects, or experience!`,
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const handleSend = (text) => {
    const messageText = text || input.trim()
    if (!messageText) return

    setMessages((prev) => [...prev, { type: 'user', text: messageText }])
    setInput('')
    setIsTyping(true)

    // Simulate thinking delay
    setTimeout(() => {
      const response = getResponse(messageText)
      setMessages((prev) => [...prev, { type: 'bot', text: response }])
      setIsTyping(false)
    }, 600 + Math.random() * 800)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Floating button */}
      <motion.button
        className="ai-assistant-btn"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open AI Assistant"
      >
        {!isOpen && <span className="pulse-ring" />}
        {isOpen ? <FiX /> : <FiMessageCircle />}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="ai-chat-panel"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className="ai-chat-header">
              <div className="ai-chat-avatar">🤖</div>
              <div className="ai-chat-header-info">
                <h4>Pankaj's AI Assistant</h4>
                <p>● Online</p>
              </div>
            </div>

            {/* Messages */}
            <div className="ai-chat-messages">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  className={`ai-message ${msg.type}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {msg.text.split('\n').map((line, j) => (
                    <React.Fragment key={j}>
                      {line.replace(/\*\*(.*?)\*\*/g, '').length !== line.length ? (
                        <span
                          dangerouslySetInnerHTML={{
                            __html: line.replace(
                              /\*\*(.*?)\*\*/g,
                              '<strong>$1</strong>'
                            ),
                          }}
                        />
                      ) : (
                        line
                      )}
                      {j < msg.text.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </motion.div>
              ))}

              {isTyping && (
                <div className="typing-indicator">
                  <span />
                  <span />
                  <span />
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies */}
            {messages.length <= 2 && (
              <div className="ai-quick-replies">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    className="ai-quick-reply"
                    onClick={() => handleSend(reply)}
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="ai-chat-input">
              <input
                type="text"
                placeholder="Ask me anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button onClick={() => handleSend()} aria-label="Send message">
                <FiSend />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
