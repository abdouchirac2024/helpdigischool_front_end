/**
 * Types pour l'API des paiements
 */

import type { PaymentType, PaymentMethod, PaymentStatus, MobileMoneyProvider, Payment, PaymentWithDetails, PaymentStats, StudentPaymentSummary } from '../models/payment'
import type { PaginationParams, FilterParams, PaginatedResponse } from './common'

// Filtres de paiements
export interface PaymentFilters extends FilterParams {
  studentId?: string
  parentId?: string
  classId?: string
  type?: PaymentType
  method?: PaymentMethod
  status?: PaymentStatus
}

// Liste des paiements
export interface GetPaymentsRequest extends PaginationParams, PaymentFilters {
  schoolId: string
  academicYearId?: string
}

export type GetPaymentsResponse = PaginatedResponse<PaymentWithDetails>

// Création d'un paiement
export interface CreatePaymentRequest {
  schoolId: string
  studentId: string
  academicYearId: string
  periodId?: string
  type: PaymentType
  amount: number
  method: PaymentMethod
  mobileMoneyProvider?: MobileMoneyProvider
  dueDate: string
  description?: string
}

// Initiation paiement Mobile Money
export interface InitiateMobileMoneyRequest {
  paymentId: string
  phoneNumber: string
  provider: MobileMoneyProvider
}

export interface InitiateMobileMoneyResponse {
  success: boolean
  transactionId: string
  status: 'pending' | 'processing'
  message: string
  checkStatusUrl: string
}

// Vérification du statut Mobile Money
export interface CheckMobileMoneyStatusRequest {
  transactionId: string
  provider: MobileMoneyProvider
}

export interface CheckMobileMoneyStatusResponse {
  success: boolean
  transactionId: string
  status: 'pending' | 'completed' | 'failed'
  paymentId?: string
  amount?: number
  message: string
}

// Marquer comme payé (espèces/virement)
export interface MarkAsPaidRequest {
  paymentId: string
  method: PaymentMethod
  transactionId?: string
  paidAt?: string
  notes?: string
}

// Génération de reçu
export interface GenerateReceiptRequest {
  paymentId: string
}

export interface GenerateReceiptResponse {
  success: boolean
  receiptUrl: string
  receiptNumber: string
}

// Création d'un échéancier
export interface CreatePaymentScheduleRequest {
  schoolId: string
  studentId: string
  academicYearId: string
  type: PaymentType
  totalAmount: number
  installmentsCount: number
  startDate: string
}

// Rappel de paiement
export interface SendPaymentReminderRequest {
  paymentIds: string[]
  method: 'email' | 'sms' | 'both'
  customMessage?: string
}

export interface SendPaymentReminderResponse {
  success: boolean
  sentCount: number
  failedCount: number
}

// Statistiques de paiements
export interface GetPaymentStatsRequest {
  schoolId: string
  academicYearId?: string
  periodId?: string
  classId?: string
}

export interface GetPaymentStatsResponse {
  success: boolean
  data: PaymentStats & {
    byType: { type: PaymentType; amount: number; count: number }[]
    byMethod: { method: PaymentMethod; amount: number; count: number }[]
    monthlyTrend: { month: string; collected: number; pending: number }[]
  }
}

// Résumé par élève
export interface GetStudentPaymentSummaryRequest {
  schoolId: string
  classId?: string
  academicYearId: string
  status?: 'paid' | 'partial' | 'unpaid' | 'overdue'
}

export type GetStudentPaymentSummaryResponse = PaginatedResponse<StudentPaymentSummary>

// Export des paiements
export interface ExportPaymentsRequest {
  schoolId: string
  format: 'csv' | 'excel' | 'pdf'
  filters?: PaymentFilters
  startDate?: string
  endDate?: string
}

export interface ExportPaymentsResponse {
  success: boolean
  downloadUrl: string
  expiresAt: string
}
