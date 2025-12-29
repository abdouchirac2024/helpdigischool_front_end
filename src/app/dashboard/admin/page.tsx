import { Metadata } from 'next'
import { AdminDashboard } from '@/components/dashboard/admin'

export const metadata: Metadata = {
  title: 'Admin Dashboard - Help Digi School',
  description: 'Tableau de bord administrateur SaaS',
}

export default function AdminDashboardPage() {
  return <AdminDashboard />
}
