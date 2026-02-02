'use client'

import { Users, FileText, CreditCard, Bell, GraduationCap, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function DirectorDashboard() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-gray-600">Vue d'ensemble de votre école</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <TrendingUp className="h-4 w-4" />
            Statistiques
          </Button>
          <Button className="gap-2 bg-[#2302B3] hover:bg-[#1a0285]">Ajouter Élève</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 transition-all hover:shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="mb-1 text-sm text-gray-600">Élèves inscrits</p>
              <p className="text-3xl font-bold text-gray-900">342</p>
              <div className="mt-2 flex items-center gap-3">
                <span className="text-xs font-semibold text-blue-600">♂ 178 Garçons</span>
                <span className="text-xs font-semibold text-pink-600">♀ 164 Filles</span>
              </div>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <span className="rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
            +12 ce mois
          </span>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 transition-all hover:shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="mb-1 text-sm text-gray-600">Paiements</p>
              <p className="text-3xl font-bold text-gray-900">€80.9k</p>
              <p className="mt-1 text-xs text-gray-500">Revenus ce mois</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50">
              <CreditCard className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <span className="rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
            +8.2%
          </span>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 transition-all hover:shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="mb-1 text-sm text-gray-600">Enseignants</p>
              <p className="text-3xl font-bold text-gray-900">18</p>
              <div className="mt-2 flex items-center gap-3">
                <span className="text-xs font-semibold text-blue-600">♂ 7 Hommes</span>
                <span className="text-xs font-semibold text-pink-600">♀ 11 Femmes</span>
              </div>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50">
              <GraduationCap className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <span className="rounded-full bg-gray-50 px-2 py-1 text-xs font-semibold text-gray-600">
            Actifs
          </span>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 transition-all hover:shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="mb-1 text-sm text-gray-600">Taux de réussite</p>
              <p className="text-3xl font-bold text-gray-900">94%</p>
              <p className="mt-1 text-xs text-gray-500">Moyenne générale</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <span className="rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
            +2.5%
          </span>
        </div>
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Activities */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <h3 className="mb-4 text-lg font-semibold">Activités récentes</h3>
          <div className="space-y-3">
            {[
              {
                icon: FileText,
                text: '12 bulletins générés',
                time: 'Il y a 5 min',
                color: 'bg-yellow-50',
                iconColor: 'text-yellow-600',
              },
              {
                icon: CreditCard,
                text: 'Paiement reçu - 25,000 FCFA',
                time: 'Il y a 15 min',
                color: 'bg-green-50',
                iconColor: 'text-green-600',
              },
              {
                icon: Bell,
                text: 'SMS envoyés aux parents CM2',
                time: 'Il y a 1h',
                color: 'bg-blue-50',
                iconColor: 'text-blue-600',
              },
              {
                icon: Users,
                text: 'Nouvelle inscription - Paul Ngo',
                time: 'Il y a 2h',
                color: 'bg-purple-50',
                iconColor: 'text-purple-600',
              },
            ].map((activity, i) => (
              <div key={i} className="flex items-center gap-4 rounded-lg p-3 hover:bg-gray-50">
                <div
                  className={`h-10 w-10 rounded-lg ${activity.color} flex items-center justify-center`}
                >
                  <activity.icon className={`h-5 w-5 ${activity.iconColor}`} />
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
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <h3 className="mb-4 text-lg font-semibold">Répartition par classe</h3>
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
                <span className="w-12 text-sm font-medium">{item.class}</span>
                <div className="h-8 flex-1 overflow-hidden rounded-lg bg-gray-100">
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
      <div className="rounded-2xl border border-gray-100 bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold">Actions rapides</h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <Button variant="outline" className="h-auto flex-col gap-2 py-4">
            <Users className="h-6 w-6" />
            <span className="text-sm">Gérer Élèves</span>
          </Button>
          <Button variant="outline" className="h-auto flex-col gap-2 py-4">
            <FileText className="h-6 w-6" />
            <span className="text-sm">Bulletins</span>
          </Button>
          <Button variant="outline" className="h-auto flex-col gap-2 py-4">
            <CreditCard className="h-6 w-6" />
            <span className="text-sm">Paiements</span>
          </Button>
          <Button variant="outline" className="h-auto flex-col gap-2 py-4">
            <Bell className="h-6 w-6" />
            <span className="text-sm">Notifications</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
