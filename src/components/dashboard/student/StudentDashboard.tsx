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
  Clock,
  TrendingUp,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'
import { Sidebar, MenuItem } from '../shared/Sidebar'
import { TopBar } from '../shared/TopBar'
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

export function StudentDashboard() {
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
              <h1 className="text-3xl font-bold text-gray-900">Bonjour, Amina ! 👋</h1>
              <p className="text-gray-600 mt-1">Voici ton tableau de bord pour aujourd'hui</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2">
                <Calendar className="w-4 h-4" />
                Voir planning
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Ma Moyenne</p>
                  <p className="text-3xl font-bold text-gray-900">15.8/20</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                +0.5 ce mois
              </span>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Mon Rang</p>
                  <p className="text-3xl font-bold text-gray-900">3<span className="text-lg text-gray-500">/32</span></p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#2302B3]/10 flex items-center justify-center">
                  <Award className="w-6 h-6 text-[#2302B3]" />
                </div>
              </div>
              <span className="text-xs font-semibold text-[#2302B3] bg-[#2302B3]/10 px-2 py-1 rounded-full">
                Top 10%
              </span>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Devoirs à faire</p>
                  <p className="text-3xl font-bold text-gray-900">3</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-orange-600" />
                </div>
              </div>
              <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
                1 urgent
              </span>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Présence</p>
                  <p className="text-3xl font-bold text-gray-900">96%</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                Excellent
              </span>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Today's Schedule */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Cours Aujourd'hui</h3>
                <Button variant="ghost" size="sm">Voir tout</Button>
              </div>
              <div className="space-y-3">
                {[
                  { time: '08:00 - 10:00', subject: 'Mathématiques', teacher: 'M. Kamga', room: 'Salle 12', status: 'done' },
                  { time: '10:15 - 12:15', subject: 'Français', teacher: 'Mme Kouam', room: 'Salle 12', status: 'current' },
                  { time: '14:00 - 15:30', subject: 'Sciences', teacher: 'M. Nkolo', room: 'Labo 2', status: 'upcoming' },
                  { time: '15:45 - 17:00', subject: 'Histoire-Géo', teacher: 'Mme Fouda', room: 'Salle 12', status: 'upcoming' },
                ].map((course, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-4 p-4 rounded-xl transition-colors ${
                      course.status === 'current'
                        ? 'bg-[#2302B3]/10 border-2 border-[#2302B3]'
                        : course.status === 'done'
                        ? 'bg-gray-50 opacity-60'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="text-center min-w-[70px]">
                      <Clock className={`w-4 h-4 mx-auto mb-1 ${course.status === 'current' ? 'text-[#2302B3]' : 'text-gray-400'}`} />
                      <p className={`text-xs font-medium ${course.status === 'current' ? 'text-[#2302B3]' : 'text-gray-500'}`}>
                        {course.time.split(' - ')[0]}
                      </p>
                    </div>
                    <div className="flex-1">
                      <p className={`font-semibold ${course.status === 'current' ? 'text-[#2302B3]' : 'text-gray-900'}`}>
                        {course.subject}
                      </p>
                      <p className="text-sm text-gray-500">{course.teacher} • {course.room}</p>
                    </div>
                    {course.status === 'current' && (
                      <span className="text-xs font-semibold text-white bg-[#2302B3] px-3 py-1 rounded-full">
                        En cours
                      </span>
                    )}
                    {course.status === 'done' && (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Homework */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Devoirs à Rendre</h3>
                <Button variant="ghost" size="sm">Voir tout</Button>
              </div>
              <div className="space-y-3">
                {[
                  { subject: 'Mathématiques', title: 'Exercices page 45-46', due: 'Demain', urgent: true },
                  { subject: 'Français', title: 'Rédaction: Ma journée idéale', due: 'Vendredi', urgent: false },
                  { subject: 'Sciences', title: 'Exposé sur les volcans', due: 'Lundi prochain', urgent: false },
                ].map((hw, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      hw.urgent ? 'bg-red-100' : 'bg-blue-100'
                    }`}>
                      <FileText className={`w-5 h-5 ${hw.urgent ? 'text-red-600' : 'text-blue-600'}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-900">{hw.subject}</p>
                        {hw.urgent && (
                          <AlertCircle className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{hw.title}</p>
                      <p className={`text-xs mt-1 ${hw.urgent ? 'text-red-600 font-semibold' : 'text-gray-500'}`}>
                        À rendre: {hw.due}
                      </p>
                    </div>
                    <Button size="sm" variant={hw.urgent ? "default" : "outline"} className={hw.urgent ? "bg-[#2302B3] hover:bg-[#1a0285]" : ""}>
                      Voir
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Grades */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Dernières Notes</h3>
              <Button variant="ghost" size="sm">Voir toutes mes notes</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { subject: 'Mathématiques', grade: 17, max: 20, date: 'Hier', type: 'Contrôle' },
                { subject: 'Français', grade: 16, max: 20, date: 'Lundi', type: 'Dictée' },
                { subject: 'Sciences', grade: 15, max: 20, date: 'Vendredi', type: 'TP' },
                { subject: 'Histoire-Géo', grade: 14, max: 20, date: 'Jeudi', type: 'Exposé' },
              ].map((note, i) => (
                <div key={i} className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500">{note.type}</span>
                    <span className="text-xs text-gray-400">{note.date}</span>
                  </div>
                  <p className="font-semibold text-gray-900 mb-2">{note.subject}</p>
                  <div className="flex items-end gap-1">
                    <span className="text-3xl font-bold text-[#2302B3]">{note.grade}</span>
                    <span className="text-lg text-gray-400 mb-1">/{note.max}</span>
                  </div>
                  <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#2302B3]"
                      style={{ width: `${(note.grade / note.max) * 100}%` }}
                    />
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