import { Metadata } from 'next'
import { AdminQuartiersPage } from '@/components/dashboard/admin/pages'

export const metadata: Metadata = {
  title: 'Quartiers - Localisation',
  description: 'Liste des quartiers du Cameroun',
}

export default function QuartiersPage() {
  return <AdminQuartiersPage />
}
