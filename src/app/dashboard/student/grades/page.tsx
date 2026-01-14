import { Metadata } from 'next'
import { StudentGradesPage } from '@/components/dashboard/student/pages'

export const metadata: Metadata = {
  title: 'Mes Notes - Dashboard Élève',
  description: 'Consulter mes notes et résultats',
}

export default function GradesPage() {
  return <StudentGradesPage />
}