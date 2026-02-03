/**
 * Service de gestion des notes
 * Utilise apiClient centralise pour les appels HTTP
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
    const params = new URLSearchParams()

    if (filters.studentId) params.append('studentId', filters.studentId)
    if (filters.classId) params.append('classId', filters.classId)
    if (filters.subjectId) params.append('subjectId', filters.subjectId)
    if (filters.trimester) params.append('trimester', String(filters.trimester))

    const queryString = params.toString()
    const endpoint = queryString
      ? `${API_ENDPOINTS.grades.base}?${queryString}`
      : API_ENDPOINTS.grades.base

    return apiClient.get<Grade[]>(endpoint)
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
   * Recuperer les notes d'une matiere
   */
  async getGradesBySubject(subjectId: string): Promise<Grade[]> {
    return apiClient.get<Grade[]>(API_ENDPOINTS.grades.bySubject(subjectId))
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
    const params = new URLSearchParams()
    if (trimester) params.append('trimester', String(trimester))

    const queryString = params.toString()
    const endpoint = queryString
      ? `${API_ENDPOINTS.grades.byStudent(studentId)}/bulletin?${queryString}`
      : `${API_ENDPOINTS.grades.byStudent(studentId)}/bulletin`

    return apiClient.get<Bulletin>(endpoint)
  }
}

export const gradeService = new GradeService()
export default gradeService
