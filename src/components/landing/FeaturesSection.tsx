import { 
  GraduationCap, 
  FileText, 
  CreditCard, 
  Users, 
  Bell, 
  BarChart3,
  Shield,
  Smartphone,
  Globe,
  Zap,
  Clock,
  Heart
} from "lucide-react";

const mainFeatures = [
  {
    icon: FileText,
    title: "Bulletins PDF Automatiques",
    description: "Génération instantanée de bulletins professionnels bilingues (FR/EN) avec moyennes et appréciations.",
    color: "primary",
  },
  {
    icon: CreditCard,
    title: "Paiements Mobile Money",
    description: "Intégration MTN MoMo, Orange Money et Wave. QR codes de paiement et relances SMS automatiques.",
    color: "secondary",
  },
  {
    icon: Users,
    title: "Gestion Multi-Rôles",
    description: "Directeur, secrétaire, enseignant, parent - chaque utilisateur accède à son espace personnalisé.",
    color: "accent",
  },
  {
    icon: Bell,
    title: "Notifications SMS/Push",
    description: "Alertez instantanément les parents : notes disponibles, arriérés de paiement, absences...",
    color: "primary",
  },
  {
    icon: BarChart3,
    title: "Statistiques Avancées",
    description: "Tableaux de bord en temps réel : taux de réussite, revenus, assiduité par classe.",
    color: "secondary",
  },
  {
    icon: Shield,
    title: "Sécurité & Confidentialité",
    description: "Données hébergées au Cameroun, chiffrement bout-en-bout, conformité RGPD.",
    color: "accent",
  },
];

const additionalFeatures = [
  { icon: Smartphone, label: "Application Mobile PWA" },
  { icon: Globe, label: "Accessible partout" },
  { icon: Zap, label: "Rapide & fiable" },
  { icon: Clock, label: "Support 24/7" },
  { icon: Heart, label: "Made in Cameroun" },
  { icon: GraduationCap, label: "Spécial primaire" },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pattern-grid opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            Fonctionnalités complètes
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Tout ce dont votre école a besoin,{" "}
            <span className="gradient-text">en une seule plateforme</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            De la saisie des notes à la génération des bulletins, en passant par le suivi des paiements. 
            Help Digi School simplifie la gestion quotidienne de votre établissement.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {mainFeatures.map((feature, i) => (
            <div
              key={i}
              className="group bg-card rounded-2xl p-6 lg:p-8 border border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-14 h-14 rounded-xl bg-${feature.color}/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-7 h-7 text-${feature.color}`} />
              </div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional Features */}
        <div className="bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-2xl p-8 lg:p-12">
          <h3 className="text-xl font-semibold text-center mb-8">
            Et aussi...
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {additionalFeatures.map((feature, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-5 py-3 bg-card rounded-xl border border-border/50 hover:border-primary/30 hover:shadow-md transition-all"
              >
                <feature.icon className="w-5 h-5 text-primary" />
                <span className="font-medium text-sm">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
