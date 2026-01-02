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
  UserPlus
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Accueil', icon: Home },
  { href: '/features', label: 'Services', icon: Sparkles },
  { href: '/pricing', label: 'Tarifs', icon: CreditCard },
  { href: '/contact', label: 'Contact', icon: Mail },
]

export function Navbar() {
  const pathname = usePathname()

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
              <span className="text-[10px] lg:text-xs text-gray-600 hidden sm:block">
                Écoles Primaires Cameroun
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
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild className="text-gray-700 hover:text-[#2302B3] rounded-xl hidden sm:flex">
              <Link href="/login" className="flex items-center gap-2">
                <LogIn className="w-4 h-4" />
                Connexion
              </Link>
            </Button>
            <Button size="sm" asChild className="bg-[#2302B3] hover:bg-[#1a0285] text-white rounded-xl shadow-lg shadow-[#2302B3]/20">
              <Link href="/register" className="flex items-center gap-2">
                <UserPlus className="w-4 h-4" />
                <span className="hidden sm:inline">Inscrire Mon École</span>
                <span className="sm:hidden">S'inscrire</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
