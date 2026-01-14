import { Metadata } from 'next'
import { DirectorDashboard } from '@/components/dashboard'

export const metadata: Metadata = {
  title: 'Dashboard Directeur - Help Digi School',
  description: 'Tableau de bord du directeur',
}

export default function DirectorPage() {
  return <DirectorDashboard />
}