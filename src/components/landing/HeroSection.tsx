'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  Play,
  CheckCircle2,
  GraduationCap,
  FileText,
  CreditCard,
  Bell
} from "lucide-react";

const features = [
  "Saisie des notes automatisée",
  "Bulletins PDF professionnels",
  "Paiements Mobile Money",
  "Notifications SMS parents",
];

export function HeroSection() {
  const backgroundImages = [
    '/teacher.jpeg',
    '/director_signup.jpeg',
    '/teacher_grades.jpeg',
    '/parent_sms.jpeg'
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <section className="relative min-h-[100svh] flex items-center pt-20 sm:pt-24 lg:pt-20 overflow-hidden">
      {/* Background Slider - High Quality */}
      {backgroundImages.map((bg, index) => (
        <div
          key={bg}
          className="absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out"
          style={{
            backgroundImage: `url("${bg}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: index === currentImageIndex ? 1 : 0,
          }}
        />
      ))}

      {/* Smart Gradient - Only on the left side to ensure text readability without hiding the image center/right */}
      <div className="absolute inset-y-0 left-0 w-full lg:w-[60%] bg-gradient-to-r from-white/95 via-white/70 to-transparent dark:from-black/95 dark:via-black/70 dark:to-transparent z-0" />
      {/* Mobile Bottom Gradient for better stacking */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white/90 to-transparent dark:from-black/90 lg:hidden z-0" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 xl:gap-20 items-center">
          {/* Content - No longer in a box, sitting cleanly on the gradient */}
          <div className="text-center lg:text-left space-y-6 sm:space-y-8 py-10 lg:py-0 max-w-xl mx-auto lg:mx-0">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-md text-primary text-xs sm:text-sm font-medium shadow-lg border border-primary/20 animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="hidden xs:inline">Plateforme SaaS #1 au Cameroun</span>
              <span className="xs:hidden">SaaS #1 Cameroun</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-[1.15] sm:leading-tight tracking-tight">
              Gérez votre école{" "}
              <span className="gradient-text bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                primaire
              </span>{" "}
              en toute simplicité
            </h1>

            {/* Subheadline - Improved Typography & Contrast */}
            <p className="text-lg sm:text-lg lg:text-xl text-gray-700 dark:text-gray-200 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
              Notes, bulletins, paiements — tout en{" "}
              <span className="font-bold text-[#2302B3] dark:text-[#4318FF]">1 clic</span>.
              <span className="block mt-1 text-base sm:text-lg text-gray-600 dark:text-gray-300">
                La solution complète pour les écoles primaires camerounaises.
              </span>
            </p>

            {/* Features List */}
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-3 animate-slide-up delay-200">
              {features.map((feature, i) => (
                <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-foreground/90 font-medium bg-white/60 dark:bg-black/60 backdrop-blur-sm px-3 py-2 rounded-lg border border-primary/10">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-secondary shrink-0" />
                  <span className="truncate">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start animate-slide-up delay-300">
              <Button
                variant="hero"
                size="xl"
                asChild
                className="shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300 text-sm sm:text-base h-12 sm:h-14 px-6 sm:px-8"
              >
                <Link href="/register" className="flex items-center justify-center">
                  <span className="hidden sm:inline">Inscrire Mon École Gratuitement</span>
                  <span className="sm:hidden">Inscription Gratuite</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="xl"
                asChild
                className="bg-white/80 dark:bg-black/80 backdrop-blur-md hover:bg-white dark:hover:bg-black border-primary/30 shadow-lg text-sm sm:text-base h-12 sm:h-14 px-6 sm:px-8"
              >
                <Link href="/demo" className="flex items-center justify-center gap-2">
                  <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Voir la Démo</span>
                </Link>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 sm:pt-8 border-t border-foreground/10 animate-fade-in delay-400">
              <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 font-medium">
                Déjà adopté par les meilleures écoles
              </p>
              <div className="flex flex-col xs:flex-row flex-wrap gap-4 sm:gap-6 justify-center lg:justify-start items-center">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-primary to-secondary ring-2 ring-white dark:ring-black shadow-md"
                      />
                    ))}
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-foreground">500+ écoles</span>
                </div>
                <div className="h-6 w-px bg-foreground/10 hidden xs:block" />
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <svg key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-foreground">4.9/5 satisfaction</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative hidden lg:block animate-fade-in delay-200">
            <div className="relative z-10">
              {/* Main Dashboard Card */}
              <div className="bg-card/95 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 overflow-hidden animate-scale-in">
                {/* Header */}
                <div className="bg-gradient-to-r from-primary to-secondary p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">École Primaire La Victoire</p>
                      <p className="text-white/80 text-sm">Douala, Littoral</p>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="p-6">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {[
                      { label: "Élèves", value: "342", colorClass: "text-primary" },
                      { label: "Classes", value: "12", colorClass: "text-secondary" },
                      { label: "Enseignants", value: "18", colorClass: "text-accent" },
                    ].map((stat, i) => (
                      <div key={i} className="text-center p-3 rounded-xl bg-muted/50">
                        <p className={`text-2xl font-bold ${stat.colorClass}`}>{stat.value}</p>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Recent Activity */}
                  <div className="space-y-3">
                    {[
                      { icon: FileText, text: "12 bulletins générés", time: "Il y a 5 min", bgClass: "bg-primary/10", iconClass: "text-primary" },
                      { icon: CreditCard, text: "Paiement reçu - 25,000 FCFA", time: "Il y a 15 min", bgClass: "bg-secondary/10", iconClass: "text-secondary" },
                      { icon: Bell, text: "SMS envoyés aux parents CM2", time: "Il y a 1h", bgClass: "bg-accent/10", iconClass: "text-accent" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted/80 transition-colors">
                        <div className={`w-10 h-10 rounded-lg ${item.bgClass} flex items-center justify-center`}>
                          <item.icon className={`w-5 h-5 ${item.iconClass}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{item.text}</p>
                          <p className="text-xs text-muted-foreground">{item.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute -left-16 top-20 bg-card/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/20 animate-float delay-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <p className="font-semibold">98%</p>
                    <p className="text-xs text-muted-foreground">Taux de paiement</p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-8 bottom-24 bg-card/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/20 animate-float delay-400">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold">1,250</p>
                    <p className="text-xs text-muted-foreground">Bulletins/mois</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute -z-10 -top-10 -right-10 w-72 h-72 rounded-full bg-primary/20 blur-3xl mix-blend-multiply" />
            <div className="absolute -z-10 -bottom-10 -left-10 w-72 h-72 rounded-full bg-secondary/20 blur-3xl mix-blend-multiply" />
          </div>
        </div>
      </div>
    </section>
  );
}