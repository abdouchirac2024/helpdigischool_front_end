import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Devoirs - Dashboard Enseignant',
  description: 'Gestion des devoirs',
}

export default function HomeworkPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Devoirs</h1>
      <p className="text-gray-600 mt-2">Création et suivi des devoirs</p>
    </div>
  )
}