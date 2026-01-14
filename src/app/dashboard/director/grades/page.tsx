import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Notes & Bulletins - Dashboard Directeur',
  description: 'Gestion des notes et bulletins',
}

export default function GradesPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Notes & Bulletins</h1>
      <p className="text-gray-600 mt-2">Page en cours de développement</p>
    </div>
  )
}