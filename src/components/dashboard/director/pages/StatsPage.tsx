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
  TrendingUp,
  TrendingDown,
  Download,
  Award,
  UserCheck,
  BookOpen,
  Target,
  ArrowUpRight,
  ArrowDownRight
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

const monthlyStats = [
  { month: 'Sept', students: 320, attendance: 92, average: 13.5 },
  { month: 'Oct', students: 335, attendance: 94, average: 14.0 },
  { month: 'Nov', students: 340, attendance: 93, average: 14.2 },
  { month: 'Déc', students: 342, attendance: 91, average: 14.5 },
  { month: 'Jan', students: 342, attendance: 94, average: 14.8 },
]

const subjectPerformance = [
  { subject: 'Mathématiques', average: 14.2, students: 342, trend: 'up', change: '+0.5' },
  { subject: 'Français', average: 15.1, students: 342, trend: 'up', change: '+0.3' },
  { subject: 'Anglais', average: 14.8, students: 342, trend: 'up', change: '+0.8' },
  { subject: 'Physique', average: 13.5, students: 285, trend: 'down', change: '-0.2' },
  { subject: 'SVT', average: 14.0, students: 285, trend: 'up', change: '+0.4' },
  { subject: 'Histoire-Géo', average: 13.8, students: 342, trend: 'down', change: '-0.1' },
]

const topStudents = [
  { rank: 1, name: 'Sophie Kamga', class: '6ème A', average: 18.2 },
  { rank: 2, name: 'Sarah Biya', class: '6ème A', average: 17.8 },
  { rank: 3, name: 'Amina Nkolo', class: '6ème A', average: 17.5 },
  { rank: 4, name: 'Paul Mbarga', class: '5ème B', average: 17.2 },
  { rank: 5, name: 'Fatima Sow', class: '5ème A', average: 16.9 },
]

export function DirectorStatsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [period, setPeriod] = useState('trimester')

  const maxAverage = Math.max(...monthlyStats.map(s => s.average))

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
              <h1 className="text-3xl font-bold text-gray-900">Statistiques</h1>
              <p className="text-gray-600 mt-1">Analyse des performances de l'établissement</p>
            </div>
            <div className="flex gap-3">
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Période" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">Ce mois</SelectItem>
                  <SelectItem value="trimester">Ce trimestre</SelectItem>
                  <SelectItem value="year">Cette année</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Exporter
              </Button>
            </div>
          </div>

          {/* Main Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-[#2302B3] to-[#4318FF] rounded-2xl p-5 text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center gap-1 text-green-300">
                  <ArrowUpRight className="w-4 h-4" />
                  <span className="text-sm font-semibold">+6.8%</span>
                </div>
              </div>
              <p className="text-white/80 text-sm">Total élèves</p>
              <p className="text-3xl font-bold">342</p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex items-center gap-1 text-green-600">
                  <ArrowUpRight className="w-4 h-4" />
                  <span className="text-sm font-semibold">+0.3</span>
                </div>
              </div>
              <p className="text-gray-500 text-sm">Moyenne générale</p>
              <p className="text-3xl font-bold text-gray-900">14.8/20</p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex items-center gap-1 text-green-600">
                  <ArrowUpRight className="w-4 h-4" />
                  <span className="text-sm font-semibold">+2%</span>
                </div>
              </div>
              <p className="text-gray-500 text-sm">Taux de présence</p>
              <p className="text-3xl font-bold text-gray-900">94%</p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex items-center gap-1 text-green-600">
                  <ArrowUpRight className="w-4 h-4" />
                  <span className="text-sm font-semibold">+5%</span>
                </div>
              </div>
              <p className="text-gray-500 text-sm">Taux de réussite</p>
              <p className="text-3xl font-bold text-gray-900">87%</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Evolution Chart */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Évolution des moyennes</h3>
              <div className="h-64 flex items-end gap-4">
                {monthlyStats.map((stat, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full flex flex-col items-center gap-1" style={{ height: '200px' }}>
                      <span className="text-sm font-bold text-gray-900">{stat.average}</span>
                      <div
                        className="w-full bg-gradient-to-t from-[#2302B3] to-[#4318FF] rounded-t-lg transition-all"
                        style={{ height: `${(stat.average / maxAverage) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-500">{stat.month}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Subject Performance */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance par matière</h3>
              <div className="space-y-4">
                {subjectPerformance.map((subject, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-28 text-sm font-medium text-gray-700">{subject.subject}</div>
                    <div className="flex-1">
                      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#2302B3] to-[#4318FF] rounded-full"
                          style={{ width: `${(subject.average / 20) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="w-16 text-right font-bold text-gray-900">{subject.average}</div>
                    <div className={`flex items-center gap-1 w-16 ${subject.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {subject.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      <span className="text-sm font-semibold">{subject.change}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Students */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900">Meilleurs élèves</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {topStudents.map((student) => (
                  <div key={student.rank} className="p-4 flex items-center justify-between hover:bg-gray-50">
                    <div className="flex items-center gap-4">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        student.rank <= 3 ? 'bg-gradient-to-br from-[#2302B3] to-[#4318FF] text-white' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {student.rank}
                      </span>
                      <div>
                        <p className="font-semibold text-gray-900">{student.name}</p>
                        <p className="text-sm text-gray-500">{student.class}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#2302B3]">{student.average}/20</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Class Ranking */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900">Classement des classes</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {[
                  { rank: 1, class: '3ème A', average: 15.5, students: 30 },
                  { rank: 2, class: '6ème B', average: 15.2, students: 30 },
                  { rank: 3, class: '3ème B', average: 14.8, students: 28 },
                  { rank: 4, class: '6ème A', average: 14.8, students: 32 },
                  { rank: 5, class: '5ème B', average: 14.5, students: 31 },
                ].map((cls) => (
                  <div key={cls.rank} className="p-4 flex items-center justify-between hover:bg-gray-50">
                    <div className="flex items-center gap-4">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        cls.rank <= 3 ? 'bg-gradient-to-br from-[#2302B3] to-[#4318FF] text-white' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {cls.rank}
                      </span>
                      <div>
                        <p className="font-semibold text-gray-900">{cls.class}</p>
                        <p className="text-sm text-gray-500">{cls.students} élèves</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#2302B3]">{cls.average}/20</p>
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