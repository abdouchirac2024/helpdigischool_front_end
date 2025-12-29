import { Metadata } from 'next'
import { TeacherStudentsPage } from '@/components/dashboard/teacher/pages'

export const metadata: Metadata = {
  title: 'Mes Élèves - Dashboard Enseignant',
  description: 'Liste et gestion des élèves',
}

export default function StudentsPage() {
  return <TeacherStudentsPage />
}
