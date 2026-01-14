import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gestion des Élèves - Secrétariat',
  description: 'Liste et gestion des élèves',
}

export default function StudentsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Gestion des Élèves</h1>
      <p className="text-gray-600 mt-2">Liste complète des élèves inscrits</p>
    </div>
  )
}