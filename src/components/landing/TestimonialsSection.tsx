import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Help Digi School a transformé notre gestion scolaire. Les bulletins sont générés en quelques secondes et les parents reçoivent les informations instantanément.",
    author: "Marie-Claire Ngo",
    role: "Directrice",
    school: "École Primaire La Victoire",
    location: "Douala, Littoral",
    avatar: "MC",
  },
  {
    quote: "Le suivi des paiements avec les relances SMS automatiques nous a permis de réduire les arriérés de 60%. Un outil indispensable!",
    author: "Paul Tchamba",
    role: "Secrétaire Comptable",
    school: "Groupe Scolaire Le Mérite",
    location: "Yaoundé, Centre",
    avatar: "PT",
  },
  {
    quote: "En tant qu'enseignant, je gagne un temps précieux sur la saisie des notes. L'interface est intuitive et les calculs sont automatiques.",
    author: "Isabelle Fotso",
    role: "Institutrice CM2",
    school: "École Bilingue Excellence",
    location: "Bafoussam, Ouest",
    avatar: "IF",
  },
  {
    quote: "Je peux suivre les notes et les paiements de mes 3 enfants depuis mon téléphone. C'est vraiment pratique et je suis toujours informée.",
    author: "Amina Moussa",
    role: "Parent d'élèves",
    school: "CETIC de Maroua",
    location: "Maroua, Extrême-Nord",
    avatar: "AM",
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pattern-grid opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Star className="w-4 h-4 fill-current" />
            Témoignages
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ils nous font{" "}
            <span className="gradient-text">confiance</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Découvrez les retours de nos utilisateurs à travers le Cameroun.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className="bg-card rounded-2xl p-6 lg:p-8 border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group"
            >
              {/* Quote Icon */}
              <Quote className="w-10 h-10 text-primary/20 mb-4 group-hover:text-primary/40 transition-colors" />
              
              {/* Quote */}
              <p className="text-foreground leading-relaxed mb-6 text-lg">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  <p className="text-sm text-primary">{testimonial.school}</p>
                </div>
              </div>

              {/* Location */}
              <div className="mt-4 pt-4 border-t border-border/50">
                <p className="text-xs text-muted-foreground">
                  📍 {testimonial.location}
                </p>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mt-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="w-4 h-4 text-accent fill-accent"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
