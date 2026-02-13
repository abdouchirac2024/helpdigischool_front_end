'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LucideIcon, ChevronDown } from 'lucide-react'
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
  const [expandedItems, setExpandedItems] = useState<string[]>(() => {
    // Auto-expand parent if a sub-item is active
    const expanded: string[] = []
    menuItems.forEach((item) => {
      if (
        item.subItems?.some((sub) => pathname === sub.href || pathname.startsWith(sub.href + '/'))
      ) {
        expanded.push(item.href)
      }
    })
    return expanded
  })

  function toggleExpand(href: string) {
    setExpandedItems((prev) =>
      prev.includes(href) ? prev.filter((h) => h !== href) : [...prev, href]
    )
  }

  return (
    <aside
      className={cn(
        'fixed bottom-0 left-0 top-16 z-30 w-64 overflow-y-auto border-r border-gray-200 bg-white transition-transform duration-300',
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}
    >
      <nav className="space-y-1 p-3">
        {menuItems.map((item) => {
          const hasSubItems = item.subItems && item.subItems.length > 0
          const isExpanded = expandedItems.includes(item.href)
          const isSubActive =
            hasSubItems &&
            item.subItems!.some(
              (sub) => pathname === sub.href || pathname.startsWith(sub.href + '/')
            )
          const isActive =
            !hasSubItems &&
            (pathname === item.href ||
              (pathname.startsWith(item.href + '/') &&
                !menuItems.some(
                  (other) =>
                    other.href !== item.href &&
                    other.href.length > item.href.length &&
                    (pathname === other.href || pathname.startsWith(other.href + '/'))
                )))

          if (hasSubItems) {
            return (
              <div key={item.href}>
                <button
                  onClick={() => toggleExpand(item.href)}
                  className={cn(
                    'group flex w-full items-center justify-between rounded-xl px-4 py-3 transition-all',
                    isSubActive
                      ? 'bg-[#2302B3]/10 text-[#2302B3]'
                      : 'text-gray-700 hover:bg-gray-50'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon
                      className={cn(
                        'h-5 w-5 transition-colors',
                        isSubActive ? 'text-[#2302B3]' : 'text-gray-500 group-hover:text-[#2302B3]'
                      )}
                    />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 transition-transform',
                      isExpanded ? 'rotate-180' : '',
                      isSubActive ? 'text-[#2302B3]' : 'text-gray-400'
                    )}
                  />
                </button>
                {isExpanded && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-100 pl-3">
                    {item.subItems!.map((sub) => {
                      // Check if current path matches this sub-item exactly or starts with it
                      // But exclude if there's a more specific sub-item that matches
                      const isExactMatch = pathname === sub.href
                      const isPathMatch = pathname.startsWith(sub.href + '/')
                      const hasMoreSpecificMatch = item.subItems!.some(
                        (other) =>
                          other.href !== sub.href &&
                          other.href.length > sub.href.length &&
                          (pathname === other.href || pathname.startsWith(other.href + '/'))
                      )
                      const isSubItemActive = isExactMatch || (isPathMatch && !hasMoreSpecificMatch)
                      return (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={onClose}
                          className={cn(
                            'group flex items-center gap-3 rounded-lg px-3 py-2 transition-all',
                            isSubItemActive
                              ? 'bg-[#2302B3] text-white shadow-md shadow-[#2302B3]/20'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                          )}
                        >
                          <sub.icon
                            className={cn(
                              'h-4 w-4',
                              isSubItemActive
                                ? 'text-white'
                                : 'text-gray-400 group-hover:text-[#2302B3]'
                            )}
                          />
                          <span className="text-sm">{sub.label}</span>
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          }

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
