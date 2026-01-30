'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Check, Sparkles, Zap, Crown, ArrowRight, Gift } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLanguage, t } from '@/lib/i18n'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const headerVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
}

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 200, damping: 20 },
  },
}

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 80,
    scale: 0.88,
    rotateX: 10,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 70,
      damping: 16,
      delay: i * 0.15,
    },
  }),
}

export function PricingSection() {
  const { language } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const plans = [
    {
      name: t('pricing.plan1.name', language),
      description: t('pricing.plan1.description', language),
      price: '0',
      period: ' FCFA',
      priceSubtext: t('pricing.plan1.priceSubtext', language),
      badge: t('pricing.plan1.badge', language),
      features: [
        t('pricing.plan1.features.students', language),
        t('pricing.plan1.features.classes', language),
        t('pricing.plan1.features.users', language),
        t('pricing.plan1.features.subjects', language),
        t('pricing.plan1.features.excel', language),
        t('pricing.plan1.features.dashboard', language),
        t('pricing.plan1.features.payments', language),
        t('pricing.plan1.features.grades', language),
        t('pricing.plan1.features.support', language),
      ],
      limitations: [
        t('pricing.plan1.limitations.sms', language),
        t('pricing.plan1.limitations.integration', language),
      ],
      cta: t('pricing.plan1.cta', language),
      variant: 'outline' as const,
      popular: false,
    },
    {
      name: t('pricing.plan2.name', language),
      description: t('pricing.plan2.description', language),
      price: '35,000',
      period: ' FCFA/' + (language === 'fr' ? 'mois' : 'month'),
      badge: t('pricing.plan2.badge', language),
      features: [
        t('pricing.plan2.features.students', language),
        t('pricing.plan2.features.classes', language),
        t('pricing.plan2.features.bulletins', language),
        t('pricing.plan2.features.users', language),
        t('pricing.plan2.features.notifications', language),
        t('pricing.plan2.features.dashboards', language),
        t('pricing.plan2.features.export', language),
        t('pricing.plan2.features.support', language),
      ],
      limitations: [],
      cta: t('pricing.plan2.cta', language),
      variant: 'hero' as const,
      popular: true,
    },
    {
      name: t('pricing.plan3.name', language),
      description: t('pricing.plan3.description', language),
      price: '75,000',
      period: ' FCFA/' + (language === 'fr' ? 'mois' : 'month'),
      badge: t('pricing.plan3.badge', language),
      features: [
        t('pricing.plan3.features.allPro', language),
        t('pricing.plan3.features.users', language),
        t('pricing.plan3.features.sms', language),
        t('pricing.plan3.features.mobileMoney', language),
        t('pricing.plan3.features.subdomain', language),
        t('pricing.plan3.features.api', language),
        t('pricing.plan3.features.training', language),
        t('pricing.plan3.features.manager', language),
      ],
      limitations: [],
      cta: t('pricing.plan3.cta', language),
      variant: 'secondary' as const,
      popular: false,
    },
  ]
  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="relative overflow-hidden bg-muted/30 py-20 lg:py-32"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : undefined}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="absolute -left-40 top-0 h-80 w-80 rounded-full bg-primary/5 blur-[100px]"
        />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : undefined}
          transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
          className="absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-secondary/5 blur-[100px]"
        />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <motion.div
            variants={badgeVariants}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-accent/20 px-4 py-2 text-sm font-medium text-accent-foreground"
          >
            <Sparkles className="h-4 w-4" />
            {t('pricing.badge', language)}
          </motion.div>
          <motion.h2
            variants={headerVariants}
            className="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl"
          >
            {t('pricing.title', language)}{' '}
            <span className="gradient-text">{t('pricing.titleHighlight', language)}</span>
          </motion.h2>
          <motion.p variants={headerVariants} className="text-lg text-muted-foreground">
            {t('pricing.subtitle', language)}{' '}
            <strong className="text-primary">{t('pricing.subtitleHighlight', language)}</strong>{' '}
            {t('pricing.subtitleEnd', language)}
          </motion.p>
        </motion.div>

        {/* Pricing Cards */}
        <div
          className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3"
          style={{ perspective: '1200px' }}
        >
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              whileHover={{
                y: -10,
                scale: plan.popular ? 1.12 : 1.03,
                transition: { type: 'spring' as const, stiffness: 300, damping: 20 },
              }}
              className={cn(
                'relative overflow-hidden rounded-2xl border bg-card transition-shadow duration-300 hover:shadow-2xl',
                plan.popular
                  ? 'scale-105 border-primary shadow-lg lg:scale-110'
                  : 'border-border/50'
              )}
            >
              {/* Badge */}
              {plan.badge && (
                <motion.div
                  initial={{ x: 30, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: i * 0.15 + 0.3,
                    type: 'spring' as const,
                    stiffness: 200,
                    damping: 20,
                  }}
                  className={cn(
                    'absolute right-0 top-0 rounded-bl-xl px-4 py-1 text-sm font-medium',
                    plan.popular
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground'
                  )}
                >
                  {plan.badge}
                </motion.div>
              )}

              <div className="p-8">
                {/* Plan Header */}
                <div className="mb-6">
                  <div className="mb-2 flex items-center gap-2">
                    {plan.name === '1 An Offert' && <Gift className="h-5 w-5 text-primary" />}
                    {plan.name === 'Pro' && <Sparkles className="h-5 w-5 text-primary" />}
                    {plan.name === 'Premium' && <Crown className="h-5 w-5 text-secondary" />}
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  {plan.priceSubtext && (
                    <p className="mt-1 text-sm font-medium text-primary">{plan.priceSubtext}</p>
                  )}
                </div>

                {/* Features */}
                <ul className="mb-8 space-y-3">
                  {plan.features.map((feature, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: i * 0.15 + j * 0.05 + 0.3,
                        duration: 0.4,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="flex items-start gap-3"
                    >
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                      <span className="text-sm">{feature}</span>
                    </motion.li>
                  ))}
                  {plan.limitations.map((limitation, j) => (
                    <motion.li
                      key={`lim-${j}`}
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: i * 0.15 + (plan.features.length + j) * 0.05 + 0.3,
                        duration: 0.4,
                      }}
                      className="flex items-start gap-3 text-muted-foreground"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center">—</span>
                      <span className="text-sm">{limitation}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* CTA */}
                <Button variant={plan.variant} className="w-full" size="lg" asChild>
                  <Link href="/register">
                    {plan.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground">
            ✓ 1ère année offerte · ✓ Sans engagement · ✓ Annulation à tout moment · ✓ Paiement
            sécurisé
          </p>
        </motion.div>
      </div>
    </section>
  )
}
