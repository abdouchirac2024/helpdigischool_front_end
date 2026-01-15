import { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
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
  Quote
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'À propos - Help Digi School | Notre Mission',
  description: 'Découvrez Help Digi School, la plateforme camerounaise qui révolutionne la gestion des écoles primaires. Notre mission, notre équipe, nos valeurs.',
}

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
    description: 'Nous visons l\'excellence dans chaque fonctionnalité, chaque interaction, chaque ligne de code.',
  },
  {
    icon: Heart,
    title: 'Passion pour l\'éducation',
    description: 'L\'éducation est notre moteur. Nous croyons en son pouvoir de transformer des vies et des communautés.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation locale',
    description: 'Des solutions conçues au Cameroun, pour le Cameroun. Nous comprenons les réalités du terrain.',
  },
  {
    icon: Shield,
    title: 'Confiance & Sécurité',
    description: 'Vos données sont sacrées. Nous appliquons les plus hauts standards de sécurité et de confidentialité.',
  },
]

const milestones = [
  {
    year: '2022',
    title: 'Naissance de Help Digi School',
    description: 'Fondée à Douala par une équipe passionnée d\'éducation et de technologie.',
  },
  {
    year: '2023',
    title: 'Premières 100 écoles',
    description: 'Cap symbolique franchi avec des écoles dans 5 régions du Cameroun.',
  },
  {
    year: '2024',
    title: 'Lancement Mobile Money',
    description: 'Intégration des paiements MTN MoMo et Orange Money pour simplifier les transactions.',
  },
  {
    year: '2025',
    title: '500+ écoles partenaires',
    description: 'Couverture nationale complète des 10 régions du Cameroun.',
  },
]

const team = [
  {
    name: 'Fondateur & CEO',
    role: 'Vision & Stratégie',
    description: 'Passionné par l\'éducation et la technologie, il dirige la vision de Help Digi School.',
  },
  {
    name: 'Directrice Produit',
    role: 'Expérience Utilisateur',
    description: 'Ancienne enseignante, elle s\'assure que le produit répond aux besoins réels des écoles.',
  },
  {
    name: 'Directeur Technique',
    role: 'Innovation & Technologie',
    description: 'Expert en développement logiciel, il garantit la fiabilité et la performance de la plateforme.',
  },
]

