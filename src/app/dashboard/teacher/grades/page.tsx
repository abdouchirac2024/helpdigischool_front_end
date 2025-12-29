import { Metadata } from 'next'
import { TeacherGradesPage } from '@/components/dashboard/teacher/pages'

export const metadata: Metadata = {
  title: 'Saisie des Notes - Dashboard Enseignant',
  description: 'Saisie et gestion des notes',
}

export default function GradesPage() {
  return <TeacherGradesPage />
}
