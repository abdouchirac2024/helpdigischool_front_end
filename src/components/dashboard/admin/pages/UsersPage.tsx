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
  MoreVertical,
  Mail,
  Phone,
  MapPin,
  Filter,
  Download,
  UserCheck,
  UserX,
  Edit,
  Trash2,
  Eye
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

const users = [
  { id: 1, name: 'Jean-Pierre Kamga', email: 'jp.kamga@school.cm', role: 'Directeur', school: 'Lycée Bilingue de Yaoundé', status: 'active', lastLogin: 'Il y a 2h', avatar: 'JK' },
  { id: 2, name: 'Marie-Claire Ngo', email: 'mc.ngo@school.cm', role: 'Enseignant', school: 'Collège Saint-Michel', status: 'active', lastLogin: 'Il y a 5h', avatar: 'MN' },
  { id: 3, name: 'Paul Mbarga', email: 'p.mbarga@school.cm', role: 'Secrétaire', school: 'École Primaire Akwa', status: 'inactive', lastLogin: 'Il y a 3 jours', avatar: 'PM' },
  { id: 4, name: 'Sophie Talla', email: 's.talla@school.cm', role: 'Directeur', school: 'Groupe Scolaire Excellence', status: 'active', lastLogin: 'Il y a 1h', avatar: 'ST' },
  { id: 5, name: 'Emmanuel Fouda', email: 'e.fouda@school.cm', role: 'Enseignant', school: 'Lycée Technique de Douala', status: 'pending', lastLogin: 'Jamais', avatar: 'EF' },
  { id: 6, name: 'Alice Kouam', email: 'a.kouam@school.cm', role: 'Parent', school: 'Collège Protestant', status: 'active', lastLogin: 'Il y a 30min', avatar: 'AK' },
  { id: 7, name: 'Robert Essomba', email: 'r.essomba@school.cm', role: 'Directeur', school: 'Institut Polyvalent', status: 'active', lastLogin: 'Aujourd\'hui', avatar: 'RE' },
  { id: 8, name: 'Hélène Biya', email: 'h.biya@school.cm', role: 'Secrétaire', school: 'École Maternelle Soleil', status: 'inactive', lastLogin: 'Il y a 1 semaine', avatar: 'HB' },
]

export function AdminUsersPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState('all')

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-100 text-green-700',
      inactive: 'bg-gray-100 text-gray-700',
      pending: 'bg-orange-100 text-orange-700'
    }
    const labels = {
      active: 'Actif',
      inactive: 'Inactif',
      pending: 'En attente'
    }
    return (
      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    )
  }

  const getRoleBadge = (role: string) => {
    const styles: Record<string, string> = {
      'Directeur': 'bg-purple-100 text-purple-700',
      'Enseignant': 'bg-blue-100 text-blue-700',
      'Secrétaire': 'bg-pink-100 text-pink-700',
      'Parent': 'bg-green-100 text-green-700'
    }
    return (
      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${styles[role] || 'bg-gray-100 text-gray-700'}`}>
        {role}
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
              <h1 className="text-3xl font-bold text-gray-900">Utilisateurs</h1>
              <p className="text-gray-600 mt-1">Gérez tous les utilisateurs de la plateforme</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Exporter
              </Button>
              <Button className="bg-[#2302B3] hover:bg-[#1a0285] gap-2">
                <Plus className="w-4 h-4" />
                Nouvel utilisateur
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">2,458</p>
                  <p className="text-sm text-gray-500">Total utilisateurs</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">2,156</p>
                  <p className="text-sm text-gray-500">Actifs</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                  <UserX className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">245</p>
                  <p className="text-sm text-gray-500">Inactifs</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">+124</p>
                  <p className="text-sm text-gray-500">Ce mois</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl p-4 border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Rechercher par nom, email..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                {['all', 'Directeur', 'Enseignant', 'Secrétaire', 'Parent'].map((role) => (
                  <Button
                    key={role}
                    variant={filterRole === role ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterRole(role)}
                    className={filterRole === role ? 'bg-[#2302B3] hover:bg-[#1a0285]' : ''}
                  >
                    {role === 'all' ? 'Tous' : role}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left p-4 font-semibold text-gray-600">Utilisateur</th>
                    <th className="text-left p-4 font-semibold text-gray-600">Rôle</th>
                    <th className="text-left p-4 font-semibold text-gray-600">École</th>
                    <th className="text-left p-4 font-semibold text-gray-600">Statut</th>
                    <th className="text-left p-4 font-semibold text-gray-600">Dernière connexion</th>
                    <th className="text-right p-4 font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2302B3] to-[#4318FF] flex items-center justify-center text-white font-semibold text-sm">
                            {user.avatar}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{user.name}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">{getRoleBadge(user.role)}</td>
                      <td className="p-4">
                        <p className="text-sm text-gray-700">{user.school}</p>
                      </td>
                      <td className="p-4">{getStatusBadge(user.status)}</td>
                      <td className="p-4">
                        <p className="text-sm text-gray-500">{user.lastLogin}</p>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye className="w-4 h-4 text-gray-500" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="w-4 h-4 text-gray-500" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="p-4 border-t border-gray-100 flex items-center justify-between">
              <p className="text-sm text-gray-500">Affichage 1-8 sur 2,458 utilisateurs</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>Précédent</Button>
                <Button variant="outline" size="sm" className="bg-[#2302B3] text-white hover:bg-[#1a0285]">1</Button>
                <Button variant="outline" size="sm">2</Button>
                <Button variant="outline" size="sm">3</Button>
                <Button variant="outline" size="sm">...</Button>
                <Button variant="outline" size="sm">307</Button>
                <Button variant="outline" size="sm">Suivant</Button>
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