'use client'

import { useState } from 'react'
import {
  Users,
  School,
  Search,
  Plus,
  Eye,
  Edit,
  UserPlus,
  Clock,
  TrendingUp,
  Award,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const classes = [
  {
    id: 1,
    name: '6ème A',
    level: '6ème',
    students: 32,
    teacher: 'Mme Ngo Marie',
    average: 14.8,
    room: 'Salle A1',
    schedule: '8h-15h',
    color: 'bg-blue-500',
  },
  {
    id: 2,
    name: '6ème B',
    level: '6ème',
    students: 30,
    teacher: 'M. Kamga Paul',
    average: 15.2,
    room: 'Salle A2',
    schedule: '8h-15h',
    color: 'bg-blue-500',
  },
  {
    id: 3,
    name: '5ème A',
    level: '5ème',
    students: 28,
    teacher: 'Mme Talla Sophie',
    average: 13.9,
    room: 'Salle B1',
    schedule: '8h-15h',
    color: 'bg-green-500',
  },
  {
    id: 4,
    name: '5ème B',
    level: '5ème',
    students: 31,
    teacher: 'M. Mbarga Jean',
    average: 14.5,
    room: 'Salle B2',
    schedule: '8h-15h',
    color: 'bg-green-500',
  },
  {
    id: 5,
    name: '4ème A',
    level: '4ème',
    students: 29,
    teacher: 'Mme Kouam Alice',
    average: 13.2,
    room: 'Salle C1',
    schedule: '8h-16h',
    color: 'bg-purple-500',
  },
  {
    id: 6,
    name: '4ème B',
    level: '4ème',
    students: 27,
    teacher: 'M. Fouda Eric',
    average: 14.1,
    room: 'Salle C2',
    schedule: '8h-16h',
    color: 'bg-purple-500',
  },
  {
    id: 7,
    name: '3ème A',
    level: '3ème',
    students: 30,
    teacher: 'Mme Biya Hélène',
    average: 15.5,
    room: 'Salle D1',
    schedule: '8h-16h',
    color: 'bg-orange-500',
  },
  {
    id: 8,
    name: '3ème B',
    level: '3ème',
    students: 28,
    teacher: 'M. Essomba Robert',
    average: 14.8,
    room: 'Salle D2',
    schedule: '8h-16h',
    color: 'bg-orange-500',
  },
  {
    id: 9,
    name: '2nde A',
    level: '2nde',
    students: 35,
    teacher: 'M. Nkolo Pierre',
    average: 13.6,
    room: 'Salle E1',
    schedule: '7h30-17h',
    color: 'bg-red-500',
  },
  {
    id: 10,
    name: '2nde B',
    level: '2nde',
    students: 33,
    teacher: 'Mme Diallo Fatima',
    average: 14.2,
    room: 'Salle E2',
    schedule: '7h30-17h',
    color: 'bg-red-500',
  },
  {
    id: 11,
    name: '1ère A',
    level: '1ère',
    students: 31,
    teacher: 'M. Sow Ibrahim',
    average: 14.9,
    room: 'Salle F1',
    schedule: '7h30-17h',
    color: 'bg-indigo-500',
  },
  {
    id: 12,
    name: 'Tle A',
    level: 'Terminale',
    students: 28,
    teacher: 'Mme Muna Christine',
    average: 15.1,
    room: 'Salle G1',
    schedule: '7h30-17h',
    color: 'bg-pink-500',
  },
]

export function DirectorClassesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [levelFilter, setLevelFilter] = useState('all')

  const filteredClasses = classes.filter((cls) => {
    const matchesSearch =
      cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.teacher.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLevel = levelFilter === 'all' || cls.level === levelFilter
    return matchesSearch && matchesLevel
  })

  const totalStudents = classes.reduce((acc, cls) => acc + cls.students, 0)
  const averageStudents = Math.round(totalStudents / classes.length)
  const overallAverage = (
    classes.reduce((acc, cls) => acc + cls.average, 0) / classes.length
  ).toFixed(1)

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Classes</h1>
          <p className="mt-1 text-gray-600">
            {classes.length} classes • {totalStudents} élèves
          </p>
        </div>
        <Button className="gap-2 bg-[#2302B3] hover:bg-[#1a0285]">
          <Plus className="h-4 w-4" />
          Nouvelle classe
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
              <School className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{classes.length}</p>
              <p className="text-sm text-gray-500">Total classes</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{totalStudents}</p>
              <p className="text-sm text-gray-500">Total élèves</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{averageStudents}</p>
              <p className="text-sm text-gray-500">Élèves/classe</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50">
              <Award className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{overallAverage}</p>
              <p className="text-sm text-gray-500">Moyenne générale</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-gray-100 bg-white p-4">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Rechercher une classe ou un enseignant..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {['all', '6ème', '5ème', '4ème', '3ème', '2nde', '1ère', 'Terminale'].map((level) => (
              <Button
                key={level}
                variant={levelFilter === level ? 'default' : 'outline'}
                size="sm"
                onClick={() => setLevelFilter(level)}
                className={levelFilter === level ? 'bg-[#2302B3] hover:bg-[#1a0285]' : ''}
              >
                {level === 'all' ? 'Tous' : level}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredClasses.map((cls) => (
          <div
            key={cls.id}
            className="overflow-hidden rounded-2xl border border-gray-100 bg-white transition-shadow hover:shadow-lg"
          >
            <div className={`${cls.color} p-4`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white">{cls.name}</h3>
                  <p className="text-sm text-white/80">{cls.level}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
                  <School className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
            <div className="space-y-4 p-4">
              {/* Teacher */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#2302B3] to-[#4318FF] text-sm font-semibold text-white">
                  {cls.teacher.split(' ')[1]?.charAt(0) || cls.teacher.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{cls.teacher}</p>
                  <p className="text-xs text-gray-500">Professeur principal</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-lg bg-gray-50 p-2 text-center">
                  <p className="text-lg font-bold text-gray-900">{cls.students}</p>
                  <p className="text-xs text-gray-500">Élèves</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-2 text-center">
                  <p className="text-lg font-bold text-gray-900">{cls.average}</p>
                  <p className="text-xs text-gray-500">Moyenne</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-2 text-center">
                  <p className="text-lg font-bold text-gray-900">{cls.room}</p>
                  <p className="text-xs text-gray-500">Salle</p>
                </div>
              </div>

              {/* Schedule */}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>Horaires: {cls.schedule}</span>
              </div>

              {/* Actions */}
              <div className="flex gap-2 border-t border-gray-100 pt-2">
                <Button variant="outline" size="sm" className="flex-1 gap-1">
                  <Eye className="h-4 w-4" />
                  Voir
                </Button>
                <Button variant="outline" size="sm" className="flex-1 gap-1">
                  <Edit className="h-4 w-4" />
                  Modifier
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <UserPlus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
