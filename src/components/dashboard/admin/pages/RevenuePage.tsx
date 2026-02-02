'use client'

import { useState } from 'react'
import {
  CreditCard,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Wallet,
  PiggyBank,
  Receipt,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const monthlyData = [
  { month: 'Jan', revenue: 9800, target: 10000 },
  { month: 'Fév', revenue: 10200, target: 10000 },
  { month: 'Mar', revenue: 10800, target: 10500 },
  { month: 'Avr', revenue: 11200, target: 11000 },
  { month: 'Mai', revenue: 11500, target: 11000 },
  { month: 'Jun', revenue: 11800, target: 11500 },
  { month: 'Jul', revenue: 10500, target: 11500 },
  { month: 'Aoû', revenue: 9800, target: 10000 },
  { month: 'Sep', revenue: 12000, target: 12000 },
  { month: 'Oct', revenue: 12200, target: 12000 },
  { month: 'Nov', revenue: 12100, target: 12000 },
  { month: 'Déc', revenue: 12450, target: 12500 },
]

const transactions = [
  {
    id: 1,
    school: 'Lycée Bilingue de Yaoundé',
    type: 'Abonnement',
    amount: '+€199',
    date: "Aujourd'hui 14:30",
    status: 'completed',
  },
  {
    id: 2,
    school: 'Collège Saint-Michel',
    type: 'Abonnement',
    amount: '+€79',
    date: "Aujourd'hui 11:15",
    status: 'completed',
  },
  {
    id: 3,
    school: 'École Primaire Akwa',
    type: 'Renouvellement',
    amount: '+€29',
    date: 'Hier 16:45',
    status: 'completed',
  },
  {
    id: 4,
    school: 'Groupe Scolaire Excellence',
    type: 'Abonnement',
    amount: '+€79',
    date: 'Hier 09:20',
    status: 'completed',
  },
  {
    id: 5,
    school: 'Institut Polyvalent',
    type: 'Remboursement',
    amount: '-€199',
    date: '12/01/2025',
    status: 'refunded',
  },
  {
    id: 6,
    school: 'Collège Protestant',
    type: 'Abonnement',
    amount: '+€79',
    date: '11/01/2025',
    status: 'completed',
  },
]

export function AdminRevenuePage() {
  const [period, setPeriod] = useState('year')

  const maxRevenue = Math.max(...monthlyData.map((d) => d.revenue))

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Revenus</h1>
          <p className="mt-1 text-gray-600">Suivi des revenus et transactions</p>
        </div>
        <div className="flex gap-3">
          <div className="flex rounded-lg border border-gray-200 bg-white p-1">
            {['week', 'month', 'year'].map((p) => (
              <Button
                key={p}
                variant="ghost"
                size="sm"
                onClick={() => setPeriod(p)}
                className={period === p ? 'bg-[#2302B3] text-white hover:bg-[#1a0285]' : ''}
              >
                {p === 'week' ? 'Semaine' : p === 'month' ? 'Mois' : 'Année'}
              </Button>
            ))}
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Exporter
          </Button>
        </div>
      </div>

      {/* Revenue Stats */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="rounded-2xl bg-gradient-to-br from-[#2302B3] to-[#4318FF] p-6 text-white">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <div className="flex items-center gap-1 text-green-300">
              <ArrowUpRight className="h-4 w-4" />
              <span className="text-sm font-semibold">+24%</span>
            </div>
          </div>
          <p className="mb-1 text-sm text-white/70">Revenus totaux</p>
          <p className="text-3xl font-bold">€134,850</p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50">
              <Wallet className="h-6 w-6 text-green-600" />
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <ArrowUpRight className="h-4 w-4" />
              <span className="text-sm font-semibold">+18%</span>
            </div>
          </div>
          <p className="mb-1 text-sm text-gray-500">Ce mois</p>
          <p className="text-3xl font-bold text-gray-900">€12,450</p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
              <PiggyBank className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <ArrowUpRight className="h-4 w-4" />
              <span className="text-sm font-semibold">+5%</span>
            </div>
          </div>
          <p className="mb-1 text-sm text-gray-500">Revenu moyen/école</p>
          <p className="text-3xl font-bold text-gray-900">€98</p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50">
              <Receipt className="h-6 w-6 text-orange-600" />
            </div>
            <div className="flex items-center gap-1 text-red-600">
              <ArrowDownRight className="h-4 w-4" />
              <span className="text-sm font-semibold">-2%</span>
            </div>
          </div>
          <p className="mb-1 text-sm text-gray-500">Remboursements</p>
          <p className="text-3xl font-bold text-gray-900">€850</p>
        </div>
      </div>

      {/* Chart */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6">
        <h3 className="mb-6 text-lg font-semibold">Évolution des revenus</h3>
        <div className="flex h-64 items-end gap-2">
          {monthlyData.map((data, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex w-full flex-col items-center gap-1" style={{ height: '200px' }}>
                <div
                  className="w-full rounded-t-lg bg-[#2302B3] transition-all hover:bg-[#4318FF]"
                  style={{ height: `${(data.revenue / maxRevenue) * 100}%` }}
                />
              </div>
              <span className="text-xs text-gray-500">{data.month}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-center gap-6 border-t border-gray-100 pt-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded bg-[#2302B3]" />
            <span className="text-sm text-gray-600">Revenus réels</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded bg-gray-300" />
            <span className="text-sm text-gray-600">Objectif</span>
          </div>
        </div>
      </div>

      {/* Transactions */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
        <div className="flex items-center justify-between border-b border-gray-100 p-4">
          <h3 className="font-semibold text-gray-900">Transactions récentes</h3>
          <Button variant="ghost" size="sm">
            Voir tout
          </Button>
        </div>
        <div className="divide-y divide-gray-50">
          {transactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                    tx.status === 'refunded' ? 'bg-red-50' : 'bg-green-50'
                  }`}
                >
                  <CreditCard
                    className={`h-5 w-5 ${
                      tx.status === 'refunded' ? 'text-red-600' : 'text-green-600'
                    }`}
                  />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{tx.school}</p>
                  <p className="text-sm text-gray-500">
                    {tx.type} • {tx.date}
                  </p>
                </div>
              </div>
              <span
                className={`text-lg font-bold ${
                  tx.amount.startsWith('-') ? 'text-red-600' : 'text-green-600'
                }`}
              >
                {tx.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
