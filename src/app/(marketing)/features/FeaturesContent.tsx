"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  FileText,
  CreditCard,
  Users,
  Bell,
  BarChart3,
  Shield,
  Smartphone,
  Wifi,
  Calculator,
  BookOpen,
  Clock,
  Download,
  MessageSquare,
  UserCheck,
  CalendarDays,
  FileSpreadsheet,
  ArrowRight,
  Mail,
} from "lucide-react";

const featureCategories = [
  {
    title: "Gestion des Notes",
    description: "Saisie intuitive et calculs automatiques",
    icon: Calculator,
    bgClass: "bg-primary/10",
    textClass: "text-primary",
    gradientClass: "from-primary/10 to-primary/5",
    features: [
      { icon: FileText, title: "Saisie rapide", desc: "Interface tableur pour saisir les notes par classe" },
      { icon: Calculator, title: "Calculs auto", desc: "Moyennes, coefficients et classements automatiques" },
      { icon: FileSpreadsheet, title: "Export Excel", desc: "Téléchargez vos données au format Excel/CSV" },
      { icon: Clock, title: "Historique", desc: "Accédez aux notes des années précédentes" },
    ],
  },
  {
    title: "Bulletins PDF",
    description: "Génération professionnelle instantanée",
    icon: FileText,
    bgClass: "bg-secondary/10",
    textClass: "text-secondary",
    gradientClass: "from-secondary/10 to-secondary/5",
    features: [
      { icon: FileText, title: "Templates pro", desc: "Modèles conformes au programme camerounais" },
      { icon: BookOpen, title: "Bilingue FR/EN", desc: "Bulletins en français et anglais" },
      { icon: Download, title: "Téléchargement", desc: "PDF haute qualité, prêt à imprimer" },
      { icon: MessageSquare, title: "Appréciations", desc: "Ajoutez des commentaires personnalisés" },
    ],
  },
  {
    title: "Paiements",
    description: "Mobile Money et suivi complet",
    icon: CreditCard,
    bgClass: "bg-accent/10",
    textClass: "text-accent",
    gradientClass: "from-accent/10 to-accent/5",
    features: [
      { icon: CreditCard, title: "Mobile Money", desc: "MTN MoMo, Orange Money, Wave intégrés" },
      { icon: Bell, title: "Relances SMS", desc: "Rappels automatiques pour les arriérés" },
      { icon: BarChart3, title: "Tableau de bord", desc: "Suivez vos revenus en temps réel" },
      { icon: FileSpreadsheet, title: "Reçus auto", desc: "Génération automatique des reçus" },
    ],
  },
  {
    title: "Communication",
    description: "Restez connecté avec les parents",
    icon: Bell,
    bgClass: "bg-primary/10",
    textClass: "text-primary",
    gradientClass: "from-primary/10 to-primary/5",
    features: [
      { icon: Bell, title: "Notifications push", desc: "Alertes instantanées sur mobile" },
      { icon: MessageSquare, title: "SMS groupés", desc: "Envoyez des SMS à toute une classe" },
      { icon: Mail, title: "Emails", desc: "Notifications par email automatiques" },
      { icon: UserCheck, title: "Accusés", desc: "Confirmez la lecture des messages" },
    ],
  },
];

const additionalFeatures = [
  { icon: Smartphone, title: "Application Mobile PWA", desc: "Installez l'app sur Android/iOS" },
  { icon: Wifi, title: "Mode Hors-Ligne", desc: "Travaillez sans connexion Internet" },
  { icon: Shield, title: "Sécurité Maximale", desc: "Données chiffrées et sauvegardes" },
  { icon: Users, title: "Multi-Utilisateurs", desc: "Gérez les accès de votre équipe" },
  { icon: CalendarDays, title: "Emplois du Temps", desc: "Planifiez les cours et événements" },
  { icon: BarChart3, title: "Rapports Avancés", desc: "Statistiques et analyses détaillées" },
];

export default function FeaturesContent() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24">
        {/* Hero */}
        <section className="py-16 lg:py-24 relative overflow-hidden">
          <div className="absolute inset-0 pattern-dots opacity-30" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Toutes les fonctionnalités pour{" "}
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

        {/* Feature Categories */}
        {featureCategories.map((category, i) => (
          <section key={i} className={`py-16 lg:py-24 ${i % 2 === 1 ? 'bg-muted/30' : ''}`}>
            <div className="container mx-auto px-4">
              <div className={`grid lg:grid-cols-2 gap-12 items-center`}>
                {/* Content */}
                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className={`w-14 h-14 rounded-xl ${category.bgClass} flex items-center justify-center mb-6`}>
                    <category.icon className={`w-7 h-7 ${category.textClass}`} />
                  </div>
                  <h2 className="text-3xl font-bold mb-4">{category.title}</h2>
                  <p className="text-lg text-muted-foreground mb-8">{category.description}</p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {category.features.map((feature, j) => (
                      <div key={j} className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border/50">
                        <div className={`w-10 h-10 rounded-lg ${category.bgClass} flex items-center justify-center shrink-0`}>
                          <feature.icon className={`w-5 h-5 ${category.textClass}`} />
                        </div>
                        <div>
                          <p className="font-semibold">{feature.title}</p>
                          <p className="text-sm text-muted-foreground">{feature.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visual */}
                <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className={`aspect-square rounded-3xl bg-gradient-to-br ${category.gradientClass} flex items-center justify-center p-12`}>
                    <category.icon className={`w-32 h-32 ${category.textClass}/30`} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Additional Features */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-primary to-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary-foreground mb-4">Et bien plus encore...</h2>
              <p className="text-primary-foreground/80">Des fonctionnalités pensées pour votre productivité</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {additionalFeatures.map((feature, i) => (
                <div key={i} className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-6 border border-primary-foreground/20">
                  <feature.icon className="w-8 h-8 text-primary-foreground mb-4" />
                  <h3 className="font-semibold text-primary-foreground mb-2">{feature.title}</h3>
                  <p className="text-primary-foreground/70 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
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
                <Link href="/pricing">Voir les Tarifs</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
