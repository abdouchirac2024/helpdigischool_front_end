import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gestion des Enseignants - Dashboard Directeur',
  description: 'Liste et gestion des enseignants',
}

export default function TeachersPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Gestion des Enseignants</h1>
      <p className="text-gray-600 mt-2">Page en cours de développement</p>
    </div>
  )
}