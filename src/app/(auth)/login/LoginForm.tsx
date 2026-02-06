'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
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
  Clock,
  AlertCircle,
  XCircle,
  AlertTriangle,
  UserX,
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useAuth, ROLE_DASHBOARD_PATHS_EXTENDED } from '@/lib/auth'
import { Alert, AlertDescription } from '@/components/ui/alert'

/**
 * SÉCURITÉ: Valide que la redirection est vers une URL interne
 * Prévient les attaques Open Redirect
 */
/**
 * Configuration des messages d'erreur pour une meilleure UX
 */
function getErrorConfig(backendMessage: string): { title: string; displayMessage: string } {
  // Normaliser le message pour la comparaison
  const normalizedMessage = backendMessage.toLowerCase()

  // Identifiants incorrects (email/téléphone ou mot de passe)
  if (normalizedMessage.includes('identifiant ou mot de passe incorrect')) {
    return {
      title: 'Identifiants incorrects',
      displayMessage: 'Email/téléphone ou mot de passe incorrect. Vérifiez vos identifiants.',
    }
  }

  // Compte en attente de validation
  if (normalizedMessage.includes('attente') || normalizedMessage.includes('validation')) {
    return {
      title: 'Compte en attente',
      displayMessage: 'Votre compte est en attente de validation par un administrateur.',
    }
  }

  // Compte désactivé/inactif
  if (normalizedMessage.includes('désactivé') || normalizedMessage.includes('inactif')) {
    return {
      title: 'Compte désactivé',
      displayMessage: "Votre compte a été désactivé. Contactez l'administrateur.",
    }
  }

  // Email ou téléphone requis
  if (normalizedMessage.includes('requis') || normalizedMessage.includes('required')) {
    return {
      title: 'Champ requis',
      displayMessage: 'Veuillez entrer votre email ou numéro de téléphone.',
    }
  }

  // Erreur réseau
  if (normalizedMessage.includes('network') || normalizedMessage.includes('réseau')) {
    return {
      title: 'Erreur de connexion',
      displayMessage: 'Impossible de contacter le serveur. Vérifiez votre connexion internet.',
    }
  }

  // Message par défaut - utiliser le message du backend
  return {
    title: 'Erreur de connexion',
    displayMessage: backendMessage,
  }
}

/**
 * SÉCURITÉ: Valide que la redirection est vers une URL interne
 * Prévient les attaques Open Redirect
 */
function isValidRedirectUrl(url: string | null): boolean {
  if (!url) return false

  // Accepter uniquement les chemins relatifs commençant par /
  if (url.startsWith('/') && !url.startsWith('//')) {
    // Bloquer les chemins avec protocoles cachés
    const decoded = decodeURIComponent(url)
    if (decoded.includes('://') || decoded.startsWith('//')) {
      return false
    }
    return true
  }

  return false
}

const slides = [
  {
    image: '/teacher_grades.jpeg',
    badge: "L'excellence scolaire",
    title: 'La plateforme tout-en-un pour les écoles modernes.',
    position: 'bottom',
    features: [
      { icon: School, title: 'Gestion centralisée', desc: 'Élèves, enseignants, emplois du temps' },
      {
        icon: BarChart3,
        title: 'Statistiques détaillées',
        desc: 'Suivez la performance de votre école',
      },
      {
        icon: CheckCircle2,
        title: 'Sans engagement',
        desc: 'Essayez gratuitement pendant 14 jours',
      },
    ],
  },
  {
    image: '/parent_notification_sms.png',
    badge: 'Communication temps réel',
    title: 'Gardez le lien avec les parents, simplement.',
    position: 'top',
    features: [
      {
        icon: Smartphone,
        title: 'Notifications SMS',
        desc: 'Alertes automatiques pour les notes et absences',
      },
      {
        icon: MessageSquare,
        title: 'Messagerie directe',
        desc: 'Communiquez facilement avec les familles',
      },
      { icon: Clock, title: 'Gain de temps', desc: 'Automatisez vos tâches administratives' },
    ],
  },
]

