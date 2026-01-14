'use client'

import { useState } from 'react'
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  School,
  Settings,
  FileText,
  Search,
  Filter,
  Download,
  Mail,
  Phone,
  Eye,
  Edit,
  MoreVertical,
  Award,
  ClipboardList,
  CreditCard,
  Calendar,
  BarChart3,
  Bell,
  Plus,
  Trash2,
  UserPlus
} from 'lucide-react'
import { Sidebar, MenuItem } from '../../shared/Sidebar'
import { TopBar } from '../../shared/TopBar'
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
  { icon: LayoutDashboard, label: 'Vue d\'ensemble', href: '/dashboard/director' },
  { icon: Users, label: 'Élèves', href: '/dashboard/director/students', badge: '342' },
  { icon: School, label: 'Classes', href: '/dashboard/director/classes', badge: '12' },
  { icon: GraduationCap, label: 'Enseignants', href: '/dashboard/director/teachers', badge: '18' },
  { icon: FileText, label: 'Notes & Bulletins', href: '/dashboard/director/grades' },
  { icon: CreditCard, label: 'Paiements', href: '/dashboard/director/payments' },
  { icon: Calendar, label: 'Emploi du temps', href: '/dashboard/director/schedule' },
  { icon: BarChart3, label: 'Statistiques', href: '/dashboard/director/stats' },
  { icon: Bell, label: 'Notifications', href: '/dashboard/director/notifications', badge: '5' },
  { icon: Settings, label: 'Paramètres', href: '/dashboard/director/settings' },
]

const students = [
  { id: 1, name: 'Amina Nkolo', matricule: 'ELV-2024-001', gender: 'F', birthDate: '12/03/2012', class: '6ème A', average: 16.5, attendance: 98, status: 'excellent', parent: 'M. Nkolo Jean', phone: '6 77 88 99 00', email: 'nkolo@email.cm', paymentStatus: 'paid' },
  { id: 2, name: 'Paul Mbarga', matricule: 'ELV-2024-002', gender: 'M', birthDate: '25/07/2011', class: '5ème B', average: 14.8, attendance: 96, status: 'good', parent: 'Mme Mbarga Sophie', phone: '6 55 66 77 88', email: 'mbarga@email.cm', paymentStatus: 'paid' },
  { id: 3, name: 'Sophie Kamga', matricule: 'ELV-2024-003', gender: 'F', birthDate: '08/11/2012', class: '6ème A', average: 17.2, attendance: 94, status: 'excellent', parent: 'M. Kamga Pierre', phone: '6 99 00 11 22', email: 'kamga@email.cm', paymentStatus: 'partial' },
  { id: 4, name: 'Jean Talla', matricule: 'ELV-2024-004', gender: 'M', birthDate: '15/01/2011', class: '5ème A', average: 12.8, attendance: 92, status: 'average', parent: 'M. Talla Robert', phone: '6 88 77 66 55', email: 'talla@email.cm', paymentStatus: 'paid' },
  { id: 5, name: 'Marie Kouam', matricule: 'ELV-2024-005', gender: 'F', birthDate: '22/05/2012', class: '6ème B', average: 15.5, attendance: 90, status: 'good', parent: 'Mme Kouam Alice', phone: '6 44 55 66 77', email: 'kouam@email.cm', paymentStatus: 'unpaid' },
  { id: 6, name: 'David Ngo', matricule: 'ELV-2024-006', gender: 'M', birthDate: '30/09/2011', class: '5ème B', average: 11.2, attendance: 88, status: 'needs-attention', parent: 'M. Ngo Fabrice', phone: '6 33 44 55 66', email: 'ngo@email.cm', paymentStatus: 'paid' },
  { id: 7, name: 'Sarah Biya', matricule: 'ELV-2024-007', gender: 'F', birthDate: '18/04/2012', class: '6ème A', average: 18.2, attendance: 99, status: 'excellent', parent: 'Mme Biya Marie', phone: '6 22 33 44 55', email: 'biya@email.cm', paymentStatus: 'paid' },
  { id: 8, name: 'Eric Muna', matricule: 'ELV-2024-008', gender: 'M', birthDate: '05/12/2011', class: '5ème A', average: 13.5, attendance: 82, status: 'average', parent: 'M. Muna Paul', phone: '6 11 22 33 44', email: 'muna@email.cm', paymentStatus: 'partial' },
]

