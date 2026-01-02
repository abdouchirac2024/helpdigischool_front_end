'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import {
  GraduationCap,
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle2,
  School,
  BarChart3,
  MessageSquare,
  Smartphone,
  Clock
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

const slides = [
  {
    image: '/teacher_grades.jpeg',
    badge: "L'excellence scolaire",
    title: "La plateforme tout-en-un pour les écoles modernes.",
    features: [
      { icon: School, title: "Gestion centralisée", desc: "Élèves, enseignants, emplois du temps" },
      { icon: BarChart3, title: "Statistiques détaillées", desc: "Suivez la performance de votre école" },
      { icon: CheckCircle2, title: "Sans engagement", desc: "Essayez gratuitement pendant 14 jours" }
    ]
  },
  {
    image: '/parent_notification_sms.png',
    badge: "Communication temps réel",
    title: "Gardez le lien avec les parents, simplement.",
    features: [
      { icon: Smartphone, title: "Notifications SMS", desc: "Alertes automatiques pour les notes et absences" },
      { icon: MessageSquare, title: "Messagerie directe", desc: "Communiquez facilement avec les familles" },
      { icon: Clock, title: "Gain de temps", desc: "Automatisez vos tâches administratives" }
    ]
  }
]

export default function LoginForm() {
  const { toast } = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })

  // Auto-rotate carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.email || !formData.password) {
      toast({
        title: 'Champs requis',
        description: 'Veuillez remplir tous les champs.',
        variant: 'destructive',
      })
      return
    }

    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: 'Connexion réussie!',
        description: 'Redirection vers votre tableau de bord...',
      })
      // Redirect to dashboard
      window.location.href = '/dashboard'
    }, 1500)
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side - Form */}
      <div className="relative flex flex-col justify-center p-8 lg:p-16 bg-white overflow-hidden">
        {/* Geometric Pattern Overlay - Consistent with Contact Page */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04] text-[#2302B3]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="login-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M50 0 L100 50 L50 100 L0 50 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <path d="M0 0 L100 100 M100 0 L0 100" stroke="currentColor" strokeWidth="0.2" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#login-pattern)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-md mx-auto w-full">
          <div className="mb-10">
            <Link href="/" className="inline-flex items-center gap-2 mb-8 group">
              <div className="w-10 h-10 rounded-xl bg-[#2302B3]/10 flex items-center justify-center group-hover:bg-[#2302B3]/20 transition-colors">
                <GraduationCap className="w-6 h-6 text-[#2302B3]" />
              </div>
              <span className="font-bold text-xl tracking-tight text-[#2302B3]">Help Digi School</span>
            </Link>
            <h1 className="text-3xl font-black text-gray-900 mb-3 tracking-tight">Bon retour parmi nous</h1>
            <p className="text-muted-foreground text-lg">
              Connectez-vous pour gérer votre établissement.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email professionnel</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="directeur@ecole.cm"
                  className="pl-10 h-12 bg-gray-50 border-gray-200 focus:bg-white transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Mot de passe</Label>
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-[#2302B3] hover:underline"
                >
                  Oublié?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="pl-10 pr-10 h-12 bg-gray-50 border-gray-200 focus:bg-white transition-all"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="remember"
                checked={formData.rememberMe}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, rememberMe: checked as boolean }))}
                className="data-[state=checked]:bg-[#2302B3] data-[state=checked]:border-[#2302B3]"
              />
              <Label htmlFor="remember" className="text-sm cursor-pointer text-gray-600">
                Se souvenir de moi pendant 30 jours
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold bg-[#2302B3] hover:bg-[#1c0291] shadow-lg shadow-blue-900/20"
              disabled={isLoading}
            >
              {isLoading ? 'Connexion en cours...' : (
                <>
                  Se connecter
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-gray-500">
              Pas encore de compte?{' '}
              <Link href="/register" className="text-[#2302B3] font-bold hover:underline">
                Créer un compte école
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Carousel & Features */}
      <div className="hidden lg:relative lg:flex lg:flex-col lg:justify-end lg:p-16 text-white overflow-hidden bg-[#2302B3]">
        {/* Carousel Backgrounds */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            style={{ backgroundImage: `url('${slide.image}')` }}
          />
        ))}

        {/* Branded Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2302B3] via-[#2302B3]/75 to-transparent opacity-90" />

        {/* Decorative Circles */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute bottom-1/3 left-10 w-64 h-64 bg-[#4318FF]/30 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-lg">
          {/* Carousel Content */}
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ease-out transform ${index === currentSlide
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8 absolute bottom-0 left-0 right-0 pointer-events-none'
                }`}
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="h-px w-8 bg-white/50" />
                <span className="text-white/80 uppercase tracking-widest text-xs font-bold">{slide.badge}</span>
              </div>

              <h2 className="text-4xl font-bold mb-6 leading-tight drop-shadow-lg">
                {slide.title}
              </h2>

              <div className="space-y-4">
                {slide.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/15 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                      <feature.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-white">{feature.title}</p>
                      <p className="text-white/70 text-sm">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Carousel Indicators */}
          <div className="flex gap-2 mt-8">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${index === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/30 hover:bg-white/50'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

