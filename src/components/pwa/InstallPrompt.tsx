'use client'

import { useState, useEffect } from 'react'
import { X, Smartphone, Download, Share } from 'lucide-react'
import { useInstallPWA } from '@/hooks/use-install-pwa'

export function InstallPrompt() {
  const { canInstall, isIOS, isStandalone, dismissed, promptInstall, dismiss } = useInstallPWA()
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    if (isStandalone || dismissed) return
    // Show after 2nd visit or 15s on first visit
    const visitCount = parseInt(localStorage.getItem('pwa-visit-count') || '0', 10) + 1
    localStorage.setItem('pwa-visit-count', visitCount.toString())
    const delay = visitCount >= 2 ? 3000 : 15000
    const timer = setTimeout(() => setShowBanner(true), delay)
    return () => clearTimeout(timer)
  }, [isStandalone, dismissed])

  if (isStandalone || dismissed || !showBanner || !canInstall) return null

  return (
    <div className="fixed bottom-16 left-3 right-3 z-[90] mx-auto max-w-md sm:bottom-4 sm:left-4 sm:right-4 lg:bottom-6 lg:left-auto lg:right-6 lg:max-w-sm">
      <div className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-2xl shadow-black/10">
        {/* Header */}
        <div className="flex items-start gap-3 p-4 pb-2">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#2302B3] to-[#4318FF] shadow-lg shadow-[#2302B3]/25">
            <Smartphone className="h-6 w-6 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-base font-bold text-gray-900">Installer l&apos;application</h3>
            <p className="text-sm text-gray-500">Help Digi School</p>
          </div>
          <button
            onClick={dismiss}
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-4 pb-4">
          {isIOS ? (
            <p className="mb-3 text-sm text-gray-600">
              Pour installer, appuyez sur{' '}
              <span className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-700">
                <Share className="h-3 w-3" /> Partager
              </span>{' '}
              puis{' '}
              <span className="inline-block rounded-md bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-700">
                Sur l&apos;ecran d&apos;accueil
              </span>
            </p>
          ) : (
            <>
              <p className="mb-3 text-sm text-gray-600">
                Accedez rapidement a Help Digi School depuis votre ecran d&apos;accueil.
              </p>
              <button
                onClick={async () => {
                  const accepted = await promptInstall()
                  if (accepted) dismiss()
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#2302B3] to-[#4318FF] px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#2302B3]/25 transition-all hover:shadow-lg hover:shadow-[#2302B3]/30 active:scale-[0.98]"
              >
                <Download className="h-4 w-4" />
                Installer
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
