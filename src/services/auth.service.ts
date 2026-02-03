/**
 * Service d'authentification
 * Gere la logique metier liee a l'authentification
 * Utilise apiClient centralise pour les appels HTTP
 */

import { apiClient, setAuthToken, removeAuthToken } from '@/lib/api/client'
import { API_ENDPOINTS } from '@/lib/api/config'
import type { User, LoginRequest, RegisterRequest, LoginResponse } from '@/types'

class AuthService {
  /**
   * Connexion utilisateur
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>(API_ENDPOINTS.auth.login, credentials)

    // Stocker le token si présent dans la réponse
    if (response.token) {
      setAuthToken(response.token)
    }

    return response
  }

  /**
   * Inscription d'une nouvelle ecole
   */
  async register(data: RegisterRequest): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>(API_ENDPOINTS.auth.register, data)

    // Stocker le token si présent dans la réponse
    if (response.token) {
      setAuthToken(response.token)
    }

    return response
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
    return apiClient.get<User>(API_ENDPOINTS.auth.me)
  }

  /**
   * Rafraichir le token
   */
  async refreshToken(refreshToken: string): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>(API_ENDPOINTS.auth.refresh, {
      refreshToken,
    })

    // Mettre à jour le token
    if (response.token) {
      setAuthToken(response.token)
    }

    return response
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
