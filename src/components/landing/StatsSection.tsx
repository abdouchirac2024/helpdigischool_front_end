import { 
  Building2, 
  Users, 
  FileText, 
  ThumbsUp 
} from "lucide-react";

const stats = [
  {
    icon: Building2,
    value: "500+",
    label: "Écoles partenaires",
    description: "dans les 10 régions",
  },
  {
    icon: Users,
    value: "50,000+",
    label: "Élèves gérés",
    description: "chaque année",
  },
  {
    icon: FileText,
    value: "200,000+",
    label: "Bulletins générés",
    description: "depuis le lancement",
  },
  {
    icon: ThumbsUp,
    value: "98%",
    label: "Satisfaction",
    description: "clients satisfaits",
  },
];

export function StatsSection() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary to-secondary relative overflow-hidden">
      {/* Pattern Overlay */}
      <div className="absolute inset-0 pattern-dots opacity-10" />
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary-foreground/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-foreground/5 rounded-full translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, i) => (
            <div key={i} className="text-center group">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-primary-foreground/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <stat.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <p className="text-4xl lg:text-5xl font-bold text-primary-foreground mb-2">
                {stat.value}
              </p>
              <p className="text-primary-foreground font-medium mb-1">
                {stat.label}
              </p>
              <p className="text-primary-foreground/70 text-sm">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
