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
  Download,
  Activity,
  Eye,
  Clock,
  MousePointer,
  Globe,
  Smartphone,
  Monitor,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'
import { Sidebar, MenuItem } from '../../shared/Sidebar'
import { TopBar } from '../../shared/TopBar'
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

const topPages = [
  { page: '/dashboard', views: 45230, change: '+12%', up: true },
  { page: '/students', views: 32150, change: '+8%', up: true },
  { page: '/grades', views: 28900, change: '+15%', up: true },
  { page: '/payments', views: 21450, change: '-3%', up: false },
  { page: '/reports', views: 18200, change: '+22%', up: true },
]

const topSchools = [
  { name: 'Lycée Bilingue de Yaoundé', users: 156, sessions: 2340 },
  { name: 'Collège Saint-Michel', users: 98, sessions: 1820 },
  { name: 'École Primaire Akwa', users: 87, sessions: 1560 },
  { name: 'Groupe Scolaire Excellence', users: 76, sessions: 1340 },
  { name: 'Institut Polyvalent', users: 65, sessions: 1120 },
]

export function AdminAnalyticsPage() {
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

      <main className="lg:ml-64 pt-16 min-h-screen pb-20 lg:pb-0">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytiques</h1>
              <p className="text-gray-600 mt-1">Statistiques d'utilisation de la plateforme</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Exporter rapport
              </Button>
            </div>
          </div>

          {/* Main Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Eye className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex items-center gap-1 text-green-600">
                  <ArrowUpRight className="w-4 h-4" />
                  <span className="text-sm font-semibold">+18%</span>
                </div>
              </div>
              <p className="text-gray-500 text-sm mb-1">Pages vues</p>
              <p className="text-3xl font-bold text-gray-900">245,890</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                  <Activity className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex items-center gap-1 text-green-600">
                  <ArrowUpRight className="w-4 h-4" />
                  <span className="text-sm font-semibold">+12%</span>
                </div>
              </div>
              <p className="text-gray-500 text-sm mb-1">Sessions</p>
              <p className="text-3xl font-bold text-gray-900">52,340</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex items-center gap-1 text-green-600">
                  <ArrowUpRight className="w-4 h-4" />
                  <span className="text-sm font-semibold">+5%</span>
                </div>
              </div>
              <p className="text-gray-500 text-sm mb-1">Durée moyenne</p>
              <p className="text-3xl font-bold text-gray-900">8m 32s</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                  <MousePointer className="w-6 h-6 text-orange-600" />
                </div>
                <div className="flex items-center gap-1 text-red-600">
                  <ArrowDownRight className="w-4 h-4" />
                  <span className="text-sm font-semibold">-2%</span>
                </div>
              </div>
              <p className="text-gray-500 text-sm mb-1">Taux de rebond</p>
              <p className="text-3xl font-bold text-gray-900">24%</p>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Devices */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold mb-6">Appareils utilisés</h3>
              <div className="space-y-4">
                {[
                  { icon: Monitor, label: 'Desktop', value: 58, color: 'bg-blue-500' },
                  { icon: Smartphone, label: 'Mobile', value: 35, color: 'bg-purple-500' },
                  { icon: Globe, label: 'Tablet', value: 7, color: 'bg-orange-500' },
                ].map((device, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
                      <device.icon className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">{device.label}</span>
                        <span className="text-sm font-bold text-gray-900">{device.value}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full ${device.color}`} style={{ width: `${device.value}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Pages */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold mb-6">Pages les plus visitées</h3>
              <div className="space-y-3">
                {topPages.map((page, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-[#2302B3] text-white text-xs flex items-center justify-center font-bold">
                        {i + 1}
                      </span>
                      <span className="font-medium text-gray-900">{page.page}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-gray-600">{page.views.toLocaleString()}</span>
                      <span className={`text-sm font-semibold ${page.up ? 'text-green-600' : 'text-red-600'}`}>
                        {page.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Schools */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">Écoles les plus actives</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-4 font-semibold text-gray-600">#</th>
                    <th className="text-left p-4 font-semibold text-gray-600">École</th>
                    <th className="text-right p-4 font-semibold text-gray-600">Utilisateurs actifs</th>
                    <th className="text-right p-4 font-semibold text-gray-600">Sessions</th>
                    <th className="text-right p-4 font-semibold text-gray-600">Engagement</th>
                  </tr>
                </thead>
                <tbody>
                  {topSchools.map((school, i) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="p-4">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          i < 3 ? 'bg-[#2302B3] text-white' : 'bg-gray-200 text-gray-600'
                        }`}>
                          {i + 1}
                        </span>
                      </td>
                      <td className="p-4 font-semibold text-gray-900">{school.name}</td>
                      <td className="p-4 text-right text-gray-600">{school.users}</td>
                      <td className="p-4 text-right text-gray-600">{school.sessions.toLocaleString()}</td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-[#2302B3]" style={{ width: `${Math.min(school.users / 2, 100)}%` }} />
                          </div>
                          <span className="text-sm font-semibold text-[#2302B3]">
                            {Math.round(school.sessions / school.users)}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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