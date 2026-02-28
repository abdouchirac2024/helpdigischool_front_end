'use client'

import {
  Building2,
  Users,
  CreditCard,
  Settings,
  FileText,
  Download,
  Calendar,
  RefreshCw,
  Wifi,
} from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { useDashboardStats } from '@/hooks/use-dashboard-stats'

export function AdminDashboard() {
  const { schoolStats, userStats, isLoading, refresh } = useDashboardStats('admin')

  const loading = isLoading
  const refreshing = false

  async function handleRefresh() {
    try {
      await refresh()
      toast.success('Statistiques actualisees.')
    } catch {
      toast.error('Erreur lors du rafraichissement.')
    }
  }

  const Skeleton = ({ className }: { className?: string }) => (
    <div className={`animate-pulse rounded bg-gray-200 ${className || ''}`} />
  )

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin SaaS</h1>
          <p className="mt-1 text-gray-600">Vue d&apos;ensemble de la plateforme</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2" onClick={handleRefresh} disabled={refreshing}>
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Actualisation...' : 'Actualiser'}
          </Button>
          <Button className="gap-2 bg-primary hover:bg-primary-dark">Nouvelle École</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 transition-all hover:shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
              <Building2 className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <p className="mb-1 text-sm text-gray-600">Écoles actives</p>
          {loading ? (
            <Skeleton className="h-9 w-16" />
          ) : (
            <p className="text-3xl font-bold text-gray-900">{schoolStats?.validees ?? '-'}</p>
          )}
          {schoolStats && (
            <div className="mt-2 flex items-center gap-1">
              <span className="rounded-full bg-yellow-50 px-2 py-1 text-xs font-semibold text-yellow-600">
                {schoolStats.enAttente} en attente
              </span>
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 transition-all hover:shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50">
              <Users className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <p className="mb-1 text-sm text-gray-600">Utilisateurs totaux</p>
          {loading ? (
            <Skeleton className="h-9 w-20" />
          ) : (
            <p className="text-3xl font-bold text-gray-900">
              {userStats?.total != null ? userStats.total.toLocaleString('fr-FR') : '-'}
            </p>
          )}
          {userStats && (
            <div className="mt-2 flex items-center gap-1">
              <span className="rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                {userStats.active} actifs
              </span>
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 transition-all hover:shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50">
              <Wifi className="h-6 w-6 text-teal-600" />
            </div>
          </div>
          <p className="mb-1 text-sm text-gray-600">Utilisateurs connectes</p>
          {loading ? (
            <Skeleton className="h-9 w-12" />
          ) : (
            <p className="text-3xl font-bold text-gray-900">{userStats?.connected ?? '-'}</p>
          )}
          {userStats && userStats.total > 0 && (
            <div className="mt-2 flex items-center gap-1">
              <span className="rounded-full bg-teal-50 px-2 py-1 text-xs font-semibold text-teal-600">
                {Math.round((userStats.connected / userStats.total) * 100)}% en ligne
              </span>
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 transition-all hover:shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50">
              <CreditCard className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <p className="mb-1 text-sm text-gray-600">Revenus mensuels</p>
          <p className="text-3xl font-bold text-gray-900">-</p>
          <div className="mt-2 flex items-center gap-1">
            <span className="rounded-full bg-gray-50 px-2 py-1 text-xs font-semibold text-gray-400">
              Bientot disponible
            </span>
          </div>
        </div>
      </div>

      {/* Actions rapides & Activite recente */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <h3 className="mb-6 text-lg font-semibold">Actions rapides</h3>
          <div className="space-y-3">
            {[
              {
                icon: Users,
                title: 'Inscrire une ecole',
                desc: 'Ajouter un nouvel etablissement',
                color: 'bg-blue-50',
                iconColor: 'text-blue-600',
              },
              {
                icon: Building2,
                title: 'Creer une classe',
                desc: 'Nouvelle classe scolaire',
                color: 'bg-purple-50',
                iconColor: 'text-purple-600',
              },
              {
                icon: FileText,
                title: 'Saisir des notes',
                desc: 'Enregistrer les evaluations',
                color: 'bg-green-50',
                iconColor: 'text-green-600',
              },
              {
                icon: Download,
                title: 'Generer les bulletins',
                desc: 'Creer des bulletins PDF',
                color: 'bg-orange-50',
                iconColor: 'text-orange-600',
              },
              {
                icon: Calendar,
                title: 'Gerer les Periodes',
                desc: 'Configurer les periodes scolaires',
                color: 'bg-pink-50',
                iconColor: 'text-pink-600',
              },
              {
                icon: Settings,
                title: 'Gerer les Niveaux',
                desc: "Configurer les niveaux d'etude",
                color: 'bg-indigo-50',
                iconColor: 'text-indigo-600',
              },
            ].map((action, i) => (
              <button
                key={i}
                className="group flex w-full items-center gap-4 rounded-xl p-4 text-left transition-colors hover:bg-gray-50"
              >
                <div
                  className={`h-12 w-12 rounded-xl ${action.color} flex items-center justify-center transition-transform group-hover:scale-110`}
                >
                  <action.icon className={`h-6 w-6 ${action.iconColor}`} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{action.title}</p>
                  <p className="text-sm text-gray-500">{action.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {/* Resumé ecoles */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6">
            <h3 className="mb-4 text-lg font-semibold">Resumé des ecoles</h3>
            {loading ? (
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-8 w-full" />
                ))}
              </div>
            ) : schoolStats ? (
              <div className="space-y-3">
                {[
                  { label: 'Total', value: schoolStats.total, color: 'text-gray-900' },
                  { label: 'Validees', value: schoolStats.validees, color: 'text-green-600' },
                  { label: 'En attente', value: schoolStats.enAttente, color: 'text-yellow-600' },
                  { label: 'Rejetees', value: schoolStats.rejetees, color: 'text-red-600' },
                  { label: 'Suspendues', value: schoolStats.suspendues, color: 'text-gray-500' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-2"
                  >
                    <span className="text-sm text-gray-600">{item.label}</span>
                    <span className={`text-lg font-bold ${item.color}`}>{item.value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">Donnees indisponibles</p>
            )}
          </div>

          {/* Resumé utilisateurs */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6">
            <h3 className="mb-4 text-lg font-semibold">Resumé des utilisateurs</h3>
            {loading ? (
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-8 w-full" />
                ))}
              </div>
            ) : userStats ? (
              <div className="space-y-3">
                {[
                  { label: 'Total', value: userStats.total, color: 'text-gray-900' },
                  { label: 'Actifs', value: userStats.active, color: 'text-green-600' },
                  { label: 'Connectes', value: userStats.connected, color: 'text-teal-600' },
                  { label: 'Inactifs', value: userStats.inactive, color: 'text-gray-500' },
                  { label: 'Verrouilles', value: userStats.locked, color: 'text-red-600' },
                  { label: 'En attente', value: userStats.pending, color: 'text-orange-600' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-2"
                  >
                    <span className="text-sm text-gray-600">{item.label}</span>
                    <span className={`text-lg font-bold ${item.color}`}>{item.value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">Donnees indisponibles</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
