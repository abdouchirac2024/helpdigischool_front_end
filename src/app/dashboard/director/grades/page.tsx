import { Metadata } from 'next'
import { DirectorGradesPage } from '@/components/dashboard/director/pages'

export const metadata: Metadata = {
  title: 'Notes & Bulletins - Dashboard Directeur',
  description: 'Gestion des notes et bulletins',
}

export default function GradesPage() {
  return <DirectorGradesPage />
}