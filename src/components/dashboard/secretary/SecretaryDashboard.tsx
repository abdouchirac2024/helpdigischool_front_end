'use client'

import { Users, UserPlus, CreditCard, FileText, Printer, Calendar } from 'lucide-react'
import { StatCard } from '../shared/StatCard'
import { Button } from '@/components/ui/button'

export function SecretaryDashboard() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Secrétariat</h1>
        <p className="mt-1 text-gray-600">Gestion administrative de l'école</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Élèves inscrits"
          value="342"
          subtitle="Année 2024-2025"
          icon={Users}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
        />
        <StatCard
          title="Nouvelles inscriptions"
          value="5"
          subtitle="En attente"
          icon={UserPlus}
          iconColor="text-green-600"
          iconBg="bg-green-50"
          trend="+5"
          trendUp={true}
        />
        <StatCard
          title="Paiements du jour"
          value="12"
          subtitle="450,000 FCFA"
          icon={CreditCard}
          iconColor="text-purple-600"
          iconBg="bg-purple-50"
        />
        <StatCard
          title="Rendez-vous"
          value="3"
          subtitle="Aujourd'hui"
          icon={Calendar}
          iconColor="text-orange-600"
          iconBg="bg-orange-50"
        />
      </div>

      {/* Quick Actions */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold">Actions rapides</h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <Button variant="outline" className="h-auto flex-col gap-2 py-4">
            <UserPlus className="h-6 w-6" />
            <span className="text-sm">Nouvelle inscription</span>
          </Button>
          <Button variant="outline" className="h-auto flex-col gap-2 py-4">
            <CreditCard className="h-6 w-6" />
            <span className="text-sm">Enregistrer paiement</span>
          </Button>
          <Button variant="outline" className="h-auto flex-col gap-2 py-4">
            <FileText className="h-6 w-6" />
            <span className="text-sm">Certificat</span>
          </Button>
          <Button variant="outline" className="h-auto flex-col gap-2 py-4">
            <Printer className="h-6 w-6" />
            <span className="text-sm">Imprimer</span>
          </Button>
        </div>
      </div>

      {/* Pending Tasks & Recent Payments */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Pending Enrollments */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <h3 className="mb-4 text-lg font-semibold">Inscriptions en attente</h3>
          <div className="space-y-3">
            {[
              { name: 'Amina Nkolo', class: 'CM1', parent: 'M. Nkolo', phone: '6 77 88 99 00' },
              { name: 'Paul Mbarga', class: 'CE2', parent: 'Mme Mbarga', phone: '6 55 66 77 88' },
              { name: 'Sophie Kamga', class: 'CM2', parent: 'M. Kamga', phone: '6 99 00 11 22' },
            ].map((enrollment, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg border border-gray-200 p-3 transition-colors hover:border-[#2302B3]"
              >
                <div>
                  <p className="text-sm font-medium">{enrollment.name}</p>
                  <p className="text-xs text-gray-500">
                    {enrollment.class} - {enrollment.parent}
                  </p>
                  <p className="text-xs text-gray-400">{enrollment.phone}</p>
                </div>
                <Button size="sm" className="bg-[#2302B3] hover:bg-[#1a0285]">
                  Traiter
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Payments */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <h3 className="mb-4 text-lg font-semibold">Paiements récents</h3>
          <div className="space-y-3">
            {[
              {
                student: 'Jean Talla',
                amount: '75,000 FCFA',
                type: 'Scolarité',
                time: 'Il y a 10 min',
              },
              {
                student: 'Marie Kouam',
                amount: '25,000 FCFA',
                type: 'Cantine',
                time: 'Il y a 25 min',
              },
              { student: 'Paul Ngo', amount: '50,000 FCFA', type: 'Scolarité', time: 'Il y a 1h' },
              {
                student: 'Sophie Biya',
                amount: '75,000 FCFA',
                type: 'Scolarité',
                time: 'Il y a 2h',
              },
            ].map((payment, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg p-3 hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50">
                    <CreditCard className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{payment.student}</p>
                    <p className="text-xs text-gray-500">
                      {payment.type} - {payment.time}
                    </p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-green-600">{payment.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Today's Appointments */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold">Rendez-vous du jour</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            { time: '09:00', name: 'M. Talla', reason: 'Inscription', status: 'confirmed' },
            {
              time: '11:00',
              name: 'Mme Kouam',
              reason: 'Certificat de scolarité',
              status: 'confirmed',
            },
            { time: '14:30', name: 'M. Ngo', reason: 'Dossier administratif', status: 'pending' },
          ].map((appointment, i) => (
            <div
              key={i}
              className={`rounded-xl border-2 p-4 ${
                appointment.status === 'confirmed'
                  ? 'border-green-200 bg-green-50'
                  : 'border-orange-200 bg-orange-50'
              }`}
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">{appointment.time}</span>
                <span
                  className={`rounded-full px-2 py-1 text-xs font-semibold ${
                    appointment.status === 'confirmed'
                      ? 'bg-green-200 text-green-800'
                      : 'bg-orange-200 text-orange-800'
                  }`}
                >
                  {appointment.status === 'confirmed' ? 'Confirmé' : 'En attente'}
                </span>
              </div>
              <p className="text-sm font-semibold">{appointment.name}</p>
              <p className="text-xs text-gray-600">{appointment.reason}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