export default function LoginForm() {
  const { toast } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()
  const {
    login,
    isLoading: authLoading,
    error: authError,
    clearError,
    isAuthenticated,
    user,
  } = useAuth()

  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [localError, setLocalError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    identifier: '', // Email ou numéro de téléphone
    password: '',
    rememberMe: false,
  })

  // SÉCURITÉ: Valider la callbackUrl pour éviter Open Redirect
  const rawCallbackUrl = searchParams.get('callbackUrl')
  const callbackUrl = isValidRedirectUrl(rawCallbackUrl) ? rawCallbackUrl : null

  // Redirect if already authenticated
  useEffect(() => {
    console.log('[LoginForm] Auth check useEffect', {
      isAuthenticated,
      hasUser: !!user,
      userRole: user?.role,
    })

    if (isAuthenticated && user) {
      const dashboardPath = ROLE_DASHBOARD_PATHS_EXTENDED[user.role] || '/dashboard'
      console.log('[LoginForm] Already authenticated, redirecting to:', dashboardPath)
      router.push(callbackUrl || dashboardPath)
    }
  }, [isAuthenticated, user, router, callbackUrl])

  // Auto-rotate carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  // Clear errors when form data changes
  useEffect(() => {
    if (localError) setLocalError(null)
    if (authError) clearError()
  }, [formData.identifier, formData.password])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLocalError(null)

    if (!formData.identifier || !formData.password) {
      toast({
        title: 'Champs requis',
        description: 'Veuillez remplir tous les champs.',
        variant: 'destructive',
      })
      return
    }

    setIsSubmitting(true)

    try {
      console.log('[LoginForm] handleSubmit: Starting login with', formData.identifier)

      const response = await login({
        identifier: formData.identifier,
        password: formData.password,
        rememberMe: formData.rememberMe,
      })

      console.log('[LoginForm] handleSubmit: Login response received', {
        success: response.success,
        userId: response.user?.id,
        userRole: response.user?.role,
      })

      // Déterminer le chemin du dashboard basé sur le rôle
      const userRole = response.user.role
      const dashboardPath = ROLE_DASHBOARD_PATHS_EXTENDED[userRole] || '/dashboard/director'

      console.log('[LoginForm] handleSubmit: Redirecting to dashboard', {
        userRole,
        dashboardPath,
        callbackUrl,
        finalPath: callbackUrl || dashboardPath,
      })

      toast({
        title: 'Connexion réussie!',
        description: `Bienvenue ${response.user.profile.firstName}! Redirection...`,
      })

      // Redirection vers le dashboard correspondant au rôle
      // Utiliser replace pour éviter de revenir à la page login avec le bouton retour
      router.replace(callbackUrl || dashboardPath)
    } catch (err: unknown) {
      // Extraire le message d'erreur du backend
      let message = 'Une erreur est survenue'

      if (err && typeof err === 'object') {
        // ApiError du client API
        if ('message' in err && typeof err.message === 'string') {
          message = err.message
        }
      } else if (err instanceof Error) {
        message = err.message
      }

      // Messages d'erreur personnalisés pour une meilleure UX
      const errorConfig = getErrorConfig(message)

      setLocalError(errorConfig.displayMessage)
      toast({
        title: errorConfig.title,
        description: errorConfig.displayMessage,
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const isLoading = isSubmitting || authLoading
  const displayError = localError || authError

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left Side - Form */}
      <div className="relative flex flex-col justify-center overflow-hidden bg-white p-8 lg:p-16">
        {/* Geometric Pattern Overlay - Consistent with Contact Page */}
        <div className="pointer-events-none absolute inset-0 text-[#2302B3] opacity-[0.04]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="login-pattern"
                x="0"
                y="0"
                width="100"
                height="100"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M50 0 L100 50 L50 100 L0 50 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
                <path d="M0 0 L100 100 M100 0 L0 100" stroke="currentColor" strokeWidth="0.2" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#login-pattern)" />
          </svg>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-md">
          <div className="mb-10">
            <Link href="/" className="group mb-8 inline-flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2302B3]/10 transition-colors group-hover:bg-[#2302B3]/20">
                <GraduationCap className="h-6 w-6 text-[#2302B3]" />
              </div>
              <span className="text-xl font-bold tracking-tight text-[#2302B3]">
                Help Digi School
              </span>
            </Link>
            <h1 className="mb-3 text-3xl font-black tracking-tight text-gray-900">
              Bon retour parmi nous
            </h1>
            <p className="text-lg text-muted-foreground">
              Connectez-vous pour gérer votre établissement.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {displayError && (
              <Alert
                variant="destructive"
                className={` ${displayError.includes('attente') ? 'border-amber-500 bg-amber-50 text-amber-900' : ''} ${displayError.includes('désactivé') ? 'border-red-600 bg-red-50 text-red-900' : ''} `}
              >
                {displayError.includes('attente') ? (
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                ) : displayError.includes('désactivé') ? (
                  <UserX className="h-4 w-4 text-red-600" />
                ) : (
                  <XCircle className="h-4 w-4" />
                )}
                <AlertDescription className="font-medium">{displayError}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="identifier">Email ou téléphone</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                  id="identifier"
                  type="text"
                  placeholder="email@ecole.cm ou 6XXXXXXXX"
                  className="h-12 border-gray-200 bg-gray-50 pl-10 transition-all focus:bg-white"
                  value={formData.identifier}
                  onChange={(e) => setFormData((prev) => ({ ...prev, identifier: e.target.value }))}
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
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="h-12 border-gray-200 bg-gray-50 pl-10 pr-10 transition-all focus:bg-white"
                  value={formData.password}
                  onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="remember"
                checked={formData.rememberMe}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, rememberMe: checked as boolean }))
                }
                className="data-[state=checked]:border-[#2302B3] data-[state=checked]:bg-[#2302B3]"
              />
              <Label htmlFor="remember" className="cursor-pointer text-sm text-gray-600">
                Se souvenir de moi pendant 30 jours
              </Label>
            </div>

            <Button
              type="submit"
              className="h-12 w-full bg-[#2302B3] text-base font-semibold shadow-lg shadow-blue-900/20 hover:bg-[#1c0291]"
              disabled={isLoading}
            >
              {isLoading ? (
                'Connexion en cours...'
              ) : (
                <>
                  Se connecter
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 border-t border-gray-100 pt-6 text-center">
            <p className="text-gray-500">
              Pas encore de compte?{' '}
              <Link href="/register" className="font-bold text-[#2302B3] hover:underline">
                Créer un compte école
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Carousel & Features */}
      <div className="hidden overflow-hidden bg-[#2302B3] text-white lg:relative lg:block">
        {/* Carousel Layers */}
        {slides.map((slide, index) => (
          <div key={index} className="absolute inset-0">
            {/* Image */}
            <div
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ backgroundImage: `url('${slide.image}')` }}
            />
            {/* Dynamic Gradient Overlay based on content position */}
            <div
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-90' : 'opacity-0'
              }`}
              style={{
                background:
                  slide.position === 'top'
                    ? 'linear-gradient(to bottom, #2302B3 10%, rgba(35,2,179,0.8) 50%, transparent 100%)'
                    : 'linear-gradient(to top, #2302B3 10%, rgba(35,2,179,0.8) 50%, transparent 100%)',
              }}
            />
          </div>
        ))}

        {/* Decorative Circles (Fixed) */}
        <div className="absolute right-10 top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute bottom-1/3 left-10 h-64 w-64 rounded-full bg-[#4318FF]/30 blur-3xl" />

        <div className="relative z-10 h-full">
          {/* Carousel Content */}
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute left-0 right-0 mx-auto max-w-xl transform p-16 transition-all duration-700 ease-out ${
                slide.position === 'top' ? 'top-0' : 'bottom-0'
              } ${
                index === currentSlide
                  ? 'translate-y-0 opacity-100'
                  : `pointer-events-none opacity-0 ${slide.position === 'top' ? '-translate-y-8' : 'translate-y-8'}`
              }`}
            >
              <div className="mb-6 flex items-center gap-2">
                <div className="h-px w-8 bg-white/50" />
                <span className="text-xs font-bold uppercase tracking-widest text-white/80">
                  {slide.badge}
                </span>
              </div>

              <h2 className="mb-6 text-4xl font-bold leading-tight drop-shadow-lg">
                {slide.title}
              </h2>

              <div className="space-y-4">
                {slide.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm transition-colors hover:bg-white/15"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20">
                      <feature.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-white">{feature.title}</p>
                      <p className="text-sm text-white/70">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Carousel Indicators */}
          <div className="absolute bottom-8 left-16 z-20 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/30 hover:bg-white/50'
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
