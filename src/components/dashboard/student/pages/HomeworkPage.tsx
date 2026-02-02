'use client'

import { useState } from 'react'
import { Calendar, Clock, AlertCircle, CheckCircle2, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'

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
    urgent: true,
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
    urgent: false,
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
    urgent: false,
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
    urgent: false,
  },
]

export function StudentHomeworkPage() {
  const [filter, setFilter] = useState('all')

  const filteredHomework = homework.filter((hw) => {
    if (filter === 'all') return true
    return hw.status === filter
  })

  const getStatusBadge = (status: string, urgent: boolean) => {
    if (status === 'completed') {
      return (
        <span className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-600">
          <CheckCircle2 className="h-3 w-3" /> Terminé
        </span>
      )
    }
    if (urgent) {
      return (
        <span className="flex items-center gap-1 rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-600">
          <AlertCircle className="h-3 w-3" /> Urgent
        </span>
      )
    }
    if (status === 'in_progress') {
      return (
        <span className="flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-600">
          <Clock className="h-3 w-3" /> En cours
        </span>
      )
    }
    return (
      <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-600">
        À faire
      </span>
    )
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mes Devoirs</h1>
          <p className="mt-1 text-gray-600">
            {homework.filter((h) => h.status !== 'completed').length} devoirs à rendre
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {[
          { value: 'all', label: 'Tous', count: homework.length },
          {
            value: 'pending',
            label: 'À faire',
            count: homework.filter((h) => h.status === 'pending').length,
          },
          {
            value: 'in_progress',
            label: 'En cours',
            count: homework.filter((h) => h.status === 'in_progress').length,
          },
          {
            value: 'completed',
            label: 'Terminés',
            count: homework.filter((h) => h.status === 'completed').length,
          },
        ].map((f) => (
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
            className={`rounded-2xl border bg-white ${
              hw.urgent ? 'border-red-200 bg-red-50/30' : 'border-gray-100'
            } p-6 transition-all hover:shadow-lg`}
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-start">
              <div className="flex-1">
                <div className="mb-2 flex items-center gap-3">
                  <span className="rounded-full bg-[#2302B3]/10 px-3 py-1 text-sm font-semibold text-[#2302B3]">
                    {hw.subject}
                  </span>
                  {getStatusBadge(hw.status, hw.urgent)}
                </div>
                <h3 className="mb-2 text-lg font-bold text-gray-900">{hw.title}</h3>
                <p className="mb-3 text-gray-600">{hw.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />À rendre le {hw.dueDate}
                  </span>
                  <span>•</span>
                  <span>{hw.teacher}</span>
                </div>
              </div>
              <div className="flex gap-2">
                {hw.status !== 'completed' && (
                  <>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Upload className="h-4 w-4" />
                      Déposer
                    </Button>
                    <Button size="sm" className="bg-[#2302B3] hover:bg-[#1a0285]">
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
  )
}
