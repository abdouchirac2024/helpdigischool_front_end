import { Metadata } from 'next'
import { SecretaryDocumentsPage } from '@/components/dashboard/secretary/pages'

export const metadata: Metadata = {
  title: 'Documents - Secrétariat',
  description: 'Gestion des documents administratifs',
}

export default function DocumentsPage() {
  return <SecretaryDocumentsPage />
}