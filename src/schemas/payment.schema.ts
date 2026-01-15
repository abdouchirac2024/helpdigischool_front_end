/**
 * Schemas de validation pour les paiements
 */

import { z } from 'zod'
import { PAYMENT_TYPES, PAYMENT_STATUS } from '@/constants'

// Schema de creation de paiement
export const createPaymentSchema = z.object({
  studentId: z.string().min(1, 'L\'eleve est requis'),
  type: z.enum(
    Object.values(PAYMENT_TYPES) as [string, ...string[]],
    { required_error: 'Le type de paiement est requis' }
  ),
  amount: z
    .number()
    .positive('Le montant doit etre positif')
    .min(100, 'Le montant minimum est de 100 FCFA'),
  dueDate: z.string().min(1, 'La date d\'echeance est requise'),
  description: z.string().optional(),
})

export type CreatePaymentFormData = z.infer<typeof createPaymentSchema>

// Schema d'enregistrement de paiement (reception)
export const recordPaymentSchema = z.object({
  paymentId: z.string().min(1, 'Le paiement est requis'),
  amountPaid: z
    .number()
    .positive('Le montant doit etre positif'),
  paymentMethod: z.enum(['cash', 'mobile_money', 'bank_transfer', 'check'], {
    required_error: 'Le mode de paiement est requis',
  }),
  paymentDate: z.string().min(1, 'La date de paiement est requise'),
  reference: z.string().optional(),
  notes: z.string().optional(),
})

export type RecordPaymentFormData = z.infer<typeof recordPaymentSchema>

// Schema de mise a jour de paiement
export const updatePaymentSchema = z.object({
  type: z.enum(Object.values(PAYMENT_TYPES) as [string, ...string[]]).optional(),
  amount: z.number().positive().optional(),
  dueDate: z.string().optional(),
  status: z.enum(Object.values(PAYMENT_STATUS) as [string, ...string[]]).optional(),
  description: z.string().optional(),
})

export type UpdatePaymentFormData = z.infer<typeof updatePaymentSchema>

// Schema de recherche de paiements
export const searchPaymentSchema = z.object({
  studentId: z.string().optional(),
  classId: z.string().optional(),
  type: z.enum(Object.values(PAYMENT_TYPES) as [string, ...string[]]).optional(),
  status: z.enum(Object.values(PAYMENT_STATUS) as [string, ...string[]]).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  minAmount: z.number().optional(),
  maxAmount: z.number().optional(),
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().max(100).optional(),
})

export type SearchPaymentParams = z.infer<typeof searchPaymentSchema>

// Schema de rappel de paiement
export const paymentReminderSchema = z.object({
  paymentIds: z.array(z.string()).min(1, 'Selectionnez au moins un paiement'),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caracteres'),
  sendSms: z.boolean().default(false),
  sendEmail: z.boolean().default(true),
})

export type PaymentReminderFormData = z.infer<typeof paymentReminderSchema>