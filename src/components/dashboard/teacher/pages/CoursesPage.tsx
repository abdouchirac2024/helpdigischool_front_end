'use client'

import { BookOpen, Plus, Edit, Trash2, Clock, FileDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

const courses = [
  { id: 1, name: 'Mathématiques', hours: 6, color: 'bg-blue-500', lessons: 24, completed: 18 },
  { id: 2, name: 'Français', hours: 8, color: 'bg-green-500', lessons: 32, completed: 25 },
  { id: 3, name: 'Sciences', hours: 4, color: 'bg-purple-500', lessons: 16, completed: 12 },
  {
    id: 4,
    name: 'Histoire-Géographie',
    hours: 3,
    color: 'bg-orange-500',
    lessons: 12,
    completed: 9,
  },
  { id: 5, name: 'Anglais', hours: 2, color: 'bg-pink-500', lessons: 8, completed: 6 },
]

export function TeacherCoursesPage() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mes Cours</h1>
          <p className="mt-1 text-gray-600">Classe CM2-A • Année 2024-2025</p>
        </div>
        <Button className="gap-2 bg-[#2302B3] hover:bg-[#1a0285]">
          <Plus className="h-4 w-4" />
          Nouveau cours
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-gray-100 bg-white p-4">
          <p className="mb-1 text-sm text-gray-600">Total matières</p>
          <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
        </div>
        <div className="rounded-xl border border-gray-100 bg-white p-4">
          <p className="mb-1 text-sm text-gray-600">Heures/semaine</p>
          <p className="text-2xl font-bold text-gray-900">
            {courses.reduce((acc, c) => acc + c.hours, 0)}h
          </p>
        </div>
        <div className="rounded-xl border border-gray-100 bg-white p-4">
          <p className="mb-1 text-sm text-gray-600">Leçons totales</p>
          <p className="text-2xl font-bold text-gray-900">
            {courses.reduce((acc, c) => acc + c.lessons, 0)}
          </p>
        </div>
        <div className="rounded-xl border border-gray-100 bg-white p-4">
          <p className="mb-1 text-sm text-gray-600">Progression</p>
          <p className="text-2xl font-bold text-green-600">
            {Math.round(
              (courses.reduce((acc, c) => acc + c.completed, 0) /
                courses.reduce((acc, c) => acc + c.lessons, 0)) *
                100
            )}
            %
          </p>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <div
            key={course.id}
            className="overflow-hidden rounded-xl border border-gray-100 bg-white transition-shadow hover:shadow-lg"
          >
            <div className={`h-2 ${course.color}`} />
            <div className="p-6">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{course.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{course.hours}h par semaine</p>
                </div>
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-gray-600">Progression</span>
                    <span className="font-semibold text-gray-900">
                      {course.completed}/{course.lessons} leçons
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                    <div
                      className={`h-full ${course.color}`}
                      style={{ width: `${(course.completed / course.lessons) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="flex gap-2 border-t border-gray-100 pt-3">
                  <Button size="sm" variant="outline" className="flex-1 gap-2">
                    <FileDown className="h-4 w-4" />
                    Programme
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 gap-2">
                    <Clock className="h-4 w-4" />
                    Planning
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Lessons */}
      <div className="rounded-xl border border-gray-100 bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold">Dernières leçons</h3>
        <div className="space-y-3">
          {[
            {
              subject: 'Mathématiques',
              title: 'Les fractions',
              date: "Aujourd'hui",
              status: 'completed',
            },
            { subject: 'Français', title: 'Le passé composé', date: 'Hier', status: 'completed' },
            {
              subject: 'Sciences',
              title: "Le cycle de l'eau",
              date: 'Il y a 2 jours',
              status: 'completed',
            },
            {
              subject: 'Histoire',
              title: 'La colonisation',
              date: 'Il y a 3 jours',
              status: 'completed',
            },
          ].map((lesson, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-lg p-3 hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{lesson.title}</p>
                  <p className="text-sm text-gray-500">
                    {lesson.subject} • {lesson.date}
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                Terminée
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
