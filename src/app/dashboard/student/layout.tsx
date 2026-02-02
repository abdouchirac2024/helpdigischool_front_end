import { DashboardShell } from '@/components/dashboard/shared/DashboardShell'

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell role="student">{children}</DashboardShell>
}
