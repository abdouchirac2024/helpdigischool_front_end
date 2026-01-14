import { Metadata } from 'next'
import { SecretaryPrintingPage } from '@/components/dashboard/secretary/pages'

export const metadata: Metadata = {
  title: 'Impressions - Secrétariat',
  description: 'Gestion des impressions',
}

export default function PrintingPage() {
  return <SecretaryPrintingPage />
}