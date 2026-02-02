import { DashboardShell } from '@/components/dashboard/shared/DashboardShell'

export default function SecretaryLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell role="secretary">{children}</DashboardShell>
}
