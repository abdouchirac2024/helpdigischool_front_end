/**
 * Service d'authentification
 * Gere la logique metier liee a l'authentification
 */

import { API_CONFIG, API_ENDPOINTS } from '@/constants'
import type { User, LoginRequest, RegisterRequest, LoginResponse } from '@/types'

class AuthService {
  private baseUrl = API_CONFIG.BASE_URL

  /**
   * Connexion utilisateur
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await fetch(`${this.baseUrl}${API_ENDPOINTS.AUTH.LOGIN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(error.message || 'Erreur de connexion')
    }

    return response.json()
  }

  /**
   * Inscription d'une nouvelle ecole
   */
  async register(data: RegisterRequest): Promise<LoginResponse> {
    const response = await fetch(`${this.baseUrl}${API_ENDPOINTS.AUTH.REGISTER}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(error.message || 'Erreur d\'inscription')
    }

    return response.json()
  }

  /**
   * Deconnexion
   */
  async logout(token: string): Promise<void> {
    await fetch(`${this.baseUrl}${API_ENDPOINTS.AUTH.LOGOUT}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }

  /**
   * Recuperer l'utilisateur courant
   */
  async getCurrentUser(token: string): Promise<User> {
    const response = await fetch(`${this.baseUrl}${API_ENDPOINTS.AUTH.ME}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error('Session invalide')
    }

    return response.json()
  }

  /**
   * Rafraichir le token
   */
  async refreshToken(refreshToken: string): Promise<LoginResponse> {
    const response = await fetch(`${this.baseUrl}${API_ENDPOINTS.AUTH.REFRESH}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    })

    if (!response.ok) {
      throw new Error('Impossible de rafraichir la session')
    }

    return response.json()
  }

  /**
   * Mot de passe oublie
   */
  async forgotPassword(email: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}${API_ENDPOINTS.AUTH.FORGOT_PASSWORD}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(error.message || 'Erreur lors de l\'envoi')
    }
  }

  /**
   * Reinitialiser le mot de passe
   */
  async resetPassword(token: string, password: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}${API_ENDPOINTS.AUTH.RESET_PASSWORD}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, password }),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(error.message || 'Erreur de reinitialisation')
    }
  }
}

export const authService = new AuthService()
export default authService