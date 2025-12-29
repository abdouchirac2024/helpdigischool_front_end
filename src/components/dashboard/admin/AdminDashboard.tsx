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
  Globe,
  FileText,
  Download,
  Calendar
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
            <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1">Écoles actives</p>
              <p className="text-3xl font-bold text-gray-900">127</p>
              <div className="flex items-center gap-1 mt-2">
                <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  +12 ce mois
                </span>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1">Utilisateurs totaux</p>
              <p className="text-3xl font-bold text-gray-900">2,458</p>
              <div className="flex items-center gap-1 mt-2">
                <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  +18%
                </span>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1">Revenus mensuels</p>
              <p className="text-3xl font-bold text-gray-900">€12,450</p>
              <div className="flex items-center gap-1 mt-2">
                <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  +24%
                </span>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1">Taux d'utilisation</p>
              <p className="text-3xl font-bold text-gray-900">87%</p>
              <div className="flex items-center gap-1 mt-2">
                <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  +5%
                </span>
              </div>
            </div>
          </div>

          {/* Actions rapides & Activité récente */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Actions rapides */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold mb-6">Actions rapides</h3>
              <div className="space-y-3">
                {[
                  { icon: Users, title: 'Inscrire une école', desc: 'Ajouter un nouvel établissement', color: 'bg-blue-50', iconColor: 'text-blue-600' },
                  { icon: Building2, title: 'Créer une classe', desc: 'Nouvelle classe scolaire', color: 'bg-purple-50', iconColor: 'text-purple-600' },
                  { icon: FileText, title: 'Saisir des notes', desc: 'Enregistrer les évaluations', color: 'bg-green-50', iconColor: 'text-green-600' },
                  { icon: Download, title: 'Générer les bulletins', desc: 'Créer des bulletins PDF', color: 'bg-orange-50', iconColor: 'text-orange-600' },
                  { icon: Calendar, title: 'Gérer les Périodes', desc: 'Configurer les périodes scolaires', color: 'bg-pink-50', iconColor: 'text-pink-600' },
                  { icon: Settings, title: 'Gérer les Niveaux', desc: "Configurer les niveaux d'étude", color: 'bg-indigo-50', iconColor: 'text-indigo-600' },
                ].map((action, i) => (
                  <button
                    key={i}
                    className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors text-left group"
                  >
                    <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <action.icon className={`w-6 h-6 ${action.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{action.title}</p>
                      <p className="text-sm text-gray-500">{action.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Activité récente */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold mb-6">Activité récente</h3>
              <div className="space-y-4">
                {[
                  { text: '1 nouvel enseignant ajouté', time: 'Cette semaine', icon: Users, color: 'text-blue-600' },
                  { text: 'École Primaire Akwa inscrite', time: 'Il y a 2h', icon: Building2, color: 'text-green-600' },
                  { text: '15 nouveaux paiements', time: 'Aujourd\'hui', icon: CreditCard, color: 'text-purple-600' },
                  { text: 'Mise à jour système effectuée', time: 'Hier', icon: Settings, color: 'text-orange-600' },
                ].map((activity, i) => (
                  <div key={i} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{activity.text}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
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
