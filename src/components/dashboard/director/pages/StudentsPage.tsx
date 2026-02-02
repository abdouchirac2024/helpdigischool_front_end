'use client'

import { useState } from 'react'
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
  UserPlus,
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

const students = [
  {
    id: 1,
    name: 'Amina Nkolo',
    matricule: 'ELV-2024-001',
    gender: 'F',
    birthDate: '12/03/2012',
    class: '6ème A',
    average: 16.5,
    attendance: 98,
    status: 'excellent',
    parent: 'M. Nkolo Jean',
    phone: '6 77 88 99 00',
    email: 'nkolo@email.cm',
    paymentStatus: 'paid',
  },
  {
    id: 2,
    name: 'Paul Mbarga',
    matricule: 'ELV-2024-002',
    gender: 'M',
    birthDate: '25/07/2011',
    class: '5ème B',
    average: 14.8,
    attendance: 96,
    status: 'good',
    parent: 'Mme Mbarga Sophie',
    phone: '6 55 66 77 88',
    email: 'mbarga@email.cm',
    paymentStatus: 'paid',
  },
  {
    id: 3,
    name: 'Sophie Kamga',
    matricule: 'ELV-2024-003',
    gender: 'F',
    birthDate: '08/11/2012',
    class: '6ème A',
    average: 17.2,
    attendance: 94,
    status: 'excellent',
    parent: 'M. Kamga Pierre',
    phone: '6 99 00 11 22',
    email: 'kamga@email.cm',
    paymentStatus: 'partial',
  },
  {
    id: 4,
    name: 'Jean Talla',
    matricule: 'ELV-2024-004',
    gender: 'M',
    birthDate: '15/01/2011',
    class: '5ème A',
    average: 12.8,
    attendance: 92,
    status: 'average',
    parent: 'M. Talla Robert',
    phone: '6 88 77 66 55',
    email: 'talla@email.cm',
    paymentStatus: 'paid',
  },
  {
    id: 5,
    name: 'Marie Kouam',
    matricule: 'ELV-2024-005',
    gender: 'F',
    birthDate: '22/05/2012',
    class: '6ème B',
    average: 15.5,
    attendance: 90,
    status: 'good',
    parent: 'Mme Kouam Alice',
    phone: '6 44 55 66 77',
    email: 'kouam@email.cm',
    paymentStatus: 'unpaid',
  },
  {
    id: 6,
    name: 'David Ngo',
    matricule: 'ELV-2024-006',
    gender: 'M',
    birthDate: '30/09/2011',
    class: '5ème B',
    average: 11.2,
    attendance: 88,
    status: 'needs-attention',
    parent: 'M. Ngo Fabrice',
    phone: '6 33 44 55 66',
    email: 'ngo@email.cm',
    paymentStatus: 'paid',
  },
  {
    id: 7,
    name: 'Sarah Biya',
    matricule: 'ELV-2024-007',
    gender: 'F',
    birthDate: '18/04/2012',
    class: '6ème A',
    average: 18.2,
    attendance: 99,
    status: 'excellent',
    parent: 'Mme Biya Marie',
    phone: '6 22 33 44 55',
    email: 'biya@email.cm',
    paymentStatus: 'paid',
  },
  {
    id: 8,
    name: 'Eric Muna',
    matricule: 'ELV-2024-008',
    gender: 'M',
    birthDate: '05/12/2011',
    class: '5ème A',
    average: 13.5,
    attendance: 82,
    status: 'average',
    parent: 'M. Muna Paul',
    phone: '6 11 22 33 44',
    email: 'muna@email.cm',
    paymentStatus: 'partial',
  },
]

