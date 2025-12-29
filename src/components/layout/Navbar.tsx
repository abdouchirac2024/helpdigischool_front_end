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
    <nav className="fixed top-4 left-4 right-4 z-50 bg-white/95 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-lg">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16 lg:h-18">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#2302B3] to-[#4318FF] flex items-center justify-center shadow-md group-hover:shadow-lg transition-all group-hover:scale-105">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-gray-900 leading-tight">
                Help Digi School
              </span>
              <span className="text-xs text-gray-600 hidden sm:block">
                Écoles Primaires Cameroun
              </span>
            </div>
          </Link>

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

          <div className="hidden lg:flex items-center gap-3">
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

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-xl hover:bg-gray-50 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6 text-gray-900" /> : <Menu className="w-6 h-6 text-gray-900" />}
          </button>
        </div>

        {isOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100 animate-slide-up">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all',
                    pathname === link.href
                      ? 'text-[#2302B3] bg-[#2302B3]/10'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  )}
                >
                  <link.icon className="w-5 h-5" />
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-gray-100">
                <Button variant="outline" asChild className="w-full border-gray-200 rounded-xl">
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <LogIn className="w-4 h-4 mr-2" />
                    Connexion
                  </Link>
                </Button>
                <Button asChild className="w-full bg-[#2302B3] hover:bg-[#1a0285] text-white rounded-xl">
                  <Link href="/register" onClick={() => setIsOpen(false)}>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Inscrire Mon École
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
