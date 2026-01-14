import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ressources - Dashboard Enseignant',
  description: 'Mes ressources pédagogiques',
}

export default function MaterialsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Ressources Pédagogiques</h1>
      <p className="text-gray-600 mt-2">Cours, exercices et supports</p>
    </div>
  )
}