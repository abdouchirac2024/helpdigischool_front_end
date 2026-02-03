/**
 * Service de gestion des classes
 * Correspond au backend Spring Boot: ClasseController (/api/classes)
 * Utilise apiClient centralise pour les appels HTTP
 */

import { apiClient } from '@/lib/api/client'
import { API_ENDPOINTS } from '@/lib/api/config'

// Types correspondant exactement au ClasseDto du backend
export type Niveau =
  | 'MATERNELLE'
  | 'PRIMAIRE'
  | 'COLLEGE'
  | 'LYCEE'
  | 'NURSERY'
  | 'PRIMARY'
  | 'SECONDARY'
  | 'HIGH_SCHOOL'

export type SousSysteme = 'FRANCOPHONE' | 'ANGLOPHONE' | 'BILINGUE'

export type StatutClasse = 'ACTIVE' | 'INACTIVE' | 'ARCHIVEE'

export interface ClasseDto {
  id: number | null
  nomClasse: string
  niveau: Niveau
  sousSysteme: SousSysteme
  section: string | null
  capacite: number | null
  statut: StatutClasse
  effectifActuel: number | null
  fraisScolarite: number | null
  description: string | null
  ecoleId: number | null
  ecoleNom: string | null
  anneeScolaireId: number | null
  anneeScolaireLibelle: string | null
  titulaireId: number | null
  titulaireNom: string | null
}

export interface CreateClasseRequest {
  nomClasse: string
  niveau: Niveau
  sousSysteme: SousSysteme
  section?: string
  capacite?: number
  fraisScolarite?: number
  description?: string
  ecoleId: number
  anneeScolaireId?: number
  titulaireId?: number
}

class ClasseService {
  /**
   * Recuperer toutes les classes
   */
  async getAll(): Promise<ClasseDto[]> {
    console.log('[ClasseService] GET', API_ENDPOINTS.classes.base)
    return apiClient.get<ClasseDto[]>(API_ENDPOINTS.classes.base, {
      headers: {
        'X-Tenant-ID': '1',
      },
    })
  }

  /**
   * Recuperer une classe par ID
   */
  async getById(id: number): Promise<ClasseDto> {
    return apiClient.get<ClasseDto>(API_ENDPOINTS.classes.byId(id.toString()), {
      headers: {
        'X-Tenant-ID': '1',
      },
    })
  }

  /**
   * Recuperer les classes d'une ecole
   */
  async getByEcoleId(ecoleId: number): Promise<ClasseDto[]> {
    return apiClient.get<ClasseDto[]>(`${API_ENDPOINTS.classes.base}/ecole/${ecoleId}`, {
      headers: {
        'X-Tenant-ID': '1',
      },
    })
  }

  /**
   * Recuperer les eleves d'une classe
   */
  async getStudents(classId: string): Promise<unknown[]> {
    return apiClient.get<unknown[]>(API_ENDPOINTS.classes.students(classId), {
      headers: {
        'X-Tenant-ID': '1',
      },
    })
  }

  /**
   * Recuperer l'emploi du temps d'une classe
   */
  async getSchedule(classId: string): Promise<unknown[]> {
    return apiClient.get<unknown[]>(API_ENDPOINTS.classes.schedule(classId), {
      headers: {
        'X-Tenant-ID': '1',
      },
    })
  }

  /**
   * Recuperer les matieres d'une classe
   */
  async getSubjects(classId: string): Promise<unknown[]> {
    return apiClient.get<unknown[]>(API_ENDPOINTS.classes.subjects(classId), {
      headers: {
        'X-Tenant-ID': '1',
      },
    })
  }

  /**
   * Creer une nouvelle classe
   */
  async create(data: CreateClasseRequest): Promise<ClasseDto> {
    return apiClient.post<ClasseDto>(API_ENDPOINTS.classes.base, data, {
      headers: {
        'X-Tenant-ID': '1',
      },
    })
  }

  /**
   * Mettre a jour une classe
   */
  async update(
    id: number,
    data: Partial<CreateClasseRequest> & { statut?: StatutClasse }
  ): Promise<ClasseDto> {
    return apiClient.put<ClasseDto>(API_ENDPOINTS.classes.byId(id.toString()), data, {
      headers: {
        'X-Tenant-ID': '1',
      },
    })
  }

  /**
   * Supprimer une classe
   */
  async delete(id: number): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.classes.byId(id.toString()), {
      headers: {
        'X-Tenant-ID': '1',
      },
    })
  }
}

export const classeService = new ClasseService()
export default classeService
