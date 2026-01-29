'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { HelpCircle, MessageCircle, ArrowRight } from 'lucide-react'

const faqs = [
  {
    question: "Comment fonctionne l'essai gratuit de 14 jours?",
    answer:
      "Inscrivez votre école et accédez immédiatement à toutes les fonctionnalités du plan Pro pendant 14 jours. Aucune carte de crédit requise. À la fin de l'essai, choisissez le plan qui vous convient ou continuez gratuitement avec des fonctionnalités limitées.",
    category: 'Démarrage',
  },
  {
    question: 'Help Digi School fonctionne-t-il sur mobile?',
    answer:
      'Oui! Notre plateforme est une PWA (Progressive Web App) installable sur Android et iOS. Elle fonctionne même hors connexion pour la saisie des notes. Vos données se synchronisent automatiquement dès que vous retrouvez Internet.',
    category: 'Technique',
  },
  {
    question: 'Comment mes données sont-elles sécurisées?',
    answer:
      'Vos données sont hébergées sur des serveurs sécurisés avec chiffrement SSL. Chaque école dispose de son espace isolé. Nous effectuons des sauvegardes quotidiennes et sommes conformes aux réglementations sur la protection des données.',
    category: 'Sécurité',
  },
  {
    question: 'Puis-je importer les données de mon ancienne solution?',
    answer:
      "Absolument. Notre équipe vous accompagne gratuitement pour importer vos listes d'élèves, enseignants et historiques depuis Excel, CSV ou toute autre source. La migration prend généralement moins de 24h.",
    category: 'Migration',
  },
  {
    question: 'Comment fonctionnent les paiements Mobile Money?',
    answer:
      'Nous intégrons MTN MoMo, Orange Money et Wave. Vos parents reçoivent un lien de paiement par SMS. Les paiements sont automatiquement enregistrés et vous recevez une notification. Les fonds sont virés sur votre compte sous 48h.',
    category: 'Paiements',
  },
  {
    question: 'Proposez-vous une formation?',
    answer:
      'Oui, une formation initiale est incluse dans tous les plans. Pour le plan Premium, nous nous déplaçons dans votre école. Nous proposons également des webinaires mensuels et une documentation complète avec tutoriels vidéo.',
    category: 'Support',
  },
  {
    question: 'Puis-je annuler mon abonnement à tout moment?',
    answer:
      'Oui, vous pouvez annuler votre abonnement à tout moment depuis votre espace. Vos données restent accessibles en lecture seule pendant 90 jours, et vous pouvez les exporter à tout moment.',
    category: 'Facturation',
  },
  {
    question: 'Help Digi School est-il adapté aux écoles bilingues?',
    answer:
      "Parfaitement! L'interface est disponible en français et anglais. Les bulletins peuvent être générés dans les deux langues, et vous pouvez personnaliser les matières selon votre programme (francophone ou anglophone).",
    category: 'Fonctionnalités',
  },
]

export function FAQSection() {
  return (
    <section id="faq" className="relative overflow-hidden bg-muted/30 py-20 sm:py-24 lg:py-32">
      {/* Background Decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-1/4 h-80 w-80 rounded-full bg-primary/5 blur-[100px]" />
        <div className="absolute -right-40 bottom-1/4 h-80 w-80 rounded-full bg-secondary/5 blur-[100px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-14 max-w-2xl text-center sm:mb-16 lg:mb-20">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">
            <HelpCircle className="h-3.5 w-3.5" />
            Questions fréquentes
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Vous avez des{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              questions?
            </span>
          </h2>
          <p className="mx-auto max-w-xl text-base text-muted-foreground sm:text-lg">
            Trouvez les réponses aux questions les plus courantes sur Help Digi School.
          </p>
        </div>

        {/* FAQ Grid: 2 columns on lg */}
        <div className="mx-auto max-w-4xl">
          <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="group overflow-hidden rounded-2xl border border-border/50 bg-card px-5 transition-all duration-300 data-[state=open]:border-primary/20 data-[state=open]:shadow-lg sm:px-6 lg:px-8"
              >
                <AccordionTrigger className="py-5 text-left text-sm font-semibold hover:text-primary hover:no-underline sm:py-6 sm:text-base lg:text-lg [&[data-state=open]>svg]:text-primary">
                  <div className="flex items-center gap-3 pr-4 sm:gap-4">
                    <span className="hidden shrink-0 rounded-full bg-primary/5 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary/70 sm:inline-block sm:text-[11px]">
                      {faq.category}
                    </span>
                    <span>{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground sm:pb-6 sm:text-base sm:leading-relaxed lg:pl-[calc(theme(spacing.4)+70px)]">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact CTA Card */}
        <div className="mx-auto mt-14 max-w-2xl sm:mt-16 lg:mt-20">
          <div className="rounded-2xl border border-border/50 bg-card p-6 text-center sm:p-8 lg:p-10">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 sm:h-14 sm:w-14">
              <MessageCircle className="h-6 w-6 text-primary sm:h-7 sm:w-7" />
            </div>
            <h3 className="mb-2 text-lg font-bold sm:text-xl">
              Vous ne trouvez pas votre réponse?
            </h3>
            <p className="mb-6 text-sm text-muted-foreground sm:text-base">
              Notre équipe est disponible pour répondre à toutes vos questions.
            </p>
            <Button asChild className="rounded-xl">
              <Link href="/contact" className="flex items-center gap-2">
                Contactez-nous
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
