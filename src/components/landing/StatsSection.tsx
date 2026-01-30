'use client'

import {
  Building2,
  Users,
  FileText,
  ThumbsUp,
  GraduationCap,
  BookOpen,
  Pencil,
  School,
  Trophy,
  Star,
  Ruler,
  Globe,
} from 'lucide-react'
import { useCounter } from '@/hooks/use-counter'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const stats = [
  {
    icon: Building2,
    value: 500,
    suffix: '+',
    label: 'Écoles partenaires',
    description: 'dans les 10 régions du Cameroun',
    gradient: 'from-violet-400 to-purple-500',
    iconBg: 'bg-violet-500/20',
    iconColor: 'text-violet-300',
    ring: 'ring-violet-500/20',
  },
  {
    icon: Users,
    value: 50000,
    suffix: '+',
    label: 'Élèves gérés',
    description: 'chaque année scolaire',
    format: true,
    gradient: 'from-emerald-400 to-teal-500',
    iconBg: 'bg-emerald-500/20',
    iconColor: 'text-emerald-300',
    ring: 'ring-emerald-500/20',
  },
  {
    icon: FileText,
    value: 200000,
    suffix: '+',
    label: 'Bulletins générés',
    description: 'depuis le lancement',
    format: true,
    gradient: 'from-amber-400 to-orange-500',
    iconBg: 'bg-amber-500/20',
    iconColor: 'text-amber-300',
    ring: 'ring-amber-500/20',
  },
  {
    icon: ThumbsUp,
    value: 98,
    suffix: '%',
    label: 'Satisfaction',
    description: 'clients satisfaits',
    gradient: 'from-rose-400 to-pink-500',
    iconBg: 'bg-rose-500/20',
    iconColor: 'text-rose-300',
    ring: 'ring-rose-500/20',
  },
]

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.9,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 14,
      delay: i * 0.15,
    },
  }),
}

const floatIconVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 120,
      damping: 12,
      delay: 0.5 + i * 0.1,
    },
  }),
}

