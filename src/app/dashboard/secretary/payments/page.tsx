import { Metadata } from 'next'
import { SecretaryPaymentsPage } from '@/components/dashboard/secretary/pages'

export const metadata: Metadata = {
  title: 'Paiements - Secrétariat',
  description: 'Gestion des paiements',
}

export default function PaymentsPage() {
  return <SecretaryPaymentsPage />
}