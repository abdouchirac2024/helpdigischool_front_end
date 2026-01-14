'use client'

import { useState } from 'react'
import { 
  LayoutDashboard,
  Users,
  FileText,
  CreditCard,
  Bell,
  Settings,
  BarChart3,
  Calendar,
  BookOpen,
  GraduationCap,
  TrendingUp
} from 'lucide-react'
import { Sidebar, MenuItem } from './shared/Sidebar'
import { TopBar } from './shared/TopBar'
import { StatCard } from './shared/StatCard'
import { Button } from '@/components/ui/button'

const menuItems: MenuItem[] = [
  { icon: LayoutDashboard, label: 'Vue d\'ensemble', href: '/dashboard/director' },
  { icon: Users, label: 'Élèves', href: '/dashboard/director/students', badge: '342' },
  { icon: BookOpen, label: 'Classes', href: '/dashboard/director/classes', badge: '12' },
  { icon: GraduationCap, label: 'Enseignants', href: '/dashboard/director/teachers', badge: '18' },
  { icon: FileText, label: 'Notes & Bulletins', href: '/dashboard/director/grades' },
  { icon: CreditCard, label: 'Paiements', href: '/dashboard/director/payments' },
  { icon: Calendar, label: 'Emploi du temps', href: '/dashboard/director/schedule' },
  { icon: BarChart3, label: 'Statistiques', href: '/dashboard/director/stats' },
  { icon: Bell, label: 'Notifications', href: '/dashboard/director/notifications', badge: '5' },
  { icon: Settings, label: 'Paramètres', href: '/dashboard/director/settings' },
]

export function DirectorDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar 
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />
      
      <Sidebar 
        menuItems={menuItems}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="lg:ml-64 pt-16 min-h-screen">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">Vue d'ensemble de votre école</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2">
                <TrendingUp className="w-4 h-4" />
                Statistiques
              </Button>
              <Button className="bg-[#2302B3] hover:bg-[#1a0285] gap-2">
                Ajouter Élève
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Élèves inscrits</p>
                  <p className="text-3xl font-bold text-gray-900">342</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-blue-600 font-semibold">♂ 178 Garçons</span>
                    <span className="text-xs text-pink-600 font-semibold">♀ 164 Filles</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                +12 ce mois
              </span>
            </div>
            
            <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Paiements</p>
                  <p className="text-3xl font-bold text-gray-900">€80.9k</p>
                  <p className="text-xs text-gray-500 mt-1">Revenus ce mois</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                +8.2%
              </span>
            </div>
            
            <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Enseignants</p>
                  <p className="text-3xl font-bold text-gray-900">18</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-blue-600 font-semibold">♂ 7 Hommes</span>
                    <span className="text-xs text-pink-600 font-semibold">♀ 11 Femmes</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-orange-600" />
                </div>
              </div>
              <span className="text-xs font-semibold text-gray-600 bg-gray-50 px-2 py-1 rounded-full">
                Actifs
              </span>
            </div>
            
            <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Taux de réussite</p>
                  <p className="text-3xl font-bold text-gray-900">94%</p>
                  <p className="text-xs text-gray-500 mt-1">Moyenne générale</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                +2.5%
              </span>
            </div>
          </div>

          {/* Charts and Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activities */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold mb-4">Activités récentes</h3>
              <div className="space-y-3">
                {[
                  { icon: FileText, text: '12 bulletins générés', time: 'Il y a 5 min', color: 'bg-yellow-50', iconColor: 'text-yellow-600' },
                  { icon: CreditCard, text: 'Paiement reçu - 25,000 FCFA', time: 'Il y a 15 min', color: 'bg-green-50', iconColor: 'text-green-600' },
                  { icon: Bell, text: 'SMS envoyés aux parents CM2', time: 'Il y a 1h', color: 'bg-blue-50', iconColor: 'text-blue-600' },
                  { icon: Users, text: 'Nouvelle inscription - Paul Ngo', time: 'Il y a 2h', color: 'bg-purple-50', iconColor: 'text-purple-600' },
                ].map((activity, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50">
                    <div className={`w-10 h-10 rounded-lg ${activity.color} flex items-center justify-center`}>
                      <activity.icon className={`w-5 h-5 ${activity.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.text}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Class Distribution */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold mb-4">Répartition par classe</h3>
              <div className="space-y-3">
                {[
                  { class: 'CM2', students: 58, color: 'bg-blue-500' },
                  { class: 'CM1', students: 62, color: 'bg-green-500' },
                  { class: 'CE2', students: 54, color: 'bg-yellow-500' },
                  { class: 'CE1', students: 60, color: 'bg-orange-500' },
                  { class: 'CP', students: 56, color: 'bg-purple-500' },
                  { class: 'SIL', students: 52, color: 'bg-pink-500' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-sm font-medium w-12">{item.class}</span>
                    <div className="flex-1 h-8 bg-gray-100 rounded-lg overflow-hidden">
                      <div 
                        className={`h-full ${item.color} flex items-center justify-end px-3`}
                        style={{ width: `${(item.students / 62) * 100}%` }}
                      >
                        <span className="text-xs font-semibold text-white">{item.students}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <h3 className="text-lg font-semibold mb-4">Actions rapides</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <Users className="w-6 h-6" />
                <span className="text-sm">Gérer Élèves</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <FileText className="w-6 h-6" />
                <span className="text-sm">Bulletins</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <CreditCard className="w-6 h-6" />
                <span className="text-sm">Paiements</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <Bell className="w-6 h-6" />
                <span className="text-sm">Notifications</span>
              </Button>
            </div>
          </div>
        </div>
      </main>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
