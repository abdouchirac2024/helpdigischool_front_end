import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Notifications - Dashboard Directeur',
  description: 'Centre de notifications',
}

export default function NotificationsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Notifications</h1>
      <p className="text-gray-600 mt-2">Page en cours de développement</p>
    </div>
  )
}