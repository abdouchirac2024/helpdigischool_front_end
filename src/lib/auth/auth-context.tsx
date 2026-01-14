'use client'

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react'
import { User, UserRole } from '@/types/models/user'
import { LoginRequest, LoginResponse, RegisterSchoolRequest, RegisterResponse } from '@/types/api/auth'
import { setAuthToken, removeAuthToken } from '@/lib/api/client'
import { useRouter } from 'next/navigation'

// Token storage keys
const TOKEN_KEY = 'auth_token'
const REFRESH_TOKEN_KEY = 'refresh_token'
const USER_KEY = 'auth_user'

// Mock users for development (without API)
const MOCK_USERS: Record<string, { password: string; user: User }> = {
  'admin@helpdigischool.com': {
    password: 'admin123',
    user: {
      id: 'admin-001',
      email: 'admin@helpdigischool.com',
      role: 'admin',
      status: 'active',
      profile: {
        firstName: 'Super',
        lastName: 'Admin',
        phone: '+237 6 00 00 00 00',
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
  'directeur@ecole.cm': {
    password: 'directeur123',
    user: {
      id: 'director-001',
      email: 'directeur@ecole.cm',
      role: 'director',
      status: 'active',
      profile: {
        firstName: 'Jean',
        lastName: 'Kamga',
        phone: '+237 6 77 88 99 00',
      },
      schoolId: 'school-001',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
  'enseignant@ecole.cm': {
    password: 'enseignant123',
    user: {
      id: 'teacher-001',
      email: 'enseignant@ecole.cm',
      role: 'teacher',
      status: 'active',
      profile: {
        firstName: 'Marie',
        lastName: 'Kouam',
        phone: '+237 6 77 88 99 01',
      },
      schoolId: 'school-001',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
  'parent@email.cm': {
    password: 'parent123',
    user: {
      id: 'parent-001',
      email: 'parent@email.cm',
      role: 'parent',
      status: 'active',
      profile: {
        firstName: 'Jean',
        lastName: 'Talla',
        phone: '+237 6 88 77 66 55',
      },
      schoolId: 'school-001',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
  'secretaire@ecole.cm': {
    password: 'secretaire123',
    user: {
      id: 'secretary-001',
      email: 'secretaire@ecole.cm',
      role: 'secretary',
      status: 'active',
      profile: {
        firstName: 'Sophie',
        lastName: 'Mballa',
        phone: '+237 6 55 44 33 22',
      },
      schoolId: 'school-001',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
  'eleve@ecole.cm': {
    password: 'eleve123',
    user: {
      id: 'student-001',
      email: 'eleve@ecole.cm',
      role: 'student' as UserRole,
      status: 'active',
      profile: {
        firstName: 'Amina',
        lastName: 'Talla',
        phone: '+237 6 88 77 66 55',
      },
      schoolId: 'school-001',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
}

// Generate mock token
function generateMockToken(): string {
  return 'mock_token_' + Math.random().toString(36).substring(2) + Date.now().toString(36)
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

  // Initialize auth state from storage (Mock version - no API calls)
  useEffect(() => {
    const initAuth = () => {
      try {
        const token = localStorage.getItem(TOKEN_KEY)
        const storedUser = localStorage.getItem(USER_KEY)

        if (token && storedUser) {
          const user = JSON.parse(storedUser) as User
          setAuthToken(token)

          // Mock: Accept stored user as valid (no API verification)
          setState({
            user: user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          })
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
    setState(prev => ({ ...prev, isLoading: true, error: null }))

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500))

    try {
      // Mock authentication - check credentials against mock users
      const mockUser = MOCK_USERS[credentials.email.toLowerCase()]

      if (!mockUser || mockUser.password !== credentials.password) {
        throw new Error('Email ou mot de passe incorrect')
      }

      const accessToken = generateMockToken()
      const refreshToken = generateMockToken()

      const response: LoginResponse = {
        success: true,
        user: mockUser.user,
        accessToken,
        refreshToken,
        expiresIn: 3600,
      }

      // Store tokens and user
      setAuthToken(response.accessToken)
      localStorage.setItem(TOKEN_KEY, response.accessToken)
      localStorage.setItem(REFRESH_TOKEN_KEY, response.refreshToken)
      localStorage.setItem(USER_KEY, JSON.stringify(response.user))
      // Set cookie for middleware
      setCookie(TOKEN_KEY, response.accessToken, credentials.rememberMe ? 30 : 7)

      setState({
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      })

      return response
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erreur de connexion'
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: message,
      }))
      throw error
    }
  }, [])

  const register = useCallback(async (data: RegisterSchoolRequest): Promise<RegisterResponse> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500))

    try {
      // Mock registration - just return success
      const response: RegisterResponse = {
        success: true,
        message: 'École enregistrée avec succès. Vous pouvez maintenant vous connecter.',
        schoolId: 'school-' + Date.now(),
        userId: 'user-' + Date.now(),
      }

      setState(prev => ({ ...prev, isLoading: false }))
      return response
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur lors de l'inscription"
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: message,
      }))
      throw error
    }
  }, [])

  const logout = useCallback(async () => {
    // Mock logout - just clear local storage
    clearAuthStorage()
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    })
    router.push('/login')
  }, [router])

  const refreshSession = useCallback(async () => {
    const storedUser = localStorage.getItem(USER_KEY)
    if (!storedUser) {
      throw new Error('No session available')
    }

    // Mock refresh - just regenerate tokens
    const user = JSON.parse(storedUser) as User
    const newAccessToken = generateMockToken()
    const newRefreshToken = generateMockToken()

    setAuthToken(newAccessToken)
    localStorage.setItem(TOKEN_KEY, newAccessToken)
    localStorage.setItem(REFRESH_TOKEN_KEY, newRefreshToken)

    setState(prev => ({
      ...prev,
      user: user,
      isAuthenticated: true,
    }))
  }, [])

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }))
  }, [])

  const hasPermission = useCallback((permission: keyof User): boolean => {
    if (!state.user) return false
    return Boolean(state.user[permission])
  }, [state.user])

  const isRole = useCallback((role: UserRole | UserRole[]): boolean => {
    if (!state.user) return false
    if (Array.isArray(role)) {
      return role.includes(state.user.role)
    }
    return state.user.role === role
  }, [state.user])

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

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export { AuthContext }