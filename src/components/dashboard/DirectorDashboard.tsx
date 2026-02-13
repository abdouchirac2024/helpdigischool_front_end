'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Users,
  FileText,
  CreditCard,
  Bell,
  GraduationCap,
  TrendingUp,
  BookOpen,
  Loader2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { classeService } from '@/services/classe.service'
import { studentService } from '@/services/student.service'
import { teacherService } from '@/services/teacher.service'
import type { ClasseDto } from '@/types/classe'

const BAR_COLORS = [
  'bg-blue-500',
  'bg-green-500',
  'bg-yellow-500',
  'bg-orange-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-cyan-500',
  'bg-red-500',
  'bg-indigo-500',
  'bg-teal-500',
]

export function DirectorDashboard() {
  const [classes, setClasses] = useState<ClasseDto[]>([])
  const [studentsCount, setStudentsCount] = useState(0)
  const [teachersCount, setTeachersCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [classesRes, studentsRes, teachersRes] = await Promise.allSettled([
          classeService.getAll(),
          studentService.getAll(),
          teacherService.getAll(),
        ])

        if (classesRes.status === 'fulfilled') setClasses(classesRes.value)
        if (studentsRes.status === 'fulfilled') setStudentsCount(studentsRes.value.length)
        if (teachersRes.status === 'fulfilled') setTeachersCount(teachersRes.value.length)
      } catch (error) {
        console.error('Failed to load dashboard data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  const totalStudents = classes.reduce((acc, cls) => acc + (cls.effectifActuel || 0), 0)

  // Build class distribution from real data
  const classDistribution = classes
    .map((cls, i) => ({
      name: cls.nomClasse,
      students: cls.effectifActuel || 0,
      color: BAR_COLORS[i % BAR_COLORS.length],
    }))
    .sort((a, b) => b.students - a.students)

  const maxStudents = Math.max(...classDistribution.map((c) => c.students), 1)

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#2302B3]" />
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-gray-600">Vue d'ensemble de votre école</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2" asChild>
            <Link href="/dashboard/director/stats">
              <TrendingUp className="h-4 w-4" />
              Statistiques
            </Link>
          </Button>
          <Button className="gap-2 bg-[#2302B3] hover:bg-[#1a0285]" asChild>
            <Link href="/dashboard/director/students">Ajouter Élève</Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 transition-all hover:shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="mb-1 text-sm text-gray-600">Élèves inscrits</p>
              <p className="text-3xl font-bold text-gray-900">{studentsCount || totalStudents}</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 transition-all hover:shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="mb-1 text-sm text-gray-600">Classes</p>
              <p className="text-3xl font-bold text-gray-900">{classes.length}</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50">
              <BookOpen className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 transition-all hover:shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="mb-1 text-sm text-gray-600">Enseignants</p>
              <p className="text-3xl font-bold text-gray-900">{teachersCount}</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50">
              <GraduationCap className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <span className="rounded-full bg-gray-50 px-2 py-1 text-xs font-semibold text-gray-600">
            Actifs
          </span>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 transition-all hover:shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="mb-1 text-sm text-gray-600">Élèves / Classe</p>
              <p className="text-3xl font-bold text-gray-900">
                {classes.length > 0
                  ? Math.round((studentsCount || totalStudents) / classes.length)
                  : 0}
              </p>
              <p className="mt-1 text-xs text-gray-500">Moyenne par classe</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Activities */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <h3 className="mb-4 text-lg font-semibold">Activités récentes</h3>
          <div className="space-y-3">
            {[
              {
                icon: FileText,
                text: '12 bulletins générés',
                time: 'Il y a 5 min',
                color: 'bg-yellow-50',
                iconColor: 'text-yellow-600',
              },
              {
                icon: CreditCard,
                text: 'Paiement reçu - 25,000 FCFA',
                time: 'Il y a 15 min',
                color: 'bg-green-50',
                iconColor: 'text-green-600',
              },
              {
                icon: Bell,
                text: 'SMS envoyés aux parents CM2',
                time: 'Il y a 1h',
                color: 'bg-blue-50',
                iconColor: 'text-blue-600',
              },
              {
                icon: Users,
                text: 'Nouvelle inscription - Paul Ngo',
                time: 'Il y a 2h',
                color: 'bg-purple-50',
                iconColor: 'text-purple-600',
              },
            ].map((activity, i) => (
              <div key={i} className="flex items-center gap-4 rounded-lg p-3 hover:bg-gray-50">
                <div
                  className={`h-10 w-10 rounded-lg ${activity.color} flex items-center justify-center`}
                >
                  <activity.icon className={`h-5 w-5 ${activity.iconColor}`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.text}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Class Distribution - Dynamic */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <h3 className="mb-4 text-lg font-semibold">Répartition par classe</h3>
          {classDistribution.length > 0 ? (
            <div className="space-y-3">
              {classDistribution.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="w-24 truncate text-sm font-medium" title={item.name}>
                    {item.name}
                  </span>
                  <div className="h-8 flex-1 overflow-hidden rounded-lg bg-gray-100">
                    <div
                      className={`h-full ${item.color} flex items-center justify-end px-3`}
                      style={{
                        width: `${Math.max((item.students / maxStudents) * 100, 8)}%`,
                      }}
                    >
                      <span className="text-xs font-semibold text-white">{item.students}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="py-4 text-center text-sm text-gray-500">Aucune classe trouvée</p>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold">Actions rapides</h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <Button variant="outline" className="h-auto flex-col gap-2 py-4" asChild>
            <Link href="/dashboard/director/students">
              <Users className="h-6 w-6" />
              <span className="text-sm">Gérer Élèves</span>
            </Link>
          </Button>
          <Button variant="outline" className="h-auto flex-col gap-2 py-4" asChild>
            <Link href="/dashboard/director/classes">
              <BookOpen className="h-6 w-6" />
              <span className="text-sm">Classes</span>
            </Link>
          </Button>
          <Button variant="outline" className="h-auto flex-col gap-2 py-4" asChild>
            <Link href="/dashboard/director/payments">
              <CreditCard className="h-6 w-6" />
              <span className="text-sm">Paiements</span>
            </Link>
          </Button>
          <Button variant="outline" className="h-auto flex-col gap-2 py-4" asChild>
            <Link href="/dashboard/director/notifications">
              <Bell className="h-6 w-6" />
              <span className="text-sm">Notifications</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
