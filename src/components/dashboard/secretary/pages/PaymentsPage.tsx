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
  Plus,
  Download,
  CheckCircle,
  Clock,
  AlertCircle,
  Receipt,
  TrendingUp,
  Filter
} from 'lucide-react'
import { Sidebar, MenuItem } from '../../shared/Sidebar'
import { TopBar } from '../../shared/TopBar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

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

const payments = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  reference: `PAY-2025-${String(i + 1).padStart(4, '0')}`,
  student: ['Amina Talla', 'Paul Ngo', 'Marie Kouam', 'Jean Mbarga', 'Sophie Kamga'][i % 5],
  class: ['CM2-A', 'CM1-B', 'CE2-A', 'CE1-B', 'CP-A'][i % 5],
  type: ['Scolarité', 'Cantine', 'Transport', 'Activités', 'Inscription'][i % 5],
  amount: [75000, 25000, 15000, 10000, 50000][i % 5],
  method: ['Espèces', 'Mobile Money', 'Virement', 'Chèque'][i % 4],
  date: `${14 - (i % 14)}/01/2025`,
  time: `${8 + (i % 10)}:${String((i * 7) % 60).padStart(2, '0')}`,
  receivedBy: 'Sophie Mballa',
  status: i % 7 === 0 ? 'pending' : 'completed'
}))

export function SecretaryPaymentsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')

  const todayTotal = payments.filter(p => p.date === '14/01/2025' && p.status === 'completed')
    .reduce((acc, p) => acc + p.amount, 0)
  const monthTotal = payments.filter(p => p.status === 'completed')
    .reduce((acc, p) => acc + p.amount, 0)

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
              <h1 className="text-3xl font-bold text-gray-900">Paiements</h1>
              <p className="text-gray-600 mt-1">Enregistrement et suivi des paiements</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Export
              </Button>
              <Button className="bg-[#2302B3] hover:bg-[#1a0285] gap-2">
                <Plus className="w-4 h-4" />
                Nouveau paiement
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-[#2302B3] to-[#4318FF] rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm mb-1">Aujourd'hui</p>
                  <p className="text-3xl font-bold">{todayTotal.toLocaleString()}</p>
                  <p className="text-white/80 text-sm mt-1">FCFA</p>
                </div>
                <CreditCard className="w-12 h-12 text-white/50" />
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Ce mois</p>
                  <p className="text-2xl font-bold text-gray-900">{monthTotal.toLocaleString()}</p>
                  <p className="text-gray-500 text-sm mt-1">FCFA</p>
                </div>
                <TrendingUp className="w-10 h-10 text-green-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Transactions</p>
                  <p className="text-2xl font-bold text-gray-900">{payments.filter(p => p.status === 'completed').length}</p>
                  <p className="text-gray-500 text-sm mt-1">ce mois</p>
                </div>
                <Receipt className="w-10 h-10 text-blue-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">En attente</p>
                  <p className="text-2xl font-bold text-orange-600">{payments.filter(p => p.status === 'pending').length}</p>
                  <p className="text-gray-500 text-sm mt-1">à valider</p>
                </div>
                <Clock className="w-10 h-10 text-orange-500" />
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Rechercher par élève ou référence..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="Scolarité">Scolarité</SelectItem>
                  <SelectItem value="Cantine">Cantine</SelectItem>
                  <SelectItem value="Transport">Transport</SelectItem>
                  <SelectItem value="Activités">Activités</SelectItem>
                  <SelectItem value="Inscription">Inscription</SelectItem>
                </SelectContent>
              </Select>
              <Input type="date" className="w-full md:w-[180px]" />
            </div>
          </div>

          {/* Payments Table */}
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Référence</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Élève</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Type</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Montant</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Mode</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date/Heure</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Statut</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {payments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <span className="font-mono text-sm text-gray-600">{payment.reference}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-gray-900">{payment.student}</p>
                          <p className="text-xs text-gray-500">{payment.class}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          payment.type === 'Scolarité' ? 'bg-blue-100 text-blue-700' :
                          payment.type === 'Cantine' ? 'bg-green-100 text-green-700' :
                          payment.type === 'Transport' ? 'bg-purple-100 text-purple-700' :
                          payment.type === 'Inscription' ? 'bg-orange-100 text-orange-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {payment.type}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-semibold text-gray-900">{payment.amount.toLocaleString()} FCFA</span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{payment.method}</td>
                      <td className="px-4 py-3">
                        <div>
                          <p className="text-sm text-gray-900">{payment.date}</p>
                          <p className="text-xs text-gray-500">{payment.time}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {payment.status === 'completed' ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                            <CheckCircle className="w-3 h-3" />
                            Validé
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full">
                            <Clock className="w-3 h-3" />
                            En attente
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button size="sm" variant="ghost" className="gap-1">
                            <Receipt className="w-4 h-4" />
                            Reçu
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Printer className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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