/**
 * Service de gestion des classes
 * Correspond au backend Spring Boot: ClasseController (/api/classes)
 * Utilise apiClient centralise pour les appels HTTP
 */

import { apiClient } from '@/lib/api/client'
import { API_ENDPOINTS } from '@/lib/api/config'
import type { ClasseDto, CreateClasseRequest, StatutClasse } from '@/types/classe'

/**
 * Service de gestion des classes.
 * L'ecoleId est automatiquement déterminé côté backend
 * depuis le JWT token (claims ecoleId).
 * Sécurisé: le tenant ne peut pas être manipulé par le client.
 */
class ClasseService {
  /**
   * Recuperer toutes les classes de l'ecole de l'utilisateur connecte
   */
  async getAll(): Promise<ClasseDto[]> {
    console.log('[ClasseService] GET', API_ENDPOINTS.classes.base)
    return apiClient.get<ClasseDto[]>(API_ENDPOINTS.classes.base)
  }

  /**
   * Recuperer une classe par ID
   */
  async getById(id: number): Promise<ClasseDto> {
    return apiClient.get<ClasseDto>(API_ENDPOINTS.classes.byId(id.toString()))
  }

  /**
   * Recuperer les classes d'une ecole specifique
   */
  async getByEcoleId(ecoleId: number): Promise<ClasseDto[]> {
    return apiClient.get<ClasseDto[]>(`${API_ENDPOINTS.classes.base}/ecole/${ecoleId}`)
  }

  /**
   * Recuperer les eleves d'une classe
   */
  async getStudents(classId: string): Promise<unknown[]> {
    return apiClient.get<unknown[]>(API_ENDPOINTS.classes.students(classId))
  }

  /**
   * Recuperer l'emploi du temps d'une classe
   */
  async getSchedule(classId: string): Promise<unknown[]> {
    return apiClient.get<unknown[]>(API_ENDPOINTS.classes.schedule(classId))
  }

  /**
   * Recuperer les matieres d'une classe
   */
  async getSubjects(classId: string): Promise<unknown[]> {
    return apiClient.get<unknown[]>(API_ENDPOINTS.classes.subjects(classId))
  }

  /**
   * Creer une nouvelle classe
   * L'ecoleId est auto-determine cote backend depuis le contexte utilisateur
   */
  async create(data: CreateClasseRequest): Promise<ClasseDto> {
    return apiClient.post<ClasseDto>(API_ENDPOINTS.classes.base, data)
  }

  /**
   * Mettre a jour une classe
   * L'ecoleId ne peut pas etre change - validation cote backend
   */
  async update(
    id: number,
    data: Partial<CreateClasseRequest> & { statut?: StatutClasse }
  ): Promise<ClasseDto> {
    return apiClient.put<ClasseDto>(API_ENDPOINTS.classes.byId(id.toString()), data)
  }

  /**
   * Supprimer une classe
   * Validation d'acces cote backend
   */
  async delete(id: number): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.classes.byId(id.toString()))
  }
}

export const classeService = new ClasseService()
export default classeService
