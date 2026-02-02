'use client'

import { useState } from 'react'
import {
  Check,
  X,
  AlertCircle,
  Download,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const students = [
  { id: 1, name: 'Amina Nkolo', status: 'present' },
  { id: 2, name: 'Paul Mbarga', status: 'present' },
  { id: 3, name: 'Sophie Kamga', status: 'present' },
  { id: 4, name: 'Jean Talla', status: 'absent' },
  { id: 5, name: 'Marie Kouam', status: 'present' },
  { id: 6, name: 'David Ngo', status: 'late' },
  { id: 7, name: 'Sarah Biya', status: 'present' },
  { id: 8, name: 'Eric Muna', status: 'present' },
]

export function TeacherAttendancePage() {
  const [attendance, setAttendance] = useState<{ [key: number]: string }>(
    students.reduce((acc, student) => ({ ...acc, [student.id]: student.status }), {})
  )
  const [currentDate, setCurrentDate] = useState(new Date())

  const handleAttendanceChange = (studentId: number, status: string) => {
    setAttendance((prev) => ({ ...prev, [studentId]: status }))
  }

  const presentCount = Object.values(attendance).filter((s) => s === 'present').length
  const absentCount = Object.values(attendance).filter((s) => s === 'absent').length
  const lateCount = Object.values(attendance).filter((s) => s === 'late').length
  const attendanceRate = Math.round((presentCount / students.length) * 100)

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const changeDate = (days: number) => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() + days)
    setCurrentDate(newDate)
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Feuille de Présence</h1>
          <p className="mt-1 text-gray-600">Classe CM2-A</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Exporter
        </Button>
      </div>

      {/* Date Selector */}
      <div className="rounded-xl border border-gray-100 bg-white p-4">
        <div className="flex items-center justify-between">
          <Button variant="outline" size="sm" onClick={() => changeDate(-1)}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="text-center">
            <p className="text-lg font-semibold capitalize text-gray-900">
              {formatDate(currentDate)}
            </p>
            <p className="text-sm text-gray-500">
              {currentDate.toDateString() === new Date().toDateString() ? "Aujourd'hui" : ''}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => changeDate(1)}
            disabled={currentDate >= new Date()}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-gray-100 bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Présents</p>
              <p className="text-2xl font-bold text-green-600">{presentCount}</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-50">
              <Check className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-100 bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Absents</p>
              <p className="text-2xl font-bold text-red-600">{absentCount}</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-50">
              <X className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-100 bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Retards</p>
              <p className="text-2xl font-bold text-orange-600">{lateCount}</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-50">
              <AlertCircle className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-100 bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Taux de présence</p>
              <p className="text-2xl font-bold text-blue-600">{attendanceRate}%</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
              <ClipboardList className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Attendance List */}
      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white">
        <div className="border-b border-gray-200 bg-gray-50 p-4">
          <h3 className="font-semibold text-gray-900">Liste des élèves</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {students.map((student, index) => (
            <div key={student.id} className="p-4 transition-colors hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="w-8 text-sm font-medium text-gray-500">{index + 1}</span>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#2302B3] to-[#4318FF] font-semibold text-white">
                      {student.name.charAt(0)}
                    </div>
                    <span className="font-medium text-gray-900">{student.name}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={attendance[student.id] === 'present' ? 'default' : 'outline'}
                    className={
                      attendance[student.id] === 'present' ? 'bg-green-600 hover:bg-green-700' : ''
                    }
                    onClick={() => handleAttendanceChange(student.id, 'present')}
                  >
                    <Check className="mr-1 h-4 w-4" />
                    Présent
                  </Button>
                  <Button
                    size="sm"
                    variant={attendance[student.id] === 'absent' ? 'default' : 'outline'}
                    className={
                      attendance[student.id] === 'absent' ? 'bg-red-600 hover:bg-red-700' : ''
                    }
                    onClick={() => handleAttendanceChange(student.id, 'absent')}
                  >
                    <X className="mr-1 h-4 w-4" />
                    Absent
                  </Button>
                  <Button
                    size="sm"
                    variant={attendance[student.id] === 'late' ? 'default' : 'outline'}
                    className={
                      attendance[student.id] === 'late' ? 'bg-orange-600 hover:bg-orange-700' : ''
                    }
                    onClick={() => handleAttendanceChange(student.id, 'late')}
                  >
                    <AlertCircle className="mr-1 h-4 w-4" />
                    Retard
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="gap-2 bg-[#2302B3] hover:bg-[#1a0285]" size="lg">
          <Check className="h-5 w-5" />
          Enregistrer la présence
        </Button>
      </div>
    </div>
  )
}
