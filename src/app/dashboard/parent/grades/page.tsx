import { Metadata } from 'next'
import { ParentGradesPage } from '@/components/dashboard/parent/pages'

export const metadata: Metadata = {
  title: 'Notes & Résultats - Dashboard Parent',
  description: 'Consultation des notes et résultats',
}

export default function GradesPage() {
  return <ParentGradesPage />
}
