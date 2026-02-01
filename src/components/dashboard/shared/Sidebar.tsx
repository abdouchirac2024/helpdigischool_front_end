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
    <aside
      className={cn(
        'fixed bottom-0 left-0 top-16 z-30 w-64 overflow-y-auto border-r border-gray-200 bg-white transition-transform duration-300',
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}
    >
      <nav className="space-y-1 p-3">
        {menuItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (pathname.startsWith(item.href + '/') &&
              !menuItems.some(
                (other) =>
                  other.href !== item.href &&
                  other.href.length > item.href.length &&
                  (pathname === other.href || pathname.startsWith(other.href + '/'))
              ))
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                'group flex items-center justify-between rounded-xl px-4 py-3 transition-all',
                isActive
                  ? 'bg-[#2302B3] text-white shadow-lg shadow-[#2302B3]/20'
                  : 'text-gray-700 hover:bg-gray-50'
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon
                  className={cn(
                    'h-5 w-5 transition-colors',
                    isActive ? 'text-white' : 'text-gray-500 group-hover:text-[#2302B3]'
                  )}
                />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={cn(
                    'rounded-full px-2 py-0.5 text-xs font-semibold',
                    isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
                  )}
                >
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
