/**
 * Types lies aux inscriptions d'eleves
 */

export type StatutInscription = 'EN_ATTENTE' | 'VALIDEE' | 'ANNULEE'

export const StatutInscriptionLabels: Record<StatutInscription, string> = {
  EN_ATTENTE: 'En attente',
  VALIDEE: 'Validee',
  ANNULEE: 'Annulee',
}

export type StatutEcheance = 'EN_ATTENTE' | 'PAYEE' | 'EN_RETARD'

export const StatutEcheanceLabels: Record<StatutEcheance, string> = {
  EN_ATTENTE: 'En attente',
  PAYEE: 'Payee',
  EN_RETARD: 'En retard',
}

export interface Echeance {
  idEcheance: number
  numero: number
  libelle: string
  montant: number
  dateEcheance: string
  datePaiement?: string
  statut: StatutEcheance
}

export interface Inscription {
  idInscription: number
  numeroInscription: string
  dateInscription: string
  montantTotal: number
  statutInscription: StatutInscription
  motifAnnulation?: string
  eleveId: number
  eleveMatricule: string
  eleveNom: string
  elevePrenom: string
  classeId: number
  classeNom: string
  classeNiveau: string
  fraisScolarite: number
  anneeScolaireId: number
  anneeScolaireLibelle: string
  echeances: Echeance[]
  generatedPassword?: string
  generatedEmail?: string
}

export interface InscriptionCreateRequest {
  eleveId: number
  classeId: number
  anneeScolaireId?: number
  dateInscription?: string
  /** Numeros des tranches a marquer comme payees (ex: [1], [1,2], [1,2,3]) */
  tranchesPayees?: number[]
}

export interface AnnulationRequest {
  motif: string
}
