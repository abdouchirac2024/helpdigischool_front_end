import { Metadata } from 'next'
import { ParentChildrenPage } from '@/components/dashboard/parent/pages'

export const metadata: Metadata = {
  title: 'Mes Enfants - Dashboard Parent',
  description: 'Gestion de mes enfants',
}

export default function ChildrenPage() {
  return <ParentChildrenPage />
}
