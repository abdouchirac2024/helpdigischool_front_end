'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  GraduationCap,
  Home,
  LayoutGrid,
  Tag,
  Mail,
  LogIn,
  UserPlus,
  Info,
  LayoutDashboard,
  User,
  LogOut,
  ChevronDown,
  Globe,
  Menu,
  X,
  Download,
  Smartphone,
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
import { useInstallPWA } from '@/hooks/use-install-pwa'
import { InstallModal } from '@/components/pwa/InstallModal'

const navLinks = [
  { href: '/', labelFr: 'Accueil', labelEn: 'Home', icon: Home },
  { href: '/features', labelFr: 'Services', labelEn: 'Services', icon: LayoutGrid },
  { href: '/pricing', labelFr: 'Tarifs', labelEn: 'Pricing', icon: Tag },
  { href: '/about', labelFr: 'À propos', labelEn: 'About', icon: Info },
  { href: '/contact', labelFr: 'Contact', labelEn: 'Contact', icon: Mail },
]

const roleLabels = {
  admin: { fr: 'Administrateur', en: 'Administrator' },
  director: { fr: 'Directeur', en: 'Director' },
  teacher: { fr: 'Enseignant', en: 'Teacher' },
  parent: { fr: 'Parent', en: 'Parent' },
  secretary: { fr: 'Secrétaire', en: 'Secretary' },
  student: { fr: 'Élève', en: 'Student' },
}

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
  const { canInstall, isIOS, promptInstall } = useInstallPWA()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showInstallModal, setShowInstallModal] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev)
  }, [])

  const getLabel = (labelFr: string, labelEn: string) => (language === 'fr' ? labelFr : labelEn)

  const userName = user?.profile
    ? `${user.profile.firstName} ${user.profile.lastName}`
    : 'Utilisateur'
  const userInitials = user?.profile
    ? `${user.profile.firstName[0]}${user.profile.lastName[0]}`.toUpperCase()
    : 'U'
  const userRole =
    user?.role && user.role in roleLabels
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
    <>
      <nav
        className={cn(
          'fixed left-3 right-3 top-3 z-50 rounded-2xl border transition-all duration-500 sm:left-4 sm:right-4 sm:top-4',
          scrolled
            ? 'border-gray-200/60 bg-white/70 shadow-lg shadow-black/[0.04] backdrop-blur-2xl backdrop-saturate-150'
            : 'border-gray-200 bg-white/95 shadow-md backdrop-blur-xl'
        )}
      >
        <div className="mx-auto px-4 lg:px-6">
          <div className="flex h-14 items-center justify-between lg:h-16">
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#2302B3] to-[#4318FF] shadow-md shadow-[#2302B3]/20 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-[#2302B3]/30 lg:h-10 lg:w-10 lg:rounded-[14px]">
                <GraduationCap className="h-[18px] w-[18px] text-white lg:h-5 lg:w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[15px] font-bold leading-tight tracking-tight text-gray-900 lg:text-base">
                  Help Digi School
                </span>
                <span
                  className="hidden text-[10px] font-medium text-gray-900 dark:text-gray-100 sm:block lg:text-[11px]"
                  suppressHydrationWarning
                >
                  {getLabel('Écoles Primaires Cameroun', 'Cameroon Primary Schools')}
                </span>
              </div>
            </Link>

            {/* Desktop Links */}
            <div className="hidden items-center gap-0.5 lg:flex">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'relative px-4 py-2 text-[13px] font-medium transition-all duration-200',
                      'rounded-xl',
                      isActive
                        ? 'text-[#2302B3]'
                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                    )}
                  >
                    {isActive && (
                      <span className="absolute inset-0 rounded-xl bg-[#2302B3]/[0.08]" />
                    )}
                    <span className="relative" suppressHydrationWarning>
                      {getLabel(link.labelFr, link.labelEn)}
                    </span>
                  </Link>
                )
              })}
            </div>

            {/* Auth, Language, Install & Mobile Toggle */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Install App Button */}
              {canInstall && (
                <button
                  onClick={() => setShowInstallModal(true)}
                  className="hidden items-center gap-1.5 rounded-xl border border-[#2302B3]/20 bg-[#2302B3]/5 px-2.5 py-1.5 text-xs font-semibold text-[#2302B3] transition-all duration-200 hover:bg-[#2302B3]/10 active:scale-95 sm:flex"
                  title={language === 'fr' ? "Installer l'application" : 'Install app'}
                >
                  <Download className="h-3.5 w-3.5" />
                  <span className="hidden lg:inline" suppressHydrationWarning>
                    {language === 'fr' ? 'Installer' : 'Install'}
                  </span>
                </button>
              )}

              {/* Language Switcher */}
              <button
                onClick={toggleLanguage}
                className="flex h-8 items-center gap-1 rounded-lg border border-gray-200/80 bg-gray-50/50 px-2 transition-all duration-200 hover:border-gray-300 hover:bg-gray-100/80 active:scale-95"
                suppressHydrationWarning
              >
                <Globe className="h-3.5 w-3.5 text-[#2302B3]" />
                <span className="text-xs font-semibold text-gray-600" suppressHydrationWarning>
                  {language.toUpperCase()}
                </span>
              </button>

              {isLoading ? (
                <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />
              ) : isAuthenticated && user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center gap-2 rounded-xl px-2 hover:bg-gray-50 sm:px-3"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#2302B3] to-[#4318FF] shadow-md shadow-[#2302B3]/20">
                        <span className="text-xs font-semibold text-white">{userInitials}</span>
                      </div>
                      <div className="hidden text-left md:block">
                        <p className="text-sm font-medium text-gray-900">{userName}</p>
                        <p className="text-[11px] text-gray-400" suppressHydrationWarning>
                          {userRole}
                        </p>
                      </div>
                      <ChevronDown className="hidden h-3.5 w-3.5 text-gray-400 sm:block" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-56 rounded-xl border-gray-200/80 shadow-xl shadow-black/[0.08]"
                  >
                    <DropdownMenuLabel className="pb-0">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900">{userName}</span>
                        <span className="text-xs font-normal text-gray-400">{userEmail}</span>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/" className="flex cursor-pointer items-center gap-2.5">
                        <Home className="h-4 w-4 text-gray-400" />
                        <span suppressHydrationWarning>{getLabel('Accueil', 'Home')}</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href={dashboardPath}
                        className="flex cursor-pointer items-center gap-2.5"
                      >
                        <LayoutDashboard className="h-4 w-4 text-gray-400" />
                        <span suppressHydrationWarning>
                          {getLabel('Mon Dashboard', 'My Dashboard')}
                        </span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/dashboard/settings"
                        className="flex cursor-pointer items-center gap-2.5"
                      >
                        <User className="h-4 w-4 text-gray-400" />
                        <span suppressHydrationWarning>{getLabel('Mon Profil', 'My Profile')}</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="cursor-pointer text-red-500 focus:text-red-500"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span suppressHydrationWarning>{getLabel('Déconnexion', 'Logout')}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="hidden rounded-xl text-gray-600 hover:bg-gray-50 hover:text-[#2302B3] lg:flex"
                  >
                    <Link href="/login" className="flex items-center gap-1.5">
                      <LogIn className="h-4 w-4" />
                      <span suppressHydrationWarning>{getLabel('Connexion', 'Login')}</span>
                    </Link>
                  </Button>
                  <Button
                    size="sm"
                    asChild
                    className="hidden rounded-xl bg-[#2302B3] text-white shadow-md shadow-[#2302B3]/25 transition-all duration-200 hover:bg-[#1a0285] hover:shadow-lg hover:shadow-[#2302B3]/30 active:scale-[0.97] sm:flex"
                  >
                    <Link href="/register" className="flex items-center gap-1.5">
                      <UserPlus className="h-3.5 w-3.5" />
                      <span suppressHydrationWarning>
                        {getLabel('Inscrire Mon École', 'Register My School')}
                      </span>
                    </Link>
                  </Button>
                </>
              )}

              {/* Mobile Hamburger Button */}
              <button
                onClick={toggleMobileMenu}
                className="flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-200 hover:bg-gray-100 active:scale-90 lg:hidden"
                aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              >
                <div className="relative h-5 w-5">
                  <Menu
                    className={cn(
                      'absolute inset-0 h-5 w-5 text-gray-700 transition-all duration-300',
                      mobileMenuOpen
                        ? 'rotate-90 scale-0 opacity-0'
                        : 'rotate-0 scale-100 opacity-100'
                    )}
                  />
                  <X
                    className={cn(
                      'absolute inset-0 h-5 w-5 text-gray-700 transition-all duration-300',
                      mobileMenuOpen
                        ? 'rotate-0 scale-100 opacity-100'
                        : '-rotate-90 scale-0 opacity-0'
                    )}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity duration-300 lg:hidden',
          mobileMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={cn(
          'fixed left-3 right-3 top-[4.5rem] z-40 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-2xl border border-gray-200/60 bg-white/95 shadow-xl shadow-black/[0.08] backdrop-blur-2xl transition-all duration-300 sm:left-4 sm:right-4 sm:top-[5rem] lg:hidden',
          mobileMenuOpen
            ? 'translate-y-0 scale-100 opacity-100'
            : 'pointer-events-none -translate-y-3 scale-[0.97] opacity-0'
        )}
      >
        <div className="p-4">
          {/* Navigation Links */}
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              const Icon = link.icon
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-[#2302B3]/[0.08] text-[#2302B3]'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  <Icon className="h-[18px] w-[18px]" />
                  <span suppressHydrationWarning>{getLabel(link.labelFr, link.labelEn)}</span>
                </Link>
              )
            })}
          </div>

          {/* Install App - Mobile */}
          {canInstall && (
            <>
              <div className="my-3 h-px bg-gray-200/80" />
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  setShowInstallModal(true)
                }}
                className="flex w-full items-center gap-3 rounded-xl bg-gradient-to-r from-[#2302B3]/5 to-[#4318FF]/5 px-3 py-2.5 text-sm font-medium text-[#2302B3] transition-all hover:from-[#2302B3]/10 hover:to-[#4318FF]/10"
              >
                <Smartphone className="h-[18px] w-[18px]" />
                <span suppressHydrationWarning>
                  {language === 'fr' ? "Installer l'application" : 'Install App'}
                </span>
              </button>
            </>
          )}

          {/* Separator */}
          <div className="my-3 h-px bg-gray-200/80" />

          {/* Auth Buttons for Mobile */}
          {!isLoading && !isAuthenticated && (
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                size="sm"
                asChild
                className="w-full justify-center rounded-xl border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-[#2302B3]"
              >
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2"
                >
                  <LogIn className="h-4 w-4" />
                  <span suppressHydrationWarning>{getLabel('Connexion', 'Login')}</span>
                </Link>
              </Button>
              <Button
                size="sm"
                asChild
                className="w-full justify-center rounded-xl bg-[#2302B3] text-white shadow-md shadow-[#2302B3]/25 hover:bg-[#1a0285]"
              >
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2"
                >
                  <UserPlus className="h-4 w-4" />
                  <span suppressHydrationWarning>
                    {getLabel('Inscrire Mon École', 'Register My School')}
                  </span>
                </Link>
              </Button>
            </div>
          )}

          {/* Authenticated user info for mobile */}
          {!isLoading && isAuthenticated && user && (
            <div className="space-y-1">
              <div className="flex items-center gap-3 rounded-xl bg-gray-50 px-3 py-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#2302B3] to-[#4318FF] shadow-md shadow-[#2302B3]/20">
                  <span className="text-xs font-semibold text-white">{userInitials}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{userName}</p>
                  <p className="text-[11px] text-gray-400" suppressHydrationWarning>
                    {userRole} &middot; {userEmail}
                  </p>
                </div>
              </div>
              <Link
                href={dashboardPath}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-600 transition-all hover:bg-gray-50 hover:text-gray-900"
              >
                <LayoutDashboard className="h-[18px] w-[18px]" />
                <span suppressHydrationWarning>{getLabel('Mon Dashboard', 'My Dashboard')}</span>
              </Link>
              <Link
                href="/dashboard/settings"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-600 transition-all hover:bg-gray-50 hover:text-gray-900"
              >
                <User className="h-[18px] w-[18px]" />
                <span suppressHydrationWarning>{getLabel('Mon Profil', 'My Profile')}</span>
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  handleLogout()
                }}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-500 transition-all hover:bg-red-50"
              >
                <LogOut className="h-[18px] w-[18px]" />
                <span suppressHydrationWarning>{getLabel('Déconnexion', 'Logout')}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Install Modal */}
      <InstallModal open={showInstallModal} onClose={() => setShowInstallModal(false)} />
    </>
  )
}
