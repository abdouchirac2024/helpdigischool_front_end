'use client'

import { BookOpen, Play, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

const courses = [
  {
    name: 'Mathématiques',
    teacher: 'M. Kamga',
    progress: 75,
    lessons: 12,
    completed: 9,
    color: 'bg-blue-500',
    nextLesson: 'Les fractions - Partie 3',
  },
  {
    name: 'Français',
    teacher: 'Mme Kouam',
    progress: 68,
    lessons: 15,
    completed: 10,
    color: 'bg-purple-500',
    nextLesson: 'La conjugaison au passé composé',
  },
  {
    name: 'Sciences',
    teacher: 'M. Nkolo',
    progress: 60,
    lessons: 10,
    completed: 6,
    color: 'bg-green-500',
    nextLesson: 'Le système solaire',
  },
  {
    name: 'Histoire-Géographie',
    teacher: 'Mme Fouda',
    progress: 55,
    lessons: 12,
    completed: 7,
    color: 'bg-orange-500',
    nextLesson: 'Les grandes découvertes',
  },
  {
    name: 'Anglais',
    teacher: 'M. Brown',
    progress: 80,
    lessons: 10,
    completed: 8,
    color: 'bg-red-500',
    nextLesson: 'Present Perfect Tense',
  },
]

export function StudentCoursesPage() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mes Cours</h1>
          <p className="mt-1 text-gray-600">5 matières • Année scolaire 2024/2025</p>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all hover:shadow-lg"
          >
            <div className={`${course.color} h-2`} />
            <div className="p-6">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{course.name}</h3>
                  <p className="text-sm text-gray-500">{course.teacher}</p>
                </div>
                <div
                  className={`h-12 w-12 rounded-xl ${course.color}/10 flex items-center justify-center`}
                >
                  <BookOpen className={`h-6 w-6 ${course.color.replace('bg-', 'text-')}`} />
                </div>
              </div>

              <div className="mb-4">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-gray-600">Progression</span>
                  <span className="font-semibold text-gray-900">{course.progress}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className={`h-full ${course.color}`}
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  {course.completed}/{course.lessons} leçons terminées
                </p>
              </div>

              <div className="mb-4 rounded-xl bg-gray-50 p-3">
                <p className="mb-1 text-xs text-gray-500">Prochaine leçon</p>
                <p className="text-sm font-medium text-gray-900">{course.nextLesson}</p>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 gap-2 bg-[#2302B3] hover:bg-[#1a0285]" size="sm">
                  <Play className="h-4 w-4" />
                  Continuer
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
