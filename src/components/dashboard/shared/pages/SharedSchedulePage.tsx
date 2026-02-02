'use client'

import { useState } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Printer,
  Download,
  Clock,
  BookOpen,
  Calendar,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface SharedSchedulePageProps {
  role: 'director' | 'teacher' | 'student' | 'parent'
  editable?: boolean
}

interface CourseSlot {
  id: string
  subject: string
  teacher: string
  room: string
  color: string
  startTime: string
  endTime: string
  day: number // 0=Lun .. 5=Sam
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const BRAND = '#2302B3'

const DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
const DAYS_SHORT = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']

const TIME_SLOTS = [
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
]

const SUBJECT_COLORS: Record<string, string> = {
  Mathematiques: '#2302B3',
  Francais: '#0891B2',
  'Hist-Geo': '#D97706',
  Anglais: '#DC2626',
  Physique: '#059669',
  SVT: '#7C3AED',
  EPS: '#EA580C',
  Musique: '#DB2777',
  Informatique: '#4F46E5',
  Philosophie: '#65A30D',
}

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const MOCK_COURSES: CourseSlot[] = [
  {
    id: '1',
    subject: 'Mathematiques',
    teacher: 'M. Dupont',
    room: 'A101',
    color: SUBJECT_COLORS.Mathematiques,
    startTime: '08:00',
    endTime: '09:00',
    day: 0,
  },
  {
    id: '2',
    subject: 'Francais',
    teacher: 'Mme. Martin',
    room: 'B204',
    color: SUBJECT_COLORS.Francais,
    startTime: '09:00',
    endTime: '10:00',
    day: 0,
  },
  {
    id: '3',
    subject: 'Hist-Geo',
    teacher: 'M. Bernard',
    room: 'C102',
    color: SUBJECT_COLORS['Hist-Geo'],
    startTime: '10:00',
    endTime: '11:00',
    day: 0,
  },
  {
    id: '4',
    subject: 'Anglais',
    teacher: 'Mme. Davis',
    room: 'B105',
    color: SUBJECT_COLORS.Anglais,
    startTime: '14:00',
    endTime: '15:00',
    day: 0,
  },
  {
    id: '5',
    subject: 'Physique',
    teacher: 'M. Leroy',
    room: 'Lab1',
    color: SUBJECT_COLORS.Physique,
    startTime: '08:00',
    endTime: '09:00',
    day: 1,
  },
  {
    id: '6',
    subject: 'Mathematiques',
    teacher: 'M. Dupont',
    room: 'A101',
    color: SUBJECT_COLORS.Mathematiques,
    startTime: '10:00',
    endTime: '11:00',
    day: 1,
  },
  {
    id: '7',
    subject: 'SVT',
    teacher: 'Mme. Petit',
    room: 'Lab2',
    color: SUBJECT_COLORS.SVT,
    startTime: '14:00',
    endTime: '15:00',
    day: 1,
  },
  {
    id: '8',
    subject: 'EPS',
    teacher: 'M. Moreau',
    room: 'Gymnase',
    color: SUBJECT_COLORS.EPS,
    startTime: '08:00',
    endTime: '10:00',
    day: 2,
  },
  {
    id: '9',
    subject: 'Musique',
    teacher: 'Mme. Roux',
    room: 'Salle M',
    color: SUBJECT_COLORS.Musique,
    startTime: '10:00',
    endTime: '11:00',
    day: 2,
  },
  {
    id: '10',
    subject: 'Francais',
    teacher: 'Mme. Martin',
    room: 'B204',
    color: SUBJECT_COLORS.Francais,
    startTime: '14:00',
    endTime: '15:00',
    day: 2,
  },
  {
    id: '11',
    subject: 'Informatique',
    teacher: 'M. Garcia',
    room: 'Info1',
    color: SUBJECT_COLORS.Informatique,
    startTime: '08:00',
    endTime: '09:00',
    day: 3,
  },
  {
    id: '12',
    subject: 'Physique',
    teacher: 'M. Leroy',
    room: 'Lab1',
    color: SUBJECT_COLORS.Physique,
    startTime: '09:00',
    endTime: '10:00',
    day: 3,
  },
  {
    id: '13',
    subject: 'Philosophie',
    teacher: 'Mme. Lambert',
    room: 'C301',
    color: SUBJECT_COLORS.Philosophie,
    startTime: '10:00',
    endTime: '11:00',
    day: 3,
  },
  {
    id: '14',
    subject: 'Anglais',
    teacher: 'Mme. Davis',
    room: 'B105',
    color: SUBJECT_COLORS.Anglais,
    startTime: '08:00',
    endTime: '09:00',
    day: 4,
  },
  {
    id: '15',
    subject: 'Mathematiques',
    teacher: 'M. Dupont',
    room: 'A101',
    color: SUBJECT_COLORS.Mathematiques,
    startTime: '09:00',
    endTime: '10:00',
    day: 4,
  },
  {
    id: '16',
    subject: 'Hist-Geo',
    teacher: 'M. Bernard',
    room: 'C102',
    color: SUBJECT_COLORS['Hist-Geo'],
    startTime: '14:00',
    endTime: '15:00',
    day: 4,
  },
  {
    id: '17',
    subject: 'SVT',
    teacher: 'Mme. Petit',
    room: 'Lab2',
    color: SUBJECT_COLORS.SVT,
    startTime: '08:00',
    endTime: '09:00',
    day: 5,
  },
  {
    id: '18',
    subject: 'EPS',
    teacher: 'M. Moreau',
    room: 'Gymnase',
    color: SUBJECT_COLORS.EPS,
    startTime: '10:00',
    endTime: '11:00',
    day: 5,
  },
]

const CLASSES = ['6eme A', '6eme B', '5eme A', '5eme B', '4eme A', '3eme A']
const CHILDREN = ['Lucas Durand', 'Emma Durand']

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getWeekLabel(offset: number): string {
  const now = new Date()
  const monday = new Date(now)
  monday.setDate(now.getDate() - now.getDay() + 1 + offset * 7)
  const sunday = new Date(monday)
  sunday.setDate(monday.getDate() + 5)
  const fmt = (d: Date) => d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
  return `${fmt(monday)} - ${fmt(sunday)}`
}

function slotRow(time: string): number {
  return TIME_SLOTS.indexOf(time)
}

function slotSpan(start: string, end: string): number {
  return Math.max(1, slotRow(end) - slotRow(start))
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function WeekNav({
  weekOffset,
  onPrev,
  onNext,
}: {
  weekOffset: number
  onPrev: () => void
  onNext: () => void
}) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={onPrev}
        className="rounded-lg border border-gray-300 p-2 transition-colors hover:bg-gray-100"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <span className="min-w-[180px] text-center text-sm font-medium text-gray-700">
        {getWeekLabel(weekOffset)}
      </span>
      <button
        type="button"
        onClick={onNext}
        className="rounded-lg border border-gray-300 p-2 transition-colors hover:bg-gray-100"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  )
}

