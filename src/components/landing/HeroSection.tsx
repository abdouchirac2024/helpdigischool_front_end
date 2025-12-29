import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
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
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-hero opacity-[0.03]" />
      <div className="absolute inset-0 pattern-dots opacity-50" />
      
      {/* Floating Elements */}
      <div className="absolute top-1/4 right-10 w-20 h-20 rounded-2xl bg-primary/10 blur-xl animate-float" />
      <div className="absolute bottom-1/4 left-10 w-32 h-32 rounded-full bg-secondary/10 blur-2xl animate-float delay-300" />
      <div className="absolute top-1/3 left-1/4 w-16 h-16 rounded-xl bg-accent/20 blur-lg animate-float delay-500" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Plateforme SaaS #1 au Cameroun
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 animate-slide-up">
              Gérez votre école{" "}
              <span className="gradient-text">primaire</span>{" "}
              en toute simplicité
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0 animate-slide-up delay-100">
              Notes, bulletins, paiements — tout en{" "}
              <span className="font-semibold text-foreground">1 clic</span>. 
              La solution complète pour les écoles primaires camerounaises.
            </p>

            {/* Features List */}
            <div className="grid grid-cols-2 gap-3 mb-8 animate-slide-up delay-200">
              {features.map((feature, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up delay-300">
              <Button variant="hero" size="xl" asChild>
                <Link to="/register">
                  Inscrire Mon École Gratuitement
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link to="/demo" className="gap-2">
                  <Play className="w-5 h-5" />
                  Voir la Démo
                </Link>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="mt-10 pt-8 border-t border-border/50 animate-fade-in delay-400">
              <p className="text-sm text-muted-foreground mb-4">
                Déjà adopté par les meilleures écoles
              </p>
              <div className="flex flex-wrap gap-6 justify-center lg:justify-start items-center">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary ring-2 ring-background"
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">500+ écoles</span>
                </div>
                <div className="h-8 w-px bg-border hidden sm:block" />
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <svg key={i} className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm font-medium">4.9/5 satisfaction</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative hidden lg:block">
            <div className="relative z-10">
              {/* Main Dashboard Card */}
              <div className="bg-card rounded-2xl shadow-xl border border-border/50 overflow-hidden animate-scale-in">
                {/* Header */}
                <div className="bg-gradient-to-r from-primary to-secondary p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-primary-foreground font-semibold">École Primaire La Victoire</p>
                      <p className="text-primary-foreground/70 text-sm">Douala, Littoral</p>
                    </div>
                  </div>
                </div>
                
                {/* Stats */}
                <div className="p-6">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {[
                      { label: "Élèves", value: "342", color: "primary" },
                      { label: "Classes", value: "12", color: "secondary" },
                      { label: "Enseignants", value: "18", color: "accent" },
                    ].map((stat, i) => (
                      <div key={i} className="text-center p-3 rounded-xl bg-muted">
                        <p className={`text-2xl font-bold text-${stat.color}`}>{stat.value}</p>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Recent Activity */}
                  <div className="space-y-3">
                    {[
                      { icon: FileText, text: "12 bulletins générés", time: "Il y a 5 min", color: "primary" },
                      { icon: CreditCard, text: "Paiement reçu - 25,000 FCFA", time: "Il y a 15 min", color: "secondary" },
                      { icon: Bell, text: "SMS envoyés aux parents CM2", time: "Il y a 1h", color: "accent" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                        <div className={`w-10 h-10 rounded-lg bg-${item.color}/10 flex items-center justify-center`}>
                          <item.icon className={`w-5 h-5 text-${item.color}`} />
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
              <div className="absolute -left-16 top-20 bg-card p-4 rounded-xl shadow-lg border border-border/50 animate-float delay-200">
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

              <div className="absolute -right-8 bottom-24 bg-card p-4 rounded-xl shadow-lg border border-border/50 animate-float delay-400">
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
            <div className="absolute -z-10 -top-10 -right-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute -z-10 -bottom-10 -left-10 w-72 h-72 rounded-full bg-secondary/5 blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
