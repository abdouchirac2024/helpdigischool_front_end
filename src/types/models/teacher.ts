/**
 * Types liés aux enseignants
 */

import type { Gender } from './user'

// Statut d'un enseignant
export type TeacherStatus = 'active' | 'inactive' | 'on_leave'

// Type de contrat
export type ContractType = 'permanent' | 'temporary' | 'part_time'

// Qualification
export interface TeacherQualification {
  degree: string
  institution: string
  year: number
  specialization?: string
}

// Entité enseignant
export interface Teacher {
  id: string
  userId: string // Lien vers le compte utilisateur
  schoolId: string
  employeeId: string // Matricule employé
  firstName: string
  lastName: string
  gender: Gender
  phone: string
  email: string
  dateOfBirth?: Date
  hireDate: Date
  contractType: ContractType
  status: TeacherStatus
  specializations: string[] // Matières enseignées
  qualifications: TeacherQualification[]
  photo?: string
  createdAt: Date
  updatedAt: Date
}

// Enseignant avec ses classes assignées
export interface TeacherWithClasses extends Teacher {
  classes: {
    classId: string
    className: string
    subjectId: string
    subjectName: string
    isMainTeacher: boolean
    studentCount: number
  }[]
}

// Vue simplifiée pour les listes
export interface TeacherListItem {
  id: string
  name: string
  email: string
  phone: string
  specializations: string[]
  classCount: number
  status: TeacherStatus
}

// Statistiques enseignant
export interface TeacherStats {
  totalClasses: number
  totalStudents: number
  averageClassGrade: number
  gradesEnteredCount: number
  pendingGradesCount: number
}
