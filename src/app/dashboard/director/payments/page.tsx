import { Metadata } from 'next'
import { DirectorPaymentsPage } from '@/components/dashboard/director/pages'

export const metadata: Metadata = {
  title: 'Paiements - Dashboard Directeur',
  description: 'Gestion des paiements',
}

export default function PaymentsPage() {
  return <DirectorPaymentsPage />
}