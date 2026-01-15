/**
 * Service de gestion des notes
 */

import { API_CONFIG, API_ENDPOINTS } from '@/constants'
import type { Grade, Bulletin } from '@/types/models'
import type { CreateGradeRequest } from '@/types/api'

interface GradeFilters {
  studentId?: string
  classId?: string
  subjectId?: string
  trimester?: number
}

class GradeService {
  private baseUrl = API_CONFIG.BASE_URL

  private getAuthHeaders(token: string) {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  }

  /**
   * Recuperer les notes avec filtres
   */
  async getGrades(token: string, filters: GradeFilters = {}): Promise<Grade[]> {
    const params = new URLSearchParams()

    if (filters.studentId) params.append('studentId', filters.studentId)
    if (filters.classId) params.append('classId', filters.classId)
    if (filters.subjectId) params.append('subjectId', filters.subjectId)
    if (filters.trimester) params.append('trimester', String(filters.trimester))

    const response = await fetch(
      `${this.baseUrl}${API_ENDPOINTS.GRADES.BASE}?${params}`,
      { headers: this.getAuthHeaders(token) }
    )

    if (!response.ok) {
      throw new Error('Erreur lors de la recuperation des notes')
    }

    return response.json()
  }

  /**
   * Recuperer une note par ID
   */
  async getGradeById(token: string, id: string): Promise<Grade> {
    const response = await fetch(
      `${this.baseUrl}${API_ENDPOINTS.GRADES.BY_ID(id)}`,
      { headers: this.getAuthHeaders(token) }
    )

    if (!response.ok) {
      throw new Error('Note non trouvee')
    }

    return response.json()
  }

  /**
   * Recuperer les notes d'un eleve
   */
  async getGradesByStudent(token: string, studentId: string): Promise<Grade[]> {
    const response = await fetch(
      `${this.baseUrl}${API_ENDPOINTS.GRADES.BY_STUDENT(studentId)}`,
      { headers: this.getAuthHeaders(token) }
    )

    if (!response.ok) {
      throw new Error('Erreur lors de la recuperation des notes')
    }

    return response.json()
  }

  /**
   * Recuperer les notes d'une classe
   */
  async getGradesByClass(token: string, classId: string): Promise<Grade[]> {
    const response = await fetch(
      `${this.baseUrl}${API_ENDPOINTS.GRADES.BY_CLASS(classId)}`,
      { headers: this.getAuthHeaders(token) }
    )

    if (!response.ok) {
      throw new Error('Erreur lors de la recuperation des notes')
    }

    return response.json()
  }

  /**
   * Creer une nouvelle note
   */
  async createGrade(token: string, data: CreateGradeRequest): Promise<Grade> {
    const response = await fetch(`${this.baseUrl}${API_ENDPOINTS.GRADES.BASE}`, {
      method: 'POST',
      headers: this.getAuthHeaders(token),
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(error.message || 'Erreur lors de la creation')
    }

    return response.json()
  }

  /**
   * Creer plusieurs notes (saisie en masse)
   */
  async createBulkGrades(token: string, grades: CreateGradeRequest[]): Promise<Grade[]> {
    const response = await fetch(`${this.baseUrl}${API_ENDPOINTS.GRADES.BASE}/bulk`, {
      method: 'POST',
      headers: this.getAuthHeaders(token),
      body: JSON.stringify({ grades }),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(error.message || 'Erreur lors de la creation')
    }

    return response.json()
  }

  /**
   * Mettre a jour une note
   */
  async updateGrade(
    token: string,
    id: string,
    data: Partial<CreateGradeRequest>
  ): Promise<Grade> {
    const response = await fetch(
      `${this.baseUrl}${API_ENDPOINTS.GRADES.BY_ID(id)}`,
      {
        method: 'PUT',
        headers: this.getAuthHeaders(token),
        body: JSON.stringify(data),
      }
    )

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(error.message || 'Erreur lors de la mise a jour')
    }

    return response.json()
  }

  /**
   * Supprimer une note
   */
  async deleteGrade(token: string, id: string): Promise<void> {
    const response = await fetch(
      `${this.baseUrl}${API_ENDPOINTS.GRADES.BY_ID(id)}`,
      {
        method: 'DELETE',
        headers: this.getAuthHeaders(token),
      }
    )

    if (!response.ok) {
      throw new Error('Erreur lors de la suppression')
    }
  }

  /**
   * Generer le bulletin d'un eleve
   */
  async generateBulletin(
    token: string,
    studentId: string,
    trimester?: number
  ): Promise<Bulletin> {
    const params = new URLSearchParams()
    if (trimester) params.append('trimester', String(trimester))

    const response = await fetch(
      `${this.baseUrl}${API_ENDPOINTS.GRADES.BULLETIN(studentId)}?${params}`,
      { headers: this.getAuthHeaders(token) }
    )

    if (!response.ok) {
      throw new Error('Erreur lors de la generation du bulletin')
    }

    return response.json()
  }
}

export const gradeService = new GradeService()
export default gradeService