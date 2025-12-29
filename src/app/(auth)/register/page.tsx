import { Metadata } from 'next'
import RegisterForm from './RegisterForm'

export const metadata: Metadata = {
  title: 'Inscrire Mon École - Help Digi School',
  description: 'Inscrivez votre école primaire sur Help Digi School. Essai gratuit 14 jours, configuration en 5 minutes.',
}

export default function RegisterPage() {
  return <RegisterForm />
}
