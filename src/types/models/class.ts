/**
 * Types liés aux classes et niveaux
 */

// Niveaux scolaires (système camerounais)
export type GradeLevel =
  // Primaire
  | 'SIL' // Section d'Initiation au Langage
  | 'CP'  // Cours Préparatoire
  | 'CE1' // Cours Élémentaire 1
  | 'CE2' // Cours Élémentaire 2
  | 'CM1' // Cours Moyen 1
  | 'CM2' // Cours Moyen 2
  // Secondaire
  | '6eme'
  | '5eme'
  | '4eme'
  | '3eme'
  | '2nde'
  | '1ere'
  | 'Tle'

// Configuration d'un niveau
export interface GradeLevelConfig {
  id: string
  schoolId: string
  level: GradeLevel
  name: string
  order: number
  tuitionFee: number // Frais de scolarité
  isActive: boolean
}

// Statut d'une classe
export type ClassStatus = 'active' | 'inactive' | 'archived'

// Entité classe
export interface Class {
  id: string
  schoolId: string
  academicYearId: string
  name: string // Ex: "CM2-A", "6ème B"
  level: GradeLevel
  section?: string // A, B, C...
  capacity: number
  currentCount: number
  mainTeacherId?: string
  classroomNumber?: string
  status: ClassStatus
  createdAt: Date
  updatedAt: Date
}

// Statistiques d'une classe
export interface ClassStats {
  totalStudents: number
  boysCount: number
  girlsCount: number
  averageGrade: number
  attendanceRate: number
  passRate: number
  excellentCount: number // Notes >= 16
  goodCount: number // Notes 14-16
  averageCount: number // Notes 10-14
  failingCount: number // Notes < 10
}

// Assignation enseignant-classe-matière
export interface TeacherClassAssignment {
  id: string
  teacherId: string
  classId: string
  subjectId: string
  isMainTeacher: boolean // Professeur principal
  academicYearId: string
  createdAt: Date
}
