import { Metadata } from 'next'
import { DirectorTeachersPage } from '@/components/dashboard/director/pages'

export const metadata: Metadata = {
  title: 'Gestion des Enseignants - Dashboard Directeur',
  description: 'Liste et gestion des enseignants',
}

export default function TeachersPage() {
  return <DirectorTeachersPage />
}