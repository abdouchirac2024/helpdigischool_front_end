/**
 * Types liés aux emplois du temps
 */

// Jours de la semaine
export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday'

// Labels en français
export const DAY_LABELS: Record<DayOfWeek, string> = {
  monday: 'Lundi',
  tuesday: 'Mardi',
  wednesday: 'Mercredi',
  thursday: 'Jeudi',
  friday: 'Vendredi',
  saturday: 'Samedi',
}

// Créneau horaire
export interface TimeSlot {
  id: string
  schoolId: string
  name: string // Ex: "1ère heure"
  startTime: string // Format HH:mm
  endTime: string
  order: number
  isBreak: boolean // Récréation
}

// Créneaux par défaut
export const DEFAULT_TIME_SLOTS: Omit<TimeSlot, 'id' | 'schoolId'>[] = [
  { name: '1ère heure', startTime: '07:30', endTime: '08:30', order: 1, isBreak: false },
  { name: '2ème heure', startTime: '08:30', endTime: '09:30', order: 2, isBreak: false },
  { name: 'Récréation', startTime: '09:30', endTime: '10:00', order: 3, isBreak: true },
  { name: '3ème heure', startTime: '10:00', endTime: '11:00', order: 4, isBreak: false },
  { name: '4ème heure', startTime: '11:00', endTime: '12:00', order: 5, isBreak: false },
  { name: 'Pause déjeuner', startTime: '12:00', endTime: '14:00', order: 6, isBreak: true },
  { name: '5ème heure', startTime: '14:00', endTime: '15:00', order: 7, isBreak: false },
  { name: '6ème heure', startTime: '15:00', endTime: '16:00', order: 8, isBreak: false },
]

// Séance/cours dans l'emploi du temps
export interface ScheduleEntry {
  id: string
  scheduleId: string
  classId: string
  subjectId: string
  teacherId: string
  timeSlotId: string
  dayOfWeek: DayOfWeek
  room?: string // Salle de classe
  isRecurring: boolean
  createdAt: Date
  updatedAt: Date
}

// Séance avec détails (pour affichage)
export interface ScheduleEntryWithDetails extends ScheduleEntry {
  subjectName: string
  subjectShortName: string
  teacherName: string
  className: string
  startTime: string
  endTime: string
  color?: string // Couleur de la matière
}

// Emploi du temps d'une classe
export interface ClassSchedule {
  id: string
  schoolId: string
  classId: string
  academicYearId: string
  name: string
  isActive: boolean
  entries: ScheduleEntry[]
  createdAt: Date
  updatedAt: Date
}

// Vue hebdomadaire de l'emploi du temps
export interface WeeklyScheduleView {
  classId: string
  className: string
  timeSlots: TimeSlot[]
  days: {
    day: DayOfWeek
    label: string
    entries: ScheduleEntryWithDetails[]
  }[]
}

// Emploi du temps d'un enseignant
export interface TeacherSchedule {
  teacherId: string
  teacherName: string
  entries: (ScheduleEntryWithDetails & { className: string })[]
  totalHoursPerWeek: number
}

// Conflit d'emploi du temps
export interface ScheduleConflict {
  type: 'teacher' | 'room' | 'class'
  message: string
  conflictingEntries: ScheduleEntry[]
}