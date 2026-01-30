'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { CameroonMap } from '@/components/ui/cameroon-map'
import { HeroIllustration } from '@/components/ui/hero-illustration'
import {
  GraduationCap,
  Target,
  Heart,
  Users,
  Lightbulb,
  Shield,
  Globe,
  ArrowRight,
  MapPin,
  Calendar,
  TrendingUp,
  CheckCircle2,
  Quote,
  Sparkles,
} from 'lucide-react'

const stats = [
  { value: '500+', label: 'Écoles partenaires', icon: GraduationCap },
  { value: '150K+', label: 'Élèves gérés', icon: Users },
  { value: '10', label: 'Régions couvertes', icon: MapPin },
  { value: '2022', label: 'Année de création', icon: Calendar },
]

const values = [
  {
    icon: Target,
    title: 'Excellence',
    description:
      "Nous visons l'excellence dans chaque fonctionnalité, chaque interaction, chaque ligne de code.",
    color: 'from-[#2302B3] to-[#4318FF]',
  },
  {
    icon: Heart,
    title: "Passion pour l'éducation",
    description:
      "L'éducation est notre moteur. Nous croyons en son pouvoir de transformer des vies et des communautés.",
    color: 'from-[#ce1126] to-[#ff4757]',
  },
  {
    icon: Lightbulb,
    title: 'Innovation locale',
    description:
      'Des solutions conçues au Cameroun, pour le Cameroun. Nous comprenons les réalités du terrain.',
    color: 'from-[#007a5e] to-[#00b386]',
  },
  {
    icon: Shield,
    title: 'Confiance & Sécurité',
    description:
      'Vos données sont sacrées. Nous appliquons les plus hauts standards de sécurité et de confidentialité.',
    color: 'from-[#fcd116] to-[#ffdb4d]',
  },
]

const milestones = [
  {
    year: '2022',
    title: 'Naissance de Help Digi School',
    description: "Fondée à Douala par une équipe passionnée d'éducation et de technologie.",
    icon: Sparkles,
  },
  {
    year: '2023',
    title: 'Premières 100 écoles',
    description: 'Cap symbolique franchi avec des écoles dans 5 régions du Cameroun.',
    icon: GraduationCap,
  },
  {
    year: '2024',
    title: 'Lancement Mobile Money',
    description:
      'Intégration des paiements MTN MoMo et Orange Money pour simplifier les transactions.',
    icon: Shield,
  },
  {
    year: '2025',
    title: '500+ écoles partenaires',
    description: 'Couverture nationale complète des 10 régions du Cameroun.',
    icon: MapPin,
  },
]

// Reusable animated section wrapper
function AnimatedSection({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Staggered children container
function StaggerContainer({
  children,
  className = '',
  staggerDelay = 0.1,
}: {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1]

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: smoothEase } },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: smoothEase } },
}

const slideFromLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: smoothEase } },
}

const slideFromRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: smoothEase } },
}

