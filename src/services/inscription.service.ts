import { apiClient } from '@/lib/api/client'
import { API_ENDPOINTS } from '@/lib/api/config'
import type {
  Inscription,
  InscriptionCreateRequest,
  AnnulationRequest,
} from '@/types/models/inscription'

export const inscriptionService = {
  getAll: async (): Promise<Inscription[]> => {
    return apiClient.get<Inscription[]>(API_ENDPOINTS.inscriptions.base)
  },

  getById: async (id: number): Promise<Inscription> => {
    return apiClient.get<Inscription>(API_ENDPOINTS.inscriptions.byId(id.toString()))
  },

  create: async (data: InscriptionCreateRequest): Promise<Inscription> => {
    return apiClient.post<Inscription>(API_ENDPOINTS.inscriptions.base, data)
  },

  annuler: async (id: number, data: AnnulationRequest): Promise<Inscription> => {
    return apiClient.put<Inscription>(API_ENDPOINTS.inscriptions.annuler(id.toString()), data)
  },

  checkParents: async (eleveId: number): Promise<{ hasParents: boolean }> => {
    return apiClient.get<{ hasParents: boolean }>(
      API_ENDPOINTS.inscriptions.checkParents(eleveId.toString())
    )
  },
}
