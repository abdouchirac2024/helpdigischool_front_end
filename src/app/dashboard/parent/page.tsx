import { Metadata } from 'next'
import { ParentDashboard } from '@/components/dashboard/parent'

export const metadata: Metadata = {
  title: 'Dashboard Parent - Help Digi School',
  description: 'Tableau de bord parent',
}

export default function ParentDashboardPage() {
  return <ParentDashboard />
}
