/**
 * Types liés aux élèves
 */

import type { Gender } from './user'
import type { GradeLevel } from './class'

// Statut d'un élève
export type StudentStatus =
  | 'enrolled'    // Inscrit
  | 'transferred' // Transféré
  | 'graduated'   // Diplômé
  | 'suspended'   // Suspendu
  | 'withdrawn'   // Retiré

// Performance académique
export type AcademicPerformance =
  | 'excellent'       // >= 16/20
  | 'good'            // 14-16/20
  | 'average'         // 10-14/20
  | 'needs-attention' // < 10/20

// Informations médicales (optionnelles)
export interface MedicalInfo {
  bloodType?: string
  allergies?: string[]
  medicalConditions?: string[]
  emergencyContact: string
  emergencyPhone: string
}

// Entité élève
export interface Student {
  id: string
  schoolId: string
  classId: string
  matricule: string // Numéro matricule unique
  firstName: string
  lastName: string
  gender: Gender
  dateOfBirth: Date
  placeOfBirth?: string
  nationality: string
  photo?: string
  status: StudentStatus
  enrollmentDate: Date
  previousSchool?: string
  medicalInfo?: MedicalInfo
  parentId: string // ID du parent principal
  secondaryParentId?: string
  createdAt: Date
  updatedAt: Date
}

// Vue étendue d'un élève avec données calculées
export interface StudentWithStats extends Student {
  age: number
  currentAverage: number
  attendanceRate: number
  performance: AcademicPerformance
  rank?: number
  className: string
  level: GradeLevel
}

// Élève dans le contexte d'une classe (pour les listes)
export interface StudentListItem {
  id: string
  name: string // Nom complet
  gender: Gender
  age: number
  average: number
  attendance: number
  status: AcademicPerformance
  parent: string
  phone: string
  email: string
}

// Historique scolaire d'un élève
export interface StudentAcademicHistory {
  id: string
  studentId: string
  academicYearId: string
  classId: string
  className: string
  level: GradeLevel
  finalAverage: number
  rank: number
  totalStudents: number
  decision: 'promoted' | 'repeated' | 'transferred'
  remarks?: string
}
