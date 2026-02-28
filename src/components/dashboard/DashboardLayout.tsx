'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  FileText,
  CreditCard,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  GraduationCap,
  BarChart3,
  Calendar,
  BookOpen,
  Home,
  ChevronDown,
  User,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard', badge: null },
  { icon: Users, label: 'Élèves', href: '/dashboard/students', badge: '342' },
  { icon: BookOpen, label: 'Classes', href: '/dashboard/classes', badge: '12' },
  { icon: FileText, label: 'Notes', href: '/dashboard/grades', badge: null },
  { icon: BarChart3, label: 'Bulletins', href: '/dashboard/reports', badge: null },
  { icon: CreditCard, label: 'Paiements', href: '/dashboard/payments', badge: null },
  { icon: Calendar, label: 'Emploi du temps', href: '/dashboard/schedule', badge: null },
  { icon: Bell, label: 'Notifications', href: '/dashboard/notifications', badge: '5' },
  { icon: Settings, label: 'Paramètres', href: '/dashboard/settings', badge: null },
]

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  // Mock user data - In real app, this would come from auth context
  const user = {
    name: 'Jean Dupont',
    email: 'jean.dupont@ecole.cm',
    role: 'Directeur',
    school: 'École Primaire La Victoire',
  }

  const handleLogout = () => {
    // In real app, clear auth tokens/session
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <header className="fixed left-0 right-0 top-0 z-40 h-16 border-b border-gray-200 bg-white">
        <div className="flex h-full items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="rounded-lg p-2 hover:bg-gray-100 lg:hidden"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            {/* Logo - Links to Home */}
            <Link href="/" className="group flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary transition-transform group-hover:scale-105">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <span className="hidden text-lg font-bold text-primary sm:block">
                Help Digi School
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {/* School Name */}
            <span className="hidden text-sm text-gray-500 lg:block">{user.school}</span>

            {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 px-2 sm:px-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary">
                    <span className="text-sm font-semibold text-white">
                      {user.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </span>
                  </div>
                  <div className="hidden text-left md:block">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.role}</p>
                  </div>
                  <ChevronDown className="hidden h-4 w-4 text-gray-400 sm:block" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span className="font-medium">{user.name}</span>
                    <span className="text-xs font-normal text-gray-500">{user.email}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/" className="flex cursor-pointer items-center gap-2">
                    <Home className="h-4 w-4" />
                    Accueil
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="flex cursor-pointer items-center gap-2">
                    <LayoutDashboard className="h-4 w-4" />
                    Mon Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/dashboard/settings"
                    className="flex cursor-pointer items-center gap-2"
                  >
                    <User className="h-4 w-4" />
                    Mon Profil
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-red-600 focus:text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Déconnexion
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed bottom-0 left-0 top-16 z-30 w-64 border-r border-gray-200 bg-white transition-transform duration-300',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <nav className="space-y-1 p-4">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  'flex items-center justify-between rounded-xl px-4 py-3 transition-all',
                  isActive
                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                    : 'text-gray-600 hover:bg-gray-50'
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={cn(
                      'rounded-full px-2 py-0.5 text-xs font-medium',
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

      {/* Main Content */}
      <main className="min-h-screen pt-16 lg:ml-64">
        <div className="p-6">{children}</div>
      </main>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
