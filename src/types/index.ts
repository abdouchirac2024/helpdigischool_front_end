/**
 * Types HelpDigiSchool
 *
 * Ce fichier centralise tous les exports de types pour le projet.
 *
 * Usage:
 * import { User, Student, Grade } from '@/types'
 * import type { LoginRequest, ApiResponse } from '@/types'
 */

// ============================================
// MODÈLES (Entités métier)
// ============================================
export * from './models'
export * from './classe'
export * from './student'
export * from './teacher'

// ============================================
// API (Requêtes et Réponses)
// ============================================
export * from './api'

// ============================================
// TYPES UTILITAIRES
// ============================================

/**
 * Rend tous les champs d'un type optionnels sauf ceux spécifiés
 */
export type PartialExcept<T, K extends keyof T> = Partial<Omit<T, K>> & Pick<T, K>

/**
 * Rend certains champs requis
 */
export type RequireFields<T, K extends keyof T> = T & Required<Pick<T, K>>

/**
 * Extrait les clés d'un type qui ont une valeur de type V
 */
export type KeysOfType<T, V> = {
  [K in keyof T]: T[K] extends V ? K : never
}[keyof T]

/**
 * Type pour les ID (string pour MongoDB/UUID)
 */
export type ID = string

/**
 * Type pour les dates ISO
 */
export type ISODateString = string

/**
 * Type pour les timestamps
 */
export interface Timestamps {
  createdAt: Date
  updatedAt: Date
}

/**
 * Type pour les entités avec ID et timestamps
 */
export interface BaseEntity extends Timestamps {
  id: ID
}

/**
 * Type pour les formulaires (rend les dates en string)
 */
export type FormData<T> = {
  [K in keyof T]: T[K] extends Date ? string : T[K]
}

/**
 * Type pour les réponses de liste
 */
export interface ListResponse<T> {
  items: T[]
  total: number
}
