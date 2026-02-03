/**
 * Service de gestion des paiements
 * Utilise apiClient centralise pour les appels HTTP
 */

import { apiClient } from '@/lib/api/client'
import { API_ENDPOINTS } from '@/lib/api/config'
import { PAGINATION } from '@/constants'
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
    const params = new URLSearchParams()
    params.append('page', String(filters.page || PAGINATION.DEFAULT_PAGE))
    params.append('limit', String(filters.limit || PAGINATION.DEFAULT_LIMIT))

    if (filters.studentId) params.append('studentId', filters.studentId)
    if (filters.status) params.append('status', filters.status)
    if (filters.type) params.append('type', filters.type)
    if (filters.startDate) params.append('startDate', filters.startDate)
    if (filters.endDate) params.append('endDate', filters.endDate)

    return apiClient.get<PaginatedResponse<Payment>>(`${API_ENDPOINTS.payments.base}?${params}`)
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
   * Recuperer les paiements d'une ecole
   */
  async getPaymentsBySchool(schoolId: string): Promise<Payment[]> {
    return apiClient.get<Payment[]>(API_ENDPOINTS.payments.bySchool(schoolId))
  }

  /**
   * Recuperer les frais
   */
  async getFees(): Promise<unknown[]> {
    return apiClient.get<unknown[]>(API_ENDPOINTS.payments.fees)
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

  /**
   * Generer un rapport de paiements
   */
  async generateReport(filters?: PaymentFilters): Promise<Blob> {
    const params = new URLSearchParams()
    if (filters?.startDate) params.append('startDate', filters.startDate)
    if (filters?.endDate) params.append('endDate', filters.endDate)
    if (filters?.status) params.append('status', filters.status)

    const queryString = params.toString()
    const endpoint = queryString
      ? `${API_ENDPOINTS.payments.reports}/export?${queryString}`
      : `${API_ENDPOINTS.payments.reports}/export`

    return apiClient.get<Blob>(endpoint, { responseType: 'blob' })
  }
}

export const paymentService = new PaymentService()
export default paymentService
