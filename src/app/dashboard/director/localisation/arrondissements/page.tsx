import { Metadata } from 'next'
import { AdminArrondissementsPage } from '@/components/dashboard/admin/pages'

export const metadata: Metadata = {
  title: 'Arrondissements - Localisation',
  description: 'Liste des arrondissements du Cameroun',
}

export default function ArrondissementsPage() {
  return <AdminArrondissementsPage />
}
