import { Metadata } from 'next'
import { SecretaryDashboard } from '@/components/dashboard/secretary'

export const metadata: Metadata = {
  title: 'Dashboard Secrétaire - Help Digi School',
  description: 'Tableau de bord secrétaire',
}

export default function SecretaryDashboardPage() {
  return <SecretaryDashboard />
}
