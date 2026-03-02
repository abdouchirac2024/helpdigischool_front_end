/**
 * Types liés aux utilisateurs et à l'authentification
 */

// Rôles disponibles dans l'application
export type UserRole = 'admin' | 'director' | 'teacher' | 'parent' | 'secretary' | 'student'

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
  schoolId?: string // tenantId technique (ex: CM-CENTRE-ECOLE-001), null pour admin SaaS
  ecoleId?: number // id numerique de l'ecole en base
  schoolName?: string // nom affichable de l'ecole (ex: "Ecole La Victoire")
  schoolStatus?: string // 'EN_ATTENTE', 'VALIDEE', 'REJETEE', etc.
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
  student: {
    canManageSchools: false,
    canManageUsers: false,
    canManageClasses: false,
    canManageStudents: false,
    canEnterGrades: false,
    canViewGrades: true,
    canManagePayments: false,
    canViewReports: false,
    canSendMessages: true,
  },
}

// DTO backend pour UserInfo (correspond a AuthResponse.UserInfo Java)
export interface BackendUserInfo {
  id: number
  email: string
  nom: string
  prenom: string
  telephone: string | null
  role: 'SUPER_ADMIN' | 'ADMIN_ECOLE' | 'ENSEIGNANT' | 'PARENT' | 'SECRETAIRE' | 'COMPTABLE'
  tenantId: string
  ecoleId: number | null
  ecoleNom: string | null
  codeEcole: string | null
  statutEcole: string | null
  status: 'ACTIVE' | 'INACTIVE' | 'LOCKED' | 'PENDING'
  lastLogin: string | null
  createdAt: string | null
  avatarUrl: string | null
}

// Statistiques utilisateurs retournees par GET /api/users/stats
export interface UserStats {
  total: number
  active: number
  inactive: number
  locked: number
  pending: number
  connected: number
}
