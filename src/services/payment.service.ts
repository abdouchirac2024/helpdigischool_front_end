/**
 * Service de gestion des paiements
 * Utilise apiClient pour beneficier du retry, intercepteurs et proxy CORS
 */

import { apiClient } from '@/lib/api/client'
import { API_ENDPOINTS } from '@/lib/api/config'
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
  /**
   * Recuperer la liste des paiements avec pagination
   */
  async getPayments(filters: PaymentFilters = {}): Promise<PaginatedResponse<Payment>> {
    return apiClient.get<PaginatedResponse<Payment>>(API_ENDPOINTS.payments.base, {
      params: filters,
    })
  }

  /**
   * Recuperer un paiement par ID
   */
  async getPaymentById(id: string): Promise<Payment> {
    return apiClient.get<Payment>(API_ENDPOINTS.payments.byId(id))
  }

  /**
   * Recuperer les paiements d'un eleve
   */
  async getPaymentsByStudent(studentId: string): Promise<Payment[]> {
    return apiClient.get<Payment[]>(API_ENDPOINTS.payments.byStudent(studentId))
  }

  /**
   * Creer un nouveau paiement
   */
  async createPayment(data: CreatePaymentRequest): Promise<Payment> {
    return apiClient.post<Payment>(API_ENDPOINTS.payments.base, data)
  }

  /**
   * Mettre a jour un paiement
   */
  async updatePayment(id: string, data: Partial<CreatePaymentRequest>): Promise<Payment> {
    return apiClient.put<Payment>(API_ENDPOINTS.payments.byId(id), data)
  }

  /**
   * Supprimer un paiement
   */
  async deletePayment(id: string): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.payments.byId(id))
  }

  /**
   * Recuperer les statistiques de paiement
   */
  async getPaymentStats(): Promise<PaymentStats> {
    return apiClient.get<PaymentStats>(API_ENDPOINTS.payments.reports)
  }
}

export const paymentService = new PaymentService()
export default paymentService
