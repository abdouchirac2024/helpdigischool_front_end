'use client'

import { useState, useMemo, type CSSProperties } from 'react'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'
import { menuItemsByRole, roleDisplayInfo } from '@/config/menu-items'
import { useAuth } from '@/lib/auth/auth-context'
import { useDashboardStats } from '@/hooks/use-dashboard-stats'
import { useSchoolBranding, SchoolBrandingProvider } from '@/hooks/use-school-branding'
import { Clock, AlertTriangle, RefreshCw } from 'lucide-react'
import { hexToHsl, darkenHsl, lightenHsl } from '@/lib/utils/color'

function getAvatarFullUrl(avatarUrl: string | undefined): string | null {
  if (!avatarUrl) return null
  if (avatarUrl.startsWith('http')) return avatarUrl
  const backendBase =
    typeof window !== 'undefined' && window.location.hostname === 'localhost'
      ? '/api/backend'
      : process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'
  const path = avatarUrl.startsWith('/api/') ? avatarUrl.substring(4) : avatarUrl
  return `${backendBase}${path}`
}

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
  'classesCount' | 'studentsCount' | 'teachersCount' | 'schoolsCount' | 'usersCount'
> = {
  '/dashboard/director/classes': 'classesCount',
  '/dashboard/director/students': 'studentsCount',
  '/dashboard/director/teachers': 'teachersCount',
  '/dashboard/admin/schools': 'schoolsCount',
  '/dashboard/admin/users': 'usersCount',
}

function StatusBanner({ status }: { status: string }) {
  if (status === 'VALIDEE') return null

  const isPending = status === 'EN_ATTENTE'
  const isRejected = status === 'REJETEE'
  const isSuspended = status === 'SUSPENDUE'

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 text-sm font-medium ${
        isRejected
          ? 'border-b border-red-100 bg-red-50 text-red-800'
          : isSuspended
            ? 'border-b border-orange-100 bg-orange-50 text-orange-800'
            : 'border-b border-amber-100 bg-amber-50 text-amber-800'
      }`}
    >
      {isPending && (
        <>
          <Clock className="h-4 w-4 shrink-0 animate-pulse" />
          <span>
            Votre ecole est en cours de validation. Les fonctionnalites seront disponibles une fois
            votre ecole approuvee.
          </span>
        </>
      )}
      {isRejected && (
        <>
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <span>
            Votre inscription a ete rejetee. Veuillez contacter le support pour plus
            d&apos;informations.
          </span>
        </>
      )}
      {isSuspended && (
        <>
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <span>Votre ecole est suspendue. Veuillez contacter le support.</span>
        </>
      )}
      {!isPending && !isRejected && !isSuspended && (
        <>
          <RefreshCw className="h-4 w-4 shrink-0" />
          <span>Statut de votre ecole : {status}</span>
        </>
      )}
    </div>
  )
}

export function DashboardShell({ role, children }: DashboardShellProps) {
  return (
    <SchoolBrandingProvider>
      <DashboardShellInner role={role}>{children}</DashboardShellInner>
    </SchoolBrandingProvider>
  )
}

function DashboardShellInner({ role, children }: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user } = useAuth()
  const stats = useDashboardStats(role as Parameters<typeof useDashboardStats>[0])
  const branding = useSchoolBranding()

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

  // Le SUPER_ADMIN (role "admin") gere la plateforme entiere, pas une ecole specifique
  // Les autres roles voient le nom de leur ecole (pas le code technique)
  const schoolName =
    role === 'admin'
      ? 'Plateforme SaaS'
      : user?.schoolName || user?.schoolId || fallbackInfo.schoolName

  // School status detection: disable sidebar for directors with non-validated schools
  const schoolStatus = user?.schoolStatus || undefined
  const isSchoolNotValidated = role === 'director' && !!schoolStatus && schoolStatus !== 'VALIDEE'

  // Inject dynamic CSS custom properties so all children using bg-primary etc. pick up branding
  const cssVars = useMemo(() => {
    const primaryHsl = hexToHsl(branding.primaryColor)
    const secondaryHsl = hexToHsl(branding.secondaryColor)
    const darkHsl = darkenHsl(primaryHsl, 10)
    const lightHsl = lightenHsl(primaryHsl, 15)
    return {
      '--primary': primaryHsl,
      '--secondary': secondaryHsl,
      '--primary-dark': darkHsl,
      '--primary-light': lightHsl,
      '--ring': primaryHsl,
    } as CSSProperties
  }, [branding.primaryColor, branding.secondaryColor])

  return (
    <div className="min-h-screen bg-gray-50" style={cssVars}>
      <TopBar
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        userName={userName}
        userRole={userRole}
        userEmail={user?.email}
        schoolName={schoolName}
        logoUrl={branding.logoUrl}
        avatarUrl={getAvatarFullUrl(user?.profile?.avatar)}
      />

      <Sidebar
        menuItems={menuItems}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        disabled={isSchoolNotValidated}
      />

      <main className="min-h-screen pb-20 pt-16 lg:ml-64 lg:pb-0">
        {isSchoolNotValidated && <StatusBanner status={schoolStatus!} />}
        {children}
      </main>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
