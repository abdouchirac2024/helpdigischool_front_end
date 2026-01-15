/**
 * Schemas de validation pour les notes
 */

import { z } from 'zod'

// Schema de creation de note
export const createGradeSchema = z.object({
  studentId: z.string().min(1, 'L\'eleve est requis'),
  subjectId: z.string().min(1, 'La matiere est requise'),
  evaluationType: z.enum(['exam', 'test', 'homework', 'oral', 'practical'], {
    required_error: 'Le type d\'evaluation est requis',
  }),
  score: z
    .number()
    .min(0, 'La note ne peut pas etre negative')
    .max(20, 'La note ne peut pas depasser 20'),
  maxScore: z.number().default(20),
  coefficient: z.number().positive().default(1),
  trimester: z.number().int().min(1).max(3),
  date: z.string().min(1, 'La date est requise'),
  comment: z.string().optional(),
})

export type CreateGradeFormData = z.infer<typeof createGradeSchema>

// Schema de saisie en masse des notes
export const bulkGradeSchema = z.object({
  classId: z.string().min(1, 'La classe est requise'),
  subjectId: z.string().min(1, 'La matiere est requise'),
  evaluationType: z.enum(['exam', 'test', 'homework', 'oral', 'practical'], {
    required_error: 'Le type d\'evaluation est requis',
  }),
  trimester: z.number().int().min(1).max(3),
  date: z.string().min(1, 'La date est requise'),
  maxScore: z.number().default(20),
  coefficient: z.number().positive().default(1),
  grades: z.array(z.object({
    studentId: z.string(),
    score: z.number().min(0).max(20).nullable(),
    comment: z.string().optional(),
  })).min(1, 'Saisissez au moins une note'),
})

export type BulkGradeFormData = z.infer<typeof bulkGradeSchema>

// Schema de mise a jour de note
export const updateGradeSchema = z.object({
  score: z.number().min(0).max(20).optional(),
  coefficient: z.number().positive().optional(),
  comment: z.string().optional(),
})

export type UpdateGradeFormData = z.infer<typeof updateGradeSchema>

// Schema de recherche de notes
export const searchGradeSchema = z.object({
  studentId: z.string().optional(),
  classId: z.string().optional(),
  subjectId: z.string().optional(),
  evaluationType: z.enum(['exam', 'test', 'homework', 'oral', 'practical']).optional(),
  trimester: z.number().int().min(1).max(3).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
})

export type SearchGradeParams = z.infer<typeof searchGradeSchema>

// Types d'evaluation avec labels
export const EVALUATION_TYPES = [
  { value: 'exam', label: 'Examen' },
  { value: 'test', label: 'Interrogation' },
  { value: 'homework', label: 'Devoir' },
  { value: 'oral', label: 'Oral' },
  { value: 'practical', label: 'Pratique' },
] as const

// Fonction pour calculer la moyenne
export const calculateAverage = (
  grades: Array<{ score: number; coefficient: number }>
): number => {
  if (grades.length === 0) return 0

  const totalWeighted = grades.reduce(
    (sum, g) => sum + g.score * g.coefficient,
    0
  )
  const totalCoefficients = grades.reduce((sum, g) => sum + g.coefficient, 0)

  return totalCoefficients > 0 ? totalWeighted / totalCoefficients : 0
}

// Fonction pour obtenir l'appreciation
export const getAppreciation = (average: number): string => {
  if (average >= 16) return 'Tres Bien'
  if (average >= 14) return 'Bien'
  if (average >= 12) return 'Assez Bien'
  if (average >= 10) return 'Passable'
  if (average >= 8) return 'Insuffisant'
  return 'Tres Insuffisant'
}