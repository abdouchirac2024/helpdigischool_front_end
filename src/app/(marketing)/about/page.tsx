import { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import AboutContent from '@/components/about/AboutContent'

export const metadata: Metadata = {
  title: 'À propos - Help Digi School | Notre Mission',
  description:
    'Découvrez Help Digi School, la plateforme camerounaise qui révolutionne la gestion des écoles primaires. Notre mission, notre équipe, nos valeurs.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <AboutContent />
      <Footer />
    </div>
  )
}
