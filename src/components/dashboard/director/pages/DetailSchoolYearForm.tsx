'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { anneeScolaireService } from '@/services/annee-scolaire.service'

interface Period {
  name: string
  start: string
  end: string
}

interface Holiday {
  name: string
  date: string
}

interface SchoolYearDetail {
  libelle: string
  dateDebut: string
  dateFin: string
  current: boolean
  periods: Period[]
  holidays: Period[]
  exams: Period[]
  publicHolidays: Holiday[]
}

interface Props {
  id: string
}

export default function DetailSchoolYearForm({ id }: Props) {
  const router = useRouter()
  const [data, setData] = useState<SchoolYearDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    const fetchSchoolYear = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await anneeScolaireService.getById(Number(id))
        console.log('res', res)
        setData({
          libelle: res.libelle,
          dateDebut: res.dateDebut,
          dateFin: res.dateFin,
          current: res.statut,
          periods: res.periods || [],
          holidays: res.holidays || [],
          exams: res.exams || [],
          publicHolidays: res.publicHolidays || [],
        })
      } catch (err: any) {
        console.error(err)
        setError(err.message || 'Erreur lors du chargement de l’année scolaire')
      } finally {
        setLoading(false)
      }
    }

    fetchSchoolYear()
  }, [id])

  if (loading) return <p className="p-6 text-gray-600">Chargement...</p>
  if (error) return <p className="p-6 text-red-500">{error}</p>
  if (!data) return <p className="p-6 text-red-500">Impossible de charger les données</p>

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Détail de l'année scolaire</h1>
          <p className="mt-2 text-slate-600">Consultation uniquement</p>
        </div>

        {/* Informations générales */}
        <div className="space-y-4 rounded-2xl border-2 border-blue-200 bg-blue-50 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-blue-800">Informations générales</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm text-blue-700">Libellé</label>
              <div className="mt-1 rounded-lg border border-blue-200 bg-blue-100 p-3">
                {data.libelle}
              </div>
            </div>

            <div>
              <label className="text-sm text-blue-700">Année courante</label>
              <div className="mt-1 rounded-lg border border-blue-200 bg-blue-100 p-3">
                {data.current ? 'Oui' : 'Non'}
              </div>
            </div>

            <div>
              <label className="text-sm text-blue-700">Date début</label>
              <div className="mt-1 rounded-lg border border-blue-200 bg-blue-100 p-3">
                {data.dateDebut}
              </div>
            </div>

            <div>
              <label className="text-sm text-blue-700">Date fin</label>
              <div className="mt-1 rounded-lg border border-blue-200 bg-blue-100 p-3">
                {data.dateFin}
              </div>
            </div>
          </div>
        </div>

        {/* Sections dynamiques */}
        <Section
          title="Périodes académiques"
          bg="bg-purple-50"
          border="border-purple-200"
          titleColor="text-purple-800"
        >
          {data.periods.length > 0 ? (
            data.periods.map((p, index) => (
              <Item
                key={index}
                title={p.name}
                subtitle={`Du ${p.start} au ${p.end}`}
                bg="bg-purple-100"
                border="border-purple-200"
              />
            ))
          ) : (
            <Empty message="Aucune période définie" />
          )}
        </Section>

        <Section
          title="Vacances"
          bg="bg-green-50"
          border="border-green-200"
          titleColor="text-green-800"
        >
          {data.holidays.length > 0 ? (
            data.holidays.map((h, index) => (
              <Item
                key={index}
                title={h.name}
                subtitle={`Du ${h.start} au ${h.end}`}
                bg="bg-green-100"
                border="border-green-200"
              />
            ))
          ) : (
            <Empty message="Aucune vacance définie" />
          )}
        </Section>

        <Section
          title="Examens"
          bg="bg-rose-50"
          border="border-rose-200"
          titleColor="text-rose-800"
        >
          {data.exams.length > 0 ? (
            data.exams.map((e, index) => (
              <Item
                key={index}
                title={e.name}
                subtitle={`Du ${e.start} au ${e.end}`}
                bg="bg-rose-100"
                border="border-rose-200"
              />
            ))
          ) : (
            <Empty message="Aucun examen défini" />
          )}
        </Section>

        <Section
          title="Jours fériés"
          bg="bg-amber-50"
          border="border-amber-200"
          titleColor="text-amber-800"
        >
          {data.publicHolidays.length > 0 ? (
            data.publicHolidays.map((ph, index) => (
              <Item
                key={index}
                title={ph.name}
                subtitle={`Le ${ph.date}`}
                bg="bg-amber-100"
                border="border-amber-200"
              />
            ))
          ) : (
            <Empty message="Aucun jour férié défini" />
          )}
        </Section>

        {/* Bouton retour */}
        <div className="flex justify-end">
          <button
            onClick={() => router.push('/dashboard/director/school-years')}
            className="rounded-xl bg-slate-800 px-6 py-3 text-white shadow transition hover:bg-slate-900"
          >
            Retour
          </button>
        </div>
      </div>
    </div>
  )
}

/* -------------------------
   Composants internes
-------------------------- */

function Section({
  title,
  children,
  bg,
  border,
  titleColor,
}: {
  title: string
  children: React.ReactNode
  bg: string
  border: string
  titleColor: string
}) {
  return (
    <div className={`rounded-2xl border-2 p-6 ${bg} ${border} shadow-sm`}>
      <h2 className={`mb-4 text-xl font-semibold ${titleColor}`}>{title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  )
}

function Item({
  title,
  subtitle,
  bg,
  border,
}: {
  title: string
  subtitle: string
  bg: string
  border: string
}) {
  return (
    <div className={`rounded-lg border p-4 ${bg} ${border}`}>
      <div className="font-medium text-slate-800">{title}</div>
      <div className="text-sm text-slate-600">{subtitle}</div>
    </div>
  )
}

function Empty({ message }: { message: string }) {
  return <div className="py-4 text-center text-sm text-slate-500">{message}</div>
}
