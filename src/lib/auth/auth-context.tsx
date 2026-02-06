'use client'

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react'
import { User, UserRole } from '@/types/models/user'
import {
  LoginRequest,
  LoginResponse,
  RegisterSchoolRequest,
  RegisterResponse,
} from '@/types/api/auth'
import { setAuthToken, removeAuthToken } from '@/lib/api/client'
import { useRouter } from 'next/navigation'
import { authService } from '@/services/auth.service'

// Token storage keys
const TOKEN_KEY = 'auth_token'
const REFRESH_TOKEN_KEY = 'refresh_token'
const USER_KEY = 'auth_user'

// Cookie helpers for middleware access
// SÉCURITÉ: Utilise SameSite=Strict et Secure en production
function setCookie(name: string, value: string, days: number = 7) {
  if (typeof document === 'undefined') return
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  const isProduction = process.env.NODE_ENV === 'production'
  const secureFlag = isProduction ? '; Secure' : ''
  // SameSite=Strict pour une meilleure protection CSRF
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Strict${secureFlag}`
}

function deleteCookie(name: string) {
  if (typeof document === 'undefined') return
  const isProduction = process.env.NODE_ENV === 'production'
  const secureFlag = isProduction ? '; Secure' : ''
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Strict${secureFlag}`
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
  student: '/dashboard/student',
}

