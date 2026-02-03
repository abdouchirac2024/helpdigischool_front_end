/**
 * Configuration API et endpoints
 * Note: Ce fichier est conservé pour la rétrocompatibilité.
 * Préférer utiliser @/lib/api/config pour les nouveaux développements.
 */

// Configuration de l'API - Utilise la même URL que lib/api/config.ts
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api',
  TIMEOUT: Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 30000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const

// Endpoints de l'API Backend (Spring Boot)
export const API_ENDPOINTS = {
  // Authentification
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email',
  },

  // Utilisateurs
  USERS: {
    BASE: '/users',
    BY_ID: (id: string) => `/users/${id}`,
    PROFILE: '/users/profile',
    UPDATE_PASSWORD: '/users/password',
  },

  // Ecoles
  SCHOOLS: {
    BASE: '/schools',
    BY_ID: (id: string) => `/schools/${id}`,
    STATS: (id: string) => `/schools/${id}/stats`,
  },

  // Eleves
  STUDENTS: {
    BASE: '/students',
    BY_ID: (id: string) => `/students/${id}`,
    BY_CLASS: (classId: string) => `/students/class/${classId}`,
    GRADES: (id: string) => `/students/${id}/grades`,
    ATTENDANCE: (id: string) => `/students/${id}/attendance`,
  },

  // Enseignants
  TEACHERS: {
    BASE: '/teachers',
    BY_ID: (id: string) => `/teachers/${id}`,
    COURSES: (id: string) => `/teachers/${id}/courses`,
    SCHEDULE: (id: string) => `/teachers/${id}/schedule`,
  },

  // Classes
  CLASSES: {
    BASE: '/classes',
    BY_ID: (id: string) => `/classes/${id}`,
    STUDENTS: (id: string) => `/classes/${id}/students`,
    SCHEDULE: (id: string) => `/classes/${id}/schedule`,
  },

  // Notes
  GRADES: {
    BASE: '/grades',
    BY_ID: (id: string) => `/grades/${id}`,
    BY_STUDENT: (studentId: string) => `/grades/student/${studentId}`,
    BY_CLASS: (classId: string) => `/grades/class/${classId}`,
    BULLETIN: (studentId: string) => `/grades/bulletin/${studentId}`,
  },

  // Paiements
  PAYMENTS: {
    BASE: '/payments',
    BY_ID: (id: string) => `/payments/${id}`,
    BY_STUDENT: (studentId: string) => `/payments/student/${studentId}`,
    PENDING: '/payments/pending',
    STATS: '/payments/stats',
  },

  // Cours
  COURSES: {
    BASE: '/courses',
    BY_ID: (id: string) => `/courses/${id}`,
    BY_TEACHER: (teacherId: string) => `/courses/teacher/${teacherId}`,
  },

  // Emploi du temps
  SCHEDULE: {
    BASE: '/schedule',
    BY_CLASS: (classId: string) => `/schedule/class/${classId}`,
    BY_TEACHER: (teacherId: string) => `/schedule/teacher/${teacherId}`,
  },

  // Documents
  DOCUMENTS: {
    BASE: '/documents',
    BY_ID: (id: string) => `/documents/${id}`,
    UPLOAD: '/documents/upload',
    DOWNLOAD: (id: string) => `/documents/${id}/download`,
  },

  // Notifications
  NOTIFICATIONS: {
    BASE: '/notifications',
    BY_ID: (id: string) => `/notifications/${id}`,
    MARK_READ: (id: string) => `/notifications/${id}/read`,
    MARK_ALL_READ: '/notifications/read-all',
  },

  // Presence
  ATTENDANCE: {
    BASE: '/attendance',
    BY_CLASS: (classId: string) => `/attendance/class/${classId}`,
    BY_DATE: (date: string) => `/attendance/date/${date}`,
  },

  // Statistiques
  STATS: {
    DASHBOARD: '/stats/dashboard',
    SCHOOL: (id: string) => `/stats/school/${id}`,
    GRADES: '/stats/grades',
    PAYMENTS: '/stats/payments',
  },

  // Health
  HEALTH: '/health',
} as const

// HTTP Status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const

// Messages d'erreur API
export const API_ERROR_MESSAGES: Record<number, string> = {
  400: 'Requete invalide',
  401: 'Non authentifie',
  403: 'Acces refuse',
  404: 'Ressource non trouvee',
  409: 'Conflit de donnees',
  422: 'Donnees invalides',
  500: 'Erreur serveur',
  503: 'Service indisponible',
}
