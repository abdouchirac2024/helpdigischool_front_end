import { Metadata } from 'next'
import { AdminParentsPage } from '@/components/dashboard/admin/pages'

export const metadata: Metadata = {
  title: 'Parents - Director Dashboard',
  description: "Gestion des parents d'eleves",
}

export default function ParentsPage() {
  return <AdminParentsPage />
}
