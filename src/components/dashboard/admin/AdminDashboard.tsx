'use client'

import {
  Building2,
  Users,
  CreditCard,
  TrendingUp,
  Settings,
  FileText,
  Download,
  Calendar,
  Globe,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export function AdminDashboard() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin SaaS</h1>
          <p className="mt-1 text-gray-600">Vue d&apos;ensemble de la plateforme</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Globe className="h-4 w-4" />
            Toutes les régions
          </Button>
          <Button className="gap-2 bg-[#2302B3] hover:bg-[#1a0285]">Nouvelle École</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 transition-all hover:shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
              <Building2 className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <p className="mb-1 text-sm text-gray-600">Écoles actives</p>
          <p className="text-3xl font-bold text-gray-900">127</p>
          <div className="mt-2 flex items-center gap-1">
            <span className="rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
              +12 ce mois
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 transition-all hover:shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50">
              <Users className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <p className="mb-1 text-sm text-gray-600">Utilisateurs totaux</p>
          <p className="text-3xl font-bold text-gray-900">2,458</p>
          <div className="mt-2 flex items-center gap-1">
            <span className="rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
              +18%
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 transition-all hover:shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50">
              <CreditCard className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <p className="mb-1 text-sm text-gray-600">Revenus mensuels</p>
          <p className="text-3xl font-bold text-gray-900">€12,450</p>
          <div className="mt-2 flex items-center gap-1">
            <span className="rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
              +24%
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 transition-all hover:shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <p className="mb-1 text-sm text-gray-600">Taux d&apos;utilisation</p>
          <p className="text-3xl font-bold text-gray-900">87%</p>
          <div className="mt-2 flex items-center gap-1">
            <span className="rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
              +5%
            </span>
          </div>
        </div>
      </div>

      {/* Actions rapides & Activité récente */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <h3 className="mb-6 text-lg font-semibold">Actions rapides</h3>
          <div className="space-y-3">
            {[
              {
                icon: Users,
                title: 'Inscrire une école',
                desc: 'Ajouter un nouvel établissement',
                color: 'bg-blue-50',
                iconColor: 'text-blue-600',
              },
              {
                icon: Building2,
                title: 'Créer une classe',
                desc: 'Nouvelle classe scolaire',
                color: 'bg-purple-50',
                iconColor: 'text-purple-600',
              },
              {
                icon: FileText,
                title: 'Saisir des notes',
                desc: 'Enregistrer les évaluations',
                color: 'bg-green-50',
                iconColor: 'text-green-600',
              },
              {
                icon: Download,
                title: 'Générer les bulletins',
                desc: 'Créer des bulletins PDF',
                color: 'bg-orange-50',
                iconColor: 'text-orange-600',
              },
              {
                icon: Calendar,
                title: 'Gérer les Périodes',
                desc: 'Configurer les périodes scolaires',
                color: 'bg-pink-50',
                iconColor: 'text-pink-600',
              },
              {
                icon: Settings,
                title: 'Gérer les Niveaux',
                desc: "Configurer les niveaux d'étude",
                color: 'bg-indigo-50',
                iconColor: 'text-indigo-600',
              },
            ].map((action, i) => (
              <button
                key={i}
                className="group flex w-full items-center gap-4 rounded-xl p-4 text-left transition-colors hover:bg-gray-50"
              >
                <div
                  className={`h-12 w-12 rounded-xl ${action.color} flex items-center justify-center transition-transform group-hover:scale-110`}
                >
                  <action.icon className={`h-6 w-6 ${action.iconColor}`} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{action.title}</p>
                  <p className="text-sm text-gray-500">{action.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <h3 className="mb-6 text-lg font-semibold">Activité récente</h3>
          <div className="space-y-4">
            {[
              { text: '1 nouvel enseignant ajouté', time: 'Cette semaine' },
              { text: 'École Primaire Akwa inscrite', time: 'Il y a 2h' },
              { text: '15 nouveaux paiements', time: "Aujourd'hui" },
              { text: 'Mise à jour système effectuée', time: 'Hier' },
            ].map((activity, i) => (
              <div
                key={i}
                className="flex items-start gap-3 border-b border-gray-100 pb-4 last:border-0"
              >
                <div className="mt-2 h-2 w-2 rounded-full bg-blue-600" />
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
      <div className="rounded-2xl border border-gray-100 bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold">Distribution par région</h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
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
            <div key={i} className="rounded-xl bg-gray-50 p-4 transition-colors hover:bg-gray-100">
              <p className="text-2xl font-bold text-[#2302B3]">{item.count}</p>
              <p className="text-sm text-gray-600">{item.region}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
