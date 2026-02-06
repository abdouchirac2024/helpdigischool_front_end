import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { User, UserRole } from '@/types/models/user'
import { LoginRequest, LoginResponse, RegisterSchoolRequest } from '@/types/api/auth'
import { authService } from '@/services/auth.service'
import { setAuthToken, removeAuthToken } from '@/lib/api/client'

// Token storage keys
const TOKEN_KEY = 'auth_token'
const REFRESH_TOKEN_KEY = 'refresh_token'
const USER_KEY = 'auth_user'

// Types
export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  isInitialized: boolean
  error: string | null
  accessToken: string | null
  refreshToken: string | null
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isInitialized: false,
  error: null,
  accessToken: null,
  refreshToken: null,
}

// Helper functions
function setCookie(name: string, value: string, days: number = 7) {
  if (typeof document === 'undefined') return
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  const isProduction = process.env.NODE_ENV === 'production'
  const secureFlag = isProduction ? '; Secure' : ''
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Strict${secureFlag}`
}

function deleteCookie(name: string) {
  if (typeof document === 'undefined') return
  const isProduction = process.env.NODE_ENV === 'production'
  const secureFlag = isProduction ? '; Secure' : ''
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Strict${secureFlag}`
}

function clearAuthStorage() {
  if (typeof window === 'undefined') return
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
  deleteCookie(TOKEN_KEY)
  removeAuthToken()
}

function saveAuthStorage(
  accessToken: string,
  refreshToken: string,
  user: User,
  rememberMe: boolean = false
) {
  if (typeof window === 'undefined') return
  localStorage.setItem(TOKEN_KEY, accessToken)
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
  localStorage.setItem(USER_KEY, JSON.stringify(user))
  setCookie(TOKEN_KEY, accessToken, rememberMe ? 30 : 7)
  setAuthToken(accessToken)
}

// Async Thunks
export const loginAsync = createAsyncThunk<LoginResponse, LoginRequest, { rejectValue: string }>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials)
      saveAuthStorage(
        response.accessToken,
        response.refreshToken,
        response.user,
        credentials.rememberMe
      )
      return response
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erreur de connexion'
      return rejectWithValue(message)
    }
  }
)

export const registerAsync = createAsyncThunk<
  LoginResponse,
  RegisterSchoolRequest,
  { rejectValue: string }
>('auth/register', async (data, { rejectWithValue }) => {
  try {
    const response = await authService.register(data)
    return response
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erreur lors de l'inscription"
    return rejectWithValue(message)
  }
})

export const logoutAsync = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout()
    } catch (error) {
      // Ignorer les erreurs de logout
    } finally {
      clearAuthStorage()
    }
  }
)

export const refreshSessionAsync = createAsyncThunk<
  { user: User; accessToken: string },
  void,
  { rejectValue: string }
>('auth/refreshSession', async (_, { rejectWithValue }) => {
  try {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY)
    if (!refreshToken) {
      return rejectWithValue('Pas de token de rafraîchissement')
    }

    const response = await authService.refreshToken(refreshToken)
    localStorage.setItem(TOKEN_KEY, response.accessToken)
    setAuthToken(response.accessToken)
    setCookie(TOKEN_KEY, response.accessToken, 7)

    return { user: response.user, accessToken: response.accessToken }
  } catch (error) {
    clearAuthStorage()
    const message = error instanceof Error ? error.message : 'Session expirée'
    return rejectWithValue(message)
  }
})

export const initializeAuthAsync = createAsyncThunk<
  { user: User; accessToken: string } | null,
  void,
  { rejectValue: string }
>('auth/initialize', async (_, { rejectWithValue }) => {
  try {
    if (typeof window === 'undefined') return null

    const storedToken = localStorage.getItem(TOKEN_KEY)
    const storedUser = localStorage.getItem(USER_KEY)

    if (!storedToken || !storedUser) {
      return null
    }

    const user = JSON.parse(storedUser) as User
    setAuthToken(storedToken)

    // Optionnel: Valider le token avec le backend
    // const isValid = await authService.validateToken(storedToken)
    // if (!isValid) {
    //   clearAuthStorage()
    //   return null
    // }

    return { user, accessToken: storedToken }
  } catch (error) {
    clearAuthStorage()
    return null
  }
})

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.isAuthenticated = true
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }
        localStorage.setItem(USER_KEY, JSON.stringify(state.user))
      }
    },
    resetAuth: (state) => {
      clearAuthStorage()
      return { ...initialState, isInitialized: true }
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isLoading = false
        state.isAuthenticated = true
        state.user = action.payload.user
        state.accessToken = action.payload.accessToken
        state.refreshToken = action.payload.refreshToken
        state.error = null
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || 'Erreur de connexion'
      })
      // Register
      .addCase(registerAsync.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(registerAsync.fulfilled, (state) => {
        state.isLoading = false
        state.error = null
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || "Erreur lors de l'inscription"
      })
      // Logout
      .addCase(logoutAsync.fulfilled, (state) => {
        state.user = null
        state.isAuthenticated = false
        state.accessToken = null
        state.refreshToken = null
        state.error = null
      })
      // Refresh Session
      .addCase(refreshSessionAsync.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.accessToken = action.payload.accessToken
        state.isAuthenticated = true
      })
      .addCase(refreshSessionAsync.rejected, (state) => {
        state.user = null
        state.isAuthenticated = false
        state.accessToken = null
        state.refreshToken = null
      })
      // Initialize
      .addCase(initializeAuthAsync.pending, (state) => {
        state.isLoading = true
      })
      .addCase(initializeAuthAsync.fulfilled, (state, action) => {
        state.isLoading = false
        state.isInitialized = true
        if (action.payload) {
          state.user = action.payload.user
          state.accessToken = action.payload.accessToken
          state.isAuthenticated = true
        }
      })
      .addCase(initializeAuthAsync.rejected, (state) => {
        state.isLoading = false
        state.isInitialized = true
        state.user = null
        state.isAuthenticated = false
      })
  },
})

// Selectors
export const selectAuth = (state: { auth: AuthState }) => state.auth
export const selectUser = (state: { auth: AuthState }) => state.auth.user
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated
export const selectIsLoading = (state: { auth: AuthState }) => state.auth.isLoading
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error
export const selectIsInitialized = (state: { auth: AuthState }) => state.auth.isInitialized
export const selectUserRole = (state: { auth: AuthState }) => state.auth.user?.role

// Helper selectors
export const selectHasRole = (role: UserRole | UserRole[]) => (state: { auth: AuthState }) => {
  const userRole = state.auth.user?.role
  if (!userRole) return false
  if (Array.isArray(role)) {
    return role.includes(userRole)
  }
  return userRole === role
}

export const { clearError, setUser, updateUser, resetAuth } = authSlice.actions
export default authSlice.reducer
