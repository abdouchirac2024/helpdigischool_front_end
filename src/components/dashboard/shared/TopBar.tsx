'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  GraduationCap,
  Menu,
  X,
  Bell,
  User,
  LogOut,
  Settings,
  Home,
  LayoutDashboard,
  ChevronDown,
  Globe,
  Download,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/lib/auth'
import { useToast } from '@/hooks/use-toast'
import { useLanguage } from '@/lib/i18n'
import { useInstallPWA } from '@/hooks/use-install-pwa'

// Role labels
const roleLabels: Record<string, { fr: string; en: string }> = {
  admin: { fr: 'Administrateur', en: 'Administrator' },
  director: { fr: 'Directeur', en: 'Director' },
  teacher: { fr: 'Enseignant', en: 'Teacher' },
  parent: { fr: 'Parent', en: 'Parent' },
  secretary: { fr: 'Secrétaire', en: 'Secretary' },
  student: { fr: 'Élève', en: 'Student' },
  directeur: { fr: 'Directeur', en: 'Director' },
}

interface TopBarProps {
  sidebarOpen: boolean
  onToggleSidebar: () => void
  schoolName?: string
  userName?: string
  userRole?: string
  userEmail?: string
}

export function TopBar({
  sidebarOpen,
  onToggleSidebar,
  schoolName = 'École Primaire La Victoire',
  userName = 'Jean Dupont',
  userRole = 'Directeur',
  userEmail = 'jean.dupont@ecole.cm',
}: TopBarProps) {
  const { logout } = useAuth()
  const { toast } = useToast()
  const { language, toggleLanguage } = useLanguage()
  const { canInstall, promptInstall } = useInstallPWA()

  // Helper to get label based on language
  const getLabel = (labelFr: string, labelEn: string) => (language === 'fr' ? labelFr : labelEn)

  // Get translated role
  const roleKey = userRole?.toLowerCase() || ''
  const displayRole = roleLabels[roleKey] ? roleLabels[roleKey][language] : userRole

  const handleLogout = async () => {
    try {
      await logout()
      toast({
        title: getLabel('Déconnexion réussie', 'Successfully logged out'),
        description: getLabel('À bientôt!', 'See you soon!'),
      })
    } catch {
      toast({
        title: getLabel('Erreur', 'Error'),
        description: getLabel('Erreur lors de la déconnexion', 'Error during logout'),
        variant: 'destructive',
      })
    }
  }

  // Get user initials
  const userInitials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()

  return (
    <header className="fixed left-0 right-0 top-0 z-40 h-16 border-b border-gray-200 bg-white">
      <div className="flex h-full items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="rounded-lg p-2 transition-colors hover:bg-gray-100 lg:hidden"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Logo - Links to Home */}
          <Link href="/" className="group flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#2302B3] to-[#4318FF] transition-transform group-hover:scale-105">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="text-base font-bold text-[#2302B3]">Help Digi School</span>
              <p className="text-xs text-gray-500">{schoolName}</p>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {/* Language Switcher */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-2.5 py-1.5 hover:bg-gray-100"
            suppressHydrationWarning
          >
            <Globe className="h-4 w-4 text-[#2302B3]" />
            <span className="text-sm font-semibold text-gray-700" suppressHydrationWarning>
              {language.toUpperCase()}
            </span>
          </Button>

          {/* Install App */}
          {canInstall && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => promptInstall()}
              className="flex items-center gap-1.5 rounded-lg border border-[#2302B3]/20 bg-[#2302B3]/5 px-2.5 text-[#2302B3] hover:bg-[#2302B3]/10"
              title={language === 'fr' ? "Installer l'application" : 'Install app'}
            >
              <Download className="h-4 w-4" />
              <span className="hidden text-xs font-semibold sm:inline" suppressHydrationWarning>
                {language === 'fr' ? 'Installer' : 'Install'}
              </span>
            </Button>
          )}

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"></span>
          </Button>

          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-2 sm:px-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#2302B3] to-[#4318FF]">
                  <span className="text-sm font-semibold text-white">{userInitials}</span>
                </div>
                <div className="hidden text-left md:block">
                  <p className="text-sm font-medium text-gray-900">{userName}</p>
                  <p className="text-xs text-gray-500" suppressHydrationWarning>
                    {displayRole}
                  </p>
                </div>
                <ChevronDown className="hidden h-4 w-4 text-gray-400 sm:block" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span className="font-medium">{userName}</span>
                  <span className="text-xs font-normal text-gray-500">{userEmail}</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/" className="flex cursor-pointer items-center gap-2">
                  <Home className="h-4 w-4" />
                  <span suppressHydrationWarning>{getLabel('Accueil', 'Home')}</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard" className="flex cursor-pointer items-center gap-2">
                  <LayoutDashboard className="h-4 w-4" />
                  <span suppressHydrationWarning>{getLabel('Mon Dashboard', 'My Dashboard')}</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings" className="flex cursor-pointer items-center gap-2">
                  <User className="h-4 w-4" />
                  <span suppressHydrationWarning>{getLabel('Mon Profil', 'My Profile')}</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings" className="flex cursor-pointer items-center gap-2">
                  <Settings className="h-4 w-4" />
                  <span suppressHydrationWarning>{getLabel('Paramètres', 'Settings')}</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer text-red-600 focus:text-red-600"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span suppressHydrationWarning>{getLabel('Déconnexion', 'Logout')}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
