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

export interface ParentSummary {
  matricule: string
  nom: string
  prenom: string
  email: string
  telephone: string
  relation: string
  principal: boolean
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
  elevePhotoUrl?: string
  eleveActeNaissanceUrl?: string
  eleveCertificatMedicalUrl?: string
  eleveBulletinUrl?: string
  classeId: number
  classeNom: string
  classeNiveau: string
  fraisScolarite: number
  anneeScolaireId: number
  anneeScolaireLibelle: string
  // Finances
  remise?: number
  fraisTransport?: number
  fraisCantine?: number
  fraisAssurance?: number
  // Echeancier
  echeances: Echeance[]
  generatedPassword?: string
  generatedEmail?: string
  // Bio & Location
  eleveDateNaissance?: string
  eleveLieuNaissance?: string
  eleveNationalite?: string
  eleveSexe?: string
  eleveQuartier?: string
  eleveVille?: string
  // Parents
  parents?: ParentSummary[]
}

export interface InscriptionCreateRequest {
  eleveId: number
  classeId: number
  anneeScolaireId?: number
  dateInscription?: string
  /** Numeros des tranches a marquer comme payees (ex: [1], [1,2], [1,2,3]) */
  tranchesPayees?: number[]
  // Finances
  remise?: number
  fraisTransport?: number
  fraisCantine?: number
  fraisAssurance?: number
}

export interface AnnulationRequest {
  motif: string
}
