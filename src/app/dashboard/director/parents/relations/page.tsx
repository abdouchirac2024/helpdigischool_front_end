import { Metadata } from 'next'
import { AdminEleveParentsPage } from '@/components/dashboard/admin/pages'

export const metadata: Metadata = {
  title: 'Relations Eleve-Parent - Director Dashboard',
  description: 'Gestion des relations entre eleves et parents',
}

export default function EleveParentsPage() {
  return <AdminEleveParentsPage />
}
