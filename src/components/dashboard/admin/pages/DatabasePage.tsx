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
  HardDrive,
  Server,
  Activity,
  RefreshCw,
  Download,
  Upload,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Cpu
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

const tables = [
  { name: 'users', rows: '2,458', size: '45 MB', lastUpdated: 'Il y a 5 min' },
  { name: 'schools', rows: '127', size: '12 MB', lastUpdated: 'Il y a 10 min' },
  { name: 'students', rows: '45,230', size: '890 MB', lastUpdated: 'Il y a 2 min' },
  { name: 'grades', rows: '234,500', size: '1.2 GB', lastUpdated: 'Il y a 1 min' },
  { name: 'payments', rows: '15,890', size: '156 MB', lastUpdated: 'Il y a 15 min' },
  { name: 'attendance', rows: '456,780', size: '2.1 GB', lastUpdated: 'Il y a 3 min' },
]

const backups = [
  { date: '14/01/2025 02:00', size: '4.5 GB', status: 'success', type: 'Auto' },
  { date: '13/01/2025 02:00', size: '4.4 GB', status: 'success', type: 'Auto' },
  { date: '12/01/2025 02:00', size: '4.3 GB', status: 'success', type: 'Auto' },
  { date: '11/01/2025 15:30', size: '4.3 GB', status: 'success', type: 'Manuel' },
  { date: '10/01/2025 02:00', size: '4.2 GB', status: 'failed', type: 'Auto' },
]

export function AdminDatabasePage() {
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
              <h1 className="text-3xl font-bold text-gray-900">Base de données</h1>
              <p className="text-gray-600 mt-1">Monitoring et gestion des données</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2">
                <RefreshCw className="w-4 h-4" />
                Actualiser
              </Button>
              <Button className="bg-[#2302B3] hover:bg-[#1a0285] gap-2">
                <Download className="w-4 h-4" />
                Backup manuel
              </Button>
            </div>
          </div>

          {/* Database Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                  <HardDrive className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Stockage utilisé</p>
                  <p className="text-2xl font-bold text-gray-900">4.5 GB</p>
                  <p className="text-xs text-gray-400">sur 50 GB</p>
                </div>
              </div>
              <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500" style={{ width: '9%' }} />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                  <Server className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">État serveur</p>
                  <p className="text-2xl font-bold text-green-600">En ligne</p>
                  <p className="text-xs text-gray-400">Uptime: 99.9%</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">
                  <Activity className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Requêtes/sec</p>
                  <p className="text-2xl font-bold text-gray-900">1,245</p>
                  <p className="text-xs text-gray-400">Temps moyen: 45ms</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                  <Cpu className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Utilisation CPU</p>
                  <p className="text-2xl font-bold text-gray-900">23%</p>
                  <p className="text-xs text-gray-400">RAM: 45%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tables & Backups */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Tables */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900">Tables principales</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {tables.map((table, i) => (
                  <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#2302B3]/10 flex items-center justify-center">
                        <Database className="w-5 h-5 text-[#2302B3]" />
                      </div>
                      <div>
                        <p className="font-mono font-semibold text-gray-900">{table.name}</p>
                        <p className="text-xs text-gray-500">{table.rows} lignes • {table.size}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400">{table.lastUpdated}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Backups */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Sauvegardes récentes</h3>
                <Button variant="ghost" size="sm" className="gap-1">
                  <Upload className="w-4 h-4" />
                  Restaurer
                </Button>
              </div>
              <div className="divide-y divide-gray-50">
                {backups.map((backup, i) => (
                  <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        backup.status === 'success' ? 'bg-green-50' : 'bg-red-50'
                      }`}>
                        {backup.status === 'success' ? (
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                        ) : (
                          <AlertTriangle className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{backup.date}</p>
                        <p className="text-xs text-gray-500">{backup.size} • {backup.type}</p>
                      </div>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      backup.status === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {backup.status === 'success' ? 'Succès' : 'Échec'}
                    </span>
                  </div>
                ))}
              </div>
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