'use client'

import { useState } from 'react'
import { UserPlus, Search, Filter, Download, Eye, Edit, Printer } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const students = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  matricule: `2024-${String(i + 1).padStart(4, '0')}`,
  name: [
    'Amina Talla',
    'Paul Ngo',
    'Marie Kouam',
    'Jean Mbarga',
    'Sophie Kamga',
    'Pierre Fotso',
    'Claire Biya',
    'André Nkolo',
  ][i % 8],
  class: ['CM2-A', 'CM1-B', 'CE2-A', 'CE1-B', 'CP-A', 'SIL-B'][i % 6],
  gender: i % 2 === 0 ? 'F' : 'M',
  birthDate: `${10 + (i % 5)}/0${(i % 9) + 1}/201${3 + (i % 4)}`,
  parent: [
    'M. Talla',
    'Mme Ngo',
    'M. Kouam',
    'Mme Mbarga',
    'M. Kamga',
    'Mme Fotso',
    'M. Biya',
    'Mme Nkolo',
  ][i % 8],
  phone: `6 ${70 + (i % 30)} ${10 + (i % 90)} ${20 + (i % 80)} ${30 + (i % 70)}`,
  paymentStatus: ['paid', 'partial', 'pending'][i % 3],
  enrollmentDate: '15/09/2024',
}))

export function SecretaryStudentsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [classFilter, setClassFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.matricule.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesClass = classFilter === 'all' || student.class === classFilter
    return matchesSearch && matchesClass
  })

  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const getPaymentBadge = (status: string) => {
    const styles = {
      paid: 'bg-green-100 text-green-700',
      partial: 'bg-yellow-100 text-yellow-700',
      pending: 'bg-red-100 text-red-700',
    }
    const labels = { paid: 'Soldé', partial: 'Partiel', pending: 'Impayé' }
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
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Élèves</h1>
          <p className="mt-1 text-gray-600">{filteredStudents.length} élèves inscrits</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Exporter
          </Button>
          <Button className="gap-2 bg-[#2302B3] hover:bg-[#1a0285]">
            <UserPlus className="h-4 w-4" />
            Nouvelle inscription
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-gray-100 bg-white p-4">
          <p className="mb-1 text-sm text-gray-600">Total élèves</p>
          <p className="text-2xl font-bold text-gray-900">342</p>
        </div>
        <div className="rounded-xl border border-gray-100 bg-white p-4">
          <p className="mb-1 text-sm text-gray-600">Garçons</p>
          <p className="text-2xl font-bold text-blue-600">178</p>
        </div>
        <div className="rounded-xl border border-gray-100 bg-white p-4">
          <p className="mb-1 text-sm text-gray-600">Filles</p>
          <p className="text-2xl font-bold text-pink-600">164</p>
        </div>
        <div className="rounded-xl border border-gray-100 bg-white p-4">
          <p className="mb-1 text-sm text-gray-600">Paiements soldés</p>
          <p className="text-2xl font-bold text-green-600">85%</p>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-xl border border-gray-100 bg-white p-4">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Rechercher par nom ou matricule..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={classFilter} onValueChange={setClassFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Classe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les classes</SelectItem>
              <SelectItem value="CM2-A">CM2-A</SelectItem>
              <SelectItem value="CM1-B">CM1-B</SelectItem>
              <SelectItem value="CE2-A">CE2-A</SelectItem>
              <SelectItem value="CE1-B">CE1-B</SelectItem>
              <SelectItem value="CP-A">CP-A</SelectItem>
              <SelectItem value="SIL-B">SIL-B</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Students Table */}
      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">
                  Matricule
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">
                  Élève
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">
                  Classe
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">
                  Date naissance
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">
                  Parent
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">
                  Téléphone
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">
                  Paiement
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <span className="font-mono text-sm text-gray-600">{student.matricule}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold text-white ${
                          student.gender === 'F' ? 'bg-pink-500' : 'bg-blue-500'
                        }`}
                      >
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{student.name}</p>
                        <p className="text-xs text-gray-500">
                          {student.gender === 'F' ? 'Fille' : 'Garçon'}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-700">
                      {student.class}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{student.birthDate}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{student.parent}</td>
                  <td className="px-4 py-3">
                    <a
                      href={`tel:${student.phone}`}
                      className="text-sm text-[#2302B3] hover:underline"
                    >
                      {student.phone}
                    </a>
                  </td>
                  <td className="px-4 py-3">{getPaymentBadge(student.paymentStatus)}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Printer className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3">
          <p className="text-sm text-gray-600">
            Affichage {(currentPage - 1) * itemsPerPage + 1} -{' '}
            {Math.min(currentPage * itemsPerPage, filteredStudents.length)} sur{' '}
            {filteredStudents.length}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              Précédent
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage * itemsPerPage >= filteredStudents.length}
            >
              Suivant
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
