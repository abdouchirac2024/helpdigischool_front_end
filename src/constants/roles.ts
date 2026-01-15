/**
 * Roles et permissions de l'application Help Digi School
 */

export const USER_ROLES = {
  ADMIN: 'admin',
  DIRECTOR: 'director',
  TEACHER: 'teacher',
  SECRETARY: 'secretary',
  PARENT: 'parent',
  STUDENT: 'student',
} as const

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES]

// Labels affichables pour chaque role
export const ROLE_LABELS: Record<UserRole, string> = {
  admin: 'Administrateur',
  director: 'Directeur',
  teacher: 'Enseignant',
  secretary: 'Secretaire',
  parent: 'Parent',
  student: 'Eleve',
}

// Couleurs associees a chaque role
export const ROLE_COLORS: Record<UserRole, string> = {
  admin: 'bg-purple-100 text-purple-800',
  director: 'bg-blue-100 text-blue-800',
  teacher: 'bg-green-100 text-green-800',
  secretary: 'bg-orange-100 text-orange-800',
  parent: 'bg-cyan-100 text-cyan-800',
  student: 'bg-pink-100 text-pink-800',
}

// Permissions par role
export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  admin: [
    'manage_schools',
    'manage_users',
    'manage_subscriptions',
    'view_analytics',
    'manage_system',
    'view_revenue',
    'manage_database',
    'manage_security',
  ],
  director: [
    'manage_teachers',
    'manage_students',
    'manage_classes',
    'view_grades',
    'manage_payments',
    'view_stats',
    'send_notifications',
    'manage_schedule',
  ],
  teacher: [
    'view_students',
    'manage_grades',
    'manage_courses',
    'manage_attendance',
    'view_schedule',
    'send_messages',
    'create_evaluations',
  ],
  secretary: [
    'manage_enrollments',
    'view_students',
    'manage_payments',
    'manage_documents',
    'manage_appointments',
    'manage_contacts',
    'print_documents',
  ],
  parent: [
    'view_children',
    'view_grades',
    'make_payments',
    'view_schedule',
    'send_messages',
    'view_documents',
  ],
  student: [
    'view_grades',
    'view_courses',
    'view_homework',
    'view_schedule',
    'send_messages',
    'view_library',
  ],
}

// Verifier si un role a une permission
export const hasPermission = (role: UserRole, permission: string): boolean => {
  return ROLE_PERMISSIONS[role]?.includes(permission) || false
}

// Obtenir tous les roles
export const getAllRoles = (): UserRole[] => {
  return Object.values(USER_ROLES)
}

// Verifier si c'est un role valide
export const isValidRole = (role: string): role is UserRole => {
  return Object.values(USER_ROLES).includes(role as UserRole)
}