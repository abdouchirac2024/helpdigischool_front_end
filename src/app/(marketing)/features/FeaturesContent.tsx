'use client'

import { useRef } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import {
  FileText,
  CreditCard,
  Users,
  Bell,
  BarChart3,
  Shield,
  Smartphone,
  Wifi,
  Calculator,
  BookOpen,
  Clock,
  Download,
  MessageSquare,
  UserCheck,
  CalendarDays,
  FileSpreadsheet,
  ArrowRight,
  Mail,
  Sparkles,
  CheckCircle2,
  Zap,
} from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const featureCategories = [
  {
    title: 'Gestion des Notes',
    description: 'Saisie intuitive et calculs automatiques pour un suivi scolaire sans effort.',
    icon: Calculator,
    color: '#2302B3',
    lightBg: 'bg-[#2302B3]/[0.06]',
    lightText: 'text-[#2302B3]',
    gradient: 'from-[#2302B3] to-[#4318FF]',
    features: [
      {
        icon: FileText,
        title: 'Saisie rapide',
        desc: 'Interface tableur pour saisir les notes par classe',
      },
      {
        icon: Calculator,
        title: 'Calculs auto',
        desc: 'Moyennes, coefficients et classements automatiques',
      },
      {
        icon: FileSpreadsheet,
        title: 'Export Excel',
        desc: 'Téléchargez vos données au format Excel/CSV',
      },
      { icon: Clock, title: 'Historique', desc: 'Accédez aux notes des années précédentes' },
    ],
  },
  {
    title: 'Bulletins PDF',
    description: 'Génération professionnelle instantanée de bulletins conformes.',
    icon: FileText,
    color: '#059669',
    lightBg: 'bg-emerald-500/[0.06]',
    lightText: 'text-emerald-600',
    gradient: 'from-emerald-500 to-teal-500',
    features: [
      {
        icon: FileText,
        title: 'Templates pro',
        desc: 'Modèles conformes au programme camerounais',
      },
      { icon: BookOpen, title: 'Bilingue FR/EN', desc: 'Bulletins en français et anglais' },
      { icon: Download, title: 'Téléchargement', desc: 'PDF haute qualité, prêt à imprimer' },
      {
        icon: MessageSquare,
        title: 'Appréciations',
        desc: 'Ajoutez des commentaires personnalisés',
      },
    ],
  },
  {
    title: 'Paiements',
    description: 'Mobile Money et suivi complet de la trésorerie scolaire.',
    icon: CreditCard,
    color: '#D97706',
    lightBg: 'bg-amber-500/[0.06]',
    lightText: 'text-amber-600',
    gradient: 'from-amber-500 to-orange-500',
    features: [
      { icon: CreditCard, title: 'Mobile Money', desc: 'MTN MoMo, Orange Money, Wave intégrés' },
      { icon: Bell, title: 'Relances SMS', desc: 'Rappels automatiques pour les arriérés' },
      { icon: BarChart3, title: 'Tableau de bord', desc: 'Suivez vos revenus en temps réel' },
      { icon: FileSpreadsheet, title: 'Reçus auto', desc: 'Génération automatique des reçus' },
    ],
  },
  {
    title: 'Communication',
    description: 'Restez connecté avec les parents en temps réel.',
    icon: Bell,
    color: '#7C3AED',
    lightBg: 'bg-violet-500/[0.06]',
    lightText: 'text-violet-600',
    gradient: 'from-violet-500 to-purple-600',
    features: [
      { icon: Bell, title: 'Notifications push', desc: 'Alertes instantanées sur mobile' },
      { icon: MessageSquare, title: 'SMS groupés', desc: 'Envoyez des SMS à toute une classe' },
      { icon: Mail, title: 'Emails', desc: 'Notifications par email automatiques' },
      { icon: UserCheck, title: 'Accusés', desc: 'Confirmez la lecture des messages' },
    ],
  },
]

const additionalFeatures = [
  { icon: Smartphone, title: 'Application Mobile PWA', desc: "Installez l'app sur Android/iOS" },
  { icon: Wifi, title: 'Mode Hors-Ligne', desc: 'Travaillez sans connexion Internet' },
  { icon: Shield, title: 'Sécurité Maximale', desc: 'Données chiffrées et sauvegardes' },
  { icon: Users, title: 'Multi-Utilisateurs', desc: 'Gérez les accès de votre équipe' },
  { icon: CalendarDays, title: 'Emplois du Temps', desc: 'Planifiez les cours et événements' },
  { icon: BarChart3, title: 'Rapports Avancés', desc: 'Statistiques et analyses détaillées' },
]

