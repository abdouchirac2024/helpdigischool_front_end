'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth'
import { ROLE_DASHBOARD_PATHS_EXTENDED } from '@/lib/auth/auth-context'

/**
 * Page /dashboard - Redirige automatiquement vers le dashboard du rôle de l'utilisateur
 */
export default function DashboardPage() {
  const router = useRouter()
  const { user, isLoading, isAuthenticated } = useAuth()

  useEffect(() => {
    if (isLoading) return

    if (!isAuthenticated || !user) {
      router.replace('/login')
      return
    }

    // Rediriger vers le dashboard correspondant au rôle
    const dashboardPath = ROLE_DASHBOARD_PATHS_EXTENDED[user.role]
    if (dashboardPath) {
      router.replace(dashboardPath)
    } else {
      // Fallback si le rôle n'est pas reconnu
      console.warn(`Unknown role: ${user.role}, redirecting to director dashboard`)
      router.replace('/dashboard/director')
    }
  }, [user, isLoading, isAuthenticated, router])

  // Afficher un loader pendant la redirection
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-[#2302B3]" />
        <p className="text-sm text-gray-500">Redirection vers votre tableau de bord...</p>
      </div>
    </div>
  )
}
