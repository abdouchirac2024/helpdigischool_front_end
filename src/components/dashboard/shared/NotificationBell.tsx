'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Bell, CheckCircle, XCircle, Info, CheckCheck, Loader2 } from 'lucide-react'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { apiClient } from '@/lib/api/client'
import { API_ENDPOINTS } from '@/lib/api/config'
import { useAuth } from '@/lib/auth/auth-context'
import type {
  AppNotification,
  NotificationType,
  UnreadCountResponse,
} from '@/types/models/notification'
import Link from 'next/link'

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
  if (diffDays < 7) return `Il y a ${diffDays}j`
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
}

function getNotifConfig(type: NotificationType) {
  switch (type) {
    case 'VALIDATION_ECOLE':
      return {
        icon: <CheckCircle className="h-5 w-5" />,
        color: 'text-green-500',
        bg: 'bg-green-50',
        ring: 'ring-green-200',
      }
    case 'REJET_ECOLE':
      return {
        icon: <XCircle className="h-5 w-5" />,
        color: 'text-red-500',
        bg: 'bg-red-50',
        ring: 'ring-red-200',
      }
    case 'INFO':
    default:
      return {
        icon: <Info className="h-5 w-5" />,
        color: 'text-blue-500',
        bg: 'bg-blue-50',
        ring: 'ring-blue-200',
      }
  }
}

// Map role to notifications page path
const ROLE_NOTIF_PATH: Record<string, string> = {
  admin: '/dashboard/admin/notifications',
  director: '/dashboard/director/notifications',
  teacher: '/dashboard/teacher/notifications',
  parent: '/dashboard/parent/notifications',
  secretary: '/dashboard/secretary/notifications',
  student: '/dashboard/student/notifications',
}

