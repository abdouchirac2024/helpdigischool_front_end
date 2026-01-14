import { Metadata } from 'next'
import { StudentCoursesPage } from '@/components/dashboard/student/pages'

export const metadata: Metadata = {
  title: 'Mes Cours - Dashboard Élève',
  description: 'Accéder à mes cours',
}

export default function CoursesPage() {
  return <StudentCoursesPage />
}