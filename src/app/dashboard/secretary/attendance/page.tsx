import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Présences - Secrétariat',
  description: 'Suivi des présences',
}

export default function AttendancePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Présences</h1>
      <p className="text-gray-600 mt-2">Suivi des présences et absences des élèves</p>
    </div>
  )
}