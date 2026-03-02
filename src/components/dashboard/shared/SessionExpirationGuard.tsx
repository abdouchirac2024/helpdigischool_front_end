'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { useAuth, TOKEN_EXPIRES_AT_KEY } from '@/lib/auth'
import { Clock, RefreshCw, LogOut } from 'lucide-react'

// Constants
const WARNING_BEFORE_MS = 120_000 // Show modal 2 min before expiration
const COUNTDOWN_SECONDS = 60 // 60 seconds to decide
const CHECK_INTERVAL_MS = 30_000 // Check every 30s

export function SessionExpirationGuard() {
  const { isAuthenticated, tokenExpiresAt, refreshSession, logout } = useAuth()
  const [showModal, setShowModal] = useState(false)
  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const checkRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const closeModal = useCallback(() => {
    setIsClosing(true)
    setTimeout(() => {
      setShowModal(false)
      setIsClosing(false)
      setCountdown(COUNTDOWN_SECONDS)
    }, 200)
  }, [])

  const handleContinue = useCallback(async () => {
    setIsRefreshing(true)
    try {
      await refreshSession()
      closeModal()
    } catch {
      // If refresh fails, logout
      await logout()
    } finally {
      setIsRefreshing(false)
    }
  }, [refreshSession, logout, closeModal])

  const handleLogout = useCallback(async () => {
    closeModal()
    await logout()
  }, [logout, closeModal])

  // Main check interval: every 30s, check if we're within 2 min of expiration
  useEffect(() => {
    if (!isAuthenticated) return

    const checkExpiration = () => {
      const storedExpiresAt = localStorage.getItem(TOKEN_EXPIRES_AT_KEY)
      if (!storedExpiresAt) return

      const expiresAt = Number(storedExpiresAt)
      const timeLeft = expiresAt - Date.now()

      if (timeLeft <= 0) {
        // Already expired — defer logout to avoid setState-during-render
        setTimeout(() => logout(), 0)
        return
      }

      if (timeLeft <= WARNING_BEFORE_MS && !showModal) {
        setShowModal(true)
        setCountdown(Math.min(COUNTDOWN_SECONDS, Math.floor(timeLeft / 1000)))
      }
    }

    // Check immediately
    checkExpiration()

    checkRef.current = setInterval(checkExpiration, CHECK_INTERVAL_MS)

    return () => {
      if (checkRef.current) clearInterval(checkRef.current)
    }
  }, [isAuthenticated, showModal, logout])

  // Countdown timer when modal is visible
  useEffect(() => {
    if (!showModal || isClosing) {
      if (countdownRef.current) clearInterval(countdownRef.current)
      return
    }

    countdownRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          // Time's up — defer logout to next tick to avoid setState-during-render
          setTimeout(() => logout(), 0)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      if (countdownRef.current) clearInterval(countdownRef.current)
    }
  }, [showModal, isClosing, logout])

  // Multi-tab sync via storage event
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'auth_user' && !e.newValue) {
        // User logged out in another tab -> close modal and redirect
        setShowModal(false)
        window.location.href = '/login'
        return
      }

      if (e.key === TOKEN_EXPIRES_AT_KEY && e.newValue) {
        // Token refreshed in another tab -> close modal and reset
        const newExpiresAt = Number(e.newValue)
        const timeLeft = newExpiresAt - Date.now()
        if (timeLeft > WARNING_BEFORE_MS) {
          closeModal()
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [closeModal])

  if (!showModal) return null

  // SVG circular progress
  const radius = 54
  const circumference = 2 * Math.PI * radius
  const progress = countdown / COUNTDOWN_SECONDS
  const strokeDashoffset = circumference * (1 - progress)

  // Color transitions: green -> orange -> red
  const getColor = () => {
    if (countdown > 40) return '#22c55e' // green
    if (countdown > 20) return '#f97316' // orange
    return '#ef4444' // red
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-200 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(4px)' }}
    >
      <div
        className={`relative w-full max-w-md rounded-2xl bg-white shadow-2xl transition-transform duration-200 dark:bg-gray-900 ${
          isClosing ? 'scale-95' : 'scale-100'
        }`}
        style={{ animation: isClosing ? 'none' : 'scaleIn 0.2s ease-out' }}
      >
        {/* Header with icon */}
        <div className="flex flex-col items-center rounded-t-2xl bg-gradient-to-br from-primary to-secondary px-6 pb-4 pt-8">
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white/20">
            <Clock className="h-7 w-7 text-white" style={{ animation: 'pulse 2s infinite' }} />
          </div>
          <h2 className="text-xl font-bold text-white">Votre session va expirer</h2>
        </div>

        {/* Body */}
        <div className="flex flex-col items-center px-6 py-8">
          {/* Circular countdown */}
          <div className="relative mb-6 flex h-36 w-36 items-center justify-center">
            <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
              {/* Background circle */}
              <circle cx="60" cy="60" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="8" />
              {/* Progress circle */}
              <circle
                cx="60"
                cy="60"
                r={radius}
                fill="none"
                stroke={getColor()}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.5s ease' }}
              />
            </svg>
            {/* Countdown number */}
            <span
              className="absolute text-4xl font-bold"
              style={{ color: getColor(), transition: 'color 0.5s ease' }}
            >
              {countdown}
            </span>
          </div>

          <p className="mb-8 text-center text-sm text-gray-600 dark:text-gray-400">
            Votre session expire dans <strong>{countdown} secondes</strong>.
            <br />
            Voulez-vous rester connect&eacute; ?
          </p>

          {/* Buttons */}
          <div className="flex w-full flex-col gap-3 sm:flex-row">
            <button
              onClick={handleContinue}
              disabled={isRefreshing}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-primary to-secondary px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:opacity-90 disabled:opacity-60"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Actualisation...' : 'Continuer la session'}
            </button>

            <button
              onClick={handleLogout}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-3 text-sm font-semibold text-red-600 transition-all hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950"
            >
              <LogOut className="h-4 w-4" />
              Se d&eacute;connecter
            </button>
          </div>
        </div>
      </div>

      {/* Keyframe animation */}
      <style>{`
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </div>
  )
}
