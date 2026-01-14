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
  TrendingUp,
  TrendingDown,
  Eye,
  Download,
  Plus,
  Settings
} from 'lucide-react'
import { Sidebar, MenuItem } from '../../shared/Sidebar'
import { TopBar } from '../../shared/TopBar'
import { Button } from '@/components/ui/button'

const menuItems: MenuItem[] = [
  { icon: LayoutDashboard, label: 'Tableau de bord', href: '/dashboard/parent' },
  { icon: User, label: 'Mes enfants', href: '/dashboard/parent/children' },
  { icon: FileText, label: 'Bulletins', href: '/dashboard/parent/reports' },
  { icon: Award, label: 'Notes & Résultats', href: '/dashboard/parent/grades' },
  { icon: CreditCard, label: 'Paiements', href: '/dashboard/parent/payments' },
  { icon: Calendar, label: 'Emploi du temps', href: '/dashboard/parent/schedule' },
  { icon: MessageSquare, label: 'Messages', href: '/dashboard/parent/messages', badge: '2' },
  { icon: Settings, label: 'Paramètres', href: '/dashboard/parent/settings' },
]

const children = [
  {
    id: 1,
    name: 'Amina Talla',
    class: 'CM2-A',
    age: 11,
    average: 15.8,
    attendance: 96,
    teacher: 'Mme Kouam',
    subjects: [
      { name: 'Mathématiques', grade: 17, trend: 'up' },
      { name: 'Français', grade: 16, trend: 'up' },
      { name: 'Sciences', grade: 15, trend: 'stable' },
      { name: 'Histoire-Géo', grade: 14, trend: 'down' },
    ]
  },
  {
    id: 2,
    name: 'Paul Talla',
    class: 'CE2-B',
    age: 9,
    average: 14.2,
    attendance: 94,
    teacher: 'M. Nkolo',
    subjects: [
      { name: 'Mathématiques', grade: 15, trend: 'up' },
      { name: 'Français', grade: 14, trend: 'stable' },
      { name: 'Sciences', grade: 13, trend: 'up' },
      { name: 'Histoire-Géo', grade: 14, trend: 'stable' },
    ]
  },
]

export function ParentChildrenPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4 text-green-600" />
    if (trend === 'down') return <TrendingDown className="w-4 h-4 text-red-600" />
    return <div className="w-4 h-4" />
  }

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
              <h1 className="text-3xl font-bold text-gray-900">Mes Enfants</h1>
              <p className="text-gray-600 mt-1">{children.length} enfants inscrits</p>
            </div>
            <Button className="bg-[#2302B3] hover:bg-[#1a0285] gap-2">
              <Plus className="w-4 h-4" />
              Ajouter un enfant
            </Button>
          </div>

          {/* Children Cards */}
          <div className="space-y-6">
            {children.map((child) => (
              <div key={child.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#2302B3] to-[#4318FF] p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-2xl font-bold border-2 border-white/30">
                        {child.name.charAt(0)}
                      </div>
                      <div className="text-white">
                        <h3 className="text-2xl font-bold">{child.name}</h3>
                        <p className="text-white/80">{child.class} • {child.age} ans</p>
                        <p className="text-sm text-white/70 mt-1">Enseignant: {child.teacher}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="secondary" className="gap-2">
                        <Eye className="w-4 h-4" />
                        Voir détails
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 border-b border-gray-100">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">Moyenne générale</p>
                    <p className="text-2xl font-bold text-[#2302B3]">{child.average}/20</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">Taux de présence</p>
                    <p className="text-2xl font-bold text-green-600">{child.attendance}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">Classe</p>
                    <p className="text-2xl font-bold text-gray-900">{child.class}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">Rang</p>
                    <p className="text-2xl font-bold text-orange-600">3/32</p>
                  </div>
                </div>

                {/* Subjects */}
                <div className="p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Résultats par matière</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {child.subjects.map((subject, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{subject.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-[#2302B3]"
                                style={{ width: `${(subject.grade / 20) * 100}%` }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <span className="text-xl font-bold text-gray-900">{subject.grade}/20</span>
                          {getTrendIcon(subject.trend)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="p-6 bg-gray-50 border-t border-gray-100">
                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline" size="sm" className="gap-2">
                      <FileText className="w-4 h-4" />
                      Voir bulletins
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Calendar className="w-4 h-4" />
                      Emploi du temps
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Contacter enseignant
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download className="w-4 h-4" />
                      Télécharger relevé
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
