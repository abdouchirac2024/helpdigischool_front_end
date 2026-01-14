'use client'

import { useState } from 'react'
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  School,
  Settings,
  FileText,
  CreditCard,
  Calendar,
  BarChart3,
  Bell,
  Search,
  Download,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
  Wallet,
  Receipt,
  Eye,
  Send,
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
  { icon: LayoutDashboard, label: 'Vue d\'ensemble', href: '/dashboard/director' },
  { icon: Users, label: 'Élèves', href: '/dashboard/director/students', badge: '342' },
  { icon: School, label: 'Classes', href: '/dashboard/director/classes', badge: '12' },
  { icon: GraduationCap, label: 'Enseignants', href: '/dashboard/director/teachers', badge: '18' },
  { icon: FileText, label: 'Notes & Bulletins', href: '/dashboard/director/grades' },
  { icon: CreditCard, label: 'Paiements', href: '/dashboard/director/payments' },
  { icon: Calendar, label: 'Emploi du temps', href: '/dashboard/director/schedule' },
  { icon: BarChart3, label: 'Statistiques', href: '/dashboard/director/stats' },
  { icon: Bell, label: 'Notifications', href: '/dashboard/director/notifications', badge: '5' },
  { icon: Settings, label: 'Paramètres', href: '/dashboard/director/settings' },
]

const payments = [
  { id: 1, student: 'Amina Nkolo', class: '6ème A', parent: 'M. Nkolo Jean', amount: 150000, paid: 150000, status: 'paid', date: '10/01/2025', method: 'Mobile Money' },
  { id: 2, student: 'Paul Mbarga', class: '5ème B', parent: 'Mme Mbarga Sophie', amount: 150000, paid: 150000, status: 'paid', date: '08/01/2025', method: 'Virement' },
  { id: 3, student: 'Sophie Kamga', class: '6ème A', parent: 'M. Kamga Pierre', amount: 150000, paid: 75000, status: 'partial', date: '05/01/2025', method: 'Espèces' },
  { id: 4, student: 'Jean Talla', class: '5ème A', parent: 'M. Talla Robert', amount: 150000, paid: 0, status: 'unpaid', date: '-', method: '-' },
  { id: 5, student: 'Marie Kouam', class: '6ème B', parent: 'Mme Kouam Alice', amount: 150000, paid: 100000, status: 'partial', date: '12/01/2025', method: 'Mobile Money' },
  { id: 6, student: 'David Ngo', class: '5ème B', parent: 'M. Ngo Fabrice', amount: 150000, paid: 150000, status: 'paid', date: '03/01/2025', method: 'Virement' },
  { id: 7, student: 'Sarah Biya', class: '6ème A', parent: 'Mme Biya Marie', amount: 150000, paid: 0, status: 'unpaid', date: '-', method: '-' },
  { id: 8, student: 'Eric Muna', class: '5ème A', parent: 'M. Muna Paul', amount: 150000, paid: 50000, status: 'partial', date: '15/01/2025', method: 'Espèces' },
]