function StatCard({ stat, index }: { stat: (typeof stats)[0]; index: number }) {
  const { count, ref } = useCounter({
    end: stat.value,
    duration: 2500,
  })

  const formatNumber = (num: number) => {
    if (stat.format) {
      return Math.floor(num).toLocaleString('fr-FR')
    }
    return Math.floor(num).toString()
  }

  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      whileHover={{
        y: -6,
        scale: 1.03,
        transition: { type: 'spring' as const, stiffness: 300, damping: 20 },
      }}
      className="group relative"
    >
      <div
        className={`relative overflow-hidden rounded-3xl bg-white/10 p-6 shadow-lg ring-1 ${stat.ring} backdrop-blur-sm transition-colors duration-500 hover:bg-white/15 hover:shadow-xl sm:p-8`}
      >
        {/* Subtle gradient accent on top */}
        <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${stat.gradient}`} />

        {/* Icon */}
        <motion.div
          whileHover={{ rotate: [0, -12, 12, 0], scale: 1.15 }}
          transition={{ duration: 0.5 }}
          className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${stat.iconBg} sm:h-16 sm:w-16`}
        >
          <stat.icon className={`h-7 w-7 ${stat.iconColor} sm:h-8 sm:w-8`} />
        </motion.div>

        {/* Value */}
        <p className="mb-1 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
          {formatNumber(count)}
          <span className={`bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
            {stat.suffix}
          </span>
        </p>

        {/* Label */}
        <p className="mb-1 text-sm font-semibold text-white/90 sm:text-base">{stat.label}</p>

        {/* Description */}
        <p className="text-xs text-white/60 sm:text-sm">{stat.description}</p>
      </div>
    </motion.div>
  )
}

const cornerIcons = [
  { Icon: GraduationCap, position: 'left-4 top-4 sm:left-8 sm:top-8 lg:left-12 lg:top-10' },
  { Icon: School, position: 'right-4 top-4 sm:right-8 sm:top-8 lg:right-12 lg:top-10' },
  { Icon: BookOpen, position: 'bottom-4 left-4 sm:bottom-8 sm:left-8 lg:bottom-10 lg:left-12' },
  { Icon: Trophy, position: 'bottom-4 right-4 sm:bottom-8 sm:right-8 lg:bottom-10 lg:right-12' },
]

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-[#1a1060] to-purple-950 py-20 sm:py-24 lg:py-32"
    >
      {/* Glowing orbs */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : undefined}
          transition={{ duration: 2, ease: 'easeOut' }}
          className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl"
        />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : undefined}
          transition={{ duration: 2, delay: 0.3, ease: 'easeOut' }}
          className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl"
        />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : undefined}
          transition={{ duration: 2, delay: 0.6, ease: 'easeOut' }}
          className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/15 blur-3xl"
        />
      </div>

      {/* School icons in corners */}
      <div className="pointer-events-none absolute inset-0 z-[1]">
        {cornerIcons.map(({ Icon, position }, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={floatIconVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className={`absolute ${position}`}
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
              className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[0.06] backdrop-blur-sm sm:h-20 sm:w-20 lg:h-24 lg:w-24"
            >
              <Icon className="h-8 w-8 text-white/20 sm:h-10 sm:w-10 lg:h-12 lg:w-12" />
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Floating school icons scattered */}
      <div className="pointer-events-none absolute inset-0 z-[1]">
        <GraduationCap className="absolute left-[15%] top-[18%] h-8 w-8 rotate-[-15deg] text-violet-300/[0.08] sm:h-10 sm:w-10 lg:h-12 lg:w-12" />
        <BookOpen className="absolute right-[20%] top-[12%] h-7 w-7 rotate-[10deg] text-purple-300/[0.08] sm:h-9 sm:w-9 lg:h-11 lg:w-11" />
        <Pencil className="absolute bottom-[25%] left-[10%] h-6 w-6 rotate-[25deg] text-indigo-300/[0.08] sm:h-8 sm:w-8 lg:h-10 lg:w-10" />
        <Ruler className="absolute bottom-[20%] right-[12%] h-8 w-8 rotate-[-8deg] text-pink-300/[0.08] sm:h-10 sm:w-10 lg:h-12 lg:w-12" />
        <Globe className="absolute left-[40%] top-[8%] h-6 w-6 rotate-[12deg] text-cyan-300/[0.07] sm:h-8 sm:w-8 lg:h-9 lg:w-9" />
        <Star className="absolute bottom-[10%] right-[35%] h-5 w-5 rotate-[-20deg] text-amber-300/[0.07] sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
        <GraduationCap className="absolute right-[8%] top-[45%] h-7 w-7 rotate-[20deg] text-violet-300/[0.06] sm:h-9 sm:w-9 lg:h-10 lg:w-10" />
        <BookOpen className="absolute left-[6%] top-[50%] h-6 w-6 rotate-[-12deg] text-purple-300/[0.06] sm:h-8 sm:w-8 lg:h-9 lg:w-9" />
      </div>

      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="mx-auto mb-12 max-w-2xl text-center sm:mb-16"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.8, y: 20 },
              visible: {
                opacity: 1,
                scale: 1,
                y: 0,
                transition: { type: 'spring' as const, stiffness: 200, damping: 20 },
              },
            }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/80 backdrop-blur-sm sm:text-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-violet-400 to-purple-400" />
            En chiffres
          </motion.div>
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
              visible: {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
              },
            }}
            className="mb-3 text-2xl font-bold text-white sm:text-3xl lg:text-4xl"
          >
            La confiance de{' '}
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              centaines d&apos;écoles
            </span>
          </motion.h2>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
              },
            }}
            className="text-sm text-white/60 sm:text-base lg:text-lg"
          >
            Des résultats concrets qui parlent d&apos;eux-mêmes.
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-6">
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
