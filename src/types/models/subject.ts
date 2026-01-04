/**
 * Types liés aux matières/cours
 */

// Catégories de matières
export type SubjectCategory =
  | 'languages'    // Langues (Français, Anglais)
  | 'sciences'     // Sciences (Math, Physique, SVT)
  | 'humanities'   // Humanités (Histoire, Géographie)
  | 'arts'         // Arts (Dessin, Musique)
  | 'sports'       // Sport (EPS)
  | 'technology'   // Technologie
  | 'other'        // Autre

// Entité matière
export interface Subject {
  id: string
  schoolId: string
  code: string // Ex: "MATH", "FR", "ENG"
  name: string
  shortName: string
  category: SubjectCategory
  coefficient: number // Coefficient pour le calcul de la moyenne
  maxGrade: number // Note maximale (généralement 20)
  passingGrade: number // Note de passage
  isOptional: boolean
  isActive: boolean
  order: number // Ordre d'affichage
  createdAt: Date
  updatedAt: Date
}

// Matière par défaut pour le système camerounais
export const DEFAULT_SUBJECTS: Omit<Subject, 'id' | 'schoolId' | 'createdAt' | 'updatedAt'>[] = [
  { code: 'FR', name: 'Français', shortName: 'FR', category: 'languages', coefficient: 4, maxGrade: 20, passingGrade: 10, isOptional: false, isActive: true, order: 1 },
  { code: 'MATH', name: 'Mathématiques', shortName: 'Math', category: 'sciences', coefficient: 4, maxGrade: 20, passingGrade: 10, isOptional: false, isActive: true, order: 2 },
  { code: 'ENG', name: 'Anglais', shortName: 'Ang', category: 'languages', coefficient: 2, maxGrade: 20, passingGrade: 10, isOptional: false, isActive: true, order: 3 },
  { code: 'SVT', name: 'Sciences de la Vie et de la Terre', shortName: 'SVT', category: 'sciences', coefficient: 2, maxGrade: 20, passingGrade: 10, isOptional: false, isActive: true, order: 4 },
  { code: 'HG', name: 'Histoire-Géographie', shortName: 'H-G', category: 'humanities', coefficient: 2, maxGrade: 20, passingGrade: 10, isOptional: false, isActive: true, order: 5 },
  { code: 'ECM', name: 'Éducation à la Citoyenneté et à la Morale', shortName: 'ECM', category: 'humanities', coefficient: 1, maxGrade: 20, passingGrade: 10, isOptional: false, isActive: true, order: 6 },
  { code: 'EPS', name: 'Éducation Physique et Sportive', shortName: 'EPS', category: 'sports', coefficient: 1, maxGrade: 20, passingGrade: 10, isOptional: false, isActive: true, order: 7 },
  { code: 'ART', name: 'Arts Plastiques', shortName: 'Art', category: 'arts', coefficient: 1, maxGrade: 20, passingGrade: 10, isOptional: true, isActive: true, order: 8 },
  { code: 'MUS', name: 'Musique', shortName: 'Mus', category: 'arts', coefficient: 1, maxGrade: 20, passingGrade: 10, isOptional: true, isActive: true, order: 9 },
]

// Matière assignée à une classe avec coefficient personnalisé
export interface ClassSubject {
  id: string
  classId: string
  subjectId: string
  teacherId: string
  coefficient: number // Peut surcharger le coefficient par défaut
  hoursPerWeek: number
  isActive: boolean
}

// Vue matière avec infos enseignant
export interface SubjectWithTeacher extends Subject {
  teacherId: string
  teacherName: string
  hoursPerWeek: number
}
