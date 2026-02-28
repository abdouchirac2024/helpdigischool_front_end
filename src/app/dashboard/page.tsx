'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth/auth-context'
import { ROLE_DASHBOARD_PATHS } from '@/lib/auth/auth-context'
import { Loader2 } from 'lucide-react'

export default function DashboardPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()

  useEffect(() => {
    if (isLoading) return
    if (!user) {
      router.replace('/login')
      return
    }
    const dashboardPath = ROLE_DASHBOARD_PATHS[user.role] || '/dashboard/director'
    router.replace(dashboardPath)
  }, [user, isLoading, router])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <Loader2 className="mx-auto h-10 w-10 animate-spin text-blue-600" />
        <p className="mt-3 text-gray-600">Redirection...</p>
      </div>
    </div>
  )
}
