import { DashboardShell } from '@/components/dashboard/shared/DashboardShell'
import { PresenceProvider } from '@/lib/presence/presence-context'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <PresenceProvider>
      <DashboardShell role="admin">{children}</DashboardShell>
    </PresenceProvider>
  )
}
