/**
 * Service de gestion des eleves
 * Utilise apiClient centralise pour les appels HTTP
 */

import { apiClient } from '@/lib/api/client'
import { API_ENDPOINTS } from '@/lib/api/config'
import { PAGINATION } from '@/constants'
import type {
  Student,
  PaginatedResponse,
  CreateStudentRequest,
  UpdateStudentRequest,
} from '@/types'

interface StudentFilters {
  classId?: string
  search?: string
  page?: number
  limit?: number
}

class StudentService {
  /**
   * Recuperer la liste des eleves avec pagination
   */
  async getStudents(filters: StudentFilters = {}): Promise<PaginatedResponse<Student>> {
    const params = new URLSearchParams()
    params.append('page', String(filters.page || PAGINATION.DEFAULT_PAGE))
    params.append('limit', String(filters.limit || PAGINATION.DEFAULT_LIMIT))

    if (filters.classId) params.append('classId', filters.classId)
    if (filters.search) params.append('search', filters.search)

    return apiClient.get<PaginatedResponse<Student>>(`${API_ENDPOINTS.students.base}?${params}`)
  }

  /**
   * Recuperer un eleve par ID
   */
  async getStudentById(id: string): Promise<Student> {
    return apiClient.get<Student>(API_ENDPOINTS.students.byId(id))
  }

  /**
   * Recuperer les eleves d'une classe
   */
  async getStudentsByClass(classId: string): Promise<Student[]> {
    return apiClient.get<Student[]>(`${API_ENDPOINTS.students.base}/class/${classId}`)
  }

  /**
   * Creer un nouvel eleve
   */
  async createStudent(data: CreateStudentRequest): Promise<Student> {
    return apiClient.post<Student>(API_ENDPOINTS.students.base, data)
  }

  /**
   * Mettre a jour un eleve
   */
  async updateStudent(id: string, data: UpdateStudentRequest): Promise<Student> {
    return apiClient.put<Student>(API_ENDPOINTS.students.byId(id), data)
  }

  /**
   * Supprimer un eleve
   */
  async deleteStudent(id: string): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.students.byId(id))
  }

  /**
   * Recuperer les notes d'un eleve
   */
  async getStudentGrades(studentId: string): Promise<unknown[]> {
    return apiClient.get<unknown[]>(API_ENDPOINTS.students.grades(studentId))
  }

  /**
   * Recuperer les presences d'un eleve
   */
  async getStudentAttendance(studentId: string): Promise<unknown[]> {
    return apiClient.get<unknown[]>(API_ENDPOINTS.students.attendance(studentId))
  }

  /**
   * Recuperer les bulletins d'un eleve
   */
  async getStudentBulletins(studentId: string): Promise<unknown[]> {
    return apiClient.get<unknown[]>(API_ENDPOINTS.students.bulletins(studentId))
  }

  /**
   * Recuperer les paiements d'un eleve
   */
  async getStudentPayments(studentId: string): Promise<unknown[]> {
    return apiClient.get<unknown[]>(API_ENDPOINTS.students.payments(studentId))
  }
}

export const studentService = new StudentService()
export default studentService
