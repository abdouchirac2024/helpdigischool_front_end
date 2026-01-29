'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Home, Sparkles, CreditCard, LogIn } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Accueil', icon: Home },
  { href: '/features', label: 'Services', icon: Sparkles },
  { href: '/pricing', label: 'Tarifs', icon: CreditCard },
  { href: '/login', label: 'Compte', icon: LogIn },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] pb-[env(safe-area-inset-bottom)] lg:hidden">
      {/* iOS-style frosted glass background */}
      <div className="absolute inset-0 border-t border-gray-200/60 bg-white/80 backdrop-blur-xl" />

      <nav className="relative flex items-end justify-around px-4 pb-2 pt-2">
        {navLinks.map((link) => {
          const isActive = pathname === link.href
          const Icon = link.icon

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex min-w-[60px] flex-col items-center justify-center gap-0.5 py-1',
                'transition-all duration-200 active:scale-90',
                'focus:outline-none'
              )}
            >
              {/* Icon container with active pill */}
              <div
                className={cn(
                  'relative flex h-7 w-10 items-center justify-center rounded-2xl transition-all duration-300',
                  isActive ? 'bg-primary/12 scale-105' : 'bg-transparent'
                )}
              >
                <Icon
                  className={cn(
                    'h-[22px] w-[22px] transition-all duration-300',
                    isActive ? 'stroke-[2.5px] text-primary' : 'stroke-[1.8px] text-gray-400'
                  )}
                />
              </div>

              {/* Label */}
              <span
                className={cn(
                  'text-[10px] leading-tight transition-all duration-300',
                  isActive ? 'font-semibold text-primary' : 'font-medium text-gray-400'
                )}
              >
                {link.label}
              </span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
