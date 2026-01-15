'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  GraduationCap,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
  Shield,
  Sparkles,
  KeyRound,
  AlertTriangle
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

const passwordRequirements = [
  { id: 'length', label: 'Au moins 8 caractères', test: (pwd: string) => pwd.length >= 8 },
  { id: 'uppercase', label: 'Une lettre majuscule', test: (pwd: string) => /[A-Z]/.test(pwd) },
  { id: 'lowercase', label: 'Une lettre minuscule', test: (pwd: string) => /[a-z]/.test(pwd) },
  { id: 'number', label: 'Un chiffre', test: (pwd: string) => /[0-9]/.test(pwd) },
]

export default function ResetPasswordForm() {
  const { toast } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null)
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  })

  // Validate token on mount
  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setIsTokenValid(false)
        return
      }

      // Simulate token validation API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // For demo purposes, consider token valid if it exists
      // In real app: const isValid = await authService.validateResetToken(token)
      setIsTokenValid(true)
    }

    validateToken()
  }, [token])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate all requirements
    const allValid = passwordRequirements.every(req => req.test(formData.password))
    if (!allValid) {
      toast({
        title: 'Mot de passe invalide',
        description: 'Le mot de passe ne respecte pas tous les critères.',
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

    try {
      // API call would go here
      // await authService.resetPassword(token, formData.password)

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      setIsSuccess(true)
      toast({
        title: 'Mot de passe mis à jour!',
        description: 'Vous pouvez maintenant vous connecter.',
      })

      // Redirect after 3 seconds
      setTimeout(() => {
        router.push('/login')
      }, 3000)
    } catch {
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue. Veuillez réessayer.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Loading state while validating token
  if (isTokenValid === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-[#2302B3]/10 flex items-center justify-center mx-auto mb-4 animate-pulse">
            <KeyRound className="w-8 h-8 text-[#2302B3]" />
          </div>
          <p className="text-gray-600">Vérification du lien...</p>
        </div>
      </div>
    )
  }

  // Invalid or expired token
  if (!isTokenValid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-10 h-10 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Lien invalide ou expiré</h1>
          <p className="text-gray-600 mb-8">
            Ce lien de réinitialisation n'est plus valide. Les liens expirent après 1 heure pour des raisons de sécurité.
          </p>
          <div className="space-y-4">
            <Link href="/forgot-password">
              <Button className="w-full h-12 bg-[#2302B3] hover:bg-[#1c0291]">
                Demander un nouveau lien
              </Button>
            </Link>
            <Link href="/login" className="block text-[#2302B3] font-semibold hover:underline">
              Retour à la connexion
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side - Form */}
      <div className="relative flex flex-col justify-center p-8 lg:p-16 bg-white overflow-hidden">
        {/* Geometric Pattern Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04] text-[#2302B3]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="reset-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M50 0 L100 50 L50 100 L0 50 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <path d="M0 0 L100 100 M100 0 L0 100" stroke="currentColor" strokeWidth="0.2" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#reset-pattern)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-md mx-auto w-full">
          {!isSuccess ? (
            <>
              <div className="mb-10">
                <Link href="/" className="inline-flex items-center gap-2 mb-8 group">
                  <div className="w-10 h-10 rounded-xl bg-[#2302B3]/10 flex items-center justify-center group-hover:bg-[#2302B3]/20 transition-colors">
                    <GraduationCap className="w-6 h-6 text-[#2302B3]" />
                  </div>
                  <span className="font-bold text-xl tracking-tight text-[#2302B3]">Help Digi School</span>
                </Link>
                <h1 className="text-3xl font-black text-gray-900 mb-3 tracking-tight">Nouveau mot de passe</h1>
                <p className="text-muted-foreground text-lg">
                  Créez un mot de passe sécurisé pour protéger votre compte.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="password">Nouveau mot de passe</Label>
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
                      autoFocus
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

                {/* Password requirements */}
                <div className="p-4 bg-gray-50 rounded-xl space-y-2">
                  <p className="text-sm font-medium text-gray-700 mb-3">Votre mot de passe doit contenir:</p>
                  {passwordRequirements.map((req) => {
                    const isValid = req.test(formData.password)
                    return (
                      <div key={req.id} className="flex items-center gap-2">
                        {isValid ? (
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                        ) : (
                          <XCircle className="w-4 h-4 text-gray-300" />
                        )}
                        <span className={`text-sm ${isValid ? 'text-green-600' : 'text-gray-500'}`}>
                          {req.label}
                        </span>
                      </div>
                    )
                  })}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="pl-10 pr-10 h-12 bg-gray-50 border-gray-200 focus:bg-white transition-all"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                      <XCircle className="w-4 h-4" />
                      Les mots de passe ne correspondent pas
                    </p>
                  )}
                  {formData.confirmPassword && formData.password === formData.confirmPassword && (
                    <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                      <CheckCircle2 className="w-4 h-4" />
                      Les mots de passe correspondent
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-base font-semibold bg-[#2302B3] hover:bg-[#1c0291] shadow-lg shadow-blue-900/20"
                  disabled={isLoading}
                >
                  {isLoading ? 'Mise à jour...' : (
                    <>
                      Réinitialiser le mot de passe
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </>
          ) : (
            /* Success State */
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="text-3xl font-black text-gray-900 mb-3 tracking-tight">Mot de passe mis à jour!</h1>
              <p className="text-muted-foreground text-lg mb-8">
                Votre mot de passe a été réinitialisé avec succès.
                Vous allez être redirigé vers la page de connexion.
              </p>

              <Link href="/login">
                <Button className="w-full h-12 bg-[#2302B3] hover:bg-[#1c0291]">
                  Se connecter maintenant
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Right Side - Info */}
      <div className="hidden lg:flex flex-col justify-center p-16 bg-[#2302B3] text-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-[#4318FF]/30 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-lg">
          <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-8">
            <Shield className="w-8 h-8 text-white" />
          </div>

          <h2 className="text-4xl font-bold mb-6 leading-tight">
            Conseils pour un mot de passe sécurisé
          </h2>
          <p className="text-white/80 text-lg mb-10 leading-relaxed">
            Un mot de passe fort est votre première ligne de défense contre les accès non autorisés.
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white mb-1">Soyez unique</h3>
                <p className="text-white/70 text-sm">
                  N'utilisez pas le même mot de passe sur plusieurs sites.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <XCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white mb-1">Évitez les évidences</h3>
                <p className="text-white/70 text-sm">
                  Pas de dates de naissance, noms ou mots du dictionnaire.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <KeyRound className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white mb-1">Utilisez un gestionnaire</h3>
                <p className="text-white/70 text-sm">
                  Un gestionnaire de mots de passe peut générer et stocker vos identifiants en toute sécurité.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}