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
  Heart,
  School,
  ClipboardList,
  BookOpen,
  UserCircle,
  UserCheck,
  Settings,
  Crown
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

const roleAccess = [
  {
    icon: Crown,
    role: "Admin SaaS",
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    textColor: "text-amber-600",
    description: "Vue globale toutes écoles",
    features: ["Dashboard stats agrégées 1000+ écoles", "Gestion revenus & abonnements", "Support technique centralisé", "Analytics par région/département"],
    badge: "Super Admin",
  },
  {
    icon: School,
    role: "Admin École",
    color: "from-primary to-blue-600",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/30",
    textColor: "text-primary",
    description: "Gérer votre établissement",
    features: ["Créer/gérer les rôles locaux", "Dashboard école complet", "Statistiques & rapports", "Configuration établissement"],
    badge: "Directeur",
  },
  {
    icon: ClipboardList,
    role: "Secrétaire",
    color: "from-secondary to-emerald-600",
    bgColor: "bg-secondary/10",
    borderColor: "border-secondary/30",
    textColor: "text-secondary",
    description: "Administration quotidienne",
    features: ["Inscriptions élèves", "Gestion paiements & factures", "Relances SMS automatiques", "Suivi des arriérés"],
    badge: "Staff",
  },
  {
    icon: BookOpen,
    role: "Enseignant",
    color: "from-violet-500 to-purple-600",
    bgColor: "bg-violet-500/10",
    borderColor: "border-violet-500/30",
    textColor: "text-violet-600",
    description: "Gestion pédagogique",
    features: ["Saisie notes & évaluations", "Gestion présence/absences", "Génération bulletins PDF", "Emplois du temps"],
    badge: "Pédagogie",
  },
  {
    icon: UserCircle,
    role: "Parent",
    color: "from-pink-500 to-rose-500",
    bgColor: "bg-pink-500/10",
    borderColor: "border-pink-500/30",
    textColor: "text-pink-600",
    description: "Suivi de l'enfant",
    features: ["Consulter notes & bulletins", "Historique paiements", "Notifications absences", "Communication école"],
    badge: "Famille",
  },
  {
    icon: UserCheck,
    role: "Élève",
    color: "from-cyan-500 to-teal-500",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/30",
    textColor: "text-cyan-600",
    description: "Espace personnel",
    features: ["Voir ses notes", "Emploi du temps", "Devoirs à faire", "Ressources pédagogiques"],
    badge: "Apprenant",
  },
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-20">
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

        {/* Role Access Section */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Users className="w-4 h-4" />
              Accès par Rôle
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Chaque utilisateur a son{" "}
              <span className="gradient-text">espace personnalisé</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Une interface adaptée aux besoins de chaque acteur de votre établissement
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roleAccess.map((role, i) => (
              <div
                key={i}
                className={`group relative bg-card rounded-2xl p-6 border ${role.borderColor} hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden`}
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${role.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                {/* Badge */}
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full ${role.bgColor} ${role.textColor} text-xs font-semibold`}>
                  {role.badge}
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${role.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <role.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className={`text-xl font-bold mb-2 ${role.textColor} group-hover:scale-105 transition-transform origin-left`}>
                  {role.role}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {role.description}
                </p>

                {/* Features list */}
                <ul className="space-y-2">
                  {role.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${role.color} mt-2 flex-shrink-0`} />
                      <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Decorative element */}
                <div className={`absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${role.color} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`} />
              </div>
            ))}
          </div>
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
