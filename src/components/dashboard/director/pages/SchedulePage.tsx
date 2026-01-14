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
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  MapPin,
  Download,
  Printer
} from 'lucide-react'
import { Sidebar, MenuItem } from '../../shared/Sidebar'
import { TopBar } from '../../shared/TopBar'
import { Button } from '@/components/ui/button'
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

const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
const hours = ['07:30', '08:30', '09:30', '10:30', '11:30', '12:30', '13:30', '14:30', '15:30', '16:30']

const scheduleData: Record<string, Record<string, { subject: string; teacher: string; room: string; color: string }>> = {
  'Lundi': {
    '07:30': { subject: 'Mathématiques', teacher: 'Mme Ngo', room: 'A1', color: 'bg-blue-100 border-blue-300 text-blue-800' },
    '08:30': { subject: 'Mathématiques', teacher: 'Mme Ngo', room: 'A1', color: 'bg-blue-100 border-blue-300 text-blue-800' },
    '09:30': { subject: 'Français', teacher: 'M. Kamga', room: 'A1', color: 'bg-green-100 border-green-300 text-green-800' },
    '10:30': { subject: 'Français', teacher: 'M. Kamga', room: 'A1', color: 'bg-green-100 border-green-300 text-green-800' },
    '13:30': { subject: 'Anglais', teacher: 'Mme Talla', room: 'Lab1', color: 'bg-purple-100 border-purple-300 text-purple-800' },
    '14:30': { subject: 'Anglais', teacher: 'Mme Talla', room: 'Lab1', color: 'bg-purple-100 border-purple-300 text-purple-800' },
  },
  'Mardi': {
    '07:30': { subject: 'Physique', teacher: 'M. Mbarga', room: 'Lab2', color: 'bg-orange-100 border-orange-300 text-orange-800' },
    '08:30': { subject: 'Physique', teacher: 'M. Mbarga', room: 'Lab2', color: 'bg-orange-100 border-orange-300 text-orange-800' },
    '09:30': { subject: 'SVT', teacher: 'Mme Kouam', room: 'Lab3', color: 'bg-teal-100 border-teal-300 text-teal-800' },
    '10:30': { subject: 'SVT', teacher: 'Mme Kouam', room: 'Lab3', color: 'bg-teal-100 border-teal-300 text-teal-800' },
    '13:30': { subject: 'Histoire-Géo', teacher: 'M. Fouda', room: 'A1', color: 'bg-yellow-100 border-yellow-300 text-yellow-800' },
    '14:30': { subject: 'Histoire-Géo', teacher: 'M. Fouda', room: 'A1', color: 'bg-yellow-100 border-yellow-300 text-yellow-800' },
    '15:30': { subject: 'EPS', teacher: 'M. Diallo', room: 'Terrain', color: 'bg-red-100 border-red-300 text-red-800' },
  },
  'Mercredi': {
    '07:30': { subject: 'Français', teacher: 'M. Kamga', room: 'A1', color: 'bg-green-100 border-green-300 text-green-800' },
    '08:30': { subject: 'Français', teacher: 'M. Kamga', room: 'A1', color: 'bg-green-100 border-green-300 text-green-800' },
    '09:30': { subject: 'Mathématiques', teacher: 'Mme Ngo', room: 'A1', color: 'bg-blue-100 border-blue-300 text-blue-800' },
    '10:30': { subject: 'Mathématiques', teacher: 'Mme Ngo', room: 'A1', color: 'bg-blue-100 border-blue-300 text-blue-800' },
  },
  'Jeudi': {
    '07:30': { subject: 'Anglais', teacher: 'Mme Talla', room: 'Lab1', color: 'bg-purple-100 border-purple-300 text-purple-800' },
    '08:30': { subject: 'Anglais', teacher: 'Mme Talla', room: 'Lab1', color: 'bg-purple-100 border-purple-300 text-purple-800' },
    '09:30': { subject: 'Informatique', teacher: 'M. Essomba', room: 'Info', color: 'bg-indigo-100 border-indigo-300 text-indigo-800' },
    '10:30': { subject: 'Informatique', teacher: 'M. Essomba', room: 'Info', color: 'bg-indigo-100 border-indigo-300 text-indigo-800' },
    '13:30': { subject: 'Physique', teacher: 'M. Mbarga', room: 'Lab2', color: 'bg-orange-100 border-orange-300 text-orange-800' },
    '14:30': { subject: 'SVT', teacher: 'Mme Kouam', room: 'Lab3', color: 'bg-teal-100 border-teal-300 text-teal-800' },
  },
  'Vendredi': {
    '07:30': { subject: 'Mathématiques', teacher: 'Mme Ngo', room: 'A1', color: 'bg-blue-100 border-blue-300 text-blue-800' },
    '08:30': { subject: 'Français', teacher: 'M. Kamga', room: 'A1', color: 'bg-green-100 border-green-300 text-green-800' },
    '09:30': { subject: 'Histoire-Géo', teacher: 'M. Fouda', room: 'A1', color: 'bg-yellow-100 border-yellow-300 text-yellow-800' },
    '10:30': { subject: 'Histoire-Géo', teacher: 'M. Fouda', room: 'A1', color: 'bg-yellow-100 border-yellow-300 text-yellow-800' },
    '13:30': { subject: 'Philosophie', teacher: 'Mme Biya', room: 'A2', color: 'bg-pink-100 border-pink-300 text-pink-800' },
    '14:30': { subject: 'Philosophie', teacher: 'Mme Biya', room: 'A2', color: 'bg-pink-100 border-pink-300 text-pink-800' },
    '15:30': { subject: 'EPS', teacher: 'M. Diallo', room: 'Terrain', color: 'bg-red-100 border-red-300 text-red-800' },
  },
  'Samedi': {
    '07:30': { subject: 'Révisions', teacher: 'Tous', room: 'A1', color: 'bg-gray-100 border-gray-300 text-gray-800' },
    '08:30': { subject: 'Révisions', teacher: 'Tous', room: 'A1', color: 'bg-gray-100 border-gray-300 text-gray-800' },
    '09:30': { subject: 'Clubs', teacher: '-', room: 'Divers', color: 'bg-cyan-100 border-cyan-300 text-cyan-800' },
  },
}

