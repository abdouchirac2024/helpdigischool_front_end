import { Metadata } from 'next'
import { ParentMessagesPage } from '@/components/dashboard/parent/pages'

export const metadata: Metadata = {
  title: 'Messages - Dashboard Parent',
  description: 'Messagerie avec l\'école',
}

export default function MessagesPage() {
  return <ParentMessagesPage />
}
