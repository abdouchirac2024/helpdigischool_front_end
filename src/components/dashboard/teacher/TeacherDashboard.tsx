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
  ClipboardList
} from 'lucide-react'
import { Sidebar, MenuItem } from '../shared/Sidebar'
import { TopBar } from '../shared/TopBar'
import { StatCard } from '../shared/StatCard'
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

export function TeacherDashboard() {
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
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Bonjour Marie! 👋</h1>
            <p className="text-gray-600 mt-1">Voici un aperçu de votre classe aujourd'hui</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Mes élèves"
              value="32"
              subtitle="Classe CM2-A"
              icon={Users}
              iconColor="text-blue-600"
              iconBg="bg-blue-50"
            />
            <StatCard
              title="Présents aujourd'hui"
              value="30"
              subtitle="94% de présence"
              icon={ClipboardList}
              iconColor="text-green-600"
              iconBg="bg-green-50"
              trend="94%"
              trendUp={true}
            />
            <StatCard
              title="Notes à saisir"
              value="8"
              subtitle="Évaluations en attente"
              icon={FileText}
              iconColor="text-orange-600"
              iconBg="bg-orange-50"
            />
            <StatCard
              title="Moyenne classe"
              value="14.2/20"
              subtitle="Trimestre en cours"
              icon={Award}
              iconColor="text-purple-600"
              iconBg="bg-purple-50"
              trend="+0.8"
              trendUp={true}
            />
          </div>

          {/* Today's Schedule */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <h3 className="text-lg font-semibold mb-4">Emploi du temps aujourd'hui</h3>
            <div className="space-y-3">
              {[
                { time: '08:00 - 09:30', subject: 'Mathématiques', room: 'Salle 12', status: 'completed' },
                { time: '09:45 - 11:15', subject: 'Français', room: 'Salle 12', status: 'current' },
                { time: '11:30 - 13:00', subject: 'Sciences', room: 'Labo 2', status: 'upcoming' },
                { time: '14:00 - 15:30', subject: 'Histoire-Géo', room: 'Salle 12', status: 'upcoming' },
              ].map((lesson, i) => (
                <div key={i} className={`flex items-center gap-4 p-4 rounded-xl border-2 ${
                  lesson.status === 'current' ? 'border-[#2302B3] bg-[#2302B3]/5' :
                  lesson.status === 'completed' ? 'border-gray-200 bg-gray-50 opacity-60' :
                  'border-gray-200'
                }`}>
                  <div className="text-center min-w-[80px]">
                    <p className="text-sm font-semibold text-gray-900">{lesson.time}</p>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{lesson.subject}</p>
                    <p className="text-sm text-gray-500">{lesson.room}</p>
                  </div>
                  {lesson.status === 'current' && (
                    <span className="px-3 py-1 bg-[#2302B3] text-white text-xs font-semibold rounded-full">
                      En cours
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions & Recent Students */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold mb-4">Actions rapides</h3>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                  <FileText className="w-6 h-6" />
                  <span className="text-sm">Saisir notes</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                  <ClipboardList className="w-6 h-6" />
                  <span className="text-sm">Présences</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                  <MessageSquare className="w-6 h-6" />
                  <span className="text-sm">Messages</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                  <BookOpen className="w-6 h-6" />
                  <span className="text-sm">Cours</span>
                </Button>
              </div>
            </div>

            {/* Top Students */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold mb-4">Meilleurs élèves ce mois</h3>
              <div className="space-y-3">
                {[
                  { name: 'Amina Nkolo', average: '18.5/20', rank: 1 },
                  { name: 'Paul Mbarga', average: '17.8/20', rank: 2 },
                  { name: 'Sophie Kamga', average: '17.2/20', rank: 3 },
                ].map((student, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                      i === 0 ? 'bg-yellow-500' : i === 1 ? 'bg-gray-400' : 'bg-orange-600'
                    }`}>
                      {student.rank}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{student.name}</p>
                      <p className="text-xs text-gray-500">Moyenne: {student.average}</p>
                    </div>
                  </div>
                ))}
              </div>
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
