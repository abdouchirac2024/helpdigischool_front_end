import { Metadata } from 'next'
import { StudentSchedulePage } from '@/components/dashboard/student/pages'

export const metadata: Metadata = {
  title: 'Emploi du temps - Dashboard Élève',
  description: 'Mon emploi du temps',
}

export default function SchedulePage() {
  return <StudentSchedulePage />
}