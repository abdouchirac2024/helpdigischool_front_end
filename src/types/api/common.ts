/**
 * Types communs pour les API
 */

// Réponse API générique
export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  timestamp: string
}

// Réponse d'erreur API
export interface ApiError {
  success: false
  error: {
    code: string
    message: string
    details?: Record<string, string[]>
  }
  timestamp: string
}

// Pagination
export interface PaginationParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface PaginatedResponse<T> {
  items: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrevious: boolean
  }
}

// Filtres génériques
export interface FilterParams {
  search?: string
  status?: string
  startDate?: string
  endDate?: string
}

// Réponse de création/modification
export interface MutationResponse<T> {
  success: boolean
  data: T
  message: string
}

// Réponse de suppression
export interface DeleteResponse {
  success: boolean
  message: string
  deletedId: string
}

// Upload de fichier
export interface FileUploadResponse {
  success: boolean
  file: {
    id: string
    url: string
    name: string
    mimeType: string
    size: number
  }
}

// Statistiques génériques
export interface StatsResponse<T> {
  success: boolean
  data: T
  period: {
    startDate: string
    endDate: string
  }
}

// Options pour les selects
export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

// Bulk operations
export interface BulkOperationRequest {
  ids: string[]
  action: string
}

export interface BulkOperationResponse {
  success: boolean
  processedCount: number
  failedCount: number
  errors?: { id: string; error: string }[]
}