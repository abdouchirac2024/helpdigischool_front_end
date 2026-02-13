/**
 * Service de gestion de la localisation (Cameroun)
 * Utilise apiClient pour beneficier du retry, intercepteurs et proxy CORS
 */

import { apiClient } from '@/lib/api/client'
import { API_ENDPOINTS } from '@/lib/api/config'
import type { Region, Departement, Arrondissement, Ville, Quartier, Adresse } from '@/types'

class LocationService {
  // ========== REGIONS ==========
  async getRegions(): Promise<Region[]> {
    return apiClient.get<Region[]>(API_ENDPOINTS.localisation.regions)
  }

  async getRegionById(id: number): Promise<Region> {
    return apiClient.get<Region>(API_ENDPOINTS.localisation.regionById(id))
  }

  async createRegion(region: Omit<Region, 'id'>): Promise<Region> {
    return apiClient.post<Region>(API_ENDPOINTS.localisation.regions, region)
  }

  async updateRegion(id: number, region: Omit<Region, 'id'>): Promise<Region> {
    return apiClient.put<Region>(API_ENDPOINTS.localisation.regionById(id), region)
  }

  async deleteRegion(id: number): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.localisation.regionById(id))
  }

  // ========== DEPARTEMENTS ==========
  async getDepartements(): Promise<Departement[]> {
    return apiClient.get<Departement[]>(API_ENDPOINTS.localisation.departements)
  }

  async getDepartementsByRegion(regionId: number): Promise<Departement[]> {
    return apiClient.get<Departement[]>(API_ENDPOINTS.localisation.departementsByRegion(regionId))
  }

  // ========== ARRONDISSEMENTS ==========
  async getArrondissements(): Promise<Arrondissement[]> {
    return apiClient.get<Arrondissement[]>(API_ENDPOINTS.localisation.arrondissements)
  }

  async getArrondissementsByDepartement(deptId: number): Promise<Arrondissement[]> {
    return apiClient.get<Arrondissement[]>(
      API_ENDPOINTS.localisation.arrondissementsByDepartement(deptId)
    )
  }

  // ========== VILLES ==========
  async getVilles(): Promise<Ville[]> {
    return apiClient.get<Ville[]>(API_ENDPOINTS.localisation.villes)
  }

  async getVillesByArrondissement(arrId: number): Promise<Ville[]> {
    return apiClient.get<Ville[]>(API_ENDPOINTS.localisation.villesByArrondissement(arrId))
  }

  // ========== QUARTIERS ==========
  async getQuartiers(): Promise<Quartier[]> {
    return apiClient.get<Quartier[]>(API_ENDPOINTS.localisation.quartiers)
  }

  async getQuartiersByVille(villeId: number): Promise<Quartier[]> {
    return apiClient.get<Quartier[]>(API_ENDPOINTS.localisation.quartiersByVille(villeId))
  }

  // ========== ADRESSES ==========
  async getAdresses(): Promise<Adresse[]> {
    return apiClient.get<Adresse[]>(API_ENDPOINTS.localisation.adresses)
  }

  async getAdressesByQuartier(quartierId: number): Promise<Adresse[]> {
    return apiClient.get<Adresse[]>(API_ENDPOINTS.localisation.adressesByQuartier(quartierId))
  }
}

export const locationService = new LocationService()
export default locationService
