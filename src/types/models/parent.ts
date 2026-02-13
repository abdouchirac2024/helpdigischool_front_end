/**
 * Types liés aux parents d'élèves
 */

// Type de relation avec l'élève (correspond à l'enum backend)
export type TypeRelation =
  | 'PERE'
  | 'MERE'
  | 'TUTEUR_LEGAL'
  | 'GRAND_PARENT'
  | 'ONCLE'
  | 'TANTE'
  | 'AUTRE'

// Labels pour les types de relation
export const TypeRelationLabels: Record<TypeRelation, string> = {
  PERE: 'Père',
  MERE: 'Mère',
  TUTEUR_LEGAL: 'Tuteur légal',
  GRAND_PARENT: 'Grand-parent',
  ONCLE: 'Oncle',
  TANTE: 'Tante',
  AUTRE: 'Autre',
}

// Types de pièce d'identité
export type PieceIdentiteType = 'CNI' | 'PASSEPORT' | 'PERMIS_CONDUIRE' | 'AUTRE'

export const PieceIdentiteTypeLabels: Record<PieceIdentiteType, string> = {
  CNI: "Carte Nationale d'Identité",
  PASSEPORT: 'Passeport',
  PERMIS_CONDUIRE: 'Permis de conduire',
  AUTRE: 'Autre',
}

// Entité parent (correspond au ParentDto backend)
export interface Parent {
  idParent: number
  matriculeParent: string
  nom: string
  prenom: string
  email: string
  telephone: string
  telephoneSecondaire?: string
  adresse: string
  quartierId: number
  quartierNom?: string
  profession?: string
  employeur?: string
  photoUrl?: string
  pieceIdentiteType?: PieceIdentiteType
  pieceIdentiteNumero?: string
  actif: boolean
  createdAt?: string
  updatedAt?: string
  deletedAt?: string
}

// DTO pour création/modification de parent
export interface ParentFormData {
  nom: string
  prenom: string
  email: string
  telephone: string
  telephoneSecondaire?: string
  adresse: string
  quartierId: number
  profession?: string
  employeur?: string
  photoUrl?: string
  pieceIdentiteType?: PieceIdentiteType
  pieceIdentiteNumero?: string
  actif?: boolean
}

// Entité relation élève-parent (correspond au EleveParentDto backend)
export interface EleveParent {
  idEleveParent: number
  eleveId: number
  eleveMatricule?: string
  eleveNom?: string
  elevePrenom?: string
  eleveClasse?: string
  parentId: number
  parentMatricule?: string
  parentNom?: string
  parentPrenom?: string
  parentTelephone?: string
  parentEmail?: string
  typeRelation: TypeRelation
  estPrincipal: boolean
  autorisePriseEnCharge: boolean
  autoriseUrgence: boolean
  notes?: string
  createdAt?: string
  updatedAt?: string
  createdBy?: number
  updatedBy?: number
}

// DTO pour création/modification de relation élève-parent
export interface EleveParentFormData {
  eleveId: number
  parentId: number
  typeRelation: TypeRelation
  estPrincipal?: boolean
  autorisePriseEnCharge?: boolean
  autoriseUrgence?: boolean
  notes?: string
  createdBy?: number
  updatedBy?: number
}

// Parent avec ses enfants (vue enrichie)
export interface ParentWithChildren extends Parent {
  enfants: {
    idEleve: number
    matricule: string
    nom: string
    prenom: string
    typeRelation: TypeRelation
    estPrincipal: boolean
  }[]
}

// Contact d'urgence d'un élève
export interface ContactUrgence {
  parentNom: string
  parentPrenom: string
  telephone: string
  email?: string
  typeRelation: TypeRelation
  estPrincipal: boolean
}

// Historique des modifications
export interface EleveParentHistory {
  idHistory: number
  eleveParentId: number
  eleveId: number
  parentId: number
  ancienneRelation?: TypeRelation
  nouvelleRelation?: TypeRelation
  ancienEstPrincipal?: boolean
  nouveauEstPrincipal?: boolean
  action: 'CREATE' | 'UPDATE' | 'DELETE'
  motif?: string
  modifiePar: number
  dateModification: string
}
