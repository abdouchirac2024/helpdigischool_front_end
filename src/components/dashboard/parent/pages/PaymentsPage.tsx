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
  Download,
  Plus,
  CheckCircle,
  Clock,
  AlertCircle,
  Smartphone
} from 'lucide-react'
import { Sidebar, MenuItem } from '../../shared/Sidebar'
import { TopBar } from '../../shared/TopBar'
import { Pagination } from '../../shared/Pagination'
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

const payments = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  student: i % 2 === 0 ? 'Amina Talla' : 'Paul Talla',
  type: ['Scolarité', 'Cantine', 'Transport', 'Activités'][i % 4],
  amount: [75000, 25000, 15000, 10000][i % 4],
  date: new Date(2024, 11 - (i % 12), 15).toLocaleDateString('fr-FR'),
  status: ['paid', 'paid', 'pending', 'overdue'][i % 4],
  method: ['Mobile Money', 'Espèces', 'Virement'][i % 3],
  reference: `PAY-2024-${String(i + 1).padStart(4, '0')}`
}))

export function ParentPaymentsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const totalPages = Math.ceil(payments.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedPayments = payments.slice(startIndex, startIndex + itemsPerPage)

  const getStatusBadge = (status: string) => {
    const styles = {
      paid: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle },
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Clock },
      overdue: { bg: 'bg-red-100', text: 'text-red-700', icon: AlertCircle },
    }
    const labels = { paid: 'Payé', pending: 'En attente', overdue: 'En retard' }
    const style = styles[status as keyof typeof styles]
    const Icon = style.icon
    
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${style.bg} ${style.text}`}>
        <Icon className="w-3 h-3" />
        {labels[status as keyof typeof labels]}
      </span>
    )
  }

  const totalPaid = payments.filter(p => p.status === 'paid').reduce((acc, p) => acc + p.amount, 0)
  const totalPending = payments.filter(p => p.status === 'pending').reduce((acc, p) => acc + p.amount, 0)
  const totalOverdue = payments.filter(p => p.status === 'overdue').reduce((acc, p) => acc + p.amount, 0)

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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Paiements</h1>
              <p className="text-gray-600 mt-1">Historique et gestion des paiements</p>
            </div>
            <Button className="bg-[#2302B3] hover:bg-[#1a0285] gap-2">
              <Plus className="w-4 h-4" />
              Nouveau paiement
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <p className="text-sm text-gray-600 mb-1">Total payé</p>
              <p className="text-2xl font-bold text-green-600">{totalPaid.toLocaleString()} FCFA</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <p className="text-sm text-gray-600 mb-1">En attente</p>
              <p className="text-2xl font-bold text-yellow-600">{totalPending.toLocaleString()} FCFA</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <p className="text-sm text-gray-600 mb-1">En retard</p>
              <p className="text-2xl font-bold text-red-600">{totalOverdue.toLocaleString()} FCFA</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <p className="text-sm text-gray-600 mb-1">Total transactions</p>
              <p className="text-2xl font-bold text-gray-900">{payments.length}</p>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-gradient-to-r from-[#2302B3] to-[#4318FF] rounded-xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-4">Payer avec Mobile Money</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['MTN Mobile Money', 'Orange Money', 'Wave'].map((method, i) => (
                <button key={i} className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-4 transition-colors text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                      <Smartphone className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold">{method}</p>
                      <p className="text-sm text-white/70">Paiement instantané</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Payments Table */}
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Référence</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Élève</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Type</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Montant</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Méthode</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Statut</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedPayments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="text-sm font-mono text-gray-600">{payment.reference}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-gray-900">{payment.student}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-900">{payment.type}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-semibold text-gray-900">{payment.amount.toLocaleString()} FCFA</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">{payment.date}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">{payment.method}</span>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(payment.status)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button size="sm" variant="ghost" className="gap-2">
                          <Download className="w-4 h-4" />
                          Reçu
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              itemsPerPage={itemsPerPage}
              totalItems={payments.length}
            />
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