export function DirectorSchedulePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedClass, setSelectedClass] = useState('6ème A')
  const [currentWeek, setCurrentWeek] = useState('13 - 18 Janvier 2025')

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
              <h1 className="text-3xl font-bold text-gray-900">Emploi du Temps</h1>
              <p className="text-gray-600 mt-1">Planification des cours et activités</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2">
                <Printer className="w-4 h-4" />
                Imprimer
              </Button>
              <Button className="bg-[#2302B3] hover:bg-[#1a0285] gap-2">
                <Plus className="w-4 h-4" />
                Ajouter cours
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl p-4 border border-gray-100">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sélectionner classe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6ème A">6ème A</SelectItem>
                    <SelectItem value="6ème B">6ème B</SelectItem>
                    <SelectItem value="5ème A">5ème A</SelectItem>
                    <SelectItem value="5ème B">5ème B</SelectItem>
                    <SelectItem value="4ème A">4ème A</SelectItem>
                    <SelectItem value="4ème B">4ème B</SelectItem>
                    <SelectItem value="3ème A">3ème A</SelectItem>
                    <SelectItem value="3ème B">3ème B</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon">
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
                  <Calendar className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-900">{currentWeek}</span>
                </div>
                <Button variant="ghost" size="icon">
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Schedule Grid */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="p-4 text-left font-semibold text-gray-600 w-20">
                      <Clock className="w-5 h-5" />
                    </th>
                    {days.map((day) => (
                      <th key={day} className="p-4 text-center font-semibold text-gray-900">
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {hours.map((hour, i) => (
                    <tr key={hour} className={i === 4 ? 'bg-yellow-50' : ''}>
                      <td className="p-3 text-center font-medium text-gray-600 border-r border-gray-100">
                        {hour}
                        <br />
                        <span className="text-xs text-gray-400">
                          {parseInt(hour.split(':')[0]) + 1}:00
                        </span>
                      </td>
                      {days.map((day) => {
                        const course = scheduleData[day]?.[hour]
                        return (
                          <td key={`${day}-${hour}`} className="p-2 border-r border-gray-50">
                            {i === 4 ? (
                              <div className="text-center text-sm text-yellow-700 font-medium py-2">
                                Pause déjeuner
                              </div>
                            ) : course ? (
                              <div className={`p-2 rounded-lg border ${course.color} cursor-pointer hover:opacity-80 transition-opacity`}>
                                <p className="font-semibold text-sm">{course.subject}</p>
                                <p className="text-xs opacity-75">{course.teacher}</p>
                                <div className="flex items-center gap-1 mt-1 text-xs opacity-75">
                                  <MapPin className="w-3 h-3" />
                                  {course.room}
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

          {/* Legend */}
          <div className="bg-white rounded-2xl p-4 border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-3">Légende des matières</h3>
            <div className="flex flex-wrap gap-3">
              {[
                { subject: 'Mathématiques', color: 'bg-blue-100 border-blue-300' },
                { subject: 'Français', color: 'bg-green-100 border-green-300' },
                { subject: 'Anglais', color: 'bg-purple-100 border-purple-300' },
                { subject: 'Physique', color: 'bg-orange-100 border-orange-300' },
                { subject: 'SVT', color: 'bg-teal-100 border-teal-300' },
                { subject: 'Histoire-Géo', color: 'bg-yellow-100 border-yellow-300' },
                { subject: 'Informatique', color: 'bg-indigo-100 border-indigo-300' },
                { subject: 'Philosophie', color: 'bg-pink-100 border-pink-300' },
                { subject: 'EPS', color: 'bg-red-100 border-red-300' },
              ].map((item) => (
                <div key={item.subject} className={`px-3 py-1 rounded-full text-sm font-medium border ${item.color}`}>
                  {item.subject}
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