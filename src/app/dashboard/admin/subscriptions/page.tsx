import { Metadata } from 'next'
import { AdminSubscriptionsPage } from '@/components/dashboard/admin/pages'

export const metadata: Metadata = {
  title: 'Abonnements - Admin',
  description: 'Gestion des abonnements',
}

export default function SubscriptionsPage() {
  return <AdminSubscriptionsPage />
}