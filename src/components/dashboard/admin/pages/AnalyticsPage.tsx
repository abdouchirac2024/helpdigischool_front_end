'use client'

import {
  Download,
  Activity,
  Eye,
  Clock,
  MousePointer,
  Globe,
  Smartphone,
  Monitor,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

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
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytiques</h1>
          <p className="mt-1 text-gray-600">Statistiques d'utilisation de la plateforme</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Exporter rapport
          </Button>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
              <Eye className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <ArrowUpRight className="h-4 w-4" />
              <span className="text-sm font-semibold">+18%</span>
            </div>
          </div>
          <p className="mb-1 text-sm text-gray-500">Pages vues</p>
          <p className="text-3xl font-bold text-gray-900">245,890</p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50">
              <Activity className="h-6 w-6 text-green-600" />
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <ArrowUpRight className="h-4 w-4" />
              <span className="text-sm font-semibold">+12%</span>
            </div>
          </div>
          <p className="mb-1 text-sm text-gray-500">Sessions</p>
          <p className="text-3xl font-bold text-gray-900">52,340</p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <ArrowUpRight className="h-4 w-4" />
              <span className="text-sm font-semibold">+5%</span>
            </div>
          </div>
          <p className="mb-1 text-sm text-gray-500">Durée moyenne</p>
          <p className="text-3xl font-bold text-gray-900">8m 32s</p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50">
              <MousePointer className="h-6 w-6 text-orange-600" />
            </div>
            <div className="flex items-center gap-1 text-red-600">
              <ArrowDownRight className="h-4 w-4" />
              <span className="text-sm font-semibold">-2%</span>
            </div>
          </div>
          <p className="mb-1 text-sm text-gray-500">Taux de rebond</p>
          <p className="text-3xl font-bold text-gray-900">24%</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Devices */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <h3 className="mb-6 text-lg font-semibold">Appareils utilisés</h3>
          <div className="space-y-4">
            {[
              { icon: Monitor, label: 'Desktop', value: 58, color: 'bg-blue-500' },
              { icon: Smartphone, label: 'Mobile', value: 35, color: 'bg-purple-500' },
              { icon: Globe, label: 'Tablet', value: 7, color: 'bg-orange-500' },
            ].map((device, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-50">
                  <device.icon className="h-5 w-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{device.label}</span>
                    <span className="text-sm font-bold text-gray-900">{device.value}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className={`h-full ${device.color}`}
                      style={{ width: `${device.value}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Pages */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <h3 className="mb-6 text-lg font-semibold">Pages les plus visitées</h3>
          <div className="space-y-3">
            {topPages.map((page, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-xl bg-gray-50 p-3 transition-colors hover:bg-gray-100"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2302B3] text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="font-medium text-gray-900">{page.page}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-gray-600">{page.views.toLocaleString()}</span>
                  <span
                    className={`text-sm font-semibold ${page.up ? 'text-green-600' : 'text-red-600'}`}
                  >
                    {page.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Schools */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
        <div className="border-b border-gray-100 p-4">
          <h3 className="font-semibold text-gray-900">Écoles les plus actives</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left font-semibold text-gray-600">#</th>
                <th className="p-4 text-left font-semibold text-gray-600">École</th>
                <th className="p-4 text-right font-semibold text-gray-600">Utilisateurs actifs</th>
                <th className="p-4 text-right font-semibold text-gray-600">Sessions</th>
                <th className="p-4 text-right font-semibold text-gray-600">Engagement</th>
              </tr>
            </thead>
            <tbody>
              {topSchools.map((school, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="p-4">
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                        i < 3 ? 'bg-[#2302B3] text-white' : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {i + 1}
                    </span>
                  </td>
                  <td className="p-4 font-semibold text-gray-900">{school.name}</td>
                  <td className="p-4 text-right text-gray-600">{school.users}</td>
                  <td className="p-4 text-right text-gray-600">
                    {school.sessions.toLocaleString()}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="h-2 w-20 overflow-hidden rounded-full bg-gray-100">
                        <div
                          className="h-full bg-[#2302B3]"
                          style={{ width: `${Math.min(school.users / 2, 100)}%` }}
                        />
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
  )
}
