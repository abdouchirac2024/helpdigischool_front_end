/**
 * Types pour l'API d'authentification
 */

import type { User, UserRole } from '../models/user'

// Requête de connexion
export interface LoginRequest {
  email: string
  password: string
  rememberMe?: boolean
}

// Réponse de connexion
export interface LoginResponse {
  success: boolean
  user: User
  accessToken: string
  refreshToken: string
  expiresIn: number // Durée en secondes
}

// Requête d'inscription école
export interface RegisterSchoolRequest {
  // Informations école
  schoolName: string
  schoolType: 'primary' | 'secondary' | 'high_school' | 'technical'
  city: string
  region: string
  phone: string
  email: string
  // Informations admin/directeur
  adminFirstName: string
  adminLastName: string
  adminEmail: string
  adminPhone: string
  password: string
  confirmPassword: string
}

// Réponse d'inscription
export interface RegisterResponse {
  success: boolean
  message: string
  schoolId: string
  userId: string
}

// Alias pour compatibilite avec les services
export type RegisterRequest = RegisterSchoolRequest

// Requête de réinitialisation de mot de passe
export interface ForgotPasswordRequest {
  email: string
}

export interface ForgotPasswordResponse {
  success: boolean
  message: string
}

// Requête de nouveau mot de passe
export interface ResetPasswordRequest {
  token: string
  password: string
  confirmPassword: string
}

export interface ResetPasswordResponse {
  success: boolean
  message: string
}

// Requête de changement de mot de passe
export interface ChangePasswordRequest {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

// Requête de rafraîchissement du token
export interface RefreshTokenRequest {
  refreshToken: string
}

export interface RefreshTokenResponse {
  accessToken: string
  refreshToken: string
  expiresIn: number
}

// Requête de vérification email
export interface VerifyEmailRequest {
  token: string
}

// Profil utilisateur
export interface UpdateProfileRequest {
  firstName?: string
  lastName?: string
  phone?: string
  avatar?: string
  address?: string
  city?: string
}

// Vérification du token actuel
export interface VerifyTokenResponse {
  valid: boolean
  user?: User
  expiresAt?: string
}

// Invitation utilisateur
export interface InviteUserRequest {
  email: string
  role: UserRole
  schoolId?: string
  classIds?: string[] // Pour les enseignants
  studentIds?: string[] // Pour les parents
}

export interface InviteUserResponse {
  success: boolean
  message: string
  invitationId: string
}

// Acceptation d'invitation
export interface AcceptInvitationRequest {
  token: string
  firstName: string
  lastName: string
  phone: string
  password: string
  confirmPassword: string
}
