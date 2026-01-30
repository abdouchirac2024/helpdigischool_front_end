'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, Sparkles, Shield, Zap, HeartHandshake, Clock } from 'lucide-react'
import { useCounter } from '@/hooks/use-counter'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const benefits = [
  { icon: Clock, text: 'Configuration en 5 minutes' },
  { icon: Zap, text: 'Essai gratuit 14 jours' },
  { icon: HeartHandshake, text: 'Formation incluse' },
  { icon: Shield, text: 'Support local camerounais' },
]

const benefitVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 120,
      damping: 14,
      delay: 0.4 + i * 0.1,
    },
  }),
}

export function CTASection() {
  const { count, ref: counterRef } = useCounter({
    end: 500,
    duration: 2000,
  })

  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-16 sm:py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.92 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : undefined}
          transition={{
            type: 'spring',
            stiffness: 60,
            damping: 18,
          }}
          className="relative overflow-hidden rounded-2xl sm:rounded-3xl"
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-[#3010D9] to-secondary" />

          {/* Decorative circles */}
          <div className="pointer-events-none absolute inset-0">
            <motion.div
              animate={isInView ? { scale: [1, 1.1, 1], opacity: [0.06, 0.1, 0.06] } : undefined}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/[0.06] sm:h-80 sm:w-80 lg:h-96 lg:w-96"
            />
            <motion.div
              animate={isInView ? { scale: [1, 1.15, 1], opacity: [0.04, 0.08, 0.04] } : undefined}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-white/[0.04] sm:h-96 sm:w-96"
            />
            <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.03] lg:h-64 lg:w-64" />
          </div>

          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Content */}
          <div
            ref={counterRef}
            className="relative z-10 px-6 py-14 text-center sm:px-10 sm:py-16 md:px-12 lg:px-16 lg:py-20"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : undefined}
              transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.2 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm sm:text-sm"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              <span>Rejoignez {Math.floor(count)}+ écoles</span>
            </motion.div>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
              animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : undefined}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto mb-8 max-w-xl text-sm leading-relaxed text-white/70 sm:mb-10 sm:text-base lg:text-lg"
            >
              Inscrivez votre école dès maintenant et simplifiez la gestion des notes, bulletins et
              paiements. Vos équipes et parents vous remercieront.
            </motion.p>

            {/* Benefits */}
            <div className="mx-auto mb-10 grid max-w-2xl grid-cols-2 gap-2.5 sm:mb-12 sm:gap-3 lg:grid-cols-4">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={benefitVariants}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: 'rgba(255,255,255,0.12)',
                    transition: { duration: 0.2 },
                  }}
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.07] px-3 py-2.5 backdrop-blur-sm sm:gap-2.5 sm:px-4 sm:py-3"
                >
                  <benefit.icon className="h-4 w-4 shrink-0 text-amber-300 sm:h-5 sm:w-5" />
                  <span className="text-[11px] font-medium leading-tight text-white/90 sm:text-xs lg:text-sm">
                    {benefit.text}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4"
            >
              <Button
                size="xl"
                className="h-12 rounded-xl bg-white px-6 text-sm font-semibold text-primary shadow-xl shadow-black/20 transition-all duration-300 hover:scale-[1.02] hover:bg-white/95 hover:shadow-2xl sm:h-14 sm:px-8 sm:text-base"
                asChild
              >
                <Link href="/register" className="flex items-center justify-center gap-2">
                  Inscrire Mon École
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="xl"
                className="h-12 rounded-xl border-white/25 bg-white/10 px-6 text-sm font-semibold text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:bg-white/20 sm:h-14 sm:px-8 sm:text-base"
                asChild
              >
                <Link href="/contact" className="flex items-center justify-center">
                  Parler à un conseiller
                </Link>
              </Button>
            </motion.div>

            {/* Trust line */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : undefined}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mt-6 text-[11px] text-white/40 sm:mt-8 sm:text-xs"
            >
              Sans engagement &middot; Sans carte de crédit &middot; Annulation à tout moment
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
