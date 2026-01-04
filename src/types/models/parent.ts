/**
 * Types liés aux parents d'élèves
 */

import type { Gender } from './user'

// Relation avec l'élève
export type ParentRelation =
  | 'father'    // Père
  | 'mother'    // Mère
  | 'guardian'  // Tuteur
  | 'other'     // Autre

// Profession du parent
export interface ParentProfession {
  title: string
  company?: string
  sector?: string
}

// Entité parent
export interface Parent {
  id: string
  userId: string // Lien vers le compte utilisateur
  firstName: string
  lastName: string
  gender: Gender
  relation: ParentRelation
  phone: string
  secondaryPhone?: string
  email: string
  profession?: ParentProfession
  address?: string
  city?: string
  region?: string
  isEmergencyContact: boolean
  canPickupChild: boolean
  createdAt: Date
  updatedAt: Date
}

// Parent avec ses enfants
export interface ParentWithChildren extends Parent {
  children: {
    id: string
    firstName: string
    lastName: string
    className: string
    photo?: string
  }[]
}

// Contact d'un élève (vue simplifiée pour les enseignants)
export interface StudentParentContact {
  parentName: string
  relation: ParentRelation
  phone: string
  email: string
  isEmergencyContact: boolean
}
