import { Metadata } from 'next'
import { TeacherSettingsPage } from '@/components/dashboard/teacher/pages'

export const metadata: Metadata = {
  title: 'Paramètres - Dashboard Enseignant',
  description: 'Paramètres du compte enseignant',
}

export default function SettingsPage() {
  return <TeacherSettingsPage />
}