// Centralized resume data — single source of truth for all components & AI assistant

export const personalInfo = {
  name: 'Pankaj',
  role: 'Full Stack & AI Developer',
  tagline: '3rd year B.Tech CSE student at NSUT',
  description:
    '3rd year B.Tech CSE student at NSUT with hands-on experience in full-stack development and AI/ML systems. Built and deployed 5 production-grade projects using Next.js, FastAPI, TensorFlow, and RAG. Solved 400+ DSA problems on LeetCode. Seeking a challenging SDE internship to contribute and grow.',
  email: 'psahani729@gmail.com',
  phone: '+91-8860395176',
  github: 'https://github.com/psahani3486',
  linkedin: 'https://www.linkedin.com/in/pankaj-sahani/',
  leetcode: 'https://leetcode.com/u/Pankaj9643/',
  resumeUrl: '/resume.pdf',
}

export const education = [
  {
    degree: 'B.Tech CSE (Mathematics & Computing)',
    institution: 'Netaji Subhas University of Technology',
    year: '2023–2027',
  },
  {
    degree: 'Class XII (CBSE)',
    institution: 'Govt. Co-Ed Sarvodaya Vidyalaya',
    year: '2022',
  },
  {
    degree: 'Class X (CBSE)',
    institution: 'Indraprastha Convent Sr. Sec. School',
    year: '2020',
  },
]

export const skillCategories = [
  {
    title: 'Languages',
    icon: 'code',
    color: '#6366f1',
    skills: ['C++', 'C', 'Python', 'JavaScript', 'HTML/CSS'],
  },
  {
    title: 'Frontend',
    icon: 'layout',
    color: '#a855f7',
    skills: ['React', 'Next.js', 'Tailwind', 'Framer Motion'],
  },
  {
    title: 'Backend',
    icon: 'server',
    color: '#06b6d4',
    skills: ['Node.js', 'Express', 'NestJS', 'FastAPI', 'REST API', 'JWT'],
  },
  {
    title: 'Database',
    icon: 'database',
    color: '#f59e0b',
    skills: ['PostgreSQL', 'MongoDB', 'MySQL', 'Prisma'],
  },
  {
    title: 'AI / ML',
    icon: 'cpu',
    color: '#22c55e',
    skills: ['Machine Learning', 'LLMs', 'RAG', 'TensorFlow', 'Scikit-Learn', 'Apache Spark'],
  },
  {
    title: 'Core CS',
    icon: 'tool',
    color: '#ec4899',
    skills: ['DSA', 'DBMS', 'OS', 'CN', 'OOPs'],
  },
]

export const projects = [
  {
    title: 'RAG Intelligence — AI Anti-Hallucination Framework',
    description:
      'Built a production-grade Retrieval-Augmented Generation (RAG) system to reduce hallucinations in LLM responses using parallel retrieval and entity-aware grounding. Reduced response latency from 25–40s to 8–14s using concurrent execution pipelines (Python ThreadPoolExecutor + FastAPI).',
    tech: ['FastAPI', 'Python', 'LLMs', 'RAG'],
    featured: true,
    emoji: '🧠',
    liveUrl: 'https://reduction-in-hallucination-llm.vercel.app',
    githubUrl: '#',
  },
  {
    title: 'FeedLink — Full Stack Food Redistribution Platform',
    description:
      'Built a full-stack food redistribution platform using Next.js, React.js, and PostgreSQL to reduce food wastage through efficient donor–NGO coordination. Designed role-based dashboards, real-time food tracking, QR verification, and volunteer workflows.',
    tech: ['Next.js', 'PostgreSQL', 'Prisma', 'JWT'],
    featured: false,
    emoji: '🍽️',
    liveUrl: 'https://www.feedlinkx.tech',
    githubUrl: '#',
  },
  {
    title: 'Delhi TrafficAI — Smart Traffic Prediction System',
    description:
      'Developed an AI-powered traffic prediction system using TensorFlow, FastAPI, and React.js to forecast congestion and travel time across Delhi zones. Built models and an analytics dashboard for route insights.',
    tech: ['TensorFlow', 'FastAPI', 'React'],
    featured: false,
    emoji: '🚦',
    liveUrl: 'https://smart-traffic-prediction-system.vercel.app',
    githubUrl: '#',
  },
  {
    title: 'Chest X-ray Disease Classifier — Medical AI',
    description:
      'Built a deep learning classifier for chest X-ray diseases with Grad-CAM explainability heatmaps for medical transparency. Implemented visualization techniques highlighting prediction-driving regions, improving model interpretability.',
    tech: ['Python', 'TensorFlow', 'Explainable AI', 'Grad-CAM'],
    featured: false,
    emoji: '🩻',
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    title: 'Fraud Detection System',
    description:
      'Developed a scalable fraud detection pipeline using Apache Spark for processing large financial transaction datasets. Applied ensemble ML techniques achieving high precision and recall on heavily imbalanced transaction data.',
    tech: ['Python', 'Apache Spark', 'Scikit-learn', 'Machine Learning'],
    featured: false,
    emoji: '🛡️',
    liveUrl: '#',
    githubUrl: '#',
  },
]

export const experience = [
  {
    role: 'Machine Learning Intern',
    company: 'Suvidha Foundation',
    period: 'Jun 2026 — Jul 2026',
    location: 'Remote',
    type: 'Internship',
    highlights: [
      'Completed structured daily ML assignments and real-world project development tasks.',
      'Applied machine learning techniques to domain-specific social impact problems.',
    ],
    tech: ['Machine Learning', 'Python', 'Data Science'],
  },
  {
    role: 'Frontend Developer Intern',
    company: 'HumbleServers',
    period: 'Dec 2025 — Jan 2026',
    location: 'Remote',
    type: 'Internship',
    highlights: [
      'Customized and optimized web dashboards and client panels to improve usability and user experience.',
      'Configured and deployed Pterodactyl Panel with node setup, Wings configuration, and server deployment.',
      'Integrated WHMCS billing workflows for streamlined client management.',
      'Improved panel reliability through debugging and performance optimization.',
    ],
    tech: ['Front-End Development', 'User Interface Design', 'WHMCS'],
  },
]

export const achievements = [
  'Google AI Essentials Specialization — Google / Coursera',
  'Certified in Basics of Data Analytics — Physics Wallah × Microsoft',
  'Completed DSA Supreme 3.0 Batch — CodeHelp',
  'Solved 400+ DSA problems on LeetCode',
  'Deployed 5 live production projects',
]

export const dsaStats = {
  problemsSolved: '400+',
  topicsCovered: '50+',
  practiceStreak: 'Daily',
  focus: [
    'Arrays', 'Strings', 'Linked Lists', 'Trees',
    'Graphs', 'Dynamic Programming', 'Greedy Algorithms',
  ],
}

export const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
]
