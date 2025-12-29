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
  Save,
  Download,
  Plus,
  TrendingUp,
  TrendingDown
} from 'lucide-react'
import { Sidebar, MenuItem } from '../../shared/Sidebar'
import { TopBar } from '../../shared/TopBar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
  { icon: LayoutDashboard, label: 'Tableau de bord', href: '/dashboard/teacher' },
  { icon: Users, label: 'Mes élèves', href: '/dashboard/teacher/students', badge: '32' },
  { icon: FileText, label: 'Saisie des notes', href: '/dashboard/teacher/grades' },
  { icon: BookOpen, label: 'Mes cours', href: '/dashboard/teacher/courses' },
  { icon: Calendar, label: 'Emploi du temps', href: '/dashboard/teacher/schedule' },
  { icon: ClipboardList, label: 'Présences', href: '/dashboard/teacher/attendance' },
  { icon: MessageSquare, label: 'Messages', href: '/dashboard/teacher/messages', badge: '3' },
  { icon: Award, label: 'Évaluations', href: '/dashboard/teacher/evaluations' },
]

const students = [
  { id: 1, name: 'Amina Nkolo', math: 18, french: 17, science: 19, history: 18, average: 18.0 },
  { id: 2, name: 'Paul Mbarga', math: 16, french: 18, science: 17, history: 19, average: 17.5 },
  { id: 3, name: 'Sophie Kamga', math: 17, french: 16, science: 18, history: 17, average: 17.0 },
  { id: 4, name: 'Jean Talla', math: 15, french: 16, science: 15, history: 16, average: 15.5 },
  { id: 5, name: 'Marie Kouam', math: 14, french: 15, science: 14, history: 15, average: 14.5 },
  { id: 6, name: 'David Ngo', math: 13, french: 13, science: 14, history: 12, average: 13.0 },
  { id: 7, name: 'Sarah Biya', math: 12, french: 13, science: 12, history: 13, average: 12.5 },
  { id: 8, name: 'Eric Muna', math: 11, french: 12, science: 11, history: 12, average: 11.5 },
]

export function TeacherGradesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [subject, setSubject] = useState('math')
  const [evaluationType, setEvaluationType] = useState('devoir')
  const [grades, setGrades] = useState<{[key: number]: string}>({})

  const handleGradeChange = (studentId: number, value: string) => {
    setGrades(prev => ({ ...prev, [studentId]: value }))
  }

  const handleSave = () => {
    console.log('Saving grades:', grades)
    // API call here
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
              <h1 className="text-3xl font-bold text-gray-900">Saisie des Notes</h1>
              <p className="text-gray-600 mt-1">Classe CM2-A • Trimestre 2</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Exporter
              </Button>
              <Button className="bg-[#2302B3] hover:bg-[#1a0285] gap-2" onClick={handleSave}>
                <Save className="w-4 h-4" />
                Enregistrer
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <p className="text-sm text-gray-600 mb-1">Moyenne classe</p>
              <p className="text-2xl font-bold text-gray-900">14.8/20</p>
              <div className="flex items-center gap-1 mt-2 text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span className="text-xs font-medium">+0.5</span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <p className="text-sm text-gray-600 mb-1">Note la plus haute</p>
              <p className="text-2xl font-bold text-green-600">19/20</p>
              <p className="text-xs text-gray-500 mt-2">Amina Nkolo</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <p className="text-sm text-gray-600 mb-1">Note la plus basse</p>
              <p className="text-2xl font-bold text-red-600">11/20</p>
              <p className="text-xs text-gray-500 mt-2">Eric Muna</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <p className="text-sm text-gray-600 mb-1">Taux de réussite</p>
              <p className="text-2xl font-bold text-blue-600">87.5%</p>
              <p className="text-xs text-gray-500 mt-2">28/32 élèves</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4">
              <Select value={subject} onValueChange={setSubject}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Matière" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="math">Mathématiques</SelectItem>
                  <SelectItem value="french">Français</SelectItem>
                  <SelectItem value="science">Sciences</SelectItem>
                  <SelectItem value="history">Histoire-Géo</SelectItem>
                  <SelectItem value="english">Anglais</SelectItem>
                </SelectContent>
              </Select>
              <Select value={evaluationType} onValueChange={setEvaluationType}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="devoir">Devoir</SelectItem>
                  <SelectItem value="composition">Composition</SelectItem>
                  <SelectItem value="interrogation">Interrogation</SelectItem>
                  <SelectItem value="oral">Oral</SelectItem>
                </SelectContent>
              </Select>
              <Input 
                type="date" 
                className="w-full md:w-[200px]"
                defaultValue={new Date().toISOString().split('T')[0]}
              />
              <Button variant="outline" className="gap-2">
                <Plus className="w-4 h-4" />
                Nouvelle évaluation
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="saisie" className="space-y-4">
            <TabsList className="bg-white border border-gray-200">
              <TabsTrigger value="saisie">Saisie rapide</TabsTrigger>
              <TabsTrigger value="historique">Historique</TabsTrigger>
              <TabsTrigger value="statistiques">Statistiques</TabsTrigger>
            </TabsList>

            <TabsContent value="saisie" className="space-y-4">
              {/* Grade Entry Table */}
              <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          #
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Élève
                        </th>
                        <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Note (/20)
                        </th>
                        <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Appréciation
                        </th>
                        <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Moyenne actuelle
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {students.map((student, index) => (
                        <tr key={student.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2302B3] to-[#4318FF] flex items-center justify-center text-white text-sm font-semibold">
                                {student.name.charAt(0)}
                              </div>
                              <span className="font-medium text-gray-900">{student.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Input
                              type="number"
                              min="0"
                              max="20"
                              step="0.5"
                              placeholder="--"
                              className="w-24 mx-auto text-center font-semibold"
                              value={grades[student.id] || ''}
                              onChange={(e) => handleGradeChange(student.id, e.target.value)}
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <Select>
                              <SelectTrigger className="w-32 mx-auto">
                                <SelectValue placeholder="--" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="excellent">Excellent</SelectItem>
                                <SelectItem value="bien">Bien</SelectItem>
                                <SelectItem value="assez-bien">Assez bien</SelectItem>
                                <SelectItem value="passable">Passable</SelectItem>
                                <SelectItem value="insuffisant">Insuffisant</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getGradeColor(student.average)}`}>
                              {student.average}/20
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="historique">
              <div className="bg-white rounded-xl p-8 border border-gray-100 text-center">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Historique des évaluations</p>
              </div>
            </TabsContent>

            <TabsContent value="statistiques">
              <div className="bg-white rounded-xl p-8 border border-gray-100 text-center">
                <Award className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Statistiques détaillées</p>
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
