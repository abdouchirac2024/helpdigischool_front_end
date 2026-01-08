'use client'

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { useCounter } from "@/hooks/use-counter";
import { useEffect, useRef, useState } from "react";

const benefits = [
  "Configuration en 5 minutes",
  "Essai gratuit 14 jours",
  "Formation incluse",
  "Support local camerounais",
];

export function CTASection() {
  const { count, ref: counterRef } = useCounter({
    end: 500,
    duration: 2000,
  });

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 md:py-20 lg:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div 
          className={`relative bg-gradient-to-br from-primary via-primary to-secondary rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 overflow-hidden transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
          }`}
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-48 h-48 sm:w-72 sm:h-72 bg-primary-foreground/5 rounded-full translate-x-1/2 -translate-y-1/2 animate-pulse" />
          <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-primary-foreground/5 rounded-full -translate-x-1/2 translate-y-1/2 animate-pulse" />
          <div className="absolute inset-0 pattern-dots opacity-10" />

          <div ref={counterRef} className="relative z-10 text-center max-w-3xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary-foreground/10 text-primary-foreground text-xs sm:text-sm font-medium mb-4 sm:mb-6 backdrop-blur-sm animate-fade-in-up">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 animate-pulse" />
              Rejoignez {Math.floor(count)}+ écoles
            </div>

            {/* Headline */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4 sm:mb-6 animate-fade-in-up animation-delay-100 px-2">
              Prêt à digitaliser votre école?
            </h2>

            {/* Subheadline */}
            <p className="text-base sm:text-lg lg:text-xl text-primary-foreground/80 mb-6 sm:mb-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-200 px-2">
              Inscrivez votre école dès maintenant et simplifiez la gestion des notes, 
              bulletins et paiements. Vos équipes et parents vous remercieront.
            </p>

            {/* Benefits */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-10 px-2">
              {benefits.map((benefit, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1.5 sm:gap-2 text-primary-foreground/90 animate-fade-in-up bg-primary-foreground/5 px-3 py-1.5 rounded-full backdrop-blur-sm"
                  style={{ animationDelay: `${300 + i * 100}ms` }}
                >
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-medium whitespace-nowrap">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-fade-in-up animation-delay-700 px-2">
              <Button 
                variant="hero-outline" 
                size="xl"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 hover:scale-105 transition-all duration-300 w-full sm:w-auto text-sm sm:text-base"
                asChild
              >
                <Link href="/register">
                  Inscrire Mon École
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </Link>
              </Button>
              <Button 
                variant="hero-outline" 
                size="xl"
                className="hover:scale-105 transition-all duration-300 w-full sm:w-auto text-sm sm:text-base"
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
