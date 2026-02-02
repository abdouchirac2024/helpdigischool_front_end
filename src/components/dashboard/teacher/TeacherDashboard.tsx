'use client'

import { Users, FileText, BookOpen, MessageSquare, Award, ClipboardList } from 'lucide-react'
import { StatCard } from '../shared/StatCard'
import { Button } from '@/components/ui/button'

export function TeacherDashboard() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Bonjour Marie! 👋</h1>
        <p className="mt-1 text-gray-600">Voici un aperçu de votre classe aujourd'hui</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Mes élèves"
          value="32"
          subtitle="Classe CM2-A"
          icon={Users}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
        />
        <StatCard
          title="Présents aujourd'hui"
          value="30"
          subtitle="94% de présence"
          icon={ClipboardList}
          iconColor="text-green-600"
          iconBg="bg-green-50"
          trend="94%"
          trendUp={true}
        />
        <StatCard
          title="Notes à saisir"
          value="8"
          subtitle="Évaluations en attente"
          icon={FileText}
          iconColor="text-orange-600"
          iconBg="bg-orange-50"
        />
        <StatCard
          title="Moyenne classe"
          value="14.2/20"
          subtitle="Trimestre en cours"
          icon={Award}
          iconColor="text-purple-600"
          iconBg="bg-purple-50"
          trend="+0.8"
          trendUp={true}
        />
      </div>

      {/* Today's Schedule */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold">Emploi du temps aujourd'hui</h3>
        <div className="space-y-3">
          {[
            {
              time: '08:00 - 09:30',
              subject: 'Mathématiques',
              room: 'Salle 12',
              status: 'completed',
            },
            { time: '09:45 - 11:15', subject: 'Français', room: 'Salle 12', status: 'current' },
            { time: '11:30 - 13:00', subject: 'Sciences', room: 'Labo 2', status: 'upcoming' },
            {
              time: '14:00 - 15:30',
              subject: 'Histoire-Géo',
              room: 'Salle 12',
              status: 'upcoming',
            },
          ].map((lesson, i) => (
            <div
              key={i}
              className={`flex items-center gap-4 rounded-xl border-2 p-4 ${
                lesson.status === 'current'
                  ? 'border-[#2302B3] bg-[#2302B3]/5'
                  : lesson.status === 'completed'
                    ? 'border-gray-200 bg-gray-50 opacity-60'
                    : 'border-gray-200'
              }`}
            >
              <div className="min-w-[80px] text-center">
                <p className="text-sm font-semibold text-gray-900">{lesson.time}</p>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{lesson.subject}</p>
                <p className="text-sm text-gray-500">{lesson.room}</p>
              </div>
              {lesson.status === 'current' && (
                <span className="rounded-full bg-[#2302B3] px-3 py-1 text-xs font-semibold text-white">
                  En cours
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions & Recent Students */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Quick Actions */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <h3 className="mb-4 text-lg font-semibold">Actions rapides</h3>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-auto flex-col gap-2 py-4">
              <FileText className="h-6 w-6" />
              <span className="text-sm">Saisir notes</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 py-4">
              <ClipboardList className="h-6 w-6" />
              <span className="text-sm">Présences</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 py-4">
              <MessageSquare className="h-6 w-6" />
              <span className="text-sm">Messages</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 py-4">
              <BookOpen className="h-6 w-6" />
              <span className="text-sm">Cours</span>
            </Button>
          </div>
        </div>

        {/* Top Students */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <h3 className="mb-4 text-lg font-semibold">Meilleurs élèves ce mois</h3>
          <div className="space-y-3">
            {[
              { name: 'Amina Nkolo', average: '18.5/20', rank: 1 },
              { name: 'Paul Mbarga', average: '17.8/20', rank: 2 },
              { name: 'Sophie Kamga', average: '17.2/20', rank: 3 },
            ].map((student, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg p-3 hover:bg-gray-50">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full font-bold text-white ${
                    i === 0 ? 'bg-yellow-500' : i === 1 ? 'bg-gray-400' : 'bg-orange-600'
                  }`}
                >
                  {student.rank}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{student.name}</p>
                  <p className="text-xs text-gray-500">Moyenne: {student.average}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
