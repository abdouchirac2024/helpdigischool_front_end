import { Metadata } from 'next'
import dynamic from 'next/dynamic'

const AdminAnalyticsPage = dynamic(
  () =>
    import('@/components/dashboard/admin/pages/AnalyticsPage').then((m) => m.AdminAnalyticsPage),
  { loading: () => <DashboardSkeleton /> }
)

function DashboardSkeleton() {
  return (
    <div className="animate-pulse space-y-6 p-6">
      <div className="h-8 w-48 rounded bg-gray-200" />
      <div className="h-10 w-full rounded bg-gray-100" />
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 rounded bg-gray-100" />
        ))}
      </div>
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Analytiques - Admin',
  description: 'Statistiques et analyses de la plateforme',
}

export default function AnalyticsPage() {
  return <AdminAnalyticsPage />
}
