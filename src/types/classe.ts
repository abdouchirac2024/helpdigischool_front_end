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
  ARCHIVED = 'ARCHIVED',
  INACTIVE = 'INACTIVE', // Assuming a possible inactive state based on standard patterns
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

export interface CreateClasseRequest {
  nomClasse: string
  niveau: Niveau
  capacite?: number
  description?: string
}

export interface UpdateClasseRequest extends Partial<CreateClasseRequest> {
  id: number
}
