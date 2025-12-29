'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface MenuItem {
  icon: LucideIcon
  label: string
  href: string
  badge?: string | number
  subItems?: MenuItem[]
}

interface SidebarProps {
  menuItems: MenuItem[]
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ menuItems, isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside className={cn(
      'fixed top-16 left-0 bottom-0 w-64 bg-white border-r border-gray-200 z-30 transition-transform duration-300 overflow-y-auto',
      isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    )}>
      <nav className="p-3 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                'flex items-center justify-between px-4 py-3 rounded-xl transition-all group',
                isActive
                  ? 'bg-[#2302B3] text-white shadow-lg shadow-[#2302B3]/20'
                  : 'text-gray-700 hover:bg-gray-50'
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className={cn(
                  'w-5 h-5 transition-colors',
                  isActive ? 'text-white' : 'text-gray-500 group-hover:text-[#2302B3]'
                )} />
                <span className="font-medium text-sm">{item.label}</span>
              </div>
              {item.badge && (
                <span className={cn(
                  'px-2 py-0.5 rounded-full text-xs font-semibold',
                  isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
                )}>
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