export function DirectorPaymentsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.parent.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalExpected = payments.reduce((acc, p) => acc + p.amount, 0)
  const totalCollected = payments.reduce((acc, p) => acc + p.paid, 0)
  const collectionRate = Math.round((totalCollected / totalExpected) * 100)
  const unpaidCount = payments.filter(p => p.status === 'unpaid').length

  const getStatusBadge = (status: string) => {
    const config = {
      paid: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle2, label: 'Soldé' },
      partial: { bg: 'bg-orange-100', text: 'text-orange-700', icon: Clock, label: 'Partiel' },
      unpaid: { bg: 'bg-red-100', text: 'text-red-700', icon: XCircle, label: 'Impayé' },
    }
    const { bg, text, icon: Icon, label } = config[status as keyof typeof config]
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${bg} ${text}`}>
        <Icon className="w-3 h-3" />
        {label}
      </span>
    )
  }

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        schoolName="Lycée Bilingue de Yaoundé"
        userName="M. Kamga Jean"
        userRole="Directeur"
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
              <h1 className="text-3xl font-bold text-gray-900">Gestion des Paiements</h1>
              <p className="text-gray-600 mt-1">Suivi des frais de scolarité</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Exporter
              </Button>
              <Button className="bg-[#2302B3] hover:bg-[#1a0285] gap-2">
                <Send className="w-4 h-4" />
                Envoyer rappels
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-[#2302B3] to-[#4318FF] rounded-2xl p-5 text-white">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{formatAmount(totalCollected)}</p>
                  <p className="text-sm text-white/80">Encaissé</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Receipt className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{formatAmount(totalExpected)}</p>
                  <p className="text-sm text-gray-500">Attendu</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">{collectionRate}%</p>
                  <p className="text-sm text-gray-500">Taux recouvrement</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-red-600">{unpaidCount}</p>
                  <p className="text-sm text-gray-500">Impayés</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl p-4 border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Rechercher un élève ou parent..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                {[
                  { value: 'all', label: 'Tous' },
                  { value: 'paid', label: 'Soldés' },
                  { value: 'partial', label: 'Partiels' },
                  { value: 'unpaid', label: 'Impayés' },
                ].map((status) => (
                  <Button
                    key={status.value}
                    variant={statusFilter === status.value ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setStatusFilter(status.value)}
                    className={statusFilter === status.value ? 'bg-[#2302B3] hover:bg-[#1a0285]' : ''}
                  >
                    {status.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Payments Table */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left p-4 font-semibold text-gray-600">Élève</th>
                    <th className="text-left p-4 font-semibold text-gray-600">Classe</th>
                    <th className="text-left p-4 font-semibold text-gray-600">Parent</th>
                    <th className="text-right p-4 font-semibold text-gray-600">Montant dû</th>
                    <th className="text-right p-4 font-semibold text-gray-600">Payé</th>
                    <th className="text-right p-4 font-semibold text-gray-600">Reste</th>
                    <th className="text-center p-4 font-semibold text-gray-600">Statut</th>
                    <th className="text-left p-4 font-semibold text-gray-600">Dernier paiement</th>
                    <th className="text-right p-4 font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.map((payment) => (
                    <tr key={payment.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2302B3] to-[#4318FF] flex items-center justify-center text-white font-semibold">
                            {payment.student.charAt(0)}
                          </div>
                          <span className="font-semibold text-gray-900">{payment.student}</span>
                        </div>
                      </td>
                      <td className="p-4 text-gray-600">{payment.class}</td>
                      <td className="p-4 text-gray-600">{payment.parent}</td>
                      <td className="p-4 text-right font-medium text-gray-900">{formatAmount(payment.amount)}</td>
                      <td className="p-4 text-right font-medium text-green-600">{formatAmount(payment.paid)}</td>
                      <td className="p-4 text-right font-medium text-red-600">
                        {formatAmount(payment.amount - payment.paid)}
                      </td>
                      <td className="p-4 text-center">{getStatusBadge(payment.status)}</td>
                      <td className="p-4">
                        <div>
                          <p className="text-sm text-gray-900">{payment.date}</p>
                          <p className="text-xs text-gray-500">{payment.method}</p>
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          {payment.status !== 'paid' && (
                            <Button variant="ghost" size="sm" className="text-[#2302B3]">
                              <CreditCard className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="p-4 border-t border-gray-100 flex items-center justify-between">
              <p className="text-sm text-gray-500">Affichage 1-8 sur 342 paiements</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>Précédent</Button>
                <Button variant="outline" size="sm" className="bg-[#2302B3] text-white hover:bg-[#1a0285]">1</Button>
                <Button variant="outline" size="sm">2</Button>
                <Button variant="outline" size="sm">3</Button>
                <Button variant="outline" size="sm">Suivant</Button>
              </div>
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