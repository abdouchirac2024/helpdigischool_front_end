'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LucideIcon, ChevronDown, Lock } from 'lucide-react'
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
  disabled?: boolean
}

export function Sidebar({ menuItems, isOpen, onClose, disabled = false }: SidebarProps) {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>(() => {
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

  // First item (Vue d'ensemble) is always accessible
  const overviewHref = menuItems[0]?.href

  return (
    <aside
      className={cn(
        'fixed bottom-0 left-0 top-16 z-30 w-64 overflow-y-auto border-r border-gray-200 bg-white transition-transform duration-300',
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}
    >
      <nav className="space-y-1 p-3">
        {menuItems.map((item, index) => {
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

          // First item is always enabled; others are disabled when school is not validated
          const isItemDisabled = disabled && index > 0

          if (hasSubItems) {
            if (isItemDisabled) {
              return (
                <div key={item.href} className="group relative">
                  <div className="flex w-full cursor-not-allowed items-center justify-between rounded-xl px-4 py-3 opacity-40">
                    <div className="flex items-center gap-3">
                      <item.icon className="h-5 w-5 text-gray-400" />
                      <span className="text-sm font-medium text-gray-400">{item.label}</span>
                    </div>
                    <Lock className="h-3.5 w-3.5 text-gray-400" />
                  </div>
                  <div className="pointer-events-none absolute left-1/2 top-full z-50 mt-1 -translate-x-1/2 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-1.5 text-xs text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                    En attente de validation
                  </div>
                </div>
              )
            }

            return (
              <div key={item.href}>
                <button
                  onClick={() => toggleExpand(item.href)}
                  className={cn(
                    'group flex w-full items-center justify-between rounded-xl px-4 py-3 transition-all',
                    isSubActive
                      ? 'bg-primary/[0.08] text-primary'
                      : 'text-gray-700 hover:bg-gray-50'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon
                      className={cn(
                        'h-5 w-5 transition-colors',
                        isSubActive ? 'text-primary' : 'text-gray-500'
                      )}
                    />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 transition-transform',
                      isExpanded ? 'rotate-180' : '',
                      isSubActive ? 'text-primary' : 'text-gray-400'
                    )}
                  />
                </button>
                {isExpanded && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-100 pl-3">
                    {item.subItems!.map((sub) => {
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
                              ? 'bg-primary text-white shadow-md shadow-primary/20'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                          )}
                        >
                          <sub.icon
                            className={cn(
                              'h-4 w-4',
                              isSubItemActive ? 'text-white' : 'text-gray-400'
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

          // Non-expandable item
          if (isItemDisabled) {
            return (
              <div key={item.href} className="group relative">
                <div className="flex cursor-not-allowed items-center justify-between rounded-xl px-4 py-3 opacity-40">
                  <div className="flex items-center gap-3">
                    <item.icon className="h-5 w-5 text-gray-400" />
                    <span className="text-sm font-medium text-gray-400">{item.label}</span>
                  </div>
                  <Lock className="h-3.5 w-3.5 text-gray-400" />
                </div>
                <div className="pointer-events-none absolute left-1/2 top-full z-50 mt-1 -translate-x-1/2 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-1.5 text-xs text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                  En attente de validation
                </div>
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
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'text-gray-700 hover:bg-gray-50'
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon
                  className={cn(
                    'h-5 w-5 transition-colors',
                    isActive ? 'text-white' : 'text-gray-500'
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
