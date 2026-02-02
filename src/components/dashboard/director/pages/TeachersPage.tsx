'use client'

import { useState } from 'react'
import {
  GraduationCap,
  Search,
  Plus,
  Eye,
  Phone,
  Mail,
  BookOpen,
  Clock,
  Calendar,
  Star,
  Download,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const teachers = [
  {
    id: 1,
    name: 'Mme Ngo Marie',
    subject: 'Mathématiques',
    classes: ['6ème A', '5ème B'],
    students: 62,
    hours: 18,
    phone: '6 77 88 99 00',
    email: 'ngo.marie@school.cm',
    rating: 4.8,
    status: 'active',
    experience: '12 ans',
  },
  {
    id: 2,
    name: 'M. Kamga Paul',
    subject: 'Français',
    classes: ['6ème B', '4ème A'],
    students: 57,
    hours: 20,
    phone: '6 55 66 77 88',
    email: 'kamga.paul@school.cm',
    rating: 4.6,
    status: 'active',
    experience: '8 ans',
  },
  {
    id: 3,
    name: 'Mme Talla Sophie',
    subject: 'Anglais',
    classes: ['5ème A', '3ème B'],
    students: 58,
    hours: 16,
    phone: '6 99 00 11 22',
    email: 'talla.sophie@school.cm',
    rating: 4.9,
    status: 'active',
    experience: '15 ans',
  },
  {
    id: 4,
    name: 'M. Mbarga Jean',
    subject: 'Sciences Physiques',
    classes: ['5ème B', '4ème B'],
    students: 58,
    hours: 18,
    phone: '6 88 77 66 55',
    email: 'mbarga.jean@school.cm',
    rating: 4.5,
    status: 'active',
    experience: '6 ans',
  },
  {
    id: 5,
    name: 'Mme Kouam Alice',
    subject: 'SVT',
    classes: ['4ème A', '3ème A'],
    students: 59,
    hours: 16,
    phone: '6 44 55 66 77',
    email: 'kouam.alice@school.cm',
    rating: 4.7,
    status: 'active',
    experience: '10 ans',
  },
  {
    id: 6,
    name: 'M. Fouda Eric',
    subject: 'Histoire-Géo',
    classes: ['4ème B', '2nde A'],
    students: 62,
    hours: 20,
    phone: '6 33 44 55 66',
    email: 'fouda.eric@school.cm',
    rating: 4.4,
    status: 'leave',
    experience: '5 ans',
  },
  {
    id: 7,
    name: 'Mme Biya Hélène',
    subject: 'Philosophie',
    classes: ['3ème A', 'Tle A'],
    students: 58,
    hours: 14,
    phone: '6 22 33 44 55',
    email: 'biya.helene@school.cm',
    rating: 4.8,
    status: 'active',
    experience: '18 ans',
  },
  {
    id: 8,
    name: 'M. Essomba Robert',
    subject: 'Informatique',
    classes: ['3ème B', '2nde B'],
    students: 61,
    hours: 12,
    phone: '6 11 22 33 44',
    email: 'essomba.robert@school.cm',
    rating: 4.6,
    status: 'active',
    experience: '4 ans',
  },
]

export function DirectorTeachersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [subjectFilter, setSubjectFilter] = useState('all')

  const filteredTeachers = teachers.filter((teacher) => {
    const matchesSearch =
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSubject = subjectFilter === 'all' || teacher.subject === subjectFilter
    return matchesSearch && matchesSubject
  })

  const subjects = [...new Set(teachers.map((t) => t.subject))]

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-100 text-green-700',
      leave: 'bg-orange-100 text-orange-700',
      inactive: 'bg-gray-100 text-gray-700',
    }
    const labels = {
      active: 'Actif',
      leave: 'En congé',
      inactive: 'Inactif',
    }
    return (
      <span
        className={`rounded-full px-2 py-1 text-xs font-semibold ${styles[status as keyof typeof styles]}`}
      >
        {labels[status as keyof typeof labels]}
      </span>
    )
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Corps Enseignant</h1>
          <p className="mt-1 text-gray-600">{teachers.length} enseignants</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Exporter
          </Button>
          <Button className="gap-2 bg-[#2302B3] hover:bg-[#1a0285]">
            <Plus className="h-4 w-4" />
            Nouvel enseignant
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
              <GraduationCap className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{teachers.length}</p>
              <p className="text-sm text-gray-500">Enseignants</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50">
              <BookOpen className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{subjects.length}</p>
              <p className="text-sm text-gray-500">Matières</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">134h</p>
              <p className="text-sm text-gray-500">Heures/semaine</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50">
              <Star className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">4.7</p>
              <p className="text-sm text-gray-500">Note moyenne</p>
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
              placeholder="Rechercher un enseignant..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={subjectFilter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSubjectFilter('all')}
              className={subjectFilter === 'all' ? 'bg-[#2302B3] hover:bg-[#1a0285]' : ''}
            >
              Tous
            </Button>
            {subjects.slice(0, 4).map((subject) => (
              <Button
                key={subject}
                variant={subjectFilter === subject ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSubjectFilter(subject)}
                className={subjectFilter === subject ? 'bg-[#2302B3] hover:bg-[#1a0285]' : ''}
              >
                {subject}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Teachers Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTeachers.map((teacher) => (
          <div
            key={teacher.id}
            className="overflow-hidden rounded-2xl border border-gray-100 bg-white transition-shadow hover:shadow-lg"
          >
            <div className="p-6">
              {/* Header */}
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#2302B3] to-[#4318FF] text-lg font-bold text-white">
                    {teacher.name.split(' ')[1]?.charAt(0) || teacher.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{teacher.name}</h3>
                    <p className="text-sm font-medium text-[#2302B3]">{teacher.subject}</p>
                  </div>
                </div>
                {getStatusBadge(teacher.status)}
              </div>

              {/* Rating */}
              <div className="mb-4 flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${star <= Math.floor(teacher.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-900">{teacher.rating}</span>
                <span className="text-xs text-gray-500">• {teacher.experience}</span>
              </div>

              {/* Classes */}
              <div className="mb-4 flex flex-wrap gap-2">
                {teacher.classes.map((cls, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700"
                  >
                    {cls}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="mb-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-gray-50 p-3 text-center">
                  <p className="text-lg font-bold text-gray-900">{teacher.students}</p>
                  <p className="text-xs text-gray-500">Élèves</p>
                </div>
                <div className="rounded-xl bg-gray-50 p-3 text-center">
                  <p className="text-lg font-bold text-gray-900">{teacher.hours}h</p>
                  <p className="text-xs text-gray-500">Heures/sem</p>
                </div>
              </div>

              {/* Contact */}
              <div className="mb-4 space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span>{teacher.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="truncate">{teacher.email}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 border-t border-gray-100 pt-4">
                <Button variant="outline" size="sm" className="flex-1 gap-1">
                  <Eye className="h-4 w-4" />
                  Profil
                </Button>
                <Button variant="outline" size="sm" className="flex-1 gap-1">
                  <Calendar className="h-4 w-4" />
                  Emploi du temps
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
