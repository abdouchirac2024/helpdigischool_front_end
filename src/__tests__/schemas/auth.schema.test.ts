/**
 * Tests pour les schemas d'authentification
 */

import { describe, it, expect } from 'vitest'
import {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from '@/schemas/auth.schema'

describe('Auth Schemas', () => {
  describe('loginSchema', () => {
    it('validates correct login data', () => {
      const validData = {
        email: 'test@example.com',
        password: 'password123',
      }

      const result = loginSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('rejects invalid email', () => {
      const invalidData = {
        email: 'invalid-email',
        password: 'password123',
      }

      const result = loginSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('email')
      }
    })

    it('rejects short password', () => {
      const invalidData = {
        email: 'test@example.com',
        password: '123',
      }

      const result = loginSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('password')
      }
    })

    it('rejects empty fields', () => {
      const invalidData = {
        email: '',
        password: '',
      }

      const result = loginSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })
  })

  describe('registerSchema', () => {
    const validRegisterData = {
      schoolName: 'Ecole Test',
      schoolType: 'primaire' as const,
      address: '123 Rue Test',
      city: 'Douala',
      phone: '677123456',
      directorFirstName: 'Jean',
      directorLastName: 'Dupont',
      email: 'director@school.com',
      password: 'Password123',
      confirmPassword: 'Password123',
      acceptTerms: true as const,
    }

    it('validates correct registration data', () => {
      const result = registerSchema.safeParse(validRegisterData)
      expect(result.success).toBe(true)
    })

    it('rejects mismatched passwords', () => {
      const invalidData = {
        ...validRegisterData,
        confirmPassword: 'DifferentPassword123',
      }

      const result = registerSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('rejects weak password', () => {
      const invalidData = {
        ...validRegisterData,
        password: 'weak',
        confirmPassword: 'weak',
      }

      const result = registerSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('rejects when terms not accepted', () => {
      const invalidData = {
        ...validRegisterData,
        acceptTerms: false,
      }

      const result = registerSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })
  })

  describe('forgotPasswordSchema', () => {
    it('validates correct email', () => {
      const validData = { email: 'test@example.com' }
      const result = forgotPasswordSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('rejects invalid email', () => {
      const invalidData = { email: 'not-an-email' }
      const result = forgotPasswordSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })
  })

  describe('resetPasswordSchema', () => {
    it('validates matching passwords', () => {
      const validData = {
        password: 'NewPassword123',
        confirmPassword: 'NewPassword123',
      }

      const result = resetPasswordSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('rejects mismatched passwords', () => {
      const invalidData = {
        password: 'NewPassword123',
        confirmPassword: 'DifferentPassword123',
      }

      const result = resetPasswordSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })
  })
})