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
  ChevronLeft,
  ChevronRight
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

const schedule = {
  Lundi: [
    { time: '08:00 - 10:00', subject: 'Mathématiques', teacher: 'M. Kamga', room: 'Salle 12', color: 'bg-blue-500' },
    { time: '10:15 - 12:15', subject: 'Français', teacher: 'Mme Kouam', room: 'Salle 12', color: 'bg-purple-500' },
    { time: '14:00 - 15:30', subject: 'Sciences', teacher: 'M. Nkolo', room: 'Labo 2', color: 'bg-green-500' },
    { time: '15:45 - 17:00', subject: 'Histoire-Géo', teacher: 'Mme Fouda', room: 'Salle 12', color: 'bg-orange-500' },
  ],
  Mardi: [
    { time: '08:00 - 10:00', subject: 'Français', teacher: 'Mme Kouam', room: 'Salle 12', color: 'bg-purple-500' },
    { time: '10:15 - 12:15', subject: 'Anglais', teacher: 'M. Brown', room: 'Salle 8', color: 'bg-red-500' },
    { time: '14:00 - 15:30', subject: 'Mathématiques', teacher: 'M. Kamga', room: 'Salle 12', color: 'bg-blue-500' },
    { time: '15:45 - 17:00', subject: 'Éd. Physique', teacher: 'M. Essomba', room: 'Terrain', color: 'bg-yellow-500' },
  ],
  Mercredi: [
    { time: '08:00 - 10:00', subject: 'Sciences', teacher: 'M. Nkolo', room: 'Labo 2', color: 'bg-green-500' },
    { time: '10:15 - 12:15', subject: 'Mathématiques', teacher: 'M. Kamga', room: 'Salle 12', color: 'bg-blue-500' },
  ],
  Jeudi: [
    { time: '08:00 - 10:00', subject: 'Histoire-Géo', teacher: 'Mme Fouda', room: 'Salle 12', color: 'bg-orange-500' },
    { time: '10:15 - 12:15', subject: 'Français', teacher: 'Mme Kouam', room: 'Salle 12', color: 'bg-purple-500' },
    { time: '14:00 - 15:30', subject: 'Anglais', teacher: 'M. Brown', room: 'Salle 8', color: 'bg-red-500' },
    { time: '15:45 - 17:00', subject: 'Arts Plastiques', teacher: 'Mme Mbarga', room: 'Atelier', color: 'bg-pink-500' },
  ],
  Vendredi: [
    { time: '08:00 - 10:00', subject: 'Mathématiques', teacher: 'M. Kamga', room: 'Salle 12', color: 'bg-blue-500' },
    { time: '10:15 - 12:15', subject: 'Sciences', teacher: 'M. Nkolo', room: 'Labo 2', color: 'bg-green-500' },
    { time: '14:00 - 15:30', subject: 'Français', teacher: 'Mme Kouam', room: 'Salle 12', color: 'bg-purple-500' },
    { time: '15:45 - 17:00', subject: 'Éd. Physique', teacher: 'M. Essomba', room: 'Terrain', color: 'bg-yellow-500' },
  ],
}

export function StudentSchedulePage() {
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
              <h1 className="text-3xl font-bold text-gray-900">Emploi du Temps</h1>
              <p className="text-gray-600 mt-1">Semaine du 13 au 17 Janvier 2025</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline">Aujourd'hui</Button>
              <Button variant="outline" size="icon">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Schedule Grid */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-5 divide-x divide-gray-100">
              {Object.entries(schedule).map(([day, courses]) => (
                <div key={day} className="min-h-[500px]">
                  <div className="p-4 bg-gray-50 border-b border-gray-100 text-center">
                    <h3 className="font-semibold text-gray-900">{day}</h3>
                  </div>
                  <div className="p-2 space-y-2">
                    {courses.map((course, i) => (
                      <div
                        key={i}
                        className={`p-3 rounded-xl ${course.color}/10 border-l-4 ${course.color}`}
                      >
                        <p className="text-xs text-gray-500 mb-1">{course.time}</p>
                        <p className="font-semibold text-gray-900 text-sm">{course.subject}</p>
                        <p className="text-xs text-gray-600">{course.teacher}</p>
                        <p className="text-xs text-gray-400 mt-1">{course.room}</p>
                      </div>
                    ))}
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