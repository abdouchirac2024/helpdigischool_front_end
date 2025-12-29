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
  Plus,
  Edit,
  Trash2,
  Clock,
  FileDown
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

const courses = [
  { id: 1, name: 'Mathématiques', hours: 6, color: 'bg-blue-500', lessons: 24, completed: 18 },
  { id: 2, name: 'Français', hours: 8, color: 'bg-green-500', lessons: 32, completed: 25 },
  { id: 3, name: 'Sciences', hours: 4, color: 'bg-purple-500', lessons: 16, completed: 12 },
  { id: 4, name: 'Histoire-Géographie', hours: 3, color: 'bg-orange-500', lessons: 12, completed: 9 },
  { id: 5, name: 'Anglais', hours: 2, color: 'bg-pink-500', lessons: 8, completed: 6 },
]

export function TeacherCoursesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

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
              <h1 className="text-3xl font-bold text-gray-900">Mes Cours</h1>
              <p className="text-gray-600 mt-1">Classe CM2-A • Année 2024-2025</p>
            </div>
            <Button className="bg-[#2302B3] hover:bg-[#1a0285] gap-2">
              <Plus className="w-4 h-4" />
              Nouveau cours
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <p className="text-sm text-gray-600 mb-1">Total matières</p>
              <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <p className="text-sm text-gray-600 mb-1">Heures/semaine</p>
              <p className="text-2xl font-bold text-gray-900">{courses.reduce((acc, c) => acc + c.hours, 0)}h</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <p className="text-sm text-gray-600 mb-1">Leçons totales</p>
              <p className="text-2xl font-bold text-gray-900">{courses.reduce((acc, c) => acc + c.lessons, 0)}</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <p className="text-sm text-gray-600 mb-1">Progression</p>
              <p className="text-2xl font-bold text-green-600">
                {Math.round((courses.reduce((acc, c) => acc + c.completed, 0) / courses.reduce((acc, c) => acc + c.lessons, 0)) * 100)}%
              </p>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
                <div className={`h-2 ${course.color}`} />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{course.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{course.hours}h par semaine</p>
                    </div>
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">Progression</span>
                        <span className="font-semibold text-gray-900">
                          {course.completed}/{course.lessons} leçons
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${course.color}`}
                          style={{ width: `${(course.completed / course.lessons) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 pt-3 border-t border-gray-100">
                      <Button size="sm" variant="outline" className="flex-1 gap-2">
                        <FileDown className="w-4 h-4" />
                        Programme
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 gap-2">
                        <Clock className="w-4 h-4" />
                        Planning
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Lessons */}
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h3 className="text-lg font-semibold mb-4">Dernières leçons</h3>
            <div className="space-y-3">
              {[
                { subject: 'Mathématiques', title: 'Les fractions', date: 'Aujourd\'hui', status: 'completed' },
                { subject: 'Français', title: 'Le passé composé', date: 'Hier', status: 'completed' },
                { subject: 'Sciences', title: 'Le cycle de l\'eau', date: 'Il y a 2 jours', status: 'completed' },
                { subject: 'Histoire', title: 'La colonisation', date: 'Il y a 3 jours', status: 'completed' },
              ].map((lesson, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{lesson.title}</p>
                      <p className="text-sm text-gray-500">{lesson.subject} • {lesson.date}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                    Terminée
                  </span>
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
