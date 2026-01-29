'use client'

import { Building2, Users, FileText, ThumbsUp } from 'lucide-react'
import { useCounter } from '@/hooks/use-counter'

const stats = [
  {
    icon: Building2,
    value: 500,
    suffix: '+',
    label: 'Écoles partenaires',
    description: 'dans les 10 régions du Cameroun',
    color: 'from-blue-400 to-blue-500',
    bgColor: 'bg-blue-400/15',
  },
  {
    icon: Users,
    value: 50000,
    suffix: '+',
    label: 'Élèves gérés',
    description: 'chaque année scolaire',
    format: true,
    color: 'from-emerald-400 to-emerald-500',
    bgColor: 'bg-emerald-400/15',
  },
  {
    icon: FileText,
    value: 200000,
    suffix: '+',
    label: 'Bulletins générés',
    description: 'depuis le lancement',
    format: true,
    color: 'from-amber-400 to-amber-500',
    bgColor: 'bg-amber-400/15',
  },
  {
    icon: ThumbsUp,
    value: 98,
    suffix: '%',
    label: 'Satisfaction',
    description: 'clients satisfaits',
    color: 'from-rose-400 to-rose-500',
    bgColor: 'bg-rose-400/15',
  },
]

function StatCard({ stat }: { stat: (typeof stats)[0] }) {
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
    <div ref={ref} className="group relative text-center">
      {/* Card */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-8 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08] sm:px-6 sm:py-10 lg:px-5 lg:py-12">
        {/* Icon */}
        <div
          className={`mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${stat.bgColor} transition-transform duration-300 group-hover:scale-110 sm:mb-6 sm:h-16 sm:w-16`}
        >
          <stat.icon className="h-7 w-7 text-white sm:h-8 sm:w-8" />
        </div>

        {/* Value */}
        <p className="mb-1 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
          {formatNumber(count)}
          <span className={`bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
            {stat.suffix}
          </span>
        </p>

        {/* Label */}
        <p className="mb-1 text-sm font-semibold text-white sm:text-base">{stat.label}</p>

        {/* Description */}
        <p className="text-xs text-white/50 sm:text-sm">{stat.description}</p>
      </div>
    </div>
  )
}

export function StatsSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24 lg:py-32">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: 'url("/hel.jpeg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#2302B3]/95 via-[#3010D9]/95 to-[#4318FF]/95" />

      {/* Decorative Circles */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/[0.04] sm:h-96 sm:w-96" />
        <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-white/[0.04] sm:h-[28rem] sm:w-[28rem]" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.02]" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/90 backdrop-blur-sm sm:text-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            En chiffres
          </div>
          <h2 className="mb-3 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            La confiance de{' '}
            <span className="bg-gradient-to-r from-blue-300 to-emerald-300 bg-clip-text text-transparent">
              centaines d&apos;écoles
            </span>
          </h2>
          <p className="text-sm text-white/60 sm:text-base">
            Des résultats concrets qui parlent d&apos;eux-mêmes.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-8">
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  )
}
