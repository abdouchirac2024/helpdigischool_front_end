import { apiClient } from '@/lib/api/client'

export interface AnneeScolaire {
  id: number
  libelle: string
  statut: boolean
  dateDebut: string
  dateFin: string
  exams: any[]
  holidays: any[]
  publicHolidays: any[]
  periods: any[]
}

class AnneeScolaireService {
  async getAll(): Promise<AnneeScolaire[]> {
    return apiClient.get<AnneeScolaire[]>('/annees-scolaires')
  }

  async getById(id: number): Promise<AnneeScolaire> {
    return apiClient.get<AnneeScolaire>(`/annees-scolaires/${id}`)
  }

  async create(data: AnneeScolaire): Promise<AnneeScolaire> {
    return apiClient.post<AnneeScolaire>('/annees-scolaires', data)
  }

  async update(id: number, data: AnneeScolaire): Promise<AnneeScolaire> {
    console.log('la modif est passé')
    return apiClient.put<AnneeScolaire>(`/annees-scolaires/${id}`, data)
  }
}

export const anneeScolaireService = new AnneeScolaireService()
