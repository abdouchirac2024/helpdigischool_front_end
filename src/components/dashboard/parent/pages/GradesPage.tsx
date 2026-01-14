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
  Filter,
  Settings
} from 'lucide-react'
import { Sidebar, MenuItem } from '../../shared/Sidebar'
import { TopBar } from '../../shared/TopBar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'

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

const gradesData = {
  'Amina Talla': {
    subjects: [
      { name: 'Mathématiques', grades: [18, 17, 19, 16], average: 17.5, coef: 4, trend: 'up' },
      { name: 'Français', grades: [16, 17, 15, 18], average: 16.5, coef: 4, trend: 'up' },
      { name: 'Sciences', grades: [15, 16, 14, 17], average: 15.5, coef: 3, trend: 'up' },
      { name: 'Histoire-Géo', grades: [14, 15, 13, 16], average: 14.5, coef: 2, trend: 'up' },
      { name: 'Anglais', grades: [17, 16, 18, 17], average: 17.0, coef: 2, trend: 'stable' },
      { name: 'Sport', grades: [16, 17, 16, 18], average: 16.8, coef: 1, trend: 'up' },
    ],
    overall: 16.2
  },
  'Paul Talla': {
    subjects: [
      { name: 'Mathématiques', grades: [15, 14, 16, 15], average: 15.0, coef: 4, trend: 'stable' },
      { name: 'Français', grades: [14, 15, 13, 16], average: 14.5, coef: 4, trend: 'up' },
      { name: 'Sciences', grades: [13, 14, 12, 15], average: 13.5, coef: 3, trend: 'up' },
      { name: 'Histoire-Géo', grades: [14, 13, 15, 14], average: 14.0, coef: 2, trend: 'stable' },
      { name: 'Anglais', grades: [15, 14, 16, 15], average: 15.0, coef: 2, trend: 'stable' },
      { name: 'Sport', grades: [16, 17, 16, 17], average: 16.5, coef: 1, trend: 'stable' },
    ],
    overall: 14.3
  }
}

export function ParentGradesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedChild, setSelectedChild] = useState<'Amina Talla' | 'Paul Talla'>('Amina Talla')
  const [selectedPeriod, setSelectedPeriod] = useState('trimestre1')

  const data = gradesData[selectedChild]

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4 text-green-600" />
    if (trend === 'down') return <TrendingDown className="w-4 h-4 text-red-600" />
    return <div className="w-4 h-4" />
  }

  const getGradeColor = (grade: number) => {
    if (grade >= 16) return 'text-green-600 bg-green-50'
    if (grade >= 14) return 'text-blue-600 bg-blue-50'
    if (grade >= 10) return 'text-yellow-600 bg-yellow-50'
    return 'text-red-600 bg-red-50'
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
              <h1 className="text-3xl font-bold text-gray-900">Notes & Résultats</h1>
              <p className="text-gray-600 mt-1">Suivi des performances scolaires</p>
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
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="trimestre1">1er Trimestre</SelectItem>
                  <SelectItem value="trimestre2">2ème Trimestre</SelectItem>
                  <SelectItem value="trimestre3">3ème Trimestre</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Overall Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <p className="text-sm text-gray-600 mb-1">Moyenne générale</p>
              <p className="text-3xl font-bold text-[#2302B3]">{data.overall}/20</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <p className="text-sm text-gray-600 mb-1">Rang</p>
              <p className="text-3xl font-bold text-orange-600">3/32</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <p className="text-sm text-gray-600 mb-1">Matières</p>
              <p className="text-3xl font-bold text-gray-900">{data.subjects.length}</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <p className="text-sm text-gray-600 mb-1">Progression</p>
              <div className="flex items-center gap-2">
                <p className="text-3xl font-bold text-green-600">+0.8</p>
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="bg-white border border-gray-200">
              <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
              <TabsTrigger value="details">Détails par matière</TabsTrigger>
              <TabsTrigger value="evolution">Évolution</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Subjects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.subjects.map((subject, i) => (
                  <div key={i} className="bg-white rounded-xl p-6 border border-gray-100">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">{subject.name}</h3>
                        <p className="text-sm text-gray-500">Coefficient: {subject.coef}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-2xl font-bold px-3 py-1 rounded-lg ${getGradeColor(subject.average)}`}>
                          {subject.average}
                        </span>
                        {getTrendIcon(subject.trend)}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Progression</span>
                        <span className="font-semibold text-gray-900">{subject.average}/20</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#2302B3]"
                          style={{ width: `${(subject.average / 20) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-xs text-gray-500 mb-2">Dernières notes:</p>
                      <div className="flex gap-2">
                        {subject.grades.map((grade, j) => (
                          <span key={j} className={`px-2 py-1 rounded text-sm font-semibold ${getGradeColor(grade)}`}>
                            {grade}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="details">
              <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Matière</th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">Coef</th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">Note 1</th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">Note 2</th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">Note 3</th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">Note 4</th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">Moyenne</th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">Tendance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {data.subjects.map((subject, i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <span className="font-medium text-gray-900">{subject.name}</span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="text-sm text-gray-600">{subject.coef}</span>
                        </td>
                        {subject.grades.map((grade, j) => (
                          <td key={j} className="px-6 py-4 text-center">
                            <span className={`px-2 py-1 rounded text-sm font-semibold ${getGradeColor(grade)}`}>
                              {grade}
                            </span>
                          </td>
                        ))}
                        <td className="px-6 py-4 text-center">
                          <span className="text-lg font-bold text-[#2302B3]">{subject.average}</span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          {getTrendIcon(subject.trend)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="evolution">
              <div className="bg-white rounded-xl p-8 border border-gray-100 text-center">
                <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Graphique d'évolution des notes</p>
                <p className="text-sm text-gray-500 mt-2">Fonctionnalité à venir</p>
              </div>
            </TabsContent>
          </Tabs>
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
