/**
 * Client HTTP pour les appels API
 * Help Digi School - Frontend Next.js
 */

import { API_BASE_URL, API_CONFIG, buildUrl } from './config';
import { toast } from 'sonner';

// Types pour les réponses API
export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  code?: string;
  status: number;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

// Clé pour le token d'authentification
const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

/**
 * Récupère le token d'authentification
 */
function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

/**
 * Définit le token d'authentification
 */
export function setAuthToken(token: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(TOKEN_KEY, token);
  }
}

/**
 * Supprime le token d'authentification
 */
export function removeAuthToken(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
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
  });

  const token = getAuthToken();
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  return headers;
}


/**
 * Gère les erreurs de réponse
 */
async function handleResponseError(response: Response): Promise<never> {
  let errorData: ApiError;

  try {
    const data = await response.json();
    errorData = {
      message: data.message || 'Une erreur est survenue',
      code: data.code,
      status: response.status,
      errors: data.errors,
    };
  } catch {
    errorData = {
      message: response.statusText || 'Une erreur est survenue',
      status: response.status,
    };
  }

  // Notification utilisateur
  if (response.status !== 401) {
    toast.error(errorData.message);
  }

  // Redirection vers login si non autorisé
  if (response.status === 401) {
    removeAuthToken();
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  }

  throw errorData;
}

/**
 * Client API principal
 */
export const apiClient = {
  /**
   * GET request
   */
  async get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(buildUrl(endpoint), {
      method: 'GET',
      headers: createHeaders(options?.headers),
      signal: AbortSignal.timeout(API_CONFIG.timeout),
      ...options,
    });

    if (!response.ok) {
      await handleResponseError(response);
    }

    return response.json();
  },

  /**
   * POST request
   */
  async post<T>(endpoint: string, data?: unknown, options?: RequestInit): Promise<T> {
    const response = await fetch(buildUrl(endpoint), {
      method: 'POST',
      headers: createHeaders(options?.headers),
      body: data ? JSON.stringify(data) : undefined,
      signal: AbortSignal.timeout(API_CONFIG.timeout),
      ...options,
    });

    if (!response.ok) {
      await handleResponseError(response);
    }

    return response.json();
  },

  /**
   * PUT request
   */
  async put<T>(endpoint: string, data?: unknown, options?: RequestInit): Promise<T> {
    const response = await fetch(buildUrl(endpoint), {
      method: 'PUT',
      headers: createHeaders(options?.headers),
      body: data ? JSON.stringify(data) : undefined,
      signal: AbortSignal.timeout(API_CONFIG.timeout),
      ...options,
    });

    if (!response.ok) {
      await handleResponseError(response);
    }

    return response.json();
  },

  /**
   * PATCH request
   */
  async patch<T>(endpoint: string, data?: unknown, options?: RequestInit): Promise<T> {
    const response = await fetch(buildUrl(endpoint), {
      method: 'PATCH',
      headers: createHeaders(options?.headers),
      body: data ? JSON.stringify(data) : undefined,
      signal: AbortSignal.timeout(API_CONFIG.timeout),
      ...options,
    });

    if (!response.ok) {
      await handleResponseError(response);
    }

    return response.json();
  },

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(buildUrl(endpoint), {
      method: 'DELETE',
      headers: createHeaders(options?.headers),
      signal: AbortSignal.timeout(API_CONFIG.timeout),
      ...options,
    });

    if (!response.ok) {
      await handleResponseError(response);
    }

    return response.json();
  },

  /**
   * Upload de fichier
   */
  async upload<T>(endpoint: string, file: File, fieldName = 'file'): Promise<T> {
    const formData = new FormData();
    formData.append(fieldName, file);

    const headers = new Headers();
    const token = getAuthToken();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    const response = await fetch(buildUrl(endpoint), {
      method: 'POST',
      headers,
      body: formData,
      signal: AbortSignal.timeout(API_CONFIG.timeout),
    });

    if (!response.ok) {
      await handleResponseError(response);
    }

    return response.json();
  },

  /**
   * Téléchargement de fichier
   */
  async download(endpoint: string, filename: string): Promise<void> {
    const response = await fetch(buildUrl(endpoint), {
      method: 'GET',
      headers: createHeaders(),
      signal: AbortSignal.timeout(API_CONFIG.timeout),
    });

    if (!response.ok) {
      await handleResponseError(response);
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  },
};

export default apiClient;
