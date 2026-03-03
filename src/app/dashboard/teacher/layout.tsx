'use client'

import { DashboardShell } from '@/components/dashboard/shared/DashboardShell'
import { PresenceProvider } from '@/lib/presence/presence-context'

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  return (
    <PresenceProvider>
      <DashboardShell role="teacher">{children}</DashboardShell>
    </PresenceProvider>
  )
}
