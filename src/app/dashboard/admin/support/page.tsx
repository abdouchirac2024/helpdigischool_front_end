import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Support - Admin',
  description: 'Tickets de support',
}

export default function SupportPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Support</h1>
      <p className="text-gray-600 mt-2">Tickets et demandes de support</p>
    </div>
  )
}