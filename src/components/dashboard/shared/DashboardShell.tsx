'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'
import { menuItemsByRole } from '@/config/menu-items'
import { useAuth } from '@/lib/auth'
import { ROLE_DASHBOARD_PATHS_EXTENDED } from '@/lib/auth/auth-context'

interface DashboardShellProps {
  role: string
  children: React.ReactNode
}

export function DashboardShell({ role, children }: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoading) return
    if (!user) {
      router.replace('/login')
      return
    }
    if (user.role !== role) {
      const correctPath = ROLE_DASHBOARD_PATHS_EXTENDED[user.role] ?? '/dashboard'
      router.replace(correctPath)
    }
  }, [user, isLoading, role, router])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-[#2302B3]" />
      </div>
    )
  }

  if (!user || user.role !== role) {
    return null
  }

  const menuItems = menuItemsByRole[role] ?? []

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

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
