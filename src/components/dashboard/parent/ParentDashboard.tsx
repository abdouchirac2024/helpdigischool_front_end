'use client'

import { useState } from 'react'
import { 
  LayoutDashboard,
  User,
  FileText,
  CreditCard,
  MessageSquare,
  Calendar,
  Award,
  TrendingUp
} from 'lucide-react'
import { Sidebar, MenuItem } from '../shared/Sidebar'
import { TopBar } from '../shared/TopBar'
import { StatCard } from '../shared/StatCard'
import { Button } from '@/components/ui/button'

const menuItems: MenuItem[] = [
  { icon: LayoutDashboard, label: 'Tableau de bord', href: '/dashboard/parent' },
  { icon: User, label: 'Mes enfants', href: '/dashboard/parent/children' },
  { icon: FileText, label: 'Bulletins', href: '/dashboard/parent/reports' },
  { icon: Award, label: 'Notes & Résultats', href: '/dashboard/parent/grades' },
  { icon: CreditCard, label: 'Paiements', href: '/dashboard/parent/payments' },
  { icon: Calendar, label: 'Emploi du temps', href: '/dashboard/parent/schedule' },
  { icon: MessageSquare, label: 'Messages', href: '/dashboard/parent/messages', badge: '2' },
]

export function ParentDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar 
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        userName="Jean Talla"
        userRole="Parent"
      />
      
      <Sidebar 
        menuItems={menuItems}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="lg:ml-64 pt-16 min-h-screen pb-20 lg:pb-0">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Espace Parent</h1>
            <p className="text-gray-600 mt-1">Suivez la scolarité de vos enfants</p>
          </div>

          {/* Children Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: 'Amina Talla', class: 'CM2-A', average: '15.8/20', attendance: '96%' },
              { name: 'Paul Talla', class: 'CE2-B', average: '14.2/20', attendance: '94%' },
            ].map((child, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2302B3] to-[#4318FF] flex items-center justify-center text-white font-bold text-lg">
                      {child.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{child.name}</h3>
                      <p className="text-sm text-gray-500">{child.class}</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">Voir détails</Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-blue-50">
                    <p className="text-xs text-gray-600 mb-1">Moyenne</p>
                    <p className="text-xl font-bold text-blue-600">{child.average}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-green-50">
                    <p className="text-xs text-gray-600 mb-1">Présence</p>
                    <p className="text-xl font-bold text-green-600">{child.attendance}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Grades */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold mb-4">Dernières notes</h3>
              <div className="space-y-3">
                {[
                  { student: 'Amina', subject: 'Mathématiques', grade: '17/20', date: 'Hier' },
                  { student: 'Paul', subject: 'Français', grade: '15/20', date: 'Il y a 2j' },
                  { student: 'Amina', subject: 'Sciences', grade: '16/20', date: 'Il y a 3j' },
                  { student: 'Paul', subject: 'Histoire', grade: '14/20', date: 'Il y a 4j' },
                ].map((grade, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                    <div>
                      <p className="font-medium text-sm">{grade.student} - {grade.subject}</p>
                      <p className="text-xs text-gray-500">{grade.date}</p>
                    </div>
                    <span className="text-lg font-bold text-[#2302B3]">{grade.grade}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment History */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold mb-4">Historique des paiements</h3>
              <div className="space-y-3">
                {[
                  { label: 'Frais de scolarité - Trimestre 2', amount: '75,000 FCFA', date: '15 Déc 2024', status: 'Payé' },
                  { label: 'Frais de cantine', amount: '25,000 FCFA', date: '01 Déc 2024', status: 'Payé' },
                  { label: 'Frais de scolarité - Trimestre 1', amount: '75,000 FCFA', date: '15 Sep 2024', status: 'Payé' },
                ].map((payment, i) => (
                  <div key={i} className="flex items-start justify-between p-3 rounded-lg hover:bg-gray-50">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{payment.label}</p>
                      <p className="text-xs text-gray-500">{payment.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-sm">{payment.amount}</p>
                      <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                        {payment.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4 bg-[#2302B3] hover:bg-[#1a0285]">
                Effectuer un paiement
              </Button>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <h3 className="text-lg font-semibold mb-4">Événements à venir</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: 'Réunion parents-profs', date: '20 Jan 2025', time: '15:00' },
                { title: 'Remise des bulletins', date: '25 Jan 2025', time: '10:00' },
                { title: 'Journée portes ouvertes', date: '05 Fév 2025', time: '09:00' },
              ].map((event, i) => (
                <div key={i} className="p-4 rounded-xl border-2 border-gray-200 hover:border-[#2302B3] transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-[#2302B3]" />
                    <p className="font-semibold text-sm">{event.title}</p>
                  </div>
                  <p className="text-xs text-gray-600">{event.date} à {event.time}</p>
                </div>
              ))}
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
