import { apiClient } from '@/lib/api/client'

export interface Employee {
  role: any
  firstName: any
  id: number
  lastName: string
  type: string
  specialty: string
  phone: string
  email: string
  rating: number
  status: EmployeeStatus
  experience: string
  neighborhood: string
  speciality: string
  salary: number
  grade: string
  hireDate: string
  address: string
}

export interface EmployeeDTO {
  id?: number // optionnel pour la création
  firstName: string
  lastName: string
  role: string
  subject?: string // uniquement si role === TEACHER
  phone: string
  email: string
  grade?: string
  experience?: string
  hireDate?: string // format ISO 'YYYY-MM-DD'
  status: EmployeeStatus
  neighborhood?: string
  address?: string
  salary?: number
  speciality?: string
}

type EmployeeStatus =
  | 'ACTIF' // En activité normale
  | 'EN_CONGE' // Congé annuel / maladie / maternité
  | 'EN_PERMISSION' // Permission courte durée
  | 'SANCTIONNE' // Sous sanction disciplinaire
  | 'SUSPENDU' // Suspension temporaire
  | 'DESACTIVE' // Compte désactivé administrativement
  | 'RETRAITE' // Retraité
  | 'DEMISSIONNAIRE' // A démissionné
  | 'LICENCIE' // Licencié
  | 'EN_ESSAI' // En période d’essai
  | 'ABSENT_NON_JUSTIFIE' // Absence injustifiée

class EmployeeService {
  async getAll(): Promise<Employee[]> {
    return apiClient.get<Employee[]>('/employees')
  }

  async getById(id: number): Promise<Employee> {
    return apiClient.get<Employee>(`/employees/${id}`)
  }

  async create(data: Partial<EmployeeDTO>): Promise<EmployeeDTO> {
    return apiClient.post<EmployeeDTO>('/employees', data)
  }

  async update(id: number, data: Partial<Employee>): Promise<Employee> {
    console.log('Modification employé envoyée')
    return apiClient.put<Employee>(`/employees/${id}`, data)
  }

  async delete(id: number): Promise<void> {
    return apiClient.delete(`/employees/${id}`)
  }
}

export const employeeService = new EmployeeService()
