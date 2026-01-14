import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Absences - Dashboard Directeur',
  description: 'Suivi des absences',
}

export default function AbsencesPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Absences</h1>
      <p className="text-gray-600 mt-2">Suivi des absences élèves et enseignants</p>
    </div>
  )
}