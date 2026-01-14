import { Metadata } from 'next'
import { DirectorStatsPage } from '@/components/dashboard/director/pages'

export const metadata: Metadata = {
  title: 'Statistiques - Dashboard Directeur',
  description: 'Statistiques et rapports',
}

export default function StatsPage() {
  return <DirectorStatsPage />
}