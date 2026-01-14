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
  TrendingUp,
  TrendingDown,
  Download
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

const subjects = [
  { name: 'Mathématiques', average: 17, grades: [18, 16, 17, 17], trend: 'up', coefficient: 3 },
  { name: 'Français', average: 16, grades: [15, 16, 17, 16], trend: 'up', coefficient: 3 },
  { name: 'Sciences', average: 15, grades: [14, 15, 16, 15], trend: 'up', coefficient: 2 },
  { name: 'Histoire-Géo', average: 14, grades: [13, 14, 15, 14], trend: 'up', coefficient: 2 },
  { name: 'Anglais', average: 16, grades: [16, 15, 17, 16], trend: 'stable', coefficient: 2 },
  { name: 'Éducation Physique', average: 18, grades: [18, 19, 17, 18], trend: 'stable', coefficient: 1 },
]

export function StudentGradesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4 text-green-600" />
    if (trend === 'down') return <TrendingDown className="w-4 h-4 text-red-600" />
    return <div className="w-4 h-4 rounded-full bg-gray-300" />
  }

  const generalAverage = (subjects.reduce((acc, s) => acc + s.average * s.coefficient, 0) /
    subjects.reduce((acc, s) => acc + s.coefficient, 0)).toFixed(2)

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
              <h1 className="text-3xl font-bold text-gray-900">Mes Notes</h1>
              <p className="text-gray-600 mt-1">Trimestre 1 - 2024/2025</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Télécharger bulletin
              </Button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-[#2302B3] to-[#4318FF] rounded-2xl p-6 text-white">
              <p className="text-white/80 text-sm mb-1">Moyenne Générale</p>
              <p className="text-4xl font-bold">{generalAverage}/20</p>
              <div className="flex items-center gap-2 mt-2">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">+0.5 vs trimestre précédent</span>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <p className="text-gray-600 text-sm mb-1">Rang de classe</p>
              <p className="text-4xl font-bold text-gray-900">3<span className="text-xl text-gray-400">/32</span></p>
              <p className="text-sm text-green-600 mt-2">Top 10% de la classe</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <p className="text-gray-600 text-sm mb-1">Meilleure matière</p>
              <p className="text-4xl font-bold text-gray-900">Éd. Physique</p>
              <p className="text-sm text-[#2302B3] mt-2">18/20 de moyenne</p>
            </div>
          </div>

          {/* Grades Table */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold">Détail par matière</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-4 font-semibold text-gray-600">Matière</th>
                    <th className="text-center p-4 font-semibold text-gray-600">Coef.</th>
                    <th className="text-center p-4 font-semibold text-gray-600">Note 1</th>
                    <th className="text-center p-4 font-semibold text-gray-600">Note 2</th>
                    <th className="text-center p-4 font-semibold text-gray-600">Note 3</th>
                    <th className="text-center p-4 font-semibold text-gray-600">Note 4</th>
                    <th className="text-center p-4 font-semibold text-gray-600">Moyenne</th>
                    <th className="text-center p-4 font-semibold text-gray-600">Tendance</th>
                  </tr>
                </thead>
                <tbody>
                  {subjects.map((subject, i) => (
                    <tr key={i} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="p-4 font-medium text-gray-900">{subject.name}</td>
                      <td className="p-4 text-center text-gray-600">{subject.coefficient}</td>
                      {subject.grades.map((grade, j) => (
                        <td key={j} className="p-4 text-center">
                          <span className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${
                            grade >= 16 ? 'bg-green-100 text-green-700' :
                            grade >= 12 ? 'bg-blue-100 text-blue-700' :
                            grade >= 10 ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          } font-semibold`}>
                            {grade}
                          </span>
                        </td>
                      ))}
                      <td className="p-4 text-center">
                        <span className="text-xl font-bold text-[#2302B3]">{subject.average}</span>
                      </td>
                      <td className="p-4 text-center">
                        {getTrendIcon(subject.trend)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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