'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  GraduationCap,
  Mail,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Shield,
  Clock,
  KeyRound
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function ForgotPasswordForm() {
  const { toast } = useToast()
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      toast({
        title: 'Email requis',
        description: 'Veuillez entrer votre adresse email.',
        variant: 'destructive',
      })
      return
    }

    setIsLoading(true)

    try {
      // API call would go here
      // await authService.forgotPassword(email)

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      setIsSubmitted(true)
      toast({
        title: 'Email envoyé!',
        description: 'Vérifiez votre boîte de réception.',
      })
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

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side - Form */}
      <div className="relative flex flex-col justify-center p-8 lg:p-16 bg-white overflow-hidden">
        {/* Geometric Pattern Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04] text-[#2302B3]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="forgot-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M50 0 L100 50 L50 100 L0 50 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <path d="M0 0 L100 100 M100 0 L0 100" stroke="currentColor" strokeWidth="0.2" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#forgot-pattern)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-md mx-auto w-full">
          {!isSubmitted ? (
            <>
              <div className="mb-10">
                <Link href="/" className="inline-flex items-center gap-2 mb-8 group">
                  <div className="w-10 h-10 rounded-xl bg-[#2302B3]/10 flex items-center justify-center group-hover:bg-[#2302B3]/20 transition-colors">
                    <GraduationCap className="w-6 h-6 text-[#2302B3]" />
                  </div>
                  <span className="font-bold text-xl tracking-tight text-[#2302B3]">Help Digi School</span>
                </Link>
                <h1 className="text-3xl font-black text-gray-900 mb-3 tracking-tight">Mot de passe oublié?</h1>
                <p className="text-muted-foreground text-lg">
                  Pas de panique! Entrez votre email et nous vous enverrons un lien de réinitialisation.
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoFocus
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-base font-semibold bg-[#2302B3] hover:bg-[#1c0291] shadow-lg shadow-blue-900/20"
                  disabled={isLoading}
                >
                  {isLoading ? 'Envoi en cours...' : (
                    <>
                      Envoyer le lien
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                <Link href="/login" className="inline-flex items-center gap-2 text-[#2302B3] font-semibold hover:underline">
                  <ArrowLeft className="w-4 h-4" />
                  Retour à la connexion
                </Link>
              </div>
            </>
          ) : (
            /* Success State */
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="text-3xl font-black text-gray-900 mb-3 tracking-tight">Email envoyé!</h1>
              <p className="text-muted-foreground text-lg mb-8">
                Nous avons envoyé un lien de réinitialisation à <strong className="text-gray-900">{email}</strong>.
                Vérifiez votre boîte de réception et vos spams.
              </p>

              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-left mb-8">
                <p className="text-sm text-amber-800">
                  <strong>Note:</strong> Le lien expire dans 1 heure. Si vous ne recevez pas l'email,
                  vérifiez vos spams ou <button onClick={() => setIsSubmitted(false)} className="underline font-semibold">réessayez</button>.
                </p>
              </div>

              <Link href="/login" className="inline-flex items-center gap-2 text-[#2302B3] font-semibold hover:underline">
                <ArrowLeft className="w-4 h-4" />
                Retour à la connexion
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
            <KeyRound className="w-8 h-8 text-white" />
          </div>

          <h2 className="text-4xl font-bold mb-6 leading-tight">
            Sécurité de votre compte
          </h2>
          <p className="text-white/80 text-lg mb-10 leading-relaxed">
            Nous prenons la sécurité de vos données très au sérieux.
            Le processus de réinitialisation est simple et sécurisé.
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white mb-1">Vérification par email</h3>
                <p className="text-white/70 text-sm">
                  Un lien sécurisé est envoyé uniquement à l'adresse email associée à votre compte.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white mb-1">Lien temporaire</h3>
                <p className="text-white/70 text-sm">
                  Le lien expire après 1 heure pour garantir la sécurité de votre compte.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white mb-1">Données protégées</h3>
                <p className="text-white/70 text-sm">
                  Vos informations sont chiffrées et ne sont jamais partagées avec des tiers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}