import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Messages - Dashboard Enseignant',
  description: 'Mes messages',
}

export default function MessagesPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Messages</h1>
      <p className="text-gray-600 mt-2">Communication avec parents et direction</p>
    </div>
  )
}