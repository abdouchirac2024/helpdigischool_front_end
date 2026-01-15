'use client'

import { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react'
import { Language, t as translate } from './translations'

const LANGUAGE_KEY = 'app_language'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
  t: (key: string) => string
  isHydrated: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

interface LanguageProviderProps {
  children: ReactNode
  defaultLanguage?: Language
}

export function LanguageProvider({ children, defaultLanguage = 'fr' }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(defaultLanguage)
  const [isHydrated, setIsHydrated] = useState(false)

  // Load language from localStorage after hydration
  useEffect(() => {
    setIsHydrated(true)
    const stored = localStorage.getItem(LANGUAGE_KEY)
    if (stored === 'fr' || stored === 'en') {
      setLanguageState(stored)
    }
  }, [])

  // Save language to localStorage when it changes
  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
    if (typeof window !== 'undefined') {
      localStorage.setItem(LANGUAGE_KEY, lang)
    }
  }, [])

  // Toggle between fr and en
  const toggleLanguage = useCallback(() => {
    const newLang = language === 'fr' ? 'en' : 'fr'
    setLanguage(newLang)
  }, [language, setLanguage])

  // Translation function with current language
  const t = useCallback((key: string) => {
    return translate(key, language)
  }, [language])

  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo(() => ({
    language,
    setLanguage,
    toggleLanguage,
    t,
    isHydrated
  }), [language, setLanguage, toggleLanguage, t, isHydrated])

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export { LanguageContext }