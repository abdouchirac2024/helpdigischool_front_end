'use client'

import { CreditCard, MessageSquare, FileText, Calendar } from 'lucide-react'
import { StatCard } from '../shared/StatCard'
import { Button } from '@/components/ui/button'

export function ParentDashboard() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Espace Parent</h1>
        <p className="mt-1 text-gray-600">Suivez la scolarité de vos enfants</p>
      </div>

      {/* Children Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {[
          { name: 'Amina Talla', class: 'CM2-A', average: '15.8/20', attendance: '96%' },
          { name: 'Paul Talla', class: 'CE2-B', average: '14.2/20', attendance: '94%' },
        ].map((child, i) => (
          <div key={i} className="rounded-2xl border border-gray-100 bg-white p-6">
            <div className="mb-4 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#2302B3] to-[#4318FF] text-lg font-bold text-white">
                  {child.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{child.name}</h3>
                  <p className="text-sm text-gray-500">{child.class}</p>
                </div>
              </div>
              <Button size="sm" variant="outline">
                Voir détails
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-blue-50 p-3">
                <p className="mb-1 text-xs text-gray-600">Moyenne</p>
                <p className="text-xl font-bold text-blue-600">{child.average}</p>
              </div>
              <div className="rounded-lg bg-green-50 p-3">
                <p className="mb-1 text-xs text-gray-600">Présence</p>
                <p className="text-xl font-bold text-green-600">{child.attendance}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Frais scolaires"
          value="À jour"
          subtitle="Prochain: 15 Jan 2025"
          icon={CreditCard}
          iconColor="text-green-600"
          iconBg="bg-green-50"
        />
        <StatCard
          title="Messages non lus"
          value="2"
          subtitle="De l'école"
          icon={MessageSquare}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
        />
        <StatCard
          title="Bulletins"
          value="4"
          subtitle="Disponibles"
          icon={FileText}
          iconColor="text-purple-600"
          iconBg="bg-purple-50"
        />
        <StatCard
          title="Événements"
          value="3"
          subtitle="Ce mois"
          icon={Calendar}
          iconColor="text-orange-600"
          iconBg="bg-orange-50"
        />
      </div>

      {/* Recent Activity & Payments */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Grades */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <h3 className="mb-4 text-lg font-semibold">Dernières notes</h3>
          <div className="space-y-3">
            {[
              { student: 'Amina', subject: 'Mathématiques', grade: '17/20', date: 'Hier' },
              { student: 'Paul', subject: 'Français', grade: '15/20', date: 'Il y a 2j' },
              { student: 'Amina', subject: 'Sciences', grade: '16/20', date: 'Il y a 3j' },
              { student: 'Paul', subject: 'Histoire', grade: '14/20', date: 'Il y a 4j' },
            ].map((grade, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg p-3 hover:bg-gray-50"
              >
                <div>
                  <p className="text-sm font-medium">
                    {grade.student} - {grade.subject}
                  </p>
                  <p className="text-xs text-gray-500">{grade.date}</p>
                </div>
                <span className="text-lg font-bold text-[#2302B3]">{grade.grade}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Payment History */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <h3 className="mb-4 text-lg font-semibold">Historique des paiements</h3>
          <div className="space-y-3">
            {[
              {
                label: 'Frais de scolarité - Trimestre 2',
                amount: '75,000 FCFA',
                date: '15 Déc 2024',
                status: 'Payé',
              },
              {
                label: 'Frais de cantine',
                amount: '25,000 FCFA',
                date: '01 Déc 2024',
                status: 'Payé',
              },
              {
                label: 'Frais de scolarité - Trimestre 1',
                amount: '75,000 FCFA',
                date: '15 Sep 2024',
                status: 'Payé',
              },
            ].map((payment, i) => (
              <div
                key={i}
                className="flex items-start justify-between rounded-lg p-3 hover:bg-gray-50"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium">{payment.label}</p>
                  <p className="text-xs text-gray-500">{payment.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">{payment.amount}</p>
                  <span className="rounded-full bg-green-50 px-2 py-0.5 text-xs text-green-600">
                    {payment.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <Button className="mt-4 w-full bg-[#2302B3] hover:bg-[#1a0285]">
            Effectuer un paiement
          </Button>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold">Événements à venir</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            { title: 'Réunion parents-profs', date: '20 Jan 2025', time: '15:00' },
            { title: 'Remise des bulletins', date: '25 Jan 2025', time: '10:00' },
            { title: 'Journée portes ouvertes', date: '05 Fév 2025', time: '09:00' },
          ].map((event, i) => (
            <div
              key={i}
              className="rounded-xl border-2 border-gray-200 p-4 transition-colors hover:border-[#2302B3]"
            >
              <div className="mb-2 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-[#2302B3]" />
                <p className="text-sm font-semibold">{event.title}</p>
              </div>
              <p className="text-xs text-gray-600">
                {event.date} à {event.time}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
