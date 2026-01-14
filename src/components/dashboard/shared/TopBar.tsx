'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  GraduationCap,
  Menu,
  X,
  Bell,
  User,
  LogOut,
  Settings
} from 'lucide-react'
import { useAuth } from '@/lib/auth'
import { useToast } from '@/hooks/use-toast'

interface TopBarProps {
  sidebarOpen: boolean
  onToggleSidebar: () => void
  schoolName?: string
  userName?: string
  userRole?: string
}

export function TopBar({
  sidebarOpen,
  onToggleSidebar,
  schoolName = 'École Primaire La Victoire',
  userName = 'Jean Dupont',
  userRole = 'Directeur'
}: TopBarProps) {
  const { logout } = useAuth()
  const { toast } = useToast()

  const handleLogout = async () => {
    try {
      await logout()
      toast({
        title: 'Déconnexion réussie',
        description: 'À bientôt!',
      })
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Erreur lors de la déconnexion',
        variant: 'destructive',
      })
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-40">
      <div className="h-full px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2302B3] to-[#4318FF] flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-base">DigiSchool</span>
              <p className="text-xs text-gray-500">{schoolName}</p>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>

          <div className="hidden md:flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2302B3] to-[#4318FF] flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="text-sm">
              <p className="font-medium">{userName}</p>
              <p className="text-xs text-gray-500">{userRole}</p>
            </div>
          </div>

          <Button variant="ghost" size="sm">
            <Settings className="w-5 h-5" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
