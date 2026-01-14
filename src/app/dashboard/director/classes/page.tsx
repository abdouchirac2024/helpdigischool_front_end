import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gestion des Classes - Dashboard Directeur',
  description: 'Liste et gestion des classes',
}

export default function ClassesPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Gestion des Classes</h1>
      <p className="text-gray-600 mt-2">Page en cours de développement</p>
    </div>
  )
}