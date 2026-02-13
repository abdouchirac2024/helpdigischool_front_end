'use client'

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react'
import { User, UserRole } from '@/types/models/user'
import {
  LoginRequest,
  LoginResponse,
  RegisterSchoolRequest,
  RegisterResponse,
} from '@/types/api/auth'
import { apiClient, setAuthToken, removeAuthToken } from '@/lib/api/client'
import { API_ENDPOINTS } from '@/lib/api/config'
import { useRouter } from 'next/navigation'

// Token storage keys
const TOKEN_KEY = 'auth_token'
const REFRESH_TOKEN_KEY = 'refresh_token'
const USER_KEY = 'auth_user'

// Backend role to frontend role mapping
const BACKEND_ROLE_MAP: Record<string, UserRole> = {
  SUPER_ADMIN: 'admin',
  ADMIN_ECOLE: 'director',
  ENSEIGNANT: 'teacher',
  PARENT: 'parent',
  SECRETAIRE: 'secretary',
  COMPTABLE: 'secretary', // Map comptable to secretary for now
}

// Convert backend user response to frontend User type
function mapBackendUserToFrontend(backendUser: BackendUserResponse): User {
  const frontendRole = BACKEND_ROLE_MAP[backendUser.role] || 'director'

  return {
    id: String(backendUser.id),
    email: backendUser.email,
    role: frontendRole,
    status: 'active',
    profile: {
      firstName: backendUser.prenom,
      lastName: backendUser.nom,
    },
    schoolId: backendUser.tenantId,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
}

// Backend API response types
interface BackendUserResponse {
  id: number
  email: string
  nom: string
  prenom: string
  role: string
  tenantId: string
}

interface BackendLoginResponse {
  accessToken: string
  refreshToken: string
  tokenType: string
  expiresIn: number
  user: BackendUserResponse
}

// Cookie helpers for middleware access
function setCookie(name: string, value: string, days: number = 7) {
  if (typeof document === 'undefined') return
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`
}

function deleteCookie(name: string) {
  if (typeof document === 'undefined') return
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export interface AuthContextType extends AuthState {
  login: (credentials: LoginRequest) => Promise<LoginResponse>
  register: (data: RegisterSchoolRequest) => Promise<RegisterResponse>
  logout: () => Promise<void>
  refreshSession: () => Promise<void>
  clearError: () => void
  hasPermission: (permission: keyof User) => boolean
  isRole: (role: UserRole | UserRole[]) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Role to dashboard path mapping
export const ROLE_DASHBOARD_PATHS: Record<UserRole, string> = {
  admin: '/dashboard/admin',
  director: '/dashboard/director',
  teacher: '/dashboard/teacher',
  parent: '/dashboard/parent',
  secretary: '/dashboard/secretary',
}

// Extended to include student role
export const ROLE_DASHBOARD_PATHS_EXTENDED: Record<string, string> = {
  ...ROLE_DASHBOARD_PATHS,
  student: '/dashboard/student',
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter()
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  })

  // Initialize auth state from storage
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem(TOKEN_KEY)
        const storedUser = localStorage.getItem(USER_KEY)

        if (token && storedUser) {
          const user = JSON.parse(storedUser) as User
          setAuthToken(token)

          // Verify token with backend via apiClient (utilise le proxy CORS)
          try {
            const backendUser = await apiClient.get<BackendUserResponse>(API_ENDPOINTS.auth.me)
            const frontendUser = mapBackendUserToFrontend(backendUser)

            setState({
              user: frontendUser,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            })

            localStorage.setItem(USER_KEY, JSON.stringify(frontendUser))
          } catch {
            // API error, use stored user
            setState({
              user: user,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            })
          }
        } else {
          setState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          })
        }
      } catch {
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        })
      }
    }

    initAuth()
  }, [])

  const clearAuthStorage = () => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    deleteCookie(TOKEN_KEY)
    removeAuthToken()
  }

  const login = useCallback(async (credentials: LoginRequest): Promise<LoginResponse> => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }))

    try {
      // Call backend via apiClient (utilise le proxy CORS + retry)
      const backendResponse = await apiClient.post<BackendLoginResponse>(API_ENDPOINTS.auth.login, {
        email: credentials.email,
        password: credentials.password,
      })

      // Convert backend user to frontend user
      const frontendUser = mapBackendUserToFrontend(backendResponse.user)

      const loginResponse: LoginResponse = {
        success: true,
        user: frontendUser,
        accessToken: backendResponse.accessToken,
        refreshToken: backendResponse.refreshToken,
        expiresIn: backendResponse.expiresIn / 1000, // Convert ms to seconds
      }

      // Store tokens and user
      setAuthToken(loginResponse.accessToken)
      localStorage.setItem(TOKEN_KEY, loginResponse.accessToken)
      localStorage.setItem(REFRESH_TOKEN_KEY, loginResponse.refreshToken)
      localStorage.setItem(USER_KEY, JSON.stringify(loginResponse.user))
      // Set cookie for middleware
      setCookie(TOKEN_KEY, loginResponse.accessToken, credentials.rememberMe ? 30 : 7)

      setState({
        user: loginResponse.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      })

      return loginResponse
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erreur de connexion'
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: message,
      }))
      throw error
    }
  }, [])

  const register = useCallback(async (data: RegisterSchoolRequest): Promise<RegisterResponse> => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }))

    try {
      // Call backend via apiClient (utilise le proxy CORS + retry)
      const backendResponse = await apiClient.post<BackendLoginResponse>(
        API_ENDPOINTS.auth.register,
        data
      )

      const frontendUser = mapBackendUserToFrontend(backendResponse.user)

      // Save tokens and user (auto-login after registration)
      setAuthToken(backendResponse.accessToken)
      localStorage.setItem(TOKEN_KEY, backendResponse.accessToken)
      localStorage.setItem(REFRESH_TOKEN_KEY, backendResponse.refreshToken)
      localStorage.setItem(USER_KEY, JSON.stringify(frontendUser))
      setCookie(TOKEN_KEY, backendResponse.accessToken)

      setState((prev) => ({
        ...prev,
        isAuthenticated: true,
        user: frontendUser,
        isLoading: false,
      }))

      const response: RegisterResponse = {
        success: true,
        message: 'École enregistrée avec succès. Vous êtes maintenant connecté.',
        schoolId: frontendUser.schoolId || '',
        userId: frontendUser.id,
      }

      return response
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur lors de l'inscription"
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: message,
      }))
      throw error
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY)
      if (refreshToken) {
        await apiClient.post(API_ENDPOINTS.auth.logout, { refreshToken }).catch(() => {})
      }
    } finally {
      clearAuthStorage()
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      })
      router.push('/login')
    }
  }, [router])

  const refreshSession = useCallback(async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY)
    if (!refreshToken) {
      throw new Error('No session available')
    }

    try {
      const backendResponse = await apiClient.post<BackendLoginResponse>(
        API_ENDPOINTS.auth.refresh,
        { refreshToken }
      )
      const frontendUser = mapBackendUserToFrontend(backendResponse.user)

      setAuthToken(backendResponse.accessToken)
      localStorage.setItem(TOKEN_KEY, backendResponse.accessToken)
      localStorage.setItem(REFRESH_TOKEN_KEY, backendResponse.refreshToken)
      localStorage.setItem(USER_KEY, JSON.stringify(frontendUser))

      setState((prev) => ({
        ...prev,
        user: frontendUser,
        isAuthenticated: true,
      }))
    } catch {
      clearAuthStorage()
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: 'Session expirée',
      })
      throw new Error('Session expired')
    }
  }, [])

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }))
  }, [])

  const hasPermission = useCallback(
    (permission: keyof User): boolean => {
      if (!state.user) return false
      return Boolean(state.user[permission])
    },
    [state.user]
  )

  const isRole = useCallback(
    (role: UserRole | UserRole[]): boolean => {
      if (!state.user) return false
      if (Array.isArray(role)) {
        return role.includes(state.user.role)
      }
      return state.user.role === role
    },
    [state.user]
  )

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    refreshSession,
    clearError,
    hasPermission,
    isRole,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export { AuthContext }
