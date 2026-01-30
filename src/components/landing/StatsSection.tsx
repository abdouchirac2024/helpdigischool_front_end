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
    gradient: 'from-violet-500 to-purple-600',
    iconBg: 'bg-violet-100',
    iconColor: 'text-violet-600',
    ring: 'ring-violet-100',
  },
  {
    icon: Users,
    value: 50000,
    suffix: '+',
    label: 'Élèves gérés',
    description: 'chaque année scolaire',
    format: true,
    gradient: 'from-emerald-500 to-teal-600',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    ring: 'ring-emerald-100',
  },
  {
    icon: FileText,
    value: 200000,
    suffix: '+',
    label: 'Bulletins générés',
    description: 'depuis le lancement',
    format: true,
    gradient: 'from-amber-500 to-orange-600',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    ring: 'ring-amber-100',
  },
  {
    icon: ThumbsUp,
    value: 98,
    suffix: '%',
    label: 'Satisfaction',
    description: 'clients satisfaits',
    gradient: 'from-rose-500 to-pink-600',
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-600',
    ring: 'ring-rose-100',
  },
]

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
    <div ref={ref} className="group relative" style={{ animationDelay: `${index * 100}ms` }}>
      <div
        className={`relative overflow-hidden rounded-3xl bg-white p-6 shadow-sm ring-1 ${stat.ring} transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-200/60 sm:p-8`}
      >
        {/* Subtle gradient accent on top */}
        <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${stat.gradient}`} />

        {/* Icon */}
        <div
          className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${stat.iconBg} transition-transform duration-300 group-hover:scale-110 sm:h-16 sm:w-16`}
        >
          <stat.icon className={`h-7 w-7 ${stat.iconColor} sm:h-8 sm:w-8`} />
        </div>

        {/* Value */}
        <p className="mb-1 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-[2.75rem]">
          {formatNumber(count)}
          <span className={`bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
            {stat.suffix}
          </span>
        </p>

        {/* Label */}
        <p className="mb-1 text-sm font-semibold text-gray-800 sm:text-base">{stat.label}</p>

        {/* Description */}
        <p className="text-xs text-gray-500 sm:text-sm">{stat.description}</p>
      </div>
    </div>
  )
}

export function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50/80 via-white to-gray-50/80 py-20 sm:py-24 lg:py-32">
      {/* Subtle decorative shapes */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-violet-100/40 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-amber-100/40 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-100/30 blur-3xl" />
      </div>

      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-600 shadow-sm sm:text-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-violet-500 to-purple-500" />
            En chiffres
          </div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
            La confiance de{' '}
            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              centaines d&apos;écoles
            </span>
          </h2>
          <p className="text-sm text-gray-500 sm:text-base lg:text-lg">
            Des résultats concrets qui parlent d&apos;eux-mêmes.
          </p>
        </div>

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
