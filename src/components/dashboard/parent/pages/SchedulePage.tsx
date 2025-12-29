'use client'

import { useState } from 'react'
import { 
  LayoutDashboard,
  User,
  FileText,
  CreditCard,
  MessageSquare,
  Calendar,
  Award,
  ChevronLeft,
  ChevronRight,
  Download,
  Clock
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
  { icon: LayoutDashboard, label: 'Tableau de bord', href: '/dashboard/parent' },
  { icon: User, label: 'Mes enfants', href: '/dashboard/parent/children' },
  { icon: FileText, label: 'Bulletins', href: '/dashboard/parent/reports' },
  { icon: Award, label: 'Notes & Résultats', href: '/dashboard/parent/grades' },
  { icon: CreditCard, label: 'Paiements', href: '/dashboard/parent/payments' },
  { icon: Calendar, label: 'Emploi du temps', href: '/dashboard/parent/schedule' },
  { icon: MessageSquare, label: 'Messages', href: '/dashboard/parent/messages', badge: '2' },
]

const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi']
const timeSlots = [
  '08:00 - 09:30',
  '09:45 - 11:15',
  '11:30 - 13:00',
  '14:00 - 15:30',
  '15:45 - 17:15'
]

const schedules = {
  'Amina Talla': {
    'Lundi': [
      { subject: 'Mathématiques', teacher: 'Mme Kouam', room: 'Salle 12', color: 'bg-blue-100 text-blue-700 border-blue-200' },
      { subject: 'Français', teacher: 'Mme Kouam', room: 'Salle 12', color: 'bg-green-100 text-green-700 border-green-200' },
      { subject: 'Sciences', teacher: 'M. Nkolo', room: 'Labo 2', color: 'bg-purple-100 text-purple-700 border-purple-200' },
      { subject: 'Histoire-Géo', teacher: 'Mme Kouam', room: 'Salle 12', color: 'bg-orange-100 text-orange-700 border-orange-200' },
      { subject: 'Sport', teacher: 'M. Talla', room: 'Terrain', color: 'bg-red-100 text-red-700 border-red-200' },
    ],
    'Mardi': [
      { subject: 'Français', teacher: 'Mme Kouam', room: 'Salle 12', color: 'bg-green-100 text-green-700 border-green-200' },
      { subject: 'Mathématiques', teacher: 'Mme Kouam', room: 'Salle 12', color: 'bg-blue-100 text-blue-700 border-blue-200' },
      { subject: 'Anglais', teacher: 'Miss Sarah', room: 'Salle 8', color: 'bg-pink-100 text-pink-700 border-pink-200' },
      { subject: 'Arts', teacher: 'Mme Biya', room: 'Atelier', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
      { subject: 'Informatique', teacher: 'M. Kamga', room: 'Salle Info', color: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
    ],
    'Mercredi': [
      { subject: 'Mathématiques', teacher: 'Mme Kouam', room: 'Salle 12', color: 'bg-blue-100 text-blue-700 border-blue-200' },
      { subject: 'Sciences', teacher: 'M. Nkolo', room: 'Labo 2', color: 'bg-purple-100 text-purple-700 border-purple-200' },
      { subject: 'Français', teacher: 'Mme Kouam', room: 'Salle 12', color: 'bg-green-100 text-green-700 border-green-200' },
      null,
      null,
    ],
    'Jeudi': [
      { subject: 'Histoire-Géo', teacher: 'Mme Kouam', room: 'Salle 12', color: 'bg-orange-100 text-orange-700 border-orange-200' },
      { subject: 'Mathématiques', teacher: 'Mme Kouam', room: 'Salle 12', color: 'bg-blue-100 text-blue-700 border-blue-200' },
      { subject: 'Anglais', teacher: 'Miss Sarah', room: 'Salle 8', color: 'bg-pink-100 text-pink-700 border-pink-200' },
      { subject: 'Musique', teacher: 'M. Mbarga', room: 'Salle Musique', color: 'bg-teal-100 text-teal-700 border-teal-200' },
      { subject: 'Sport', teacher: 'M. Talla', room: 'Terrain', color: 'bg-red-100 text-red-700 border-red-200' },
    ],
    'Vendredi': [
      { subject: 'Français', teacher: 'Mme Kouam', room: 'Salle 12', color: 'bg-green-100 text-green-700 border-green-200' },
      { subject: 'Sciences', teacher: 'M. Nkolo', room: 'Labo 2', color: 'bg-purple-100 text-purple-700 border-purple-200' },
      { subject: 'Mathématiques', teacher: 'Mme Kouam', room: 'Salle 12', color: 'bg-blue-100 text-blue-700 border-blue-200' },
      { subject: 'Arts', teacher: 'Mme Biya', room: 'Atelier', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
      null,
    ],
  },
  'Paul Talla': {
    'Lundi': [
      { subject: 'Français', teacher: 'M. Nkolo', room: 'Salle 5', color: 'bg-green-100 text-green-700 border-green-200' },
      { subject: 'Mathématiques', teacher: 'M. Nkolo', room: 'Salle 5', color: 'bg-blue-100 text-blue-700 border-blue-200' },
      { subject: 'Sciences', teacher: 'Mme Kamga', room: 'Labo 1', color: 'bg-purple-100 text-purple-700 border-purple-200' },
      { subject: 'Sport', teacher: 'M. Talla', room: 'Terrain', color: 'bg-red-100 text-red-700 border-red-200' },
      { subject: 'Arts', teacher: 'Mme Biya', room: 'Atelier', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
    ],
    'Mardi': [
      { subject: 'Mathématiques', teacher: 'M. Nkolo', room: 'Salle 5', color: 'bg-blue-100 text-blue-700 border-blue-200' },
      { subject: 'Français', teacher: 'M. Nkolo', room: 'Salle 5', color: 'bg-green-100 text-green-700 border-green-200' },
      { subject: 'Histoire-Géo', teacher: 'M. Nkolo', room: 'Salle 5', color: 'bg-orange-100 text-orange-700 border-orange-200' },
      { subject: 'Anglais', teacher: 'Miss Sarah', room: 'Salle 8', color: 'bg-pink-100 text-pink-700 border-pink-200' },
      { subject: 'Informatique', teacher: 'M. Kamga', room: 'Salle Info', color: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
    ],
    'Mercredi': [
      { subject: 'Français', teacher: 'M. Nkolo', room: 'Salle 5', color: 'bg-green-100 text-green-700 border-green-200' },
      { subject: 'Mathématiques', teacher: 'M. Nkolo', room: 'Salle 5', color: 'bg-blue-100 text-blue-700 border-blue-200' },
      { subject: 'Sciences', teacher: 'Mme Kamga', room: 'Labo 1', color: 'bg-purple-100 text-purple-700 border-purple-200' },
      null,
      null,
    ],
    'Jeudi': [
      { subject: 'Mathématiques', teacher: 'M. Nkolo', room: 'Salle 5', color: 'bg-blue-100 text-blue-700 border-blue-200' },
      { subject: 'Histoire-Géo', teacher: 'M. Nkolo', room: 'Salle 5', color: 'bg-orange-100 text-orange-700 border-orange-200' },
      { subject: 'Français', teacher: 'M. Nkolo', room: 'Salle 5', color: 'bg-green-100 text-green-700 border-green-200' },
      { subject: 'Musique', teacher: 'M. Mbarga', room: 'Salle Musique', color: 'bg-teal-100 text-teal-700 border-teal-200' },
      { subject: 'Sport', teacher: 'M. Talla', room: 'Terrain', color: 'bg-red-100 text-red-700 border-red-200' },
    ],
    'Vendredi': [
      { subject: 'Sciences', teacher: 'Mme Kamga', room: 'Labo 1', color: 'bg-purple-100 text-purple-700 border-purple-200' },
      { subject: 'Français', teacher: 'M. Nkolo', room: 'Salle 5', color: 'bg-green-100 text-green-700 border-green-200' },
      { subject: 'Mathématiques', teacher: 'M. Nkolo', room: 'Salle 5', color: 'bg-blue-100 text-blue-700 border-blue-200' },
      { subject: 'Anglais', teacher: 'Miss Sarah', room: 'Salle 8', color: 'bg-pink-100 text-pink-700 border-pink-200' },
      null,
    ],
  }
}

export function ParentSchedulePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedChild, setSelectedChild] = useState<'Amina Talla' | 'Paul Talla'>('Amina Talla')
  const [currentWeek, setCurrentWeek] = useState(0)

  const schedule = schedules[selectedChild]

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar 
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        userName="Jean Talla"
        userRole="Parent"
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
              <h1 className="text-3xl font-bold text-gray-900">Emploi du temps</h1>
              <p className="text-gray-600 mt-1">Semaine du 6 au 10 Janvier 2025</p>
            </div>
            <div className="flex gap-3">
              <Select value={selectedChild} onValueChange={(value) => setSelectedChild(value as any)}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Amina Talla">Amina Talla</SelectItem>
                  <SelectItem value="Paul Talla">Paul Talla</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Exporter
              </Button>
            </div>
          </div>

          {/* Week Navigation */}
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <div className="flex items-center justify-between">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setCurrentWeek(currentWeek - 1)}
              >
                <ChevronLeft className="w-4 h-4" />
                Semaine précédente
              </Button>
              <div className="text-center">
                <p className="font-semibold text-gray-900">Semaine actuelle</p>
                <p className="text-sm text-gray-500">6 - 10 Janvier 2025</p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setCurrentWeek(currentWeek + 1)}
              >
                Semaine suivante
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Schedule Grid */}
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase w-32">
                      Horaires
                    </th>
                    {days.map((day) => (
                      <th key={day} className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {timeSlots.map((time, timeIndex) => (
                    <tr key={timeIndex}>
                      <td className="px-4 py-3 text-sm font-medium text-gray-600 bg-gray-50">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {time}
                        </div>
                      </td>
                      {days.map((day) => {
                        const lesson = schedule[day][timeIndex]
                        return (
                          <td key={day} className="px-2 py-2">
                            {lesson ? (
                              <div className={`p-3 rounded-lg border-2 ${lesson.color} h-full`}>
                                <p className="font-semibold text-sm mb-1">{lesson.subject}</p>
                                <p className="text-xs opacity-80">{lesson.teacher}</p>
                                <p className="text-xs opacity-70 mt-1">{lesson.room}</p>
                              </div>
                            ) : (
                              <div className="p-3 rounded-lg border-2 border-dashed border-gray-200 h-full flex items-center justify-center">
                                <span className="text-xs text-gray-400">Libre</span>
                              </div>
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
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4">Légende des matières</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {[
                { name: 'Mathématiques', color: 'bg-blue-100 text-blue-700 border-blue-200' },
                { name: 'Français', color: 'bg-green-100 text-green-700 border-green-200' },
                { name: 'Sciences', color: 'bg-purple-100 text-purple-700 border-purple-200' },
                { name: 'Histoire-Géo', color: 'bg-orange-100 text-orange-700 border-orange-200' },
                { name: 'Anglais', color: 'bg-pink-100 text-pink-700 border-pink-200' },
                { name: 'Sport', color: 'bg-red-100 text-red-700 border-red-200' },
                { name: 'Arts', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
                { name: 'Musique', color: 'bg-teal-100 text-teal-700 border-teal-200' },
                { name: 'Informatique', color: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
              ].map((subject, i) => (
                <div key={i} className={`px-3 py-2 rounded-lg border-2 ${subject.color} text-center`}>
                  <span className="text-xs font-semibold">{subject.name}</span>
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
