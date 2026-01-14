import { Metadata } from 'next'
import { StudentSettingsPage } from '@/components/dashboard/student/pages'

export const metadata: Metadata = {
  title: 'Paramètres - Dashboard Élève',
  description: 'Paramètres du compte élève',
}

export default function SettingsPage() {
  return <StudentSettingsPage />
}