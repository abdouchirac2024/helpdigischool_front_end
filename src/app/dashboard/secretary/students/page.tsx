import { Metadata } from 'next'
import { SecretaryStudentsPage } from '@/components/dashboard/secretary/pages'

export const metadata: Metadata = {
  title: 'Gestion des Élèves - Secrétariat',
  description: 'Liste et gestion des élèves',
}

export default function StudentsPage() {
  return <SecretaryStudentsPage />
}