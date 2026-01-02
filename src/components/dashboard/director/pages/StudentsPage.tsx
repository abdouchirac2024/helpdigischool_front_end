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
  ClipboardList
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
  { icon: LayoutDashboard, label: 'Tableau de bord', href: '/dashboard' },
  { icon: Users, label: 'Élèves', href: '/dashboard/students', badge: '450' },
  { icon: GraduationCap, label: 'Enseignants', href: '/dashboard/teachers' },
  { icon: School, label: 'Classes', href: '/dashboard/classes' },
  { icon: FileText, label: 'Rapports', href: '/dashboard/reports' },
  { icon: Settings, label: 'Paramètres', href: '/dashboard/settings' },
]

const students = [
  { id: 1, name: 'Amina Nkolo', gender: 'F', age: 11, class: 'CM2-A', average: 18.5, attendance: 98, status: 'excellent', parent: 'M. Nkolo', phone: '6 77 88 99 00', email: 'nkolo@email.cm' },
  { id: 2, name: 'Paul Mbarga', gender: 'M', age: 12, class: 'CM2-B', average: 17.8, attendance: 96, status: 'excellent', parent: 'Mme Mbarga', phone: '6 55 66 77 88', email: 'mbarga@email.cm' },
  { id: 3, name: 'Sophie Kamga', gender: 'F', age: 11, class: 'CM2-A', average: 17.2, attendance: 94, status: 'excellent', parent: 'M. Kamga', phone: '6 99 00 11 22', email: 'kamga@email.cm' },
  { id: 4, name: 'Jean Talla', gender: 'M', age: 12, class: 'CM1-A', average: 15.8, attendance: 92, status: 'good', parent: 'M. Talla', phone: '6 88 77 66 55', email: 'talla@email.cm' },
  { id: 5, name: 'Marie Kouam', gender: 'F', age: 11, class: 'CM1-B', average: 14.5, attendance: 90, status: 'good', parent: 'Mme Kouam', phone: '6 44 55 66 77', email: 'kouam@email.cm' },
  { id: 6, name: 'David Ngo', gender: 'M', age: 12, class: 'CM2-A', average: 13.2, attendance: 88, status: 'average', parent: 'M. Ngo', phone: '6 33 44 55 66', email: 'ngo@email.cm' },
  { id: 7, name: 'Sarah Biya', gender: 'F', age: 11, class: 'CE2-A', average: 12.8, attendance: 85, status: 'average', parent: 'Mme Biya', phone: '6 22 33 44 55', email: 'biya@email.cm' },
  { id: 8, name: 'Eric Muna', gender: 'M', age: 12, class: 'CM2-B', average: 11.5, attendance: 82, status: 'needs-attention', parent: 'M. Muna', phone: '6 11 22 33 44', email: 'muna@email.cm' },
  { id: 9, name: 'Fatima Sow', gender: 'F', age: 11, class: 'CM1-A', average: 16.5, attendance: 95, status: 'excellent', parent: 'M. Sow', phone: '6 77 66 55 44', email: 'sow@email.cm' },
  { id: 10, name: 'Ibrahim Diallo', gender: 'M', age: 12, class: 'CM2-A', average: 15.2, attendance: 91, status: 'good', parent: 'Mme Diallo', phone: '6 88 99 00 11', email: 'diallo@email.cm' },
]

export function DirectorStudentsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [genderFilter, setGenderFilter] = useState('all')
  const [classFilter, setClassFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesGender = genderFilter === 'all' || student.gender === genderFilter
    const matchesClass = classFilter === 'all' || student.class === classFilter
    const matchesStatus = statusFilter === 'all' || student.status === statusFilter
    return matchesSearch && matchesGender && matchesClass && matchesStatus
  })

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedStudents = filteredStudents.slice(startIndex, startIndex + itemsPerPage)

  const getStatusBadge = (status: string) => {
    const styles = {
      excellent: 'bg-green-100 text-green-700 border-green-200',
      good: 'bg-blue-100 text-blue-700 border-blue-200',
      average: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      'needs-attention': 'bg-red-100 text-red-700 border-red-200',
    }
    const labels = {
      excellent: 'Excellent',
      good: 'Bien',
      average: 'Moyen',
      'needs-attention': 'À suivre',
    }
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar 
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        userName="Directeur"
        userRole="Direction"
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
              <h1 className="text-3xl font-bold text-gray-900">Gestion des Élèves</h1>
              <p className="text-gray-600 mt-1">Tous les élèves • {filteredStudents.length} élèves</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Exporter
              </Button>
              <Button className="bg-[#2302B3] hover:bg-[#1a0285] gap-2">
                <Mail className="w-4 h-4" />
                Contacter parents
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total élèves</p>
                  <p className="text-2xl font-bold text-gray-900">450</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Moyenne générale</p>
                  <p className="text-2xl font-bold text-gray-900">14.8/20</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Présence moyenne</p>
                  <p className="text-2xl font-bold text-gray-900">93%</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center">
                  <ClipboardList className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Classes</p>
                  <p className="text-2xl font-bold text-gray-900">18</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-yellow-50 flex items-center justify-center">
                  <School className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Rechercher un élève..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={classFilter} onValueChange={setClassFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Classe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les classes</SelectItem>
                  <SelectItem value="CM2-A">CM2-A</SelectItem>
                  <SelectItem value="CM2-B">CM2-B</SelectItem>
                  <SelectItem value="CM1-A">CM1-A</SelectItem>
                  <SelectItem value="CM1-B">CM1-B</SelectItem>
                  <SelectItem value="CE2-A">CE2-A</SelectItem>
                </SelectContent>
              </Select>
              <Select value={genderFilter} onValueChange={setGenderFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="M">Garçons</SelectItem>
                  <SelectItem value="F">Filles</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="excellent">Excellent</SelectItem>
                  <SelectItem value="good">Bien</SelectItem>
                  <SelectItem value="average">Moyen</SelectItem>
                  <SelectItem value="needs-attention">À suivre</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Students Table */}
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Élève
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Classe
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Genre
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Âge
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Moyenne
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Présence
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Parent
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2302B3] to-[#4318FF] flex items-center justify-center text-white font-semibold">
                            {student.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{student.name}</p>
                            <p className="text-sm text-gray-500">{student.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">{student.class}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">{student.gender === 'M' ? 'Garçon' : 'Fille'}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">{student.age} ans</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-semibold text-gray-900">{student.average}/20</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden w-16">
                            <div 
                              className={`h-full ${student.attendance >= 95 ? 'bg-green-500' : student.attendance >= 85 ? 'bg-yellow-500' : 'bg-red-500'}`}
                              style={{ width: `${student.attendance}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-900">{student.attendance}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(student.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{student.parent}</p>
                          <p className="text-xs text-gray-500">{student.phone}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Phone className="w-4 h-4" />
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
            
            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              itemsPerPage={itemsPerPage}
              totalItems={filteredStudents.length}
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
