/**
 * Types liés aux abonnements et plans (SaaS)
 */

// Plans disponibles
export type SubscriptionPlan = 'free' | 'starter' | 'professional' | 'enterprise'

// Statut de l'abonnement
export type SubscriptionStatus = 'active' | 'trial' | 'expired' | 'cancelled' | 'suspended'

// Fréquence de facturation
export type BillingCycle = 'monthly' | 'quarterly' | 'yearly'

// Limites par plan
export interface PlanLimits {
  maxStudents: number
  maxTeachers: number
  maxClasses: number
  maxStorage: number // en MB
  canExportPdf: boolean
  canSendSms: boolean
  canUseMobileMoney: boolean
  hasSupport: boolean
  hasPrioritySupport: boolean
  hasCustomBranding: boolean
  hasApiAccess: boolean
}

// Configuration des plans
export const PLAN_CONFIGS: Record<SubscriptionPlan, { name: string; price: number; limits: PlanLimits }> = {
  free: {
    name: 'Gratuit',
    price: 0,
    limits: {
      maxStudents: 50,
      maxTeachers: 5,
      maxClasses: 3,
      maxStorage: 100,
      canExportPdf: false,
      canSendSms: false,
      canUseMobileMoney: false,
      hasSupport: false,
      hasPrioritySupport: false,
      hasCustomBranding: false,
      hasApiAccess: false,
    },
  },
  starter: {
    name: 'Starter',
    price: 15000, // FCFA/mois
    limits: {
      maxStudents: 200,
      maxTeachers: 15,
      maxClasses: 10,
      maxStorage: 500,
      canExportPdf: true,
      canSendSms: false,
      canUseMobileMoney: true,
      hasSupport: true,
      hasPrioritySupport: false,
      hasCustomBranding: false,
      hasApiAccess: false,
    },
  },
  professional: {
    name: 'Professionnel',
    price: 35000, // FCFA/mois
    limits: {
      maxStudents: 500,
      maxTeachers: 50,
      maxClasses: 30,
      maxStorage: 2000,
      canExportPdf: true,
      canSendSms: true,
      canUseMobileMoney: true,
      hasSupport: true,
      hasPrioritySupport: true,
      hasCustomBranding: true,
      hasApiAccess: false,
    },
  },
  enterprise: {
    name: 'Entreprise',
    price: 75000, // FCFA/mois
    limits: {
      maxStudents: -1, // Illimité
      maxTeachers: -1,
      maxClasses: -1,
      maxStorage: 10000,
      canExportPdf: true,
      canSendSms: true,
      canUseMobileMoney: true,
      hasSupport: true,
      hasPrioritySupport: true,
      hasCustomBranding: true,
      hasApiAccess: true,
    },
  },
}

// Abonnement
export interface Subscription {
  id: string
  schoolId: string
  plan: SubscriptionPlan
  status: SubscriptionStatus
  billingCycle: BillingCycle
  currentPeriodStart: Date
  currentPeriodEnd: Date
  cancelAtPeriodEnd: boolean
  trialEndsAt?: Date
  createdAt: Date
  updatedAt: Date
}

// Facture
export interface Invoice {
  id: string
  subscriptionId: string
  schoolId: string
  number: string // Numéro de facture
  amount: number
  tax: number
  total: number
  currency: string
  status: 'draft' | 'pending' | 'paid' | 'overdue' | 'cancelled'
  dueDate: Date
  paidAt?: Date
  items: InvoiceItem[]
  createdAt: Date
}

// Ligne de facture
export interface InvoiceItem {
  description: string
  quantity: number
  unitPrice: number
  total: number
}