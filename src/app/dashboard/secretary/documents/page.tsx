import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Documents - Secrétariat',
  description: 'Gestion des documents administratifs',
}

export default function DocumentsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Documents</h1>
      <p className="text-gray-600 mt-2">Attestations, certificats et documents administratifs</p>
    </div>
  )
}