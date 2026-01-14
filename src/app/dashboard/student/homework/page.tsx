import { Metadata } from 'next'
import { StudentHomeworkPage } from '@/components/dashboard/student/pages'

export const metadata: Metadata = {
  title: 'Mes Devoirs - Dashboard Élève',
  description: 'Gérer mes devoirs',
}

export default function HomeworkPage() {
  return <StudentHomeworkPage />
}