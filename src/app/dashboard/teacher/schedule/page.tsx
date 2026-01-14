import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Emploi du temps - Dashboard Enseignant',
  description: 'Mon emploi du temps',
}

export default function SchedulePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Emploi du temps</h1>
      <p className="text-gray-600 mt-2">Mon planning de cours</p>
    </div>
  )
}