'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { anneeScolaireService, AnneeScolaire } from '@/services/annee-scolaire.service'

interface Period {
  name: string
  start: string
  end: string
}

interface Holiday {
  name: string
  date: string
}

interface Props {
  schoolYearId: number
}

export default function EditSchoolYearForm({ schoolYearId }: Props) {
  const router = useRouter()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [label, setLabel] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [current, setCurrent] = useState(false)

  const [periods, setPeriods] = useState<Period[]>([])
  const [holidaysList, setHolidaysList] = useState<Period[]>([])
  const [examsList, setExamsList] = useState<Period[]>([])
  const [publicHolidaysList, setPublicHolidaysList] = useState<Holiday[]>([])

  // ===============================
  // 🔄 Charger les données via service
  // ===============================
  useEffect(() => {
    if (!schoolYearId) return

    const fetchSchoolYear = async () => {
      try {
        setError(null)
        const data: AnneeScolaire = await anneeScolaireService.getById(schoolYearId)

        // ⚡ Mapping front -> backend
        setLabel(data.label ?? '')
        setFrom(data.from ?? '')
        setTo(data.to ?? '')
        setCurrent(data.current ?? false)

        setPeriods(data.periods ?? [])
        setHolidaysList(data.holidays ?? [])
        setExamsList(data.exams ?? [])
        setPublicHolidaysList(data.publicHolidays ?? [])
      } catch (err: any) {
        console.error(err)
        setError('Erreur lors du chargement des données')
      }
    }

    fetchSchoolYear()
  }, [schoolYearId])

  // ===============================
  // 💾 Soumission via service
  // ===============================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      // ⚡ Construire le DTO côté front correctement
      const schoolYearData: AnneeScolaire = {
        id: schoolYearId,
        label: label.trim(), // ⚠ correspond à backend
        from: from, // ⚠ correspond à backend
        to: to, // ⚠ correspond à backend
        current: current, // ⚠ correspond à backend
        periods: periods.length ? periods : [],
        holidays: holidaysList.length ? holidaysList : [],
        exams: examsList.length ? examsList : [],
        publicHolidays: publicHolidaysList.length ? publicHolidaysList : [],
        libelle: '',
        statut: false,
        dateDebut: '',
        dateFin: '',
      }

      console.log('School year Id ===>', schoolYearId, 'SchoolYear data ===>', schoolYearData)

      await anneeScolaireService.update(schoolYearId, schoolYearData)

      alert('Année scolaire modifiée avec succès !')
      router.push('/dashboard/director/school-years')
    } catch (err: any) {
      setError(err?.message || 'Erreur inconnue')
    } finally {
      setIsSubmitting(false)
    }
  }

  // ===============================
  // 🖥️ UI minimale
  // ===============================
  return (
    <div className="p-8">
      <h1 className="mb-6 text-2xl font-bold">Modifier une année scolaire</h1>

      {error && <div className="mb-4 rounded bg-red-100 p-3 text-red-700">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Libellé"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="w-full rounded border p-2"
          required
        />

        <input
          type="date"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="w-full rounded border p-2"
          required
        />

        <input
          type="date"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="w-full rounded border p-2"
          required
        />

        <label className="flex items-center gap-2">
          <input type="checkbox" checked={current} onChange={(e) => setCurrent(e.target.checked)} />
          Année courante
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded bg-blue-600 px-6 py-2 text-white"
        >
          {isSubmitting ? 'Modification...' : 'Modifier'}
        </button>
      </form>
    </div>
  )
}
