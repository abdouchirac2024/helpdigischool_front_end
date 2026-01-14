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
  Search,
  Plus,
  Check,
  X,
  Zap,
  Crown,
  Star,
  ArrowUpRight,
  Calendar,
  RefreshCw
} from 'lucide-react'
import { Sidebar, MenuItem } from '../../shared/Sidebar'
import { TopBar } from '../../shared/TopBar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

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

const plans = [
  {
    name: 'Starter',
    price: '29',
    icon: Zap,
    color: 'bg-blue-500',
    subscribers: 45,
    features: ['Jusqu\'à 100 élèves', '5 utilisateurs', 'Support email', 'Rapports basiques']
  },
  {
    name: 'Professional',
    price: '79',
    icon: Star,
    color: 'bg-purple-500',
    subscribers: 62,
    popular: true,
    features: ['Jusqu\'à 500 élèves', '20 utilisateurs', 'Support prioritaire', 'Rapports avancés', 'API Access']
  },
  {
    name: 'Enterprise',
    price: '199',
    icon: Crown,
    color: 'bg-orange-500',
    subscribers: 20,
    features: ['Élèves illimités', 'Utilisateurs illimités', 'Support 24/7', 'Rapports personnalisés', 'API illimitée', 'Formation incluse']
  },
]

const subscriptions = [
  { id: 1, school: 'Lycée Bilingue de Yaoundé', plan: 'Enterprise', status: 'active', startDate: '15/01/2024', endDate: '15/01/2025', amount: '€199/mois' },
  { id: 2, school: 'Collège Saint-Michel', plan: 'Professional', status: 'active', startDate: '01/03/2024', endDate: '01/03/2025', amount: '€79/mois' },
  { id: 3, school: 'École Primaire Akwa', plan: 'Starter', status: 'expiring', startDate: '10/01/2024', endDate: '10/01/2025', amount: '€29/mois' },
  { id: 4, school: 'Groupe Scolaire Excellence', plan: 'Professional', status: 'active', startDate: '20/06/2024', endDate: '20/06/2025', amount: '€79/mois' },
  { id: 5, school: 'Institut Polyvalent', plan: 'Enterprise', status: 'cancelled', startDate: '05/09/2023', endDate: '05/09/2024', amount: '€199/mois' },
]

export function AdminSubscriptionsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-100 text-green-700',
      expiring: 'bg-orange-100 text-orange-700',
      cancelled: 'bg-red-100 text-red-700'
    }
    const labels = {
      active: 'Actif',
      expiring: 'Expire bientôt',
      cancelled: 'Annulé'
    }
    return (
      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    )
  }

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
              <h1 className="text-3xl font-bold text-gray-900">Abonnements</h1>
              <p className="text-gray-600 mt-1">Gérez les plans et abonnements des écoles</p>
            </div>
            <Button className="bg-[#2302B3] hover:bg-[#1a0285] gap-2">
              <Plus className="w-4 h-4" />
              Nouveau plan
            </Button>
          </div>

          {/* Plans Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <div key={i} className={`bg-white rounded-2xl border-2 ${plan.popular ? 'border-[#2302B3]' : 'border-gray-100'} overflow-hidden relative`}>
                {plan.popular && (
                  <div className="absolute top-4 right-4">
                    <span className="text-xs font-semibold text-white bg-[#2302B3] px-3 py-1 rounded-full">
                      Populaire
                    </span>
                  </div>
                )}
                <div className={`${plan.color} p-6`}>
                  <plan.icon className="w-10 h-10 text-white mb-4" />
                  <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-4xl font-bold text-white">€{plan.price}</span>
                    <span className="text-white/70">/mois</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                    <span className="text-gray-600">Abonnés actifs</span>
                    <span className="text-2xl font-bold text-gray-900">{plan.subscribers}</span>
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                        <Check className="w-4 h-4 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="w-full mt-6">
                    Modifier le plan
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total abonnements</p>
                  <p className="text-2xl font-bold text-gray-900">127</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Revenus mensuels</p>
                  <p className="text-2xl font-bold text-gray-900">€12,450</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Taux de rétention</p>
                  <p className="text-2xl font-bold text-gray-900">94%</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">
                  <RefreshCw className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Expirent bientôt</p>
                  <p className="text-2xl font-bold text-orange-600">8</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Subscriptions Table */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Tous les abonnements</h3>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input placeholder="Rechercher..." className="pl-10" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-4 font-semibold text-gray-600">École</th>
                    <th className="text-left p-4 font-semibold text-gray-600">Plan</th>
                    <th className="text-left p-4 font-semibold text-gray-600">Statut</th>
                    <th className="text-left p-4 font-semibold text-gray-600">Période</th>
                    <th className="text-left p-4 font-semibold text-gray-600">Montant</th>
                    <th className="text-right p-4 font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {subscriptions.map((sub) => (
                    <tr key={sub.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="p-4">
                        <p className="font-semibold text-gray-900">{sub.school}</p>
                      </td>
                      <td className="p-4">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          sub.plan === 'Enterprise' ? 'bg-orange-100 text-orange-700' :
                          sub.plan === 'Professional' ? 'bg-purple-100 text-purple-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {sub.plan}
                        </span>
                      </td>
                      <td className="p-4">{getStatusBadge(sub.status)}</td>
                      <td className="p-4">
                        <p className="text-sm text-gray-600">{sub.startDate} - {sub.endDate}</p>
                      </td>
                      <td className="p-4">
                        <p className="font-semibold text-gray-900">{sub.amount}</p>
                      </td>
                      <td className="p-4 text-right">
                        <Button variant="ghost" size="sm" className="gap-1">
                          Gérer <ArrowUpRight className="w-4 h-4" />
                        </Button>
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