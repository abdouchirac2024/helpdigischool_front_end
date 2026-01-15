/**
 * Service de gestion des eleves
 */

import { API_CONFIG, API_ENDPOINTS, PAGINATION } from '@/constants'
import type { Student, PaginatedResponse, CreateStudentRequest, UpdateStudentRequest } from '@/types'

interface StudentFilters {
  classId?: string
  search?: string
  page?: number
  limit?: number
}

class StudentService {
  private baseUrl = API_CONFIG.BASE_URL

  private getAuthHeaders(token: string) {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  }

  /**
   * Recuperer la liste des eleves avec pagination
   */
  async getStudents(
    token: string,
    filters: StudentFilters = {}
  ): Promise<PaginatedResponse<Student>> {
    const params = new URLSearchParams()
    params.append('page', String(filters.page || PAGINATION.DEFAULT_PAGE))
    params.append('limit', String(filters.limit || PAGINATION.DEFAULT_LIMIT))

    if (filters.classId) params.append('classId', filters.classId)
    if (filters.search) params.append('search', filters.search)

    const response = await fetch(
      `${this.baseUrl}${API_ENDPOINTS.STUDENTS.BASE}?${params}`,
      { headers: this.getAuthHeaders(token) }
    )

    if (!response.ok) {
      throw new Error('Erreur lors de la recuperation des eleves')
    }

    return response.json()
  }

  /**
   * Recuperer un eleve par ID
   */
  async getStudentById(token: string, id: string): Promise<Student> {
    const response = await fetch(
      `${this.baseUrl}${API_ENDPOINTS.STUDENTS.BY_ID(id)}`,
      { headers: this.getAuthHeaders(token) }
    )

    if (!response.ok) {
      throw new Error('Eleve non trouve')
    }

    return response.json()
  }

  /**
   * Recuperer les eleves d'une classe
   */
  async getStudentsByClass(token: string, classId: string): Promise<Student[]> {
    const response = await fetch(
      `${this.baseUrl}${API_ENDPOINTS.STUDENTS.BY_CLASS(classId)}`,
      { headers: this.getAuthHeaders(token) }
    )

    if (!response.ok) {
      throw new Error('Erreur lors de la recuperation des eleves')
    }

    return response.json()
  }

  /**
   * Creer un nouvel eleve
   */
  async createStudent(token: string, data: CreateStudentRequest): Promise<Student> {
    const response = await fetch(`${this.baseUrl}${API_ENDPOINTS.STUDENTS.BASE}`, {
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
   * Mettre a jour un eleve
   */
  async updateStudent(
    token: string,
    id: string,
    data: UpdateStudentRequest
  ): Promise<Student> {
    const response = await fetch(
      `${this.baseUrl}${API_ENDPOINTS.STUDENTS.BY_ID(id)}`,
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
   * Supprimer un eleve
   */
  async deleteStudent(token: string, id: string): Promise<void> {
    const response = await fetch(
      `${this.baseUrl}${API_ENDPOINTS.STUDENTS.BY_ID(id)}`,
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
   * Recuperer les notes d'un eleve
   */
  async getStudentGrades(token: string, studentId: string): Promise<unknown[]> {
    const response = await fetch(
      `${this.baseUrl}${API_ENDPOINTS.STUDENTS.GRADES(studentId)}`,
      { headers: this.getAuthHeaders(token) }
    )

    if (!response.ok) {
      throw new Error('Erreur lors de la recuperation des notes')
    }

    return response.json()
  }
}

export const studentService = new StudentService()
export default studentService