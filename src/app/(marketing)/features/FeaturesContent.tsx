'use client'

import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function FeaturesContent() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24">
        <section className="py-16 lg:py-24 relative overflow-hidden">
          <div className="absolute inset-0 pattern-dots opacity-30" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Toutes les fonctionnalités pour{' '}
                <span className="gradient-text">votre école</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Une plateforme complète conçue spécifiquement pour les écoles primaires camerounaises.
                Simplifiez votre quotidien avec nos outils puissants et intuitifs.
              </p>
              <Button variant="hero" size="xl" asChild>
                <Link href="/register">
                  Essayer Gratuitement
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Prêt à commencer?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Rejoignez les 500+ écoles qui font confiance à Help Digi School.
              Essai gratuit de 14 jours, sans engagement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" asChild>
                <Link href="/register">
                  Inscrire Mon École
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link href="/pricing">
                  Voir les Tarifs
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
