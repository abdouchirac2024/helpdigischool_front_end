'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Pencil, Eye, Printer, Trash2 } from 'lucide-react'
import { anneeScolaireService } from '@/services'

const BRAND = '#2302B3'

interface SchoolYear {
  id: number
  label: string
  current: boolean
  closed: boolean
  cancelled?: boolean
}

interface SharedSchoolYearsPageProps {
  role: 'director' | 'teacher'
}

export default function SharedSchoolYearsPage({ role }: SharedSchoolYearsPageProps) {
  const router = useRouter()

  const [schoolYears, setSchoolYears] = useState<SchoolYear[]>([])

  useEffect(() => {
    async function loadSchoolYears() {
      try {
        const data = await anneeScolaireService.getAll()
        const formatted = data.map((item) => ({
          id: item.id,
          label: item.libelle,
          current: item.statut,
          dateDebut: item.dateDebut,
          dateFin: item.dateFin,
          exams: item.exams || [],
          holidays: item.holidays || [],
          publicHolidays: item.publicHolidays || [],
          periods: item.periods || [],
          closed: false,
        }))

        setSchoolYears(formatted)
      } catch (error) {
        console.error('Erreur:', error)
      }
    }

    loadSchoolYears()
  }, [])

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm('Êtes-vous sûr de vouloir supprimer cette année scolaire ?')

    if (!confirmed) return

    try {
      const response = await fetch(`http://localhost:8080/api/annees-scolaires/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression')
      }

      alert('Année scolaire supprimée avec succès')

      // Rafraîchit les données (Next.js App Router)
      router.refresh()
    } catch (error) {
      console.error(error)
      alert('Une erreur est survenue lors de la suppression')
    }
  }

  // ------------------------
  // Helpers
  // ------------------------

  const getStatus = (sy: SchoolYear) => {
    if (sy.cancelled) return 'Annulée'
    if (sy.closed) return 'Terminée'
    if (sy.current) return 'En cours'
    return 'À venir'
  }

  const statusClass = (status: string) => {
    switch (status) {
      case 'En cours':
        return 'bg-green-100 text-green-700'
      case 'Terminée':
        return 'bg-gray-100 text-gray-700'
      case 'Annulée':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-blue-100 text-blue-700'
    }
  }

  // ------------------------
  // Render
  // ------------------------

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* ================= HEADER ================= */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-white p-5 shadow">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Années scolaires</h1>
          <p className="text-sm text-gray-500">
            Création, suivi et archivage des années académiques
          </p>
        </div>

        {role === 'director' && (
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              <Printer className="h-4 w-4" />
              Imprimer
            </button>

            <button
              type="button"
              onClick={() => router.push('/dashboard/director/school-years/new')}
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white hover:opacity-90"
              style={{ backgroundColor: BRAND }}
            >
              <Plus className="h-4 w-4" />
              Nouvelle année
            </button>
          </div>
        )}
      </div>

      {/* ================= TABLE ================= */}
      <div className="overflow-hidden rounded-xl bg-white shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-4 py-3 font-semibold text-gray-600">Année scolaire</th>
              <th className="px-4 py-3 font-semibold text-gray-600">Statut</th>
              {role === 'director' && (
                <th className="px-4 py-3 text-right font-semibold text-gray-600">Actions</th>
              )}
            </tr>
          </thead>

          <tbody>
            {schoolYears.map((sy) => {
              const status = getStatus(sy)

              return (
                <tr key={sy.id} className="border-t transition hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{sy.label}</td>

                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass(
                        status
                      )}`}
                    >
                      {status}
                    </span>
                  </td>

                  {role === 'director' && (
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex gap-2">
                        {/* Voir */}
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => router.push(`/dashboard/director/school-years/${sy.id}`)}
                            className="inline-flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100"
                          >
                            <Eye className="h-4 w-4" />
                            Voir
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              router.push(`/dashboard/director/school-years/edit/${sy.id}`)
                            }
                            className="inline-flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100"
                          >
                            <Pencil className="h-4 w-4" />
                            Modifier
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(sy.id)}
                            className="inline-flex items-center gap-1 rounded-lg border border-red-300 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                            Supprimer
                          </button>
                        </div>
                      </div>
                    </td>
                  )}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
