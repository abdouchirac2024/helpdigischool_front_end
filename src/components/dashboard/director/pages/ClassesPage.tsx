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
  Plus,
  Eye,
  Edit,
  Trash2,
  UserPlus,
  BookOpen,
  Clock,
  TrendingUp,
  Award
} from 'lucide-react'
import { Sidebar, MenuItem } from '../../shared/Sidebar'
import { TopBar } from '../../shared/TopBar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

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

const classes = [
  { id: 1, name: '6ème A', level: '6ème', students: 32, teacher: 'Mme Ngo Marie', average: 14.8, room: 'Salle A1', schedule: '8h-15h', color: 'bg-blue-500' },
  { id: 2, name: '6ème B', level: '6ème', students: 30, teacher: 'M. Kamga Paul', average: 15.2, room: 'Salle A2', schedule: '8h-15h', color: 'bg-blue-500' },
  { id: 3, name: '5ème A', level: '5ème', students: 28, teacher: 'Mme Talla Sophie', average: 13.9, room: 'Salle B1', schedule: '8h-15h', color: 'bg-green-500' },
  { id: 4, name: '5ème B', level: '5ème', students: 31, teacher: 'M. Mbarga Jean', average: 14.5, room: 'Salle B2', schedule: '8h-15h', color: 'bg-green-500' },
  { id: 5, name: '4ème A', level: '4ème', students: 29, teacher: 'Mme Kouam Alice', average: 13.2, room: 'Salle C1', schedule: '8h-16h', color: 'bg-purple-500' },
  { id: 6, name: '4ème B', level: '4ème', students: 27, teacher: 'M. Fouda Eric', average: 14.1, room: 'Salle C2', schedule: '8h-16h', color: 'bg-purple-500' },
  { id: 7, name: '3ème A', level: '3ème', students: 30, teacher: 'Mme Biya Hélène', average: 15.5, room: 'Salle D1', schedule: '8h-16h', color: 'bg-orange-500' },
  { id: 8, name: '3ème B', level: '3ème', students: 28, teacher: 'M. Essomba Robert', average: 14.8, room: 'Salle D2', schedule: '8h-16h', color: 'bg-orange-500' },
  { id: 9, name: '2nde A', level: '2nde', students: 35, teacher: 'M. Nkolo Pierre', average: 13.6, room: 'Salle E1', schedule: '7h30-17h', color: 'bg-red-500' },
  { id: 10, name: '2nde B', level: '2nde', students: 33, teacher: 'Mme Diallo Fatima', average: 14.2, room: 'Salle E2', schedule: '7h30-17h', color: 'bg-red-500' },
  { id: 11, name: '1ère A', level: '1ère', students: 31, teacher: 'M. Sow Ibrahim', average: 14.9, room: 'Salle F1', schedule: '7h30-17h', color: 'bg-indigo-500' },
  { id: 12, name: 'Tle A', level: 'Terminale', students: 28, teacher: 'Mme Muna Christine', average: 15.1, room: 'Salle G1', schedule: '7h30-17h', color: 'bg-pink-500' },
]

export function DirectorClassesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [levelFilter, setLevelFilter] = useState('all')

  const filteredClasses = classes.filter(cls => {
    const matchesSearch = cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.teacher.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLevel = levelFilter === 'all' || cls.level === levelFilter
    return matchesSearch && matchesLevel
  })

  const totalStudents = classes.reduce((acc, cls) => acc + cls.students, 0)
  const averageStudents = Math.round(totalStudents / classes.length)
  const overallAverage = (classes.reduce((acc, cls) => acc + cls.average, 0) / classes.length).toFixed(1)

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
              <h1 className="text-3xl font-bold text-gray-900">Gestion des Classes</h1>
              <p className="text-gray-600 mt-1">{classes.length} classes • {totalStudents} élèves</p>
            </div>
            <Button className="bg-[#2302B3] hover:bg-[#1a0285] gap-2">
              <Plus className="w-4 h-4" />
              Nouvelle classe
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                  <School className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{classes.length}</p>
                  <p className="text-sm text-gray-500">Total classes</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{totalStudents}</p>
                  <p className="text-sm text-gray-500">Total élèves</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{averageStudents}</p>
                  <p className="text-sm text-gray-500">Élèves/classe</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                  <Award className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{overallAverage}</p>
                  <p className="text-sm text-gray-500">Moyenne générale</p>
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
                  placeholder="Rechercher une classe ou un enseignant..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {['all', '6ème', '5ème', '4ème', '3ème', '2nde', '1ère', 'Terminale'].map((level) => (
                  <Button
                    key={level}
                    variant={levelFilter === level ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setLevelFilter(level)}
                    className={levelFilter === level ? 'bg-[#2302B3] hover:bg-[#1a0285]' : ''}
                  >
                    {level === 'all' ? 'Tous' : level}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Classes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClasses.map((cls) => (
              <div key={cls.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
                <div className={`${cls.color} p-4`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white">{cls.name}</h3>
                      <p className="text-white/80 text-sm">{cls.level}</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                      <School className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
                <div className="p-4 space-y-4">
                  {/* Teacher */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2302B3] to-[#4318FF] flex items-center justify-center text-white font-semibold text-sm">
                      {cls.teacher.split(' ')[1]?.charAt(0) || cls.teacher.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{cls.teacher}</p>
                      <p className="text-xs text-gray-500">Professeur principal</p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <p className="text-lg font-bold text-gray-900">{cls.students}</p>
                      <p className="text-xs text-gray-500">Élèves</p>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <p className="text-lg font-bold text-gray-900">{cls.average}</p>
                      <p className="text-xs text-gray-500">Moyenne</p>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <p className="text-lg font-bold text-gray-900">{cls.room}</p>
                      <p className="text-xs text-gray-500">Salle</p>
                    </div>
                  </div>

                  {/* Schedule */}
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>Horaires: {cls.schedule}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2 border-t border-gray-100">
                    <Button variant="outline" size="sm" className="flex-1 gap-1">
                      <Eye className="w-4 h-4" />
                      Voir
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 gap-1">
                      <Edit className="w-4 h-4" />
                      Modifier
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1">
                      <UserPlus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
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