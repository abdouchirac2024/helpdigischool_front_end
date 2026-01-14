import { Metadata } from 'next'
import { DirectorStudentsPage } from '@/components/dashboard/director/pages'

export const metadata: Metadata = {
  title: 'Gestion des Élèves - Dashboard Directeur',
  description: 'Liste et gestion des élèves',
}

export default function StudentsPage() {
  return <DirectorStudentsPage />
}