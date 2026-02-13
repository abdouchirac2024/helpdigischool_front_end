export interface TeacherDto {
  id: number
  userId: number
  nom: string
  prenom: string
  email: string // From User
  telephone: string
  specialite: string
  grade?: string
  experience?: number
  bio?: string
  photoUrl?: string
  // Computed/Additional fields for UI
  classes?: string[] // To be populated if needed
  hours?: number
  rating?: number
  status?: string
}

export interface CreateTeacherRequest {
  nom: string
  prenom: string
  email: string
  telephone: string
  specialite: string
  grade?: string
  experience?: number
  bio?: string
}
