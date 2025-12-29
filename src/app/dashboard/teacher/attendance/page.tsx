import { Metadata } from 'next'
import { TeacherAttendancePage } from '@/components/dashboard/teacher/pages'

export const metadata: Metadata = {
  title: 'Présences - Dashboard Enseignant',
  description: 'Gestion des présences',
}

export default function AttendancePage() {
  return <TeacherAttendancePage />
}
