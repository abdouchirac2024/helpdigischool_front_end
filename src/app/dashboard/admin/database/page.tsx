import { Metadata } from 'next'
import { AdminDatabasePage } from '@/components/dashboard/admin/pages'

export const metadata: Metadata = {
  title: 'Base de données - Admin',
  description: 'Monitoring et gestion des données',
}

export default function DatabasePage() {
  return <AdminDatabasePage />
}