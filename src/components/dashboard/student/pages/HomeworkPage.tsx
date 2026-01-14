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
  AlertCircle,
  CheckCircle2,
  Upload
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

const homework = [
  {
    id: 1,
    subject: 'Mathématiques',
    title: 'Exercices sur les fractions',
    description: 'Compléter les exercices 12 à 18 page 45-46 du manuel',
    dueDate: '15 Jan 2025',
    daysLeft: 1,
    status: 'pending',
    teacher: 'M. Kamga',
    urgent: true
  },
  {
    id: 2,
    subject: 'Français',
    title: 'Rédaction: Ma journée idéale',
    description: 'Écrire une rédaction de 200 mots minimum sur le thème "Ma journée idéale"',
    dueDate: '17 Jan 2025',
    daysLeft: 3,
    status: 'pending',
    teacher: 'Mme Kouam',
    urgent: false
  },
  {
    id: 3,
    subject: 'Sciences',
    title: 'Exposé sur les volcans',
    description: 'Préparer un exposé de 5 minutes sur les volcans avec support visuel',
    dueDate: '20 Jan 2025',
    daysLeft: 6,
    status: 'in_progress',
    teacher: 'M. Nkolo',
    urgent: false
  },
  {
    id: 4,
    subject: 'Histoire-Géographie',
    title: 'Questions chapitre 4',
    description: 'Répondre aux questions 1 à 5 page 78',
    dueDate: '13 Jan 2025',
    daysLeft: 0,
    status: 'completed',
    teacher: 'Mme Fouda',
    urgent: false
  },
]

export function StudentHomeworkPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [filter, setFilter] = useState('all')

  const filteredHomework = homework.filter(hw => {
    if (filter === 'all') return true
    return hw.status === filter
  })

  const getStatusBadge = (status: string, urgent: boolean) => {
    if (status === 'completed') {
      return <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full flex items-center gap-1">
        <CheckCircle2 className="w-3 h-3" /> Terminé
      </span>
    }
    if (urgent) {
      return <span className="text-xs font-semibold text-red-600 bg-red-100 px-2 py-1 rounded-full flex items-center gap-1">
        <AlertCircle className="w-3 h-3" /> Urgent
      </span>
    }
    if (status === 'in_progress') {
      return <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full flex items-center gap-1">
        <Clock className="w-3 h-3" /> En cours
      </span>
    }
    return <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-2 py-1 rounded-full">À faire</span>
  }

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
              <h1 className="text-3xl font-bold text-gray-900">Mes Devoirs</h1>
              <p className="text-gray-600 mt-1">{homework.filter(h => h.status !== 'completed').length} devoirs à rendre</p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-2 flex-wrap">
            {[
              { value: 'all', label: 'Tous', count: homework.length },
              { value: 'pending', label: 'À faire', count: homework.filter(h => h.status === 'pending').length },
              { value: 'in_progress', label: 'En cours', count: homework.filter(h => h.status === 'in_progress').length },
              { value: 'completed', label: 'Terminés', count: homework.filter(h => h.status === 'completed').length },
            ].map(f => (
              <Button
                key={f.value}
                variant={filter === f.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter(f.value)}
                className={filter === f.value ? 'bg-[#2302B3] hover:bg-[#1a0285]' : ''}
              >
                {f.label} ({f.count})
              </Button>
            ))}
          </div>

          {/* Homework List */}
          <div className="space-y-4">
            {filteredHomework.map((hw) => (
              <div
                key={hw.id}
                className={`bg-white rounded-2xl border ${
                  hw.urgent ? 'border-red-200 bg-red-50/30' : 'border-gray-100'
                } p-6 hover:shadow-lg transition-all`}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-semibold text-[#2302B3] bg-[#2302B3]/10 px-3 py-1 rounded-full">
                        {hw.subject}
                      </span>
                      {getStatusBadge(hw.status, hw.urgent)}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{hw.title}</h3>
                    <p className="text-gray-600 mb-3">{hw.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        À rendre le {hw.dueDate}
                      </span>
                      <span>•</span>
                      <span>{hw.teacher}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {hw.status !== 'completed' && (
                      <>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Upload className="w-4 h-4" />
                          Déposer
                        </Button>
                        <Button
                          size="sm"
                          className="bg-[#2302B3] hover:bg-[#1a0285]"
                        >
                          Voir détails
                        </Button>
                      </>
                    )}
                    {hw.status === 'completed' && (
                      <Button variant="outline" size="sm">
                        Voir correction
                      </Button>
                    )}
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