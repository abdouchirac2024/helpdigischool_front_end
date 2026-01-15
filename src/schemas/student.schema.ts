/**
 * Schemas de validation pour les eleves
 */

import { z } from 'zod'

// Schema de creation d'eleve
export const createStudentSchema = z.object({
  // Informations personnelles
  firstName: z
    .string()
    .min(1, 'Le prenom est requis')
    .min(2, 'Le prenom doit contenir au moins 2 caracteres'),
  lastName: z
    .string()
    .min(1, 'Le nom est requis')
    .min(2, 'Le nom doit contenir au moins 2 caracteres'),
  dateOfBirth: z
    .string()
    .min(1, 'La date de naissance est requise')
    .refine((date) => {
      const birthDate = new Date(date)
      const today = new Date()
      const age = today.getFullYear() - birthDate.getFullYear()
      return age >= 2 && age <= 25
    }, 'L\'age doit etre entre 2 et 25 ans'),
  gender: z.enum(['male', 'female'], {
    required_error: 'Le genre est requis',
  }),
  placeOfBirth: z.string().optional(),
  nationality: z.string().default('Camerounaise'),

  // Informations scolaires
  classId: z.string().min(1, 'La classe est requise'),
  matricule: z.string().optional(),
  previousSchool: z.string().optional(),

  // Informations parent/tuteur
  parentFirstName: z
    .string()
    .min(1, 'Le prenom du parent est requis'),
  parentLastName: z
    .string()
    .min(1, 'Le nom du parent est requis'),
  parentPhone: z
    .string()
    .min(1, 'Le telephone du parent est requis')
    .regex(/^[0-9+\s-]{9,}$/, 'Numero de telephone invalide'),
  parentEmail: z
    .string()
    .email('Format d\'email invalide')
    .optional()
    .or(z.literal('')),
  parentAddress: z.string().min(1, 'L\'adresse est requise'),
  parentProfession: z.string().optional(),

  // Informations medicales (optionnelles)
  bloodType: z.string().optional(),
  allergies: z.string().optional(),
  medicalNotes: z.string().optional(),

  // Photo
  photo: z.string().optional(),
})

export type CreateStudentFormData = z.infer<typeof createStudentSchema>

// Schema de mise a jour d'eleve (tous les champs optionnels)
export const updateStudentSchema = createStudentSchema.partial()

export type UpdateStudentFormData = z.infer<typeof updateStudentSchema>

// Schema de recherche d'eleves
export const searchStudentSchema = z.object({
  search: z.string().optional(),
  classId: z.string().optional(),
  gender: z.enum(['male', 'female']).optional(),
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().max(100).optional(),
})

export type SearchStudentParams = z.infer<typeof searchStudentSchema>

// Schema d'inscription (avec paiement)
export const enrollmentSchema = createStudentSchema.extend({
  enrollmentFee: z.number().positive('Les frais d\'inscription doivent etre positifs'),
  paymentMethod: z.enum(['cash', 'mobile_money', 'bank_transfer'], {
    required_error: 'Le mode de paiement est requis',
  }),
  paymentReference: z.string().optional(),
})

export type EnrollmentFormData = z.infer<typeof enrollmentSchema>