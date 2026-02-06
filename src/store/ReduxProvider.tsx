'use client'

import { useRef, useEffect } from 'react'
import { Provider } from 'react-redux'
import { store } from './store'
import { initializeAuthAsync } from './slices/authSlice'

interface ReduxProviderProps {
  children: React.ReactNode
}

export function ReduxProvider({ children }: ReduxProviderProps) {
  const storeRef = useRef(store)
  const initialized = useRef(false)

  // Initialize auth on mount
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true
      storeRef.current.dispatch(initializeAuthAsync())
    }
  }, [])

  return <Provider store={storeRef.current}>{children}</Provider>
}

export default ReduxProvider
