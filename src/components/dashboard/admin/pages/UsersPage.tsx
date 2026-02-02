'use client'

import { useState } from 'react'
import {
  Users,
  TrendingUp,
  Search,
  Plus,
  Download,
  UserCheck,
  UserX,
  Edit,
  Trash2,
  Eye,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const users = [
  {
    id: 1,
    name: 'Jean-Pierre Kamga',
    email: 'jp.kamga@school.cm',
    role: 'Directeur',
    school: 'Lycée Bilingue de Yaoundé',
    status: 'active',
    lastLogin: 'Il y a 2h',
    avatar: 'JK',
  },
  {
    id: 2,
    name: 'Marie-Claire Ngo',
    email: 'mc.ngo@school.cm',
    role: 'Enseignant',
    school: 'Collège Saint-Michel',
    status: 'active',
    lastLogin: 'Il y a 5h',
    avatar: 'MN',
  },
  {
    id: 3,
    name: 'Paul Mbarga',
    email: 'p.mbarga@school.cm',
    role: 'Secrétaire',
    school: 'École Primaire Akwa',
    status: 'inactive',
    lastLogin: 'Il y a 3 jours',
    avatar: 'PM',
  },
  {
    id: 4,
    name: 'Sophie Talla',
    email: 's.talla@school.cm',
    role: 'Directeur',
    school: 'Groupe Scolaire Excellence',
    status: 'active',
    lastLogin: 'Il y a 1h',
    avatar: 'ST',
  },
  {
    id: 5,
    name: 'Emmanuel Fouda',
    email: 'e.fouda@school.cm',
    role: 'Enseignant',
    school: 'Lycée Technique de Douala',
    status: 'pending',
    lastLogin: 'Jamais',
    avatar: 'EF',
  },
  {
    id: 6,
    name: 'Alice Kouam',
    email: 'a.kouam@school.cm',
    role: 'Parent',
    school: 'Collège Protestant',
    status: 'active',
    lastLogin: 'Il y a 30min',
    avatar: 'AK',
  },
  {
    id: 7,
    name: 'Robert Essomba',
    email: 'r.essomba@school.cm',
    role: 'Directeur',
    school: 'Institut Polyvalent',
    status: 'active',
    lastLogin: "Aujourd'hui",
    avatar: 'RE',
  },
  {
    id: 8,
    name: 'Hélène Biya',
    email: 'h.biya@school.cm',
    role: 'Secrétaire',
    school: 'École Maternelle Soleil',
    status: 'inactive',
    lastLogin: 'Il y a 1 semaine',
    avatar: 'HB',
  },
]

export function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState('all')

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-100 text-green-700',
      inactive: 'bg-gray-100 text-gray-700',
      pending: 'bg-orange-100 text-orange-700',
    }
    const labels = {
      active: 'Actif',
      inactive: 'Inactif',
      pending: 'En attente',
    }
    return (
      <span
        className={`rounded-full px-2 py-1 text-xs font-semibold ${styles[status as keyof typeof styles]}`}
      >
        {labels[status as keyof typeof labels]}
      </span>
    )
  }

  const getRoleBadge = (role: string) => {
    const styles: Record<string, string> = {
      Directeur: 'bg-purple-100 text-purple-700',
      Enseignant: 'bg-blue-100 text-blue-700',
      Secrétaire: 'bg-pink-100 text-pink-700',
      Parent: 'bg-green-100 text-green-700',
    }
    return (
      <span
        className={`rounded-full px-2 py-1 text-xs font-semibold ${styles[role] || 'bg-gray-100 text-gray-700'}`}
      >
        {role}
      </span>
    )
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Utilisateurs</h1>
          <p className="mt-1 text-gray-600">Gérez tous les utilisateurs de la plateforme</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Exporter
          </Button>
          <Button className="gap-2 bg-[#2302B3] hover:bg-[#1a0285]">
            <Plus className="h-4 w-4" />
            Nouvel utilisateur
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">2,458</p>
              <p className="text-sm text-gray-500">Total utilisateurs</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50">
              <UserCheck className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">2,156</p>
              <p className="text-sm text-gray-500">Actifs</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50">
              <UserX className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">245</p>
              <p className="text-sm text-gray-500">Inactifs</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">+124</p>
              <p className="text-sm text-gray-500">Ce mois</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-gray-100 bg-white p-4">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
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
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-100 bg-gray-50">
              <tr>
                <th className="p-4 text-left font-semibold text-gray-600">Utilisateur</th>
                <th className="p-4 text-left font-semibold text-gray-600">Rôle</th>
                <th className="p-4 text-left font-semibold text-gray-600">École</th>
                <th className="p-4 text-left font-semibold text-gray-600">Statut</th>
                <th className="p-4 text-left font-semibold text-gray-600">Dernière connexion</th>
                <th className="p-4 text-right font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-50 transition-colors hover:bg-gray-50"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#2302B3] to-[#4318FF] text-sm font-semibold text-white">
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
                        <Eye className="h-4 w-4 text-gray-500" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4 text-gray-500" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-gray-100 p-4">
          <p className="text-sm text-gray-500">Affichage 1-8 sur 2,458 utilisateurs</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Précédent
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-[#2302B3] text-white hover:bg-[#1a0285]"
            >
              1
            </Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              3
            </Button>
            <Button variant="outline" size="sm">
              ...
            </Button>
            <Button variant="outline" size="sm">
              307
            </Button>
            <Button variant="outline" size="sm">
              Suivant
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
