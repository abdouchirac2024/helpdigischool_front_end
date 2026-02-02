'use client'

import { useState } from 'react'
import {
  Plus,
  Clock,
  CheckCircle,
  XCircle,
  User,
  Edit,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Phone,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const appointments = [
  {
    id: 1,
    time: '08:30',
    endTime: '09:00',
    name: 'M. Talla Jean',
    reason: 'Inscription nouvel élève',
    status: 'confirmed',
    phone: '6 77 88 99 00',
  },
  {
    id: 2,
    time: '09:30',
    endTime: '10:00',
    name: 'Mme Ngo Sophie',
    reason: 'Demande de certificat',
    status: 'confirmed',
    phone: '6 55 66 77 88',
  },
  {
    id: 3,
    time: '10:30',
    endTime: '11:00',
    name: 'M. Kouam Pierre',
    reason: 'Paiement scolarité',
    status: 'pending',
    phone: '6 33 44 55 66',
  },
  {
    id: 4,
    time: '11:30',
    endTime: '12:00',
    name: 'Mme Fotso Claire',
    reason: 'Dossier administratif',
    status: 'confirmed',
    phone: '6 11 22 33 44',
  },
  {
    id: 5,
    time: '14:00',
    endTime: '14:30',
    name: 'M. Mbarga Paul',
    reason: 'Transfert dossier',
    status: 'pending',
    phone: '6 99 00 11 22',
  },
  {
    id: 6,
    time: '15:00',
    endTime: '15:30',
    name: 'Mme Biya André',
    reason: 'Réunion parents',
    status: 'cancelled',
    phone: '6 22 33 44 55',
  },
]

const weekDays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven']
const currentWeekDates = [13, 14, 15, 16, 17]

export function SecretaryAppointmentsPage() {
  const [selectedDate, setSelectedDate] = useState(14)

  const getStatusConfig = (status: string) => {
    const configs = {
      confirmed: {
        bg: 'bg-green-100',
        border: 'border-green-300',
        text: 'text-green-700',
        label: 'Confirmé',
      },
      pending: {
        bg: 'bg-yellow-100',
        border: 'border-yellow-300',
        text: 'text-yellow-700',
        label: 'En attente',
      },
      cancelled: {
        bg: 'bg-red-100',
        border: 'border-red-300',
        text: 'text-red-700',
        label: 'Annulé',
      },
    }
    return configs[status as keyof typeof configs]
  }

  const todayAppointments = appointments.filter((a) => a.status !== 'cancelled')
  const confirmedCount = appointments.filter((a) => a.status === 'confirmed').length
  const pendingCount = appointments.filter((a) => a.status === 'pending').length

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Rendez-vous</h1>
          <p className="mt-1 text-gray-600">Gestion des rendez-vous et plannings</p>
        </div>
        <Button className="gap-2 bg-[#2302B3] hover:bg-[#1a0285]">
          <Plus className="h-4 w-4" />
          Nouveau rendez-vous
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-gray-100 bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="mb-1 text-sm text-gray-600">Aujourd'hui</p>
              <p className="text-2xl font-bold text-gray-900">{todayAppointments.length}</p>
            </div>
            <Calendar className="h-8 w-8 text-[#2302B3]" />
          </div>
        </div>
        <div className="rounded-xl border border-gray-100 bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="mb-1 text-sm text-gray-600">Confirmés</p>
              <p className="text-2xl font-bold text-green-600">{confirmedCount}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <div className="rounded-xl border border-gray-100 bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="mb-1 text-sm text-gray-600">En attente</p>
              <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-500" />
          </div>
        </div>
        <div className="rounded-xl border border-gray-100 bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="mb-1 text-sm text-gray-600">Cette semaine</p>
              <p className="text-2xl font-bold text-gray-900">18</p>
            </div>
            <Calendar className="h-8 w-8 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Calendar Week View */}
      <div className="rounded-xl border border-gray-100 bg-white p-6">
        <div className="mb-6 flex items-center justify-between">
          <Button variant="outline" size="sm">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h3 className="font-semibold text-gray-900">Janvier 2025</h3>
          <Button variant="outline" size="sm">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {weekDays.map((day, i) => (
            <button
              key={day}
              onClick={() => setSelectedDate(currentWeekDates[i])}
              className={`rounded-xl p-4 text-center transition-all ${
                selectedDate === currentWeekDates[i]
                  ? 'bg-[#2302B3] text-white'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <p
                className={`text-sm font-medium ${selectedDate === currentWeekDates[i] ? 'text-white/80' : 'text-gray-500'}`}
              >
                {day}
              </p>
              <p
                className={`mt-1 text-2xl font-bold ${selectedDate === currentWeekDates[i] ? 'text-white' : 'text-gray-900'}`}
              >
                {currentWeekDates[i]}
              </p>
              <div
                className={`mt-2 flex justify-center gap-1 ${selectedDate === currentWeekDates[i] ? 'text-white/60' : 'text-gray-400'}`}
              >
                {[1, 2, 3].slice(0, Math.floor(Math.random() * 3) + 1).map((_, j) => (
                  <div
                    key={j}
                    className={`h-1.5 w-1.5 rounded-full ${
                      selectedDate === currentWeekDates[i] ? 'bg-white/60' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Appointments List */}
      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
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
                className={`flex items-center gap-4 p-4 hover:bg-gray-50 ${
                  appointment.status === 'cancelled' ? 'opacity-50' : ''
                }`}
              >
                <div
                  className={`h-16 w-1 rounded-full ${
                    appointment.status === 'confirmed'
                      ? 'bg-green-500'
                      : appointment.status === 'pending'
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                  }`}
                />

                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-3">
                    <span className="text-lg font-bold text-gray-900">{appointment.time}</span>
                    <span className="text-gray-400">-</span>
                    <span className="text-gray-600">{appointment.endTime}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${statusConfig.bg} ${statusConfig.text}`}
                    >
                      {statusConfig.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="font-medium text-gray-900">{appointment.name}</span>
                    </div>
                    <span className="text-sm text-gray-500">{appointment.reason}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <Phone className="h-3 w-3 text-gray-400" />
                    <span className="text-sm text-gray-500">{appointment.phone}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {appointment.status === 'pending' && (
                    <>
                      <Button size="sm" className="gap-1 bg-green-600 hover:bg-green-700">
                        <CheckCircle className="h-4 w-4" />
                        Confirmer
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-200 text-red-600 hover:bg-red-50"
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                  {appointment.status === 'confirmed' && (
                    <>
                      <Button size="sm" variant="outline" className="gap-1">
                        <Edit className="h-4 w-4" />
                        Modifier
                      </Button>
                      <Button size="sm" variant="ghost" className="text-red-600">
                        <XCircle className="h-4 w-4" />
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
  )
}
