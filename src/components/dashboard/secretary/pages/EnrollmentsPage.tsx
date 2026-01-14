'use client'

import { useState } from 'react'
import {
  LayoutDashboard,
  Users,
  UserPlus,
  CreditCard,
  FileText,
  Phone,
  Calendar,
  Printer,
  Search,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Mail,
  FileCheck,
  AlertCircle
} from 'lucide-react'
import { Sidebar, MenuItem } from '../../shared/Sidebar'
import { TopBar } from '../../shared/TopBar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const menuItems: MenuItem[] = [
  { icon: LayoutDashboard, label: 'Tableau de bord', href: '/dashboard/secretary' },
  { icon: Users, label: 'Élèves', href: '/dashboard/secretary/students', badge: '342' },
  { icon: UserPlus, label: 'Inscriptions', href: '/dashboard/secretary/enrollments', badge: '5' },
  { icon: CreditCard, label: 'Paiements', href: '/dashboard/secretary/payments' },
  { icon: FileText, label: 'Documents', href: '/dashboard/secretary/documents' },
  { icon: Phone, label: 'Contacts', href: '/dashboard/secretary/contacts' },
  { icon: Calendar, label: 'Rendez-vous', href: '/dashboard/secretary/appointments', badge: '3' },
  { icon: Printer, label: 'Impressions', href: '/dashboard/secretary/printing' },
]

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
    documents: { birthCert: true, photos: true, previousReport: false, medicalCert: true }
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
    documents: { birthCert: true, photos: true, previousReport: true, medicalCert: true }
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
    documents: { birthCert: true, photos: false, previousReport: true, medicalCert: true }
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
    documents: { birthCert: true, photos: true, previousReport: true, medicalCert: true }
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
    documents: { birthCert: false, photos: true, previousReport: false, medicalCert: false }
  },
]

export function SecretaryEnrollmentsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [filter, setFilter] = useState('all')

  const getStatusBadge = (status: string) => {
    const config = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Clock, label: 'En attente' },
      review: { bg: 'bg-blue-100', text: 'text-blue-700', icon: Eye, label: 'En révision' },
      approved: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle, label: 'Approuvé' },
      rejected: { bg: 'bg-red-100', text: 'text-red-700', icon: XCircle, label: 'Refusé' },
    }
    const { bg, text, icon: Icon, label } = config[status as keyof typeof config]
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${bg} ${text}`}>
        <Icon className="w-3 h-3" />
        {label}
      </span>
    )
  }

  const filteredEnrollments = filter === 'all'
    ? enrollments
    : enrollments.filter(e => e.status === filter)

  const stats = {
    pending: enrollments.filter(e => e.status === 'pending').length,
    review: enrollments.filter(e => e.status === 'review').length,
    approved: enrollments.filter(e => e.status === 'approved').length,
    rejected: enrollments.filter(e => e.status === 'rejected').length,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        userName="Sophie Mballa"
        userRole="Secrétaire"
      />

      <Sidebar
        menuItems={menuItems}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="lg:ml-64 pt-16 min-h-screen">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Inscriptions</h1>
              <p className="text-gray-600 mt-1">Gestion des demandes d'inscription</p>
            </div>
            <Button className="bg-[#2302B3] hover:bg-[#1a0285] gap-2">
              <UserPlus className="w-4 h-4" />
              Nouvelle demande
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 border border-gray-100 cursor-pointer hover:border-yellow-300" onClick={() => setFilter('pending')}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">En attente</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100 cursor-pointer hover:border-blue-300" onClick={() => setFilter('review')}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">En révision</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.review}</p>
                </div>
                <Eye className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100 cursor-pointer hover:border-green-300" onClick={() => setFilter('approved')}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Approuvées</p>
                  <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100 cursor-pointer hover:border-red-300" onClick={() => setFilter('rejected')}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Refusées</p>
                  <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
                </div>
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 flex-wrap">
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
              <div key={enrollment.id} className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  {/* Student Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{enrollment.studentName}</h3>
                        <p className="text-sm text-gray-500">
                          Né(e) le {enrollment.birthDate} • Demande pour {enrollment.class}
                        </p>
                      </div>
                      {getStatusBadge(enrollment.status)}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Parent/Tuteur</p>
                        <p className="font-medium text-gray-900">{enrollment.parentName}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Date de soumission</p>
                        <p className="font-medium text-gray-900">{enrollment.submittedDate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Téléphone</p>
                        <a href={`tel:${enrollment.parentPhone}`} className="font-medium text-[#2302B3] hover:underline flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {enrollment.parentPhone}
                        </a>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Email</p>
                        <a href={`mailto:${enrollment.parentEmail}`} className="font-medium text-[#2302B3] hover:underline flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {enrollment.parentEmail}
                        </a>
                      </div>
                    </div>

                    {/* Documents Checklist */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm font-semibold text-gray-700 mb-3">Documents requis</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[
                          { key: 'birthCert', label: 'Acte de naissance' },
                          { key: 'photos', label: 'Photos d\'identité' },
                          { key: 'previousReport', label: 'Bulletin précédent' },
                          { key: 'medicalCert', label: 'Certificat médical' },
                        ].map((doc) => (
                          <div key={doc.key} className={`flex items-center gap-2 p-2 rounded-lg ${
                            enrollment.documents[doc.key as keyof typeof enrollment.documents]
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {enrollment.documents[doc.key as keyof typeof enrollment.documents]
                              ? <CheckCircle className="w-4 h-4" />
                              : <AlertCircle className="w-4 h-4" />
                            }
                            <span className="text-xs font-medium">{doc.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex lg:flex-col gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Eye className="w-4 h-4" />
                      Voir dossier
                    </Button>
                    {(enrollment.status === 'pending' || enrollment.status === 'review') && (
                      <>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 gap-2">
                          <CheckCircle className="w-4 h-4" />
                          Approuver
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 gap-2">
                          <XCircle className="w-4 h-4" />
                          Refuser
                        </Button>
                      </>
                    )}
                    {enrollment.status === 'approved' && (
                      <Button size="sm" className="bg-[#2302B3] hover:bg-[#1a0285] gap-2">
                        <FileCheck className="w-4 h-4" />
                        Finaliser
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}