import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "Comment fonctionne l'essai gratuit de 14 jours?",
    answer: "Inscrivez votre école et accédez immédiatement à toutes les fonctionnalités du plan Pro pendant 14 jours. Aucune carte de crédit requise. À la fin de l'essai, choisissez le plan qui vous convient ou continuez gratuitement avec des fonctionnalités limitées."
  },
  {
    question: "Help Digi School fonctionne-t-il sur mobile?",
    answer: "Oui! Notre plateforme est une PWA (Progressive Web App) installable sur Android et iOS. Elle fonctionne même hors connexion pour la saisie des notes. Vos données se synchronisent automatiquement dès que vous retrouvez Internet."
  },
  {
    question: "Comment mes données sont-elles sécurisées?",
    answer: "Vos données sont hébergées sur des serveurs sécurisés avec chiffrement SSL. Chaque école dispose de son espace isolé. Nous effectuons des sauvegardes quotidiennes et sommes conformes aux réglementations sur la protection des données."
  },
  {
    question: "Puis-je importer les données de mon ancienne solution?",
    answer: "Absolument. Notre équipe vous accompagne gratuitement pour importer vos listes d'élèves, enseignants et historiques depuis Excel, CSV ou toute autre source. La migration prend généralement moins de 24h."
  },
  {
    question: "Comment fonctionnent les paiements Mobile Money?",
    answer: "Nous intégrons MTN MoMo, Orange Money et Wave. Vos parents reçoivent un lien de paiement par SMS. Les paiements sont automatiquement enregistrés et vous recevez une notification. Les fonds sont virés sur votre compte sous 48h."
  },
  {
    question: "Proposez-vous une formation?",
    answer: "Oui, une formation initiale est incluse dans tous les plans. Pour le plan Premium, nous nous déplaçons dans votre école. Nous proposons également des webinaires mensuels et une documentation complète avec tutoriels vidéo."
  },
  {
    question: "Puis-je annuler mon abonnement à tout moment?",
    answer: "Oui, vous pouvez annuler votre abonnement à tout moment depuis votre espace. Vos données restent accessibles en lecture seule pendant 90 jours, et vous pouvez les exporter à tout moment."
  },
  {
    question: "Help Digi School est-il adapté aux écoles bilingues?",
    answer: "Parfaitement! L'interface est disponible en français et anglais. Les bulletins peuvent être générés dans les deux langues, et vous pouvez personnaliser les matières selon votre programme (francophone ou anglophone)."
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="py-20 lg:py-32 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 pattern-grid opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <HelpCircle className="w-4 h-4" />
            Questions fréquentes
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Vous avez des{" "}
            <span className="gradient-text">questions?</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Trouvez les réponses aux questions les plus courantes sur Help Digi School.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-card rounded-xl border border-border/50 px-6 data-[state=open]:border-primary/30 data-[state=open]:shadow-lg transition-all"
              >
                <AccordionTrigger className="text-left font-semibold py-6 hover:text-primary hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Vous ne trouvez pas la réponse à votre question?
          </p>
          <a
            href="/contact"
            className="text-primary font-medium hover:underline"
          >
            Contactez notre équipe →
          </a>
        </div>
      </div>
    </section>
  );
}
