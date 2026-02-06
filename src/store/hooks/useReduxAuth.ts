'use client'

import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '../hooks'
import {
  loginAsync,
  logoutAsync,
  registerAsync,
  refreshSessionAsync,
  clearError,
  selectUser,
  selectIsAuthenticated,
  selectIsLoading,
  selectAuthError,
  selectIsInitialized,
} from '../slices/authSlice'
import { LoginRequest, LoginResponse, RegisterSchoolRequest } from '@/types/api/auth'
import { User, UserRole } from '@/types/models/user'

// Role to dashboard path mapping
export const ROLE_DASHBOARD_PATHS: Record<UserRole, string> = {
  admin: '/dashboard/admin',
  director: '/dashboard/director',
  teacher: '/dashboard/teacher',
  parent: '/dashboard/parent',
  secretary: '/dashboard/secretary',
  student: '/dashboard/student',
}

export const ROLE_DASHBOARD_PATHS_EXTENDED: Record<string, string> = {
  ...ROLE_DASHBOARD_PATHS,
  ADMIN: '/dashboard/admin',
  DIRECTEUR: '/dashboard/director',
  ENSEIGNANT: '/dashboard/teacher',
  PARENT: '/dashboard/parent',
  SECRETAIRE: '/dashboard/secretary',
  ELEVE: '/dashboard/student',
}

/**
 * Hook Redux pour l'authentification
 * API compatible avec l'ancien useAuth() basé sur Context
 */
export function useReduxAuth() {
  const dispatch = useAppDispatch()
  const router = useRouter()

  // Selectors
  const user = useAppSelector(selectUser)
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const isLoading = useAppSelector(selectIsLoading)
  const error = useAppSelector(selectAuthError)
  const isInitialized = useAppSelector(selectIsInitialized)

  // Actions
  const login = useCallback(
    async (credentials: LoginRequest): Promise<LoginResponse> => {
      const result = await dispatch(loginAsync(credentials)).unwrap()
      return result
    },
    [dispatch]
  )

  const register = useCallback(
    async (data: RegisterSchoolRequest): Promise<LoginResponse> => {
      const result = await dispatch(registerAsync(data)).unwrap()
      return result
    },
    [dispatch]
  )

  const logout = useCallback(async (): Promise<void> => {
    await dispatch(logoutAsync())
    router.push('/login')
  }, [dispatch, router])

  const refreshSession = useCallback(async (): Promise<void> => {
    await dispatch(refreshSessionAsync())
  }, [dispatch])

  const handleClearError = useCallback(() => {
    dispatch(clearError())
  }, [dispatch])

  // Permission helpers
  const hasPermission = useCallback(
    (permission: keyof User): boolean => {
      if (!user) return false
      return user[permission] !== undefined
    },
    [user]
  )

  const isRole = useCallback(
    (role: UserRole | UserRole[]): boolean => {
      if (!user) return false
      if (Array.isArray(role)) {
        return role.includes(user.role)
      }
      return user.role === role
    },
    [user]
  )

  return {
    // State
    user,
    isAuthenticated,
    isLoading,
    error,
    isInitialized,

    // Actions
    login,
    register,
    logout,
    refreshSession,
    clearError: handleClearError,

    // Helpers
    hasPermission,
    isRole,
  }
}

export default useReduxAuth
