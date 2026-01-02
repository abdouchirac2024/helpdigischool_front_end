'use client'

import { useState } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Clock,
  Building2,
  User
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

const contactReasons = [
  'Demande de démo',
  'Question sur les tarifs',
  'Support technique',
  'Partenariat',
  'Autre',
]

const contactInfo = [
  {
    icon: Phone,
    title: 'Téléphone',
    value: '+237 6 00 00 00 00',
    description: 'Lun-Ven, 8h-18h',
  },
  {
    icon: Mail,
    title: 'Email',
    value: 'contact@helpdigischool.cm',
    description: 'Réponse sous 24h',
  },
  {
    icon: MapPin,
    title: 'Adresse',
    value: 'Douala, Cameroun',
    description: 'Akwa Business Center',
  },
  {
    icon: Clock,
    title: 'Horaires',
    value: 'Lun-Ven: 8h-18h',
    description: 'Sam: 9h-13h',
  },
]

export default function ContactForm() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    schoolName: '',
    reason: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: 'Message envoyé! ✉️',
        description: 'Nous vous répondrons dans les 24 heures.',
      })
      setFormData({
        name: '',
        email: '',
        phone: '',
        schoolName: '',
        reason: '',
        message: '',
      })
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/10">
      <Navbar />

      <main className="pt-24 pb-16">
        {/* Helper Gradient */}
        <div className="fixed inset-0 pointer-events-none -z-10">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-primary/5 to-transparent rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-secondary/5 to-transparent rounded-full blur-3xl opacity-50" />
        </div>

        <section className="py-12 lg:py-20 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-8 animate-fade-in border border-primary/20 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Nous sommes à votre écoute
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-gray-900">
                Parlons de votre <span className="text-primary relative inline-block">
                  Projet
                  <svg className="absolute w-full h-3 bottom-1 left-0 text-primary/20 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5 L 100 10 L 0 10 Z" fill="currentColor" />
                  </svg>
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Une question sur la plateforme ? Besoin d'une démonstration personnalisée ?
                Notre équipe est là pour accompagner la digitalisation de votre école.
              </p>
            </div>
          </div>
        </section>

        <section className="pb-16 lg:pb-24">
          <div className="container mx-auto px-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto -mt-6">
              {contactInfo.map((item, i) => (
                <div
                  key={i}
                  className="group bg-card hover:bg-white rounded-2xl p-6 border border-border/50 hover:border-primary/20 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/5 group-hover:bg-primary/10 flex items-center justify-center mb-5 transition-colors">
                    <item.icon className="w-7 h-7 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-gray-900">{item.title}</h3>
                  <p className="text-primary font-bold text-lg mb-1">{item.value}</p>
                  <p className="text-sm text-muted-foreground group-hover:text-gray-600 transition-colors">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-8 lg:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-3xl border border-border/50 shadow-2xl overflow-hidden">
                <div className="grid lg:grid-cols-5 min-h-[600px]">
                  {/* Left Panel - Info/Visual */}
                  <div className="lg:col-span-2 bg-[#2302B3] text-white p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50" />
                    <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                    <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl" />

                    <div className="relative z-10">
                      <h3 className="text-2xl font-bold mb-4">Informations</h3>
                      <p className="text-blue-100 text-sm leading-relaxed mb-8">
                        Remplissez ce formulaire et nous reviendrons vers vous sous 24h ouvrées.
                      </p>

                      <div className="space-y-6">
                        <div className="flex items-start gap-4">
                          <Phone className="w-5 h-5 text-blue-300 mt-1" />
                          <div>
                            <p className="font-medium text-white">+237 6 00 00 00 00</p>
                            <p className="text-xs text-blue-200">Lun-Ven, 8h-18h</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <Mail className="w-5 h-5 text-blue-300 mt-1" />
                          <div>
                            <p className="font-medium text-white">contact@helpdigischool.cm</p>
                            <p className="text-xs text-blue-200">Support en ligne</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <MapPin className="w-5 h-5 text-blue-300 mt-1" />
                          <div>
                            <p className="font-medium text-white">Douala, Cameroun</p>
                            <p className="text-xs text-blue-200">Akwa Business Center</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="relative z-10 pt-8 mt-auto">
                      <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                        <p className="text-xs font-medium text-white/90">
                          "Un service client exceptionnel, toujours disponible pour nous aider."
                        </p>
                        <p className="text-[10px] text-blue-200 mt-2 font-semibold">
                          — Directeur École La Victoire
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Panel - Form */}
                  <div className="lg:col-span-3 p-8 lg:p-12">
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Envoyez-nous un message</h2>
                      <p className="text-muted-foreground text-sm">
                        Tous les champs marqués d'un astérisque (*) sont obligatoires.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-sm font-medium">Nom complet *</Label>
                          <Input
                            id="name"
                            placeholder="Votre nom"
                            className="bg-gray-50 border-gray-200 focus:bg-white transition-all h-11"
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-sm font-medium">Email professionnel *</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="vous@ecole.com"
                            className="bg-gray-50 border-gray-200 focus:bg-white transition-all h-11"
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-sm font-medium">Téléphone</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+237..."
                            className="bg-gray-50 border-gray-200 focus:bg-white transition-all h-11"
                            value={formData.phone}
                            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="schoolName" className="text-sm font-medium">École <span className="text-muted-foreground text-xs">(Optionnel)</span></Label>
                          <Input
                            id="schoolName"
                            placeholder="Nom de l'établissement"
                            className="bg-gray-50 border-gray-200 focus:bg-white transition-all h-11"
                            value={formData.schoolName}
                            onChange={(e) => setFormData(prev => ({ ...prev, schoolName: e.target.value }))}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="reason" className="text-sm font-medium">Sujet *</Label>
                        <Select
                          value={formData.reason}
                          onValueChange={(value) => setFormData(prev => ({ ...prev, reason: value }))}
                        >
                          <SelectTrigger className="bg-gray-50 border-gray-200 focus:bg-white transition-all h-11">
                            <SelectValue placeholder="Je souhaite..." />
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

                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-sm font-medium">Votre message *</Label>
                        <Textarea
                          id="message"
                          placeholder="Dites-nous en plus sur vos besoins..."
                          className="bg-gray-50 border-gray-200 focus:bg-white transition-all min-h-[120px] resize-none"
                          value={formData.message}
                          onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-[#2302B3] hover:bg-[#1c0291] text-white shadow-lg shadow-blue-900/20 h-12 text-base"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Envoi en cours...' : (
                          <>
                            Envoyer le message
                            <Send className="w-4 h-4 ml-2" />
                          </>
                        )}
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
