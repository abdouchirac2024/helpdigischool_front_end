/**
 * Types liés aux paiements (frais de scolarité, cantine, etc.)
 */

// Type de paiement
export type PaymentType =
  | 'tuition'       // Scolarité
  | 'registration'  // Inscription
  | 'canteen'       // Cantine
  | 'transport'     // Transport
  | 'activities'    // Activités extrascolaires
  | 'uniform'       // Uniforme
  | 'books'         // Livres/Fournitures
  | 'other'         // Autre

// Méthode de paiement
export type PaymentMethod =
  | 'cash'          // Espèces
  | 'mobile_money'  // Mobile Money (MTN, Orange, Wave)
  | 'bank_transfer' // Virement bancaire
  | 'check'         // Chèque
  | 'card'          // Carte bancaire

// Opérateur Mobile Money
export type MobileMoneyProvider = 'mtn' | 'orange' | 'wave'

// Statut du paiement
export type PaymentStatus =
  | 'pending'       // En attente
  | 'processing'    // En cours de traitement
  | 'paid'          // Payé
  | 'failed'        // Échoué
  | 'refunded'      // Remboursé
  | 'overdue'       // En retard

// Labels de statut en français
export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  pending: 'En attente',
  processing: 'En cours',
  paid: 'Payé',
  failed: 'Échoué',
  refunded: 'Remboursé',
  overdue: 'En retard',
}

// Labels de type en français
export const PAYMENT_TYPE_LABELS: Record<PaymentType, string> = {
  tuition: 'Scolarité',
  registration: 'Inscription',
  canteen: 'Cantine',
  transport: 'Transport',
  activities: 'Activités',
  uniform: 'Uniforme',
  books: 'Livres/Fournitures',
  other: 'Autre',
}

// Entité paiement
export interface Payment {
  id: string
  schoolId: string
  studentId: string
  parentId: string
  academicYearId: string
  periodId?: string
  reference: string // Ex: PAY-2024-0001
  type: PaymentType
  amount: number
  currency: string // FCFA
  method: PaymentMethod
  mobileMoneyProvider?: MobileMoneyProvider
  transactionId?: string // ID de transaction externe
  status: PaymentStatus
  dueDate: Date
  paidAt?: Date
  description?: string
  receiptUrl?: string
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

// Paiement avec détails (pour affichage)
export interface PaymentWithDetails extends Payment {
  studentName: string
  parentName: string
  parentPhone: string
}

// Échéancier de paiement
export interface PaymentSchedule {
  id: string
  schoolId: string
  studentId: string
  academicYearId: string
  type: PaymentType
  totalAmount: number
  installments: PaymentInstallment[]
  createdAt: Date
}

// Tranche de paiement
export interface PaymentInstallment {
  id: string
  scheduleId: string
  number: number // 1, 2, 3...
  amount: number
  dueDate: Date
  status: PaymentStatus
  paymentId?: string // Lien vers le paiement effectif
}

// Statistiques de paiement
export interface PaymentStats {
  totalPaid: number
  totalPending: number
  totalOverdue: number
  transactionCount: number
  collectionRate: number // Taux de recouvrement
}

// Résumé de paiement par élève
export interface StudentPaymentSummary {
  studentId: string
  studentName: string
  totalDue: number
  totalPaid: number
  balance: number
  lastPaymentDate?: Date
  status: 'paid' | 'partial' | 'unpaid' | 'overdue'
}