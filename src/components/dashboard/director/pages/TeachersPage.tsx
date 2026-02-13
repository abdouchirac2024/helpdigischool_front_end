'use client'

import { useState, useEffect } from 'react'
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
import { teacherService } from '@/services/teacher.service'
import type { TeacherDto } from '@/types/teacher'
import { toast } from 'sonner'
import Link from 'next/link'

import { TeacherForm } from '../forms/TeacherForm'

export function DirectorTeachersPage() {
  const [teachers, setTeachers] = useState<TeacherDto[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [subjectFilter, setSubjectFilter] = useState('all')
  const [isFormOpen, setIsFormOpen] = useState(false)

  useEffect(() => {
    loadTeachers()
  }, [])

  const loadTeachers = async () => {
    try {
      setIsLoading(true)
      const data = await teacherService.getAll()
      setTeachers(data)
    } catch (error) {
      console.error('Erreur chargement enseignants:', error)
      toast.error('Impossible de charger la liste des enseignants')
    } finally {
      setIsLoading(false)
    }
  }

  const filteredTeachers = teachers.filter((teacher) => {
    const fullName = `${teacher.nom} ${teacher.prenom}`.toLowerCase()
    const matchesSearch =
      fullName.includes(searchQuery.toLowerCase()) ||
      teacher.specialite.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSubject = subjectFilter === 'all' || teacher.specialite === subjectFilter
    return matchesSearch && matchesSubject
  })

  // Extract unique subjects from actual data
  const subjects = [...new Set(teachers.map((t) => t.specialite))]

  const getStatusBadge = (status?: string) => {
    const s = status || 'active' // default
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
        className={`rounded-full px-2 py-1 text-xs font-semibold ${styles[s as keyof typeof styles] || 'bg-gray-100 text-gray-700'}`}
      >
        {labels[s as keyof typeof labels] || s}
      </span>
    )
  }

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center bg-gray-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#2302B3] border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Corps Enseignant</h1>
          <p className="mt-1 text-gray-600">{filteredTeachers.length} enseignants</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Exporter
          </Button>
          <Button
            className="gap-2 bg-[#2302B3] hover:bg-[#1a0285]"
            onClick={() => setIsFormOpen(true)}
          >
            <Plus className="h-4 w-4" />
            Nouvel enseignant
          </Button>
        </div>
      </div>

      {/* Stats Cards - Mocked aggregates */}
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
              <p className="text-2xl font-bold text-gray-900">-</p>
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
              <p className="text-2xl font-bold text-gray-900">-</p>
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
            {subjects.slice(0, 5).map((subject) => (
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
        {filteredTeachers.length === 0 ? (
          <div className="col-span-full py-10 text-center text-gray-500">
            Aucun enseignant trouvé.
          </div>
        ) : (
          filteredTeachers.map((teacher) => (
            <div
              key={teacher.id}
              className="overflow-hidden rounded-2xl border border-gray-100 bg-white transition-shadow hover:shadow-lg"
            >
              <div className="p-6">
                {/* Header */}
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#2302B3] to-[#4318FF] text-lg font-bold text-white">
                      {teacher.nom.charAt(0)}
                      {teacher.prenom.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">
                        {teacher.nom} {teacher.prenom}
                      </h3>
                      <p className="text-sm font-medium text-[#2302B3]">{teacher.specialite}</p>
                    </div>
                  </div>
                  {getStatusBadge(teacher.status)}
                </div>

                {/* Rating (Placeholder if not available) */}
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${star <= 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    {teacher.rating || '-'}
                  </span>
                  <span className="text-xs text-gray-500">• {teacher.experience || 0} ans</span>
                </div>

                {/* Classes (Placeholder for now) */}
                <div className="mb-4 flex flex-wrap gap-2">
                  {teacher.classes?.map((cls, i) => (
                    <span
                      key={i}
                      className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700"
                    >
                      {cls}
                    </span>
                  )) || <span className="text-xs text-gray-400">Aucune classe assignée</span>}
                </div>

                {/* Stats */}
                <div className="mb-4 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-gray-50 p-3 text-center">
                    <p className="text-lg font-bold text-gray-900">-</p>
                    <p className="text-xs text-gray-500">Élèves</p>
                  </div>
                  <div className="rounded-xl bg-gray-50 p-3 text-center">
                    <p className="text-lg font-bold text-gray-900">?</p>
                    <p className="text-xs text-gray-500">Heures/sem</p>
                  </div>
                </div>

                {/* Contact */}
                <div className="mb-4 space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span>{teacher.telephone}</span>
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
          ))
        )}
      </div>
      <TeacherForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSuccess={() => {
          loadTeachers()
        }}
      />
    </div>
  )
}
