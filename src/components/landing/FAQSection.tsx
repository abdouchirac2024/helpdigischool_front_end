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
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

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

const headerVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
}

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 200, damping: 20 },
  },
}

const faqItemVariants = {
  hidden: {
    opacity: 0,
    x: -30,
    filter: 'blur(6px)',
  },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      delay: i * 0.08,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

const ctaCardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 80,
      damping: 16,
      delay: 0.4,
    },
  },
}

export function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative overflow-hidden bg-muted/30 py-20 sm:py-24 lg:py-32"
    >
      {/* Background Decoration */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : undefined}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="absolute -left-40 top-1/4 h-80 w-80 rounded-full bg-primary/5 blur-[100px]"
        />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : undefined}
          transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
          className="absolute -right-40 bottom-1/4 h-80 w-80 rounded-full bg-secondary/5 blur-[100px]"
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="mx-auto mb-14 max-w-2xl text-center sm:mb-16 lg:mb-20"
        >
          <motion.div
            variants={badgeVariants}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm"
          >
            <HelpCircle className="h-3.5 w-3.5" />
            Questions fréquentes
          </motion.div>
          <motion.h2
            variants={headerVariants}
            className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Vous avez des{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              questions?
            </span>
          </motion.h2>
          <motion.p
            variants={headerVariants}
            className="mx-auto max-w-xl text-base text-muted-foreground sm:text-lg"
          >
            Trouvez les réponses aux questions les plus courantes sur Help Digi School.
          </motion.p>
        </motion.div>

        {/* FAQ Grid */}
        <div className="mx-auto max-w-4xl">
          <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={faqItemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
              >
                <AccordionItem
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
              </motion.div>
            ))}
          </Accordion>
        </div>

        {/* Contact CTA Card */}
        <motion.div
          variants={ctaCardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mx-auto mt-14 max-w-2xl sm:mt-16 lg:mt-20"
        >
          <motion.div
            whileHover={{
              y: -4,
              scale: 1.01,
              transition: { type: 'spring' as const, stiffness: 300, damping: 20 },
            }}
            className="rounded-2xl border border-border/50 bg-card p-6 text-center shadow-sm transition-shadow duration-300 hover:shadow-xl sm:p-8 lg:p-10"
          >
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring' as const, stiffness: 200, damping: 15, delay: 0.5 }}
              className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 sm:h-14 sm:w-14"
            >
              <MessageCircle className="h-6 w-6 text-primary sm:h-7 sm:w-7" />
            </motion.div>
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
