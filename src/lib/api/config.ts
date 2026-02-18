/**
 * Configuration des endpoints API pour les microservices Spring Boot
 * Help Digi School - Frontend Next.js
 */

// URL de base de l'API Gateway (point d'entrée unique)
// Côté client (navigateur): toujours utiliser le proxy Next.js pour éviter les problèmes CORS
// Côté serveur (SSR): utiliser l'URL directe du backend
const isClient = typeof window !== 'undefined'
export const API_BASE_URL = isClient
  ? '/api/backend'
  : process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'

// Note : Le tenant est extrait automatiquement du JWT par le backend (JwtAuthFilter)
// Aucune variable TENANT_ID côté client n'est nécessaire

// Configuration des timeouts et retry
export const API_CONFIG = {
  timeout: Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 30000,
  retries: 3,
  retryDelay: 1000,
}

/**
 * Endpoints des microservices Spring Boot
 * Structure: /api/v1/{service}/{resource}
 */
export const API_ENDPOINTS = {
  // ============================================
  // AUTH SERVICE - Authentification & Autorisation
  // ============================================
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refresh: '/auth/refresh-token',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
    verifyEmail: '/auth/verify-email',
    me: '/auth/me',
  },

  // ============================================
  // ROLE SERVICE - Gestion des rôles
  // ============================================
  roles: {
    base: '/roles',
  },

  // ============================================
  // USER SERVICE - Gestion des utilisateurs
  // ============================================
  users: {
    base: '/users',
    byId: (id: string) => `/users/${id}`,
    profile: '/users/profile',
    updateProfile: '/users/profile',
    changePassword: '/users/change-password',
    uploadAvatar: '/users/avatar',
  },

  // ============================================
  // SCHOOL SERVICE - Gestion des écoles
  // ============================================
  schools: {
    base: '/schools',
    byId: (id: string) => `/schools/${id}`,
    classes: (schoolId: string) => `/schools/${schoolId}/classes`,
    students: (schoolId: string) => `/schools/${schoolId}/students`,
    teachers: (schoolId: string) => `/schools/${schoolId}/teachers`,
    staff: (schoolId: string) => `/schools/${schoolId}/staff`,
    stats: (schoolId: string) => `/schools/${schoolId}/stats`,
    settings: (schoolId: string) => `/schools/${schoolId}/settings`,
  },

  // ============================================
  // CLASS SERVICE - Gestion des classes
  // ============================================
  classes: {
    base: '/classes',
    byId: (id: string) => `/classes/${id}`,
    students: (classId: string) => `/classes/${classId}/students`,
    schedule: (classId: string) => `/classes/${classId}/schedule`,
    subjects: (classId: string) => `/classes/${classId}/subjects`,
  },

  // ============================================
  // STUDENT SERVICE - Gestion des élèves
  // ============================================
  students: {
    base: '/students',
    byId: (id: string) => `/students/${id}`,
    grades: (studentId: string) => `/students/${studentId}/grades`,
    attendance: (studentId: string) => `/students/${studentId}/attendance`,
    bulletins: (studentId: string) => `/students/${studentId}/bulletins`,
    payments: (studentId: string) => `/students/${studentId}/payments`,
  },

  // ============================================
  // TEACHER SERVICE - Gestion des enseignants
  // ============================================
  teachers: {
    base: '/teachers',
    byId: (id: string) => `/teachers/${id}`,
    classes: (teacherId: string) => `/teachers/${teacherId}/classes`,
    subjects: (teacherId: string) => `/teachers/${teacherId}/subjects`,
    schedule: (teacherId: string) => `/teachers/${teacherId}/schedule`,
  },

  // ============================================
  // PARENT SERVICE - Gestion des parents
  // ============================================
  parents: {
    base: '/parents',
    byId: (id: string) => `/parents/${id}`,
    children: (parentId: string) => `/parents/${parentId}/children`,
  },

  // ============================================
  // GRADE SERVICE - Gestion des notes
  // ============================================
  grades: {
    base: '/grades',
    byId: (id: string) => `/grades/${id}`,
    byStudent: (studentId: string) => `/grades/student/${studentId}`,
    byClass: (classId: string) => `/grades/class/${classId}`,
    bySubject: (subjectId: string) => `/grades/subject/${subjectId}`,
    bulk: '/grades/bulk',
  },

  // ============================================
  // ATTENDANCE SERVICE - Gestion des présences
  // ============================================
  attendance: {
    base: '/attendance',
    byId: (id: string) => `/attendance/${id}`,
    byClass: (classId: string) => `/attendance/class/${classId}`,
    byStudent: (studentId: string) => `/attendance/student/${studentId}`,
    byDate: (date: string) => `/attendance/date/${date}`,
    bulk: '/attendance/bulk',
  },

  // ============================================
  // SCHEDULE SERVICE - Gestion des emplois du temps
  // ============================================
  schedule: {
    base: '/schedules',
    byId: (id: string) => `/schedules/${id}`,
    byClass: (classId: string) => `/schedules/class/${classId}`,
    byTeacher: (teacherId: string) => `/schedules/teacher/${teacherId}`,
  },

  // ============================================
  // SUBJECT SERVICE - Gestion des matières
  // ============================================
  subjects: {
    base: '/subjects',
    byId: (id: string) => `/subjects/${id}`,
  },

  // ============================================
  // PAYMENT SERVICE - Gestion des paiements
  // ============================================
  payments: {
    base: '/payments',
    byId: (id: string) => `/payments/${id}`,
    byStudent: (studentId: string) => `/payments/student/${studentId}`,
    bySchool: (schoolId: string) => `/payments/school/${schoolId}`,
    fees: '/payments/fees',
    reports: '/payments/reports',
  },

  // ============================================
  // MESSAGE SERVICE - Messagerie
  // ============================================
  messages: {
    base: '/messages',
    byId: (id: string) => `/messages/${id}`,
    inbox: '/messages/inbox',
    sent: '/messages/sent',
    unread: '/messages/unread',
    markAsRead: (id: string) => `/messages/${id}/read`,
  },

  // ============================================
  // NOTIFICATION SERVICE - Notifications
  // ============================================
  notifications: {
    base: '/notifications',
    byId: (id: string) => `/notifications/${id}`,
    unread: '/notifications/unread',
    markAsRead: (id: string) => `/notifications/${id}/read`,
    markAllAsRead: '/notifications/read-all',
  },

  // ============================================
  // BULLETIN SERVICE - Bulletins scolaires
  // ============================================
  bulletins: {
    base: '/bulletins',
    byId: (id: string) => `/bulletins/${id}`,
    byStudent: (studentId: string) => `/bulletins/student/${studentId}`,
    byClass: (classId: string) => `/bulletins/class/${classId}`,
    generate: '/bulletins/generate',
    download: (id: string) => `/bulletins/${id}/download`,
  },

  // ============================================
  // SUBSCRIPTION SERVICE - Abonnements SaaS
  // ============================================
  subscriptions: {
    base: '/subscriptions',
    byId: (id: string) => `/subscriptions/${id}`,
    plans: '/subscriptions/plans',
    current: '/subscriptions/current',
    upgrade: '/subscriptions/upgrade',
    cancel: '/subscriptions/cancel',
    invoices: '/subscriptions/invoices',
  },

  // ============================================
  // REPORT SERVICE - Rapports & Statistiques
  // ============================================
  reports: {
    dashboard: '/reports/dashboard',
    attendance: '/reports/attendance',
    grades: '/reports/grades',
    payments: '/reports/payments',
    export: '/reports/export',
  },

  // ============================================
  // FILE SERVICE - Gestion des fichiers
  // ============================================
  files: {
    upload: '/files/upload',
    download: (id: string) => `/files/${id}/download`,
    delete: (id: string) => `/files/${id}`,
  },

  // ============================================
  // ANNEE SCOLAIRE SERVICE - Gestion des années scolaires
  // ============================================
  anneesScolaires: {
    base: '/annees-scolaires',
    byId: (id: string) => `/annees-scolaires/${id}`,
  },

  // ============================================
  // INSCRIPTION SERVICE - Gestion des inscriptions
  // ============================================
  inscriptions: {
    base: '/inscriptions',
    byId: (id: string) => `/inscriptions/${id}`,
    annuler: (id: string) => `/inscriptions/${id}/annuler`,
    checkParents: (eleveId: string) => `/inscriptions/eleve/${eleveId}/has-parents`,
  },

  // ============================================
  // LOCALISATION SERVICE - Gestion géographique
  // ============================================
  localisation: {
    regions: '/regions',
    regionById: (id: number) => `/regions/${id}`,
    departements: '/departements',
    departementById: (id: number) => `/departements/${id}`,
    departementsByRegion: (regionId: number) => `/departements/region/${regionId}`,
    arrondissements: '/arrondissements',
    arrondissementById: (id: number) => `/arrondissements/${id}`,
    arrondissementsByDepartement: (deptId: number) => `/arrondissements/departement/${deptId}`,
    villes: '/villes',
    villeById: (id: number) => `/villes/${id}`,
    villesByArrondissement: (arrId: number) => `/villes/arrondissement/${arrId}`,
    quartiers: '/quartiers',
    quartierById: (id: number) => `/quartiers/${id}`,
    quartiersByVille: (villeId: number) => `/quartiers/ville/${villeId}`,
    adresses: '/adresses',
    adresseById: (id: number) => `/adresses/${id}`,
    adressesByQuartier: (quartierId: number) => `/adresses/quartier/${quartierId}`,
  },
} as const

/**
 * Helper pour construire l'URL complète
 */
export function buildUrl(endpoint: string): string {
  return `${API_BASE_URL}${endpoint}`
}

/**
 * Types pour les endpoints
 */
export type ApiEndpoints = typeof API_ENDPOINTS
