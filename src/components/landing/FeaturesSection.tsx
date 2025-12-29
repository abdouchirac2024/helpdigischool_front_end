import { 
  FileSpreadsheet,
  Calculator,
  FileDown,
  History,
  FileText,
  Languages,
  Download,
  MessageSquare,
  CreditCard,
  Smartphone,
  DollarSign,
  Receipt,
  Bell,
  Mail,
  Send,
  CheckCheck,
  Wifi,
  Shield,
  Users,
  Calendar,
  BarChart3,
  ArrowRight
} from "lucide-react";

const features = [
  {
    icon: FileSpreadsheet,
    title: "Gestion des Notes",
    subtitle: "Saisie intuitive et calculs automatiques",
    items: [
      { icon: FileSpreadsheet, label: "Saisie rapide", desc: "Interface tableur pour saisir les notes par classe" },
      { icon: Calculator, label: "Calculs auto", desc: "Moyennes, coefficients et classements automatiques" },
      { icon: FileDown, label: "Export Excel", desc: "Téléchargez vos données au format Excel/CSV" },
      { icon: History, label: "Historique", desc: "Accédez aux notes des années précédentes" }
    ]
  },
  {
    icon: FileText,
    title: "Bulletins PDF",
    subtitle: "Génération professionnelle instantanée",
    items: [
      { icon: FileText, label: "Templates pro", desc: "Modèles conformes au programme camerounais" },
      { icon: Languages, label: "Bilingue FR/EN", desc: "Bulletins en français et anglais" },
      { icon: Download, label: "Téléchargement", desc: "PDF haute qualité, prêt à imprimer" },
      { icon: MessageSquare, label: "Appréciations", desc: "Ajoutez des commentaires personnalisés" }
    ]
  },
  {
    icon: CreditCard,
    title: "Paiements",
    subtitle: "Mobile Money et suivi complet",
    items: [
      { icon: Smartphone, label: "Mobile Money", desc: "MTN MoMo, Orange Money, Wave intégrés" },
      { icon: Send, label: "Relances SMS", desc: "Rappels automatiques pour les arriérés" },
      { icon: DollarSign, label: "Tableau de bord", desc: "Suivez vos revenus en temps réel" },
      { icon: Receipt, label: "Reçus auto", desc: "Génération automatique des reçus" }
    ]
  },
  {
    icon: Bell,
    title: "Communication",
    subtitle: "Restez connecté avec les parents",
    items: [
      { icon: Bell, label: "Notifications push", desc: "Alertes instantanées sur mobile" },
      { icon: Send, label: "SMS groupés", desc: "Envoyez des SMS à toute une classe" },
      { icon: Mail, label: "Emails", desc: "Notifications par email automatiques" },
      { icon: CheckCheck, label: "Accusés", desc: "Confirmez la lecture des messages" }
    ]
  }
];

const additionalFeatures = [
  { icon: Smartphone, label: "Application Mobile PWA", desc: "Installez l'app sur Android/iOS" },
  { icon: Wifi, label: "Mode Hors-Ligne", desc: "Travaillez sans connexion Internet" },
  { icon: Shield, label: "Sécurité Maximale", desc: "Données chiffrées et sauvegardes" },
  { icon: Users, label: "Multi-Utilisateurs", desc: "Gérez les accès de votre équipe" },
  { icon: Calendar, label: "Emplois du Temps", desc: "Planifiez les cours et événements" },
  { icon: BarChart3, label: "Rapports Avancés", desc: "Statistiques et analyses détaillées" }
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 lg:py-32 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Toutes les fonctionnalités pour{" "}
            <span className="bg-gradient-to-r from-[#2302B3] to-[#4318FF] bg-clip-text text-transparent">
              votre école
            </span>
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Une plateforme complète conçue spécifiquement pour les écoles primaires camerounaises. 
            Simplifiez votre quotidien avec nos outils puissants et intuitifs.
          </p>
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-[#2302B3] text-white rounded-xl font-semibold hover:bg-[#1a0280] transition-all hover:scale-105 shadow-lg hover:shadow-xl">
            Essayer Gratuitement
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-[#2302B3]/30 hover:shadow-xl transition-all duration-300"
            >
              {/* Feature Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#2302B3] to-[#4318FF] flex items-center justify-center flex-shrink-0 shadow-lg">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {feature.subtitle}
                  </p>
                </div>
              </div>

              {/* Feature Items */}
              <div className="grid grid-cols-1 gap-4">
                {feature.items.map((item, j) => (
                  <div
                    key={j}
                    className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 hover:bg-[#2302B3]/5 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center flex-shrink-0 shadow-sm group-hover:shadow-md transition-shadow">
                      <item.icon className="w-5 h-5 text-[#2302B3]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {item.label}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Features Section */}
        <div className="bg-white rounded-2xl p-8 lg:p-12 border border-gray-200 shadow-lg">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold text-gray-900 mb-3">
              Et bien plus encore...
            </h3>
            <p className="text-gray-600">
              Des fonctionnalités pensées pour votre productivité
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {additionalFeatures.map((feature, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-5 rounded-xl bg-gray-50 hover:bg-[#2302B3]/5 transition-all hover:scale-105 group"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#2302B3] to-[#4318FF] flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg transition-shadow">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {feature.label}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center pt-8 border-t border-gray-200">
            <h4 className="text-2xl font-bold text-gray-900 mb-4">
              Prêt à commencer?
            </h4>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Rejoignez les 500+ écoles qui font confiance à Help Digi School. 
              Essai gratuit de 14 jours, sans engagement.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button className="inline-flex items-center gap-2 px-8 py-4 bg-[#2302B3] text-white rounded-xl font-semibold hover:bg-[#1a0280] transition-all hover:scale-105 shadow-lg hover:shadow-xl">
                Inscrire Mon École
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#2302B3] rounded-xl font-semibold border-2 border-[#2302B3] hover:bg-[#2302B3] hover:text-white transition-all hover:scale-105">
                Voir les Tarifs
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
