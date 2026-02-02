'use client'

import { useState } from 'react'
import {
  Users,
  FileText,
  BookOpen,
  Calendar,
  Award,
  ClipboardList,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Copy,
  Download,
  CheckCircle,
  Clock,
  AlertCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

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
    total: 32,
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
    total: 32,
  },
  {
    id: 3,
    title: "Contrôle Sciences - Le cycle de l'eau",
    subject: 'Sciences',
    class: 'CM2-A',
    date: '17 Jan 2025',
    duration: '45min',
    questions: 15,
    status: 'scheduled',
    average: null,
    submitted: 0,
    total: 32,
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
    total: 32,
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
    total: 32,
  },
]

const subjectColors: Record<string, string> = {
  Mathématiques: 'bg-blue-500',
  Français: 'bg-green-500',
  Sciences: 'bg-purple-500',
  'Histoire-Géo': 'bg-orange-500',
  Anglais: 'bg-pink-500',
}

export function TeacherEvaluationsPage() {
  const [filter, setFilter] = useState('all')

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <span className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
            <CheckCircle className="h-3 w-3" /> Terminée
          </span>
        )
      case 'in_progress':
        return (
          <span className="flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">
            <Clock className="h-3 w-3" /> En cours
          </span>
        )
      case 'scheduled':
        return (
          <span className="flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-700">
            <Calendar className="h-3 w-3" /> Planifiée
          </span>
        )
      case 'draft':
        return (
          <span className="flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-600">
            <AlertCircle className="h-3 w-3" /> Brouillon
          </span>
        )
      default:
        return null
    }
  }

  const filteredEvaluations =
    filter === 'all' ? evaluations : evaluations.filter((e) => e.status === filter)

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Évaluations</h1>
          <p className="mt-1 text-gray-600">Gérez vos contrôles et évaluations</p>
        </div>
        <Button className="gap-2 bg-[#2302B3] hover:bg-[#1a0285]">
          <Plus className="h-4 w-4" />
          Nouvelle évaluation
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-gray-100 bg-white p-4">
          <p className="mb-1 text-sm text-gray-600">Total évaluations</p>
          <p className="text-2xl font-bold text-gray-900">{evaluations.length}</p>
        </div>
        <div className="rounded-xl border border-gray-100 bg-white p-4">
          <p className="mb-1 text-sm text-gray-600">Terminées</p>
          <p className="text-2xl font-bold text-green-600">
            {evaluations.filter((e) => e.status === 'completed').length}
          </p>
        </div>
        <div className="rounded-xl border border-gray-100 bg-white p-4">
          <p className="mb-1 text-sm text-gray-600">À venir</p>
          <p className="text-2xl font-bold text-yellow-600">
            {evaluations.filter((e) => e.status === 'scheduled').length}
          </p>
        </div>
        <div className="rounded-xl border border-gray-100 bg-white p-4">
          <p className="mb-1 text-sm text-gray-600">Moyenne générale</p>
          <p className="text-2xl font-bold text-[#2302B3]">14.8/20</p>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-xl border border-gray-100 bg-white p-4">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input placeholder="Rechercher une évaluation..." className="pl-9" />
          </div>
          <div className="flex flex-wrap gap-2">
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
          <div
            key={evaluation.id}
            className="rounded-xl border border-gray-100 bg-white p-6 transition-shadow hover:shadow-md"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
              <div
                className={`h-16 w-2 rounded-full ${subjectColors[evaluation.subject]} hidden lg:block`}
              />

              <div className="flex-1">
                <div className="mb-2 flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{evaluation.title}</h3>
                    <p className="text-sm text-gray-500">
                      {evaluation.subject} • {evaluation.class} • {evaluation.questions} questions
                    </p>
                  </div>
                  {getStatusBadge(evaluation.status)}
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    {evaluation.date}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    {evaluation.duration}
                  </div>
                  {evaluation.status === 'completed' && (
                    <>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="h-4 w-4" />
                        {evaluation.submitted}/{evaluation.total} copies
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold text-[#2302B3]">
                        <Award className="h-4 w-4" />
                        Moyenne: {evaluation.average}/20
                      </div>
                    </>
                  )}
                  {evaluation.status === 'in_progress' && (
                    <div className="flex items-center gap-2 text-sm text-blue-600">
                      <Users className="h-4 w-4" />
                      {evaluation.submitted}/{evaluation.total} soumissions
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 lg:mt-0">
                <Button variant="outline" size="sm" className="gap-1">
                  <Eye className="h-4 w-4" />
                  Voir
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <Edit className="h-4 w-4" />
                  Modifier
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <Copy className="h-4 w-4" />
                  Dupliquer
                </Button>
                {evaluation.status === 'completed' && (
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Create Templates */}
      <div className="rounded-xl border border-gray-100 bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold">Créer rapidement</h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { icon: FileText, label: 'Contrôle', color: 'bg-blue-50 text-blue-600' },
            { icon: BookOpen, label: 'Dictée', color: 'bg-green-50 text-green-600' },
            { icon: ClipboardList, label: 'Exercices', color: 'bg-purple-50 text-purple-600' },
            { icon: Award, label: 'Examen', color: 'bg-orange-50 text-orange-600' },
          ].map((template, i) => (
            <Button key={i} variant="outline" className="h-auto flex-col gap-2 py-4">
              <div
                className={`h-10 w-10 rounded-lg ${template.color} flex items-center justify-center`}
              >
                <template.icon className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium">{template.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
