/**
 * Service d'authentification
 * Utilise apiClient pour beneficier du retry, intercepteurs et proxy CORS
 */

import { apiClient } from '@/lib/api/client'
import { API_ENDPOINTS } from '@/lib/api/config'
import type { User, LoginRequest, RegisterRequest, LoginResponse } from '@/types'

class AuthService {
  /**
   * Connexion utilisateur
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    return apiClient.post<LoginResponse>(API_ENDPOINTS.auth.login, credentials)
  }

  /**
   * Inscription d'une nouvelle ecole
   */
  async register(data: RegisterRequest): Promise<LoginResponse> {
    return apiClient.post<LoginResponse>(API_ENDPOINTS.auth.register, data)
  }

  /**
   * Deconnexion
   */
  async logout(): Promise<void> {
    await apiClient.post(API_ENDPOINTS.auth.logout)
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
    return apiClient.post<LoginResponse>(API_ENDPOINTS.auth.refresh, { refreshToken })
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
}

export const authService = new AuthService()
export default authService
