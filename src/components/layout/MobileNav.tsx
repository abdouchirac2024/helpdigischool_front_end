'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Home, LayoutGrid, Tag, Info, Mail, User, LayoutDashboard } from 'lucide-react'
import { useAuth } from '@/lib/auth/auth-context'
import { useLanguage } from '@/lib/i18n'

const publicLinks = [
  { href: '/', labelFr: 'Accueil', labelEn: 'Home', Icon: Home },
  { href: '/features', labelFr: 'Services', labelEn: 'Services', Icon: LayoutGrid },
  { href: '/pricing', labelFr: 'Tarifs', labelEn: 'Pricing', Icon: Tag },
  { href: '/about', labelFr: 'À propos', labelEn: 'About', Icon: Info },
  { href: '/contact', labelFr: 'Contact', labelEn: 'Contact', Icon: Mail },
]

const roleDashboardPaths: Record<string, string> = {
  admin: '/dashboard/admin',
  director: '/dashboard/director',
  teacher: '/dashboard/teacher',
  parent: '/dashboard/parent',
  secretary: '/dashboard/secretary',
  student: '/dashboard/student',
}

export function MobileNav() {
  const pathname = usePathname()
  const { user, isAuthenticated } = useAuth()
  const { language } = useLanguage()
  const [isStandalone, setIsStandalone] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(display-mode: standalone)')
    setIsStandalone(
      mq.matches ||
        ('standalone' in navigator &&
          (navigator as unknown as { standalone: boolean }).standalone === true)
    )
    const handler = (e: MediaQueryListEvent) => setIsStandalone(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Hide in PWA standalone mode
  if (isStandalone) return null

  // Hide on dashboard pages
  if (pathname?.startsWith('/dashboard')) return null

  const getLabel = (fr: string, en: string) => (language === 'fr' ? fr : en)

  const dashboardPath = user?.role ? roleDashboardPaths[user.role] || '/dashboard' : '/dashboard'
  const accountHref = isAuthenticated ? dashboardPath : '/login'

  const navItems = [
    ...publicLinks,
    {
      href: accountHref,
      labelFr: isAuthenticated ? 'Dashboard' : 'Compte',
      labelEn: isAuthenticated ? 'Dashboard' : 'Account',
      Icon: isAuthenticated ? LayoutDashboard : User,
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] pb-[env(safe-area-inset-bottom)] lg:hidden">
      {/* Background with top border glow */}
      <div className="absolute inset-0 border-t border-[#2302B3]/[0.08] bg-white/80 backdrop-blur-2xl backdrop-saturate-[1.8]" />
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#2302B3]/20 to-transparent" />

      <nav className="relative flex items-stretch justify-around px-1 pb-1 pt-1">
        {navItems.map((item) => {
          const isActive = item.href === '/' ? pathname === '/' : pathname?.startsWith(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'group relative flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-2xl py-1.5 transition-all duration-300',
                'focus:outline-none active:scale-90',
                isActive ? '' : 'hover:bg-gray-50/80'
              )}
            >
              {/* Active background pill */}
              {isActive && (
                <div className="absolute inset-x-1 inset-y-0.5 rounded-2xl bg-gradient-to-b from-[#2302B3]/[0.08] to-[#4318FF]/[0.04]" />
              )}

              {/* Icon container */}
              <div
                className={cn(
                  'relative flex h-7 w-10 items-center justify-center rounded-xl transition-all duration-300',
                  isActive
                    ? 'bg-gradient-to-br from-[#2302B3] to-[#4318FF] shadow-md shadow-[#2302B3]/30'
                    : 'bg-transparent'
                )}
              >
                <item.Icon
                  className={cn(
                    'h-[18px] w-[18px] transition-all duration-300',
                    isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'
                  )}
                  strokeWidth={isActive ? 2.2 : 1.8}
                />
              </div>

              {/* Label */}
              <span
                className={cn(
                  'relative text-[9px] leading-tight transition-all duration-300',
                  isActive
                    ? 'font-bold text-[#2302B3]'
                    : 'font-medium text-gray-400 group-hover:text-gray-600'
                )}
                suppressHydrationWarning
              >
                {getLabel(item.labelFr, item.labelEn)}
              </span>

              {/* Active dot indicator */}
              {isActive && (
                <div className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#2302B3]" />
              )}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