export default function AboutContent() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <main>
      {/* ============================================
          SECTION 1: HERO
      ============================================ */}
      <section ref={heroRef} className="relative overflow-hidden pb-16 pt-28 lg:pb-24 lg:pt-36">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2302B3]/5 via-transparent to-[#4318FF]/5" />
        <motion.div
          className="absolute right-0 top-20 h-[500px] w-[500px] rounded-full bg-[#2302B3]/10 blur-[120px]"
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-[#4318FF]/10 blur-[100px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#007a5e]/5 blur-[150px]"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #2302B3 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="container relative z-10 mx-auto px-4"
        >
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
            {/* Text Content */}
            <div className="order-2 text-center lg:order-1 lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#2302B3]/20 bg-gradient-to-r from-[#2302B3]/10 to-[#4318FF]/10 px-4 py-2 text-sm font-medium text-[#2302B3]"
              >
                <Globe className="h-4 w-4" />
                Made in Cameroon
                <span className="flex h-2 w-2">
                  <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-[#007a5e] opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#007a5e]"></span>
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="mb-6 text-4xl font-black leading-[1.1] tracking-tight md:text-5xl lg:text-6xl"
              >
                Révolutionner{' '}
                <span className="relative">
                  <span className="bg-gradient-to-r from-[#2302B3] to-[#4318FF] bg-clip-text text-transparent">
                    l&apos;éducation
                  </span>
                  <motion.svg
                    className="absolute -bottom-2 left-0 w-full"
                    height="8"
                    viewBox="0 0 200 8"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
                  >
                    <motion.path
                      d="M1 5.5C47 2 153 2 199 5.5"
                      stroke="url(#underline-gradient)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
                    />
                    <defs>
                      <linearGradient id="underline-gradient" x1="0" y1="0" x2="200" y2="0">
                        <stop stopColor="#2302B3" />
                        <stop offset="1" stopColor="#4318FF" />
                      </linearGradient>
                    </defs>
                  </motion.svg>
                </span>{' '}
                au Cameroun
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto mb-8 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl lg:mx-0"
              >
                Help Digi School est née d&apos;une conviction simple : chaque école camerounaise
                mérite des outils modernes pour offrir la{' '}
                <strong className="text-foreground">meilleure éducation possible</strong> à ses
                élèves.
              </motion.p>

              {/* Feature highlights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mb-8 flex flex-wrap justify-center gap-3 lg:justify-start"
              >
                {['Gestion simplifiée', 'Paiements Mobile Money', '100% Camerounais'].map(
                  (feature, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white/80 px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800/80 dark:text-gray-300"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#007a5e]" />
                      {feature}
                    </motion.span>
                  )
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start"
              >
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#2302B3] to-[#4318FF] px-8 text-base shadow-lg shadow-[#2302B3]/25 hover:from-[#1c0291] hover:to-[#3612cc]"
                    asChild
                  >
                    <Link href="/register">
                      Rejoindre le mouvement
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Button size="lg" variant="outline" className="border-2 px-8 text-base" asChild>
                    <Link href="/contact">Nous contacter</Link>
                  </Button>
                </motion.div>
              </motion.div>

              {/* Trust indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="mt-10 border-t border-gray-200 pt-8 dark:border-gray-800"
              >
                <p className="mb-4 text-sm text-muted-foreground">Ils nous font confiance</p>
                <div className="flex items-center justify-center gap-6 lg:justify-start">
                  <div className="flex -space-x-3">
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0, x: -10 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: 1.1 + i * 0.1,
                          type: 'spring' as const,
                          stiffness: 200,
                        }}
                        className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-[#2302B3] to-[#4318FF] text-xs font-bold text-white dark:border-gray-900"
                      >
                        {['CM', 'DL', 'YD', 'BF'][i]}
                      </motion.div>
                    ))}
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-foreground">500+ écoles</div>
                    <div className="text-sm text-muted-foreground">dans tout le Cameroun</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Illustration */}
            <motion.div
              className="order-1 lg:order-2"
              initial={{ opacity: 0, scale: 0.9, x: 40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <HeroIllustration />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ============================================
          SECTION 2: MISSION
      ============================================ */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-20 dark:from-gray-900 dark:to-gray-950 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Quote Card */}
            <StaggerContainer className="relative order-2 lg:order-1">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#2302B3]/20 to-[#4318FF]/20 blur-2xl" />
              <motion.div
                variants={scaleIn}
                whileHover={{ scale: 1.02, rotate: -1 }}
                transition={{ type: 'spring' as const, stiffness: 300 }}
                className="relative rounded-3xl bg-gradient-to-br from-[#2302B3] to-[#4318FF] p-8 text-white lg:p-12"
              >
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: [0, -5, 0, 5, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Quote className="mb-6 h-12 w-12 text-white/30" />
                </motion.div>
                <blockquote className="mb-8 text-xl font-medium leading-relaxed lg:text-2xl">
                  &ldquo;L&apos;éducation est l&apos;arme la plus puissante qu&apos;on puisse
                  utiliser pour changer le monde.&rdquo;
                </blockquote>
                <div className="flex items-center gap-4">
                  <motion.div
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 font-bold"
                    whileHover={{ scale: 1.15 }}
                  >
                    NM
                  </motion.div>
                  <div>
                    <div className="font-bold">Nelson Mandela</div>
                    <div className="text-sm text-white/70">Notre inspiration</div>
                  </div>
                </div>
              </motion.div>
            </StaggerContainer>

            {/* Mission Content */}
            <StaggerContainer className="order-1 lg:order-2">
              <motion.div
                variants={staggerItem}
                className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#2302B3]/10 px-4 py-2 text-sm font-medium text-[#2302B3]"
              >
                <Target className="h-4 w-4" />
                Notre Mission
              </motion.div>
              <motion.h2
                variants={staggerItem}
                className="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl"
              >
                Digitaliser l&apos;éducation primaire{' '}
                <span className="bg-gradient-to-r from-[#2302B3] to-[#4318FF] bg-clip-text text-transparent">
                  camerounaise
                </span>
              </motion.h2>
              <motion.p
                variants={staggerItem}
                className="mb-6 text-lg leading-relaxed text-muted-foreground"
              >
                Notre mission est de fournir aux écoles primaires du Cameroun une plateforme simple,
                abordable et puissante pour gérer leurs opérations quotidiennes.
              </motion.p>
              <motion.p
                variants={staggerItem}
                className="mb-8 text-lg leading-relaxed text-muted-foreground"
              >
                Nous croyons que la technologie doit être un levier d&apos;égalité. C&apos;est
                pourquoi nous offrons{' '}
                <strong className="text-foreground">la première année gratuite</strong> à toutes les
                écoles, quelle que soit leur taille ou leur localisation.
              </motion.p>
              <motion.ul
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
                className="space-y-4"
              >
                {[
                  'Réduire la charge administrative des directeurs',
                  'Améliorer la communication école-famille',
                  'Digitaliser la gestion des notes et bulletins',
                  'Simplifier le suivi des paiements scolaires',
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
                    }}
                    className="flex items-center gap-3"
                  >
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#007a5e]/10">
                      <CheckCircle2 className="h-4 w-4 text-[#007a5e]" />
                    </div>
                    <span className="font-medium">{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 3: VALEURS
      ============================================ */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <AnimatedSection className="mx-auto mb-16 max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#ce1126]/10 px-4 py-2 text-sm font-medium text-[#ce1126]">
              <Heart className="h-4 w-4" />
              Nos Valeurs
            </div>
            <h2 className="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl">
              Ce qui nous{' '}
              <span className="bg-gradient-to-r from-[#ce1126] to-[#ff4757] bg-clip-text text-transparent">
                guide
              </span>{' '}
              au quotidien
            </h2>
            <p className="text-lg text-muted-foreground">
              Ces valeurs sont le fondement de chaque décision que nous prenons et de chaque
              fonctionnalité que nous développons.
            </p>
          </AnimatedSection>

          <StaggerContainer
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
            staggerDelay={0.15}
          >
            {values.map((value, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: 'spring' as const, stiffness: 300, damping: 20 }}
                className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-8 transition-all duration-500 hover:border-transparent hover:shadow-2xl"
              >
                {/* Hover gradient background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 transition-opacity duration-500 group-hover:opacity-5`}
                />

                <motion.div
                  className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${value.color} mb-6 flex items-center justify-center shadow-lg`}
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  transition={{ type: 'spring' as const, stiffness: 300 }}
                >
                  <value.icon className="h-7 w-7 text-white" />
                </motion.div>
                <h3 className="mb-3 text-xl font-bold">{value.title}</h3>
                <p className="leading-relaxed text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ============================================
          SECTION 4: TIMELINE
      ============================================ */}
      <section className="overflow-hidden bg-[#1A1A1A] py-20 text-white lg:py-28">
        <div className="container mx-auto px-4">
          <AnimatedSection className="mx-auto mb-16 max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white">
              <TrendingUp className="h-4 w-4" />
              Notre Parcours
            </div>
            <h2 className="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl">
              Une croissance{' '}
              <span className="bg-gradient-to-r from-[#4318FF] to-[#00b386] bg-clip-text text-transparent">
                constante
              </span>
            </h2>
            <p className="text-lg text-white/70">
              Depuis notre création, nous n&apos;avons cessé de grandir et d&apos;améliorer notre
              plateforme.
            </p>
          </AnimatedSection>

          {/* Horizontal Timeline for desktop */}
          <div className="mx-auto hidden max-w-5xl lg:block">
            <div className="relative">
              {/* Animated timeline line */}
              <TimelineLine />

              <StaggerContainer className="grid grid-cols-4 gap-4" staggerDelay={0.2}>
                {milestones.map((milestone, i) => (
                  <motion.div
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 40 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.6, ease: smoothEase },
                      },
                    }}
                    className="relative pt-16"
                  >
                    {/* Timeline dot */}
                    <motion.div
                      className="absolute left-1/2 top-4 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-br from-[#2302B3] to-[#4318FF] shadow-lg shadow-[#2302B3]/50"
                      whileHover={{ scale: 1.3 }}
                      transition={{ type: 'spring' as const, stiffness: 300 }}
                    >
                      <milestone.icon className="h-4 w-4 text-white" />
                    </motion.div>

                    {/* Content card */}
                    <motion.div
                      className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:bg-white/10"
                      whileHover={{ y: -4, scale: 1.03 }}
                      transition={{ type: 'spring' as const, stiffness: 300, damping: 20 }}
                    >
                      <div className="mb-2 text-3xl font-black text-[#4318FF]">
                        {milestone.year}
                      </div>
                      <h3 className="mb-2 text-lg font-bold">{milestone.title}</h3>
                      <p className="text-sm text-white/60">{milestone.description}</p>
                    </motion.div>
                  </motion.div>
                ))}
              </StaggerContainer>
            </div>
          </div>

          {/* Vertical Timeline for mobile */}
          <div className="mx-auto max-w-md lg:hidden">
            <div className="relative">
              <div className="absolute bottom-0 left-6 top-0 w-0.5 bg-gradient-to-b from-[#2302B3] to-[#00b386]" />

              <StaggerContainer className="space-y-8" staggerDelay={0.2}>
                {milestones.map((milestone, i) => (
                  <motion.div
                    key={i}
                    variants={{
                      hidden: { opacity: 0, x: -30 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
                    }}
                    className="relative flex items-start gap-6"
                  >
                    <motion.div
                      className="z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#2302B3] to-[#4318FF] shadow-lg"
                      whileHover={{ scale: 1.2 }}
                    >
                      <milestone.icon className="h-5 w-5 text-white" />
                    </motion.div>

                    <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-5">
                      <div className="mb-1 text-xl font-black text-[#4318FF]">{milestone.year}</div>
                      <h3 className="mb-1 font-bold">{milestone.title}</h3>
                      <p className="text-sm text-white/60">{milestone.description}</p>
                    </div>
                  </motion.div>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 5: IMPACT
      ============================================ */}
      <section className="overflow-hidden bg-gradient-to-b from-gray-50 to-white py-20 dark:from-gray-950 dark:to-gray-900 lg:py-28">
        <div className="container mx-auto px-4">
          <AnimatedSection className="mx-auto mb-16 max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#007a5e]/10 px-4 py-2 text-sm font-medium text-[#007a5e]">
              <MapPin className="h-4 w-4" />
              Notre Impact
            </div>
            <h2 className="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl">
              Présents dans les{' '}
              <span className="bg-gradient-to-r from-[#007a5e] to-[#00b386] bg-clip-text text-transparent">
                10 régions
              </span>{' '}
              du Cameroun
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              De l&apos;Extrême-Nord au Sud, nous accompagnons les écoles de tout le pays dans leur
              transformation digitale.
            </p>
          </AnimatedSection>

          {/* Stats Grid */}
          <StaggerContainer
            className="mx-auto mb-16 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6"
            staggerDelay={0.12}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                whileHover={{ y: -6, scale: 1.05 }}
                transition={{ type: 'spring' as const, stiffness: 300, damping: 20 }}
                className="relative rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-xl dark:border-gray-700 dark:bg-gray-800"
              >
                <motion.div
                  className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#2302B3]/10 to-[#4318FF]/10"
                  whileHover={{ rotate: 10 }}
                >
                  <stat.icon className="h-6 w-6 text-[#2302B3]" />
                </motion.div>
                <div className="mb-1 bg-gradient-to-r from-[#2302B3] to-[#4318FF] bg-clip-text text-3xl font-black text-transparent lg:text-4xl">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </StaggerContainer>

          {/* Interactive Map */}
          <AnimatedSection className="mx-auto max-w-7xl">
            <CameroonMap />
          </AnimatedSection>
        </div>
      </section>

      {/* ============================================
          SECTION 6: CTA
      ============================================ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#2302B3] to-[#4318FF] py-20 text-white lg:py-28">
        {/* Animated background decorations */}
        <motion.div
          className="absolute left-0 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-white/5 blur-3xl"
          animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-white/20"
            style={{
              top: `${15 + i * 14}%`,
              left: `${10 + i * 15}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.4,
            }}
          />
        ))}

        <div className="container relative z-10 mx-auto px-4">
          <AnimatedSection className="mx-auto max-w-3xl text-center">
            <motion.h2
              className="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              Prêt à rejoindre le mouvement ?
            </motion.h2>
            <motion.p
              className="mb-10 text-xl leading-relaxed text-white/80"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              Rejoignez les 500+ écoles qui font confiance à Help Digi School pour simplifier leur
              gestion quotidienne et offrir une meilleure expérience à leurs élèves et parents.
            </motion.p>
            <motion.div
              className="flex flex-col justify-center gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-white px-8 text-base text-[#2302B3] shadow-xl hover:bg-white/90"
                  asChild
                >
                  <Link href="/register">
                    Commencer gratuitement
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white px-8 text-base text-white hover:bg-white/10"
                  asChild
                >
                  <Link href="/contact">Parler à un expert</Link>
                </Button>
              </motion.div>
            </motion.div>
            <motion.p
              className="mt-6 text-sm text-white/60"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              Première année gratuite &bull; Aucune carte de crédit requise &bull; Support 24/7
            </motion.p>
          </AnimatedSection>
        </div>
      </section>
    </main>
  )
}

// Animated timeline line component
function TimelineLine() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <div
      ref={ref}
      className="absolute left-0 right-0 top-8 h-1 overflow-hidden rounded-full bg-white/10"
    >
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-[#2302B3] via-[#4318FF] to-[#00b386]"
        initial={{ width: '0%' }}
        animate={isInView ? { width: '100%' } : { width: '0%' }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  )
}
