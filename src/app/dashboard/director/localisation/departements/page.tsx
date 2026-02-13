import { Metadata } from 'next'
import { AdminDepartementsPage } from '@/components/dashboard/admin/pages'

export const metadata: Metadata = {
  title: 'Departements - Localisation',
  description: 'Liste des departements du Cameroun',
}

export default function DepartementsPage() {
  return <AdminDepartementsPage />
}
