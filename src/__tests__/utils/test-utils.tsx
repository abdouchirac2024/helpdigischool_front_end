/**
 * Utilitaires pour les tests
 */

import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Creer un QueryClient pour les tests
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  })

interface ProvidersProps {
  children: React.ReactNode
}

// Provider wrapper pour les tests
function AllTheProviders({ children }: ProvidersProps) {
  const queryClient = createTestQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

// Custom render avec providers
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options })

// Re-export tout de testing-library
export * from '@testing-library/react'
export { customRender as render }

// Helpers pour les tests
export const waitForLoadingToFinish = () =>
  new Promise((resolve) => setTimeout(resolve, 0))

// Mock user data
export const mockUser = {
  id: '1',
  email: 'test@example.com',
  firstName: 'Test',
  lastName: 'User',
  role: 'teacher' as const,
  schoolId: 'school-1',
}

// Mock student data
export const mockStudent = {
  id: '1',
  firstName: 'Jean',
  lastName: 'Dupont',
  dateOfBirth: '2015-05-15',
  gender: 'male' as const,
  classId: 'class-1',
  parentPhone: '677123456',
}

// Mock payment data
export const mockPayment = {
  id: '1',
  studentId: '1',
  type: 'scolarite',
  amount: 50000,
  status: 'pending',
  dueDate: '2024-01-15',
}