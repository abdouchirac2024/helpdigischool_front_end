/**
 * Service de gestion des paiements
 */

import { API_CONFIG, API_ENDPOINTS, PAGINATION } from '@/constants'
import type { Payment, PaginatedResponse, CreatePaymentRequest } from '@/types'

interface PaymentFilters {
  studentId?: string
  status?: string
  type?: string
  startDate?: string
  endDate?: string
  page?: number
  limit?: number
}

interface PaymentStats {
  totalAmount: number
  paidAmount: number
  pendingAmount: number
  overdueAmount: number
  paymentCount: number
}

class PaymentService {
  private baseUrl = API_CONFIG.BASE_URL

  private getAuthHeaders(token: string) {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  }

  /**
   * Recuperer la liste des paiements avec pagination
   */
  async getPayments(
    token: string,
    filters: PaymentFilters = {}
  ): Promise<PaginatedResponse<Payment>> {
    const params = new URLSearchParams()
    params.append('page', String(filters.page || PAGINATION.DEFAULT_PAGE))
    params.append('limit', String(filters.limit || PAGINATION.DEFAULT_LIMIT))

    if (filters.studentId) params.append('studentId', filters.studentId)
    if (filters.status) params.append('status', filters.status)
    if (filters.type) params.append('type', filters.type)
    if (filters.startDate) params.append('startDate', filters.startDate)
    if (filters.endDate) params.append('endDate', filters.endDate)

    const response = await fetch(
      `${this.baseUrl}${API_ENDPOINTS.PAYMENTS.BASE}?${params}`,
      { headers: this.getAuthHeaders(token) }
    )

    if (!response.ok) {
      throw new Error('Erreur lors de la recuperation des paiements')
    }

    return response.json()
  }

  /**
   * Recuperer un paiement par ID
   */
  async getPaymentById(token: string, id: string): Promise<Payment> {
    const response = await fetch(
      `${this.baseUrl}${API_ENDPOINTS.PAYMENTS.BY_ID(id)}`,
      { headers: this.getAuthHeaders(token) }
    )

    if (!response.ok) {
      throw new Error('Paiement non trouve')
    }

    return response.json()
  }

  /**
   * Recuperer les paiements d'un eleve
   */
  async getPaymentsByStudent(token: string, studentId: string): Promise<Payment[]> {
    const response = await fetch(
      `${this.baseUrl}${API_ENDPOINTS.PAYMENTS.BY_STUDENT(studentId)}`,
      { headers: this.getAuthHeaders(token) }
    )

    if (!response.ok) {
      throw new Error('Erreur lors de la recuperation des paiements')
    }

    return response.json()
  }

  /**
   * Recuperer les paiements en attente
   */
  async getPendingPayments(token: string): Promise<Payment[]> {
    const response = await fetch(
      `${this.baseUrl}${API_ENDPOINTS.PAYMENTS.PENDING}`,
      { headers: this.getAuthHeaders(token) }
    )

    if (!response.ok) {
      throw new Error('Erreur lors de la recuperation des paiements')
    }

    return response.json()
  }

  /**
   * Creer un nouveau paiement
   */
  async createPayment(token: string, data: CreatePaymentRequest): Promise<Payment> {
    const response = await fetch(`${this.baseUrl}${API_ENDPOINTS.PAYMENTS.BASE}`, {
      method: 'POST',
      headers: this.getAuthHeaders(token),
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(error.message || 'Erreur lors de la creation')
    }

    return response.json()
  }

  /**
   * Mettre a jour un paiement
   */
  async updatePayment(
    token: string,
    id: string,
    data: Partial<CreatePaymentRequest>
  ): Promise<Payment> {
    const response = await fetch(
      `${this.baseUrl}${API_ENDPOINTS.PAYMENTS.BY_ID(id)}`,
      {
        method: 'PUT',
        headers: this.getAuthHeaders(token),
        body: JSON.stringify(data),
      }
    )

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(error.message || 'Erreur lors de la mise a jour')
    }

    return response.json()
  }

  /**
   * Supprimer un paiement
   */
  async deletePayment(token: string, id: string): Promise<void> {
    const response = await fetch(
      `${this.baseUrl}${API_ENDPOINTS.PAYMENTS.BY_ID(id)}`,
      {
        method: 'DELETE',
        headers: this.getAuthHeaders(token),
      }
    )

    if (!response.ok) {
      throw new Error('Erreur lors de la suppression')
    }
  }

  /**
   * Recuperer les statistiques de paiement
   */
  async getPaymentStats(token: string): Promise<PaymentStats> {
    const response = await fetch(
      `${this.baseUrl}${API_ENDPOINTS.PAYMENTS.STATS}`,
      { headers: this.getAuthHeaders(token) }
    )

    if (!response.ok) {
      throw new Error('Erreur lors de la recuperation des statistiques')
    }

    return response.json()
  }
}

export const paymentService = new PaymentService()
export default paymentService