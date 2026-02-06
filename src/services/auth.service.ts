/**
 * Service d'authentification
 * Gere la logique metier liee a l'authentification
 * Utilise apiClient centralise pour les appels HTTP
 */

import { apiClient, setAuthToken, removeAuthToken } from '@/lib/api/client'
import { API_ENDPOINTS } from '@/lib/api/config'
import type { User, UserRole, LoginRequest, RegisterRequest, LoginResponse } from '@/types'

/**
 * Mapping dynamique des rôles backend vers frontend
 * Le système accepte n'importe quel rôle du backend et le convertit automatiquement
 */
const ROLE_MAPPING: Record<string, UserRole> = {
  // Rôles en français (backend)
  ADMIN: 'admin',
  ADMINISTRATEUR: 'admin',
  DIRECTEUR: 'director',
  ENSEIGNANT: 'teacher',
  SECRETAIRE: 'secretary',
  PARENT: 'parent',
  ELEVE: 'student',
  // Rôles en anglais (alternative)
  ADMINISTRATOR: 'admin',
  DIRECTOR: 'director',
  TEACHER: 'teacher',
  SECRETARY: 'secretary',
  STUDENT: 'student',
}

/**
 * Mapper le nom de rôle backend vers le type frontend
 * Accepte dynamiquement les rôles du backend
 */
/**
 * Mapper le statut backend vers le type frontend
 */
function mapStatus(backendStatut: string | undefined): 'ACTIF' | 'INACTIF' | 'EN_ATTENTE' {
  if (backendStatut === 'ACTIF') return 'ACTIF'
  if (backendStatut === 'INACTIF') return 'INACTIF'
  if (backendStatut === 'EN_ATTENTE') return 'EN_ATTENTE'
  return 'ACTIF' // Fallback
}

function mapRole(backendRole: string | null | undefined): UserRole {
  if (!backendRole) {
    console.warn('[AuthService] mapRole: No role provided, defaulting to director')
    return 'director'
  }

  const normalizedRole = backendRole.toUpperCase().trim()

  // 1. Chercher dans le mapping prédéfini
  let mappedRole = ROLE_MAPPING[normalizedRole]

  // 2. Si pas trouvé, essayer de convertir automatiquement le rôle
  if (!mappedRole) {
    // Convertir le rôle backend en minuscules comme rôle frontend
    const autoMappedRole = normalizedRole.toLowerCase() as UserRole

    // Vérifier si c'est un rôle valide
    const validRoles: UserRole[] = [
      'admin',
      'director',
      'teacher',
      'parent',
      'secretary',
      'student',
    ]
    if (validRoles.includes(autoMappedRole)) {
      mappedRole = autoMappedRole
      console.log(`[AuthService] mapRole: Auto-mapped "${backendRole}" -> "${mappedRole}"`)
    } else {
      console.warn(`[AuthService] mapRole: Unknown role "${backendRole}", defaulting to director`)
      return 'director'
    }
  } else {
    console.log(`[AuthService] mapRole: "${backendRole}" -> "${mappedRole}"`)
  }

  return mappedRole
}

// Type pour la réponse backend (peut différer du type frontend)
interface BackendLoginResponse {
  token: string
  refreshToken?: string
  expiresIn?: number
  user: {
    id: number
    nom: string
    prenom: string
    email: string
    telephone?: string
    statut: string // EN_ATTENTE, ACTIF, INACTIF
    derniereConnexion?: string
    roleId: number
    roleName: string
    ecoleId: number | null
    ecoleNom: string | null
  }
  message: string
  success: boolean
}

