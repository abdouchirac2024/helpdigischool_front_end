import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

const benefits = [
  "Configuration en 5 minutes",
  "Essai gratuit 14 jours",
  "Formation incluse",
  "Support local camerounais",
];

export function CTASection() {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="relative bg-gradient-to-br from-primary via-primary to-secondary rounded-3xl p-8 lg:p-16 overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-primary-foreground/5 rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-foreground/5 rounded-full -translate-x-1/2 translate-y-1/2" />
          <div className="absolute inset-0 pattern-dots opacity-10" />

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 text-primary-foreground text-sm font-medium mb-6 backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              Rejoignez 500+ écoles
            </div>

            {/* Headline */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
              Prêt à digitaliser votre école?
            </h2>

            {/* Subheadline */}
            <p className="text-lg lg:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Inscrivez votre école dès maintenant et simplifiez la gestion des notes, 
              bulletins et paiements. Vos équipes et parents vous remercieront.
            </p>

            {/* Benefits */}
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              {benefits.map((benefit, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-primary-foreground/90"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="text-sm font-medium">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="hero-outline" 
                size="xl"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                asChild
              >
                <Link href="/register">
                  Inscrire Mon École
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button 
                variant="hero-outline" 
                size="xl"
                asChild
              >
                <Link href="/contact">
                  Parler à un conseiller
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
