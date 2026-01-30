'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Play,
  CheckCircle2,
  GraduationCap,
  FileText,
  CreditCard,
  Bell,
  Users,
  BookOpen,
  TrendingUp,
  Sparkles,
} from 'lucide-react'

const features = [
  { icon: FileText, text: 'Saisie des notes automatisée' },
  { icon: BookOpen, text: 'Bulletins PDF professionnels' },
  { icon: CreditCard, text: 'Paiements Mobile Money' },
  { icon: Bell, text: 'Notifications SMS parents' },
]

const stats = [
  { label: 'Écoles', value: '500+', icon: GraduationCap },
  { label: 'Élèves gérés', value: '50K+', icon: Users },
  { label: 'Satisfaction', value: '4.9/5', icon: TrendingUp },
]

export function HeroSection() {
  const backgroundImages = [
    '/teacher.jpeg',
    '/director_signup.jpeg',
    '/teacher_grades.jpeg',
    '/parent_sms.jpeg',
  ]
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [backgroundImages.length])

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* Background Images */}
      {backgroundImages.map((bg, index) => (
        <div
          key={bg}
          className="duration-[1200ms] absolute inset-0 z-0 transition-opacity ease-in-out will-change-[opacity]"
          style={{
            backgroundImage: `url("${bg}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: index === currentImageIndex ? 1 : 0,
          }}
        />
      ))}

      {/* Overlay Gradients */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-br from-slate-950/80 via-slate-900/60 to-slate-950/40" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

      {/* Decorative Elements */}
      <div className="absolute left-10 top-20 z-[1] h-64 w-64 rounded-full bg-primary/20 blur-[120px]" />
      <div className="absolute bottom-20 right-10 z-[1] h-80 w-80 rounded-full bg-secondary/15 blur-[120px]" />

      {/* Main Content */}
      <div className="container relative z-10 mx-auto px-4 py-28 sm:px-6 sm:py-32 lg:px-8 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          {/* Left Content - Text */}
          <div className="space-y-6 text-center sm:space-y-7 lg:col-span-7 lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur-xl sm:text-sm"
            >
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              <span>Plateforme SaaS #1 au Cameroun</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl"
            >
              Gérez votre école{' '}
              <span className="relative">
                <span className="bg-gradient-to-r from-primary via-blue-400 to-secondary bg-clip-text text-transparent">
                  primaire
                </span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
                  <path
                    d="M1 5.5C47 2 153 2 199 5.5"
                    stroke="url(#underline-grad)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient
                      id="underline-grad"
                      x1="0"
                      y1="0"
                      x2="200"
                      y2="0"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="hsl(217, 91%, 60%)" />
                      <stop offset="1" stopColor="hsl(160, 84%, 39%)" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              <br className="hidden sm:block" /> en toute simplicité
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              className="mx-auto max-w-xl text-base leading-relaxed text-white/80 sm:text-lg lg:mx-0 lg:text-xl"
            >
              Notes, bulletins, paiements — tout en{' '}
              <span className="font-bold text-white">1 clic</span>.
              <span className="mt-1 block text-sm text-white/60 sm:text-base">
                La solution complète pour les écoles primaires camerounaises.
              </span>
            </motion.p>

            {/* Features Grid */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1, delayChildren: 0.45 } },
              }}
              className="mx-auto grid max-w-lg grid-cols-2 gap-2.5 sm:gap-3 lg:mx-0"
            >
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
                    },
                  }}
                  className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.07] px-3 py-2.5 text-xs font-medium text-white/90 backdrop-blur-sm transition-colors hover:bg-white/[0.12] sm:text-sm"
                >
                  <feature.icon className="h-4 w-4 shrink-0 text-secondary" />
                  <span className="leading-tight">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-col justify-center gap-3 pt-2 sm:flex-row sm:gap-4 lg:justify-start"
            >
              <Button
                variant="hero"
                size="xl"
                asChild
                className="h-12 rounded-xl px-6 text-sm shadow-xl shadow-primary/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/40 sm:h-14 sm:px-8 sm:text-base"
              >
                <Link href="/register" className="flex items-center justify-center gap-2">
                  <span className="hidden sm:inline">Inscrire Mon École Gratuitement</span>
                  <span className="sm:hidden">Inscription Gratuite</span>
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="xl"
                asChild
                className="h-12 rounded-xl border-white/20 bg-white/10 px-6 text-sm text-white shadow-lg backdrop-blur-md hover:bg-white/20 sm:h-14 sm:px-8 sm:text-base"
              >
                <Link href="/demo" className="flex items-center justify-center gap-2">
                  <Play className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>Voir la Démo</span>
                </Link>
              </Button>
            </motion.div>

            {/* Stats Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex flex-wrap justify-center gap-6 border-t border-white/10 pt-6 sm:gap-8 lg:justify-start"
            >
              {stats.map((stat, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 sm:h-10 sm:w-10">
                    <stat.icon className="h-4 w-4 text-secondary sm:h-5 sm:w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold leading-none text-white sm:text-base">
                      {stat.value}
                    </p>
                    <p className="mt-0.5 text-[11px] text-white/50 sm:text-xs">{stat.label}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Side - Dashboard Preview Card */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="relative">
              {/* Main Card */}
              <motion.div
                initial={{ opacity: 0, x: 60, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.4,
                  type: 'spring',
                  stiffness: 100,
                  damping: 20,
                }}
                className="overflow-hidden rounded-2xl border border-white/15 bg-white/[0.08] shadow-2xl backdrop-blur-xl"
              >
                {/* Card Header */}
                <div className="bg-gradient-to-r from-primary to-secondary p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20">
                      <GraduationCap className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">École Primaire La Victoire</p>
                      <p className="text-xs text-white/70">Douala, Littoral</p>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="space-y-5 p-5">
                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      {
                        label: 'Élèves',
                        value: '342',
                        color: 'from-primary/20 to-primary/5',
                        textColor: 'text-primary',
                      },
                      {
                        label: 'Classes',
                        value: '12',
                        color: 'from-secondary/20 to-secondary/5',
                        textColor: 'text-secondary',
                      },
                      {
                        label: 'Enseignants',
                        value: '18',
                        color: 'from-accent/20 to-accent/5',
                        textColor: 'text-accent',
                      },
                    ].map((stat, i) => (
                      <div
                        key={i}
                        className={`rounded-xl bg-gradient-to-b p-3.5 text-center ${stat.color} border border-white/10`}
                      >
                        <p className={`text-xl font-bold ${stat.textColor}`}>{stat.value}</p>
                        <p className="mt-0.5 text-[11px] text-white/50">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Activity Feed */}
                  <div className="space-y-2.5">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-white/40">
                      Activité récente
                    </p>
                    {[
                      {
                        icon: FileText,
                        text: '12 bulletins générés',
                        time: 'Il y a 5 min',
                        color: 'bg-primary/15',
                        iconColor: 'text-primary',
                      },
                      {
                        icon: CreditCard,
                        text: 'Paiement — 25,000 FCFA',
                        time: 'Il y a 15 min',
                        color: 'bg-secondary/15',
                        iconColor: 'text-secondary',
                      },
                      {
                        icon: Bell,
                        text: 'SMS envoyés aux parents CM2',
                        time: 'Il y a 1h',
                        color: 'bg-accent/15',
                        iconColor: 'text-accent',
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.04] p-3 transition-colors hover:bg-white/[0.08]"
                      >
                        <div
                          className={`h-9 w-9 rounded-lg ${item.color} flex shrink-0 items-center justify-center`}
                        >
                          <item.icon className={`h-4 w-4 ${item.iconColor}`} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-medium text-white/90">{item.text}</p>
                          <p className="text-[11px] text-white/40">{item.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Floating Card - Left */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute -left-12 top-24"
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="rounded-xl border border-white/15 bg-white/[0.1] p-3.5 shadow-xl backdrop-blur-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/20">
                      <CheckCircle2 className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">98%</p>
                      <p className="text-[11px] text-white/50">Taux de paiement</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Floating Card - Right */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="absolute -right-6 bottom-28"
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, delay: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="rounded-xl border border-white/15 bg-white/[0.1] p-3.5 shadow-xl backdrop-blur-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20">
                      <FileText className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">1,250</p>
                      <p className="text-[11px] text-white/50">Bulletins/mois</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Glow Effects */}
              <div className="absolute -right-8 -top-8 -z-10 h-64 w-64 rounded-full bg-primary/15 blur-[80px]" />
              <div className="absolute -bottom-8 -left-8 -z-10 h-64 w-64 rounded-full bg-secondary/15 blur-[80px]" />
            </div>
          </div>
        </div>
      </div>

      {/* Image Indicators */}
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2 sm:bottom-8">
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              index === currentImageIndex ? 'w-8 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Image ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
