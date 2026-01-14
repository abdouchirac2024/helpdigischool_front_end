import { Metadata } from 'next'
import { DirectorNotificationsPage } from '@/components/dashboard/director/pages'

export const metadata: Metadata = {
  title: 'Notifications - Dashboard Directeur',
  description: 'Centre de notifications',
}

export default function NotificationsPage() {
  return <DirectorNotificationsPage />
}