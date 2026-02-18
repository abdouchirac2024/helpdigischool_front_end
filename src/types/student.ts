import { BaseEntity, ID } from './index'

export enum StatutEleve {
  ACTIF = 'ACTIF',
  EXCLU = 'EXCLU',
  ABANDON = 'ABANDON',
  TRANSFERE = 'TRANSFERE',
  DIPLOME = 'DIPLOME',
}

export interface QuartierDto {
  id: number
  nom: string
}

export interface EleveDto extends BaseEntity {
  id: ID // Mapped from idEleve
  matricule: string
  nom: string
  prenom: string
  dateNaissance: string // ISO Date
  statut: StatutEleve

  // Relations mapped flat for list display
  quartier?: QuartierDto
  classeActuelle?: string // Derived in Backend DTO
  classeId?: number
}

export interface CreateEleveRequest {
  nom: string
  prenom: string
  dateNaissance: string
  lieuNaissance?: string
  sexe: 'M' | 'F'
  nationalite?: string
  quartierId?: number
}

export interface AnneeScolaireResponse {
  id: number
  libelle: string
  dateDebut: string
  dateFin: string
  statut: boolean
}
