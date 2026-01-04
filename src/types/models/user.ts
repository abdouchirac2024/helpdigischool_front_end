/**
 * Types liés aux utilisateurs et à l'authentification
 */

// Rôles disponibles dans l'application
export type UserRole = 'admin' | 'director' | 'teacher' | 'parent' | 'secretary'

// Statut d'un compte utilisateur
export type UserStatus = 'active' | 'inactive' | 'suspended' | 'pending'

// Genre
export type Gender = 'M' | 'F'

// Informations de profil utilisateur
export interface UserProfile {
  firstName: string
  lastName: string
  phone?: string
  avatar?: string
  address?: string
  city?: string
  region?: string
}

// Entité utilisateur principale
export interface User {
  id: string
  email: string
  role: UserRole
  status: UserStatus
  profile: UserProfile
  schoolId?: string // null pour admin SaaS
  createdAt: Date
  updatedAt: Date
  lastLoginAt?: Date
}

// Utilisateur authentifié avec token
export interface AuthenticatedUser extends User {
  accessToken: string
  refreshToken?: string
}

// Données de session
export interface UserSession {
  user: User
  expiresAt: Date
  isAuthenticated: boolean
}

// Permissions par rôle
export interface RolePermissions {
  canManageSchools: boolean
  canManageUsers: boolean
  canManageClasses: boolean
  canManageStudents: boolean
  canEnterGrades: boolean
  canViewGrades: boolean
  canManagePayments: boolean
  canViewReports: boolean
  canSendMessages: boolean
}

// Mapping des permissions par rôle
export const ROLE_PERMISSIONS: Record<UserRole, RolePermissions> = {
  admin: {
    canManageSchools: true,
    canManageUsers: true,
    canManageClasses: true,
    canManageStudents: true,
    canEnterGrades: false,
    canViewGrades: true,
    canManagePayments: true,
    canViewReports: true,
    canSendMessages: true,
  },
  director: {
    canManageSchools: false,
    canManageUsers: true,
    canManageClasses: true,
    canManageStudents: true,
    canEnterGrades: false,
    canViewGrades: true,
    canManagePayments: true,
    canViewReports: true,
    canSendMessages: true,
  },
  teacher: {
    canManageSchools: false,
    canManageUsers: false,
    canManageClasses: false,
    canManageStudents: false,
    canEnterGrades: true,
    canViewGrades: true,
    canManagePayments: false,
    canViewReports: true,
    canSendMessages: true,
  },
  parent: {
    canManageSchools: false,
    canManageUsers: false,
    canManageClasses: false,
    canManageStudents: false,
    canEnterGrades: false,
    canViewGrades: true,
    canManagePayments: true,
    canViewReports: true,
    canSendMessages: true,
  },
  secretary: {
    canManageSchools: false,
    canManageUsers: false,
    canManageClasses: true,
    canManageStudents: true,
    canEnterGrades: false,
    canViewGrades: true,
    canManagePayments: true,
    canViewReports: true,
    canSendMessages: true,
  },
}