export function NotificationBell() {
  const [unreadCount, setUnreadCount] = useState(0)
  const [notifications, setNotifications] = useState<AppNotification[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [markingAll, setMarkingAll] = useState(false)
  const prevCountRef = useRef(0)
  const [hasNew, setHasNew] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const { user } = useAuth()
  const notifPageHref = ROLE_NOTIF_PATH[user?.role ?? ''] ?? '/dashboard/admin/notifications'

  const fetchUnreadCount = useCallback(async () => {
    try {
      const res = await apiClient.get<UnreadCountResponse>(API_ENDPOINTS.notifications.unreadCount)
      const count = typeof res === 'number' ? res : (res.count ?? 0)
      // Detecter les nouvelles notifications
      if (count > prevCountRef.current && prevCountRef.current > 0) {
        setHasNew(true)
        setTimeout(() => setHasNew(false), 3000)
      }
      prevCountRef.current = count
      setUnreadCount(count)
    } catch {
      setUnreadCount(0)
    }
  }, [])

  const fetchNotifications = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await apiClient.get<AppNotification[]>(API_ENDPOINTS.notifications.unread)
      setNotifications(data)
    } catch {
      setNotifications([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleMarkAsRead = async (notif: AppNotification) => {
    try {
      await apiClient.put(API_ENDPOINTS.notifications.markAsRead(String(notif.id)))
      setNotifications((prev) => prev.filter((n) => n.id !== notif.id))
      setUnreadCount((prev) => Math.max(0, prev - 1))
    } catch {
      // Silently fail
    }
  }

  const handleMarkAllAsRead = async () => {
    setMarkingAll(true)
    try {
      await apiClient.put(API_ENDPOINTS.notifications.markAllAsRead)
      setNotifications([])
      setUnreadCount(0)
    } catch {
      // Silently fail
    } finally {
      setMarkingAll(false)
    }
  }

  // Écouter les notifications push temps réel via WebSocket
  useEffect(() => {
    const handleNewNotification = (e: Event) => {
      const notif = (e as CustomEvent<AppNotification>).detail
      setUnreadCount((prev) => prev + 1)
      prevCountRef.current += 1
      setHasNew(true)
      setTimeout(() => setHasNew(false), 3000)
      // Si le popover est ouvert, insérer la notif en tête de liste
      if (isOpen) {
        setNotifications((prev) => [notif, ...prev])
      }
    }
    window.addEventListener('notification:new', handleNewNotification)
    return () => window.removeEventListener('notification:new', handleNewNotification)
  }, [isOpen])

  // Poll toutes les 5 min comme filet de sécurité (WebSocket gère le temps réel)
  useEffect(() => {
    fetchUnreadCount()

    function startPolling() {
      if (intervalRef.current) clearInterval(intervalRef.current)
      intervalRef.current = setInterval(fetchUnreadCount, 300_000)
    }

    function stopPolling() {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    function handleVisibilityChange() {
      if (document.hidden) {
        stopPolling()
      } else {
        fetchUnreadCount()
        startPolling()
      }
    }

    startPolling()
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      stopPolling()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [fetchUnreadCount])

  // Charger quand on ouvre
  useEffect(() => {
    if (isOpen) fetchNotifications()
  }, [isOpen, fetchNotifications])

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="relative rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
        >
          <Bell className={`h-5 w-5 ${hasNew ? 'animate-[ring_0.5s_ease-in-out_2]' : ''}`} />

          {/* Badge compteur */}
          {unreadCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold leading-none text-white shadow-sm">
              {unreadCount > 99 ? '99+' : unreadCount}
              {/* Pulse animation pour nouvelles notifs */}
              <span
                className="absolute inset-0 animate-ping rounded-full bg-red-400 opacity-40"
                style={{ animationDuration: '2s' }}
              />
            </span>
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-96 overflow-hidden rounded-xl border border-gray-200 p-0 shadow-xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-gradient-to-r from-primary to-secondary px-4 py-3">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-white/80" />
            <h3 className="text-sm font-semibold text-white">Notifications</h3>
            {unreadCount > 0 && (
              <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-bold text-white">
                {unreadCount}
              </span>
            )}
          </div>
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              disabled={markingAll}
              className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-50"
            >
              {markingAll ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <CheckCheck className="h-3 w-3" />
              )}
              Tout lire
            </button>
          )}
        </div>

        {/* Liste */}
        <div className="max-h-[380px] overflow-y-auto">
          {isLoading ? (
            <div className="space-y-0">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-start gap-3 border-b border-gray-100 px-4 py-3">
                  <div className="h-9 w-9 animate-pulse rounded-lg bg-gray-200" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3.5 w-3/4 animate-pulse rounded bg-gray-200" />
                    <div className="h-3 w-full animate-pulse rounded bg-gray-100" />
                    <div className="h-2.5 w-16 animate-pulse rounded bg-gray-100" />
                  </div>
                </div>
              ))}
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-3 rounded-full bg-gray-100 p-3">
                <Bell className="h-6 w-6 text-gray-400" />
              </div>
              <p className="text-sm font-medium text-gray-500">Tout est lu !</p>
              <p className="mt-0.5 text-xs text-gray-400">Aucune notification non lue</p>
            </div>
          ) : (
            notifications.slice(0, 8).map((notif) => {
              const cfg = getNotifConfig(notif.type)
              return (
                <button
                  key={notif.id}
                  onClick={() => handleMarkAsRead(notif)}
                  className="group flex w-full items-start gap-3 border-b border-gray-100 px-4 py-3 text-left transition-all duration-150 hover:bg-gray-50"
                >
                  {/* Icone avec fond couleur */}
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${cfg.bg} ${cfg.color}`}
                  >
                    {cfg.icon}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold text-gray-900 group-hover:text-primary">
                        {notif.titre}
                      </p>
                      {/* Point bleu non-lu */}
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    </div>
                    <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-gray-500">
                      {notif.message}
                    </p>
                    <p className="mt-1 text-[11px] font-medium text-gray-400">
                      {formatRelativeTime(notif.createdAt)}
                    </p>
                  </div>
                </button>
              )
            })
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 bg-gray-50/50 px-4 py-2.5">
          <Link
            href={notifPageHref}
            className="flex items-center justify-center gap-1 rounded-lg py-1 text-xs font-semibold text-primary transition-colors hover:text-primary-dark"
            onClick={() => setIsOpen(false)}
          >
            Voir toutes les notifications
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  )
}
