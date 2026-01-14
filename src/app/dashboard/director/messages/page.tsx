import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Messages - Dashboard Directeur',
  description: 'Messagerie du directeur',
}

export default function MessagesPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Messages</h1>
      <p className="text-gray-600 mt-2">Communication avec enseignants et parents</p>
    </div>
  )
}