import { Suspense } from 'react'
import ForgotPasswordForm from './ForgotPasswordForm'

export const metadata = {
  title: 'Mot de passe oublié | Help Digi School',
  description: 'Réinitialisez votre mot de passe Help Digi School',
}

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Chargement...</div>}>
      <ForgotPasswordForm />
    </Suspense>
  )
}