'use client'

import { useState } from 'react'
import { 
  LayoutDashboard,
  Building2,
  Users,
  CreditCard,
  TrendingUp,
  Settings,
  BarChart3,
  Shield,
  Database,
  Globe
} from 'lucide-react'
import { Sidebar, MenuItem } from '../shared/Sidebar'
import { TopBar } from '../shared/TopBar'
import { StatCard } from '../shared/StatCard'
import { Button } from '@/components/ui/button'

const menuItems: MenuItem[] = [
  { icon: LayoutDashboard, label: 'Vue d\'ensemble', href: '/dashboard/admin' },
  { icon: Building2, label: 'Écoles', href: '/dashboard/admin/schools', badge: '127' },
  { icon: Users, label: 'Utilisateurs', href: '/dashboard/admin/users', badge: '2.4k' },
  { icon: CreditCard, label: 'Abonnements', href: '/dashboard/admin/subscriptions' },
  { icon: TrendingUp, label: 'Revenus', href: '/dashboard/admin/revenue' },
  { icon: BarChart3, label: 'Analytiques', href: '/dashboard/admin/analytics' },
  { icon: Database, label: 'Base de données', href: '/dashboard/admin/database' },
  { icon: Shield, label: 'Sécurité', href: '/dashboard/admin/security' },
  { icon: Settings, label: 'Paramètres', href: '/dashboard/admin/settings' },
]

export function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar 
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        schoolName="Admin SaaS"
        userName="Admin Principal"
        userRole="Super Admin"
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
              <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin SaaS</h1>
              <p className="text-gray-600 mt-1">Vue d'ensemble de la plateforme</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2">
                <Globe className="w-4 h-4" />
                Toutes les régions
              </Button>
              <Button className="bg-[#2302B3] hover:bg-[#1a0285] gap-2">
                Nouvelle École
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Écoles actives"
              value="127"
              subtitle="Sur 10 régions"
              icon={Building2}
              iconColor="text-blue-600"
              iconBg="bg-blue-50"
              trend="+12 ce mois"
              trendUp={true}
            />
            <StatCard
              title="Utilisateurs totaux"
              value="2,458"
              subtitle="Tous rôles confondus"
              icon={Users}
              iconColor="text-green-600"
              iconBg="bg-green-50"
              trend="+18%"
              trendUp={true}
            />
            <StatCard
              title="Revenus mensuels"
              value="€12,450"
              subtitle="Abonnements actifs"
              icon={CreditCard}
              iconColor="text-purple-600"
              iconBg="bg-purple-50"
              trend="+24%"
              trendUp={true}
            />
            <StatCard
              title="Taux d'utilisation"
              value="87%"
              subtitle="Engagement moyen"
              icon={TrendingUp}
              iconColor="text-orange-600"
              iconBg="bg-orange-50"
              trend="+5%"
              trendUp={true}
            />
          </div>

          {/* Charts and Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Schools */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold mb-4">Écoles récemment inscrites</h3>
              <div className="space-y-3">
                {[
                  { name: 'École Primaire Akwa', region: 'Littoral', date: 'Il y a 2h' },
                  { name: 'École La Victoire', region: 'Centre', date: 'Il y a 5h' },
                  { name: 'École Saint-Michel', region: 'Ouest', date: 'Hier' },
                  { name: 'École Les Étoiles', region: 'Sud', date: 'Il y a 2j' },
                ].map((school, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#2302B3]/10 flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-[#2302B3]" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{school.name}</p>
                        <p className="text-xs text-gray-500">{school.region}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">{school.date}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Revenue Chart Placeholder */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold mb-4">Évolution des revenus</h3>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-xl">
                <p className="text-gray-400">Graphique des revenus</p>
              </div>
            </div>
          </div>

          {/* Regional Distribution */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <h3 className="text-lg font-semibold mb-4">Distribution par région</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { region: 'Centre', count: 28 },
                { region: 'Littoral', count: 35 },
                { region: 'Ouest', count: 18 },
                { region: 'Nord-Ouest', count: 12 },
                { region: 'Sud-Ouest', count: 15 },
                { region: 'Nord', count: 8 },
                { region: 'Adamaoua', count: 5 },
                { region: 'Est', count: 3 },
                { region: 'Sud', count: 2 },
                { region: 'Extrême-Nord', count: 1 },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                  <p className="text-2xl font-bold text-[#2302B3]">{item.count}</p>
                  <p className="text-sm text-gray-600">{item.region}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
