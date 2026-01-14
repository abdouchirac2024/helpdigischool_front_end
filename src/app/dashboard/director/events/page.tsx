import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Événements - Dashboard Directeur',
  description: 'Calendrier des événements',
}

export default function EventsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Événements</h1>
      <p className="text-gray-600 mt-2">Fêtes, réunions et événements scolaires</p>
    </div>
  )
}