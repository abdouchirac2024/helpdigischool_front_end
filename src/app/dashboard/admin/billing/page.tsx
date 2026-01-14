import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Facturation - Admin',
  description: 'Gestion de la facturation',
}

export default function BillingPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Facturation</h1>
      <p className="text-gray-600 mt-2">Factures et historique des paiements</p>
    </div>
  )
}