import { Metadata } from 'next'
import { DirectorSettingsPage } from '@/components/dashboard/director/pages'

export const metadata: Metadata = {
  title: 'Paramètres - Dashboard Directeur',
  description: 'Paramètres du compte directeur',
}

export default function SettingsPage() {
  return <DirectorSettingsPage />
}