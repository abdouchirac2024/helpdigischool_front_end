import { Metadata } from 'next'
import { AdminRevenuePage } from '@/components/dashboard/admin/pages'

export const metadata: Metadata = {
  title: 'Revenus - Admin',
  description: 'Suivi des revenus et transactions',
}

export default function RevenuePage() {
  return <AdminRevenuePage />
}