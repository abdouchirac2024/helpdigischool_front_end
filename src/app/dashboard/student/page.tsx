import { Metadata } from 'next'
import { StudentDashboard } from '@/components/dashboard/student'

export const metadata: Metadata = {
  title: 'Dashboard Élève - Help Digi School',
  description: 'Tableau de bord élève',
}

export default function StudentPage() {
  return <StudentDashboard />
}