/**
 * Types pour l'API des élèves
 */

import type { Gender } from '../models/user'
import type { Student, StudentWithStats, StudentListItem, StudentAcademicHistory } from '../models/student'
import type { PaginationParams, FilterParams, PaginatedResponse } from './common'

// Filtres spécifiques aux élèves
export interface StudentFilters extends FilterParams {
  classId?: string
  level?: string
  gender?: Gender
  performance?: string
  status?: string
}

// Requête de liste des élèves
export interface GetStudentsRequest extends PaginationParams, StudentFilters {
  schoolId: string
}

// Réponse de liste des élèves
export type GetStudentsResponse = PaginatedResponse<StudentListItem>

// Requête de création d'élève
export interface CreateStudentRequest {
  schoolId: string
  classId: string
  firstName: string
  lastName: string
  gender: Gender
  dateOfBirth: string // ISO date
  placeOfBirth?: string
  nationality?: string
  photo?: string
  previousSchool?: string
  // Informations parent
  parentFirstName: string
  parentLastName: string
  parentGender: Gender
  parentRelation: 'father' | 'mother' | 'guardian' | 'other'
  parentPhone: string
  parentEmail: string
  parentAddress?: string
  // Informations médicales (optionnel)
  bloodType?: string
  allergies?: string[]
  medicalConditions?: string[]
  emergencyContact?: string
  emergencyPhone?: string
}

// Requête de mise à jour d'élève
export interface UpdateStudentRequest {
  firstName?: string
  lastName?: string
  classId?: string
  gender?: Gender
  dateOfBirth?: string
  placeOfBirth?: string
  nationality?: string
  photo?: string
  status?: string
}

// Réponse détail élève
export interface GetStudentResponse {
  success: boolean
  data: StudentWithStats & {
    parent: {
      id: string
      name: string
      phone: string
      email: string
      relation: string
    }
    academicHistory: StudentAcademicHistory[]
  }
}

// Transfert d'élève
export interface TransferStudentRequest {
  studentId: string
  newClassId: string
  reason?: string
  effectiveDate: string
}

// Import en masse
export interface BulkImportStudentsRequest {
  schoolId: string
  classId: string
  students: {
    firstName: string
    lastName: string
    gender: Gender
    dateOfBirth: string
    parentName: string
    parentPhone: string
    parentEmail: string
  }[]
}

export interface BulkImportStudentsResponse {
  success: boolean
  importedCount: number
  failedCount: number
  errors?: { row: number; error: string }[]
}

// Statistiques élèves
export interface StudentStatsRequest {
  schoolId: string
  classId?: string
  periodId?: string
}

export interface StudentStatsResponse {
  success: boolean
  data: {
    totalStudents: number
    boysCount: number
    girlsCount: number
    averageAge: number
    newEnrollments: number
    withdrawals: number
    performanceDistribution: {
      excellent: number
      good: number
      average: number
      needsAttention: number
    }
  }
}
