import { Metadata } from 'next'
import { ParentPaymentsPage } from '@/components/dashboard/parent/pages'

export const metadata: Metadata = {
  title: 'Paiements - Dashboard Parent',
  description: 'Historique et gestion des paiements',
}

export default function PaymentsPage() {
  return <ParentPaymentsPage />
}