function Legend() {
  return (
    <div className="mt-4 flex flex-wrap gap-3">
      {Object.entries(SUBJECT_COLORS).map(([subject, color]) => (
        <div key={subject} className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-sm" style={{ backgroundColor: color }} />
          <span className="text-xs text-gray-600">{subject}</span>
        </div>
      ))}
    </div>
  )
}

function CourseCell({ course }: { course: CourseSlot }) {
  return (
    <div
      className="flex h-full flex-col justify-center rounded-lg p-2 text-xs leading-tight text-white"
      style={{ backgroundColor: course.color }}
    >
      <span className="font-semibold">{course.subject}</span>
      <span className="opacity-90">{course.teacher}</span>
      <span className="opacity-75">{course.room}</span>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Schedule grids per role
// ---------------------------------------------------------------------------

function FullGrid({ courses }: { courses: CourseSlot[] }) {
  // Build a lookup: placed[day-time] = course
  const placed = new Map<string, CourseSlot>()
  const spanned = new Set<string>()
  courses.forEach((c) => {
    const row = slotRow(c.startTime)
    if (row < 0) return
    placed.set(`${c.day}-${row}`, c)
    const span = slotSpan(c.startTime, c.endTime)
    for (let i = 1; i < span; i++) spanned.add(`${c.day}-${row + i}`)
  })

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            <th className="w-20 border border-gray-200 bg-gray-50 px-3 py-2 text-left font-medium text-gray-500">
              Heure
            </th>
            {DAYS.map((d) => (
              <th
                key={d}
                className="border border-gray-200 px-3 py-2 text-center font-medium text-white"
                style={{ backgroundColor: BRAND }}
              >
                {d}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TIME_SLOTS.map((time, rowIdx) => (
            <tr key={time}>
              <td className="whitespace-nowrap border border-gray-200 bg-gray-50 px-3 py-2 text-center font-medium text-gray-500">
                {time}
              </td>
              {DAYS.map((_, dayIdx) => {
                const key = `${dayIdx}-${rowIdx}`
                if (spanned.has(key)) return null
                const course = placed.get(key)
                if (course) {
                  const span = slotSpan(course.startTime, course.endTime)
                  return (
                    <td key={key} className="border border-gray-200 p-1" rowSpan={span}>
                      <CourseCell course={course} />
                    </td>
                  )
                }
                return <td key={key} className="h-14 border border-gray-200 p-1" />
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function TeacherStats() {
  return (
    <div className="mb-6 grid grid-cols-3 gap-4">
      {[
        { icon: Clock, label: 'Heures / semaine', value: '18h' },
        { icon: BookOpen, label: "Cours aujourd'hui", value: '4' },
        { icon: Calendar, label: 'Classes', value: '6' },
      ].map((s) => (
        <div
          key={s.label}
          className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4"
        >
          <div
            className="flex h-10 w-10 items-center justify-center rounded-lg text-white"
            style={{ backgroundColor: BRAND }}
          >
            <s.icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
            <p className="text-xs text-gray-500">{s.label}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function StudentDayView({ courses }: { courses: CourseSlot[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
      {DAYS.map((day, dayIdx) => {
        const dayCourses = courses
          .filter((c) => c.day === dayIdx)
          .sort((a, b) => a.startTime.localeCompare(b.startTime))
        return (
          <div key={day} className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <div
              className="px-3 py-2 text-center text-sm font-semibold text-white"
              style={{ backgroundColor: BRAND }}
            >
              {day}
            </div>
            <div className="flex flex-col gap-2 p-2">
              {dayCourses.length === 0 && (
                <p className="py-4 text-center text-xs text-gray-400">Aucun cours</p>
              )}
              {dayCourses.map((c) => (
                <div
                  key={c.id}
                  className="rounded-lg p-2 text-xs leading-tight text-white"
                  style={{ backgroundColor: c.color }}
                >
                  <p className="font-semibold">
                    {c.startTime} - {c.endTime}
                  </p>
                  <p>{c.subject}</p>
                  <p className="opacity-75">{c.room}</p>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function SharedSchedulePage({ role, editable = false }: SharedSchedulePageProps) {
  const [weekOffset, setWeekOffset] = useState(0)
  const [selectedClass, setSelectedClass] = useState(CLASSES[0])
  const [selectedChild, setSelectedChild] = useState(CHILDREN[0])

  const courses = MOCK_COURSES // In production, filter by role / class / child

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Emploi du temps</h1>

          {/* Director: class selector */}
          {role === 'director' && (
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-2"
              style={{ focusRingColor: BRAND } as React.CSSProperties}
            >
              {CLASSES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          )}

          {/* Parent: child selector */}
          {role === 'parent' && (
            <select
              value={selectedChild}
              onChange={(e) => setSelectedChild(e.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-2"
            >
              {CHILDREN.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="flex items-center gap-3">
          <WeekNav
            weekOffset={weekOffset}
            onPrev={() => setWeekOffset((w) => w - 1)}
            onNext={() => setWeekOffset((w) => w + 1)}
          />

          {/* Director action buttons */}
          {role === 'director' && editable && (
            <>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90"
                style={{ backgroundColor: BRAND }}
              >
                <Plus className="h-4 w-4" />
                Ajouter cours
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
              >
                <Printer className="h-4 w-4" />
                Imprimer
              </button>
            </>
          )}

          {/* Parent export button */}
          {role === 'parent' && (
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90"
              style={{ backgroundColor: BRAND }}
            >
              <Download className="h-4 w-4" />
              Exporter
            </button>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-auto p-6">
        {/* Teacher stats */}
        {role === 'teacher' && <TeacherStats />}

        {/* Schedule grid */}
        {role === 'student' ? <StudentDayView courses={courses} /> : <FullGrid courses={courses} />}

        {/* Legend */}
        <Legend />
      </div>
    </div>
  )
}
