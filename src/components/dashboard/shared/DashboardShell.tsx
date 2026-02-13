'use client'

import { useState, useMemo } from 'react'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'
import { menuItemsByRole, roleDisplayInfo } from '@/config/menu-items'
import { useAuth } from '@/lib/auth/auth-context'
import { useDashboardStats } from '@/hooks/use-dashboard-stats'

interface DashboardShellProps {
  role: string
  children: React.ReactNode
}

// Mapping des rôles backend vers les labels français
const ROLE_LABELS: Record<string, string> = {
  admin: 'Super Admin',
  director: 'Directeur',
  teacher: 'Enseignant',
  parent: 'Parent',
  secretary: 'Secrétaire',
  student: 'Élève',
}

// Paths that should get dynamic badges
const DYNAMIC_BADGE_PATHS: Record<
  string,
  keyof Omit<ReturnType<typeof useDashboardStats>, 'isLoading'>
> = {
  '/dashboard/director/classes': 'classesCount',
  '/dashboard/director/students': 'studentsCount',
  '/dashboard/director/teachers': 'teachersCount',
}

export function DashboardShell({ role, children }: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user } = useAuth()
  const stats = useDashboardStats()

  const staticMenuItems = menuItemsByRole[role] ?? []

  // Inject dynamic badge values from API stats
  const menuItems = useMemo(() => {
    if (stats.isLoading) return staticMenuItems
    return staticMenuItems.map((item) => {
      const statKey = DYNAMIC_BADGE_PATHS[item.href]
      if (statKey) {
        return { ...item, badge: String(stats[statKey]) }
      }
      return item
    })
  }, [staticMenuItems, stats])

  // Utiliser les données de l'utilisateur connecté, sinon fallback sur roleDisplayInfo
  const fallbackInfo = roleDisplayInfo[role] ?? { userName: '', userRole: '' }

  const userName = user?.profile
    ? `${user.profile.firstName} ${user.profile.lastName}`
    : fallbackInfo.userName

  const userRole = user?.role ? ROLE_LABELS[user.role] || user.role : fallbackInfo.userRole

  const schoolName = user?.schoolId || fallbackInfo.schoolName

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        userName={userName}
        userRole={userRole}
        schoolName={schoolName}
      />

      <Sidebar menuItems={menuItems} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="min-h-screen pb-20 pt-16 lg:ml-64 lg:pb-0">{children}</main>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
