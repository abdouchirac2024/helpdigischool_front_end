import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send,
  MessageSquare,
  Clock,
  Building2,
  User
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useToast } from "@/hooks/use-toast";

const contactReasons = [
  "Demande de démo",
  "Question sur les tarifs",
  "Support technique",
  "Partenariat",
  "Autre",
];

const contactInfo = [
  {
    icon: Phone,
    title: "Téléphone",
    value: "+237 6 00 00 00 00",
    description: "Lun-Ven, 8h-18h",
  },
  {
    icon: Mail,
    title: "Email",
    value: "contact@helpdigischool.cm",
    description: "Réponse sous 24h",
  },
  {
    icon: MapPin,
    title: "Adresse",
    value: "Douala, Cameroun",
    description: "Akwa Business Center",
  },
  {
    icon: Clock,
    title: "Horaires",
    value: "Lun-Ven: 8h-18h",
    description: "Sam: 9h-13h",
  },
];

export default function Contact() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    schoolName: "",
    reason: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Message envoyé! ✉️",
        description: "Nous vous répondrons dans les 24 heures.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        schoolName: "",
        reason: "",
        message: "",
      });
    }, 1500);
  };

  return (
    <>
      <Helmet>
        <title>Contact - Help Digi School | Nous Contacter</title>
        <meta 
          name="description" 
          content="Contactez l'équipe Help Digi School. Demande de démo, support technique ou questions - nous sommes là pour vous aider." 
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-24 pb-16">
          {/* Hero */}
          <section className="py-12 lg:py-16">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-2xl mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                  <MessageSquare className="w-4 h-4" />
                  Nous sommes là pour vous
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Contactez-<span className="gradient-text">nous</span>
                </h1>
                <p className="text-lg text-muted-foreground">
                  Une question? Une demande de démo? Notre équipe camerounaise 
                  est disponible pour vous accompagner.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Info Cards */}
          <section className="pb-12">
            <div className="container mx-auto px-4">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
                {contactInfo.map((item, i) => (
                  <div 
                    key={i}
                    className="bg-card rounded-xl p-6 border border-border/50 text-center hover:border-primary/30 hover:shadow-lg transition-all"
                  >
                    <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-primary font-medium">{item.value}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Form */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <div className="bg-card rounded-2xl border border-border/50 p-8 lg:p-12 shadow-xl">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold mb-2">Envoyez-nous un message</h2>
                    <p className="text-muted-foreground">
                      Remplissez le formulaire ci-dessous et nous vous répondrons rapidement.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Nom complet *</Label>
                        <div className="relative mt-1.5">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input
                            id="name"
                            placeholder="Jean Dupont"
                            className="pl-10"
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <div className="relative mt-1.5">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="jean@ecole.cm"
                            className="pl-10"
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Téléphone</Label>
                        <div className="relative mt-1.5">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+237 6XX XXX XXX"
                            className="pl-10"
                            value={formData.phone}
                            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="schoolName">Nom de l'école</Label>
                        <div className="relative mt-1.5">
                          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input
                            id="schoolName"
                            placeholder="École Primaire..."
                            className="pl-10"
                            value={formData.schoolName}
                            onChange={(e) => setFormData(prev => ({ ...prev, schoolName: e.target.value }))}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="reason">Motif de contact *</Label>
                      <Select
                        value={formData.reason}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, reason: value }))}
                      >
                        <SelectTrigger className="mt-1.5">
                          <SelectValue placeholder="Sélectionnez un motif" />
                        </SelectTrigger>
                        <SelectContent>
                          {contactReasons.map((reason) => (
                            <SelectItem key={reason} value={reason}>
                              {reason}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        placeholder="Décrivez votre demande..."
                        className="mt-1.5 min-h-[150px]"
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="hero"
                      size="lg"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? "Envoi en cours..." : (
                        <>
                          Envoyer le Message
                          <Send className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
