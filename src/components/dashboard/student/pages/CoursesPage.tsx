'use client'

import { useState } from 'react'
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  Award,
  FileText,
  MessageSquare,
  Library,
  Settings,
  Play,
  Download,
  Clock
} from 'lucide-react'
import { Sidebar, MenuItem } from '../../shared/Sidebar'
import { TopBar } from '../../shared/TopBar'
import { Button } from '@/components/ui/button'

const menuItems: MenuItem[] = [
  { icon: LayoutDashboard, label: 'Tableau de bord', href: '/dashboard/student' },
  { icon: Award, label: 'Mes Notes', href: '/dashboard/student/grades' },
  { icon: BookOpen, label: 'Mes Cours', href: '/dashboard/student/courses' },
  { icon: Calendar, label: 'Emploi du temps', href: '/dashboard/student/schedule' },
  { icon: FileText, label: 'Devoirs', href: '/dashboard/student/homework', badge: '3' },
  { icon: MessageSquare, label: 'Messages', href: '/dashboard/student/messages', badge: '2' },
  { icon: Library, label: 'Bibliothèque', href: '/dashboard/student/library' },
  { icon: Settings, label: 'Paramètres', href: '/dashboard/student/settings' },
]

const courses = [
  {
    name: 'Mathématiques',
    teacher: 'M. Kamga',
    progress: 75,
    lessons: 12,
    completed: 9,
    color: 'bg-blue-500',
    nextLesson: 'Les fractions - Partie 3'
  },
  {
    name: 'Français',
    teacher: 'Mme Kouam',
    progress: 68,
    lessons: 15,
    completed: 10,
    color: 'bg-purple-500',
    nextLesson: 'La conjugaison au passé composé'
  },
  {
    name: 'Sciences',
    teacher: 'M. Nkolo',
    progress: 60,
    lessons: 10,
    completed: 6,
    color: 'bg-green-500',
    nextLesson: 'Le système solaire'
  },
  {
    name: 'Histoire-Géographie',
    teacher: 'Mme Fouda',
    progress: 55,
    lessons: 12,
    completed: 7,
    color: 'bg-orange-500',
    nextLesson: 'Les grandes découvertes'
  },
  {
    name: 'Anglais',
    teacher: 'M. Brown',
    progress: 80,
    lessons: 10,
    completed: 8,
    color: 'bg-red-500',
    nextLesson: 'Present Perfect Tense'
  },
]

export function StudentCoursesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        userName="Amina Talla"
        userRole="Élève - CM2-A"
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
              <h1 className="text-3xl font-bold text-gray-900">Mes Cours</h1>
              <p className="text-gray-600 mt-1">5 matières • Année scolaire 2024/2025</p>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all">
                <div className={`${course.color} h-2`} />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{course.name}</h3>
                      <p className="text-sm text-gray-500">{course.teacher}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-xl ${course.color}/10 flex items-center justify-center`}>
                      <BookOpen className={`w-6 h-6 ${course.color.replace('bg-', 'text-')}`} />
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600">Progression</span>
                      <span className="font-semibold text-gray-900">{course.progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${course.color}`}
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">{course.completed}/{course.lessons} leçons terminées</p>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-xl mb-4">
                    <p className="text-xs text-gray-500 mb-1">Prochaine leçon</p>
                    <p className="text-sm font-medium text-gray-900">{course.nextLesson}</p>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 bg-[#2302B3] hover:bg-[#1a0285] gap-2" size="sm">
                      <Play className="w-4 h-4" />
                      Continuer
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4" />
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