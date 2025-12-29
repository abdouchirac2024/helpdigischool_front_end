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
  Filter,
  Download,
  Plus,
  Eye,
  Edit,
  MoreVertical,
  MapPin,
  Phone,
  Mail
} from 'lucide-react'
import { Sidebar, MenuItem } from '../../shared/Sidebar'
import { TopBar } from '../../shared/TopBar'
import { Pagination } from '../../shared/Pagination'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

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

const schools = Array.from({ length: 127 }, (_, i) => ({
  id: i + 1,
  name: `École Primaire ${['Akwa', 'La Victoire', 'Saint-Michel', 'Les Étoiles', 'Bilingue', 'Catholique', 'Protestante', 'Publique'][i % 8]} ${i + 1}`,
  region: ['Centre', 'Littoral', 'Ouest', 'Nord-Ouest', 'Sud-Ouest', 'Nord', 'Adamaoua', 'Est', 'Sud', 'Extrême-Nord'][i % 10],
  students: Math.floor(Math.random() * 500) + 100,
  teachers: Math.floor(Math.random() * 30) + 5,
  status: ['active', 'active', 'active', 'pending', 'suspended'][i % 5],
  subscription: ['premium', 'standard', 'basic'][i % 3],
  director: `M./Mme ${['Nkolo', 'Mbarga', 'Kamga', 'Talla', 'Kouam'][i % 5]}`,
  phone: `6 ${Math.floor(Math.random() * 90 + 10)} ${Math.floor(Math.random() * 90 + 10)} ${Math.floor(Math.random() * 90 + 10)} ${Math.floor(Math.random() * 90 + 10)}`,
  email: `ecole${i + 1}@school.cm`,
  createdAt: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toLocaleDateString('fr-FR')
}))

export function AdminSchoolsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [regionFilter, setRegionFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 15

  const filteredSchools = schools.filter(school => {
    const matchesSearch = school.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRegion = regionFilter === 'all' || school.region === regionFilter
    const matchesStatus = statusFilter === 'all' || school.status === statusFilter
    return matchesSearch && matchesRegion && matchesStatus
  })

  const totalPages = Math.ceil(filteredSchools.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedSchools = filteredSchools.slice(startIndex, startIndex + itemsPerPage)

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-100 text-green-700 border-green-200',
      pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      suspended: 'bg-red-100 text-red-700 border-red-200',
    }
    const labels = {
      active: 'Active',
      pending: 'En attente',
      suspended: 'Suspendue',
    }
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    )
  }

  const getSubscriptionBadge = (subscription: string) => {
    const styles = {
      premium: 'bg-purple-100 text-purple-700',
      standard: 'bg-blue-100 text-blue-700',
      basic: 'bg-gray-100 text-gray-700',
    }
    const labels = {
      premium: 'Premium',
      standard: 'Standard',
      basic: 'Basic',
    }
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${styles[subscription as keyof typeof styles]}`}>
        {labels[subscription as keyof typeof labels]}
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

      <main className="lg:ml-64 pt-16 min-h-screen">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Gestion des Écoles</h1>
              <p className="text-gray-600 mt-1">{filteredSchools.length} écoles • 10 régions</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Exporter
              </Button>
              <Button className="bg-[#2302B3] hover:bg-[#1a0285] gap-2">
                <Plus className="w-4 h-4" />
                Nouvelle école
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <p className="text-sm text-gray-600 mb-1">Total écoles</p>
              <p className="text-2xl font-bold text-gray-900">127</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <p className="text-sm text-gray-600 mb-1">Actives</p>
              <p className="text-2xl font-bold text-green-600">
                {schools.filter(s => s.status === 'active').length}
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <p className="text-sm text-gray-600 mb-1">En attente</p>
              <p className="text-2xl font-bold text-yellow-600">
                {schools.filter(s => s.status === 'pending').length}
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <p className="text-sm text-gray-600 mb-1">Total élèves</p>
              <p className="text-2xl font-bold text-blue-600">
                {schools.reduce((acc, s) => acc + s.students, 0).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Rechercher une école..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={regionFilter} onValueChange={setRegionFilter}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Région" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les régions</SelectItem>
                  <SelectItem value="Centre">Centre</SelectItem>
                  <SelectItem value="Littoral">Littoral</SelectItem>
                  <SelectItem value="Ouest">Ouest</SelectItem>
                  <SelectItem value="Nord-Ouest">Nord-Ouest</SelectItem>
                  <SelectItem value="Sud-Ouest">Sud-Ouest</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="suspended">Suspendue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Schools Table */}
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">École</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Région</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Élèves</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Enseignants</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Abonnement</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Statut</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Directeur</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedSchools.map((school) => (
                    <tr key={school.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#2302B3] to-[#4318FF] flex items-center justify-center text-white font-semibold">
                            {school.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{school.name}</p>
                            <p className="text-sm text-gray-500">{school.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-900">{school.region}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-semibold text-gray-900">{school.students}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-semibold text-gray-900">{school.teachers}</span>
                      </td>
                      <td className="px-6 py-4">
                        {getSubscriptionBadge(school.subscription)}
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(school.status)}
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{school.director}</p>
                          <p className="text-xs text-gray-500">{school.phone}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              itemsPerPage={itemsPerPage}
              totalItems={filteredSchools.length}
            />
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
