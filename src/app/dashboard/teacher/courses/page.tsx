import { Metadata } from 'next'
import { TeacherCoursesPage } from '@/components/dashboard/teacher/pages'

export const metadata: Metadata = {
  title: 'Mes Cours - Dashboard Enseignant',
  description: 'Gestion des cours et matières',
}

export default function CoursesPage() {
  return <TeacherCoursesPage />
}
