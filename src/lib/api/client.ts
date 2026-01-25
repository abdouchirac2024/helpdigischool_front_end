/**
 * Client HTTP pour les appels API
 * Help Digi School - Frontend Next.js
 *
 * Fonctionnalités:
 * - Injection automatique du token Authorization
 * - Retry automatique avec backoff exponentiel
 * - Gestion des erreurs avec toast notifications
 * - Timeout configurable
 * - Auto-déconnexion sur 401
 */

import { API_CONFIG, buildUrl } from './config'
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
 * Crée les headers par défaut
 */
function createHeaders(customHeaders?: HeadersInit): Headers {
  const headers = new Headers({
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...customHeaders,
  })

  const token = getAuthToken()
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  return headers
}

/**
 * Vérifie si une erreur est récupérable (retry possible)
 * - Erreurs réseau (fetch échoue)
 * - Erreurs serveur 5xx
 * - Rate limiting 429
 */
function isRetryableError(error: unknown, response?: Response): boolean {
  // Erreur réseau (pas de réponse)
  if (!response) return true

  // Erreurs serveur (5xx) ou rate limiting (429)
  const retryableStatuses = [429, 500, 502, 503, 504]
  return retryableStatuses.includes(response.status)
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
 * Fetch avec retry automatique
 * Retente la requête en cas d'erreur réseau ou serveur (5xx)
 */
async function fetchWithRetry(
  url: string,
  options: RequestInit,
  maxRetries: number = API_CONFIG.retries
): Promise<Response> {
  let lastError: Error | null = null
  let lastResponse: Response | null = null

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, {
        ...options,
        signal: AbortSignal.timeout(API_CONFIG.timeout),
      })

      // Si succès ou erreur client (4xx sauf 429), retourner directement
      if (
        response.ok ||
        (response.status >= 400 && response.status < 500 && response.status !== 429)
      ) {
        return response
      }

      // Erreur récupérable, préparer retry
      lastResponse = response

      if (attempt < maxRetries && isRetryableError(null, response)) {
        const delay = calculateRetryDelay(attempt)
        console.warn(
          `[API] Requête échouée (${response.status}), retry ${attempt + 1}/${maxRetries} dans ${Math.round(delay)}ms...`
        )
        await sleep(delay)
        continue
      }

      return response
    } catch (error) {
      lastError = error as Error

      // Si c'est un timeout ou abort, ne pas retenter
      if (error instanceof DOMException && error.name === 'AbortError') {
        throw error
      }

      // Erreur réseau, préparer retry
      if (attempt < maxRetries) {
        const delay = calculateRetryDelay(attempt)
        console.warn(
          `[API] Erreur réseau, retry ${attempt + 1}/${maxRetries} dans ${Math.round(delay)}ms...`,
          error
        )
        await sleep(delay)
        continue
      }
    }
  }

  // Toutes les tentatives ont échoué
  if (lastResponse) {
    return lastResponse
  }

  throw lastError || new Error('Échec de la requête après plusieurs tentatives')
}

/**
 * Gère les erreurs de réponse
 */
async function handleResponseError(response: Response): Promise<never> {
  let errorData: ApiError

  try {
    const data = await response.json()
    errorData = {
      message: data.message || 'Une erreur est survenue',
      code: data.code,
      status: response.status,
      errors: data.errors,
    }
  } catch {
    errorData = {
      message: response.statusText || 'Une erreur est survenue',
      status: response.status,
    }
  }

  // Notification utilisateur
  if (response.status !== 401) {
    toast.error(errorData.message)
  }

  // Redirection vers login si non autorisé
  if (response.status === 401) {
    removeAuthToken()
    if (typeof window !== 'undefined') {
      window.location.href = '/login'
    }
  }

  throw errorData
}

/**
 * Client API principal
 * Toutes les méthodes utilisent fetchWithRetry pour la résilience
 */
export const apiClient = {
  /**
   * GET request avec retry automatique
   */
  async get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetchWithRetry(buildUrl(endpoint), {
      method: 'GET',
      headers: createHeaders(options?.headers),
      ...options,
    })

    if (!response.ok) {
      await handleResponseError(response)
    }

    return response.json()
  },

  /**
   * POST request avec retry automatique
   */
  async post<T>(endpoint: string, data?: unknown, options?: RequestInit): Promise<T> {
    const response = await fetchWithRetry(buildUrl(endpoint), {
      method: 'POST',
      headers: createHeaders(options?.headers),
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    })

    if (!response.ok) {
      await handleResponseError(response)
    }

    return response.json()
  },

  /**
   * PUT request avec retry automatique
   */
  async put<T>(endpoint: string, data?: unknown, options?: RequestInit): Promise<T> {
    const response = await fetchWithRetry(buildUrl(endpoint), {
      method: 'PUT',
      headers: createHeaders(options?.headers),
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    })

    if (!response.ok) {
      await handleResponseError(response)
    }

    return response.json()
  },

  /**
   * PATCH request avec retry automatique
   */
  async patch<T>(endpoint: string, data?: unknown, options?: RequestInit): Promise<T> {
    const response = await fetchWithRetry(buildUrl(endpoint), {
      method: 'PATCH',
      headers: createHeaders(options?.headers),
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    })

    if (!response.ok) {
      await handleResponseError(response)
    }

    return response.json()
  },

  /**
   * DELETE request avec retry automatique
   */
  async delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetchWithRetry(buildUrl(endpoint), {
      method: 'DELETE',
      headers: createHeaders(options?.headers),
      ...options,
    })

    if (!response.ok) {
      await handleResponseError(response)
    }

    return response.json()
  },

  /**
   * Upload de fichier avec retry automatique
   */
  async upload<T>(endpoint: string, file: File, fieldName = 'file'): Promise<T> {
    const formData = new FormData()
    formData.append(fieldName, file)

    const headers = new Headers()
    const token = getAuthToken()
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }

    const response = await fetchWithRetry(buildUrl(endpoint), {
      method: 'POST',
      headers,
      body: formData,
    })

    if (!response.ok) {
      await handleResponseError(response)
    }

    return response.json()
  },

  /**
   * Téléchargement de fichier avec retry automatique
   */
  async download(endpoint: string, filename: string): Promise<void> {
    const response = await fetchWithRetry(buildUrl(endpoint), {
      method: 'GET',
      headers: createHeaders(),
    })

    if (!response.ok) {
      await handleResponseError(response)
    }

    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  },
}

export default apiClient
