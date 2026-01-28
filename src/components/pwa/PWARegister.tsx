'use client'

import { useEffect } from 'react'

export function PWARegister() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
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
          ) // Toutes les heures
        })
        .catch((error) => {
          console.log('SW registration failed:', error)
        })

      // Ecouter les mises a jour du SW
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        // Nouvelle version disponible
        if (window.confirm('Une nouvelle version est disponible. Recharger la page ?')) {
          window.location.reload()
        }
      })
    }
  }, [])

  return null
}
