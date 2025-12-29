import { Metadata } from 'next'
import LoginForm from './LoginForm'

export const metadata: Metadata = {
  title: 'Connexion - Help Digi School',
  description: 'Connectez-vous à votre espace Help Digi School pour gérer votre école.',
}

export default function LoginPage() {
  return <LoginForm />
}
