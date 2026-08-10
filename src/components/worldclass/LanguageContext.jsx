import React, { createContext, useContext, useState } from 'react'

const translations = {
  en: {
    nav: {
      about: 'About',
      skills: 'Skills',
      experience: 'Career',
      projects: 'Projects',
      dsa: 'DSA',
      contact: 'Contact',
      talk: "Let's Talk",
    },
    hero: {
      role: 'Full Stack & AI Developer',
      subtitle: 'Final year B.Tech student at NSUT specializing in Mathematics & Computing. Building scalable full-stack applications & AI architectures.',
      viewWork: 'View Work',
      contactMe: 'Contact Me',
    },
    about: {
      tag: '01. About Me',
      heading: 'Bridging the gap between Intelligent AI and robust architecture.',
      bio: 'I am a final year B.Tech student specializing in Mathematics & Computing at NSUT. My expertise lies in architecting full-stack applications and deploying machine learning models that solve real-world problems.',
    },
    projects: {
      tag: '05. Work',
      title: 'Featured Projects',
      subtitle: 'Production-ready full-stack applications and AI intelligence models.',
    },
  },
  hi: {
    nav: {
      about: 'परिचय',
      skills: 'कौशल',
      experience: 'अनुभव',
      projects: 'प्रोजेक्ट्स',
      dsa: 'डीएसए',
      contact: 'संपर्क',
      talk: 'बात करें',
    },
    hero: {
      role: 'फुल स्टैक एवं एआई डेवलपर',
      subtitle: 'एनएसयूटी में गणित और कंप्यूटिंग में बी.टेक अंतिम वर्ष का छात्र। स्केलेबल फुल-स्टैक ऐप्स और AI मॉडल निर्माणकर्ता।',
      viewWork: 'काम देखें',
      contactMe: 'संपर्क करें',
    },
    about: {
      tag: '01. मेरे बारे में',
      heading: 'इंटेलीजेंट एआई और मजबूत आर्किटेक्चर के बीच का सेतु।',
      bio: 'मैं एनएसयूटी से गणित और कंप्यूटिंग में बी.टेक अंतिम वर्ष का छात्र हूँ। मेरी विशेषज्ञता फुल-स्टैक ऐप्स बनाने और मशीन लर्निंग मॉडल तैनात करने में है।',
    },
    projects: {
      tag: '05. कार्य',
      title: 'प्रमुख प्रोजेक्ट्स',
      subtitle: 'उत्पादन-तैयार फुल-स्टैक ऐप्स और आर्टिफिशियल इंटेलिजेंस मॉडल।',
    },
  },
}

const LanguageContext = createContext({
  lang: 'en',
  setLang: () => {},
  t: (key) => key,
})

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en')

  const t = (path) => {
    const keys = path.split('.')
    let curr = translations[lang]
    for (const k of keys) {
      if (curr && curr[k]) {
        curr = curr[k]
      } else {
        return path
      }
    }
    return curr
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}

export function LanguageToggle() {
  const { lang, setLang } = useLanguage()

  return (
    <button
      onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
      className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-cyan-300 hover:bg-white/10 hover:border-cyan-400/40 transition-all flex items-center gap-1.5 cursor-pointer"
      title="Switch Language (English / हिन्दी)"
    >
      <span className="opacity-60">🌐</span>
      <span className="font-bold">{lang === 'en' ? 'EN' : 'HI'}</span>
    </button>
  )
}