class AuthService {
  /**
   * Connexion utilisateur (email OU téléphone + mot de passe)
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    // Utiliser identifier ou email pour compatibilité
    const identifier = credentials.identifier || credentials.email
    console.log('[AuthService] login: Attempting login for', identifier)

    // Envoyer identifier au backend
    const response = await apiClient.post<BackendLoginResponse>(API_ENDPOINTS.auth.login, {
      identifier,
      password: credentials.password,
    })

    console.log('[AuthService] login: Backend response received', {
      success: response.success,
      hasToken: !!response.token,
      user: response.user
        ? {
            id: response.user.id,
            email: response.user.email,
            roleName: response.user.roleName,
            roleId: response.user.roleId,
          }
        : null,
    })

    // Stocker le token si présent dans la réponse
    if (response.token) {
      setAuthToken(response.token)
    } else {
      console.error('[AuthService] login: No token in response!')
    }

    // Mapper la réponse backend vers le format frontend
    const mappedRole = mapRole(response.user?.roleName)

    const mappedResponse: LoginResponse = {
      success: response.success,
      accessToken: response.token,
      refreshToken: response.refreshToken || response.token,
      expiresIn: response.expiresIn ? response.expiresIn / 1000 : 86400, // Convertir ms en secondes
      user: {
        id: String(response.user?.id || ''),
        email: response.user?.email || '',
        telephone: response.user?.telephone,
        role: mappedRole,
        status: mapStatus(response.user?.statut),
        profile: {
          firstName: response.user?.prenom || '',
          lastName: response.user?.nom || '',
          phone: response.user?.telephone,
        },
        schoolId: response.user?.ecoleId ? String(response.user.ecoleId) : undefined,
        schoolName: response.user?.ecoleNom || undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
        lastLoginAt: response.user?.derniereConnexion
          ? new Date(response.user.derniereConnexion)
          : undefined,
      },
    }

    console.log('[AuthService] login: Mapped response', {
      success: mappedResponse.success,
      userRole: mappedResponse.user.role,
      userId: mappedResponse.user.id,
    })

    return mappedResponse
  }

  /**
   * Inscription d'une nouvelle ecole
   */
  async register(data: RegisterRequest): Promise<LoginResponse> {
    const response = await apiClient.post<BackendLoginResponse>(API_ENDPOINTS.auth.register, data)

    // Stocker le token si présent dans la réponse
    if (response.token) {
      setAuthToken(response.token)
    }

    // Mapper la réponse backend vers le format frontend
    return {
      success: response.success,
      accessToken: response.token,
      refreshToken: response.token,
      expiresIn: 86400,
      user: {
        id: String(response.user.id),
        email: response.user.email,
        role: mapRole(response.user.roleName),
        status: mapStatus(response.user.statut),
        profile: {
          firstName: response.user.prenom,
          lastName: response.user.nom,
        },
        schoolId: response.user.ecoleId ? String(response.user.ecoleId) : undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }
  }

  /**
   * Deconnexion
   */
  async logout(): Promise<void> {
    try {
      await apiClient.post(API_ENDPOINTS.auth.logout)
    } finally {
      // Toujours supprimer le token local
      removeAuthToken()
    }
  }

  /**
   * Recuperer l'utilisateur courant
   */
  async getCurrentUser(): Promise<User> {
    console.log('[AuthService] getCurrentUser: Fetching current user from backend')

    const response = await apiClient.get<BackendLoginResponse['user']>(API_ENDPOINTS.auth.me)

    console.log('[AuthService] getCurrentUser: Backend response', {
      id: response?.id,
      email: response?.email,
      roleName: response?.roleName,
    })

    // Mapper la réponse backend vers le format frontend
    const mappedRole = mapRole(response?.roleName)

    const user: User = {
      id: String(response?.id || ''),
      email: response?.email || '',
      role: mappedRole,
      status: mapStatus(response?.statut),
      profile: {
        firstName: response?.prenom || '',
        lastName: response?.nom || '',
      },
      schoolId: response?.ecoleId ? String(response.ecoleId) : undefined,
      schoolName: response?.ecoleNom || undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    console.log('[AuthService] getCurrentUser: Mapped user', {
      id: user.id,
      email: user.email,
      role: user.role,
    })

    return user
  }

  /**
   * Rafraichir le token
   */
  async refreshToken(refreshToken: string): Promise<LoginResponse> {
    const response = await apiClient.post<BackendLoginResponse>(API_ENDPOINTS.auth.refresh, {
      refreshToken,
    })

    // Mettre à jour le token
    if (response.token) {
      setAuthToken(response.token)
    }

    // Mapper la réponse
    return {
      success: response.success,
      accessToken: response.token,
      refreshToken: response.token,
      expiresIn: 86400,
      user: {
        id: String(response.user.id),
        email: response.user.email,
        role: mapRole(response.user.roleName),
        status: mapStatus(response.user.statut),
        profile: {
          firstName: response.user.prenom,
          lastName: response.user.nom,
        },
        schoolId: response.user.ecoleId ? String(response.user.ecoleId) : undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }
  }

  /**
   * Mot de passe oublie
   */
  async forgotPassword(email: string): Promise<void> {
    await apiClient.post(API_ENDPOINTS.auth.forgotPassword, { email })
  }

  /**
   * Reinitialiser le mot de passe
   */
  async resetPassword(token: string, password: string): Promise<void> {
    await apiClient.post(API_ENDPOINTS.auth.resetPassword, { token, password })
  }

  /**
   * Vérifier l'email
   */
  async verifyEmail(token: string): Promise<void> {
    await apiClient.post(API_ENDPOINTS.auth.verifyEmail, { token })
  }
}

export const authService = new AuthService()
export default authService
