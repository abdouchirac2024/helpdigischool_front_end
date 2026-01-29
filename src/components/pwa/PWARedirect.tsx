'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function PWARedirect() {
  const router = useRouter()

  useEffect(() => {
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      ('standalone' in window.navigator &&
        (window.navigator as unknown as { standalone: boolean }).standalone)

    if (isStandalone) {
      router.replace('/login')
    }
  }, [router])

  return null
}
