/**
 * Types pour l'API des notes
 */

import type { EvaluationType, Appreciation, Grade, Evaluation, EvaluationStats, PeriodAverage } from '../models/grade'
import type { PaginationParams, PaginatedResponse } from './common'

// Création d'une évaluation
export interface CreateEvaluationRequest {
  schoolId: string
  classId: string
  subjectId: string
  periodId: string
  type: EvaluationType
  title: string
  description?: string
  date: string // ISO date
  maxGrade: number
  coefficient: number
}

// Mise à jour d'une évaluation
export interface UpdateEvaluationRequest {
  title?: string
  description?: string
  date?: string
  maxGrade?: number
  coefficient?: number
  isPublished?: boolean
}

// Liste des évaluations
export interface GetEvaluationsRequest extends PaginationParams {
  schoolId: string
  classId?: string
  subjectId?: string
  periodId?: string
  type?: EvaluationType
  teacherId?: string
}

export type GetEvaluationsResponse = PaginatedResponse<Evaluation & {
  className: string
  subjectName: string
  teacherName: string
  gradesCount: number
  averageGrade?: number
}>

// Saisie des notes
export interface SaveGradesRequest {
  evaluationId: string
  grades: {
    studentId: string
    value: number | null
    isAbsent?: boolean
    appreciation?: Appreciation
    comment?: string
  }[]
}

export interface SaveGradesResponse {
  success: boolean
  message: string
  savedCount: number
  errors?: { studentId: string; error: string }[]
}

// Notes d'un élève
export interface GetStudentGradesRequest {
  studentId: string
  periodId?: string
  subjectId?: string
}

export interface GetStudentGradesResponse {
  success: boolean
  data: {
    studentId: string
    studentName: string
    periodAverages: PeriodAverage[]
    recentGrades: (Grade & {
      evaluationTitle: string
      subjectName: string
      maxGrade: number
      date: string
    })[]
  }
}

// Notes d'une classe par matière
export interface GetClassGradesRequest {
  classId: string
  subjectId: string
  periodId: string
  evaluationId?: string
}

export interface GetClassGradesResponse {
  success: boolean
  data: {
    classId: string
    className: string
    subjectId: string
    subjectName: string
    periodId: string
    periodName: string
    evaluations: (Evaluation & { stats: EvaluationStats })[]
    studentGrades: {
      studentId: string
      studentName: string
      grades: { evaluationId: string; value: number | null }[]
      average: number
      rank: number
    }[]
  }
}

// Validation des notes
export interface ValidateGradesRequest {
  evaluationIds: string[]
}

export interface ValidateGradesResponse {
  success: boolean
  message: string
  validatedCount: number
}

// Verrouillage des notes d'une période
export interface LockPeriodGradesRequest {
  schoolId: string
  periodId: string
  classIds?: string[] // null = toutes les classes
}

// Statistiques des notes
export interface GradeStatsRequest {
  schoolId: string
  classId?: string
  periodId?: string
}

export interface GradeStatsResponse {
  success: boolean
  data: {
    classAverage: number
    schoolAverage: number
    passRate: number
    excellenceRate: number
    subjectAverages: {
      subjectId: string
      subjectName: string
      average: number
      passRate: number
    }[]
    trendComparison?: {
      previousPeriodAverage: number
      change: number
      changePercent: number
    }
  }
}
