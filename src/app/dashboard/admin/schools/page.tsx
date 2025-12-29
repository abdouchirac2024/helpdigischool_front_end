import { Metadata } from 'next'
import { AdminSchoolsPage } from '@/components/dashboard/admin/pages'

export const metadata: Metadata = {
  title: 'Gestion des Écoles - Dashboard Admin',
  description: 'Liste et gestion des écoles',
}

export default function SchoolsPage() {
  return <AdminSchoolsPage />
}
