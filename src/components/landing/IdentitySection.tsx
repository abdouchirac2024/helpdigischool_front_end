'use client'

import { cn } from '@/lib/utils'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface IdentitySectionProps {
  title?: string
  subtitle?: string
  description?: string
  className?: string
}

export function IdentitySection({
  title = 'Notre Mission',
  subtitle = "L'excellence au service de l'éducation",
  description = "Chez Help Digi School, nous croyons que chaque établissement mérite les meilleurs outils technologiques pour s'épanouir. Notre mission est de simplifier la gestion scolaire pour permettre aux éducateurs de se concentrer sur ce qui compte vraiment : l'avenir des élèves.",
  className,
}: IdentitySectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section ref={sectionRef} className={cn('relative overflow-hidden bg-white py-24', className)}>
      {/* Branded Geometric Pattern Background */}
      <div className="pointer-events-none absolute inset-0 text-[#2302B3] opacity-[0.04]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="identity-pattern"
              x="0"
              y="0"
              width="120"
              height="120"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M60 0 L120 60 L60 120 L0 60 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.8"
              />
              <circle cx="60" cy="60" r="15" fill="none" stroke="currentColor" strokeWidth="0.8" />
              <path
                d="M0 0 L120 120 M120 0 L0 120"
                stroke="currentColor"
                strokeWidth="0.3"
                opacity="0.5"
              />
              <rect
                x="50"
                y="50"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.8"
                transform="rotate(45 60 60)"
              />
              <circle cx="0" cy="0" r="2" fill="currentColor" />
              <circle cx="120" cy="0" r="2" fill="currentColor" />
              <circle cx="0" cy="120" r="2" fill="currentColor" />
              <circle cx="120" cy="120" r="2" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#identity-pattern)" />
        </svg>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } },
          }}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.8, y: 20 },
              visible: {
                opacity: 1,
                scale: 1,
                y: 0,
                transition: { type: 'spring', stiffness: 200, damping: 20 },
              },
            }}
            className="mb-6 inline-block rounded-full bg-[#2302B3]/5 px-4 py-1.5 text-sm font-bold uppercase tracking-wider text-[#2302B3] ring-1 ring-[#2302B3]/10"
          >
            {title}
          </motion.div>
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 50, filter: 'blur(12px)' },
              visible: {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
              },
            }}
            className="mb-8 text-4xl font-black tracking-tight text-gray-900 md:text-5xl lg:text-6xl"
          >
            {subtitle}
          </motion.h2>
          <motion.div
            variants={{
              hidden: { scaleX: 0, opacity: 0 },
              visible: {
                scaleX: 1,
                opacity: 1,
                transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
              },
            }}
            className="mx-auto mb-10 h-1.5 w-24 origin-center rounded-full bg-gradient-to-r from-[#2302B3] to-[#4318FF]"
          />
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
              visible: {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
              },
            }}
            className="text-xl font-medium leading-relaxed text-muted-foreground md:text-2xl"
          >
            {description}
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
