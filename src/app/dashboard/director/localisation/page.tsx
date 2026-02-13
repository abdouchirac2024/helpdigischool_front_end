import { Metadata } from 'next'
import { AdminLocationPage } from '@/components/dashboard/admin/pages'

export const metadata: Metadata = {
  title: 'Localisation - Dashboard Directeur',
  description: 'Gestion geographique du Cameroun',
}

export default function LocationPage() {
  return <AdminLocationPage />
}
