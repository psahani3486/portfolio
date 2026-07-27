import React from 'react'
import { motion } from 'framer-motion'

export default function CinematicText({
  text,
  className = '',
  delay = 0,
  stagger = 0.03,
  as = 'h2',
  highlightWords = [],
}) {
  const words = text.split(' ')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  }

  const wordVariants = {
    hidden: { y: '100%', opacity: 0, rotateX: -45 },
    visible: {
      y: '0%',
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  const Tag = motion[as] || motion.div

  return (
    <Tag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={containerVariants}
      className={`inline-flex flex-wrap gap-x-[0.3em] gap-y-[0.1em] overflow-hidden ${className}`}
    >
      {words.map((word, i) => {
        const isHighlight = highlightWords.some(
          (hw) => word.toLowerCase().includes(hw.toLowerCase())
        )

        return (
          <span key={i} className="inline-block overflow-hidden py-1">
            <motion.span
              variants={wordVariants}
              className={`inline-block ${
                isHighlight ? 'text-gradient font-bold' : ''
              }`}
            >
              {word}
            </motion.span>
          </span>
        )
      })}
    </Tag>
  )
}
