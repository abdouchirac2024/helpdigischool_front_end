import { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { PricingSection } from '@/components/landing/PricingSection'

export const metadata: Metadata = {
  title: 'Tarifs - Help Digi School | Plans et Prix',
  description:
    'Découvrez nos tarifs transparents. Starter, Pro ou Premium - choisissez le plan adapté à votre école. Essai gratuit 14 jours.',
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24">
        <PricingSection />
      </main>
      <Footer />
    </div>
  )
}
