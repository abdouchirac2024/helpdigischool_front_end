/**
 * Types pour la localisation géographique (Cameroun)
 */

export interface Region {
  id: number
  code: string
  nom: string
}

export interface Departement {
  id: number
  code: string
  nom: string
  chefLieu: string
  regionId: number
  regionNom: string
}

export interface Arrondissement {
  id: number
  code: string
  nom: string
  departementId: number
  departementNom: string
}

export interface Ville {
  id: number
  code: string
  nom: string
  codePostal: string
  arrondissementId: number
  arrondissementNom: string
}

export interface Quartier {
  id: number
  code: string
  nom: string
  description: string
  villeId: number
  villeNom: string
}

export interface Adresse {
  id: number
  quartierId: number
  quartierNom: string
  rue: string
  repere: string
  latitude: number
  longitude: number
}
