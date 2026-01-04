/**
 * Types liés aux présences/absences
 */

// Statut de présence
export type AttendanceStatus =
  | 'present'       // Présent
  | 'absent'        // Absent
  | 'late'          // En retard
  | 'excused'       // Excusé
  | 'sick'          // Malade

// Labels en français
export const ATTENDANCE_STATUS_LABELS: Record<AttendanceStatus, string> = {
  present: 'Présent',
  absent: 'Absent',
  late: 'En retard',
  excused: 'Excusé',
  sick: 'Malade',
}

// Type de session (matin/après-midi)
export type SessionType = 'morning' | 'afternoon' | 'full_day'

// Enregistrement de présence individuel
export interface AttendanceRecord {
  id: string
  studentId: string
  classId: string
  date: Date
  session: SessionType
  status: AttendanceStatus
  arrivalTime?: string // Format HH:mm
  departureTime?: string
  reason?: string // Motif d'absence
  justificationDocument?: string // URL du justificatif
  recordedBy: string // ID de l'enseignant
  createdAt: Date
  updatedAt: Date
}

// Appel journalier d'une classe
export interface DailyAttendance {
  id: string
  classId: string
  date: Date
  session: SessionType
  records: AttendanceRecord[]
  presentCount: number
  absentCount: number
  lateCount: number
  totalStudents: number
  isComplete: boolean
  completedBy?: string
  completedAt?: Date
}

// Résumé de présence d'un élève
export interface StudentAttendanceSummary {
  studentId: string
  studentName: string
  periodId: string
  totalDays: number
  presentDays: number
  absentDays: number
  lateDays: number
  excusedDays: number
  attendanceRate: number // Pourcentage
}

// Statistiques de présence d'une classe
export interface ClassAttendanceStats {
  classId: string
  className: string
  date: Date
  presentCount: number
  absentCount: number
  lateCount: number
  totalStudents: number
  attendanceRate: number
}

// Rapport de présence mensuel
export interface MonthlyAttendanceReport {
  classId: string
  month: number
  year: number
  totalSchoolDays: number
  averageAttendanceRate: number
  studentSummaries: StudentAttendanceSummary[]
}

// Saisie rapide de présence
export interface AttendanceEntry {
  studentId: string
  studentName: string
  status: AttendanceStatus
  arrivalTime?: string
  reason?: string
}