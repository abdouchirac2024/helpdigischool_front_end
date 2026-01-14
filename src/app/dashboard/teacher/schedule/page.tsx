import { Metadata } from 'next'
import { TeacherSchedulePage } from '@/components/dashboard/teacher/pages'

export const metadata: Metadata = {
  title: 'Emploi du temps - Dashboard Enseignant',
  description: 'Mon emploi du temps',
}

export default function SchedulePage() {
  return <TeacherSchedulePage />
}