const regions = [
  'Centre', 'Littoral', 'Ouest', 'Nord-Ouest',
  'Sud-Ouest', 'Nord', 'Adamaoua', 'Est', 'Sud', 'Extrême-Nord'
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#2302B3]/5 via-transparent to-[#4318FF]/5" />
          <div className="absolute top-20 right-0 w-96 h-96 bg-[#2302B3]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#4318FF]/10 rounded-full blur-3xl" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2302B3]/10 text-[#2302B3] text-sm font-medium mb-6">
                <Globe className="w-4 h-4" />
                Made in Cameroon
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
                Révolutionner l'éducation au{' '}
                <span className="bg-gradient-to-r from-[#2302B3] to-[#4318FF] bg-clip-text text-transparent">
                  Cameroun
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-3xl mx-auto">
                Help Digi School est née d'une conviction simple : chaque école camerounaise mérite
                des outils modernes pour offrir la meilleure éducation possible à ses élèves.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-[#2302B3] hover:bg-[#1c0291]" asChild>
                  <Link href="/register">
                    Rejoindre le mouvement
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">
                    Nous contacter
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-[#1A1A1A] text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-7 h-7 text-[#4318FF]" />
                  </div>
                  <div className="text-4xl font-black mb-2">{stat.value}</div>
                  <div className="text-white/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Regions Section - Professional Grid */}
        <section className="py-20 lg:py-28 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2302B3]/10 text-[#2302B3] text-sm font-medium mb-6">
                <MapPin className="w-4 h-4" />
                Couverture Nationale
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
                Présents dans les{' '}
                <span className="bg-gradient-to-r from-[#2302B3] to-[#4318FF] bg-clip-text text-transparent">
                  10 régions
                </span>
                {' '}du Cameroun
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                De l'Extrême-Nord au Sud, nous accompagnons les écoles de tout le pays dans leur transformation digitale.
              </p>
            </div>

            {/* Regions Grid */}
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {regions.map((region, i) => (
                  <div
                    key={i}
                    className="group relative overflow-hidden rounded-2xl bg-white border border-gray-100 p-5 hover:border-[#2302B3]/30 hover:shadow-xl hover:shadow-[#2302B3]/10 transition-all duration-300"
                  >
                    {/* Background gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#2302B3]/5 to-[#4318FF]/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Content */}
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2302B3]/10 to-[#4318FF]/10 flex items-center justify-center group-hover:from-[#2302B3] group-hover:to-[#4318FF] transition-all duration-300">
                          <MapPin className="w-5 h-5 text-[#2302B3] group-hover:text-white transition-colors" />
                        </div>
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      </div>
                      <h3 className="font-bold text-gray-900 group-hover:text-[#2302B3] transition-colors">{region}</h3>
                      <p className="text-xs text-gray-500 mt-1">Région active</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats Bar */}
              <div className="mt-12 bg-gradient-to-r from-[#2302B3] to-[#4318FF] rounded-2xl p-8 lg:p-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                  <div>
                    <div className="text-4xl lg:text-5xl font-black text-white mb-2">10</div>
                    <div className="text-white/80 text-sm font-medium">Régions couvertes</div>
                  </div>
                  <div>
                    <div className="text-4xl lg:text-5xl font-black text-white mb-2">58</div>
                    <div className="text-white/80 text-sm font-medium">Départements</div>
                  </div>
                  <div>
                    <div className="text-4xl lg:text-5xl font-black text-white mb-2">FR/EN</div>
                    <div className="text-white/80 text-sm font-medium">Bilingue</div>
                  </div>
                  <div>
                    <div className="text-4xl lg:text-5xl font-black text-white mb-2">24/7</div>
                    <div className="text-white/80 text-sm font-medium">Support disponible</div>
                  </div>
                </div>
              </div>

              {/* Headquarters Badge */}
              <div className="mt-8 flex justify-center">
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white border border-gray-200 shadow-lg">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#2302B3] to-[#4318FF] animate-pulse" />
                  <span className="font-semibold text-gray-700">Siège social : <span className="text-[#2302B3]">Douala, Littoral</span></span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 text-secondary-foreground text-sm font-medium mb-6">
                  <Target className="w-4 h-4" />
                  Notre Mission
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Digitaliser l'éducation primaire camerounaise
                </h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Notre mission est de fournir aux écoles primaires du Cameroun une plateforme
                  simple, abordable et puissante pour gérer leurs opérations quotidiennes.
                </p>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Nous croyons que la technologie doit être un levier d'égalité. C'est pourquoi
                  nous offrons <strong className="text-foreground">la première année gratuite</strong> à
                  toutes les écoles, quelle que soit leur taille ou leur localisation.
                </p>
                <ul className="space-y-4">
                  {[
                    'Réduire la charge administrative des directeurs',
                    'Améliorer la communication école-famille',
                    'Digitaliser la gestion des notes et bulletins',
                    'Simplifier le suivi des paiements scolaires',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#2302B3] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#2302B3]/20 to-[#4318FF]/20 rounded-3xl blur-2xl" />
                <div className="relative bg-gradient-to-br from-[#2302B3] to-[#4318FF] rounded-3xl p-8 lg:p-12 text-white">
                  <Quote className="w-12 h-12 text-white/30 mb-6" />
                  <blockquote className="text-xl lg:text-2xl font-medium mb-8 leading-relaxed">
                    "L'éducation est l'arme la plus puissante qu'on puisse utiliser pour changer le monde."
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center font-bold">
                      NM
                    </div>
                    <div>
                      <div className="font-bold">Nelson Mandela</div>
                      <div className="text-white/70 text-sm">Notre inspiration</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 lg:py-32 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2302B3]/10 text-[#2302B3] text-sm font-medium mb-6">
                <Heart className="w-4 h-4" />
                Nos Valeurs
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ce qui nous guide au quotidien
              </h2>
              <p className="text-lg text-muted-foreground">
                Ces valeurs sont le fondement de chaque décision que nous prenons et de chaque
                fonctionnalité que nous développons.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, i) => (
                <div
                  key={i}
                  className="bg-card rounded-2xl p-8 border border-border/50 hover:border-[#2302B3]/30 hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2302B3]/10 to-[#4318FF]/10 flex items-center justify-center mb-6">
                    <value.icon className="w-7 h-7 text-[#2302B3]" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 text-secondary-foreground text-sm font-medium mb-6">
                <TrendingUp className="w-4 h-4" />
                Notre Parcours
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Une croissance constante
              </h2>
              <p className="text-lg text-muted-foreground">
                Depuis notre création, nous n'avons cessé de grandir et d'améliorer notre plateforme.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#2302B3] to-[#4318FF] hidden md:block" />

                <div className="space-y-12">
                  {milestones.map((milestone, i) => (
                    <div key={i} className="relative flex gap-8 items-start">
                      {/* Timeline dot */}
                      <div className="hidden md:flex w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2302B3] to-[#4318FF] items-center justify-center shrink-0 shadow-lg shadow-[#2302B3]/25">
                        <span className="text-white font-bold text-sm">{milestone.year}</span>
                      </div>

                      <div className="flex-1 bg-card rounded-2xl p-6 border border-border/50 hover:border-[#2302B3]/30 transition-colors">
                        <div className="md:hidden inline-block px-3 py-1 rounded-full bg-[#2302B3]/10 text-[#2302B3] text-sm font-bold mb-3">
                          {milestone.year}
                        </div>
                        <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                        <p className="text-muted-foreground">{milestone.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 lg:py-32 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2302B3]/10 text-[#2302B3] text-sm font-medium mb-6">
                <Users className="w-4 h-4" />
                Notre Équipe
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Une équipe passionnée
              </h2>
              <p className="text-lg text-muted-foreground">
                Des experts en éducation, technologie et business unis par une même vision :
                transformer l'éducation au Cameroun.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {team.map((member, i) => (
                <div
                  key={i}
                  className="bg-card rounded-2xl p-8 border border-border/50 text-center hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#2302B3] to-[#4318FF] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#2302B3]/25">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-[#2302B3] font-medium mb-4">{member.role}</p>
                  <p className="text-muted-foreground">{member.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}