'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
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
  ArrowRight,
  ArrowLeft,
  LayoutDashboard,
  Quote,
  CheckCircle2
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

const regions = [
  'Adamaoua', 'Centre', 'Est', 'Extrême-Nord', 'Littoral',
  'Nord', 'Nord-Ouest', 'Ouest', 'Sud', 'Sud-Ouest'
]

export default function RegisterForm() {
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const [formData, setFormData] = useState({
    schoolName: '',
    region: '',
    studentsCount: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  })

  // Mock "Creative" transition handling
  const handleNextStep = () => {
    if (!formData.schoolName || !formData.region || !formData.studentsCount) {
      toast({
        title: 'Champs requis',
        description: 'Veuillez remplir tous les champs obligatoires.',
        variant: 'destructive',
      })
      return
    }
    setIsAnimating(true)
    setTimeout(() => {
      setStep(2)
      setIsAnimating(false)
    }, 300)
  }

  const handlePrevStep = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setStep(1)
      setIsAnimating(false)
    }, 300)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

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
      // Could redirect here
    }, 2000)
  }

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // Generate subdomain preview
  const subdomainPreview = formData.schoolName
    ? formData.schoolName.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 20)
    : 'votre-ecole'

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side - Story & Testimonial */}
      <div className="relative hidden lg:flex flex-col justify-end p-12 bg-[#2302B3] text-white overflow-hidden">
        {/* Background Image with Parallax Feel */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay scale-110"
          style={{ backgroundImage: `url('/director_signup.png')` }}
        />
        {/* Deep Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2302B3] via-[#2302B3]/60 to-transparent" />

        {/* Abstract Geometric Shapes */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-10 w-40 h-40 bg-[#4318FF]/40 rounded-full blur-2xl" />

        {/* Content */}
        <div className="relative z-10 max-w-lg mb-12">
          <div className="mb-8 p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl hover:bg-white/15 transition-all">
            <Quote className="w-10 h-10 text-white/50 mb-4" />
            <p className="text-xl font-medium leading-relaxed mb-6">
              "Depuis que nous utilisons Help Digi School, la gestion des bulletins est passée de 3 semaines à 3 jours. C'est une révolution pour notre administration."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">
                JD
              </div>
              <div>
                <p className="font-bold">Jean Dupont</p>
                <p className="text-sm text-white/70">Directeur, École Les Champions</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-8 text-sm font-medium text-white/60">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-white" />
              <span>Support 24/7</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-white" />
              <span>Données sécurisées</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Creative Interactive Form */}
      <div className="relative flex flex-col justify-center p-6 lg:p-16 bg-slate-50">

        {/* Interactive "Future Dashboard" Preview */}
        <div className="absolute top-6 right-6 lg:top-12 lg:right-12 hidden sm:block animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="p-4 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 w-72 transform rotate-1 hover:rotate-0 transition-transform duration-500">
            <div className="flex items-center gap-3 mb-3 border-b border-slate-100 pb-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                <LayoutDashboard className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Aperçu</p>
                <p className="text-sm font-bold text-gray-800 truncate w-40">{formData.schoolName || 'Votre École'}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-2 bg-slate-100 rounded w-3/4" />
              <div className="h-2 bg-slate-100 rounded w-1/2" />
              <div className="mt-3 flex gap-2">
                <div className="h-8 w-full bg-blue-50 rounded-lg border border-blue-100 flex items-center justify-center text-[10px] text-blue-600 font-medium">
                  {subdomainPreview}.helpdigi.cm
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto w-full pt-16 lg:pt-0">
          {/* Header & Progress */}
          <div className="mb-10">
            <Link href="/" className="inline-block text-[#2302B3] font-bold text-lg mb-6 hover:opacity-80 transition-opacity">
              Typeform Style? Non, HelpDigi Style.
            </Link>
            <div className="flex items-end justify-between mb-4">
              <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                {step === 1 ? 'Créons votre école' : 'Sécurisons votre compte'}
              </h1>
              <span className="text-4xl font-black text-gray-200">{step}/2</span>
            </div>

            {/* Custom Progress Line */}
            <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full bg-[#2302B3] transition-all duration-500 ease-out ${step === 1 ? 'w-1/2' : 'w-full'}`}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="relative">
            {/* Step 1: School Info */}
            <div className={`transition-all duration-300 ease-in-out ${step === 1
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 -translate-x-10 absolute inset-0 pointer-events-none'
              }`}>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-base">Comment s'appelle votre établissement?</Label>
                  <Input
                    placeholder="Ex: Groupe Scolaire Bilingue..."
                    className="h-14 text-lg bg-white shadow-sm border-gray-200 focus:ring-2 focus:ring-[#2302B3]/20"
                    value={formData.schoolName}
                    onChange={(e) => updateFormData('schoolName', e.target.value)}
                    autoFocus
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Région</Label>
                    <Select
                      value={formData.region}
                      onValueChange={(val) => updateFormData('region', val)}
                    >
                      <SelectTrigger className="h-12 bg-white">
                        <SelectValue placeholder="Choisir..." />
                      </SelectTrigger>
                      <SelectContent>
                        {regions.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Nombre d'élèves</Label>
                    <Input
                      type="number"
                      placeholder="Ex: 300"
                      className="h-12 bg-white"
                      value={formData.studentsCount}
                      onChange={(e) => updateFormData('studentsCount', e.target.value)}
                    />
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full h-14 text-lg mt-4 bg-[#2302B3] hover:bg-[#1c0291] shadow-lg shadow-blue-900/20 group"
                >
                  Continuer
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>

            {/* Step 2: Admin Info */}
            <div className={`transition-all duration-300 ease-in-out ${step === 2
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 translate-x-10 absolute inset-0 pointer-events-none'
              }`}>
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Prénom</Label>
                    <Input
                      placeholder="Jean"
                      className="h-12 bg-white"
                      value={formData.firstName}
                      onChange={(e) => updateFormData('firstName', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Nom</Label>
                    <Input
                      placeholder="Dupont"
                      className="h-12 bg-white"
                      value={formData.lastName}
                      onChange={(e) => updateFormData('lastName', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Email Directeur</Label>
                  <Input
                    type="email"
                    placeholder="directeur@ecole.cm"
                    className="h-12 bg-white"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Mot de passe</Label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="h-12 bg-white"
                    value={formData.password}
                    onChange={(e) => updateFormData('password', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Confirmer</Label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="h-12 bg-white"
                    value={formData.confirmPassword}
                    onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <Checkbox
                    id="terms"
                    checked={formData.acceptTerms}
                    onCheckedChange={(c) => updateFormData('acceptTerms', c as boolean)}
                    className="data-[state=checked]:bg-[#2302B3]"
                  />
                  <Label htmlFor="terms" className="text-sm cursor-pointer">J'accepte les conditions d'utilisation</Label>
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevStep}
                    className="h-14 px-6 border-gray-300 hover:bg-gray-50"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 h-14 text-lg bg-[#2302B3] hover:bg-[#1c0291] shadow-lg shadow-blue-900/20"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Création...' : 'Terminer l\'inscription'}
                  </Button>
                </div>
              </div>
            </div>
          </form>

          <p className="mt-8 text-center text-gray-500 text-sm">
            Déjà un compte? <Link href="/login" className="text-[#2302B3] font-bold hover:underline">Se connecter</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
