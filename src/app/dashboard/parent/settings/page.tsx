import { Metadata } from 'next'
import { ParentSettingsPage } from '@/components/dashboard/parent/pages'

export const metadata: Metadata = {
  title: 'Paramètres - Dashboard Parent',
  description: 'Paramètres du compte',
}

export default function SettingsPage() {
  return <ParentSettingsPage />
}
