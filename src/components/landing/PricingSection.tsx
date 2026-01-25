'use client'

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check, Sparkles, Zap, Crown, ArrowRight, Gift } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage, t } from "@/lib/i18n";

export function PricingSection() {
  const { language } = useLanguage();

  const plans = [
    {
      name: t('pricing.plan1.name', language),
      description: t('pricing.plan1.description', language),
      price: "0",
      period: " FCFA",
      priceSubtext: t('pricing.plan1.priceSubtext', language),
      badge: t('pricing.plan1.badge', language),
      features: [
        t('pricing.plan1.features.students', language),
        t('pricing.plan1.features.classes', language),
        t('pricing.plan1.features.users', language),
        t('pricing.plan1.features.subjects', language),
        t('pricing.plan1.features.excel', language),
        t('pricing.plan1.features.dashboard', language),
        t('pricing.plan1.features.payments', language),
        t('pricing.plan1.features.grades', language),
        t('pricing.plan1.features.support', language),
      ],
      limitations: [
        t('pricing.plan1.limitations.sms', language),
        t('pricing.plan1.limitations.integration', language),
      ],
      cta: t('pricing.plan1.cta', language),
      variant: "outline" as const,
      popular: false,
    },
    {
      name: t('pricing.plan2.name', language),
      description: t('pricing.plan2.description', language),
      price: "35,000",
      period: " FCFA/" + (language === 'fr' ? 'mois' : 'month'),
      badge: t('pricing.plan2.badge', language),
      features: [
        t('pricing.plan2.features.students', language),
        t('pricing.plan2.features.classes', language),
        t('pricing.plan2.features.bulletins', language),
        t('pricing.plan2.features.users', language),
        t('pricing.plan2.features.notifications', language),
        t('pricing.plan2.features.dashboards', language),
        t('pricing.plan2.features.export', language),
        t('pricing.plan2.features.support', language),
      ],
      limitations: [],
      cta: t('pricing.plan2.cta', language),
      variant: "hero" as const,
      popular: true,
    },
    {
      name: t('pricing.plan3.name', language),
      description: t('pricing.plan3.description', language),
      price: "75,000",
      period: " FCFA/" + (language === 'fr' ? 'mois' : 'month'),
      badge: t('pricing.plan3.badge', language),
      features: [
        t('pricing.plan3.features.allPro', language),
        t('pricing.plan3.features.users', language),
        t('pricing.plan3.features.sms', language),
        t('pricing.plan3.features.mobileMoney', language),
        t('pricing.plan3.features.subdomain', language),
        t('pricing.plan3.features.api', language),
        t('pricing.plan3.features.training', language),
        t('pricing.plan3.features.manager', language),
      ],
      limitations: [],
      cta: t('pricing.plan3.cta', language),
      variant: "secondary" as const,
      popular: false,
    },
  ];
  return (
    <section id="pricing" className="py-20 lg:py-32 bg-muted/30 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pattern-dots opacity-30" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent-foreground text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            {t('pricing.badge', language)}
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {t('pricing.title', language)}{" "}
            <span className="gradient-text">{t('pricing.titleHighlight', language)}</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('pricing.subtitle', language)} <strong className="text-primary">{t('pricing.subtitleHighlight', language)}</strong> {t('pricing.subtitleEnd', language)}
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
                    {plan.name === "1 An Offert" && <Gift className="w-5 h-5 text-primary" />}
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
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  {plan.priceSubtext && (
                    <p className="text-sm text-primary font-medium mt-1">{plan.priceSubtext}</p>
                  )}
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
            ✓ 1ère année offerte · ✓ Sans engagement · ✓ Annulation à tout moment · ✓ Paiement sécurisé
          </p>
        </div>
      </div>
    </section>
  );
}
