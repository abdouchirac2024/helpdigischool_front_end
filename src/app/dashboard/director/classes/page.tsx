import { Metadata } from 'next'
import { DirectorClassesPage } from '@/components/dashboard/director/pages'

export const metadata: Metadata = {
  title: 'Gestion des Classes - Dashboard Directeur',
  description: 'Liste et gestion des classes',
}

export default function ClassesPage() {
  return <DirectorClassesPage />
}