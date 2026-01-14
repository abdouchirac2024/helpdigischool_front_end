import { Metadata } from 'next'
import { AdminSettingsPage } from '@/components/dashboard/admin/pages'

export const metadata: Metadata = {
  title: 'Paramètres - Admin',
  description: 'Configuration de la plateforme',
}

export default function SettingsPage() {
  return <AdminSettingsPage />
}