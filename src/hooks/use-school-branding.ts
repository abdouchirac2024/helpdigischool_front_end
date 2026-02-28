'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { apiClient } from '@/lib/api/client'
import { API_ENDPOINTS } from '@/lib/api/config'
import { useAuth } from '@/lib/auth'
import type { SchoolBackend } from '@/types/models/school'
import React from 'react'

const DEFAULT_PRIMARY = '#2302B3'
const DEFAULT_SECONDARY = '#4318FF'

export interface SchoolBrandingValue {
  primaryColor: string
  secondaryColor: string
  logoUrl: string | null
  schoolName: string | null
  isLoading: boolean
  /** Call after saving branding to update the UI instantly */
  setBranding: (values: {
    primaryColor?: string
    secondaryColor?: string
    logoUrl?: string | null
  }) => void
}

const SchoolBrandingContext = createContext<SchoolBrandingValue>({
  primaryColor: DEFAULT_PRIMARY,
  secondaryColor: DEFAULT_SECONDARY,
  logoUrl: null,
  schoolName: null,
  isLoading: true,
  setBranding: () => {},
})

export function SchoolBrandingProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [primaryColor, setPrimaryColor] = useState(DEFAULT_PRIMARY)
  const [secondaryColor, setSecondaryColor] = useState(DEFAULT_SECONDARY)
  const [logoUrl, setLogoUrl] = useState<string | null>(null)
  const [schoolName, setSchoolName] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!user?.ecoleId) {
      setIsLoading(false)
      return
    }

    let cancelled = false
    async function fetch() {
      try {
        const s = await apiClient.get<SchoolBackend>(
          API_ENDPOINTS.schools.byId(String(user!.ecoleId))
        )
        if (cancelled) return
        setPrimaryColor(s.couleurPrimaire || DEFAULT_PRIMARY)
        setSecondaryColor(s.couleurSecondaire || DEFAULT_SECONDARY)
        setLogoUrl(s.logoUrl || null)
        setSchoolName(s.nom || null)
      } catch {
        // keep defaults
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }
    fetch()
    return () => {
      cancelled = true
    }
  }, [user?.ecoleId])

  const setBranding = useCallback(
    (values: { primaryColor?: string; secondaryColor?: string; logoUrl?: string | null }) => {
      if (values.primaryColor !== undefined) setPrimaryColor(values.primaryColor)
      if (values.secondaryColor !== undefined) setSecondaryColor(values.secondaryColor)
      if (values.logoUrl !== undefined) setLogoUrl(values.logoUrl)
    },
    []
  )

  return React.createElement(
    SchoolBrandingContext.Provider,
    { value: { primaryColor, secondaryColor, logoUrl, schoolName, isLoading, setBranding } },
    children
  )
}

export function useSchoolBranding(): SchoolBrandingValue {
  return useContext(SchoolBrandingContext)
}
