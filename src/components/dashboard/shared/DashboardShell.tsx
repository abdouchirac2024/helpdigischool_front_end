'use client'

import { useState } from 'react'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'
import { menuItemsByRole, roleDisplayInfo } from '@/config/menu-items'

interface DashboardShellProps {
  role: string
  children: React.ReactNode
}

export function DashboardShell({ role, children }: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const menuItems = menuItemsByRole[role] ?? []
  const displayInfo = roleDisplayInfo[role] ?? { userName: '', userRole: '' }

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        userName={displayInfo.userName}
        userRole={displayInfo.userRole}
        schoolName={displayInfo.schoolName}
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
