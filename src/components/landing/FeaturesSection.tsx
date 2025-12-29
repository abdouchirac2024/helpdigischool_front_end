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
  Zap
} from "lucide-react";

const featureHighlights = [
  {
    icon: Calculator,
    title: "Gestion des Notes",
    description: "Saisie intuitive, calculs automatiques et exports Excel",
  },
  {
    icon: FileText,
    title: "Bulletins PDF Pro",
    description: "Génération instantanée bilingue FR/EN conforme",
  },
  {
    icon: CreditCard,
    title: "Paiements Mobile Money",
    description: "MTN MoMo, Orange Money intégrés + relances SMS",
  },
  {
    icon: Bell,
    title: "Communication Parents",
    description: "Notifications push, SMS groupés et emails automatiques",
  },
  {
    icon: Shield,
    title: "Sécurité Maximale",
    description: "Données chiffrées, sauvegardes et accès sécurisés",
  },
  {
    icon: Smartphone,
    title: "App Mobile PWA",
    description: "Installez sur Android/iOS, mode hors-ligne disponible",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Tout ce dont vous avez besoin pour{" "}
            <span className="gradient-text">gérer votre école</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Une plateforme complète conçue spécifiquement pour les écoles primaires camerounaises
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featureHighlights.map((feature, i) => (
            <div 
              key={i} 
              className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link href="/features">
              Voir Toutes les Fonctionnalités
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}