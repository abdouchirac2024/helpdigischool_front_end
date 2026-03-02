import { apiClient } from '@/lib/api/client'
import { API_ENDPOINTS } from '@/lib/api/config'
import type { AnneeScolaireResponse } from '@/types/student'

export const anneeScolaireService = {
  getAll: async (tenant: string): Promise<AnneeScolaireResponse[]> => {
    return apiClient.get<AnneeScolaireResponse[]>(API_ENDPOINTS.anneesScolaires.base, {
      params: { tenant },
    })
  },

  create: async (data: {
    label: string
    from: string
    to: string
    current: boolean
    tenantId: string
  }): Promise<AnneeScolaireResponse> => {
    return apiClient.post<AnneeScolaireResponse>(API_ENDPOINTS.anneesScolaires.base, data)
  },
}
