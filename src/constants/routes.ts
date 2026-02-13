/**
 * Routes de l'application Help Digi School
 * Centralise toutes les routes pour eviter les erreurs de typo
 */

export const ROUTES = {
  // Public
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',

  // Marketing
  FEATURES: '/features',
  PRICING: '/pricing',
  CONTACT: '/contact',
  ABOUT: '/about',

  // Dashboard - Admin
  ADMIN: {
    ROOT: '/dashboard/admin',
    SCHOOLS: '/dashboard/admin/schools',
    USERS: '/dashboard/admin/users',
    SUBSCRIPTIONS: '/dashboard/admin/subscriptions',
    ANALYTICS: '/dashboard/admin/analytics',
    REVENUE: '/dashboard/admin/revenue',
    DATABASE: '/dashboard/admin/database',
    SECURITY: '/dashboard/admin/security',
    SETTINGS: '/dashboard/admin/settings',
  },

  // Dashboard - Director
  DIRECTOR: {
    ROOT: '/dashboard/director',
    STUDENTS: '/dashboard/director/students',
    TEACHERS: '/dashboard/director/teachers',
    CLASSES: '/dashboard/director/classes',
    GRADES: '/dashboard/director/grades',
    PAYMENTS: '/dashboard/director/payments',
    SCHEDULE: '/dashboard/director/schedule',
    STATS: '/dashboard/director/stats',
    NOTIFICATIONS: '/dashboard/director/notifications',
    SETTINGS: '/dashboard/director/settings',
  },

  // Dashboard - Teacher
  TEACHER: {
    ROOT: '/dashboard/teacher',
    COURSES: '/dashboard/teacher/courses',
    STUDENTS: '/dashboard/teacher/students',
    GRADES: '/dashboard/teacher/grades',
    EVALUATIONS: '/dashboard/teacher/evaluations',
    ATTENDANCE: '/dashboard/teacher/attendance',
    SCHEDULE: '/dashboard/teacher/schedule',
    MESSAGES: '/dashboard/teacher/messages',
    SETTINGS: '/dashboard/teacher/settings',
  },

  // Dashboard - Secretary
  SECRETARY: {
    ROOT: '/dashboard/secretary',
    ENROLLMENTS: '/dashboard/secretary/enrollments',
    STUDENTS: '/dashboard/secretary/students',
    PAYMENTS: '/dashboard/secretary/payments',
    DOCUMENTS: '/dashboard/secretary/documents',
    APPOINTMENTS: '/dashboard/secretary/appointments',
    CONTACTS: '/dashboard/secretary/contacts',
    PRINTING: '/dashboard/secretary/printing',
    SETTINGS: '/dashboard/secretary/settings',
  },

  // Dashboard - Parent
  PARENT: {
    ROOT: '/dashboard/parent',
    CHILDREN: '/dashboard/parent/children',
    GRADES: '/dashboard/parent/grades',
    PAYMENTS: '/dashboard/parent/payments',
    SCHEDULE: '/dashboard/parent/schedule',
    MESSAGES: '/dashboard/parent/messages',
    DOCUMENTS: '/dashboard/parent/documents',
    SETTINGS: '/dashboard/parent/settings',
  },

  // Dashboard - Student
  STUDENT: {
    ROOT: '/dashboard/student',
    GRADES: '/dashboard/student/grades',
    COURSES: '/dashboard/student/courses',
    HOMEWORK: '/dashboard/student/homework',
    SCHEDULE: '/dashboard/student/schedule',
    MESSAGES: '/dashboard/student/messages',
    LIBRARY: '/dashboard/student/library',
    SETTINGS: '/dashboard/student/settings',
  },

  // API Routes
  API: {
    AUTH: {
      LOGIN: '/api/auth/login',
      REGISTER: '/api/auth/register',
      LOGOUT: '/api/auth/logout',
      ME: '/api/auth/me',
      REFRESH: '/api/auth/refresh-token',
    },
    STUDENTS: '/api/students',
    TEACHERS: '/api/teachers',
    CLASSES: '/api/classes',
    GRADES: '/api/grades',
    PAYMENTS: '/api/payments',
    HEALTH: '/api/health',
  },
} as const

// Helper pour obtenir le dashboard root par role
export const getDashboardByRole = (role: string): string => {
  const roleRoutes: Record<string, string> = {
    admin: ROUTES.ADMIN.ROOT,
    director: ROUTES.DIRECTOR.ROOT,
    teacher: ROUTES.TEACHER.ROOT,
    secretary: ROUTES.SECRETARY.ROOT,
    parent: ROUTES.PARENT.ROOT,
    student: ROUTES.STUDENT.ROOT,
  }
  return roleRoutes[role.toLowerCase()] || ROUTES.HOME
}

export type AppRoutes = typeof ROUTES
