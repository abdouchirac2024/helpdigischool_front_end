'use client'

import { useEffect, useState } from 'react'

function UpdateToast({ onReload, onDismiss }: { onReload: () => void; onDismiss: () => void }) {
  return (
    <div
      role="alert"
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        background: '#1e293b',
        color: '#f8fafc',
        padding: '0.875rem 1.25rem',
        borderRadius: '0.75rem',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
        fontSize: '0.875rem',
        maxWidth: '90vw',
      }}
    >
      <span>Nouvelle version disponible</span>
      <button
        onClick={onReload}
        style={{
          background: '#2563eb',
          color: '#fff',
          border: 'none',
          padding: '0.375rem 0.875rem',
          borderRadius: '0.5rem',
          cursor: 'pointer',
          fontWeight: 600,
          fontSize: '0.8125rem',
          whiteSpace: 'nowrap',
        }}
      >
        Mettre à jour
      </button>
      <button
        onClick={onDismiss}
        aria-label="Fermer"
        style={{
          background: 'transparent',
          color: '#94a3b8',
          border: 'none',
          cursor: 'pointer',
          fontSize: '1.125rem',
          lineHeight: 1,
          padding: '0 0.25rem',
        }}
      >
        ✕
      </button>
    </div>
  )
}

export function PWARegister() {
  const [showUpdate, setShowUpdate] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return

    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('SW registered:', registration.scope)

        // Verifier les mises a jour periodiquement
        setInterval(
          () => {
            registration.update()
          },
          60 * 60 * 1000
        )
      })
      .catch((error) => {
        console.log('SW registration failed:', error)
      })

    // Ecouter les mises a jour du SW
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      setShowUpdate(true)
    })
  }, [])

  if (!showUpdate) return null

  return (
    <UpdateToast onReload={() => window.location.reload()} onDismiss={() => setShowUpdate(false)} />
  )
}
