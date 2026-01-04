/**
 * Types liés aux notes et évaluations
 */

import type { AcademicPerformance } from './student'

// Type d'évaluation
export type EvaluationType =
  | 'homework'      // Devoir
  | 'test'          // Interrogation
  | 'exam'          // Composition/Examen
  | 'oral'          // Oral
  | 'practical'     // Travaux pratiques
  | 'project'       // Projet

// Appréciation
export type Appreciation =
  | 'excellent'     // Excellent (16-20)
  | 'very_good'     // Très bien (14-16)
  | 'good'          // Bien (12-14)
  | 'average'       // Assez bien (10-12)
  | 'poor'          // Passable (8-10)
  | 'very_poor'     // Insuffisant (<8)

// Labels d'appréciation en français
export const APPRECIATION_LABELS: Record<Appreciation, string> = {
  excellent: 'Excellent',
  very_good: 'Très bien',
  good: 'Bien',
  average: 'Assez bien',
  poor: 'Passable',
  very_poor: 'Insuffisant',
}

// Statut d'une note
export type GradeStatus = 'draft' | 'submitted' | 'validated' | 'locked'

// Évaluation (examen/devoir)
export interface Evaluation {
  id: string
  schoolId: string
  classId: string
  subjectId: string
  teacherId: string
  periodId: string
  type: EvaluationType
  title: string
  description?: string
  date: Date
  maxGrade: number
  coefficient: number
  isPublished: boolean
  createdAt: Date
  updatedAt: Date
}

// Note individuelle
export interface Grade {
  id: string
  evaluationId: string
  studentId: string
  value: number | null // null si absent
  isAbsent: boolean
  appreciation?: Appreciation
  comment?: string
  status: GradeStatus
  enteredBy: string // ID de l'enseignant
  validatedBy?: string // ID du directeur
  enteredAt: Date
  updatedAt: Date
}

// Note avec détails (pour affichage)
export interface GradeWithDetails extends Grade {
  studentName: string
  subjectName: string
  evaluationType: EvaluationType
  evaluationTitle: string
  maxGrade: number
}

// Moyenne par matière pour un élève
export interface SubjectAverage {
  subjectId: string
  subjectName: string
  coefficient: number
  average: number
  gradesCount: number
  rank?: number
  appreciation: Appreciation
}

// Moyenne générale d'un élève pour une période
export interface PeriodAverage {
  studentId: string
  periodId: string
  periodName: string
  subjectAverages: SubjectAverage[]
  generalAverage: number
  rank: number
  totalStudents: number
  performance: AcademicPerformance
  teacherComment?: string
  directorComment?: string
}

// Saisie rapide des notes (tableau)
export interface GradeEntry {
  studentId: string
  studentName: string
  value: string | number
  appreciation?: Appreciation
  currentAverage: number
}

// Statistiques d'une évaluation
export interface EvaluationStats {
  evaluationId: string
  average: number
  median: number
  min: number
  max: number
  passRate: number
  submittedCount: number
  totalCount: number
  distribution: {
    excellent: number // 16-20
    good: number // 14-16
    average: number // 10-14
    poor: number // <10
  }
}