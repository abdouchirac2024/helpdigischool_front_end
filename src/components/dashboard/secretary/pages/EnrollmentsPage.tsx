'use client'

import { useState } from 'react'
import {
  UserPlus,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Mail,
  FileCheck,
  AlertCircle,
  Phone,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const enrollments = [
  {
    id: 1,
    studentName: 'Amina Nkolo',
    birthDate: '15/03/2015',
    class: 'CM1',
    parentName: 'M. Nkolo Jean',
    parentPhone: '6 77 88 99 00',
    parentEmail: 'nkolo.jean@email.com',
    submittedDate: '10/01/2025',
    status: 'pending',
    documents: { birthCert: true, photos: true, previousReport: false, medicalCert: true },
  },
  {
    id: 2,
    studentName: 'Paul Mbarga',
    birthDate: '22/07/2016',
    class: 'CE2',
    parentName: 'Mme Mbarga Sophie',
    parentPhone: '6 55 66 77 88',
    parentEmail: 'mbarga.s@email.com',
    submittedDate: '09/01/2025',
    status: 'pending',
    documents: { birthCert: true, photos: true, previousReport: true, medicalCert: true },
  },
  {
    id: 3,
    studentName: 'Sophie Kamga',
    birthDate: '08/11/2014',
    class: 'CM2',
    parentName: 'M. Kamga Pierre',
    parentPhone: '6 99 00 11 22',
    parentEmail: 'kamga.p@email.com',
    submittedDate: '08/01/2025',
    status: 'review',
    documents: { birthCert: true, photos: false, previousReport: true, medicalCert: true },
  },
  {
    id: 4,
    studentName: 'Jean Fotso',
    birthDate: '30/05/2017',
    class: 'CE1',
    parentName: 'Mme Fotso Claire',
    parentPhone: '6 33 44 55 66',
    parentEmail: 'fotso.c@email.com',
    submittedDate: '07/01/2025',
    status: 'approved',
    documents: { birthCert: true, photos: true, previousReport: true, medicalCert: true },
  },
  {
    id: 5,
    studentName: 'Marie Biya',
    birthDate: '12/09/2018',
    class: 'CP',
    parentName: 'M. Biya André',
    parentPhone: '6 11 22 33 44',
    parentEmail: 'biya.a@email.com',
    submittedDate: '06/01/2025',
    status: 'rejected',
    documents: { birthCert: false, photos: true, previousReport: false, medicalCert: false },
  },
]

export function SecretaryEnrollmentsPage() {
  const [filter, setFilter] = useState('all')

  const getStatusBadge = (status: string) => {
    const config = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Clock, label: 'En attente' },
      review: { bg: 'bg-blue-100', text: 'text-blue-700', icon: Eye, label: 'En révision' },
      approved: {
        bg: 'bg-green-100',
        text: 'text-green-700',
        icon: CheckCircle,
        label: 'Approuvé',
      },
      rejected: { bg: 'bg-red-100', text: 'text-red-700', icon: XCircle, label: 'Refusé' },
    }
    const { bg, text, icon: Icon, label } = config[status as keyof typeof config]
    return (
      <span
        className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${bg} ${text}`}
      >
        <Icon className="h-3 w-3" />
        {label}
      </span>
    )
  }

  const filteredEnrollments =
    filter === 'all' ? enrollments : enrollments.filter((e) => e.status === filter)

  const stats = {
    pending: enrollments.filter((e) => e.status === 'pending').length,
    review: enrollments.filter((e) => e.status === 'review').length,
    approved: enrollments.filter((e) => e.status === 'approved').length,
    rejected: enrollments.filter((e) => e.status === 'rejected').length,
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inscriptions</h1>
          <p className="mt-1 text-gray-600">Gestion des demandes d'inscription</p>
        </div>
        <Button className="gap-2 bg-[#2302B3] hover:bg-[#1a0285]">
          <UserPlus className="h-4 w-4" />
          Nouvelle demande
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div
          className="cursor-pointer rounded-xl border border-gray-100 bg-white p-4 hover:border-yellow-300"
          onClick={() => setFilter('pending')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="mb-1 text-sm text-gray-600">En attente</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
        <div
          className="cursor-pointer rounded-xl border border-gray-100 bg-white p-4 hover:border-blue-300"
          onClick={() => setFilter('review')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="mb-1 text-sm text-gray-600">En révision</p>
              <p className="text-2xl font-bold text-blue-600">{stats.review}</p>
            </div>
            <Eye className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div
          className="cursor-pointer rounded-xl border border-gray-100 bg-white p-4 hover:border-green-300"
          onClick={() => setFilter('approved')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="mb-1 text-sm text-gray-600">Approuvées</p>
              <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div
          className="cursor-pointer rounded-xl border border-gray-100 bg-white p-4 hover:border-red-300"
          onClick={() => setFilter('rejected')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="mb-1 text-sm text-gray-600">Refusées</p>
              <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
            </div>
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { value: 'all', label: 'Toutes' },
          { value: 'pending', label: 'En attente' },
          { value: 'review', label: 'En révision' },
          { value: 'approved', label: 'Approuvées' },
          { value: 'rejected', label: 'Refusées' },
        ].map((f) => (
          <Button
            key={f.value}
            variant={filter === f.value ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter(f.value)}
            className={filter === f.value ? 'bg-[#2302B3]' : ''}
          >
            {f.label}
          </Button>
        ))}
      </div>

      {/* Enrollments Cards */}
      <div className="space-y-4">
        {filteredEnrollments.map((enrollment) => (
          <div
            key={enrollment.id}
            className="rounded-xl border border-gray-100 bg-white p-6 transition-shadow hover:shadow-md"
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
              {/* Student Info */}
              <div className="flex-1">
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{enrollment.studentName}</h3>
                    <p className="text-sm text-gray-500">
                      Né(e) le {enrollment.birthDate} • Demande pour {enrollment.class}
                    </p>
                  </div>
                  {getStatusBadge(enrollment.status)}
                </div>

                <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <p className="mb-1 text-xs text-gray-500">Parent/Tuteur</p>
                    <p className="font-medium text-gray-900">{enrollment.parentName}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs text-gray-500">Date de soumission</p>
                    <p className="font-medium text-gray-900">{enrollment.submittedDate}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs text-gray-500">Téléphone</p>
                    <a
                      href={`tel:${enrollment.parentPhone}`}
                      className="flex items-center gap-1 font-medium text-[#2302B3] hover:underline"
                    >
                      <Phone className="h-3 w-3" />
                      {enrollment.parentPhone}
                    </a>
                  </div>
                  <div>
                    <p className="mb-1 text-xs text-gray-500">Email</p>
                    <a
                      href={`mailto:${enrollment.parentEmail}`}
                      className="flex items-center gap-1 font-medium text-[#2302B3] hover:underline"
                    >
                      <Mail className="h-3 w-3" />
                      {enrollment.parentEmail}
                    </a>
                  </div>
                </div>

                {/* Documents Checklist */}
                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="mb-3 text-sm font-semibold text-gray-700">Documents requis</p>
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                    {[
                      { key: 'birthCert', label: 'Acte de naissance' },
                      { key: 'photos', label: "Photos d'identité" },
                      { key: 'previousReport', label: 'Bulletin précédent' },
                      { key: 'medicalCert', label: 'Certificat médical' },
                    ].map((doc) => (
                      <div
                        key={doc.key}
                        className={`flex items-center gap-2 rounded-lg p-2 ${
                          enrollment.documents[doc.key as keyof typeof enrollment.documents]
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {enrollment.documents[doc.key as keyof typeof enrollment.documents] ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <AlertCircle className="h-4 w-4" />
                        )}
                        <span className="text-xs font-medium">{doc.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 lg:flex-col">
                <Button variant="outline" size="sm" className="gap-2">
                  <Eye className="h-4 w-4" />
                  Voir dossier
                </Button>
                {(enrollment.status === 'pending' || enrollment.status === 'review') && (
                  <>
                    <Button size="sm" className="gap-2 bg-green-600 hover:bg-green-700">
                      <CheckCircle className="h-4 w-4" />
                      Approuver
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-2 border-red-200 text-red-600 hover:bg-red-50"
                    >
                      <XCircle className="h-4 w-4" />
                      Refuser
                    </Button>
                  </>
                )}
                {enrollment.status === 'approved' && (
                  <Button size="sm" className="gap-2 bg-[#2302B3] hover:bg-[#1a0285]">
                    <FileCheck className="h-4 w-4" />
                    Finaliser
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