export function DirectorStudentsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [classFilter, setClassFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.matricule.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesClass = classFilter === 'all' || student.class === classFilter
    const matchesStatus = statusFilter === 'all' || student.status === statusFilter
    return matchesSearch && matchesClass && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    const styles = {
      excellent: 'bg-green-100 text-green-700',
      good: 'bg-blue-100 text-blue-700',
      average: 'bg-yellow-100 text-yellow-700',
      'needs-attention': 'bg-red-100 text-red-700',
    }
    const labels = {
      excellent: 'Excellent',
      good: 'Bien',
      average: 'Moyen',
      'needs-attention': 'À suivre',
    }
    return (
      <span
        className={`rounded-full px-2 py-1 text-xs font-semibold ${styles[status as keyof typeof styles]}`}
      >
        {labels[status as keyof typeof labels]}
      </span>
    )
  }

  const getPaymentBadge = (status: string) => {
    const styles = {
      paid: 'bg-green-100 text-green-700',
      partial: 'bg-orange-100 text-orange-700',
      unpaid: 'bg-red-100 text-red-700',
    }
    const labels = {
      paid: 'Soldé',
      partial: 'Partiel',
      unpaid: 'Impayé',
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
            Nouvel élève
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">342</p>
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
              <p className="text-2xl font-bold text-gray-900">14.8</p>
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
              <p className="text-2xl font-bold text-gray-900">94%</p>
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
              <p className="text-2xl font-bold text-gray-900">89%</p>
              <p className="text-sm text-gray-500">Paiements à jour</p>
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
              placeholder="Rechercher par nom ou matricule..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={classFilter} onValueChange={setClassFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Classe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les classes</SelectItem>
              <SelectItem value="6ème A">6ème A</SelectItem>
              <SelectItem value="6ème B">6ème B</SelectItem>
              <SelectItem value="5ème A">5ème A</SelectItem>
              <SelectItem value="5ème B">5ème B</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="excellent">Excellent</SelectItem>
              <SelectItem value="good">Bien</SelectItem>
              <SelectItem value="average">Moyen</SelectItem>
              <SelectItem value="needs-attention">À suivre</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Students Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-100 bg-gray-50">
              <tr>
                <th className="p-4 text-left font-semibold text-gray-600">Élève</th>
                <th className="p-4 text-left font-semibold text-gray-600">Matricule</th>
                <th className="p-4 text-left font-semibold text-gray-600">Classe</th>
                <th className="p-4 text-left font-semibold text-gray-600">Moyenne</th>
                <th className="p-4 text-left font-semibold text-gray-600">Présence</th>
                <th className="p-4 text-left font-semibold text-gray-600">Statut</th>
                <th className="p-4 text-left font-semibold text-gray-600">Paiement</th>
                <th className="p-4 text-right font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  className="border-b border-gray-50 transition-colors hover:bg-gray-50"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#2302B3] to-[#4318FF] font-semibold text-white">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{student.name}</p>
                        <p className="text-sm text-gray-500">{student.parent}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <code className="rounded bg-gray-100 px-2 py-1 text-sm">
                      {student.matricule}
                    </code>
                  </td>
                  <td className="p-4">
                    <span className="font-medium text-gray-900">{student.class}</span>
                  </td>
                  <td className="p-4">
                    <span className="font-bold text-gray-900">{student.average}/20</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-16 overflow-hidden rounded-full bg-gray-100">
                        <div
                          className={`h-full ${student.attendance >= 95 ? 'bg-green-500' : student.attendance >= 85 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${student.attendance}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600">{student.attendance}%</span>
                    </div>
                  </td>
                  <td className="p-4">{getStatusBadge(student.status)}</td>
                  <td className="p-4">{getPaymentBadge(student.paymentStatus)}</td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-1">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Eye className="h-4 w-4 text-gray-500" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Edit className="h-4 w-4 text-gray-500" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Phone className="h-4 w-4 text-gray-500" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-gray-100 p-4">
          <p className="text-sm text-gray-500">Affichage 1-8 sur 342 élèves</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Précédent
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-[#2302B3] text-white hover:bg-[#1a0285]"
            >
              1
            </Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              3
            </Button>
            <Button variant="outline" size="sm">
              ...
            </Button>
            <Button variant="outline" size="sm">
              43
            </Button>
            <Button variant="outline" size="sm">
              Suivant
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
