'use client'

import { useState, useMemo } from 'react'
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Filter,
  Download,
  Eye,
  CheckCircle,
  Clock,
  AlertTriangle,
  DollarSign,
  TrendingUp,
  Users,
  Calendar,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface SharedPaymentsPageProps {
  role: 'director' | 'parent' | 'secretary'
  viewMode: 'manage' | 'view'
}

interface Payment {
  id: string
  student: string
  parent: string
  description: string
  amount: number
  date: string
  dueDate: string
  status: 'paid' | 'pending' | 'overdue'
  method?: string
}

interface StatCard {
  label: string
  value: string
  icon: React.ElementType
  accent: string
}

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const MOCK_PAYMENTS: Payment[] = [
  {
    id: 'PAY-001',
    student: 'Amine Benali',
    parent: 'Karim Benali',
    description: 'Frais de scolarité - Janvier',
    amount: 2500,
    date: '2026-01-15',
    dueDate: '2026-01-10',
    status: 'paid',
    method: 'Virement',
  },
  {
    id: 'PAY-002',
    student: 'Sara Idrissi',
    parent: 'Mohamed Idrissi',
    description: 'Frais de scolarité - Janvier',
    amount: 2500,
    date: '',
    dueDate: '2026-01-10',
    status: 'overdue',
    method: '',
  },
  {
    id: 'PAY-003',
    student: 'Youssef Alami',
    parent: 'Hassan Alami',
    description: 'Cantine - Janvier',
    amount: 800,
    date: '2026-01-12',
    dueDate: '2026-01-15',
    status: 'paid',
    method: 'Espèces',
  },
  {
    id: 'PAY-004',
    student: 'Fatima Zahra',
    parent: 'Ahmed Zahra',
    description: 'Transport - Janvier',
    amount: 600,
    date: '',
    dueDate: '2026-01-20',
    status: 'pending',
    method: '',
  },
  {
    id: 'PAY-005',
    student: 'Omar Tazi',
    parent: 'Rachid Tazi',
    description: 'Frais de scolarité - Janvier',
    amount: 2500,
    date: '2026-01-08',
    dueDate: '2026-01-10',
    status: 'paid',
    method: 'Carte bancaire',
  },
  {
    id: 'PAY-006',
    student: 'Lina Bennani',
    parent: 'Samir Bennani',
    description: 'Activités parascolaires',
    amount: 400,
    date: '',
    dueDate: '2026-01-15',
    status: 'overdue',
    method: '',
  },
  {
    id: 'PAY-007',
    student: 'Adam Chraibi',
    parent: 'Nabil Chraibi',
    description: 'Frais de scolarité - Février',
    amount: 2500,
    date: '',
    dueDate: '2026-02-10',
    status: 'pending',
    method: '',
  },
  {
    id: 'PAY-008',
    student: 'Hiba Mansouri',
    parent: 'Driss Mansouri',
    description: 'Cantine - Février',
    amount: 800,
    date: '2026-02-01',
    dueDate: '2026-02-05',
    status: 'paid',
    method: 'Virement',
  },
  {
    id: 'PAY-009',
    student: 'Zakaria Fassi',
    parent: 'Mourad Fassi',
    description: 'Transport - Février',
    amount: 600,
    date: '',
    dueDate: '2026-02-10',
    status: 'pending',
    method: '',
  },
  {
    id: 'PAY-010',
    student: 'Nora El Amrani',
    parent: 'Khalid El Amrani',
    description: 'Frais de scolarité - Février',
    amount: 2500,
    date: '2026-02-02',
    dueDate: '2026-02-10',
    status: 'paid',
    method: 'Espèces',
  },
  {
    id: 'PAY-011',
    student: 'Amine Benali',
    parent: 'Karim Benali',
    description: 'Cantine - Février',
    amount: 800,
    date: '',
    dueDate: '2026-02-15',
    status: 'pending',
    method: '',
  },
  {
    id: 'PAY-012',
    student: 'Sara Idrissi',
    parent: 'Mohamed Idrissi',
    description: 'Transport - Janvier',
    amount: 600,
    date: '2026-01-18',
    dueDate: '2026-01-20',
    status: 'paid',
    method: 'Virement',
  },
]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const BRAND = '#2302B3'

const STATUS_CONFIG: Record<Payment['status'], { label: string; bg: string; text: string }> = {
  paid: { label: 'Payé', bg: 'bg-green-100', text: 'text-green-700' },
  pending: { label: 'En attente', bg: 'bg-yellow-100', text: 'text-yellow-700' },
  overdue: { label: 'Impayé', bg: 'bg-red-100', text: 'text-red-700' },
}

function formatCurrency(n: number) {
  return n.toLocaleString('fr-MA', { style: 'currency', currency: 'MAD' })
}

function getStatsForRole(role: SharedPaymentsPageProps['role']): StatCard[] {
  if (role === 'director') {
    return [
      {
        label: 'Montant collecté',
        value: formatCurrency(14700),
        icon: DollarSign,
        accent: '#059669',
      },
      { label: 'Montant attendu', value: formatCurrency(19200), icon: TrendingUp, accent: BRAND },
      { label: 'Taux de recouvrement', value: '76,6 %', icon: CheckCircle, accent: '#0891b2' },
      { label: 'Impayés', value: '2', icon: AlertTriangle, accent: '#dc2626' },
    ]
  }
  if (role === 'parent') {
    return [
      { label: 'Total payé', value: formatCurrency(3100), icon: CheckCircle, accent: '#059669' },
      { label: 'En attente', value: formatCurrency(800), icon: Clock, accent: '#d97706' },
      { label: 'Impayé', value: formatCurrency(0), icon: AlertTriangle, accent: '#dc2626' },
      { label: 'Transactions', value: '3', icon: Calendar, accent: BRAND },
    ]
  }
  // secretary
  return [
    {
      label: "Total aujourd'hui",
      value: formatCurrency(5000),
      icon: DollarSign,
      accent: '#059669',
    },
    { label: 'Total mensuel', value: formatCurrency(14700), icon: TrendingUp, accent: BRAND },
    { label: 'Transactions', value: '6', icon: Users, accent: '#0891b2' },
    { label: 'En attente', value: '4', icon: Clock, accent: '#d97706' },
  ]
}

