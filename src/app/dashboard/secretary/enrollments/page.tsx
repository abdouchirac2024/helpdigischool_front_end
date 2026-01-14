import { Metadata } from 'next'
import { SecretaryEnrollmentsPage } from '@/components/dashboard/secretary/pages'

export const metadata: Metadata = {
  title: 'Inscriptions - Secrétariat',
  description: 'Gestion des inscriptions et demandes',
}

export default function EnrollmentsPage() {
  return <SecretaryEnrollmentsPage />
}