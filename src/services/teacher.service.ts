import { apiClient } from '@/lib/api/client'
import { API_ENDPOINTS } from '@/lib/api/config'
import type { TeacherDto, CreateTeacherRequest } from '@/types/teacher'

// Define endpoint since it might not be in API_ENDPOINTS yet
const TEACHERS_ENDPOINT = '/teachers'

export const teacherService = {
  /**
   * Récupère tous les enseignants
   */
  getAll: async (): Promise<TeacherDto[]> => {
    return apiClient.get<TeacherDto[]>(TEACHERS_ENDPOINT)
  },

  /**
   * Récupère un enseignant par ID
   */
  getById: async (id: number): Promise<TeacherDto> => {
    return apiClient.get<TeacherDto>(`${TEACHERS_ENDPOINT}/${id}`)
  },

  /**
   * Crée un nouvel enseignant
   */
  create: async (data: CreateTeacherRequest): Promise<TeacherDto> => {
    return apiClient.post<TeacherDto>(TEACHERS_ENDPOINT, data)
  },

  /**
   * Met à jour un enseignant
   */
  update: async (id: number, data: Partial<CreateTeacherRequest>): Promise<TeacherDto> => {
    return apiClient.put<TeacherDto>(`${TEACHERS_ENDPOINT}/${id}`, data)
  },

  /**
   * Supprime un enseignant
   */
  delete: async (id: number): Promise<void> => {
    return apiClient.delete(`${TEACHERS_ENDPOINT}/${id}`)
  },
}
