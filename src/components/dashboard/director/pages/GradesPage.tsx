'use client'

import { useState } from 'react'
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  School,
  Settings,
  FileText,
  CreditCard,
  Calendar,
  BarChart3,
  Bell,
  Search,
  Download,
  Printer,
  Eye,
  FileCheck,
  TrendingUp,
  TrendingDown,
  Award,
  BookOpen,
  Filter
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

const classGrades = [
  { class: '6ème A', students: 32, average: 14.8, highest: 18.5, lowest: 9.2, passed: 28, failed: 4, trend: 'up' },
  { class: '6ème B', students: 30, average: 15.2, highest: 19.0, lowest: 10.1, passed: 27, failed: 3, trend: 'up' },
  { class: '5ème A', students: 28, average: 13.9, highest: 17.8, lowest: 8.5, passed: 23, failed: 5, trend: 'down' },
  { class: '5ème B', students: 31, average: 14.5, highest: 18.2, lowest: 9.8, passed: 26, failed: 5, trend: 'up' },
  { class: '4ème A', students: 29, average: 13.2, highest: 17.5, lowest: 7.9, passed: 22, failed: 7, trend: 'down' },
  { class: '4ème B', students: 27, average: 14.1, highest: 18.0, lowest: 8.8, passed: 23, failed: 4, trend: 'up' },
  { class: '3ème A', students: 30, average: 15.5, highest: 19.2, lowest: 10.5, passed: 28, failed: 2, trend: 'up' },
  { class: '3ème B', students: 28, average: 14.8, highest: 18.8, lowest: 9.5, passed: 25, failed: 3, trend: 'up' },
]

const recentBulletins = [
  { id: 1, student: 'Amina Nkolo', class: '6ème A', trimester: '1er Trimestre', average: 16.5, rank: 2, status: 'printed', date: '15/01/2025' },
  { id: 2, student: 'Paul Mbarga', class: '5ème B', trimester: '1er Trimestre', average: 14.8, rank: 5, status: 'pending', date: '15/01/2025' },
  { id: 3, student: 'Sophie Kamga', class: '6ème A', trimester: '1er Trimestre', average: 17.2, rank: 1, status: 'printed', date: '15/01/2025' },
  { id: 4, student: 'Jean Talla', class: '5ème A', trimester: '1er Trimestre', average: 12.8, rank: 18, status: 'pending', date: '14/01/2025' },
  { id: 5, student: 'Marie Kouam', class: '6ème B', trimester: '1er Trimestre', average: 15.5, rank: 4, status: 'printed', date: '14/01/2025' },
]

export function DirectorGradesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [trimester, setTrimester] = useState('1')
  const [searchQuery, setSearchQuery] = useState('')

  const totalStudents = classGrades.reduce((acc, c) => acc + c.students, 0)
  const overallAverage = (classGrades.reduce((acc, c) => acc + c.average, 0) / classGrades.length).toFixed(1)
  const totalPassed = classGrades.reduce((acc, c) => acc + c.passed, 0)
  const passRate = Math.round((totalPassed / totalStudents) * 100)

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
              <h1 className="text-3xl font-bold text-gray-900">Notes & Bulletins</h1>
              <p className="text-gray-600 mt-1">Gestion des notes et génération des bulletins</p>
            </div>
            <div className="flex gap-3">
              <Select value={trimester} onValueChange={setTrimester}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Trimestre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1er Trimestre</SelectItem>
                  <SelectItem value="2">2ème Trimestre</SelectItem>
                  <SelectItem value="3">3ème Trimestre</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-[#2302B3] hover:bg-[#1a0285] gap-2">
                <Printer className="w-4 h-4" />
                Imprimer bulletins
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
                  <p className="text-2xl font-bold text-gray-900">{totalStudents}</p>
                  <p className="text-sm text-gray-500">Élèves évalués</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{overallAverage}</p>
                  <p className="text-sm text-gray-500">Moyenne générale</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">{passRate}%</p>
                  <p className="text-sm text-gray-500">Taux de réussite</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                  <FileCheck className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">285</p>
                  <p className="text-sm text-gray-500">Bulletins générés</p>
                </div>
              </div>
            </div>
          </div>

          {/* Class Performance Table */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Performance par classe</h3>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="w-4 h-4" />
                Exporter
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left p-4 font-semibold text-gray-600">Classe</th>
                    <th className="text-center p-4 font-semibold text-gray-600">Effectif</th>
                    <th className="text-center p-4 font-semibold text-gray-600">Moyenne</th>
                    <th className="text-center p-4 font-semibold text-gray-600">Max</th>
                    <th className="text-center p-4 font-semibold text-gray-600">Min</th>
                    <th className="text-center p-4 font-semibold text-gray-600">Admis</th>
                    <th className="text-center p-4 font-semibold text-gray-600">Ajournés</th>
                    <th className="text-center p-4 font-semibold text-gray-600">Tendance</th>
                    <th className="text-right p-4 font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {classGrades.map((cls, i) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="p-4">
                        <span className="font-semibold text-gray-900">{cls.class}</span>
                      </td>
                      <td className="p-4 text-center text-gray-600">{cls.students}</td>
                      <td className="p-4 text-center">
                        <span className={`font-bold ${cls.average >= 14 ? 'text-green-600' : cls.average >= 10 ? 'text-orange-600' : 'text-red-600'}`}>
                          {cls.average}
                        </span>
                      </td>
                      <td className="p-4 text-center text-green-600 font-medium">{cls.highest}</td>
                      <td className="p-4 text-center text-red-600 font-medium">{cls.lowest}</td>
                      <td className="p-4 text-center">
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm font-semibold">
                          {cls.passed}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-sm font-semibold">
                          {cls.failed}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        {cls.trend === 'up' ? (
                          <span className="inline-flex items-center gap-1 text-green-600">
                            <TrendingUp className="w-4 h-4" />
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-red-600">
                            <TrendingDown className="w-4 h-4" />
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm" className="gap-1">
                            <Eye className="w-4 h-4" />
                            Détails
                          </Button>
                          <Button variant="ghost" size="sm" className="gap-1">
                            <Printer className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Bulletins */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Bulletins récents</h3>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Rechercher..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="divide-y divide-gray-50">
              {recentBulletins.map((bulletin) => (
                <div key={bulletin.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2302B3] to-[#4318FF] flex items-center justify-center text-white font-semibold">
                      {bulletin.student.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{bulletin.student}</p>
                      <p className="text-sm text-gray-500">{bulletin.class} • {bulletin.trimester}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="font-bold text-gray-900">{bulletin.average}/20</p>
                      <p className="text-xs text-gray-500">Moyenne</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-gray-900">{bulletin.rank}e</p>
                      <p className="text-xs text-gray-500">Rang</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      bulletin.status === 'printed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {bulletin.status === 'printed' ? 'Imprimé' : 'En attente'}
                    </span>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Eye className="w-4 h-4" />
                      Voir
                    </Button>
                  </div>
                </div>
              ))}
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