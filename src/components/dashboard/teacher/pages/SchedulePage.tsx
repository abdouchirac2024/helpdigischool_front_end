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
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin
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

const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi']
const hours = ['07:30', '08:30', '09:30', '10:30', '11:30', '12:30', '14:00', '15:00', '16:00']

const schedule = [
  { day: 0, hour: 0, subject: 'Mathématiques', class: 'CM2-A', room: 'Salle 12', color: 'bg-blue-500' },
  { day: 0, hour: 1, subject: 'Mathématiques', class: 'CM2-A', room: 'Salle 12', color: 'bg-blue-500' },
  { day: 0, hour: 2, subject: 'Français', class: 'CM2-A', room: 'Salle 12', color: 'bg-green-500' },
  { day: 0, hour: 3, subject: 'Français', class: 'CM2-A', room: 'Salle 12', color: 'bg-green-500' },
  { day: 0, hour: 6, subject: 'Sciences', class: 'CM2-A', room: 'Labo', color: 'bg-purple-500' },
  { day: 0, hour: 7, subject: 'Sciences', class: 'CM2-A', room: 'Labo', color: 'bg-purple-500' },

  { day: 1, hour: 0, subject: 'Français', class: 'CM2-A', room: 'Salle 12', color: 'bg-green-500' },
  { day: 1, hour: 1, subject: 'Français', class: 'CM2-A', room: 'Salle 12', color: 'bg-green-500' },
  { day: 1, hour: 2, subject: 'Histoire-Géo', class: 'CM2-A', room: 'Salle 12', color: 'bg-orange-500' },
  { day: 1, hour: 6, subject: 'Mathématiques', class: 'CM2-A', room: 'Salle 12', color: 'bg-blue-500' },
  { day: 1, hour: 7, subject: 'Anglais', class: 'CM2-A', room: 'Salle 8', color: 'bg-pink-500' },

  { day: 2, hour: 0, subject: 'Mathématiques', class: 'CM2-A', room: 'Salle 12', color: 'bg-blue-500' },
  { day: 2, hour: 1, subject: 'Français', class: 'CM2-A', room: 'Salle 12', color: 'bg-green-500' },
  { day: 2, hour: 2, subject: 'Français', class: 'CM2-A', room: 'Salle 12', color: 'bg-green-500' },

  { day: 3, hour: 0, subject: 'Sciences', class: 'CM2-A', room: 'Labo', color: 'bg-purple-500' },
  { day: 3, hour: 1, subject: 'Sciences', class: 'CM2-A', room: 'Labo', color: 'bg-purple-500' },
  { day: 3, hour: 2, subject: 'Mathématiques', class: 'CM2-A', room: 'Salle 12', color: 'bg-blue-500' },
  { day: 3, hour: 3, subject: 'Histoire-Géo', class: 'CM2-A', room: 'Salle 12', color: 'bg-orange-500' },
  { day: 3, hour: 6, subject: 'Français', class: 'CM2-A', room: 'Salle 12', color: 'bg-green-500' },
  { day: 3, hour: 7, subject: 'Français', class: 'CM2-A', room: 'Salle 12', color: 'bg-green-500' },

  { day: 4, hour: 0, subject: 'Anglais', class: 'CM2-A', room: 'Salle 8', color: 'bg-pink-500' },
  { day: 4, hour: 1, subject: 'Mathématiques', class: 'CM2-A', room: 'Salle 12', color: 'bg-blue-500' },
  { day: 4, hour: 2, subject: 'Mathématiques', class: 'CM2-A', room: 'Salle 12', color: 'bg-blue-500' },
  { day: 4, hour: 6, subject: 'Histoire-Géo', class: 'CM2-A', room: 'Salle 12', color: 'bg-orange-500' },
]

