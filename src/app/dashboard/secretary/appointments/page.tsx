import { Metadata } from 'next'
import { SecretaryAppointmentsPage } from '@/components/dashboard/secretary/pages'

export const metadata: Metadata = {
  title: 'Rendez-vous - Secrétariat',
  description: 'Gestion des rendez-vous',
}

export default function AppointmentsPage() {
  return <SecretaryAppointmentsPage />
}