'use client'

import {
  Database,
  HardDrive,
  Server,
  Activity,
  RefreshCw,
  Download,
  Upload,
  CheckCircle2,
  AlertTriangle,
  Cpu,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

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
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Base de données</h1>
          <p className="mt-1 text-gray-600">Monitoring et gestion des données</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Actualiser
          </Button>
          <Button className="gap-2 bg-[#2302B3] hover:bg-[#1a0285]">
            <Download className="h-4 w-4" />
            Backup manuel
          </Button>
        </div>
      </div>

      {/* Database Stats */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
              <HardDrive className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Stockage utilisé</p>
              <p className="text-2xl font-bold text-gray-900">4.5 GB</p>
              <p className="text-xs text-gray-400">sur 50 GB</p>
            </div>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-100">
            <div className="h-full bg-blue-500" style={{ width: '9%' }} />
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50">
              <Server className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">État serveur</p>
              <p className="text-2xl font-bold text-green-600">En ligne</p>
              <p className="text-xs text-gray-400">Uptime: 99.9%</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50">
              <Activity className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Requêtes/sec</p>
              <p className="text-2xl font-bold text-gray-900">1,245</p>
              <p className="text-xs text-gray-400">Temps moyen: 45ms</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50">
              <Cpu className="h-6 w-6 text-orange-600" />
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
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Tables */}
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
          <div className="border-b border-gray-100 p-4">
            <h3 className="font-semibold text-gray-900">Tables principales</h3>
          </div>
          <div className="divide-y divide-gray-50">
            {tables.map((table, i) => (
              <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2302B3]/10">
                    <Database className="h-5 w-5 text-[#2302B3]" />
                  </div>
                  <div>
                    <p className="font-mono font-semibold text-gray-900">{table.name}</p>
                    <p className="text-xs text-gray-500">
                      {table.rows} lignes • {table.size}
                    </p>
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
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
          <div className="flex items-center justify-between border-b border-gray-100 p-4">
            <h3 className="font-semibold text-gray-900">Sauvegardes récentes</h3>
            <Button variant="ghost" size="sm" className="gap-1">
              <Upload className="h-4 w-4" />
              Restaurer
            </Button>
          </div>
          <div className="divide-y divide-gray-50">
            {backups.map((backup, i) => (
              <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                      backup.status === 'success' ? 'bg-green-50' : 'bg-red-50'
                    }`}
                  >
                    {backup.status === 'success' ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{backup.date}</p>
                    <p className="text-xs text-gray-500">
                      {backup.size} • {backup.type}
                    </p>
                  </div>
                </div>
                <span
                  className={`rounded-full px-2 py-1 text-xs font-semibold ${
                    backup.status === 'success'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {backup.status === 'success' ? 'Succès' : 'Échec'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
