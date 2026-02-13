import { Metadata } from 'next'
import { AdminRegionsPage } from '@/components/dashboard/admin/pages'

export const metadata: Metadata = {
  title: 'Regions - Localisation',
  description: 'Liste des regions du Cameroun',
}

export default function RegionsPage() {
  return <AdminRegionsPage />
}
