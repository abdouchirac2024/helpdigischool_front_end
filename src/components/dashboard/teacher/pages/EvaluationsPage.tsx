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
  Search,
  Plus,
  Filter,
  Edit,
  Trash2,
  Eye,
  Copy,
  Download,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react'
import { Sidebar, MenuItem } from '../../shared/Sidebar'
import { TopBar } from '../../shared/TopBar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

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

const evaluations = [
  {
    id: 1,
    title: 'Évaluation de Mathématiques - Fractions',
    subject: 'Mathématiques',
    class: 'CM2-A',
    date: '15 Jan 2025',
    duration: '1h',
    questions: 20,
    status: 'completed',
    average: 14.5,
    submitted: 32,
    total: 32
  },
  {
    id: 2,
    title: 'Dictée n°8 - Le voyage',
    subject: 'Français',
    class: 'CM2-A',
    date: '14 Jan 2025',
    duration: '30min',
    questions: 1,
    status: 'completed',
    average: 15.2,
    submitted: 32,
    total: 32
  },
  {
    id: 3,
    title: 'Contrôle Sciences - Le cycle de l\'eau',
    subject: 'Sciences',
    class: 'CM2-A',
    date: '17 Jan 2025',
    duration: '45min',
    questions: 15,
    status: 'scheduled',
    average: null,
    submitted: 0,
    total: 32
  },
  {
    id: 4,
    title: 'Évaluation Histoire - La colonisation',
    subject: 'Histoire-Géo',
    class: 'CM2-A',
    date: '20 Jan 2025',
    duration: '1h',
    questions: 18,
    status: 'draft',
    average: null,
    submitted: 0,
    total: 32
  },
  {
    id: 5,
    title: 'Test Anglais - Vocabulary Unit 5',
    subject: 'Anglais',
    class: 'CM2-A',
    date: '18 Jan 2025',
    duration: '30min',
    questions: 25,
    status: 'in_progress',
    average: null,
    submitted: 18,
    total: 32
  },
]

const subjectColors: Record<string, string> = {
  'Mathématiques': 'bg-blue-500',
  'Français': 'bg-green-500',
  'Sciences': 'bg-purple-500',
  'Histoire-Géo': 'bg-orange-500',
  'Anglais': 'bg-pink-500',
}

export function TeacherEvaluationsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [filter, setFilter] = useState('all')

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
            <CheckCircle className="w-3 h-3" /> Terminée
          </span>
        )
      case 'in_progress':
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
            <Clock className="w-3 h-3" /> En cours
          </span>
        )
      case 'scheduled':
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">
            <Calendar className="w-3 h-3" /> Planifiée
          </span>
        )
      case 'draft':
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">
            <AlertCircle className="w-3 h-3" /> Brouillon
          </span>
        )
      default:
        return null
    }
  }

  const filteredEvaluations = filter === 'all'
    ? evaluations
    : evaluations.filter(e => e.status === filter)

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
              <h1 className="text-3xl font-bold text-gray-900">Évaluations</h1>
              <p className="text-gray-600 mt-1">Gérez vos contrôles et évaluations</p>
            </div>
            <Button className="bg-[#2302B3] hover:bg-[#1a0285] gap-2">
              <Plus className="w-4 h-4" />
              Nouvelle évaluation
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <p className="text-sm text-gray-600 mb-1">Total évaluations</p>
              <p className="text-2xl font-bold text-gray-900">{evaluations.length}</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <p className="text-sm text-gray-600 mb-1">Terminées</p>
              <p className="text-2xl font-bold text-green-600">
                {evaluations.filter(e => e.status === 'completed').length}
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <p className="text-sm text-gray-600 mb-1">À venir</p>
              <p className="text-2xl font-bold text-yellow-600">
                {evaluations.filter(e => e.status === 'scheduled').length}
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <p className="text-sm text-gray-600 mb-1">Moyenne générale</p>
              <p className="text-2xl font-bold text-[#2302B3]">14.8/20</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Rechercher une évaluation..."
                  className="pl-9"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {[
                  { value: 'all', label: 'Toutes' },
                  { value: 'completed', label: 'Terminées' },
                  { value: 'in_progress', label: 'En cours' },
                  { value: 'scheduled', label: 'Planifiées' },
                  { value: 'draft', label: 'Brouillons' },
                ].map((f) => (
                  <Button
                    key={f.value}
                    variant={filter === f.value ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilter(f.value)}
                    className={filter === f.value ? 'bg-[#2302B3]' : ''}
                  >
                    {f.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Evaluations List */}
          <div className="space-y-4">
            {filteredEvaluations.map((evaluation) => (
              <div key={evaluation.id} className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  <div className={`w-2 h-16 rounded-full ${subjectColors[evaluation.subject]} hidden lg:block`} />

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{evaluation.title}</h3>
                        <p className="text-sm text-gray-500">
                          {evaluation.subject} • {evaluation.class} • {evaluation.questions} questions
                        </p>
                      </div>
                      {getStatusBadge(evaluation.status)}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 mt-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        {evaluation.date}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        {evaluation.duration}
                      </div>
                      {evaluation.status === 'completed' && (
                        <>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Users className="w-4 h-4" />
                            {evaluation.submitted}/{evaluation.total} copies
                          </div>
                          <div className="flex items-center gap-2 text-sm font-semibold text-[#2302B3]">
                            <Award className="w-4 h-4" />
                            Moyenne: {evaluation.average}/20
                          </div>
                        </>
                      )}
                      {evaluation.status === 'in_progress' && (
                        <div className="flex items-center gap-2 text-sm text-blue-600">
                          <Users className="w-4 h-4" />
                          {evaluation.submitted}/{evaluation.total} soumissions
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-4 lg:mt-0">
                    <Button variant="outline" size="sm" className="gap-1">
                      <Eye className="w-4 h-4" />
                      Voir
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Edit className="w-4 h-4" />
                      Modifier
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Copy className="w-4 h-4" />
                      Dupliquer
                    </Button>
                    {evaluation.status === 'completed' && (
                      <Button variant="outline" size="sm" className="gap-1">
                        <Download className="w-4 h-4" />
                        Export
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Create Templates */}
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h3 className="text-lg font-semibold mb-4">Créer rapidement</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: FileText, label: 'Contrôle', color: 'bg-blue-50 text-blue-600' },
                { icon: BookOpen, label: 'Dictée', color: 'bg-green-50 text-green-600' },
                { icon: ClipboardList, label: 'Exercices', color: 'bg-purple-50 text-purple-600' },
                { icon: Award, label: 'Examen', color: 'bg-orange-50 text-orange-600' },
              ].map((template, i) => (
                <Button key={i} variant="outline" className="h-auto py-4 flex-col gap-2">
                  <div className={`w-10 h-10 rounded-lg ${template.color} flex items-center justify-center`}>
                    <template.icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium">{template.label}</span>
                </Button>
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