export function DirectorStudentsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [classFilter, setClassFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.matricule.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesClass = classFilter === 'all' || student.class === classFilter
    const matchesStatus = statusFilter === 'all' || student.status === statusFilter
    return matchesSearch && matchesClass && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    const styles = {
      excellent: 'bg-green-100 text-green-700',
      good: 'bg-blue-100 text-blue-700',
      average: 'bg-yellow-100 text-yellow-700',
      'needs-attention': 'bg-red-100 text-red-700',
    }
    const labels = {
      excellent: 'Excellent',
      good: 'Bien',
      average: 'Moyen',
      'needs-attention': 'À suivre',
    }
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    )
  }

  const getPaymentBadge = (status: string) => {
    const styles = {
      paid: 'bg-green-100 text-green-700',
      partial: 'bg-orange-100 text-orange-700',
      unpaid: 'bg-red-100 text-red-700',
    }
    const labels = {
      paid: 'Soldé',
      partial: 'Partiel',
      unpaid: 'Impayé',
    }
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        schoolName="Lycée Bilingue de Yaoundé"
        userName="M. Kamga Jean"
        userRole="Directeur"
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
              <h1 className="text-3xl font-bold text-gray-900">Gestion des Élèves</h1>
              <p className="text-gray-600 mt-1">{filteredStudents.length} élèves inscrits</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Exporter
              </Button>
              <Button className="bg-[#2302B3] hover:bg-[#1a0285] gap-2">
                <UserPlus className="w-4 h-4" />
                Nouvel élève
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
                  <p className="text-2xl font-bold text-gray-900">342</p>
                  <p className="text-sm text-gray-500">Total élèves</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">14.8</p>
                  <p className="text-sm text-gray-500">Moyenne générale</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">
                  <ClipboardList className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">94%</p>
                  <p className="text-sm text-gray-500">Taux de présence</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">89%</p>
                  <p className="text-sm text-gray-500">Paiements à jour</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl p-4 border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Rechercher par nom ou matricule..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={classFilter} onValueChange={setClassFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Classe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les classes</SelectItem>
                  <SelectItem value="6ème A">6ème A</SelectItem>
                  <SelectItem value="6ème B">6ème B</SelectItem>
                  <SelectItem value="5ème A">5ème A</SelectItem>
                  <SelectItem value="5ème B">5ème B</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="excellent">Excellent</SelectItem>
                  <SelectItem value="good">Bien</SelectItem>
                  <SelectItem value="average">Moyen</SelectItem>
                  <SelectItem value="needs-attention">À suivre</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Students Table */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left p-4 font-semibold text-gray-600">Élève</th>
                    <th className="text-left p-4 font-semibold text-gray-600">Matricule</th>
                    <th className="text-left p-4 font-semibold text-gray-600">Classe</th>
                    <th className="text-left p-4 font-semibold text-gray-600">Moyenne</th>
                    <th className="text-left p-4 font-semibold text-gray-600">Présence</th>
                    <th className="text-left p-4 font-semibold text-gray-600">Statut</th>
                    <th className="text-left p-4 font-semibold text-gray-600">Paiement</th>
                    <th className="text-right p-4 font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2302B3] to-[#4318FF] flex items-center justify-center text-white font-semibold">
                            {student.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{student.name}</p>
                            <p className="text-sm text-gray-500">{student.parent}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <code className="text-sm bg-gray-100 px-2 py-1 rounded">{student.matricule}</code>
                      </td>
                      <td className="p-4">
                        <span className="font-medium text-gray-900">{student.class}</span>
                      </td>
                      <td className="p-4">
                        <span className="font-bold text-gray-900">{student.average}/20</span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${student.attendance >= 95 ? 'bg-green-500' : student.attendance >= 85 ? 'bg-yellow-500' : 'bg-red-500'}`}
                              style={{ width: `${student.attendance}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600">{student.attendance}%</span>
                        </div>
                      </td>
                      <td className="p-4">{getStatusBadge(student.status)}</td>
                      <td className="p-4">{getPaymentBadge(student.paymentStatus)}</td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-1">
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Eye className="w-4 h-4 text-gray-500" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Edit className="w-4 h-4 text-gray-500" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Phone className="w-4 h-4 text-gray-500" />
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
              <p className="text-sm text-gray-500">Affichage 1-8 sur 342 élèves</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>Précédent</Button>
                <Button variant="outline" size="sm" className="bg-[#2302B3] text-white hover:bg-[#1a0285]">1</Button>
                <Button variant="outline" size="sm">2</Button>
                <Button variant="outline" size="sm">3</Button>
                <Button variant="outline" size="sm">...</Button>
                <Button variant="outline" size="sm">43</Button>
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