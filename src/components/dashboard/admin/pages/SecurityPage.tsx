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
  Lock,
  Key,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Eye,
  EyeOff,
  Fingerprint,
  Smartphone,
  Globe,
  Clock,
  RefreshCw,
  ShieldCheck,
  ShieldAlert,
  UserX,
  LogOut
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

const securityLogs = [
  { id: 1, event: 'Connexion réussie', user: 'admin@helpdigischool.com', ip: '192.168.1.45', location: 'Yaoundé, CM', time: 'Il y a 5 min', status: 'success' },
  { id: 2, event: 'Tentative de connexion échouée', user: 'jean.dupont@school.cm', ip: '41.205.12.89', location: 'Douala, CM', time: 'Il y a 15 min', status: 'failed' },
  { id: 3, event: 'Mot de passe modifié', user: 'marie.ngo@school.cm', ip: '192.168.2.12', location: 'Yaoundé, CM', time: 'Il y a 1h', status: 'warning' },
  { id: 4, event: 'Nouvelle connexion détectée', user: 'paul.kamga@school.cm', ip: '105.235.45.67', location: 'Bafoussam, CM', time: 'Il y a 2h', status: 'success' },
  { id: 5, event: '2FA activé', user: 'sophie.talla@school.cm', ip: '192.168.1.100', location: 'Yaoundé, CM', time: 'Il y a 3h', status: 'success' },
  { id: 6, event: 'Compte bloqué (3 tentatives)', user: 'unknown@test.com', ip: '185.45.12.89', location: 'Unknown', time: 'Il y a 4h', status: 'blocked' },
]

const activeSessions = [
  { device: 'Chrome - Windows', location: 'Yaoundé, Cameroun', ip: '192.168.1.45', lastActive: 'Maintenant', current: true },
  { device: 'Safari - macOS', location: 'Douala, Cameroun', ip: '41.205.12.89', lastActive: 'Il y a 30 min', current: false },
  { device: 'Mobile App - iOS', location: 'Bafoussam, Cameroun', ip: '105.235.45.67', lastActive: 'Il y a 2h', current: false },
]

export function AdminSecurityPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true)
  const [ipWhitelisting, setIpWhitelisting] = useState(false)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-orange-500" />
      case 'blocked':
        return <UserX className="w-5 h-5 text-red-600" />
      default:
        return <CheckCircle2 className="w-5 h-5 text-gray-400" />
    }
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
              <h1 className="text-3xl font-bold text-gray-900">Sécurité</h1>
              <p className="text-gray-600 mt-1">Gérez la sécurité et les accès de la plateforme</p>
            </div>
            <Button className="bg-[#2302B3] hover:bg-[#1a0285] gap-2">
              <RefreshCw className="w-4 h-4" />
              Audit de sécurité
            </Button>
          </div>

          {/* Security Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Score sécurité</p>
                  <p className="text-2xl font-bold text-green-600">92/100</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Fingerprint className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">2FA activé</p>
                  <p className="text-2xl font-bold text-gray-900">78%</p>
                  <p className="text-xs text-gray-400">des utilisateurs</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                  <ShieldAlert className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Alertes</p>
                  <p className="text-2xl font-bold text-orange-600">3</p>
                  <p className="text-xs text-gray-400">à traiter</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                  <UserX className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Comptes bloqués</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                  <p className="text-xs text-gray-400">cette semaine</p>
                </div>
              </div>
            </div>
          </div>

          {/* Security Settings & Sessions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Security Settings */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900">Paramètres de sécurité</h3>
              </div>
              <div className="p-4 space-y-4">
                {/* 2FA Toggle */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Fingerprint className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Authentification 2FA</p>
                      <p className="text-sm text-gray-500">Double authentification obligatoire</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                    className={`w-12 h-6 rounded-full transition-colors ${twoFactorEnabled ? 'bg-[#2302B3]' : 'bg-gray-300'}`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${twoFactorEnabled ? 'translate-x-6' : 'translate-x-0.5'}`} />
                  </button>
                </div>

                {/* IP Whitelisting */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                      <Globe className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Liste blanche IP</p>
                      <p className="text-sm text-gray-500">Restreindre l'accès par IP</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIpWhitelisting(!ipWhitelisting)}
                    className={`w-12 h-6 rounded-full transition-colors ${ipWhitelisting ? 'bg-[#2302B3]' : 'bg-gray-300'}`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${ipWhitelisting ? 'translate-x-6' : 'translate-x-0.5'}`} />
                  </button>
                </div>

                {/* Session Timeout */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Expiration session</p>
                      <p className="text-sm text-gray-500">Durée de la session</p>
                    </div>
                  </div>
                  <select className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm">
                    <option>30 minutes</option>
                    <option>1 heure</option>
                    <option>4 heures</option>
                    <option>24 heures</option>
                  </select>
                </div>

                {/* Password Policy */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                      <Key className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Politique mot de passe</p>
                      <p className="text-sm text-gray-500">Minimum 12 caractères, complexe</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Modifier</Button>
                </div>
              </div>
            </div>

            {/* Active Sessions */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Sessions actives</h3>
                <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50 gap-1">
                  <LogOut className="w-4 h-4" />
                  Tout déconnecter
                </Button>
              </div>
              <div className="divide-y divide-gray-50">
                {activeSessions.map((session, i) => (
                  <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${session.current ? 'bg-green-50' : 'bg-gray-100'}`}>
                        {session.device.includes('Mobile') ? (
                          <Smartphone className={`w-5 h-5 ${session.current ? 'text-green-600' : 'text-gray-500'}`} />
                        ) : (
                          <Globe className={`w-5 h-5 ${session.current ? 'text-green-600' : 'text-gray-500'}`} />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-gray-900">{session.device}</p>
                          {session.current && (
                            <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                              Actuelle
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">{session.location} • {session.ip}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400">{session.lastActive}</p>
                      {!session.current && (
                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 mt-1">
                          Révoquer
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Security Logs */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Journal de sécurité</h3>
              <div className="flex gap-2">
                <Input placeholder="Rechercher..." className="w-64" />
                <Button variant="outline" size="sm">Filtrer</Button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-4 font-semibold text-gray-600">Événement</th>
                    <th className="text-left p-4 font-semibold text-gray-600">Utilisateur</th>
                    <th className="text-left p-4 font-semibold text-gray-600">IP</th>
                    <th className="text-left p-4 font-semibold text-gray-600">Localisation</th>
                    <th className="text-left p-4 font-semibold text-gray-600">Date</th>
                    <th className="text-center p-4 font-semibold text-gray-600">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {securityLogs.map((log) => (
                    <tr key={log.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="p-4">
                        <p className="font-semibold text-gray-900">{log.event}</p>
                      </td>
                      <td className="p-4">
                        <p className="text-sm text-gray-600">{log.user}</p>
                      </td>
                      <td className="p-4">
                        <code className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">{log.ip}</code>
                      </td>
                      <td className="p-4">
                        <p className="text-sm text-gray-600">{log.location}</p>
                      </td>
                      <td className="p-4">
                        <p className="text-sm text-gray-500">{log.time}</p>
                      </td>
                      <td className="p-4">
                        <div className="flex justify-center">
                          {getStatusIcon(log.status)}
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