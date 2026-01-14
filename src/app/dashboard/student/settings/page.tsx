import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Paramètres - Dashboard Élève',
  description: 'Paramètres du compte',
}

export default function SettingsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Paramètres</h1>
      <p className="text-gray-600 mt-2">Page en cours de développement</p>
    </div>
  )
}