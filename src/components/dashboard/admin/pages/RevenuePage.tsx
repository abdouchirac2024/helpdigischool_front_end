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
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Wallet,
  PiggyBank,
  Receipt
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

const monthlyData = [
  { month: 'Jan', revenue: 9800, target: 10000 },
  { month: 'Fév', revenue: 10200, target: 10000 },
  { month: 'Mar', revenue: 10800, target: 10500 },
  { month: 'Avr', revenue: 11200, target: 11000 },
  { month: 'Mai', revenue: 11500, target: 11000 },
  { month: 'Jun', revenue: 11800, target: 11500 },
  { month: 'Jul', revenue: 10500, target: 11500 },
  { month: 'Aoû', revenue: 9800, target: 10000 },
  { month: 'Sep', revenue: 12000, target: 12000 },
  { month: 'Oct', revenue: 12200, target: 12000 },
  { month: 'Nov', revenue: 12100, target: 12000 },
  { month: 'Déc', revenue: 12450, target: 12500 },
]

const transactions = [
  { id: 1, school: 'Lycée Bilingue de Yaoundé', type: 'Abonnement', amount: '+€199', date: 'Aujourd\'hui 14:30', status: 'completed' },
  { id: 2, school: 'Collège Saint-Michel', type: 'Abonnement', amount: '+€79', date: 'Aujourd\'hui 11:15', status: 'completed' },
  { id: 3, school: 'École Primaire Akwa', type: 'Renouvellement', amount: '+€29', date: 'Hier 16:45', status: 'completed' },
  { id: 4, school: 'Groupe Scolaire Excellence', type: 'Abonnement', amount: '+€79', date: 'Hier 09:20', status: 'completed' },
  { id: 5, school: 'Institut Polyvalent', type: 'Remboursement', amount: '-€199', date: '12/01/2025', status: 'refunded' },
  { id: 6, school: 'Collège Protestant', type: 'Abonnement', amount: '+€79', date: '11/01/2025', status: 'completed' },
]

export function AdminRevenuePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [period, setPeriod] = useState('year')

  const maxRevenue = Math.max(...monthlyData.map(d => d.revenue))

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
              <h1 className="text-3xl font-bold text-gray-900">Revenus</h1>
              <p className="text-gray-600 mt-1">Suivi des revenus et transactions</p>
            </div>
            <div className="flex gap-3">
              <div className="flex bg-white rounded-lg border border-gray-200 p-1">
                {['week', 'month', 'year'].map((p) => (
                  <Button
                    key={p}
                    variant="ghost"
                    size="sm"
                    onClick={() => setPeriod(p)}
                    className={period === p ? 'bg-[#2302B3] text-white hover:bg-[#1a0285]' : ''}
                  >
                    {p === 'week' ? 'Semaine' : p === 'month' ? 'Mois' : 'Année'}
                  </Button>
                ))}
              </div>
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Exporter
              </Button>
            </div>
          </div>

          {/* Revenue Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-[#2302B3] to-[#4318FF] rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center gap-1 text-green-300">
                  <ArrowUpRight className="w-4 h-4" />
                  <span className="text-sm font-semibold">+24%</span>
                </div>
              </div>
              <p className="text-white/70 text-sm mb-1">Revenus totaux</p>
              <p className="text-3xl font-bold">€134,850</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex items-center gap-1 text-green-600">
                  <ArrowUpRight className="w-4 h-4" />
                  <span className="text-sm font-semibold">+18%</span>
                </div>
              </div>
              <p className="text-gray-500 text-sm mb-1">Ce mois</p>
              <p className="text-3xl font-bold text-gray-900">€12,450</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                  <PiggyBank className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex items-center gap-1 text-green-600">
                  <ArrowUpRight className="w-4 h-4" />
                  <span className="text-sm font-semibold">+5%</span>
                </div>
              </div>
              <p className="text-gray-500 text-sm mb-1">Revenu moyen/école</p>
              <p className="text-3xl font-bold text-gray-900">€98</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                  <Receipt className="w-6 h-6 text-orange-600" />
                </div>
                <div className="flex items-center gap-1 text-red-600">
                  <ArrowDownRight className="w-4 h-4" />
                  <span className="text-sm font-semibold">-2%</span>
                </div>
              </div>
              <p className="text-gray-500 text-sm mb-1">Remboursements</p>
              <p className="text-3xl font-bold text-gray-900">€850</p>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <h3 className="text-lg font-semibold mb-6">Évolution des revenus</h3>
            <div className="h-64 flex items-end gap-2">
              {monthlyData.map((data, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex flex-col items-center gap-1" style={{ height: '200px' }}>
                    <div
                      className="w-full bg-[#2302B3] rounded-t-lg transition-all hover:bg-[#4318FF]"
                      style={{ height: `${(data.revenue / maxRevenue) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500">{data.month}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-[#2302B3]" />
                <span className="text-sm text-gray-600">Revenus réels</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-gray-300" />
                <span className="text-sm text-gray-600">Objectif</span>
              </div>
            </div>
          </div>

          {/* Transactions */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Transactions récentes</h3>
              <Button variant="ghost" size="sm">Voir tout</Button>
            </div>
            <div className="divide-y divide-gray-50">
              {transactions.map((tx) => (
                <div key={tx.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      tx.status === 'refunded' ? 'bg-red-50' : 'bg-green-50'
                    }`}>
                      <CreditCard className={`w-5 h-5 ${
                        tx.status === 'refunded' ? 'text-red-600' : 'text-green-600'
                      }`} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{tx.school}</p>
                      <p className="text-sm text-gray-500">{tx.type} • {tx.date}</p>
                    </div>
                  </div>
                  <span className={`text-lg font-bold ${
                    tx.amount.startsWith('-') ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {tx.amount}
                  </span>
                </div>
              ))}
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