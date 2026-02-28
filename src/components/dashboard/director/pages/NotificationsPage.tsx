'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Bell,
  Check,
  CheckCheck,
  CheckCircle,
  XCircle,
  Info,
  Loader2,
  RefreshCw,
  Search,
  X,
  Clock,
} from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { apiClient } from '@/lib/api/client'
import { API_ENDPOINTS } from '@/lib/api/config'
import type {
  AppNotification,
  NotificationType,
  UnreadCountResponse,
} from '@/types/models/notification'

function formatRelativeTime(dateString: string): string {
  const now = new Date()
  const date = new Date(dateString)
  const diffMs = now.getTime() - date.getTime()
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHours = Math.floor(diffMin / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffSec < 60) return "À l'instant"
  if (diffMin < 60) return `Il y a ${diffMin} min`
  if (diffHours < 24) return `Il y a ${diffHours}h`
  if (diffDays === 1) return 'Hier'
  if (diffDays < 7) return `Il y a ${diffDays} jour${diffDays > 1 ? 's' : ''}`
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

function getNotifConfig(type: NotificationType) {
  switch (type) {
    case 'VALIDATION_ECOLE':
      return {
        icon: CheckCircle,
        color: 'text-green-500',
        bg: 'bg-green-50',
        border: 'border-green-200',
        label: 'Validation',
      }
    case 'REJET_ECOLE':
      return {
        icon: XCircle,
        color: 'text-red-500',
        bg: 'bg-red-50',
        border: 'border-red-200',
        label: 'Rejet',
      }
    case 'INFO':
    default:
      return {
        icon: Info,
        color: 'text-blue-500',
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        label: 'Information',
      }
  }
}

type FilterType = 'all' | 'unread' | NotificationType

export function DirectorNotificationsPage() {
  const [notifications, setNotifications] = useState<AppNotification[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [filter, setFilter] = useState<FilterType>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [markingAll, setMarkingAll] = useState(false)
  const [markingId, setMarkingId] = useState<number | null>(null)
  const [unreadCount, setUnreadCount] = useState(0)

  const fetchNotifications = useCallback(async () => {
    try {
      const [notifs, countRes] = await Promise.all([
        apiClient.get<AppNotification[]>(API_ENDPOINTS.notifications.base),
        apiClient.get<UnreadCountResponse>(API_ENDPOINTS.notifications.unreadCount),
      ])
      setNotifications(notifs)
      const count = typeof countRes === 'number' ? countRes : (countRes.count ?? 0)
      setUnreadCount(count)
      setError(false)
    } catch {
      setError(true)
    }
  }, [])

  async function initialLoad() {
    setLoading(true)
    await fetchNotifications()
    setLoading(false)
  }

  async function handleRefresh() {
    setRefreshing(true)
    await fetchNotifications()
    setRefreshing(false)
    toast.success('Notifications actualisées.')
  }

  useEffect(() => {
    initialLoad()
  }, [])

  async function handleMarkAsRead(notif: AppNotification) {
    if (notif.lu) return
    setMarkingId(notif.id)
    try {
      await apiClient.put(API_ENDPOINTS.notifications.markAsRead(String(notif.id)))
      setNotifications((prev) => prev.map((n) => (n.id === notif.id ? { ...n, lu: true } : n)))
      setUnreadCount((prev) => Math.max(0, prev - 1))
    } catch {
      toast.error('Erreur lors du marquage.')
    } finally {
      setMarkingId(null)
    }
  }

  async function handleMarkAllAsRead() {
    setMarkingAll(true)
    try {
      await apiClient.put(API_ENDPOINTS.notifications.markAllAsRead)
      setNotifications((prev) => prev.map((n) => ({ ...n, lu: true })))
      setUnreadCount(0)
      toast.success('Toutes les notifications marquées comme lues.')
    } catch {
      toast.error('Erreur lors du marquage.')
    } finally {
      setMarkingAll(false)
    }
  }

  // Filtrage
  const filteredNotifications = notifications.filter((n) => {
    // Filtre par type/statut
    if (filter === 'unread' && n.lu) return false
    if (filter !== 'all' && filter !== 'unread' && n.type !== filter) return false
    // Recherche
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      return n.titre.toLowerCase().includes(q) || n.message.toLowerCase().includes(q)
    }
    return true
  })

  // Grouper par date
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  const groups: { label: string; items: AppNotification[] }[] = []
  const todayItems: AppNotification[] = []
  const yesterdayItems: AppNotification[] = []
  const olderItems: AppNotification[] = []

  filteredNotifications.forEach((n) => {
    const d = new Date(n.createdAt)
    d.setHours(0, 0, 0, 0)
    if (d.getTime() >= today.getTime()) todayItems.push(n)
    else if (d.getTime() >= yesterday.getTime()) yesterdayItems.push(n)
    else olderItems.push(n)
  })
  if (todayItems.length > 0) groups.push({ label: "Aujourd'hui", items: todayItems })
  if (yesterdayItems.length > 0) groups.push({ label: 'Hier', items: yesterdayItems })
  if (olderItems.length > 0) groups.push({ label: 'Plus ancien', items: olderItems })

  // Filtres config
  const filters: { value: FilterType; label: string; count?: number }[] = [
    { value: 'all', label: 'Toutes', count: notifications.length },
    { value: 'unread', label: 'Non lues', count: unreadCount },
    { value: 'VALIDATION_ECOLE', label: 'Validations' },
    { value: 'REJET_ECOLE', label: 'Rejets' },
    { value: 'INFO', label: 'Informations' },
  ]

  // Loading skeleton
  if (loading) {
    return (
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-8 w-48 animate-pulse rounded-lg bg-gray-200" />
            <div className="mt-2 h-4 w-32 animate-pulse rounded bg-gray-200" />
          </div>
          <div className="flex gap-2">
            <div className="h-9 w-28 animate-pulse rounded-xl bg-gray-200" />
            <div className="h-9 w-36 animate-pulse rounded-xl bg-gray-200" />
          </div>
        </div>
        <div className="flex gap-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-9 w-24 animate-pulse rounded-xl bg-gray-200" />
          ))}
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-start gap-4 border-b border-gray-100 p-4">
              <div className="h-11 w-11 animate-pulse rounded-xl bg-gray-200" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
                <div className="h-3 w-full animate-pulse rounded bg-gray-100" />
                <div className="h-3 w-20 animate-pulse rounded bg-gray-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Error state
  if (error && notifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-16 text-center">
        <div className="mb-4 rounded-full bg-red-100 p-4">
          <Bell className="h-8 w-8 text-red-500" />
        </div>
        <h2 className="mb-2 text-xl font-semibold text-gray-900">
          Impossible de charger les notifications
        </h2>
        <p className="mb-6 max-w-md text-gray-500">Vérifiez votre connexion et réessayez.</p>
        <Button onClick={initialLoad} className="gap-2 bg-primary hover:bg-primary-dark">
          <RefreshCw className="h-4 w-4" />
          Réessayer
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="mt-1 text-gray-600">
            {unreadCount > 0 ? (
              <>
                <span className="font-semibold text-primary">{unreadCount}</span> non lue
                {unreadCount > 1 ? 's' : ''} &middot; {notifications.length} au total
              </>
            ) : (
              `${notifications.length} notification${notifications.length !== 1 ? 's' : ''}`
            )}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            Actualiser
          </Button>
          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={handleMarkAllAsRead}
              disabled={markingAll}
            >
              {markingAll ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <CheckCheck className="h-4 w-4" />
              )}
              Tout marquer lu
            </Button>
          )}
        </div>
      </div>

      {/* Stats mini */}
      <div className="grid grid-cols-3 gap-3">
        <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
            <Bell className="h-5 w-5 text-blue-500" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Total</p>
            <p className="text-lg font-bold text-gray-900">{notifications.length}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Info className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Non lues</p>
            <p className="text-lg font-bold text-primary">{unreadCount}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50">
            <CheckCircle className="h-5 w-5 text-green-500" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Lues</p>
            <p className="text-lg font-bold text-green-600">{notifications.length - unreadCount}</p>
          </div>
        </div>
      </div>

      {/* Filtres + Recherche */}
      <div className="rounded-xl border border-gray-100 bg-white p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* Recherche */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Rechercher dans les notifications..."
              className="pl-9 pr-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Filtres type */}
          <div className="flex flex-wrap gap-1.5">
            {filters.map((f) => {
              const isActive = filter === f.value
              return (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => setFilter(isActive && f.value !== 'all' ? 'all' : f.value)}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {f.label}
                  {f.count != null && f.count > 0 && (
                    <span
                      className={`rounded-full px-1.5 py-0.5 text-[10px] leading-none ${
                        isActive ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {f.count}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Liste des notifications groupees par date */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
        {filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 rounded-full bg-gray-100 p-4">
              <Bell className="h-8 w-8 text-gray-400" />
            </div>
            <p className="font-medium text-gray-500">
              {searchQuery
                ? 'Aucun résultat'
                : filter === 'unread'
                  ? 'Aucune notification non lue'
                  : 'Aucune notification'}
            </p>
            <p className="mt-1 text-sm text-gray-400">
              {searchQuery
                ? "Essayez avec d'autres termes de recherche."
                : 'Les nouvelles notifications apparaîtront ici.'}
            </p>
            {(searchQuery || filter !== 'all') && (
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => {
                  setSearchQuery('')
                  setFilter('all')
                }}
              >
                Réinitialiser les filtres
              </Button>
            )}
          </div>
        ) : (
          groups.map((group) => (
            <div key={group.label}>
              {/* Separateur de date */}
              <div className="sticky top-0 z-10 border-b border-gray-100 bg-gray-50/90 px-4 py-2 backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  {group.label}
                </p>
              </div>

              {/* Items */}
              {group.items.map((notif) => {
                const cfg = getNotifConfig(notif.type)
                const Icon = cfg.icon
                const isMarking = markingId === notif.id
                return (
                  <div
                    key={notif.id}
                    className={`group flex items-start gap-4 border-b border-gray-100 px-4 py-4 transition-all duration-200 ${
                      !notif.lu ? 'bg-primary/[0.03]' : 'hover:bg-gray-50'
                    }`}
                  >
                    {/* Icone */}
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${cfg.bg} ${cfg.color}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    {/* Contenu */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <p
                              className={`text-sm ${!notif.lu ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}
                            >
                              {notif.titre}
                            </p>
                            {!notif.lu && (
                              <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                            )}
                          </div>
                          <p
                            className={`mt-1 text-sm leading-relaxed ${!notif.lu ? 'text-gray-600' : 'text-gray-500'}`}
                          >
                            {notif.message}
                          </p>
                        </div>

                        {/* Tag type */}
                        <span
                          className={`shrink-0 rounded-md border px-2 py-0.5 text-[10px] font-semibold ${cfg.bg} ${cfg.color} ${cfg.border}`}
                        >
                          {cfg.label}
                        </span>
                      </div>

                      {/* Footer : time + actions */}
                      <div className="mt-2.5 flex items-center justify-between">
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                          <Clock className="h-3 w-3" />
                          {formatRelativeTime(notif.createdAt)}
                        </span>

                        {!notif.lu && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 gap-1 px-2 text-xs text-gray-500 opacity-0 transition-opacity group-hover:opacity-100"
                            onClick={() => handleMarkAsRead(notif)}
                            disabled={isMarking}
                          >
                            {isMarking ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                              <Check className="h-3 w-3" />
                            )}
                            Marquer lu
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
