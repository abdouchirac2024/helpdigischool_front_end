import { Metadata } from 'next'
import { TeacherDashboard } from '@/components/dashboard/teacher'

export const metadata: Metadata = {
  title: 'Dashboard Enseignant - Help Digi School',
  description: 'Tableau de bord enseignant',
}

export default function TeacherDashboardPage() {
  return <TeacherDashboard />
}
