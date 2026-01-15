'use client'

import { useEffect } from 'react'
import { AlertTriangle, RefreshCw, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function DashboardError({ error, reset }: ErrorProps) {
  const router = useRouter()

  useEffect(() => {
    // Log l'erreur
    console.error('Dashboard error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="text-center">
          {/* Icon */}
          <div className="mx-auto w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mb-5">
            <AlertTriangle className="w-7 h-7 text-red-600" />
          </div>

          {/* Title */}
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Erreur de chargement
          </h2>

          {/* Description */}
          <p className="text-gray-600 mb-6">
            Impossible de charger cette page du tableau de bord.
            Veuillez reessayer.
          </p>

          {/* Error details (dev only) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6 text-left">
              <p className="text-xs font-medium text-gray-500 mb-1">
                Erreur:
              </p>
              <p className="text-sm text-gray-700 font-mono break-all">
                {error.message}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={reset}
              className="flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Reessayer
            </Button>

            <Button
              variant="outline"
              onClick={() => router.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}