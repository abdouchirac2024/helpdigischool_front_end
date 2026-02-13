import { Metadata } from 'next'
import { AdminVillesPage } from '@/components/dashboard/admin/pages'

export const metadata: Metadata = {
  title: 'Villes - Localisation',
  description: 'Liste des villes du Cameroun',
}

export default function VillesPage() {
  return <AdminVillesPage />
}
