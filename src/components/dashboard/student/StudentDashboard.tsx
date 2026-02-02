'use client'

import {
  Calendar,
  Award,
  FileText,
  Clock,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export function StudentDashboard() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Bonjour, Amina ! 👋</h1>
          <p className="mt-1 text-gray-600">Voici ton tableau de bord pour aujourd'hui</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            Voir planning
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 transition-all hover:shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="mb-1 text-sm text-gray-600">Ma Moyenne</p>
              <p className="text-3xl font-bold text-gray-900">15.8/20</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <span className="rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
            +0.5 ce mois
          </span>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 transition-all hover:shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="mb-1 text-sm text-gray-600">Mon Rang</p>
              <p className="text-3xl font-bold text-gray-900">
                3<span className="text-lg text-gray-500">/32</span>
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2302B3]/10">
              <Award className="h-6 w-6 text-[#2302B3]" />
            </div>
          </div>
          <span className="rounded-full bg-[#2302B3]/10 px-2 py-1 text-xs font-semibold text-[#2302B3]">
            Top 10%
          </span>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 transition-all hover:shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="mb-1 text-sm text-gray-600">Devoirs à faire</p>
              <p className="text-3xl font-bold text-gray-900">3</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50">
              <FileText className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <span className="rounded-full bg-orange-50 px-2 py-1 text-xs font-semibold text-orange-600">
            1 urgent
          </span>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 transition-all hover:shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="mb-1 text-sm text-gray-600">Présence</p>
              <p className="text-3xl font-bold text-gray-900">96%</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
              <CheckCircle2 className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <span className="rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
            Excellent
          </span>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Today's Schedule */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Cours Aujourd'hui</h3>
            <Button variant="ghost" size="sm">
              Voir tout
            </Button>
          </div>
          <div className="space-y-3">
            {[
              {
                time: '08:00 - 10:00',
                subject: 'Mathématiques',
                teacher: 'M. Kamga',
                room: 'Salle 12',
                status: 'done',
              },
              {
                time: '10:15 - 12:15',
                subject: 'Français',
                teacher: 'Mme Kouam',
                room: 'Salle 12',
                status: 'current',
              },
              {
                time: '14:00 - 15:30',
                subject: 'Sciences',
                teacher: 'M. Nkolo',
                room: 'Labo 2',
                status: 'upcoming',
              },
              {
                time: '15:45 - 17:00',
                subject: 'Histoire-Géo',
                teacher: 'Mme Fouda',
                room: 'Salle 12',
                status: 'upcoming',
              },
            ].map((course, i) => (
              <div
                key={i}
                className={`flex items-center gap-4 rounded-xl p-4 transition-colors ${
                  course.status === 'current'
                    ? 'border-2 border-[#2302B3] bg-[#2302B3]/10'
                    : course.status === 'done'
                      ? 'bg-gray-50 opacity-60'
                      : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="min-w-[70px] text-center">
                  <Clock
                    className={`mx-auto mb-1 h-4 w-4 ${course.status === 'current' ? 'text-[#2302B3]' : 'text-gray-400'}`}
                  />
                  <p
                    className={`text-xs font-medium ${course.status === 'current' ? 'text-[#2302B3]' : 'text-gray-500'}`}
                  >
                    {course.time.split(' - ')[0]}
                  </p>
                </div>
                <div className="flex-1">
                  <p
                    className={`font-semibold ${course.status === 'current' ? 'text-[#2302B3]' : 'text-gray-900'}`}
                  >
                    {course.subject}
                  </p>
                  <p className="text-sm text-gray-500">
                    {course.teacher} • {course.room}
                  </p>
                </div>
                {course.status === 'current' && (
                  <span className="rounded-full bg-[#2302B3] px-3 py-1 text-xs font-semibold text-white">
                    En cours
                  </span>
                )}
                {course.status === 'done' && <CheckCircle2 className="h-5 w-5 text-green-500" />}
              </div>
            ))}
          </div>
        </div>

        {/* Homework */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Devoirs à Rendre</h3>
            <Button variant="ghost" size="sm">
              Voir tout
            </Button>
          </div>
          <div className="space-y-3">
            {[
              {
                subject: 'Mathématiques',
                title: 'Exercices page 45-46',
                due: 'Demain',
                urgent: true,
              },
              {
                subject: 'Français',
                title: 'Rédaction: Ma journée idéale',
                due: 'Vendredi',
                urgent: false,
              },
              {
                subject: 'Sciences',
                title: 'Exposé sur les volcans',
                due: 'Lundi prochain',
                urgent: false,
              },
            ].map((hw, i) => (
              <div
                key={i}
                className="flex items-start gap-4 rounded-xl bg-gray-50 p-4 transition-colors hover:bg-gray-100"
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                    hw.urgent ? 'bg-red-100' : 'bg-blue-100'
                  }`}
                >
                  <FileText className={`h-5 w-5 ${hw.urgent ? 'text-red-600' : 'text-blue-600'}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-gray-900">{hw.subject}</p>
                    {hw.urgent && <AlertCircle className="h-4 w-4 text-red-500" />}
                  </div>
                  <p className="text-sm text-gray-600">{hw.title}</p>
                  <p
                    className={`mt-1 text-xs ${hw.urgent ? 'font-semibold text-red-600' : 'text-gray-500'}`}
                  >
                    À rendre: {hw.due}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant={hw.urgent ? 'default' : 'outline'}
                  className={hw.urgent ? 'bg-[#2302B3] hover:bg-[#1a0285]' : ''}
                >
                  Voir
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Grades */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Dernières Notes</h3>
          <Button variant="ghost" size="sm">
            Voir toutes mes notes
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { subject: 'Mathématiques', grade: 17, max: 20, date: 'Hier', type: 'Contrôle' },
            { subject: 'Français', grade: 16, max: 20, date: 'Lundi', type: 'Dictée' },
            { subject: 'Sciences', grade: 15, max: 20, date: 'Vendredi', type: 'TP' },
            { subject: 'Histoire-Géo', grade: 14, max: 20, date: 'Jeudi', type: 'Exposé' },
          ].map((note, i) => (
            <div key={i} className="rounded-xl bg-gray-50 p-4 transition-colors hover:bg-gray-100">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs text-gray-500">{note.type}</span>
                <span className="text-xs text-gray-400">{note.date}</span>
              </div>
              <p className="mb-2 font-semibold text-gray-900">{note.subject}</p>
              <div className="flex items-end gap-1">
                <span className="text-3xl font-bold text-[#2302B3]">{note.grade}</span>
                <span className="mb-1 text-lg text-gray-400">/{note.max}</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full bg-[#2302B3]"
                  style={{ width: `${(note.grade / note.max) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
