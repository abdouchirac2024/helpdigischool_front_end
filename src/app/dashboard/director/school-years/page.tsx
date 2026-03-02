import { DirectorSchoolYearsPage } from '@/components/dashboard/director/pages/school-years'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Années scolaires - Dashboard Directeur',
  description: 'Gestion des années scolaires',
}

export default function SchoolYearsPage() {
  return <DirectorSchoolYearsPage />
}
