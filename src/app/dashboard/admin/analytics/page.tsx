import { Metadata } from 'next'
import { AdminAnalyticsPage } from '@/components/dashboard/admin/pages'

export const metadata: Metadata = {
  title: 'Analytiques - Admin',
  description: 'Statistiques et analyses de la plateforme',
}

export default function AnalyticsPage() {
  return <AdminAnalyticsPage />
}