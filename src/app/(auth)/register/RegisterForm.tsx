'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  GraduationCap, 
  Building2, 
  User, 
  Mail, 
  Lock, 
  Phone,
  MapPin,
  Users,
  ArrowRight,
  CheckCircle2,
  Sparkles
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

const regions = [
  'Adamaoua', 'Centre', 'Est', 'Extrême-Nord', 'Littoral',
  'Nord', 'Nord-Ouest', 'Ouest', 'Sud', 'Sud-Ouest'
]

const benefits = [
  'Essai gratuit 14 jours',
  'Aucune carte bancaire requise',
  'Configuration en 5 minutes',
  'Support local inclus',
]

export default function RegisterForm() {
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    schoolName: '',
    region: '',
    department: '',
    studentsCount: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (step === 1) {
      if (!formData.schoolName || !formData.region || !formData.studentsCount) {
        toast({
          title: 'Champs requis',
          description: 'Veuillez remplir tous les champs obligatoires.',
          variant: 'destructive',
        })
        return
      }
      setStep(2)
      return
    }

    if (!formData.acceptTerms) {
      toast({
        title: 'Conditions requises',
        description: 'Veuillez accepter les conditions d\'utilisation.',
        variant: 'destructive',
      })
      return
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: 'Erreur',
        description: 'Les mots de passe ne correspondent pas.',
        variant: 'destructive',
      })
      return
    }

    setIsLoading(true)
    
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: 'École inscrite avec succès! 🎉',
        description: 'Vérifiez votre email pour activer votre compte.',
      })
    }, 2000)
  }

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start max-w-6xl mx-auto">
            <div className="hidden lg:block">
              <div className="sticky top-32">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                  <Sparkles className="w-4 h-4" />
                  Rejoignez 500+ écoles
                </div>
                
                <h1 className="text-4xl font-bold mb-6">
                  Inscrivez votre école{' '}
                  <span className="gradient-text">en 2 étapes</span>
                </h1>
                
                <p className="text-lg text-muted-foreground mb-8">
                  Commencez à gérer notes, bulletins et paiements dès aujourd'hui. 
                  Votre sous-domaine sera créé automatiquement.
                </p>

                <div className="space-y-4 mb-12">
                  {benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-secondary" />
                      <span className="font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-card rounded-2xl border border-border/50 p-6 shadow-lg">
                  <p className="text-sm text-muted-foreground mb-3">Votre espace sera accessible à:</p>
                  <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
                    <GraduationCap className="w-8 h-8 text-primary" />
                    <div>
                      <p className="font-semibold">
                        {formData.schoolName 
                          ? formData.schoolName.toLowerCase().replace(/\s+/g, '-').slice(0, 20) 
                          : 'votre-ecole'
                        }.helpdigi.cm
                      </p>
                      <p className="text-sm text-muted-foreground">Sous-domaine personnalisé</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl border border-border/50 p-6 lg:p-8 shadow-xl">
              <div className="flex items-center gap-4 mb-8">
                <div className={`flex items-center gap-2 ${step >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                    1
                  </div>
                  <span className="font-medium hidden sm:inline">École</span>
                </div>
                <div className="flex-1 h-1 bg-muted rounded">
                  <div className={`h-full bg-primary rounded transition-all ${step >= 2 ? 'w-full' : 'w-0'}`} />
                </div>
                <div className={`flex items-center gap-2 ${step >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                    2
                  </div>
                  <span className="font-medium hidden sm:inline">Admin</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {step === 1 && (
                  <>
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                        <Building2 className="w-8 h-8 text-primary" />
                      </div>
                      <h2 className="text-2xl font-bold">Informations de l'école</h2>
                      <p className="text-muted-foreground">Dites-nous en plus sur votre établissement</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="schoolName">Nom de l'école *</Label>
                        <div className="relative mt-1.5">
                          <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input
                            id="schoolName"
                            placeholder="Ex: École Primaire La Victoire"
                            className="pl-10"
                            value={formData.schoolName}
                            onChange={(e) => updateFormData('schoolName', e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="region">Région *</Label>
                          <Select
                            value={formData.region}
                            onValueChange={(value) => updateFormData('region', value)}
                          >
                            <SelectTrigger className="mt-1.5">
                              <SelectValue placeholder="Sélectionner" />
                            </SelectTrigger>
                            <SelectContent>
                              {regions.map((region) => (
                                <SelectItem key={region} value={region}>
                                  {region}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="department">Département</Label>
                          <div className="relative mt-1.5">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                              id="department"
                              placeholder="Ex: Wouri"
                              className="pl-10"
                              value={formData.department}
                              onChange={(e) => updateFormData('department', e.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="studentsCount">Nombre d'élèves *</Label>
                        <div className="relative mt-1.5">
                          <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input
                            id="studentsCount"
                            type="number"
                            placeholder="Ex: 250"
                            className="pl-10"
                            value={formData.studentsCount}
                            onChange={(e) => updateFormData('studentsCount', e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 mx-auto rounded-2xl bg-secondary/10 flex items-center justify-center mb-4">
                        <User className="w-8 h-8 text-secondary" />
                      </div>
                      <h2 className="text-2xl font-bold">Compte Administrateur</h2>
                      <p className="text-muted-foreground">Créez votre compte directeur</p>
                    </div>

                    <div className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">Prénom *</Label>
                          <Input
                            id="firstName"
                            placeholder="Jean"
                            className="mt-1.5"
                            value={formData.firstName}
                            onChange={(e) => updateFormData('firstName', e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Nom *</Label>
                          <Input
                            id="lastName"
                            placeholder="Dupont"
                            className="mt-1.5"
                            value={formData.lastName}
                            onChange={(e) => updateFormData('lastName', e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="email">Email professionnel *</Label>
                        <div className="relative mt-1.5">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="directeur@ecole.cm"
                            className="pl-10"
                            value={formData.email}
                            onChange={(e) => updateFormData('email', e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="phone">Téléphone *</Label>
                        <div className="relative mt-1.5">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+237 6XX XXX XXX"
                            className="pl-10"
                            value={formData.phone}
                            onChange={(e) => updateFormData('phone', e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="password">Mot de passe *</Label>
                          <div className="relative mt-1.5">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                              id="password"
                              type="password"
                              placeholder="••••••••"
                              className="pl-10"
                              value={formData.password}
                              onChange={(e) => updateFormData('password', e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="confirmPassword">Confirmer *</Label>
                          <div className="relative mt-1.5">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                              id="confirmPassword"
                              type="password"
                              placeholder="••••••••"
                              className="pl-10"
                              value={formData.confirmPassword}
                              onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 pt-2">
                        <Checkbox
                          id="terms"
                          checked={formData.acceptTerms}
                          onCheckedChange={(checked) => updateFormData('acceptTerms', checked as boolean)}
                        />
                        <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                          J'accepte les{' '}
                          <Link href="/terms" className="text-primary hover:underline">
                            conditions d'utilisation
                          </Link>{' '}
                          et la{' '}
                          <Link href="/privacy" className="text-primary hover:underline">
                            politique de confidentialité
                          </Link>
                        </Label>
                      </div>
                    </div>
                  </>
                )}

                <div className="flex gap-4 pt-4">
                  {step === 2 && (
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1"
                      onClick={() => setStep(1)}
                    >
                      Retour
                    </Button>
                  )}
                  <Button
                    type="submit"
                    variant="hero"
                    className="flex-1"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      'Création en cours...'
                    ) : step === 1 ? (
                      <>
                        Continuer
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    ) : (
                      <>
                        Créer Mon École
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </form>

              <div className="mt-8 pt-6 border-t border-border text-center">
                <p className="text-muted-foreground">
                  Déjà inscrit?{' '}
                  <Link href="/login" className="text-primary font-medium hover:underline">
                    Se connecter
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
