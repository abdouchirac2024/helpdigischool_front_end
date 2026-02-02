import { DashboardShell } from '@/components/dashboard/shared/DashboardShell'

export default function DirectorLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell role="director">{children}</DashboardShell>
}
