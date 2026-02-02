import { DashboardShell } from '@/components/dashboard/shared/DashboardShell'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell role="admin">{children}</DashboardShell>
}
