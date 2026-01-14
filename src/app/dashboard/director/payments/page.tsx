import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Paiements - Dashboard Directeur',
  description: 'Gestion des paiements',
}

export default function PaymentsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Gestion des Paiements</h1>
      <p className="text-gray-600 mt-2">Page en cours de développement</p>
    </div>
  )
}