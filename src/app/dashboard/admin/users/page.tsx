import { Metadata } from 'next'
import { AdminUsersPage } from '@/components/dashboard/admin/pages'

export const metadata: Metadata = {
  title: 'Utilisateurs - Admin',
  description: 'Gestion des utilisateurs',
}

export default function UsersPage() {
  return <AdminUsersPage />
}