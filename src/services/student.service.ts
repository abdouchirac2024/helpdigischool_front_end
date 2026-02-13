import { apiClient } from '@/lib/api/client'
import { API_ENDPOINTS } from '@/lib/api/config'
import type { EleveDto, CreateEleveRequest } from '@/types/student'

export const studentService = {
  /**
   * Récupère tous les élèves
   */
  getAll: async (): Promise<EleveDto[]> => {
    return apiClient.get<EleveDto[]>(API_ENDPOINTS.students.base)
  },

  /**
   * Récupère un élève par ID
   */
  getById: async (id: number): Promise<EleveDto> => {
    return apiClient.get<EleveDto>(API_ENDPOINTS.students.byId(id.toString()))
  },

  /**
   * Crée un nouvel élève
   */
  create: async (data: CreateEleveRequest): Promise<EleveDto> => {
    return apiClient.post<EleveDto>(API_ENDPOINTS.students.base, data)
  },

  /**
   * Met à jour un élève
   */
  update: async (id: number, data: Partial<CreateEleveRequest>): Promise<EleveDto> => {
    return apiClient.put<EleveDto>(API_ENDPOINTS.students.byId(id.toString()), data)
  },

  /**
   * Supprime un élève
   */
  delete: async (id: number): Promise<void> => {
    return apiClient.delete(API_ENDPOINTS.students.byId(id.toString()))
  },
}
