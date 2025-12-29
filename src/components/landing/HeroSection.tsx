import { Button } from "@/components/ui/button";
import Link from "next/link";
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
    <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-gradient-to-b from-white to-gray-50">
      {/* Floating Elements */}
      <div className="absolute top-1/4 right-10 w-20 h-20 rounded-2xl bg-[#2302B3]/5 blur-xl animate-float" />
      <div className="absolute bottom-1/4 left-10 w-32 h-32 rounded-full bg-[#2302B3]/5 blur-2xl animate-float" style={{ animationDelay: '300ms' }} />
      <div className="absolute top-1/3 left-1/4 w-16 h-16 rounded-xl bg-[#2302B3]/5 blur-lg animate-float" style={{ animationDelay: '500ms' }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2302B3]/10 text-[#2302B3] text-sm font-medium mb-6 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2302B3] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2302B3]"></span>
            </span>
            Plateforme SaaS #1 au Cameroun
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6 animate-slide-up">
            Gérez votre école{" "}
            <span className="bg-gradient-to-r from-[#2302B3] to-[#4318FF] bg-clip-text text-transparent">
              primaire
            </span>{" "}
            en toute simplicité
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '100ms' }}>
            Notes, bulletins, paiements — tout en{" "}
            <span className="font-semibold text-gray-900">1 clic</span>. 
            La solution complète pour les écoles primaires camerounaises.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <Button size="lg" asChild className="bg-[#2302B3] hover:bg-[#1a0285] text-white rounded-xl px-8 py-6 text-lg shadow-lg shadow-[#2302B3]/25">
              <Link href="/register">
                Inscrire Mon École Gratuitement
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="border-2 border-gray-300 hover:border-[#2302B3] hover:bg-[#2302B3]/5 rounded-xl px-8 py-6 text-lg">
              <Link href="/demo" className="gap-2">
                <Play className="w-5 h-5" />
                Voir la Démo
              </Link>
            </Button>
          </div>

          {/* Features List */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-12 animate-slide-up" style={{ animationDelay: '300ms' }}>
            {features.map((feature, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-600 justify-center">
                <CheckCircle2 className="w-5 h-5 text-[#2302B3] shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* Trust Badges */}
          <div className="pt-8 border-t border-gray-200 animate-fade-in" style={{ animationDelay: '400ms' }}>
            <p className="text-sm text-gray-500 mb-4">
              Déjà adopté par les meilleures écoles
            </p>
            <div className="flex flex-wrap gap-8 justify-center items-center">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2302B3] to-[#4318FF] ring-2 ring-white"
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-900">500+ écoles</span>
              </div>
              <div className="h-8 w-px bg-gray-200 hidden sm:block" />
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-900">4.9/5 satisfaction</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
