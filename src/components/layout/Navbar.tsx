'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  GraduationCap,
  Home,
  Sparkles,
  CreditCard,
  Mail,
  LogIn,
  UserPlus,
  Info,
  LayoutDashboard,
  User,
  LogOut,
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
import { cn } from '@/lib/utils'
import { useAuth } from '@/lib/auth/auth-context'
import { useToast } from '@/hooks/use-toast'
import { useLanguage } from '@/lib/i18n'

// Static nav links with both translations
const navLinks = [
  { href: '/', labelFr: 'Accueil', labelEn: 'Home', icon: Home },
  { href: '/features', labelFr: 'Services', labelEn: 'Services', icon: Sparkles },
  { href: '/pricing', labelFr: 'Tarifs', labelEn: 'Pricing', icon: CreditCard },
  { href: '/about', labelFr: 'À propos', labelEn: 'About', icon: Info },
  { href: '/contact', labelFr: 'Contact', labelEn: 'Contact', icon: Mail },
]

// Role labels
const roleLabels = {
  admin: { fr: 'Administrateur', en: 'Administrator' },
  director: { fr: 'Directeur', en: 'Director' },
  teacher: { fr: 'Enseignant', en: 'Teacher' },
  parent: { fr: 'Parent', en: 'Parent' },
  secretary: { fr: 'Secrétaire', en: 'Secretary' },
  student: { fr: 'Élève', en: 'Student' },
}

// Role to dashboard path mapping
const roleDashboardPaths: Record<string, string> = {
  admin: '/dashboard/admin',
  director: '/dashboard/director',
  teacher: '/dashboard/teacher',
  parent: '/dashboard/parent',
  secretary: '/dashboard/secretary',
  student: '/dashboard/student',
}

export function Navbar() {
  const pathname = usePathname()
  const { user, isAuthenticated, isLoading, logout } = useAuth()
  const { toast } = useToast()
  const { language, toggleLanguage } = useLanguage()

  // Helper to get label based on language
  const getLabel = (labelFr: string, labelEn: string) => language === 'fr' ? labelFr : labelEn

  // Get user display info
  const userName = user?.profile ? `${user.profile.firstName} ${user.profile.lastName}` : 'Utilisateur'
  const userInitials = user?.profile
    ? `${user.profile.firstName[0]}${user.profile.lastName[0]}`.toUpperCase()
    : 'U'
  const userRole = user?.role && user.role in roleLabels
    ? roleLabels[user.role as keyof typeof roleLabels][language]
    : ''
  const userEmail = user?.email || ''
  const dashboardPath = user?.role ? roleDashboardPaths[user.role] || '/dashboard' : '/dashboard'

  const handleLogout = async () => {
    try {
      await logout()
      toast({
        title: language === 'fr' ? 'Déconnexion réussie' : 'Successfully logged out',
        description: language === 'fr' ? 'À bientôt!' : 'See you soon!',
      })
    } catch {
      toast({
        title: language === 'fr' ? 'Erreur' : 'Error',
        description: language === 'fr' ? 'Erreur lors de la déconnexion' : 'Error during logout',
        variant: 'destructive',
      })
    }
  }

  return (
    <nav className="fixed top-4 left-4 right-4 z-50 bg-white/95 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-lg transition-all duration-300">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 lg:h-18">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 lg:w-11 lg:h-11 rounded-2xl bg-gradient-to-br from-[#2302B3] to-[#4318FF] flex items-center justify-center shadow-md group-hover:shadow-lg transition-all group-hover:scale-105">
              <GraduationCap className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base lg:text-lg text-gray-900 leading-tight">
                Help Digi School
              </span>
              <span className="text-[10px] lg:text-xs text-gray-600 hidden sm:block" suppressHydrationWarning>
                {getLabel('Écoles Primaires Cameroun', 'Cameroon Primary Schools')}
              </span>
            </div>
          </Link>

          {/* Desktop Links - Hidden on Mobile */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200',
                  pathname === link.href
                    ? 'text-[#2302B3] bg-[#2302B3]/10'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                )}
              >
                <span suppressHydrationWarning>{getLabel(link.labelFr, link.labelEn)}</span>
              </Link>
            ))}
          </div>

          {/* Auth & Language Section */}
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl hover:bg-gray-100 border border-gray-200"
              suppressHydrationWarning
            >
              <Globe className="w-4 h-4 text-[#2302B3]" />
              <span className="text-sm font-semibold text-gray-700" suppressHydrationWarning>{language.toUpperCase()}</span>
            </Button>

            {isLoading ? (
              // Loading state
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
            ) : isAuthenticated && user ? (
              // User is logged in - show dropdown
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 px-2 sm:px-3 hover:bg-gray-100 rounded-xl">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#2302B3] to-[#4318FF] flex items-center justify-center shadow-md">
                      <span className="text-white text-sm font-semibold">{userInitials}</span>
                    </div>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium text-gray-900">{userName}</p>
                      <p className="text-xs text-gray-500" suppressHydrationWarning>{userRole}</p>
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
                    <Link href={dashboardPath} className="flex items-center gap-2 cursor-pointer">
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
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600 cursor-pointer">
                    <LogOut className="w-4 h-4 mr-2" />
                    <span suppressHydrationWarning>{getLabel('Déconnexion', 'Logout')}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              // User is not logged in - show login/register buttons
              <>
                <Button variant="ghost" size="sm" asChild className="text-gray-700 hover:text-[#2302B3] rounded-xl hidden sm:flex">
                  <Link href="/login" className="flex items-center gap-2">
                    <LogIn className="w-4 h-4" />
                    <span suppressHydrationWarning>{getLabel('Connexion', 'Login')}</span>
                  </Link>
                </Button>
                <Button size="sm" asChild className="bg-[#2302B3] hover:bg-[#1a0285] text-white rounded-xl shadow-lg shadow-[#2302B3]/20">
                  <Link href="/register" className="flex items-center gap-2">
                    <UserPlus className="w-4 h-4" />
                    <span className="hidden sm:inline" suppressHydrationWarning>{getLabel('Inscrire Mon École', 'Register My School')}</span>
                    <span className="sm:hidden" suppressHydrationWarning>{getLabel("S'inscrire", 'Register')}</span>
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
