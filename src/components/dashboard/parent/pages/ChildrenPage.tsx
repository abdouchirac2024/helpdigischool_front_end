'use client'

import {
  FileText,
  CreditCard,
  MessageSquare,
  Calendar,
  TrendingUp,
  TrendingDown,
  Eye,
  Download,
  Plus,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

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
    ],
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
    ],
  },
]

export function ParentChildrenPage() {
  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp className="h-4 w-4 text-green-600" />
    if (trend === 'down') return <TrendingDown className="h-4 w-4 text-red-600" />
    return <div className="h-4 w-4" />
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mes Enfants</h1>
          <p className="mt-1 text-gray-600">{children.length} enfants inscrits</p>
        </div>
        <Button className="gap-2 bg-[#2302B3] hover:bg-[#1a0285]">
          <Plus className="h-4 w-4" />
          Ajouter un enfant
        </Button>
      </div>

      {/* Children Cards */}
      <div className="space-y-6">
        {children.map((child) => (
          <div
            key={child.id}
            className="overflow-hidden rounded-2xl border border-gray-100 bg-white"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#2302B3] to-[#4318FF] p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/30 bg-white/20 text-2xl font-bold text-white backdrop-blur-sm">
                    {child.name.charAt(0)}
                  </div>
                  <div className="text-white">
                    <h3 className="text-2xl font-bold">{child.name}</h3>
                    <p className="text-white/80">
                      {child.class} • {child.age} ans
                    </p>
                    <p className="mt-1 text-sm text-white/70">Enseignant: {child.teacher}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="secondary" className="gap-2">
                    <Eye className="h-4 w-4" />
                    Voir détails
                  </Button>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 border-b border-gray-100 p-6 md:grid-cols-4">
              <div className="text-center">
                <p className="mb-1 text-sm text-gray-600">Moyenne générale</p>
                <p className="text-2xl font-bold text-[#2302B3]">{child.average}/20</p>
              </div>
              <div className="text-center">
                <p className="mb-1 text-sm text-gray-600">Taux de présence</p>
                <p className="text-2xl font-bold text-green-600">{child.attendance}%</p>
              </div>
              <div className="text-center">
                <p className="mb-1 text-sm text-gray-600">Classe</p>
                <p className="text-2xl font-bold text-gray-900">{child.class}</p>
              </div>
              <div className="text-center">
                <p className="mb-1 text-sm text-gray-600">Rang</p>
                <p className="text-2xl font-bold text-orange-600">3/32</p>
              </div>
            </div>

            {/* Subjects */}
            <div className="p-6">
              <h4 className="mb-4 font-semibold text-gray-900">Résultats par matière</h4>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {child.subjects.map((subject, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-xl bg-gray-50 p-4 transition-colors hover:bg-gray-100"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{subject.name}</p>
                      <div className="mt-1 flex items-center gap-2">
                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                          <div
                            className="h-full bg-[#2302B3]"
                            style={{ width: `${(subject.grade / 20) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="ml-4 flex items-center gap-2">
                      <span className="text-xl font-bold text-gray-900">{subject.grade}/20</span>
                      {getTrendIcon(subject.trend)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="border-t border-gray-100 bg-gray-50 p-6">
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" size="sm" className="gap-2">
                  <FileText className="h-4 w-4" />
                  Voir bulletins
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Calendar className="h-4 w-4" />
                  Emploi du temps
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Contacter enseignant
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  Télécharger relevé
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
