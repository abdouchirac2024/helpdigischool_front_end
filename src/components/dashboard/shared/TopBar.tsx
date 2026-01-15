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
  Globe
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
  userEmail = 'jean.dupont@ecole.cm'
}: TopBarProps) {
  const { logout } = useAuth()
  const { toast } = useToast()
  const { language, toggleLanguage } = useLanguage()

  // Helper to get label based on language
  const getLabel = (labelFr: string, labelEn: string) => language === 'fr' ? labelFr : labelEn

  // Get translated role
  const roleKey = userRole?.toLowerCase() || ''
  const displayRole = roleLabels[roleKey]
    ? roleLabels[roleKey][language]
    : userRole

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
  const userInitials = userName.split(' ').map(n => n[0]).join('').toUpperCase()

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-40">
      <div className="h-full px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Logo - Links to Home */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2302B3] to-[#4318FF] flex items-center justify-center group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-base text-[#2302B3]">Help Digi School</span>
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
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-gray-100 border border-gray-200"
            suppressHydrationWarning
          >
            <Globe className="w-4 h-4 text-[#2302B3]" />
            <span className="text-sm font-semibold text-gray-700" suppressHydrationWarning>{language.toUpperCase()}</span>
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>

          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-2 sm:px-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2302B3] to-[#4318FF] flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">{userInitials}</span>
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-900">{userName}</p>
                  <p className="text-xs text-gray-500" suppressHydrationWarning>{displayRole}</p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400 hidden sm:block" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span className="font-medium">{userName}</span>
                  <span className="text-xs text-gray-500 font-normal">{userEmail}</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/" className="flex items-center gap-2 cursor-pointer">
                  <Home className="w-4 h-4" />
                  <span suppressHydrationWarning>{getLabel('Accueil', 'Home')}</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard" className="flex items-center gap-2 cursor-pointer">
                  <LayoutDashboard className="w-4 h-4" />
                  <span suppressHydrationWarning>{getLabel('Mon Dashboard', 'My Dashboard')}</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings" className="flex items-center gap-2 cursor-pointer">
                  <User className="w-4 h-4" />
                  <span suppressHydrationWarning>{getLabel('Mon Profil', 'My Profile')}</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings" className="flex items-center gap-2 cursor-pointer">
                  <Settings className="w-4 h-4" />
                  <span suppressHydrationWarning>{getLabel('Paramètres', 'Settings')}</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600 cursor-pointer">
                <LogOut className="w-4 h-4 mr-2" />
                <span suppressHydrationWarning>{getLabel('Déconnexion', 'Logout')}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
