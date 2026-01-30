import { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/landing/HeroSection'
import { FeaturesSection } from '@/components/landing/FeaturesSection'
import { StatsSection } from '@/components/landing/StatsSection'
import { TestimonialsSection } from '@/components/landing/TestimonialsSection'
import { FAQSection } from '@/components/landing/FAQSection'
import { PWARedirect } from '@/components/pwa/PWARedirect'
import {
  DividerHeroToFeatures,
  DividerWaveDark,
  DividerWaveLight,
  DividerTestimonialsToFAQ,
} from '@/components/landing/SectionDivider'

export const metadata: Metadata = {
  title: 'Help Digi School - Plateforme SaaS #1 pour Écoles Primaires au Cameroun',
  description:
    'Gérez votre école primaire camerounaise en toute simplicité. Notes, bulletins PDF, paiements Mobile Money - tout en 1 clic. Essai gratuit 14 jours.',
  keywords:
    'école primaire cameroun, gestion scolaire, bulletins, notes, paiement école, mobile money école',
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <PWARedirect />
      <Navbar />
      <main className="pb-20 lg:pb-0">
        <HeroSection />
        <DividerHeroToFeatures />
        <FeaturesSection />
        <DividerWaveDark />
        <StatsSection />
        <DividerWaveLight />
        <TestimonialsSection />
        <DividerTestimonialsToFAQ />
        <FAQSection />
      </main>
      <Footer />
    </div>
  )
}
