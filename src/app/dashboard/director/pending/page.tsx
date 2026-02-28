'use client'

import { useState, useEffect } from 'react'
import { Clock, AlertTriangle, RefreshCw, Mail, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { apiClient } from '@/lib/api/client'
import { API_ENDPOINTS } from '@/lib/api/config'
import type { AppNotification } from '@/types/models/notification'

type SchoolStatus = 'EN_ATTENTE' | 'REJETEE'

export default function PendingPage() {
  const [status, setStatus] = useState<SchoolStatus>('EN_ATTENTE')
  const [rejectionReason, setRejectionReason] = useState<string | null>(null)
  const [notifications, setNotifications] = useState<AppNotification[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const fetchNotifications = async () => {
    try {
      const data = await apiClient.get<AppNotification[]>(API_ENDPOINTS.notifications.base)
      setNotifications(data)

      // Check if there's a rejection notification
      const rejection = data.find((n) => n.type === 'REJET_ECOLE')
      if (rejection) {
        setStatus('REJETEE')
        setRejectionReason(rejection.message)
      }

      // Check if there's a validation notification — redirect to dashboard
      // Only redirect if the notification is recent (less than 5 minutes old)
      const validation = data.find((n) => {
        if (n.type !== 'VALIDATION_ECOLE') return false
        const age = Date.now() - new Date(n.createdAt).getTime()
        return age < 5 * 60 * 1000
      })
      if (validation) {
        window.location.href = '/dashboard/director'
      }
    } catch {
      // Silently fail — notifications are not critical
    }
  }

  useEffect(() => {
    setIsLoading(true)
    fetchNotifications().finally(() => setIsLoading(false))
  }, [])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await fetchNotifications()
    setIsRefreshing(false)
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <RefreshCw className="h-8 w-8 animate-spin text-[#2302B3]" />
      </div>
    )
  }

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Main status card */}
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          {status === 'EN_ATTENTE' ? (
            <>
              {/* Pending state */}
              <div className="mb-6 flex justify-center">
                <div className="rounded-full bg-[#2302B3]/10 p-6">
                  <Clock className="h-16 w-16 animate-pulse text-[#2302B3]" />
                </div>
              </div>

              <h1 className="mb-3 text-center text-2xl font-bold text-gray-900">
                Votre ecole est en cours de validation
              </h1>
              <p className="mb-8 text-center text-gray-500">
                Notre equipe examine votre inscription. Vous serez notifie des que votre ecole sera
                validee.
              </p>

              {/* Progress steps */}
              <div className="mb-8 space-y-4">
                {/* Step 1 - Done */}
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Inscription soumise</p>
                    <p className="text-sm text-gray-500">Votre demande a ete recue</p>
                  </div>
                </div>

                {/* Step 2 - In progress */}
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2302B3]/10">
                    <Clock className="h-5 w-5 animate-pulse text-[#2302B3]" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Examen en cours</p>
                    <p className="text-sm text-gray-500">Notre equipe verifie vos informations</p>
                  </div>
                </div>

                {/* Step 3 - Pending */}
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100">
                    <CheckCircle className="h-5 w-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-400">Validation</p>
                    <p className="text-sm text-gray-400">En attente de validation</p>
                  </div>
                </div>
              </div>

              {/* Email notice */}
              <div className="flex items-center gap-3 rounded-lg bg-blue-50 p-4">
                <Mail className="h-5 w-5 shrink-0 text-[#4318FF]" />
                <p className="text-sm text-gray-700">
                  Un email sera envoye a votre adresse une fois la validation effectuee.
                </p>
              </div>
            </>
          ) : (
            <>
              {/* Rejected state */}
              <div className="mb-6 flex justify-center">
                <div className="rounded-full bg-red-100 p-6">
                  <AlertTriangle className="h-16 w-16 text-red-600" />
                </div>
              </div>

              <h1 className="mb-3 text-center text-2xl font-bold text-gray-900">
                Votre inscription a ete rejetee
              </h1>

              {rejectionReason && (
                <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
                  <p className="text-sm font-medium text-red-800">Motif du rejet :</p>
                  <p className="mt-1 text-sm text-red-700">{rejectionReason}</p>
                </div>
              )}

              <div className="flex justify-center">
                <Button asChild className="bg-[#2302B3] hover:bg-[#2302B3]/90">
                  <a href="mailto:support@helpdigischool.com">
                    <Mail className="mr-2 h-4 w-4" />
                    Contacter le support
                  </a>
                </Button>
              </div>
            </>
          )}
        </div>

        {/* Refresh button */}
        <div className="mt-6 flex justify-center">
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Actualisation...' : 'Verifier le statut'}
          </Button>
        </div>

        {/* Recent notifications */}
        {notifications.length > 0 && (
          <div className="mt-8 rounded-2xl bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Notifications recentes</h2>
            <div className="space-y-3">
              {notifications.slice(0, 5).map((notification) => (
                <div
                  key={notification.id}
                  className={`rounded-lg border p-3 ${
                    notification.lu
                      ? 'border-gray-100 bg-gray-50'
                      : 'border-[#2302B3]/20 bg-[#2302B3]/5'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium text-gray-900">{notification.titre}</p>
                    {!notification.lu && (
                      <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-[#4318FF]" />
                    )}
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{notification.message}</p>
                  <p className="mt-1 text-xs text-gray-400">
                    {new Date(notification.createdAt).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
