'use client'

import { useState, useEffect } from 'react'
import {
  Users,
  Search,
  Download,
  Phone,
  Eye,
  Edit,
  Award,
  ClipboardList,
  CreditCard,
  User,
  Filter,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { studentService } from '@/services/student.service'
import type { EleveDto } from '@/types/student'
import { toast } from 'sonner'
import Image from 'next/image'
import Link from 'next/link'

const ensureAbsoluteUrl = (url: string | null | undefined): string => {
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  if (url.startsWith('//')) return `https:${url}`
  return `https://${url}`
}

export function DirectorStudentsPage() {
  const [students, setStudents] = useState<EleveDto[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [classFilter, setClassFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    loadStudents()
  }, [])

  const loadStudents = async () => {
    try {
      setIsLoading(true)
      const data = await studentService.getAll()
      setStudents(data)
    } catch (error) {
      console.error('Erreur chargement élèves:', error)
      toast.error('Impossible de charger la liste des élèves')
    } finally {
      setIsLoading(false)
    }
  }

  const filteredStudents = students.filter((student) => {
    const fullName = `${student.nom} ${student.prenom}`.toLowerCase()
    const matchesSearch =
      fullName.includes(searchQuery.toLowerCase()) ||
      student.matricule.toLowerCase().includes(searchQuery.toLowerCase())

    // Filtres temporaires (à adapter selon les données réelles disponibles)
    const matchesClass = classFilter === 'all' || student.classeActuelle === classFilter
    const matchesStatus = statusFilter === 'all' || student.statut === statusFilter

    return matchesSearch && matchesClass && matchesStatus
  })

  // Stats calculées sur les données réelles ou placeholders si non-dispo
  const totalStudents = students.length

  const getStatusBadge = (status: string) => {
    const styles = {
      ACTIF: 'bg-green-100 text-green-700',
      EXCLU: 'bg-red-100 text-red-700',
      ABANDON: 'bg-orange-100 text-orange-700',
      TRANSFERE: 'bg-yellow-100 text-yellow-700',
      DIPLOME: 'bg-blue-100 text-blue-700',
    }
    const labels = {
      ACTIF: 'Actif',
      EXCLU: 'Exclu',
      ABANDON: 'Abandon',
      TRANSFERE: 'Transféré',
      DIPLOME: 'Diplômé',
    }
    return (
      <span
        className={`rounded-full px-2 py-1 text-xs font-semibold ${styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-700'}`}
      >
        {labels[status as keyof typeof labels] || status}
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
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Élèves</h1>
          <p className="mt-1 text-gray-600">{filteredStudents.length} élèves inscrits</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            onClick={() => {
              /* Logic for export if needed */
            }}
          >
            <Download className="mr-2 h-4 w-4" />
            Exporter la liste
          </Button>
        </div>
      </div>

      {/* Stats Cards - Mocked data for now as backend aggregates aren't ready */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{totalStudents}</p>
              <p className="text-sm text-gray-500">Total élèves</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50">
              <Award className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">-</p>
              <p className="text-sm text-gray-500">Moyenne générale</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50">
              <ClipboardList className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">-</p>
              <p className="text-sm text-gray-500">Taux de présence</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50">
              <CreditCard className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">-</p>
              <p className="text-sm text-gray-500">Paiements à jour</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Rechercher par nom, prénom ou matricule..."
              className="h-11 border-gray-200 pl-10 focus-visible:ring-[#2302B3]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Select value={classFilter} onValueChange={setClassFilter}>
              <SelectTrigger className="h-11 w-full border-gray-200 md:w-[180px]">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-400" />
                  <SelectValue placeholder="Classe" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les classes</SelectItem>
                <SelectItem value="6ème A">6ème A</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-11 w-full border-gray-200 md:w-[180px]">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="ACTIF">Actif</SelectItem>
                <SelectItem value="EXCLU">Exclu</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-100 bg-gray-50">
              <tr>
                <th className="p-4 text-center font-semibold text-gray-600">Photo</th>
                <th className="p-4 text-left font-semibold text-gray-600">Élève</th>
                <th className="p-4 text-left font-semibold text-gray-600">Matricule</th>
                <th className="p-4 text-left font-semibold text-gray-600">Date Naissance</th>
                <th className="p-4 text-left font-semibold text-gray-600">Quartier</th>
                <th className="p-4 text-left font-semibold text-gray-600">Statut</th>
                <th className="p-4 text-right font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-500">
                    Aucun élève trouvé.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="border-b border-gray-50 transition-colors hover:bg-gray-50"
                  >
                    <td className="p-4 text-center">
                      {student.photoUrl ? (
                        <div className="relative mx-auto h-10 w-10 overflow-hidden rounded-full">
                          <Image
                            src={ensureAbsoluteUrl(student.photoUrl)}
                            alt={`${student.nom} ${student.prenom}`}
                            fill
                            sizes="40px"
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                      ) : (
                        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#2302B3] to-[#4318FF] font-semibold text-white">
                          {student.nom.charAt(0)}
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      <p className="font-semibold text-gray-900">
                        {student.nom} {student.prenom}
                      </p>
                    </td>
                    <td className="p-4">
                      <code className="rounded bg-gray-100 px-2 py-1 text-sm">
                        {student.matricule}
                      </code>
                    </td>
                    <td className="p-4">
                      <span className="text-gray-900">
                        {new Date(student.dateNaissance).toLocaleDateString('fr-FR')}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-gray-900">{student.quartier?.nom || '-'}</span>
                    </td>
                    <td className="p-4">{getStatusBadge(student.statut)}</td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-1">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4 text-gray-500" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4 text-gray-500" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
