/**
 * Service de gestion des rôles
 * Récupère dynamiquement les rôles depuis le backend
 */

import { apiClient } from '@/lib/api/client'
import { API_ENDPOINTS } from '@/lib/api/config'
import type { UserRole } from '@/types'

/**
 * Interface pour un rôle backend
 */
export interface BackendRole {
  id: number
  name: string
}

/**
 * Cache pour les rôles (évite les appels répétés)
 */
let rolesCache: BackendRole[] | null = null
let rolesMappingCache: Record<string, UserRole> | null = null

/**
 * Mapping de base des noms de rôles backend vers frontend
 */
const BASE_ROLE_MAPPING: Record<string, UserRole> = {
  // Français
  ADMIN: 'admin',
  ADMINISTRATEUR: 'admin',
  DIRECTEUR: 'director',
  ENSEIGNANT: 'teacher',
  SECRETAIRE: 'secretary',
  PARENT: 'parent',
  ELEVE: 'student',
  // Anglais
  ADMINISTRATOR: 'admin',
  DIRECTOR: 'director',
  TEACHER: 'teacher',
  SECRETARY: 'secretary',
  STUDENT: 'student',
}

class RoleService {
  /**
   * Récupérer tous les rôles depuis le backend
   */
  async getRoles(): Promise<BackendRole[]> {
    if (rolesCache) {
      return rolesCache
    }

    try {
      const response = await apiClient.get<BackendRole[]>(API_ENDPOINTS.roles.base)
      rolesCache = response
      console.log('[RoleService] Roles fetched from backend:', response)
      return response
    } catch (error) {
      console.error('[RoleService] Failed to fetch roles:', error)
      return []
    }
  }

  /**
   * Construire le mapping dynamique des rôles
   */
  async buildRoleMapping(): Promise<Record<string, UserRole>> {
    if (rolesMappingCache) {
      return rolesMappingCache
    }

    const roles = await this.getRoles()
    const mapping: Record<string, UserRole> = { ...BASE_ROLE_MAPPING }

    // Ajouter les rôles du backend au mapping
    for (const role of roles) {
      const normalizedName = role.name.toUpperCase().trim()

      // Si le rôle n'est pas déjà dans le mapping, essayer de le mapper automatiquement
      if (!mapping[normalizedName]) {
        const autoMapped = this.autoMapRole(role.name)
        if (autoMapped) {
          mapping[normalizedName] = autoMapped
          console.log(`[RoleService] Auto-mapped role "${role.name}" -> "${autoMapped}"`)
        }
      }
    }

    rolesMappingCache = mapping
    return mapping
  }

  /**
   * Mapper automatiquement un rôle backend vers frontend
   */
  private autoMapRole(backendRole: string): UserRole | null {
    const validRoles: UserRole[] = [
      'admin',
      'director',
      'teacher',
      'parent',
      'secretary',
      'student',
    ]
    const normalized = backendRole.toLowerCase().trim()

    // Vérifier si le nom en minuscules est un rôle valide
    if (validRoles.includes(normalized as UserRole)) {
      return normalized as UserRole
    }

    return null
  }

  /**
   * Mapper un rôle backend vers frontend
   */
  async mapRole(backendRole: string | null | undefined): Promise<UserRole> {
    if (!backendRole) {
      console.warn('[RoleService] mapRole: No role provided, defaulting to director')
      return 'director'
    }

    const mapping = await this.buildRoleMapping()
    const normalizedRole = backendRole.toUpperCase().trim()
    const mappedRole = mapping[normalizedRole]

    if (mappedRole) {
      console.log(`[RoleService] mapRole: "${backendRole}" -> "${mappedRole}"`)
      return mappedRole
    }

    // Fallback: essayer de mapper automatiquement
    const autoMapped = this.autoMapRole(backendRole)
    if (autoMapped) {
      console.log(`[RoleService] mapRole: Auto-mapped "${backendRole}" -> "${autoMapped}"`)
      return autoMapped
    }

    console.warn(`[RoleService] mapRole: Unknown role "${backendRole}", defaulting to director`)
    return 'director'
  }

  /**
   * Vider le cache (utile pour rafraîchir les rôles)
   */
  clearCache(): void {
    rolesCache = null
    rolesMappingCache = null
  }

  /**
   * Vérifier si un rôle est valide
   */
  isValidRole(role: string): boolean {
    const validRoles = ['admin', 'director', 'teacher', 'parent', 'secretary', 'student']
    return validRoles.includes(role.toLowerCase())
  }
}

export const roleService = new RoleService()
export default roleService
