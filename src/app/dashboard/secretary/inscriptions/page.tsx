import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Inscriptions - Secrétariat',
  description: 'Gestion des inscriptions',
}

export default function InscriptionsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Inscriptions</h1>
      <p className="text-gray-600 mt-2">Nouvelles inscriptions et dossiers en attente</p>
    </div>
  )
}