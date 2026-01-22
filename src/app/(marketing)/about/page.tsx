import { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { CameroonMap } from '@/components/ui/cameroon-map'
import { HeroIllustration } from '@/components/ui/hero-illustration'
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
  Quote,
  Sparkles
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
    color: 'from-[#2302B3] to-[#4318FF]',
  },
  {
    icon: Heart,
    title: 'Passion pour l\'éducation',
    description: 'L\'éducation est notre moteur. Nous croyons en son pouvoir de transformer des vies et des communautés.',
    color: 'from-[#ce1126] to-[#ff4757]',
  },
  {
    icon: Lightbulb,
    title: 'Innovation locale',
    description: 'Des solutions conçues au Cameroun, pour le Cameroun. Nous comprenons les réalités du terrain.',
    color: 'from-[#007a5e] to-[#00b386]',
  },
  {
    icon: Shield,
    title: 'Confiance & Sécurité',
    description: 'Vos données sont sacrées. Nous appliquons les plus hauts standards de sécurité et de confidentialité.',
    color: 'from-[#fcd116] to-[#ffdb4d]',
  },
]

const milestones = [
  {
    year: '2022',
    title: 'Naissance de Help Digi School',
    description: 'Fondée à Douala par une équipe passionnée d\'éducation et de technologie.',
    icon: Sparkles,
  },
  {
    year: '2023',
    title: 'Premières 100 écoles',
    description: 'Cap symbolique franchi avec des écoles dans 5 régions du Cameroun.',
    icon: GraduationCap,
  },
  {
    year: '2024',
    title: 'Lancement Mobile Money',
    description: 'Intégration des paiements MTN MoMo et Orange Money pour simplifier les transactions.',
    icon: Shield,
  },
  {
    year: '2025',
    title: '500+ écoles partenaires',
    description: 'Couverture nationale complète des 10 régions du Cameroun.',
    icon: MapPin,
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* ============================================
            SECTION 1: HERO - Qui sommes-nous ?
            Première impression, accroche principale
        ============================================ */}
        <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#2302B3]/5 via-transparent to-[#4318FF]/5" />
          <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-[#2302B3]/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#4318FF]/10 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#007a5e]/5 rounded-full blur-[150px]" />

          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #2302B3 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}
          />

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
              {/* Text Content */}
              <div className="text-center lg:text-left order-2 lg:order-1">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#2302B3]/10 to-[#4318FF]/10 border border-[#2302B3]/20 text-[#2302B3] text-sm font-medium mb-6">
                  <Globe className="w-4 h-4" />
                  Made in Cameroon
                  <span className="flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-[#007a5e] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#007a5e]"></span>
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight leading-[1.1]">
                  Révolutionner{' '}
                  <span className="relative">
                    <span className="bg-gradient-to-r from-[#2302B3] to-[#4318FF] bg-clip-text text-transparent">
                      l'éducation
                    </span>
                    <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none">
                      <path d="M1 5.5C47 2 153 2 199 5.5" stroke="url(#underline-gradient)" strokeWidth="3" strokeLinecap="round"/>
                      <defs>
                        <linearGradient id="underline-gradient" x1="0" y1="0" x2="200" y2="0">
                          <stop stopColor="#2302B3"/>
                          <stop offset="1" stopColor="#4318FF"/>
                        </linearGradient>
                      </defs>
                    </svg>
                  </span>
                  {' '}au Cameroun
                </h1>

                <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Help Digi School est née d'une conviction simple : chaque école camerounaise mérite
                  des outils modernes pour offrir la <strong className="text-foreground">meilleure éducation possible</strong> à ses élèves.
                </p>

                {/* Feature highlights */}
                <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8">
                  {['Gestion simplifiée', 'Paiements Mobile Money', '100% Camerounais'].map((feature, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#007a5e]" />
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button size="lg" className="bg-gradient-to-r from-[#2302B3] to-[#4318FF] hover:from-[#1c0291] hover:to-[#3612cc] shadow-lg shadow-[#2302B3]/25 text-base px-8" asChild>
                    <Link href="/register">
                      Rejoindre le mouvement
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-2 text-base px-8" asChild>
                    <Link href="/contact">
                      Nous contacter
                    </Link>
                  </Button>
                </div>

                {/* Trust indicators */}
                <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-800">
                  <p className="text-sm text-muted-foreground mb-4">Ils nous font confiance</p>
                  <div className="flex items-center gap-6 justify-center lg:justify-start">
                    <div className="flex -space-x-3">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2302B3] to-[#4318FF] border-2 border-white dark:border-gray-900 flex items-center justify-center text-white text-xs font-bold"
                        >
                          {['CM', 'DL', 'YD', 'BF'][i]}
                        </div>
                      ))}
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-foreground">500+ écoles</div>
                      <div className="text-sm text-muted-foreground">dans tout le Cameroun</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Illustration */}
              <div className="order-1 lg:order-2">
                <HeroIllustration />
              </div>
            </div>
          </div>
        </section>

        {/* ============================================
            SECTION 2: MISSION - Pourquoi nous existons
            Notre raison d'être, notre vision
        ============================================ */}
        <section className="py-20 lg:py-28 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Quote Card - Visual element */}
              <div className="relative order-2 lg:order-1">
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

              {/* Mission Content */}
              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2302B3]/10 text-[#2302B3] text-sm font-medium mb-6">
                  <Target className="w-4 h-4" />
                  Notre Mission
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                  Digitaliser l'éducation primaire{' '}
                  <span className="bg-gradient-to-r from-[#2302B3] to-[#4318FF] bg-clip-text text-transparent">
                    camerounaise
                  </span>
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
                      <div className="w-6 h-6 rounded-full bg-[#007a5e]/10 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-[#007a5e]" />
                      </div>
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================
            SECTION 3: VALEURS - Ce qui nous guide
            Notre ADN, nos principes fondamentaux
        ============================================ */}
        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ce1126]/10 text-[#ce1126] text-sm font-medium mb-6">
                <Heart className="w-4 h-4" />
                Nos Valeurs
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Ce qui nous{' '}
                <span className="bg-gradient-to-r from-[#ce1126] to-[#ff4757] bg-clip-text text-transparent">
                  guide
                </span>
                {' '}au quotidien
              </h2>
              <p className="text-lg text-muted-foreground">
                Ces valeurs sont le fondement de chaque décision que nous prenons et de chaque
                fonctionnalité que nous développons.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, i) => (
                <div
                  key={i}
                  className="group relative bg-card rounded-2xl p-8 border border-border/50 hover:border-transparent hover:shadow-2xl transition-all duration-500 overflow-hidden"
                >
                  {/* Hover gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <value.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================
            SECTION 4: TIMELINE - Notre Parcours
            Notre histoire, notre croissance
        ============================================ */}
        <section className="py-20 lg:py-28 bg-[#1A1A1A] text-white overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium mb-6">
                <TrendingUp className="w-4 h-4" />
                Notre Parcours
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Une croissance{' '}
                <span className="bg-gradient-to-r from-[#4318FF] to-[#00b386] bg-clip-text text-transparent">
                  constante
                </span>
              </h2>
              <p className="text-lg text-white/70">
                Depuis notre création, nous n'avons cessé de grandir et d'améliorer notre plateforme.
              </p>
            </div>

            {/* Horizontal Timeline for desktop */}
            <div className="hidden lg:block max-w-5xl mx-auto">
              {/* Timeline line */}
              <div className="relative">
                <div className="absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-[#2302B3] via-[#4318FF] to-[#00b386] rounded-full" />

                <div className="grid grid-cols-4 gap-4">
                  {milestones.map((milestone, i) => (
                    <div key={i} className="relative pt-16">
                      {/* Timeline dot */}
                      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-[#2302B3] to-[#4318FF] flex items-center justify-center shadow-lg shadow-[#2302B3]/50 z-10">
                        <milestone.icon className="w-4 h-4 text-white" />
                      </div>

                      {/* Content card */}
                      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-colors">
                        <div className="text-3xl font-black text-[#4318FF] mb-2">{milestone.year}</div>
                        <h3 className="text-lg font-bold mb-2">{milestone.title}</h3>
                        <p className="text-white/60 text-sm">{milestone.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Vertical Timeline for mobile */}
            <div className="lg:hidden max-w-md mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#2302B3] to-[#00b386]" />

                <div className="space-y-8">
                  {milestones.map((milestone, i) => (
                    <div key={i} className="relative flex gap-6 items-start">
                      {/* Timeline dot */}
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2302B3] to-[#4318FF] flex items-center justify-center shrink-0 shadow-lg z-10">
                        <milestone.icon className="w-5 h-5 text-white" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 bg-white/5 rounded-2xl p-5 border border-white/10">
                        <div className="text-xl font-black text-[#4318FF] mb-1">{milestone.year}</div>
                        <h3 className="font-bold mb-1">{milestone.title}</h3>
                        <p className="text-white/60 text-sm">{milestone.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================
            SECTION 5: IMPACT - Notre présence (Stats + Map)
            Preuves concrètes de notre impact
        ============================================ */}
        <section className="py-20 lg:py-28 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 overflow-hidden">
          <div className="container mx-auto px-4">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#007a5e]/10 text-[#007a5e] text-sm font-medium mb-6">
                <MapPin className="w-4 h-4" />
                Notre Impact
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Présents dans les{' '}
                <span className="bg-gradient-to-r from-[#007a5e] to-[#00b386] bg-clip-text text-transparent">
                  10 régions
                </span>
                {' '}du Cameroun
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                De l'Extrême-Nord au Sud, nous accompagnons les écoles de tout le pays dans leur transformation digitale.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 mb-16 max-w-4xl mx-auto">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 text-center shadow-sm hover:shadow-xl transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2302B3]/10 to-[#4318FF]/10 flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-6 h-6 text-[#2302B3]" />
                  </div>
                  <div className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-[#2302B3] to-[#4318FF] bg-clip-text text-transparent mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Interactive Map */}
            <div className="max-w-7xl mx-auto">
              <CameroonMap />
            </div>
          </div>
        </section>

        {/* ============================================
            SECTION 6: CTA - Appel à l'action final
            Conversion, prochaine étape
        ============================================ */}
        <section className="py-20 lg:py-28 bg-gradient-to-br from-[#2302B3] to-[#4318FF] text-white relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Prêt à rejoindre le mouvement ?
              </h2>
              <p className="text-xl text-white/80 mb-10 leading-relaxed">
                Rejoignez les 500+ écoles qui font confiance à Help Digi School pour simplifier
                leur gestion quotidienne et offrir une meilleure expérience à leurs élèves et parents.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-[#2302B3] hover:bg-white/90 shadow-xl text-base px-8" asChild>
                  <Link href="/register">
                    Commencer gratuitement
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 text-base px-8" asChild>
                  <Link href="/contact">
                    Parler à un expert
                  </Link>
                </Button>
              </div>
              <p className="mt-6 text-white/60 text-sm">
                Première année gratuite • Aucune carte de crédit requise • Support 24/7
              </p>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}