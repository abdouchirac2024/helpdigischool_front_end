import { Metadata } from 'next'
import ContactForm from './ContactForm'

export const metadata: Metadata = {
  title: 'Contact - Help Digi School | Nous Contacter',
  description: 'Contactez l\'équipe Help Digi School. Demande de démo, support technique ou questions - nous sommes là pour vous aider.',
}

export default function ContactPage() {
  return <ContactForm />
}
