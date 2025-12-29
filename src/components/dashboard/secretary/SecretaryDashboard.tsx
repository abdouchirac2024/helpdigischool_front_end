'use client'

import { useState } from 'react'
import { 
  LayoutDashboard,
  Users,
  UserPlus,
  CreditCard,
  FileText,
  Phone,
  Mail,
  Printer,
  Calendar
} from 'lucide-react'
import { Sidebar, MenuItem } from '../shared/Sidebar'
import { TopBar } from '../shared/TopBar'
import { StatCard } from '../shared/StatCard'
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

export function SecretaryDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

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
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Secrétariat</h1>
            <p className="text-gray-600 mt-1">Gestion administrative de l'école</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <h3 className="text-lg font-semibold mb-4">Actions rapides</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <UserPlus className="w-6 h-6" />
                <span className="text-sm">Nouvelle inscription</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <CreditCard className="w-6 h-6" />
                <span className="text-sm">Enregistrer paiement</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <FileText className="w-6 h-6" />
                <span className="text-sm">Certificat</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <Printer className="w-6 h-6" />
                <span className="text-sm">Imprimer</span>
              </Button>
            </div>
          </div>

          {/* Pending Tasks & Recent Payments */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pending Enrollments */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold mb-4">Inscriptions en attente</h3>
              <div className="space-y-3">
                {[
                  { name: 'Amina Nkolo', class: 'CM1', parent: 'M. Nkolo', phone: '6 77 88 99 00' },
                  { name: 'Paul Mbarga', class: 'CE2', parent: 'Mme Mbarga', phone: '6 55 66 77 88' },
                  { name: 'Sophie Kamga', class: 'CM2', parent: 'M. Kamga', phone: '6 99 00 11 22' },
                ].map((enrollment, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-[#2302B3] transition-colors">
                    <div>
                      <p className="font-medium text-sm">{enrollment.name}</p>
                      <p className="text-xs text-gray-500">{enrollment.class} - {enrollment.parent}</p>
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
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold mb-4">Paiements récents</h3>
              <div className="space-y-3">
                {[
                  { student: 'Jean Talla', amount: '75,000 FCFA', type: 'Scolarité', time: 'Il y a 10 min' },
                  { student: 'Marie Kouam', amount: '25,000 FCFA', type: 'Cantine', time: 'Il y a 25 min' },
                  { student: 'Paul Ngo', amount: '50,000 FCFA', type: 'Scolarité', time: 'Il y a 1h' },
                  { student: 'Sophie Biya', amount: '75,000 FCFA', type: 'Scolarité', time: 'Il y a 2h' },
                ].map((payment, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{payment.student}</p>
                        <p className="text-xs text-gray-500">{payment.type} - {payment.time}</p>
                      </div>
                    </div>
                    <span className="font-semibold text-sm text-green-600">{payment.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Today's Appointments */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <h3 className="text-lg font-semibold mb-4">Rendez-vous du jour</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { time: '09:00', name: 'M. Talla', reason: 'Inscription', status: 'confirmed' },
                { time: '11:00', name: 'Mme Kouam', reason: 'Certificat de scolarité', status: 'confirmed' },
                { time: '14:30', name: 'M. Ngo', reason: 'Dossier administratif', status: 'pending' },
              ].map((appointment, i) => (
                <div key={i} className={`p-4 rounded-xl border-2 ${
                  appointment.status === 'confirmed' ? 'border-green-200 bg-green-50' : 'border-orange-200 bg-orange-50'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-bold text-gray-900">{appointment.time}</span>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      appointment.status === 'confirmed' ? 'bg-green-200 text-green-800' : 'bg-orange-200 text-orange-800'
                    }`}>
                      {appointment.status === 'confirmed' ? 'Confirmé' : 'En attente'}
                    </span>
                  </div>
                  <p className="font-semibold text-sm">{appointment.name}</p>
                  <p className="text-xs text-gray-600">{appointment.reason}</p>
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
