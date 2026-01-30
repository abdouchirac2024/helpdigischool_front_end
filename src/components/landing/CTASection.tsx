'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Shield,
  Zap,
  HeartHandshake,
  Clock,
} from 'lucide-react'
import { useCounter } from '@/hooks/use-counter'
import { useEffect, useRef, useState } from 'react'

const benefits = [
  { icon: Clock, text: 'Configuration en 5 minutes' },
  { icon: Zap, text: 'Essai gratuit 14 jours' },
  { icon: HeartHandshake, text: 'Formation incluse' },
  { icon: Shield, text: 'Support local camerounais' },
]

export function CTASection() {
  const { count, ref: counterRef } = useCounter({
    end: 500,
    duration: 2000,
  })

  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const current = sectionRef.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (current) {
      observer.observe(current)
    }

    return () => {
      if (current) {
        observer.unobserve(current)
      }
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-16 sm:py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`relative overflow-hidden rounded-2xl transition-all duration-1000 sm:rounded-3xl ${
            isVisible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-10 scale-95 opacity-0'
          }`}
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-[#3010D9] to-secondary" />

          {/* Decorative circles */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/[0.06] sm:h-80 sm:w-80 lg:h-96 lg:w-96" />
            <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-white/[0.04] sm:h-96 sm:w-96" />
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
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm sm:text-sm">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              <span>Rejoignez {Math.floor(count)}+ écoles</span>
            </div>

            {/* Subheadline */}
            <p className="mx-auto mb-8 max-w-xl text-sm leading-relaxed text-white/70 sm:mb-10 sm:text-base lg:text-lg">
              Inscrivez votre école dès maintenant et simplifiez la gestion des notes, bulletins et
              paiements. Vos équipes et parents vous remercieront.
            </p>

            {/* Benefits */}
            <div className="mx-auto mb-10 grid max-w-2xl grid-cols-2 gap-2.5 sm:mb-12 sm:gap-3 lg:grid-cols-4">
              {benefits.map((benefit, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.07] px-3 py-2.5 backdrop-blur-sm sm:gap-2.5 sm:px-4 sm:py-3"
                >
                  <benefit.icon className="h-4 w-4 shrink-0 text-amber-300 sm:h-5 sm:w-5" />
                  <span className="text-[11px] font-medium leading-tight text-white/90 sm:text-xs lg:text-sm">
                    {benefit.text}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
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
            </div>

            {/* Trust line */}
            <p className="mt-6 text-[11px] text-white/40 sm:mt-8 sm:text-xs">
              Sans engagement &middot; Sans carte de crédit &middot; Annulation à tout moment
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
