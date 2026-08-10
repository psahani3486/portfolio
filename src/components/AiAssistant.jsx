import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMessageCircle, FiX, FiSend, FiVolume2, FiVolumeX, FiBriefcase } from 'react-icons/fi'
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
    response: `Hey there! 👋 I'm Pankaj's AI assistant. Ask me anything about his full-stack apps, AI/ML background, LeetCode stats, or internship experience!`,
  },
  {
    keywords: ['recruiter', 'pitch', '30s', 'why hire', 'summary', 'candidate', 'brief'],
    response: `🎯 **30-Second Recruiter Pitch for Pankaj:**\n\n• **Education:** Final-year B.Tech CSE at NSUT (2023-2027)\n• **Key Strengths:** Full-Stack Web (Next.js, FastAPI, PostgreSQL) & AI/ML (TensorFlow, RAG, LLMs)\n• **Track Record:** 5 production projects deployed + 400+ LeetCode DSA problems solved\n• **Experience:** ML Intern at Suvidha Foundation + Frontend Intern at HumbleServers\n\nReady to contribute immediately as an SDE intern/full-time engineer!`,
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
      .join('\n')}\n\nThe featured project is the **RAG Anti-Hallucination Framework** (reduced latency from 40s to 8s).`,
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
      .join('\n')}\n\nCurrently a 4th year B.Tech CSE student at NSUT!`,
  },
  {
    keywords: ['dsa', 'leetcode', 'problem', 'algorithm', 'coding'],
    response: `Pankaj is an active problem solver! ⚡\n\n• **${dsaStats.problemsSolved}** problems solved\n• **${dsaStats.topicsCovered}** topics covered\n• **${dsaStats.practiceStreak}** practice streak\n\nFocus areas: ${dsaStats.focus.join(', ')}. Check out his LeetCode profile!`,
  },
  {
    keywords: ['contact', 'email', 'phone', 'reach', 'connect', 'hire', 'message'],
    response: `You can reach Pankaj through:\n\n📧 Email: ${personalInfo.email}\n📱 Phone: ${personalInfo.phone}\n🔗 GitHub: github.com/psahani3486\n💼 LinkedIn: linkedin.com/in/pankaj-sahani`,
  },
  {
    keywords: ['resume', 'cv', 'download'],
    response: `You can download Pankaj's updated resume by clicking the "Resume" button in the Hero or Navbar! 📄`,
  },
]

function getResponse(input) {
  const lower = input.toLowerCase().trim()

  if (!lower || lower.length < 2) {
    return "Could you ask a more specific question? I can tell you about Pankaj's skills, projects, experience, or contact info! 😊"
  }

  let bestMatch = null
  let bestScore = 0

  for (const entry of knowledgeBase) {
    let score = 0
    for (const keyword of entry.keywords) {
      if (lower.includes(keyword)) {
        score += keyword.length
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

  return `Pankaj is a Full Stack & AI developer specializing in Next.js, FastAPI, RAG Frameworks, and ML models. Feel free to ask about his **skills**, **projects**, **LeetCode stats**, or **contact details**!`
}

const defaultQuickReplies = [
  '🎯 30s Recruiter Summary',
  '🧠 Tell me about RAG Framework',
  '💻 What is his tech stack?',
  '📬 How to contact Pankaj?',
]

export default function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: `Hi! I'm Pankaj's AI Assistant 🤖\nHow can I help you evaluate Pankaj for your team today?`,
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [speechEnabled, setSpeechEnabled] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const speakText = (text) => {
    if (!speechEnabled || !('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const cleanText = text.replace(/[*#•🎯🤖💻⚡🧠📚🏢📧📱🔗💼]/g, '')
    const utterance = new SpeechSynthesisUtterance(cleanText)
    utterance.rate = 1.0
    utterance.pitch = 1.0
    window.speechSynthesis.speak(utterance)
  }

  const handleSend = (textToSend) => {
    const query = textToSend || input
    if (!query.trim()) return

    const newMessages = [...messages, { type: 'user', text: query }]
    setMessages(newMessages)
    if (!textToSend) setInput('')
    setIsTyping(true)

    setTimeout(() => {
      const responseText = getResponse(query)
      setMessages([...newMessages, { type: 'bot', text: responseText }])
      setIsTyping(false)
      speakText(responseText)
    }, 500)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend()
    }
  }

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.button
        className="ai-chat-trigger"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle AI Assistant"
      >
        {isOpen ? <FiX size={24} /> : <FiMessageCircle size={24} />}
        {!isOpen && <span className="ai-trigger-pulse" />}
      </motion.button>

      {/* Chat Panel */}
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
            <div className="ai-chat-header flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="ai-chat-avatar">🤖</div>
                <div className="ai-chat-header-info">
                  <h4 className="font-bold">Pankaj's AI Assistant</h4>
                  <p>● Recruiter Assistant Online</p>
                </div>
              </div>

              {/* TTS Voice Toggle */}
              <button
                onClick={() => setSpeechEnabled(!speechEnabled)}
                className={`p-2 rounded-lg transition-colors ${
                  speechEnabled ? 'text-[var(--accent)] bg-white/10' : 'text-gray-400 hover:text-white'
                }`}
                title={speechEnabled ? 'Voice playback enabled' : 'Enable voice playback'}
              >
                {speechEnabled ? <FiVolume2 size={18} /> : <FiVolumeX size={18} />}
              </button>
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
                      {line.includes('**') ? (
                        <span
                          dangerouslySetInnerHTML={{
                            __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
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

            {/* Quick Replies / Recruiter Chips */}
            <div className="ai-quick-replies flex-wrap gap-1.5 p-2 bg-black/40 border-t border-white/5">
              {defaultQuickReplies.map((reply) => (
                <button
                  key={reply}
                  className="ai-quick-reply text-[11px] font-mono py-1 px-2.5"
                  onClick={() => handleSend(reply)}
                >
                  {reply}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="ai-chat-input">
              <input
                type="text"
                placeholder="Ask AI about Pankaj's skills, projects..."
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
