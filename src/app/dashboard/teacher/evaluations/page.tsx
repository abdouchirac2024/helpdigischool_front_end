import { Metadata } from 'next'
import { TeacherEvaluationsPage } from '@/components/dashboard/teacher/pages'

export const metadata: Metadata = {
  title: 'Évaluations - Dashboard Enseignant',
  description: 'Gestion des évaluations et contrôles',
}

export default function EvaluationsPage() {
  return <TeacherEvaluationsPage />
}