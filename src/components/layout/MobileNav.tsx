'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
    Home,
    Sparkles,
    CreditCard,
    LogIn
} from 'lucide-react'

const navLinks = [
    { href: '/', label: 'Accueil', icon: Home },
    { href: '/features', label: 'Services', icon: Sparkles },
    { href: '/pricing', label: 'Tarifs', icon: CreditCard },
    { href: '/login', label: 'Compte', icon: LogIn },
]

export function MobileNav() {
    const pathname = usePathname()

    // Only show on mobile
    return (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[100] pb-[env(safe-area-inset-bottom)] bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
            <nav className="flex justify-around items-center px-2 py-2">
                {navLinks.map((link) => {
                    const isActive = pathname === link.href

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="flex flex-col items-center justify-center gap-1 min-w-[64px] py-1 transition-all active:scale-95"
                        >
                            <div className={cn(
                                'relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300',
                                isActive
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-gray-400'
                            )}>
                                <link.icon className={cn(
                                    'w-5 h-5 transition-all',
                                    isActive ? 'stroke-[2.5px]' : 'stroke-2'
                                )} />
                            </div>
                            <span className={cn(
                                'text-[10px] font-medium transition-colors',
                                isActive ? 'text-primary' : 'text-gray-400'
                            )}>
                                {link.label}
                            </span>
                        </Link>
                    )
                })}
            </nav>
        </div>
    )
}
