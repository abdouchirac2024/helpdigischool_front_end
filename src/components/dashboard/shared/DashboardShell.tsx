'use client'

import { useState } from 'react'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'
import { menuItemsByRole, roleDisplayInfo } from '@/config/menu-items'
import { useAuth } from '@/lib/auth/auth-context'

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

export function DashboardShell({ role, children }: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user } = useAuth()

  const menuItems = menuItemsByRole[role] ?? []

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
