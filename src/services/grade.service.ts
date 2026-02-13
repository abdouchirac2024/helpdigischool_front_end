/**
 * Service de gestion des notes
 * Utilise apiClient pour beneficier du retry, intercepteurs et proxy CORS
 */

import { apiClient } from '@/lib/api/client'
import { API_ENDPOINTS } from '@/lib/api/config'
import type { Grade, Bulletin } from '@/types/models'
import type { CreateGradeRequest } from '@/types/api'

interface GradeFilters {
  studentId?: string
  classId?: string
  subjectId?: string
  trimester?: number
}

class GradeService {
  /**
   * Recuperer les notes avec filtres
   */
  async getGrades(filters: GradeFilters = {}): Promise<Grade[]> {
    return apiClient.get<Grade[]>(API_ENDPOINTS.grades.base, { params: filters })
  }

  /**
   * Recuperer une note par ID
   */
  async getGradeById(id: string): Promise<Grade> {
    return apiClient.get<Grade>(API_ENDPOINTS.grades.byId(id))
  }

  /**
   * Recuperer les notes d'un eleve
   */
  async getGradesByStudent(studentId: string): Promise<Grade[]> {
    return apiClient.get<Grade[]>(API_ENDPOINTS.grades.byStudent(studentId))
  }

  /**
   * Recuperer les notes d'une classe
   */
  async getGradesByClass(classId: string): Promise<Grade[]> {
    return apiClient.get<Grade[]>(API_ENDPOINTS.grades.byClass(classId))
  }

  /**
   * Creer une nouvelle note
   */
  async createGrade(data: CreateGradeRequest): Promise<Grade> {
    return apiClient.post<Grade>(API_ENDPOINTS.grades.base, data)
  }

  /**
   * Creer plusieurs notes (saisie en masse)
   */
  async createBulkGrades(grades: CreateGradeRequest[]): Promise<Grade[]> {
    return apiClient.post<Grade[]>(API_ENDPOINTS.grades.bulk, { grades })
  }

  /**
   * Mettre a jour une note
   */
  async updateGrade(id: string, data: Partial<CreateGradeRequest>): Promise<Grade> {
    return apiClient.put<Grade>(API_ENDPOINTS.grades.byId(id), data)
  }

  /**
   * Supprimer une note
   */
  async deleteGrade(id: string): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.grades.byId(id))
  }

  /**
   * Generer le bulletin d'un eleve
   */
  async generateBulletin(studentId: string, trimester?: number): Promise<Bulletin> {
    return apiClient.get<Bulletin>(API_ENDPOINTS.bulletins.byStudent(studentId), {
      params: trimester ? { trimester } : undefined,
    })
  }
}

export const gradeService = new GradeService()
export default gradeService
