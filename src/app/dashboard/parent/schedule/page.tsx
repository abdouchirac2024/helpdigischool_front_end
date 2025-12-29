import { Metadata } from 'next'
import { ParentSchedulePage } from '@/components/dashboard/parent/pages'

export const metadata: Metadata = {
  title: 'Emploi du temps - Dashboard Parent',
  description: 'Emploi du temps des enfants',
}

export default function SchedulePage() {
  return <ParentSchedulePage />
}
