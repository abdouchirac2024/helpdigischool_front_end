'use client'

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react'
import { User, UserRole } from '@/types/models/user'
import {
  LoginRequest,
  LoginResponse,
  RegisterSchoolRequest,
  RegisterResponse,
} from '@/types/api/auth'
import { apiClient, removeAuthToken } from '@/lib/api/client'
import { API_ENDPOINTS } from '@/lib/api/config'
import { useRouter } from 'next/navigation'

// Storage keys (tokens JWT plus stockés ici — gérés par cookies HttpOnly côté backend)
const USER_KEY = 'auth_user'
export const TOKEN_EXPIRES_AT_KEY = 'token_expires_at'

// Backend role to frontend role mapping
const BACKEND_ROLE_MAP: Record<string, UserRole> = {
  SUPER_ADMIN: 'admin',
  ADMIN_ECOLE: 'director',
  ENSEIGNANT: 'teacher',
  PARENT: 'parent',
  SECRETAIRE: 'secretary',
  COMPTABLE: 'secretary', // Map comptable to secretary for now
  ELEVE: 'student',
}

// Convert backend user response to frontend User type
function mapBackendUserToFrontend(backendUser: BackendUserResponse): User {
  const frontendRole = BACKEND_ROLE_MAP[backendUser.role] || 'director'

  // Determine if school is pending/rejected
  const schoolStatus = backendUser.statutEcole || undefined

  return {
    id: String(backendUser.id),
    email: backendUser.email,
    role: frontendRole,
    status: 'active',
    profile: {
      firstName: backendUser.prenom,
      lastName: backendUser.nom,
      phone: backendUser.telephone || undefined,
      avatar: backendUser.avatarUrl || undefined,
    },
    schoolId: backendUser.tenantId,
    ecoleId: backendUser.ecoleId || undefined,
    schoolName: backendUser.ecoleNom || undefined,
    schoolStatus,
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
  telephone: string | null
  role: string
  tenantId: string
  ecoleId: number | null
  ecoleNom: string | null
  codeEcole: string | null
  statutEcole: string | null
  avatarUrl: string | null
}

interface BackendLoginResponse {
  accessToken: string
  refreshToken: string
  tokenType: string
  expiresIn: number
  user: BackendUserResponse
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  tokenExpiresAt: number | null
}

export interface AuthContextType extends AuthState {
  login: (credentials: LoginRequest) => Promise<LoginResponse>
  register: (data: RegisterSchoolRequest) => Promise<RegisterResponse>
  logout: () => Promise<void>
  refreshSession: () => Promise<void>
  clearError: () => void
  hasPermission: (permission: keyof User) => boolean
  isRole: (role: UserRole | UserRole[]) => boolean
  updateUser: (updates: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Role to dashboard path mapping
export const ROLE_DASHBOARD_PATHS: Record<UserRole, string> = {
  admin: '/dashboard/admin',
  director: '/dashboard/director',
  teacher: '/dashboard/teacher',
  parent: '/dashboard/parent',
  secretary: '/dashboard/secretary',
  student: '/dashboard/student',
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
    tokenExpiresAt: null,
  })

  // Initialize auth state — vérifie la session via cookie HttpOnly → /api/auth/me
  // Guard: on ne tente la vérification que si localStorage indique une session précédente.
  // Évite une boucle infinie sur /login (sans storedUser → pas d'appel → pas de 401 loop).
  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedUser = localStorage.getItem(USER_KEY)

        if (storedUser) {
          const storedExpiresAt = localStorage.getItem(TOKEN_EXPIRES_AT_KEY)
          const tokenExpiresAt = storedExpiresAt ? Number(storedExpiresAt) : null

          // Vérifier la session avec le backend via cookie (withCredentials auto).
          // Si le access_token est expiré, l'intercepteur axios tente un refresh automatique.
          try {
            const backendUser = await apiClient.get<BackendUserResponse>(API_ENDPOINTS.auth.me)
            const frontendUser = mapBackendUserToFrontend(backendUser)

            localStorage.setItem(USER_KEY, JSON.stringify(frontendUser))
            setState({
              user: frontendUser,
              isAuthenticated: true,
              isLoading: false,
              error: null,
              tokenExpiresAt,
            })
          } catch {
            // Cookie invalide ou expiré et refresh échoué → nettoyage
            clearAuthStorage()
            setState({
              user: null,
              isAuthenticated: false,
              isLoading: false,
              error: null,
              tokenExpiresAt: null,
            })
          }
        } else {
          setState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
            tokenExpiresAt: null,
          })
        }
      } catch {
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
          tokenExpiresAt: null,
        })
      }
    }

    initAuth()
  }, [])

  const clearAuthStorage = () => {
    localStorage.removeItem(USER_KEY)
    localStorage.removeItem(TOKEN_EXPIRES_AT_KEY)
    removeAuthToken() // no-op, conservé pour compatibilité
  }

  const login = useCallback(
    async (credentials: LoginRequest): Promise<LoginResponse> => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }))

      try {
        // Le backend pose les cookies HttpOnly access_token + refresh_token dans la réponse
        const backendResponse = await apiClient.post<BackendLoginResponse>(
          API_ENDPOINTS.auth.login,
          {
            login: credentials.login,
            password: credentials.password,
          }
        )

        const frontendUser = mapBackendUserToFrontend(backendResponse.user)

        const loginResponse: LoginResponse = {
          success: true,
          user: frontendUser,
          accessToken: backendResponse.accessToken,
          refreshToken: backendResponse.refreshToken,
          expiresIn: backendResponse.expiresIn / 1000, // Convert ms to seconds
        }

        // Stocker les infos utilisateur (non sensibles) et l'expiration pour SessionExpirationGuard
        localStorage.setItem(USER_KEY, JSON.stringify(loginResponse.user))
        const tokenExpiresAt = Date.now() + backendResponse.expiresIn
        localStorage.setItem(TOKEN_EXPIRES_AT_KEY, String(tokenExpiresAt))

        setState({
          user: loginResponse.user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
          tokenExpiresAt,
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
    },
    [router]
  )

  const register = useCallback(async (data: RegisterSchoolRequest): Promise<RegisterResponse> => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }))

    try {
      // Le backend pose les cookies HttpOnly dans la réponse d'inscription
      const backendResponse = await apiClient.post<BackendLoginResponse>(
        API_ENDPOINTS.auth.register,
        data
      )

      const frontendUser = mapBackendUserToFrontend(backendResponse.user)

      localStorage.setItem(USER_KEY, JSON.stringify(frontendUser))
      const tokenExpiresAt = Date.now() + backendResponse.expiresIn
      localStorage.setItem(TOKEN_EXPIRES_AT_KEY, String(tokenExpiresAt))

      setState((prev) => ({
        ...prev,
        isAuthenticated: true,
        user: frontendUser,
        isLoading: false,
        tokenExpiresAt,
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
      // Le backend révoque le refresh token (via cookie) et efface les cookies
      await apiClient.post(API_ENDPOINTS.auth.logout).catch(() => {})
    } finally {
      // Notifier le système de présence pour déconnecter le WebSocket
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('auth:logout'))
      }
      clearAuthStorage()
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        tokenExpiresAt: null,
      })
      router.push('/login')
    }
  }, [router])

  const refreshSession = useCallback(async () => {
    try {
      // Le cookie refresh_token est envoyé automatiquement (withCredentials)
      const backendResponse = await apiClient.post<BackendLoginResponse>(
        API_ENDPOINTS.auth.refresh
        // Pas de body — le refresh_token est dans le cookie HttpOnly
      )
      const frontendUser = mapBackendUserToFrontend(backendResponse.user)

      localStorage.setItem(USER_KEY, JSON.stringify(frontendUser))
      const tokenExpiresAt = Date.now() + backendResponse.expiresIn
      localStorage.setItem(TOKEN_EXPIRES_AT_KEY, String(tokenExpiresAt))

      setState((prev) => ({
        ...prev,
        user: frontendUser,
        isAuthenticated: true,
        tokenExpiresAt,
      }))
    } catch {
      clearAuthStorage()
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: 'Session expirée',
        tokenExpiresAt: null,
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

  const updateUser = useCallback((updates: Partial<User>) => {
    setState((prev) => {
      if (!prev.user) return prev
      const updatedUser = { ...prev.user, ...updates }
      localStorage.setItem(USER_KEY, JSON.stringify(updatedUser))
      return { ...prev, user: updatedUser }
    })
  }, [])

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    refreshSession,
    clearError,
    hasPermission,
    isRole,
    updateUser,
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
