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
  const [isRedirecting, setIsRedirecting] = useState(false)
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    console.log('[DashboardShell] useEffect triggered', {
      isLoading,
      hasUser: !!user,
      userRole: user?.role,
      expectedRole: role,
    })

    if (isLoading) {
      console.log('[DashboardShell] Still loading, waiting...')
      return
    }

    if (!user) {
      console.log('[DashboardShell] No user found, redirecting to login')
      setIsRedirecting(true)
      router.replace('/login')
      return
    }

    if (user.role !== role) {
      console.log('[DashboardShell] Role mismatch', {
        userRole: user.role,
        expectedRole: role,
        redirectTo: ROLE_DASHBOARD_PATHS_EXTENDED[user.role],
      })
      setIsRedirecting(true)
      const correctPath = ROLE_DASHBOARD_PATHS_EXTENDED[user.role] ?? '/dashboard'
      router.replace(correctPath)
    } else {
      console.log('[DashboardShell] Role matches, rendering dashboard for role:', role)
    }
  }, [user, isLoading, role, router])

  // Afficher un loader pendant le chargement ou la redirection
  if (isLoading || isRedirecting) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-[#2302B3]" />
          <p className="text-sm text-gray-500">{isLoading ? 'Chargement...' : 'Redirection...'}</p>
        </div>
      </div>
    )
  }

  // Si pas d'utilisateur après le chargement, afficher un loader (redirection en cours)
  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-[#2302B3]" />
          <p className="text-sm text-gray-500">Redirection vers la connexion...</p>
        </div>
      </div>
    )
  }

  // Si le rôle ne correspond pas, afficher un loader (redirection en cours)
  if (user.role !== role) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-[#2302B3]" />
          <p className="text-sm text-gray-500">Redirection vers votre tableau de bord...</p>
        </div>
      </div>
    )
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
