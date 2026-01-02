'use client'

import { useState } from 'react'
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
  BarChart3
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function LoginForm() {
  const { toast } = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })

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

      {/* Right Side - Image & Features */}
      <div className="hidden lg:relative lg:flex lg:flex-col lg:justify-end lg:p-16 text-white overflow-hidden bg-[#2302B3]">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/teacher_grades.jpeg')` }}
        />
        {/* Branded Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2302B3] via-[#2302B3]/80 to-transparent opacity-90" />

        {/* Decorative Circles */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute bottom-1/3 left-10 w-64 h-64 bg-[#4318FF]/30 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-lg">
          <div className="flex items-center gap-2 mb-6 opacity-0 animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            <div className="h-px w-8 bg-white/50" />
            <span className="text-white/80 uppercase tracking-widest text-xs font-bold">L'excellence scolaire</span>
          </div>

          <h2 className="text-4xl font-bold mb-6 leading-tight drop-shadow-lg opacity-0 animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
            La plateforme tout-en-un pour les écoles modernes.
          </h2>

          <div className="space-y-4 opacity-0 animate-fade-in" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/15 transition-colors">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <School className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-bold text-white">Gestion centralisée</p>
                <p className="text-white/70 text-sm">Élèves, enseignants, emplois du temps</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/15 transition-colors">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-bold text-white">Statistiques détaillées</p>
                <p className="text-white/70 text-sm">Suivez la performance de votre école</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/15 transition-colors">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-bold text-white">Sans engagement</p>
                <p className="text-white/70 text-sm">Essayez gratuitement pendant 14 jours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

