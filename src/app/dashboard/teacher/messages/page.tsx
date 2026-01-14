import { Metadata } from 'next'
import { TeacherMessagesPage } from '@/components/dashboard/teacher/pages'

export const metadata: Metadata = {
  title: 'Messages - Dashboard Enseignant',
  description: 'Mes messages',
}

export default function MessagesPage() {
  return <TeacherMessagesPage />
}