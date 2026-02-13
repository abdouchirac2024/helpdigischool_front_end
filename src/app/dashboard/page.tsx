import { Metadata } from 'next'
import { DirectorDashboard } from '@/components/dashboard'

export const metadata: Metadata = {
  title: 'Dashboard - Help Digi School',
  description: 'Tableau de bord de gestion scolaire',
}

export default function DashboardPage() {
  return <DirectorDashboard />
}
