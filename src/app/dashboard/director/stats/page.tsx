import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Statistiques - Dashboard Directeur',
  description: 'Statistiques et rapports',
}

export default function StatsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Statistiques</h1>
      <p className="text-gray-600 mt-2">Page en cours de développement</p>
    </div>
  )
}