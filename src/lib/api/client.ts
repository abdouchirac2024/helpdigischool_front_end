/**
 * Client HTTP pour les appels API avec Axios
 * Help Digi School - Frontend Next.js
 *
 * Fonctionnalités:
 * - Injection automatique du token Authorization (intercepteur request)
 * - Retry automatique avec backoff exponentiel (intercepteur response)
 * - Gestion des erreurs avec toast notifications
 * - Timeout configurable
 * - Auto-déconnexion sur 401
 */

import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import { API_BASE_URL, API_CONFIG } from './config'
import { toast } from 'sonner'

// Types pour les réponses API
export interface ApiResponse<T = unknown> {
  data: T
  message?: string
  success: boolean
}

export interface ApiError {
  message: string
  code?: string
  status: number
  errors?: Record<string, string[]>
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    currentPage: number
    totalPages: number
    totalItems: number
    itemsPerPage: number
  }
}

// Clé pour le token d'authentification
const TOKEN_KEY = 'auth_token'
const REFRESH_TOKEN_KEY = 'refresh_token'

// Clé pour le compteur de retry (stocké dans la config de la requête)
const RETRY_COUNT_KEY = '__retryCount'

/**
 * Récupère le token d'authentification
 */
function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(TOKEN_KEY)
}

/**
 * Définit le token d'authentification
 */
export function setAuthToken(token: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(TOKEN_KEY, token)
  }
}

/**
 * Supprime le token d'authentification
 */
export function removeAuthToken(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
  }
}

/**
 * Vérifie si une erreur est récupérable (retry possible)
 * - Erreurs réseau (pas de réponse)
 * - Erreurs serveur 5xx
 * - Rate limiting 429
 */
function isRetryableError(error: AxiosError): boolean {
  // Erreur réseau (pas de réponse)
  if (!error.response) return true

  // Erreurs serveur (5xx) ou rate limiting (429)
  const retryableStatuses = [429, 500, 502, 503, 504]
  return retryableStatuses.includes(error.response.status)
}

/**
 * Calcule le délai de retry avec backoff exponentiel
 * Exemple: 1000ms, 2000ms, 4000ms...
 */
function calculateRetryDelay(attempt: number): number {
  const baseDelay = API_CONFIG.retryDelay
  const exponentialDelay = baseDelay * Math.pow(2, attempt)
  // Ajoute un jitter aléatoire (±25%) pour éviter les tempêtes de requêtes
  const jitter = exponentialDelay * 0.25 * (Math.random() * 2 - 1)
  return Math.min(exponentialDelay + jitter, 30000) // Max 30 secondes
}

/**
 * Pause l'exécution pendant un délai donné
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Création de l'instance Axios avec configuration de base
 */
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_CONFIG.timeout,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

/**
 * Intercepteur de requête - Injection du token Authorization
 * Note: Authorization header désactivé temporairement pour le développement
 */
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // const token = getAuthToken()
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

/**
 * Intercepteur de réponse - Gestion des erreurs et retry automatique
 */
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  async (error: AxiosError) => {
    const config = error.config as InternalAxiosRequestConfig & { [RETRY_COUNT_KEY]?: number }

    if (!config) {
      return Promise.reject(error)
    }

    // Initialiser le compteur de retry
    config[RETRY_COUNT_KEY] = config[RETRY_COUNT_KEY] ?? 0

    // Vérifier si on peut retenter
    if (isRetryableError(error) && config[RETRY_COUNT_KEY] < API_CONFIG.retries) {
      config[RETRY_COUNT_KEY] += 1

      const delay = calculateRetryDelay(config[RETRY_COUNT_KEY] - 1)
      console.warn(
        `[API] Requête échouée (${error.response?.status || 'Network Error'}), retry ${config[RETRY_COUNT_KEY]}/${API_CONFIG.retries} dans ${Math.round(delay)}ms...`
      )

      await sleep(delay)
      return axiosInstance(config)
    }

    // Gestion des erreurs finales
    const status = error.response?.status || 0
    const responseData = error.response?.data as
      | { message?: string; code?: string; errors?: Record<string, string[]> }
      | undefined

    const apiError: ApiError = {
      message: responseData?.message || error.message || 'Une erreur est survenue',
      code: responseData?.code,
      status,
      errors: responseData?.errors,
    }

    // Notification utilisateur (sauf pour 401)
    if (status !== 401) {
      toast.error(apiError.message)
    }

    // Redirection vers login si non autorisé
    if (status === 401) {
      removeAuthToken()
      if (typeof window !== 'undefined') {
        window.location.href = '/login'
      }
    }

    return Promise.reject(apiError)
  }
)

/**
 * Client API principal utilisant Axios
 * Interface identique à l'ancienne implémentation pour compatibilité
 */
export const apiClient = {
  /**
   * GET request avec retry automatique
   */
  async get<T>(endpoint: string, options?: AxiosRequestConfig): Promise<T> {
    const response = await axiosInstance.get<T>(endpoint, options)
    return response.data
  },

  /**
   * POST request avec retry automatique
   */
  async post<T>(endpoint: string, data?: unknown, options?: AxiosRequestConfig): Promise<T> {
    const response = await axiosInstance.post<T>(endpoint, data, options)
    return response.data
  },

  /**
   * PUT request avec retry automatique
   */
  async put<T>(endpoint: string, data?: unknown, options?: AxiosRequestConfig): Promise<T> {
    const response = await axiosInstance.put<T>(endpoint, data, options)
    return response.data
  },

  /**
   * PATCH request avec retry automatique
   */
  async patch<T>(endpoint: string, data?: unknown, options?: AxiosRequestConfig): Promise<T> {
    const response = await axiosInstance.patch<T>(endpoint, data, options)
    return response.data
  },

  /**
   * DELETE request avec retry automatique
   */
  async delete<T>(endpoint: string, options?: AxiosRequestConfig): Promise<T> {
    const response = await axiosInstance.delete<T>(endpoint, options)
    return response.data
  },

  /**
   * Upload de fichier avec retry automatique
   */
  async upload<T>(endpoint: string, file: File, fieldName = 'file'): Promise<T> {
    const formData = new FormData()
    formData.append(fieldName, file)

    const response = await axiosInstance.post<T>(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  /**
   * Téléchargement de fichier avec retry automatique
   */
  async download(endpoint: string, filename: string): Promise<void> {
    const response = await axiosInstance.get(endpoint, {
      responseType: 'blob',
    })

    const blob = new Blob([response.data])
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  },

  /**
   * Accès direct à l'instance Axios pour cas spéciaux
   */
  instance: axiosInstance,
}

export default apiClient
