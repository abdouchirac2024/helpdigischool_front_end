import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check, Sparkles, Zap, Crown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Gratuit",
    description: "Parfait pour découvrir la plateforme",
    price: "0",
    period: "/mois",
    badge: "Essai gratuit",
    features: [
      "Jusqu'à 100 élèves",
      "2 classes maximum",
      "Bulletins PDF illimités",
      "1 compte administrateur",
      "Support par email",
    ],
    limitations: [
      "Pas de notifications SMS",
      "Pas d'intégration paiement",
    ],
    cta: "Commencer gratuitement",
    variant: "outline" as const,
    popular: false,
  },
  {
    name: "Pro",
    description: "Pour les écoles en croissance",
    price: "35,000",
    period: "/mois",
    badge: "Plus populaire",
    features: [
      "Élèves illimités",
      "Classes illimitées",
      "Bulletins PDF illimités",
      "5 comptes utilisateurs",
      "Notifications push PWA",
      "Tableaux de bord avancés",
      "Export Excel/CSV",
      "Support prioritaire",
    ],
    limitations: [],
    cta: "Choisir Pro",
    variant: "hero" as const,
    popular: true,
  },
  {
    name: "Premium",
    description: "Solution complète enterprise",
    price: "75,000",
    period: "/mois",
    badge: "Tout inclus",
    features: [
      "Tout du plan Pro",
      "Utilisateurs illimités",
      "SMS illimités (MTN/Orange)",
      "Intégration Mobile Money",
      "Sous-domaine personnalisé",
      "API accès",
      "Formation sur site",
      "Account manager dédié",
    ],
    limitations: [],
    cta: "Contacter les ventes",
    variant: "secondary" as const,
    popular: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 lg:py-32 bg-muted/30 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pattern-dots opacity-30" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent-foreground text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Tarifs transparents
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Des prix adaptés à{" "}
            <span className="gradient-text">chaque école</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Pas de frais cachés, pas d'engagement. Commencez gratuitement pendant 14 jours.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={cn(
                "relative bg-card rounded-2xl border overflow-hidden transition-all duration-300 hover:shadow-xl",
                plan.popular 
                  ? "border-primary shadow-lg scale-105 lg:scale-110" 
                  : "border-border/50 hover:-translate-y-1"
              )}
            >
              {/* Badge */}
              {plan.badge && (
                <div className={cn(
                  "absolute top-0 right-0 px-4 py-1 text-sm font-medium rounded-bl-xl",
                  plan.popular 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-secondary text-secondary-foreground"
                )}>
                  {plan.badge}
                </div>
              )}

              <div className="p-8">
                {/* Plan Header */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    {plan.name === "Gratuit" && <Zap className="w-5 h-5 text-primary" />}
                    {plan.name === "Pro" && <Sparkles className="w-5 h-5 text-primary" />}
                    {plan.name === "Premium" && <Crown className="w-5 h-5 text-secondary" />}
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">FCFA{plan.period}</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                  {plan.limitations.map((limitation, j) => (
                    <li key={j} className="flex items-start gap-3 text-muted-foreground">
                      <span className="w-5 h-5 flex items-center justify-center shrink-0">—</span>
                      <span className="text-sm">{limitation}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button 
                  variant={plan.variant} 
                  className="w-full" 
                  size="lg"
                  asChild
                >
                  <Link href="/register">
                    {plan.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Note */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            ✓ Essai gratuit 14 jours · ✓ Annulation à tout moment · ✓ Paiement sécurisé
          </p>
        </div>
      </div>
    </section>
  );
}
