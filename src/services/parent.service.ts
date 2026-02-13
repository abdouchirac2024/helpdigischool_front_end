/**
 * Service de gestion des parents d'élèves
 * Utilise le client API centralisé avec isolation multi-tenant automatique via JWT
 */

import { apiClient } from '@/lib/api/client'
import type { Parent, ParentFormData, EleveParent, EleveParentFormData } from '@/types'

class ParentService {
  // ========== PARENTS ==========

  async getParents(): Promise<Parent[]> {
    return apiClient.get<Parent[]>('/parents')
  }

  async getParentById(id: number): Promise<Parent> {
    return apiClient.get<Parent>(`/parents/${id}`)
  }

  async getParentByMatricule(matricule: string): Promise<Parent> {
    return apiClient.get<Parent>(`/parents/matricule/${matricule}`)
  }

  async searchParents(query: string): Promise<Parent[]> {
    return apiClient.get<Parent[]>(`/parents/search?query=${encodeURIComponent(query)}`)
  }

  async createParent(parent: ParentFormData): Promise<Parent> {
    return apiClient.post<Parent>('/parents', parent)
  }

  async updateParent(id: number, parent: ParentFormData): Promise<Parent> {
    return apiClient.put<Parent>(`/parents/${id}`, parent)
  }

  async deleteParent(id: number): Promise<void> {
    await apiClient.delete(`/parents/${id}`)
  }

  // ========== RELATIONS ÉLÈVE-PARENT ==========

  async getEleveParents(): Promise<EleveParent[]> {
    return apiClient.get<EleveParent[]>('/eleve-parents')
  }

  async getEleveParentById(id: number): Promise<EleveParent> {
    return apiClient.get<EleveParent>(`/eleve-parents/${id}`)
  }

  async getEleveParentsByEleve(eleveId: number): Promise<EleveParent[]> {
    return apiClient.get<EleveParent[]>(`/eleve-parents/eleve/${eleveId}`)
  }

  async getEleveParentsByParent(parentId: number): Promise<EleveParent[]> {
    return apiClient.get<EleveParent[]>(`/eleve-parents/parent/${parentId}`)
  }

  async getContactsUrgenceByEleve(eleveId: number): Promise<EleveParent[]> {
    return apiClient.get<EleveParent[]>(`/eleve-parents/eleve/${eleveId}/contacts-urgence`)
  }

  async getResponsablesLegauxByEleve(eleveId: number): Promise<EleveParent[]> {
    return apiClient.get<EleveParent[]>(`/eleve-parents/eleve/${eleveId}/responsables-legaux`)
  }

  async getPrincipalByEleve(eleveId: number): Promise<EleveParent | null> {
    try {
      return await apiClient.get<EleveParent>(`/eleve-parents/eleve/${eleveId}/principal`)
    } catch {
      return null
    }
  }

  async createEleveParent(relation: EleveParentFormData): Promise<EleveParent> {
    return apiClient.post<EleveParent>('/eleve-parents', relation)
  }

  async updateEleveParent(id: number, relation: EleveParentFormData): Promise<EleveParent> {
    return apiClient.put<EleveParent>(`/eleve-parents/${id}`, relation)
  }

  async deleteEleveParent(id: number): Promise<void> {
    await apiClient.delete(`/eleve-parents/${id}`)
  }
}

export const parentService = new ParentService()
export default parentService