const PAGE_SIZE = 5

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function SharedPaymentsPage({ role, viewMode }: SharedPaymentsPageProps) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | Payment['status']>('all')
  const [page, setPage] = useState(1)

  const stats = getStatsForRole(role)

  // For parent role, show only their payments
  const basePayments = useMemo(() => {
    if (role === 'parent') {
      return MOCK_PAYMENTS.filter((p) => p.parent === 'Karim Benali')
    }
    return MOCK_PAYMENTS
  }, [role])

  const filtered = useMemo(() => {
    let result = basePayments
    if (statusFilter !== 'all') {
      result = result.filter((p) => p.status === statusFilter)
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (p) =>
          p.student.toLowerCase().includes(q) ||
          p.parent.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.id.toLowerCase().includes(q)
      )
    }
    return result
  }, [basePayments, statusFilter, search])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const paginated = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900">Paiements</h1>
        {viewMode === 'manage' && (
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90"
            style={{ backgroundColor: BRAND }}
          >
            <Download className="h-4 w-4" />
            Exporter
          </button>
        )}
      </div>

      {/* Scrollable body */}
      <div className="flex-1 space-y-6 overflow-y-auto p-6">
        {/* Stats cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => {
            const Icon = s.icon
            return (
              <div
                key={s.label}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${s.accent}15` }}
                  >
                    <Icon className="h-5 w-5" style={{ color: s.accent }} />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">{s.label}</p>
                    <p className="text-lg font-bold text-gray-900">{s.value}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Filters */}
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          {/* Search */}
          <div className="relative w-full flex-1 sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher…"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setPage(1)
              }}
              className="w-full rounded-lg border border-gray-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-[#2302B3] focus:ring-1 focus:ring-[#2302B3]"
            />
          </div>

          {/* Status filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value as typeof statusFilter)
                setPage(1)
              }}
              className="appearance-none rounded-lg border border-gray-300 bg-white py-2 pl-9 pr-8 text-sm outline-none focus:border-[#2302B3] focus:ring-1 focus:ring-[#2302B3]"
            >
              <option value="all">Tous les statuts</option>
              <option value="paid">Payé</option>
              <option value="pending">En attente</option>
              <option value="overdue">Impayé</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                <th className="px-4 py-3">Réf.</th>
                <th className="px-4 py-3">Élève</th>
                {viewMode === 'manage' && <th className="px-4 py-3">Parent</th>}
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3 text-right">Montant</th>
                <th className="px-4 py-3">Échéance</th>
                <th className="px-4 py-3">Statut</th>
                {viewMode === 'manage' && <th className="px-4 py-3">Méthode</th>}
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginated.length === 0 ? (
                <tr>
                  <td
                    colSpan={viewMode === 'manage' ? 9 : 7}
                    className="px-4 py-8 text-center text-gray-400"
                  >
                    Aucun paiement trouvé.
                  </td>
                </tr>
              ) : (
                paginated.map((p) => {
                  const cfg = STATUS_CONFIG[p.status]
                  return (
                    <tr key={p.id} className="transition-colors hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">{p.id}</td>
                      <td className="px-4 py-3 text-gray-700">{p.student}</td>
                      {viewMode === 'manage' && (
                        <td className="px-4 py-3 text-gray-700">{p.parent}</td>
                      )}
                      <td className="px-4 py-3 text-gray-700">{p.description}</td>
                      <td className="px-4 py-3 text-right font-semibold text-gray-900">
                        {formatCurrency(p.amount)}
                      </td>
                      <td className="px-4 py-3 text-gray-500">{p.dueDate}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${cfg.bg} ${cfg.text}`}
                        >
                          {cfg.label}
                        </span>
                      </td>
                      {viewMode === 'manage' && (
                        <td className="px-4 py-3 text-gray-500">{p.method || '—'}</td>
                      )}
                      <td className="px-4 py-3 text-center">
                        <div className="inline-flex items-center gap-1">
                          <button
                            type="button"
                            title="Voir"
                            className="rounded p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          {viewMode === 'manage' && p.status !== 'paid' && (
                            <button
                              type="button"
                              title="Marquer comme payé"
                              className="rounded p-1.5 text-white transition-colors hover:opacity-90"
                              style={{ backgroundColor: BRAND }}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>
            {filtered.length === 0
              ? 'Aucun résultat'
              : `${(safePage - 1) * PAGE_SIZE + 1}–${Math.min(safePage * PAGE_SIZE, filtered.length)} sur ${filtered.length}`}
          </span>
          <div className="inline-flex items-center gap-1">
            <button
              type="button"
              disabled={safePage <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="rounded-lg border border-gray-300 p-1.5 transition-colors hover:bg-gray-100 disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setPage(n)}
                className={`rounded-lg px-3 py-1.5 font-medium transition-colors ${
                  n === safePage ? 'text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
                style={n === safePage ? { backgroundColor: BRAND } : undefined}
              >
                {n}
              </button>
            ))}
            <button
              type="button"
              disabled={safePage >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="rounded-lg border border-gray-300 p-1.5 transition-colors hover:bg-gray-100 disabled:opacity-40"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
