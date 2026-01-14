'use client'

import { useState } from 'react'
import {
  LayoutDashboard,
  Users,
  UserPlus,
  CreditCard,
  FileText,
  Phone,
  Calendar,
  Printer,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  MoreVertical,
  Mail,
  MapPin
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
  { icon: LayoutDashboard, label: 'Tableau de bord', href: '/dashboard/secretary' },
  { icon: Users, label: 'Élèves', href: '/dashboard/secretary/students', badge: '342' },
  { icon: UserPlus, label: 'Inscriptions', href: '/dashboard/secretary/enrollments', badge: '5' },
  { icon: CreditCard, label: 'Paiements', href: '/dashboard/secretary/payments' },
  { icon: FileText, label: 'Documents', href: '/dashboard/secretary/documents' },
  { icon: Phone, label: 'Contacts', href: '/dashboard/secretary/contacts' },
  { icon: Calendar, label: 'Rendez-vous', href: '/dashboard/secretary/appointments', badge: '3' },
  { icon: Printer, label: 'Impressions', href: '/dashboard/secretary/printing' },
]

const students = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  matricule: `2024-${String(i + 1).padStart(4, '0')}`,
  name: ['Amina Talla', 'Paul Ngo', 'Marie Kouam', 'Jean Mbarga', 'Sophie Kamga', 'Pierre Fotso', 'Claire Biya', 'André Nkolo'][i % 8],
  class: ['CM2-A', 'CM1-B', 'CE2-A', 'CE1-B', 'CP-A', 'SIL-B'][i % 6],
  gender: i % 2 === 0 ? 'F' : 'M',
  birthDate: `${10 + (i % 5)}/0${(i % 9) + 1}/201${3 + (i % 4)}`,
  parent: ['M. Talla', 'Mme Ngo', 'M. Kouam', 'Mme Mbarga', 'M. Kamga', 'Mme Fotso', 'M. Biya', 'Mme Nkolo'][i % 8],
  phone: `6 ${70 + (i % 30)} ${10 + (i % 90)} ${20 + (i % 80)} ${30 + (i % 70)}`,
  paymentStatus: ['paid', 'partial', 'pending'][i % 3],
  enrollmentDate: '15/09/2024'
}))

export function SecretaryStudentsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [classFilter, setClassFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.matricule.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesClass = classFilter === 'all' || student.class === classFilter
    return matchesSearch && matchesClass
  })

  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const getPaymentBadge = (status: string) => {
    const styles = {
      paid: 'bg-green-100 text-green-700',
      partial: 'bg-yellow-100 text-yellow-700',
      pending: 'bg-red-100 text-red-700'
    }
    const labels = { paid: 'Soldé', partial: 'Partiel', pending: 'Impayé' }
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
        userName="Sophie Mballa"
        userRole="Secrétaire"
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
              <p className="text-gray-600 mt-1">{filteredStudents.length} élèves inscrits</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Exporter
              </Button>
              <Button className="bg-[#2302B3] hover:bg-[#1a0285] gap-2">
                <UserPlus className="w-4 h-4" />
                Nouvelle inscription
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <p className="text-sm text-gray-600 mb-1">Total élèves</p>
              <p className="text-2xl font-bold text-gray-900">342</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <p className="text-sm text-gray-600 mb-1">Garçons</p>
              <p className="text-2xl font-bold text-blue-600">178</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <p className="text-sm text-gray-600 mb-1">Filles</p>
              <p className="text-2xl font-bold text-pink-600">164</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <p className="text-sm text-gray-600 mb-1">Paiements soldés</p>
              <p className="text-2xl font-bold text-green-600">85%</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Rechercher par nom ou matricule..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
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
                  <SelectItem value="CM1-B">CM1-B</SelectItem>
                  <SelectItem value="CE2-A">CE2-A</SelectItem>
                  <SelectItem value="CE1-B">CE1-B</SelectItem>
                  <SelectItem value="CP-A">CP-A</SelectItem>
                  <SelectItem value="SIL-B">SIL-B</SelectItem>
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
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Matricule</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Élève</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Classe</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date naissance</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Parent</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Téléphone</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Paiement</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <span className="font-mono text-sm text-gray-600">{student.matricule}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold ${
                            student.gender === 'F' ? 'bg-pink-500' : 'bg-blue-500'
                          }`}>
                            {student.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{student.name}</p>
                            <p className="text-xs text-gray-500">{student.gender === 'F' ? 'Fille' : 'Garçon'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded">
                          {student.class}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{student.birthDate}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{student.parent}</td>
                      <td className="px-4 py-3">
                        <a href={`tel:${student.phone}`} className="text-sm text-[#2302B3] hover:underline">
                          {student.phone}
                        </a>
                      </td>
                      <td className="px-4 py-3">{getPaymentBadge(student.paymentStatus)}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Printer className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Affichage {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredStudents.length)} sur {filteredStudents.length}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  Précédent
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage * itemsPerPage >= filteredStudents.length}
                >
                  Suivant
                </Button>
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