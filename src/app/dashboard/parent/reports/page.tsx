import { Metadata } from 'next'
import { ParentReportsPage } from '@/components/dashboard/parent/pages'

export const metadata: Metadata = {
  title: 'Bulletins - Dashboard Parent',
  description: 'Bulletins scolaires',
}

export default function ReportsPage() {
  return <ParentReportsPage />
}
