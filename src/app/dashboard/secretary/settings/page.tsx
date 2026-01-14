import { Metadata } from 'next'
import { SecretarySettingsPage } from '@/components/dashboard/secretary/pages'

export const metadata: Metadata = {
  title: 'Paramètres - Dashboard Secrétaire',
  description: 'Paramètres du compte secrétaire',
}

export default function SettingsPage() {
  return <SecretarySettingsPage />
}