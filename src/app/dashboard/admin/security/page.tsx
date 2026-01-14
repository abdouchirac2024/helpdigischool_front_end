import { Metadata } from 'next'
import { AdminSecurityPage } from '@/components/dashboard/admin/pages'

export const metadata: Metadata = {
  title: 'Sécurité - Admin',
  description: 'Gestion de la sécurité et des accès',
}

export default function SecurityPage() {
  return <AdminSecurityPage />
}