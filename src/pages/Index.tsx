import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { StatsSection } from "@/components/landing/StatsSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { CTASection } from "@/components/landing/CTASection";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Help Digi School - Plateforme SaaS #1 pour Écoles Primaires au Cameroun</title>
        <meta 
          name="description" 
          content="Gérez votre école primaire camerounaise en toute simplicité. Notes, bulletins PDF, paiements Mobile Money - tout en 1 clic. Essai gratuit 14 jours." 
        />
        <meta name="keywords" content="école primaire cameroun, gestion scolaire, bulletins, notes, paiement école, mobile money école" />
        <link rel="canonical" href="https://helpdigischool.cm" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <HeroSection />
          <FeaturesSection />
          <StatsSection />
          <PricingSection />
          <TestimonialsSection />
          <FAQSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
