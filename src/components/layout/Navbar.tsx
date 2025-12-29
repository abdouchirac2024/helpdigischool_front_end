'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { 
  GraduationCap, 
  Menu, 
  X, 
  Home, 
  Sparkles, 
  CreditCard, 
  HelpCircle,
  LogIn,
  UserPlus
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Accueil', icon: Home },
  { href: '/features', label: 'Fonctionnalités', icon: Sparkles },
  { href: '/pricing', label: 'Tarifs', icon: CreditCard },
  { href: '/contact', label: 'Contact', icon: HelpCircle },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Desktop Navbar - Top */}
      <nav className="hidden lg:block fixed top-4 left-4 right-4 z-50 bg-white/95 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-lg">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-18">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#2302B3] to-[#4318FF] flex items-center justify-center shadow-md group-hover:shadow-lg transition-all group-hover:scale-105">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-gray-900 leading-tight">
                  Help Digi School
                </span>
                <span className="text-xs text-gray-600">
                  Écoles Primaires Cameroun
                </span>
              </div>
            </Link>

            <div className="flex items-center gap-1">
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
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" asChild className="text-gray-700 hover:text-[#2302B3] rounded-xl">
                <Link href="/login" className="flex items-center gap-2">
                  <LogIn className="w-4 h-4" />
                  Connexion
                </Link>
              </Button>
              <Button size="sm" asChild className="bg-[#2302B3] hover:bg-[#1a0285] text-white rounded-xl shadow-lg shadow-[#2302B3]/20">
                <Link href="/register" className="flex items-center gap-2">
                  <UserPlus className="w-4 h-4" />
                  Inscrire Mon École
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Top Bar - Simplified */}
      <nav className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-sm">
        <div className="px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2302B3] to-[#4318FF] flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-base text-gray-900">
              Help Digi School
            </span>
          </Link>
          
          <Button variant="ghost" size="sm" asChild className="text-gray-700 rounded-lg">
            <Link href="/login">
              <LogIn className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </nav>

      {/* Mobile Bottom Navigation - iOS Style */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-lg pb-safe">
        <div className="grid grid-cols-4 gap-1 px-2 py-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex flex-col items-center justify-center gap-1 py-2 px-3 rounded-xl transition-all duration-200 active:scale-95',
                  isActive
                    ? 'text-[#2302B3] bg-[#2302B3]/10'
                    : 'text-gray-600 active:bg-gray-100'
                )}
              >
                <link.icon className={cn(
                  'w-6 h-6 transition-all',
                  isActive ? 'scale-110' : ''
                )} />
                <span className={cn(
                  'text-[10px] font-medium',
                  isActive ? 'font-semibold' : ''
                )}>
                  {link.label}
                </span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
