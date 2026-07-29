// Centralized resume data — single source of truth for all components & AI assistant

export const personalInfo = {
  name: 'Pankaj',
  role: 'Software Engineer & Data Analyst | Full-Stack, AI & BI Specialist',
  tagline: 'Computer Science Engineer at NSUT | Full-Stack, Data & AI Systems Architect',
  description:
    'Software Engineer & Data Analytics Specialist from NSUT with expertise in full-stack architecture, predictive AI models, and enterprise BI analytics. Engineered production RAG systems, XGBoost/Prophet analytics platforms, and autonomous data observability frameworks. Algorithmic problem solver with 400+ LeetCode solutions, certified by Google, Microsoft, and Deloitte.',
  email: 'psahani729@gmail.com',
  phone: '+91-8860395176',
  github: 'https://github.com/psahani3486',
  linkedin: 'https://www.linkedin.com/in/pankaj-sahani/',
  leetcode: 'https://leetcode.com/u/Pankaj9643/',
  resumeUrl: '/resume.pdf',
  sdeResumeUrl: '/resume.pdf',
  dataAnalystResumeUrl: '/data_analyst_Resume.pdf',
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
    institution: 'Indraprastha Convent Senior Secondary School',
    year: '2020',
  },
]

export const skillCategories = [
  {
    title: 'Languages',
    icon: 'code',
    color: '#6366f1',
    skills: ['Python', 'SQL', 'C++', 'JavaScript', 'HTML/CSS'],
  },
  {
    title: 'Data Science & BI',
    icon: 'bar-chart',
    color: '#3b82f6',
    skills: ['Pandas', 'NumPy', 'Scikit-learn', 'XGBoost', 'Prophet', 'SHAP', 'MLflow', 'Power BI'],
  },
  {
    title: 'Frontend & UI',
    icon: 'layout',
    color: '#a855f7',
    skills: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    title: 'Backend & APIs',
    icon: 'server',
    color: '#06b6d4',
    skills: ['FastAPI', 'Node.js', 'Express.js', 'REST APIs', 'SQLAlchemy'],
  },
  {
    title: 'Databases & Tools',
    icon: 'database',
    color: '#f59e0b',
    skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'DuckDB', 'Docker', 'Linux', 'Git', 'Jupyter'],
  },
  {
    title: 'Core CS & AI',
    icon: 'cpu',
    color: '#ec4899',
    skills: ['DSA', 'LLMs', 'RAG', 'DBMS', 'OS', 'CN', 'OOPs'],
  },
]

export const projects = [
  {
    title: 'Business Intelligence Platform — Enterprise AI Analytics',
    description:
      'Architected an enterprise AI business intelligence platform integrating Python, FastAPI, React, and PostgreSQL for executive analytics, KPI monitoring, and interactive dashboard exploration. Implemented MLflow-based model tracking, XGBoost churn prediction, Prophet forecasting, and SHAP explainability.',
    tech: ['Python', 'FastAPI', 'React', 'PostgreSQL', 'MLflow', 'XGBoost', 'Prophet', 'SHAP'],
    featured: true,
    emoji: '📊',
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    title: 'Sentinel AI — Autonomous Data Quality Observability',
    description:
      'Developed an AI-powered platform to profile datasets, identify missing values, duplicate records, and data quality issues. Built automated data validation workflows generating quality reports and anomaly detection, integrated Groq Llama 3 for natural language recommendations.',
    tech: ['Python', 'FastAPI', 'PostgreSQL', 'SQLAlchemy', 'Groq Llama 3', 'Docker'],
    featured: true,
    emoji: '🔍',
    liveUrl: '#',
    githubUrl: '#',
  },
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
]

export const experience = [
  {
    role: 'Machine Learning Intern',
    company: 'Suvidha Foundation',
    period: 'Jun 2026 — Jul 2026',
    location: 'Remote',
    type: 'Internship',
    highlights: [
      'Performed data preprocessing, feature engineering, and machine learning model development using Python, Pandas, NumPy, and Scikit-learn.',
      'Built reusable data preprocessing pipelines, optimized model performance via hyperparameter tuning, and visualized insights using Matplotlib & Seaborn.',
    ],
    tech: ['Machine Learning', 'Python', 'Pandas', 'Scikit-learn', 'Matplotlib'],
  },
  {
    role: 'Frontend Developer Intern',
    company: 'HumbleServers',
    period: 'Dec 2025 — Jan 2026',
    location: 'Remote',
    type: 'Internship',
    highlights: [
      'Developed responsive dashboards and client panels using modern frontend technologies while fixing production issues and enhancing UX.',
      'Managed Pterodactyl Panel deployment, integrated WHMCS billing automation, and optimized Linux server configurations to improve application reliability.',
    ],
    tech: ['Front-End Development', 'Linux', 'WHMCS', 'System Admin'],
  },
]

export const achievements = [
  'Certified in Google AI Essentials — Google (Coursera) [June 2026]',
  'Certified in Microsoft Azure Essentials Professional Certificate — Microsoft & LinkedIn [May 2026]',
  'Certified in Basics of Data Analytics — Physics Wallah × Microsoft [April 2026]',
  'Completed Deloitte Data Analytics Job Simulation — Forage [May 2026]',
  'Completed DSA Supreme 3.0 Batch — CodeHelp',
  'Solved 400+ DSA problems on LeetCode',
  'Engineered 5+ enterprise AI & Full-Stack production systems',
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
