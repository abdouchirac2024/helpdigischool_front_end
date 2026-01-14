import { Metadata } from 'next'
import { SecretaryContactsPage } from '@/components/dashboard/secretary/pages'

export const metadata: Metadata = {
  title: 'Contacts - Secrétariat',
  description: 'Annuaire des contacts',
}

export default function ContactsPage() {
  return <SecretaryContactsPage />
}