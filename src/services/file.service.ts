import { apiClient } from '@/lib/api/client'
import { API_ENDPOINTS } from '@/lib/api/config'

interface FileUploadResponse {
  url: string
  id?: string
  fileName?: string
}

export const fileService = {
  /**
   * Upload un fichier vers le backend et retourne l'URL
   */
  async upload(file: File, fieldName = 'file'): Promise<FileUploadResponse> {
    return apiClient.upload<FileUploadResponse>(API_ENDPOINTS.files.upload, file, fieldName)
  },
}
