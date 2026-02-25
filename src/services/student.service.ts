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
  /**
   * Télécharge la carte scolaire en PDF
   */
  downloadCard: async (id: number): Promise<void> => {
    const response = await fetch(`${API_ENDPOINTS.students.byId(id.toString())}/card`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('auth-storage') ? JSON.parse(localStorage.getItem('auth-storage')!).state.token : ''}`,
      },
    })
    if (!response.ok) throw new Error('Erreur lors du téléchargement de la carte')
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `carte_scolaire_${id}.pdf`
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
  },
}
