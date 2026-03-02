/**
 * Types liés aux écoles et établissements
 */

import type { SubscriptionPlan, SubscriptionStatus } from './subscription'

// Régions du Cameroun
export type CameroonRegion =
  | 'Centre'
  | 'Littoral'
  | 'Ouest'
  | 'Nord-Ouest'
  | 'Sud-Ouest'
  | 'Nord'
  | 'Adamaoua'
  | 'Est'
  | 'Sud'
  | 'Extrême-Nord'

// Type d'établissement
export type SchoolType = 'primary' | 'secondary' | 'high_school' | 'technical'

// Statut de l'école
export type SchoolStatus = 'active' | 'inactive' | 'suspended' | 'trial' | 'pending' | 'rejected'

// Branding de l'école
export interface SchoolBranding {
  logoUrl?: string
  couleurPrimaire: string
  couleurSecondaire: string
}

// Ecole backend DTO (mapped from Java EcoleDto)
export interface SchoolBackend {
  id: number
  codeEcole: string
  nom: string
  adresse: string
  telephone: string
  email: string
  statutEcole: 'EN_ATTENTE' | 'VALIDEE' | 'REJETEE' | 'SUSPENDUE'
  slug: string
  motifRejet?: string
  dateValidation?: string
  nombreEleves?: number
  logoUrl?: string
  couleurPrimaire?: string
  couleurSecondaire?: string
  typeSecteur?: string
  typeEtablissement?: string
  sousSysteme?: string
  boitePostale?: string
  siteWeb?: string
  devise?: string
  anneeFondation?: number
  numeroAutorisation?: string
  quartierId?: number
  quartierNom?: string
  villeNom?: string
  departementNom?: string
  regionNom?: string
  directeurNom?: string
  directeurEmail?: string
  nombreClasses?: number
  createdAt: string
  updatedAt: string
}

// Adresse de l'école
export interface SchoolAddress {
  street?: string
  city: string
  region: CameroonRegion
  postalCode?: string
  country: string
}

// Contact de l'école
export interface SchoolContact {
  phone: string
  email: string
  website?: string
  fax?: string
}

// Paramètres de l'école
export interface SchoolSettings {
  academicYearStart: number // Mois de début (1-12)
  academicYearEnd: number // Mois de fin (1-12)
  gradingScale: number // 20 pour la plupart des écoles
  passingGrade: number // Note de passage (10 par défaut)
  currency: string // FCFA
  language: 'fr' | 'en' // Français ou Anglais
  timezone: string
}

// Statistiques de l'école
export interface SchoolStats {
  totalStudents: number
  totalTeachers: number
  totalClasses: number
  averageGrade: number
  attendanceRate: number
}

// Entité école principale
export interface School {
  id: string
  name: string
  code: string // Code unique de l'école
  type: SchoolType
  status: SchoolStatus
  address: SchoolAddress
  contact: SchoolContact
  settings: SchoolSettings
  logo?: string
  directorId: string
  subscriptionPlan: SubscriptionPlan
  subscriptionStatus: SubscriptionStatus
  subscriptionExpiresAt?: Date
  stats?: SchoolStats
  createdAt: Date
  updatedAt: Date
}

// Année académique
export interface AcademicYear {
  id: string
  schoolId: string
  name: string // Ex: "2024-2025"
  startDate: Date
  endDate: Date
  isCurrent: boolean
  createdAt: Date
}

// Période/Trimestre
export type PeriodType = 'trimester' | 'semester' | 'quarter'

export interface Period {
  id: string
  academicYearId: string
  schoolId: string
  name: string // Ex: "Trimestre 1"
  type: PeriodType
  startDate: Date
  endDate: Date
  order: number // 1, 2, 3 pour l'ordre
  isCurrent: boolean
  isGradesLocked: boolean
}
