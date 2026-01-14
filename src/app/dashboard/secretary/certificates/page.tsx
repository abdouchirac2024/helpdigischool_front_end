import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Certificats - Secrétariat',
  description: 'Génération de certificats',
}

export default function CertificatesPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Certificats</h1>
      <p className="text-gray-600 mt-2">Génération et gestion des certificats scolaires</p>
    </div>
  )
}