export function TeacherSchedulePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentWeek, setCurrentWeek] = useState('13 - 17 Janvier 2025')

  const getScheduleForSlot = (dayIndex: number, hourIndex: number) => {
    return schedule.find(s => s.day === dayIndex && s.hour === hourIndex)
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
              <h1 className="text-3xl font-bold text-gray-900">Emploi du temps</h1>
              <p className="text-gray-600 mt-1">Classe CM2-A • Année 2024-2025</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" onClick={() => setCurrentWeek('6 - 10 Janvier 2025')}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="font-medium text-gray-900 min-w-[180px] text-center">{currentWeek}</span>
              <Button variant="outline" size="icon" onClick={() => setCurrentWeek('20 - 24 Janvier 2025')}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <p className="text-sm text-gray-600 mb-1">Heures cette semaine</p>
              <p className="text-2xl font-bold text-gray-900">23h</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <p className="text-sm text-gray-600 mb-1">Cours aujourd'hui</p>
              <p className="text-2xl font-bold text-[#2302B3]">4</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <p className="text-sm text-gray-600 mb-1">Prochain cours</p>
              <p className="text-2xl font-bold text-gray-900">14:00</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <p className="text-sm text-gray-600 mb-1">Salle</p>
              <p className="text-2xl font-bold text-gray-900">Salle 12</p>
            </div>
          </div>

          {/* Schedule Grid */}
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 w-20">
                      <Clock className="w-4 h-4" />
                    </th>
                    {days.map((day) => (
                      <th key={day} className="px-4 py-3 text-center text-sm font-semibold text-gray-900">
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {hours.map((hour, hourIndex) => (
                    <tr key={hour} className={hourIndex === 4 || hourIndex === 5 ? 'bg-gray-50' : ''}>
                      <td className="px-4 py-2 text-sm font-medium text-gray-600 border-r border-gray-100">
                        {hour}
                      </td>
                      {days.map((_, dayIndex) => {
                        const slot = getScheduleForSlot(dayIndex, hourIndex)
                        if (hourIndex === 4 || hourIndex === 5) {
                          return (
                            <td key={dayIndex} className="px-2 py-2 text-center text-xs text-gray-400">
                              {hourIndex === 4 ? 'Pause' : ''}
                            </td>
                          )
                        }
                        return (
                          <td key={dayIndex} className="px-2 py-2">
                            {slot ? (
                              <div className={`${slot.color} text-white rounded-lg p-2 text-xs`}>
                                <p className="font-semibold">{slot.subject}</p>
                                <p className="opacity-90">{slot.class}</p>
                                <div className="flex items-center gap-1 mt-1 opacity-80">
                                  <MapPin className="w-3 h-3" />
                                  <span>{slot.room}</span>
                                </div>
                              </div>
                            ) : (
                              <div className="h-16" />
                            )}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Today's Classes */}
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h3 className="text-lg font-semibold mb-4">Cours d'aujourd'hui</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { time: '07:30 - 09:30', subject: 'Mathématiques', room: 'Salle 12', status: 'completed' },
                { time: '09:30 - 11:30', subject: 'Français', room: 'Salle 12', status: 'completed' },
                { time: '14:00 - 15:00', subject: 'Sciences', room: 'Labo', status: 'upcoming' },
                { time: '15:00 - 16:00', subject: 'Sciences', room: 'Labo', status: 'upcoming' },
              ].map((course, i) => (
                <div key={i} className={`flex items-center gap-4 p-4 rounded-xl border ${
                  course.status === 'completed' ? 'border-gray-100 bg-gray-50' : 'border-[#2302B3]/20 bg-[#2302B3]/5'
                }`}>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    course.status === 'completed' ? 'bg-gray-200' : 'bg-[#2302B3]'
                  }`}>
                    <BookOpen className={`w-6 h-6 ${course.status === 'completed' ? 'text-gray-500' : 'text-white'}`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{course.subject}</p>
                    <p className="text-sm text-gray-600">{course.time} • {course.room}</p>
                  </div>
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    course.status === 'completed'
                      ? 'bg-gray-200 text-gray-600'
                      : 'bg-[#2302B3] text-white'
                  }`}>
                    {course.status === 'completed' ? 'Terminé' : 'À venir'}
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