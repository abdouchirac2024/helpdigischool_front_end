'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
  FileText,
  CreditCard,
  Bell,
  Shield,
  Smartphone,
  Calculator,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react'

const featureHighlights = [
  {
    icon: Calculator,
    title: 'Gestion des Notes',
    description: 'Saisie intuitive, calculs automatiques des moyennes et exports Excel en un clic.',
    highlights: ['Calcul automatique', 'Export Excel', 'Multi-trimestres'],
    bgColor: 'bg-blue-500/10',
    iconColor: 'text-blue-500',
    hoverBorder: 'hover:border-blue-500/30',
    topLine: 'from-blue-500 to-blue-600',
  },
  {
    icon: FileText,
    title: 'Bulletins PDF Pro',
    description: 'Génération instantanée de bulletins bilingues FR/EN conformes aux normes.',
    highlights: ['Bilingue FR/EN', 'Conforme MINEDUB', 'Logo école'],
    bgColor: 'bg-violet-500/10',
    iconColor: 'text-violet-500',
    hoverBorder: 'hover:border-violet-500/30',
    topLine: 'from-violet-500 to-violet-600',
  },
  {
    icon: CreditCard,
    title: 'Paiements Mobile Money',
    description: 'MTN MoMo et Orange Money intégrés avec relances automatiques par SMS.',
    highlights: ['MTN MoMo', 'Orange Money', 'Relances SMS'],
    bgColor: 'bg-emerald-500/10',
    iconColor: 'text-emerald-500',
    hoverBorder: 'hover:border-emerald-500/30',
    topLine: 'from-emerald-500 to-emerald-600',
  },
  {
    icon: Bell,
    title: 'Communication Parents',
    description:
      'Notifications push, SMS groupés et emails automatiques pour informer les parents.',
    highlights: ['SMS groupés', 'Notifications push', 'Emails auto'],
    bgColor: 'bg-amber-500/10',
    iconColor: 'text-amber-500',
    hoverBorder: 'hover:border-amber-500/30',
    topLine: 'from-amber-500 to-amber-600',
  },
  {
    icon: Shield,
    title: 'Sécurité Maximale',
    description: "Données chiffrées, sauvegardes automatiques et contrôle d'accès par rôle.",
    highlights: ['Chiffrement', 'Sauvegardes', 'Rôles & accès'],
    bgColor: 'bg-rose-500/10',
    iconColor: 'text-rose-500',
    hoverBorder: 'hover:border-rose-500/30',
    topLine: 'from-rose-500 to-rose-600',
  },
  {
    icon: Smartphone,
    title: 'App Mobile PWA',
    description:
      'Installez sur Android ou iOS, avec mode hors-ligne pour les zones à faible connexion.',
    highlights: ['Android & iOS', 'Mode hors-ligne', 'Installation facile'],
    bgColor: 'bg-cyan-500/10',
    iconColor: 'text-cyan-500',
    hoverBorder: 'hover:border-cyan-500/30',
    topLine: 'from-cyan-500 to-cyan-600',
  },
]

export function FeaturesSection() {
  return (
    <section className="relative overflow-hidden bg-muted/30 py-20 sm:py-24 lg:py-32">
      {/* Background Decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-0 h-80 w-80 rounded-full bg-primary/5 blur-[100px]" />
        <div className="absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-secondary/5 blur-[100px]" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-14 max-w-2xl text-center sm:mb-16 lg:mb-20">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Fonctionnalités
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Tout ce dont vous avez besoin pour{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              gérer votre école
            </span>
          </h2>
          <p className="mx-auto max-w-xl text-base text-muted-foreground sm:text-lg">
            Une plateforme complète conçue spécifiquement pour les écoles primaires camerounaises.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          {featureHighlights.map((feature, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-7 lg:p-8 ${feature.hoverBorder}`}
            >
              {/* Hover gradient line at top */}
              <div
                className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${feature.topLine}`}
              />

              {/* Icon */}
              <div
                className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${feature.bgColor} transition-transform duration-300 group-hover:scale-110 sm:h-14 sm:w-14`}
              >
                <feature.icon className={`h-6 w-6 ${feature.iconColor} sm:h-7 sm:w-7`} />
              </div>

              {/* Content */}
              <h3 className="mb-2 text-lg font-bold sm:text-xl">{feature.title}</h3>
              <p className="mb-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {feature.description}
              </p>

              {/* Highlights */}
              <div className="flex flex-wrap gap-2">
                {feature.highlights.map((highlight, j) => (
                  <span
                    key={j}
                    className="inline-flex items-center gap-1 rounded-full bg-muted/80 px-2.5 py-1 text-[11px] font-medium text-muted-foreground sm:text-xs"
                  >
                    <CheckCircle2 className={`h-3 w-3 ${feature.iconColor}`} />
                    {highlight}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center sm:mt-16">
          <Button variant="outline" size="lg" asChild className="rounded-xl">
            <Link href="/features" className="flex items-center gap-2">
              Voir Toutes les Fonctionnalités
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
