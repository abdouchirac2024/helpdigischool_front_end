'use client'

import { Star, Quote, MapPin } from 'lucide-react'

const testimonials = [
  {
    quote:
      'Help Digi School a transformé notre gestion scolaire. Les bulletins sont générés en quelques secondes et les parents reçoivent les informations instantanément.',
    author: 'Marie-Claire Ngo',
    role: 'Directrice',
    school: 'École Primaire La Victoire',
    location: 'Douala, Littoral',
    avatar: 'MC',
    gradient: 'from-blue-500 to-violet-500',
  },
  {
    quote:
      'Le suivi des paiements avec les relances SMS automatiques nous a permis de réduire les arriérés de 60%. Un outil indispensable!',
    author: 'Paul Tchamba',
    role: 'Secrétaire Comptable',
    school: 'Groupe Scolaire Le Mérite',
    location: 'Yaoundé, Centre',
    avatar: 'PT',
    gradient: 'from-emerald-500 to-cyan-500',
  },
  {
    quote:
      "En tant qu'enseignant, je gagne un temps précieux sur la saisie des notes. L'interface est intuitive et les calculs sont automatiques.",
    author: 'Isabelle Fotso',
    role: 'Institutrice CM2',
    school: 'École Bilingue Excellence',
    location: 'Bafoussam, Ouest',
    avatar: 'IF',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    quote:
      "Je peux suivre les notes et les paiements de mes 3 enfants depuis mon téléphone. C'est vraiment pratique et je suis toujours informée.",
    author: 'Amina Moussa',
    role: "Parent d'élèves",
    school: 'CETIC de Maroua',
    location: 'Maroua, Extrême-Nord',
    avatar: 'AM',
    gradient: 'from-rose-500 to-pink-500',
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative overflow-hidden py-20 sm:py-24 lg:py-32">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 top-20 h-80 w-80 rounded-full bg-primary/5 blur-[100px]" />
        <div className="absolute -left-40 bottom-20 h-80 w-80 rounded-full bg-secondary/5 blur-[100px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-14 max-w-2xl text-center sm:mb-16 lg:mb-20">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">
            <Star className="h-3.5 w-3.5 fill-current" />
            Témoignages
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Ils nous font{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              confiance
            </span>
          </h2>
          <p className="mx-auto max-w-xl text-base text-muted-foreground sm:text-lg">
            Découvrez les retours de nos utilisateurs à travers le Cameroun.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 sm:gap-6 lg:gap-8">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl sm:p-7 lg:p-8"
            >
              {/* Top gradient line */}
              <div
                className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${testimonial.gradient}`}
              />

              {/* Quote icon + stars row */}
              <div className="mb-5 flex items-center justify-between sm:mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/5 transition-colors group-hover:bg-primary/10 sm:h-12 sm:w-12">
                  <Quote className="h-5 w-5 text-primary/40 group-hover:text-primary/60 sm:h-6 sm:w-6" />
                </div>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="h-3.5 w-3.5 fill-accent text-accent sm:h-4 sm:w-4"
                    />
                  ))}
                </div>
              </div>

              {/* Quote */}
              <blockquote className="mb-6 text-sm leading-relaxed text-foreground/90 sm:mb-8 sm:text-base lg:text-lg lg:leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Divider */}
              <div className="border-t border-border/50" />

              {/* Author + Location */}
              <div className="flex items-center justify-between gap-4 pt-5 sm:pt-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  {/* Avatar */}
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${testimonial.gradient} text-sm font-bold text-white shadow-lg sm:h-12 sm:w-12`}
                  >
                    {testimonial.avatar}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold sm:text-base">{testimonial.author}</p>
                    <p className="text-xs text-muted-foreground sm:text-sm">{testimonial.role}</p>
                    <p className="truncate text-xs font-medium text-primary sm:text-sm">
                      {testimonial.school}
                    </p>
                  </div>
                </div>

                {/* Location badge */}
                <div className="hidden shrink-0 items-center gap-1.5 rounded-full bg-muted/60 px-3 py-1.5 sm:flex">
                  <MapPin className="h-3 w-3 text-muted-foreground" />
                  <span className="text-[11px] font-medium text-muted-foreground">
                    {testimonial.location}
                  </span>
                </div>
              </div>

              {/* Location mobile */}
              <div className="mt-3 flex items-center gap-1.5 sm:hidden">
                <MapPin className="h-3 w-3 text-muted-foreground" />
                <span className="text-[11px] text-muted-foreground">{testimonial.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
