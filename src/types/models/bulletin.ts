/**
 * Types liés aux bulletins scolaires
 */

import type { Appreciation } from './grade'
import type { AcademicPerformance } from './student'

// Statut du bulletin
export type BulletinStatus = 'draft' | 'generated' | 'validated' | 'published' | 'sent'

// Décision du conseil de classe
export type CouncilDecision =
  | 'promoted'              // Admis en classe supérieure
  | 'repeated'              // Redoublement
  | 'conditional_promotion' // Admission conditionnelle
  | 'orientation'           // Orientation
  | 'pending'               // En attente

// Labels en français
export const COUNCIL_DECISION_LABELS: Record<CouncilDecision, string> = {
  promoted: 'Admis en classe supérieure',
  repeated: 'Redoublement',
  conditional_promotion: 'Admission conditionnelle',
  orientation: 'Orientation',
  pending: 'En attente de décision',
}

// Note par matière dans le bulletin
export interface BulletinSubjectGrade {
  subjectId: string
  subjectName: string
  coefficient: number
  grade: number
  classAverage: number
  minGrade: number
  maxGrade: number
  rank: number
  appreciation: Appreciation
  teacherComment?: string
}

// Bulletin scolaire
export interface Bulletin {
  id: string
  schoolId: string
  studentId: string
  classId: string
  academicYearId: string
  periodId: string
  periodName: string
  subjectGrades: BulletinSubjectGrade[]
  generalAverage: number
  classGeneralAverage: number
  rank: number
  totalStudents: number
  performance: AcademicPerformance
  conductGrade?: number // Note de conduite
  attendanceRate: number
  absentDays: number
  lateDays: number
  mainTeacherComment?: string
  directorComment?: string
  parentSignature?: boolean
  councilDecision?: CouncilDecision
  status: BulletinStatus
  pdfUrl?: string
  generatedAt?: Date
  validatedAt?: Date
  validatedBy?: string
  publishedAt?: Date
  sentAt?: Date
  createdAt: Date
  updatedAt: Date
}

// Bulletin avec infos élève (pour affichage)
export interface BulletinWithStudent extends Bulletin {
  studentFirstName: string
  studentLastName: string
  studentMatricule: string
  studentPhoto?: string
  className: string
  classLevel: string
}

// Résumé pour la liste des bulletins
export interface BulletinListItem {
  id: string
  studentId: string
  studentName: string
  studentMatricule: string
  className: string
  periodName: string
  generalAverage: number
  rank: number
  status: BulletinStatus
  pdfUrl?: string
}

// Configuration du bulletin
export interface BulletinConfig {
  id: string
  schoolId: string
  showRank: boolean
  showClassAverage: boolean
  showMinMaxGrades: boolean
  showAttendance: boolean
  showConductGrade: boolean
  showCoefficients: boolean
  showAppreciations: boolean
  showTeacherComments: boolean
  showDirectorComment: boolean
  showParentSignature: boolean
  logoPosition: 'left' | 'center' | 'right'
  headerText?: string
  footerText?: string
  createdAt: Date
  updatedAt: Date
}

// Génération de bulletins en masse
export interface BulletinGenerationJob {
  id: string
  schoolId: string
  classId?: string // null = toutes les classes
  periodId: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  totalCount: number
  processedCount: number
  errorCount: number
  errors?: { studentId: string; error: string }[]
  startedAt?: Date
  completedAt?: Date
  createdAt: Date
}

// Statistiques des bulletins par classe
export interface ClassBulletinStats {
  classId: string
  className: string
  periodId: string
  totalStudents: number
  generatedCount: number
  validatedCount: number
  publishedCount: number
  sentCount: number
  classAverage: number
  passRate: number
}