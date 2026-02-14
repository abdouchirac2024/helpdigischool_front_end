export enum Niveau {
  MATERNELLE = 'MATERNELLE',
  PRIMAIRE = 'PRIMAIRE',
  COLLEGE = 'COLLEGE',
  LYCEE = 'LYCEE',
  NURSERY = 'NURSERY',
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY',
  HIGH_SCHOOL = 'HIGH_SCHOOL',
}

export enum StatutClasse {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ARCHIVEE = 'ARCHIVEE',
}

export interface ClasseDto {
  id: number
  nomClasse: string
  niveau: Niveau
  sousSysteme?: string
  section?: string
  capacite?: number
  statut?: StatutClasse
  effectifActuel?: number
  fraisScolarite?: number
  description?: string

  // Relations
  ecoleId?: number
  ecoleNom?: string
  anneeScolaireId?: number
  anneeScolaireLibelle?: string
  titulaireId?: number
  titulaireNom?: string
}

export enum SousSysteme {
  FRANCOPHONE = 'FRANCOPHONE',
  ANGLOPHONE = 'ANGLOPHONE',
  BILINGUE = 'BILINGUE',
}

export interface CreateClasseRequest {
  nomClasse: string
  niveau: Niveau
  sousSysteme?: SousSysteme
  section?: string
  capacite?: number
  statut?: StatutClasse
  fraisScolarite?: number
  description?: string
  anneeScolaireId?: number
  titulaireId?: number
}

export interface UpdateClasseRequest extends Partial<CreateClasseRequest> {
  id: number
}