const images = [
  '/teacher_grades.jpeg',
  '/student_girl.jpeg',
  '/director_signup.jpeg',
  '/parent_sms.jpeg',
]

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                  */
/* ------------------------------------------------------------------ */

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: smoothEase },
  }),
}

const fadeScale = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.08, ease: smoothEase },
  }),
}

const slideFromLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: smoothEase },
  },
}

const slideFromRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: smoothEase },
  },
}

/* ------------------------------------------------------------------ */
/*  Section wrapper with scroll-trigger                                */
/* ------------------------------------------------------------------ */

function AnimatedSection({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className={className}>
      <div
        style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {children}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Feature Category Section                                           */
/* ------------------------------------------------------------------ */

function FeatureCategorySection({
  category,
  index,
}: {
  category: (typeof featureCategories)[0]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const isReversed = index % 2 === 1

  return (
    <section
      className={`relative overflow-hidden py-16 lg:py-28 ${
        index % 2 === 1 ? 'bg-gray-50/60' : ''
      }`}
    >
      {/* Subtle background glow */}
      <div
        className="pointer-events-none absolute -top-40 opacity-[0.04]"
        style={{
          left: isReversed ? '10%' : 'auto',
          right: isReversed ? 'auto' : '10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${category.color}, transparent 70%)`,
        }}
      />

      <div ref={ref} className="container mx-auto px-4 sm:px-6">
        <div
          className={`flex flex-col items-center gap-12 lg:gap-20 ${
            isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'
          }`}
        >
          {/* Content */}
          <motion.div
            className="flex-1"
            variants={isReversed ? slideFromRight : slideFromLeft}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {/* Icon badge */}
            <motion.div
              className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${category.gradient} mb-6 shadow-lg`}
              style={{ boxShadow: `0 8px 30px ${category.color}30` }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <category.icon className="h-7 w-7 text-white" />
            </motion.div>

            <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              {category.title}
            </h2>
            <p className="mb-8 max-w-lg text-lg leading-relaxed text-gray-500">
              {category.description}
            </p>

            {/* Feature cards */}
            <div className="grid gap-3 sm:grid-cols-2">
              {category.features.map((feature, j) => (
                <motion.div
                  key={j}
                  custom={j}
                  variants={fadeScale}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                  whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.08)' }}
                  className="group flex items-start gap-3.5 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-colors duration-300 hover:border-gray-200"
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${category.lightBg} transition-all duration-300 group-hover:scale-110`}
                  >
                    <feature.icon className={`h-5 w-5 ${category.lightText}`} />
                  </div>
                  <div>
                    <p className="text-[15px] font-semibold text-gray-900">{feature.title}</p>
                    <p className="mt-0.5 text-sm leading-snug text-gray-500">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Visual / Image */}
          <motion.div
            className="w-full flex-1"
            variants={isReversed ? slideFromLeft : slideFromRight}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <div className="relative">
              {/* Decorative floating elements */}
              <motion.div
                className={`absolute -right-4 -top-4 h-20 w-20 rounded-2xl bg-gradient-to-br ${category.gradient} opacity-10 blur-sm`}
                animate={{ y: [0, -12, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className={`absolute -bottom-4 -left-4 h-16 w-16 rounded-full bg-gradient-to-br ${category.gradient} opacity-10 blur-sm`}
                animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              />

              {/* Image container */}
              <motion.div
                className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl lg:aspect-square"
                style={{ boxShadow: `0 25px 60px ${category.color}15` }}
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-110"
                  style={{ backgroundImage: `url('${images[index]}')` }}
                />
                {/* Gradient veil */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    background: `linear-gradient(135deg, ${category.color}30, transparent 60%)`,
                  }}
                />
                {/* Bottom glass info bar */}
                <motion.div
                  className="absolute inset-x-0 bottom-0 border-t border-white/40 bg-white/80 px-5 py-3 backdrop-blur-xl"
                  initial={{ y: 20, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${category.gradient}`}
                    >
                      <category.icon className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{category.title}</p>
                      <p className="text-[11px] text-gray-500">
                        {category.features.length} fonctionnalités
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function FeaturesContent() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24">
        {/* ============ HERO ============ */}
        <section ref={heroRef} className="relative overflow-hidden py-20 lg:py-32">
          {/* Animated background grid */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(35,2,179,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(35,2,179,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
          </div>

          {/* Floating orbs */}
          <motion.div
            className="pointer-events-none absolute left-[10%] top-[20%] h-72 w-72 rounded-full bg-[#2302B3]/[0.04] blur-3xl"
            animate={{ y: [0, -30, 0], x: [0, 15, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="pointer-events-none absolute bottom-[10%] right-[10%] h-60 w-60 rounded-full bg-violet-500/[0.04] blur-3xl"
            animate={{ y: [0, 20, 0], x: [0, -20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />

          <motion.div
            className="container relative z-10 mx-auto px-4"
            style={{ y: heroY, opacity: heroOpacity }}
          >
            <div className="mx-auto max-w-3xl text-center">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#2302B3]/10 bg-[#2302B3]/[0.04] px-4 py-1.5"
              >
                <Sparkles className="h-3.5 w-3.5 text-[#2302B3]" />
                <span className="text-xs font-semibold text-[#2302B3]">Plateforme tout-en-un</span>
              </motion.div>

              {/* Title */}
              <motion.h1
                className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                Toutes les fonctionnalités pour{' '}
                <span className="relative">
                  <span className="gradient-text">votre école</span>
                  <motion.span
                    className="absolute -bottom-1 left-0 h-[3px] rounded-full bg-gradient-to-r from-[#2302B3] to-[#4318FF]"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  />
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-gray-500"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                Une plateforme complète conçue spécifiquement pour les écoles primaires
                camerounaises. Simplifiez votre quotidien avec nos outils puissants et intuitifs.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col items-center justify-center gap-3 sm:flex-row"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <Button variant="hero" size="xl" asChild>
                  <Link href="/register" className="group">
                    Essayer Gratuitement
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button variant="outline" size="xl" asChild>
                  <Link href="/pricing">Voir les Tarifs</Link>
                </Button>
              </motion.div>

              {/* Trust indicators */}
              <motion.div
                className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                {["14 jours d'essai gratuit", 'Sans carte bancaire', 'Support 24/7'].map((text) => (
                  <span key={text} className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    {text}
                  </span>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* ============ FEATURE CATEGORIES ============ */}
        {featureCategories.map((category, i) => (
          <FeatureCategorySection key={i} category={category} index={i} />
        ))}

        {/* ============ ADDITIONAL FEATURES ============ */}
        <AnimatedSection className="relative overflow-hidden bg-gradient-to-br from-[#1a0170] via-[#2302B3] to-[#4318FF] py-20 lg:py-28">
          {/* Background pattern */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

          {/* Floating glow */}
          <motion.div
            className="pointer-events-none absolute right-[15%] top-[10%] h-48 w-48 rounded-full bg-white/[0.06] blur-3xl"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="container relative z-10 mx-auto px-4">
            <div className="mb-14 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5"
              >
                <Zap className="h-3.5 w-3.5 text-amber-300" />
                <span className="text-xs font-semibold text-white/80">Plus de fonctionnalités</span>
              </motion.div>
              <motion.h2
                className="text-3xl font-bold text-white sm:text-4xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Et bien plus encore...
              </motion.h2>
              <motion.p
                className="mx-auto mt-3 max-w-lg text-white/60"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Des fonctionnalités pensées pour votre productivité
              </motion.p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {additionalFeatures.map((feature, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{
                    y: -6,
                    backgroundColor: 'rgba(255,255,255,0.12)',
                    borderColor: 'rgba(255,255,255,0.25)',
                  }}
                  className="group rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-sm transition-colors"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 transition-transform duration-300 group-hover:scale-110">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mb-2 font-semibold text-white">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-white/60">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* ============ CTA ============ */}
        <AnimatedSection className="relative overflow-hidden py-20 lg:py-28">
          {/* Subtle background */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(35,2,179,0.03),transparent_70%)]" />

          <div className="container relative z-10 mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto max-w-2xl"
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span className="text-xs font-semibold text-emerald-700">
                  500+ écoles font déjà confiance
                </span>
              </div>

              <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
                Prêt à commencer?
              </h2>
              <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-gray-500">
                Rejoignez les écoles qui font confiance à Help Digi School. Essai gratuit de 14
                jours, sans engagement.
              </p>
              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button variant="hero" size="xl" asChild>
                  <Link href="/register" className="group">
                    Inscrire Mon École
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button variant="outline" size="xl" asChild>
                  <Link href="/pricing">Voir les Tarifs</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </AnimatedSection>
      </main>
      <Footer />
    </div>
  )
}
