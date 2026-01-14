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
  Plus,
  Clock,
  CheckCircle,
  XCircle,
  User,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  MapPin
} from 'lucide-react'
import { Sidebar, MenuItem } from '../../shared/Sidebar'
import { TopBar } from '../../shared/TopBar'
import { Button } from '@/components/ui/button'

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

const appointments = [
  { id: 1, time: '08:30', endTime: '09:00', name: 'M. Talla Jean', reason: 'Inscription nouvel élève', status: 'confirmed', phone: '6 77 88 99 00' },
  { id: 2, time: '09:30', endTime: '10:00', name: 'Mme Ngo Sophie', reason: 'Demande de certificat', status: 'confirmed', phone: '6 55 66 77 88' },
  { id: 3, time: '10:30', endTime: '11:00', name: 'M. Kouam Pierre', reason: 'Paiement scolarité', status: 'pending', phone: '6 33 44 55 66' },
  { id: 4, time: '11:30', endTime: '12:00', name: 'Mme Fotso Claire', reason: 'Dossier administratif', status: 'confirmed', phone: '6 11 22 33 44' },
  { id: 5, time: '14:00', endTime: '14:30', name: 'M. Mbarga Paul', reason: 'Transfert dossier', status: 'pending', phone: '6 99 00 11 22' },
  { id: 6, time: '15:00', endTime: '15:30', name: 'Mme Biya André', reason: 'Réunion parents', status: 'cancelled', phone: '6 22 33 44 55' },
]

const weekDays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven']
const currentWeekDates = [13, 14, 15, 16, 17]

export function SecretaryAppointmentsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(14)

  const getStatusConfig = (status: string) => {
    const configs = {
      confirmed: { bg: 'bg-green-100', border: 'border-green-300', text: 'text-green-700', label: 'Confirmé' },
      pending: { bg: 'bg-yellow-100', border: 'border-yellow-300', text: 'text-yellow-700', label: 'En attente' },
      cancelled: { bg: 'bg-red-100', border: 'border-red-300', text: 'text-red-700', label: 'Annulé' },
    }
    return configs[status as keyof typeof configs]
  }

  const todayAppointments = appointments.filter(a => a.status !== 'cancelled')
  const confirmedCount = appointments.filter(a => a.status === 'confirmed').length
  const pendingCount = appointments.filter(a => a.status === 'pending').length

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
              <h1 className="text-3xl font-bold text-gray-900">Rendez-vous</h1>
              <p className="text-gray-600 mt-1">Gestion des rendez-vous et plannings</p>
            </div>
            <Button className="bg-[#2302B3] hover:bg-[#1a0285] gap-2">
              <Plus className="w-4 h-4" />
              Nouveau rendez-vous
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Aujourd'hui</p>
                  <p className="text-2xl font-bold text-gray-900">{todayAppointments.length}</p>
                </div>
                <Calendar className="w-8 h-8 text-[#2302B3]" />
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Confirmés</p>
                  <p className="text-2xl font-bold text-green-600">{confirmedCount}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">En attente</p>
                  <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Cette semaine</p>
                  <p className="text-2xl font-bold text-gray-900">18</p>
                </div>
                <Calendar className="w-8 h-8 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Calendar Week View */}
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <Button variant="outline" size="sm">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <h3 className="font-semibold text-gray-900">Janvier 2025</h3>
              <Button variant="outline" size="sm">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {weekDays.map((day, i) => (
                <button
                  key={day}
                  onClick={() => setSelectedDate(currentWeekDates[i])}
                  className={`p-4 rounded-xl text-center transition-all ${
                    selectedDate === currentWeekDates[i]
                      ? 'bg-[#2302B3] text-white'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <p className={`text-sm font-medium ${selectedDate === currentWeekDates[i] ? 'text-white/80' : 'text-gray-500'}`}>
                    {day}
                  </p>
                  <p className={`text-2xl font-bold mt-1 ${selectedDate === currentWeekDates[i] ? 'text-white' : 'text-gray-900'}`}>
                    {currentWeekDates[i]}
                  </p>
                  <div className={`flex justify-center gap-1 mt-2 ${selectedDate === currentWeekDates[i] ? 'text-white/60' : 'text-gray-400'}`}>
                    {[1, 2, 3].slice(0, Math.floor(Math.random() * 3) + 1).map((_, j) => (
                      <div key={j} className={`w-1.5 h-1.5 rounded-full ${
                        selectedDate === currentWeekDates[i] ? 'bg-white/60' : 'bg-gray-300'
                      }`} />
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Appointments List */}
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">
                Rendez-vous du {selectedDate} Janvier 2025
              </h3>
              <span className="text-sm text-gray-500">{todayAppointments.length} rendez-vous</span>
            </div>
            <div className="divide-y divide-gray-100">
              {appointments.map((appointment) => {
                const statusConfig = getStatusConfig(appointment.status)
                return (
                  <div
                    key={appointment.id}
                    className={`p-4 flex items-center gap-4 hover:bg-gray-50 ${
                      appointment.status === 'cancelled' ? 'opacity-50' : ''
                    }`}
                  >
                    <div className={`w-1 h-16 rounded-full ${
                      appointment.status === 'confirmed' ? 'bg-green-500' :
                      appointment.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                    }`} />

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-bold text-lg text-gray-900">{appointment.time}</span>
                        <span className="text-gray-400">-</span>
                        <span className="text-gray-600">{appointment.endTime}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusConfig.bg} ${statusConfig.text}`}>
                          {statusConfig.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="font-medium text-gray-900">{appointment.name}</span>
                        </div>
                        <span className="text-sm text-gray-500">{appointment.reason}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Phone className="w-3 h-3 text-gray-400" />
                        <span className="text-sm text-gray-500">{appointment.phone}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {appointment.status === 'pending' && (
                        <>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700 gap-1">
                            <CheckCircle className="w-4 h-4" />
                            Confirmer
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                      {appointment.status === 'confirmed' && (
                        <>
                          <Button size="sm" variant="outline" className="gap-1">
                            <Edit className="w-4 h-4" />
                            Modifier
                          </Button>
                          <Button size="sm" variant="ghost" className="text-red-600">
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
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