import { Metadata } from 'next'
import { StudentMessagesPage } from '@/components/dashboard/student/pages'

export const metadata: Metadata = {
  title: 'Messages - Dashboard Élève',
  description: 'Mes messages',
}

export default function MessagesPage() {
  return <StudentMessagesPage />
}