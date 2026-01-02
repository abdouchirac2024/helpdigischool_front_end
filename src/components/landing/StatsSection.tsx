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
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: 'url("/hel.jpeg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Overlay for brand color */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2302B3]/95 to-[#4318FF]/95 z-0" />

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 z-0" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/2 translate-y-1/2 z-0" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, i) => (
            <div key={i} className="text-center group">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform backdrop-blur-sm">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <p className="text-4xl lg:text-5xl font-bold text-white mb-2">
                {stat.value}
              </p>
              <p className="text-white font-semibold mb-1">
                {stat.label}
              </p>
              <p className="text-white/80 text-sm">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
