import { Metadata } from 'next'
import { StudentLibraryPage } from '@/components/dashboard/student/pages'

export const metadata: Metadata = {
  title: 'Bibliothèque - Dashboard Élève',
  description: 'Ressources pédagogiques',
}

export default function LibraryPage() {
  return <StudentLibraryPage />
}