// Extended for backward compatibility (same as ROLE_DASHBOARD_PATHS)
export const ROLE_DASHBOARD_PATHS_EXTENDED: Record<string, string> = {
  ...ROLE_DASHBOARD_PATHS,
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

  // Valide que l'objet user a la structure correcte
  const isValidUser = (user: unknown): user is User => {
    if (!user || typeof user !== 'object') {
      console.warn('[AuthContext] isValidUser: user is null or not an object')
      return false
    }
    const u = user as Record<string, unknown>

    const validRoles = ['admin', 'director', 'teacher', 'parent', 'secretary', 'student']
    const hasValidId = typeof u.id === 'string' && u.id.length > 0
    const hasValidEmail = typeof u.email === 'string' && u.email.length > 0
    const hasValidRole = typeof u.role === 'string' && validRoles.includes(u.role as string)
    const hasValidProfile = typeof u.profile === 'object' && u.profile !== null

    if (!hasValidId) console.warn('[AuthContext] isValidUser: invalid id', u.id)
    if (!hasValidEmail) console.warn('[AuthContext] isValidUser: invalid email', u.email)
    if (!hasValidRole) console.warn('[AuthContext] isValidUser: invalid role', u.role)
    if (!hasValidProfile) console.warn('[AuthContext] isValidUser: invalid profile', u.profile)

    return hasValidId && hasValidEmail && hasValidRole && hasValidProfile
  }

  // Initialize auth state from storage - vérifie le token avec le backend
  useEffect(() => {
    const initAuth = async () => {
      console.log('[AuthContext] initAuth: Starting authentication initialization')

      try {
        const token = localStorage.getItem(TOKEN_KEY)
        const storedUser = localStorage.getItem(USER_KEY)

        console.log(
          '[AuthContext] initAuth: Token present:',
          !!token,
          'Stored user present:',
          !!storedUser
        )

        if (token && storedUser) {
          setAuthToken(token)

          try {
            // Vérifier le token avec le backend en récupérant l'utilisateur courant
            console.log('[AuthContext] initAuth: Verifying token with backend...')
            const user = await authService.getCurrentUser()

            console.log('[AuthContext] initAuth: Backend returned user:', {
              id: user?.id,
              email: user?.email,
              role: user?.role,
            })

            // Valider la structure de l'utilisateur
            if (!isValidUser(user)) {
              console.warn('[AuthContext] initAuth: User data invalid from backend, clearing auth')
              clearAuthStorage()
              setState({
                user: null,
                isAuthenticated: false,
                isLoading: false,
                error: null,
              })
              return
            }

            // Mettre à jour le user stocké avec les données fraîches du backend
            localStorage.setItem(USER_KEY, JSON.stringify(user))

            console.log('[AuthContext] initAuth: Authentication successful, user role:', user.role)
            setState({
              user: user,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            })
          } catch (backendError) {
            // Token invalide ou expiré - essayer les données locales
            console.warn(
              '[AuthContext] initAuth: Backend verification failed, using stored data',
              backendError
            )

            try {
              const parsedUser = JSON.parse(storedUser)
              console.log('[AuthContext] initAuth: Parsed stored user:', {
                id: parsedUser?.id,
                email: parsedUser?.email,
                role: parsedUser?.role,
              })

              // Valider la structure de l'utilisateur stocké
              if (isValidUser(parsedUser)) {
                console.log(
                  '[AuthContext] initAuth: Using stored user data, role:',
                  parsedUser.role
                )
                setState({
                  user: parsedUser,
                  isAuthenticated: true,
                  isLoading: false,
                  error: null,
                })
              } else {
                // Données invalides, nettoyer et demander reconnexion
                console.warn('[AuthContext] initAuth: Stored user data invalid, clearing auth')
                clearAuthStorage()
                setState({
                  user: null,
                  isAuthenticated: false,
                  isLoading: false,
                  error: null,
                })
              }
            } catch (parseError) {
              // JSON invalide
              console.error('[AuthContext] initAuth: Failed to parse stored user', parseError)
              clearAuthStorage()
              setState({
                user: null,
                isAuthenticated: false,
                isLoading: false,
                error: null,
              })
            }
          }
        } else {
          console.log('[AuthContext] initAuth: No token or stored user found')
          setState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          })
        }
      } catch (error) {
        console.error('[AuthContext] initAuth: Unexpected error', error)
        clearAuthStorage()
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
    console.log('[AuthContext] login: Starting login process')
    setState((prev) => ({ ...prev, isLoading: true, error: null }))

    try {
      // Appeler le vrai backend API via authService
      const response = await authService.login(credentials)

      console.log('[AuthContext] login: Login successful', {
        userId: response.user.id,
        userRole: response.user.role,
        hasToken: !!response.accessToken,
      })

      // Store tokens and user
      setAuthToken(response.accessToken)
      localStorage.setItem(TOKEN_KEY, response.accessToken)
      localStorage.setItem(REFRESH_TOKEN_KEY, response.refreshToken)
      localStorage.setItem(USER_KEY, JSON.stringify(response.user))
      // Set cookie for middleware
      setCookie(TOKEN_KEY, response.accessToken, credentials.rememberMe ? 30 : 7)

      console.log('[AuthContext] login: Tokens and user stored in localStorage')

      setState({
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      })

      console.log('[AuthContext] login: Auth state updated, user role:', response.user.role)

      return response
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erreur de connexion'
      console.error('[AuthContext] login: Login failed', message)
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
      // Appeler le vrai backend API via authService
      const response = await authService.register(data)

      setState((prev) => ({ ...prev, isLoading: false }))

      // Note: L'inscription ne connecte pas automatiquement l'utilisateur
      // Il devra se connecter après l'inscription
      return {
        success: true,
        message: 'École enregistrée avec succès. Vous pouvez maintenant vous connecter.',
        schoolId: response.user?.schoolId || '',
        userId: response.user?.id || '',
      }
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
      // Appeler le backend pour déconnecter (optionnel, le backend peut invalider le token)
      await authService.logout()
    } catch {
      // Ignorer les erreurs de logout côté backend
    } finally {
      // Toujours nettoyer le stockage local
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
      // Appeler le vrai backend API pour rafraîchir le token
      const response = await authService.refreshToken(refreshToken)

      setAuthToken(response.accessToken)
      localStorage.setItem(TOKEN_KEY, response.accessToken)
      localStorage.setItem(REFRESH_TOKEN_KEY, response.refreshToken)
      localStorage.setItem(USER_KEY, JSON.stringify(response.user))

      setState((prev) => ({
        ...prev,
        user: response.user,
        isAuthenticated: true,
      }))
    } catch (error) {
      // Si le refresh échoue, déconnecter l'utilisateur
      clearAuthStorage()
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: 'Session expirée, veuillez vous reconnecter',
      })
      throw error
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
