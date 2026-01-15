/**
 * Constantes globales de l'application
 */

// Informations de l'application
export const APP_CONFIG = {
  NAME: process.env.NEXT_PUBLIC_APP_NAME || 'Help Digi School',
  DESCRIPTION: 'Plateforme de gestion scolaire pour les ecoles primaires et secondaires',
  URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  VERSION: '1.0.0',
  AUTHOR: 'IVANA YOH',
} as const

// Configuration de session
export const SESSION_CONFIG = {
  DURATION: Number(process.env.NEXT_PUBLIC_SESSION_DURATION) || 3600, // 1 heure
  REFRESH_THRESHOLD: 300, // Rafraichir si < 5 minutes restantes
  STORAGE_KEY: 'helpdigischool_session',
  TOKEN_KEY: 'helpdigischool_token',
} as const

// Configuration de pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  LIMIT_OPTIONS: [10, 25, 50, 100],
  MAX_LIMIT: 100,
} as const

// Formats de date
export const DATE_FORMATS = {
  DISPLAY: 'dd/MM/yyyy',
  DISPLAY_WITH_TIME: 'dd/MM/yyyy HH:mm',
  API: 'yyyy-MM-dd',
  API_WITH_TIME: "yyyy-MM-dd'T'HH:mm:ss",
  TIME_ONLY: 'HH:mm',
  MONTH_YEAR: 'MMMM yyyy',
  DAY_MONTH: 'dd MMMM',
} as const

// Devises
export const CURRENCY = {
  CODE: 'XAF',
  SYMBOL: 'FCFA',
  LOCALE: 'fr-CM',
} as const

// Niveaux scolaires
export const SCHOOL_LEVELS = {
  MATERNELLE: 'maternelle',
  PRIMAIRE: 'primaire',
  COLLEGE: 'college',
  LYCEE: 'lycee',
} as const

export const SCHOOL_LEVEL_LABELS: Record<string, string> = {
  maternelle: 'Maternelle',
  primaire: 'Primaire',
  college: 'College',
  lycee: 'Lycee',
}

// Types de paiement
export const PAYMENT_TYPES = {
  INSCRIPTION: 'inscription',
  SCOLARITE: 'scolarite',
  TRANSPORT: 'transport',
  CANTINE: 'cantine',
  UNIFORME: 'uniforme',
  FOURNITURES: 'fournitures',
  AUTRE: 'autre',
} as const

export const PAYMENT_TYPE_LABELS: Record<string, string> = {
  inscription: 'Frais d\'inscription',
  scolarite: 'Frais de scolarite',
  transport: 'Transport',
  cantine: 'Cantine',
  uniforme: 'Uniforme',
  fournitures: 'Fournitures',
  autre: 'Autre',
}

// Statuts de paiement
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PARTIAL: 'partial',
  PAID: 'paid',
  OVERDUE: 'overdue',
  CANCELLED: 'cancelled',
} as const

export const PAYMENT_STATUS_LABELS: Record<string, string> = {
  pending: 'En attente',
  partial: 'Partiel',
  paid: 'Paye',
  overdue: 'En retard',
  cancelled: 'Annule',
}

export const PAYMENT_STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  partial: 'bg-orange-100 text-orange-800',
  paid: 'bg-green-100 text-green-800',
  overdue: 'bg-red-100 text-red-800',
  cancelled: 'bg-gray-100 text-gray-800',
}

// Jours de la semaine
export const WEEKDAYS = [
  { value: 'monday', label: 'Lundi' },
  { value: 'tuesday', label: 'Mardi' },
  { value: 'wednesday', label: 'Mercredi' },
  { value: 'thursday', label: 'Jeudi' },
  { value: 'friday', label: 'Vendredi' },
  { value: 'saturday', label: 'Samedi' },
] as const

// Trimestres
export const TRIMESTERS = [
  { value: 1, label: '1er Trimestre' },
  { value: 2, label: '2eme Trimestre' },
  { value: 3, label: '3eme Trimestre' },
] as const

// Genres
export const GENDERS = {
  MALE: 'male',
  FEMALE: 'female',
} as const

export const GENDER_LABELS: Record<string, string> = {
  male: 'Masculin',
  female: 'Feminin',
}