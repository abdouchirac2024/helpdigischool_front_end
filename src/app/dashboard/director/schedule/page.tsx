import { Metadata } from 'next'
import { DirectorSchedulePage } from '@/components/dashboard/director/pages'

export const metadata: Metadata = {
  title: 'Emploi du temps - Dashboard Directeur',
  description: 'Gestion des emplois du temps',
}

export default function SchedulePage() {
  return <DirectorSchedulePage />
}