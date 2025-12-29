'use client'

import { useState } from 'react'
import { 
  LayoutDashboard,
  Users,
  FileText,
  BookOpen,
  Calendar,
  MessageSquare,
  Award,
  ClipboardList,
  Check,
  X,
  AlertCircle,
  Download,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { Sidebar, MenuItem } from '../../shared/Sidebar'
import { TopBar } from '../../shared/TopBar'
import { Button } from '@/components/ui/button'

const menuItems: MenuItem[] = [
  { icon: LayoutDashboard, label: 'Tableau de bord', href: '/dashboard/teacher' },
  { icon: Users, label: 'Mes élèves', href: '/dashboard/teacher/students', badge: '32' },
  { icon: FileText, label: 'Saisie des notes', href: '/dashboard/teacher/grades' },
  { icon: BookOpen, label: 'Mes cours', href: '/dashboard/teacher/courses' },
  { icon: Calendar, label: 'Emploi du temps', href: '/dashboard/teacher/schedule' },
  { icon: ClipboardList, label: 'Présences', href: '/dashboard/teacher/attendance' },
  { icon: MessageSquare, label: 'Messages', href: '/dashboard/teacher/messages', badge: '3' },
  { icon: Award, label: 'Évaluations', href: '/dashboard/teacher/evaluations' },
]

const students = [
  { id: 1, name: 'Amina Nkolo', status: 'present' },
  { id: 2, name: 'Paul Mbarga', status: 'present' },
  { id: 3, name: 'Sophie Kamga', status: 'present' },
  { id: 4, name: 'Jean Talla', status: 'absent' },
  { id: 5, name: 'Marie Kouam', status: 'present' },
  { id: 6, name: 'David Ngo', status: 'late' },
  { id: 7, name: 'Sarah Biya', status: 'present' },
  { id: 8, name: 'Eric Muna', status: 'present' },
]

export function TeacherAttendancePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [attendance, setAttendance] = useState<{[key: number]: string}>(
    students.reduce((acc, student) => ({ ...acc, [student.id]: student.status }), {})
  )
  const [currentDate, setCurrentDate] = useState(new Date())

  const handleAttendanceChange = (studentId: number, status: string) => {
    setAttendance(prev => ({ ...prev, [studentId]: status }))
  }

  const presentCount = Object.values(attendance).filter(s => s === 'present').length
  const absentCount = Object.values(attendance).filter(s => s === 'absent').length
  const lateCount = Object.values(attendance).filter(s => s === 'late').length
  const attendanceRate = Math.round((presentCount / students.length) * 100)

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const changeDate = (days: number) => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() + days)
    setCurrentDate(newDate)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar 
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        userName="Marie Kouam"
        userRole="Enseignante CM2"
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
              <h1 className="text-3xl font-bold text-gray-900">Feuille de Présence</h1>
              <p className="text-gray-600 mt-1">Classe CM2-A</p>
            </div>
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Exporter
            </Button>
          </div>

          {/* Date Selector */}
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <div className="flex items-center justify-between">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => changeDate(-1)}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-900 capitalize">
                  {formatDate(currentDate)}
                </p>
                <p className="text-sm text-gray-500">
                  {currentDate.toDateString() === new Date().toDateString() ? "Aujourd'hui" : ''}
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => changeDate(1)}
                disabled={currentDate >= new Date()}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Présents</p>
                  <p className="text-2xl font-bold text-green-600">{presentCount}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center">
                  <Check className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Absents</p>
                  <p className="text-2xl font-bold text-red-600">{absentCount}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center">
                  <X className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Retards</p>
                  <p className="text-2xl font-bold text-orange-600">{lateCount}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-orange-50 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Taux de présence</p>
                  <p className="text-2xl font-bold text-blue-600">{attendanceRate}%</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                  <ClipboardList className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Attendance List */}
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <h3 className="font-semibold text-gray-900">Liste des élèves</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {students.map((student, index) => (
                <div key={student.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium text-gray-500 w-8">{index + 1}</span>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2302B3] to-[#4318FF] flex items-center justify-center text-white font-semibold">
                          {student.name.charAt(0)}
                        </div>
                        <span className="font-medium text-gray-900">{student.name}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant={attendance[student.id] === 'present' ? 'default' : 'outline'}
                        className={attendance[student.id] === 'present' ? 'bg-green-600 hover:bg-green-700' : ''}
                        onClick={() => handleAttendanceChange(student.id, 'present')}
                      >
                        <Check className="w-4 h-4 mr-1" />
                        Présent
                      </Button>
                      <Button
                        size="sm"
                        variant={attendance[student.id] === 'absent' ? 'default' : 'outline'}
                        className={attendance[student.id] === 'absent' ? 'bg-red-600 hover:bg-red-700' : ''}
                        onClick={() => handleAttendanceChange(student.id, 'absent')}
                      >
                        <X className="w-4 h-4 mr-1" />
                        Absent
                      </Button>
                      <Button
                        size="sm"
                        variant={attendance[student.id] === 'late' ? 'default' : 'outline'}
                        className={attendance[student.id] === 'late' ? 'bg-orange-600 hover:bg-orange-700' : ''}
                        onClick={() => handleAttendanceChange(student.id, 'late')}
                      >
                        <AlertCircle className="w-4 h-4 mr-1" />
                        Retard
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button className="bg-[#2302B3] hover:bg-[#1a0285] gap-2" size="lg">
              <Check className="w-5 h-5" />
              Enregistrer la présence
            </Button>
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
