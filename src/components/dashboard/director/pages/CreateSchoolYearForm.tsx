'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, X, Calendar, BookOpen, Sun, GraduationCap, Flag, Loader2 } from 'lucide-react'
import { anneeScolaireService } from '@/services'
const BRAND = '#2302B3'

interface Period {
  name: string
  start: string
  end: string
}

interface Holiday {
  name: string
  date: string
}

interface SchoolYearData {
  label: string
  from: string
  to: string
  current: boolean
  periods: Period[]
  holidays: Period[]
  exams: Period[]
  publicHolidays: Holiday[]
  // TEMPORAIRE : ID du tenant (ex: 1)
  tenantId: 1
}

export default function CreateSchoolYearForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [label, setLabel] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [current, setCurrent] = useState(false)

  const [periods, setPeriods] = useState<Period[]>([{ name: 'Trimestre 1', start: '', end: '' }])

  const [holiday, setHoliday] = useState<Period>({ name: '', start: '', end: '' })
  const [holidaysList, setHolidaysList] = useState<Period[]>([])

  const [exam, setExam] = useState<Period>({ name: '', start: '', end: '' })
  const [examsList, setExamsList] = useState<Period[]>([{ name: '', start: '', end: '' }])

  const [publicHoliday, setPublicHoliday] = useState<Holiday>({ name: '', date: '' })
  const [publicHolidaysList, setPublicHolidaysList] = useState<Holiday[]>([])

  const addPeriod = () =>
    setPeriods([...periods, { name: `Trimestre ${periods.length + 1}`, start: '', end: '' }])

  const addHoliday = () => {
    if (holiday.name && holiday.start && holiday.end) {
      setHolidaysList([...holidaysList, { ...holiday }])
      setHoliday({ name: '', start: '', end: '' })
    }
  }

  const addExam = () => {
    if (exam.name && exam.start && exam.end) {
      setExamsList([...examsList, { ...exam }])
      setExam({ name: '', start: '', end: '' })
    }
  }

  const addPublicHoliday = () => {
    if (publicHoliday.name && publicHoliday.date) {
      setPublicHolidaysList([...publicHolidaysList, { ...publicHoliday }])
      setPublicHoliday({ name: '', date: '' })
    }
  }

  const removePeriod = (index: number) => {
    setPeriods(periods.filter((_, i) => i !== index))
  }

  const removeHoliday = (index: number) => {
    setHolidaysList(holidaysList.filter((_, i) => i !== index))
  }

  const removeExam = (index: number) => {
    setExamsList(examsList.filter((_, i) => i !== index))
  }

  const removePublicHoliday = (index: number) => {
    setPublicHolidaysList(publicHolidaysList.filter((_, i) => i !== index))
  }

  const validateForm = (): boolean => {
    if (!label.trim()) {
      setError('Le libellé est requis')
      return false
    }
    if (!from) {
      setError('La date de début est requise')
      return false
    }
    if (!to) {
      setError('La date de fin est requise')
      return false
    }
    if (new Date(from) > new Date(to)) {
      setError('La date de début doit être antérieure à la date de fin')
      return false
    }

    // Valider les périodes académiques
    for (const period of periods) {
      if (!period.start || !period.end) {
        setError('Toutes les périodes académiques doivent avoir une date de début et de fin')
        return false
      }
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Préparer les données pour l'envoi
      const schoolYearData: SchoolYearData = {
        label: label.trim(),
        from,
        to,
        current,
        periods,
        holidays: [
          ...holidaysList,
          ...(holiday.name && holiday.start && holiday.end ? [holiday] : []),
        ],
        exams: [...examsList, ...(exam.name && exam.start && exam.end ? [exam] : [])],
        publicHolidays: [
          ...publicHolidaysList,
          ...(publicHoliday.name && publicHoliday.date ? [publicHoliday] : []),
        ],
        // TEMPORAIRE : ID du tenant (ex: 1)
        tenantId: 1,
      }

      // Filtrer les examens vides
      schoolYearData.exams = schoolYearData.exams.filter(
        (ex) => ex.name.trim() || ex.start || ex.end
      )
      schoolYearData.holidays = schoolYearData.holidays.filter(
        (h) => h.name.trim() || h.start || h.end
      )
      schoolYearData.publicHolidays = schoolYearData.publicHolidays.filter(
        (ph) => ph.name.trim() || ph.date
      )

      console.log('Données à envoyer:', schoolYearData)

      // Option 1: Utiliser fetch directement
      try {
        const newYear = await anneeScolaireService.create(schoolYearData)

        // setSchoolYears(prev => [...prev, newYear])
      } catch (error) {
        console.error('Erreur création:', error)
      }

      //   const data = await response.json()

      //   if (!response.ok) {
      //     throw new Error(data.message || 'Erreur lors de la création')
      //   }

      // Succès
      alert('Année scolaire créée avec succès !')
      router.push('/dashboard/director/school-years')
    } catch (err) {
      console.error('Erreur lors de la soumission:', err)
      setError(err instanceof Error ? err.message : 'Une erreur est survenue lors de la création')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Couleurs subtiles pour chaque section
  const sectionStyles = {
    periods: {
      icon: 'text-blue-400',
      bg: 'bg-blue-25',
      border: 'border-blue-100',
      focus: 'focus:ring-blue-300',
    },
    holidays: {
      icon: 'text-amber-400',
      bg: 'bg-amber-25',
      border: 'border-amber-100',
      focus: 'focus:ring-amber-300',
    },
    exams: {
      icon: 'text-emerald-400',
      bg: 'bg-emerald-25',
      border: 'border-emerald-100',
      focus: 'focus:ring-emerald-300',
    },
    publicHolidays: {
      icon: 'text-purple-400',
      bg: 'bg-purple-25',
      border: 'border-purple-100',
      focus: 'focus:ring-purple-300',
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Créer une année scolaire</h1>
          <p className="mt-2 text-gray-600">
            Configurez les périodes académiques, vacances, examens et jours fériés
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Informations générales */}
          <div className="rounded-2xl bg-white p-6 shadow-lg">
            <div className="mb-6 flex items-center gap-3">
              <div className="bg-blue-25 rounded-lg p-2">
                <Calendar className="h-6 w-6 text-blue-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Informations générales</h2>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Libellé <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Ex: 2024-2025"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  required
                  disabled={isSubmitting}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Date début <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  required
                  disabled={isSubmitting}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Date fin <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  required
                  disabled={isSubmitting}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              <div className="flex items-center space-x-4">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    id="current-year"
                    checked={current}
                    onChange={(e) => setCurrent(e.target.checked)}
                    disabled={isSubmitting}
                    className="h-5 w-5 rounded border-gray-300 text-blue-400 focus:ring-blue-300 disabled:opacity-50"
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="current-year" className="block text-sm font-medium text-gray-700">
                    Année courante
                  </label>
                  <p className="text-xs text-gray-500">Marquer comme année en cours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Périodes académiques */}
          <div className="rounded-2xl bg-white p-6 shadow-lg">
            <div className="mb-6 flex items-center gap-3">
              <div className={`rounded-lg p-2 ${sectionStyles.periods.bg}`}>
                <BookOpen className={`h-6 w-6 ${sectionStyles.periods.icon}`} />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Périodes académiques</h2>
            </div>

            <div className="mb-6 space-y-4">
              {periods.map((period, index) => (
                <div
                  key={index}
                  className={`rounded-xl border p-4 ${sectionStyles.periods.border} ${sectionStyles.periods.bg}`}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Période #{index + 1}</span>
                    {periods.length > 1 && !isSubmitting && (
                      <button
                        type="button"
                        onClick={() => removePeriod(index)}
                        className="rounded-lg p-1.5 transition-colors duration-200 hover:bg-white/50"
                      >
                        <X className="h-4 w-4 text-gray-400" />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Nom</label>
                      <input
                        type="text"
                        placeholder="Ex: Trimestre 1"
                        value={period.name}
                        onChange={(e) => {
                          const newPeriods = [...periods]
                          newPeriods[index].name = e.target.value
                          setPeriods(newPeriods)
                        }}
                        disabled={isSubmitting}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Date début <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        value={period.start}
                        onChange={(e) => {
                          const newPeriods = [...periods]
                          newPeriods[index].start = e.target.value
                          setPeriods(newPeriods)
                        }}
                        required
                        disabled={isSubmitting}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Date fin <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        value={period.end}
                        onChange={(e) => {
                          const newPeriods = [...periods]
                          newPeriods[index].end = e.target.value
                          setPeriods(newPeriods)
                        }}
                        required
                        disabled={isSubmitting}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addPeriod}
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2 font-medium text-white transition-colors duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              style={{ backgroundColor: BRAND }}
            >
              <Plus className="h-4 w-4" />
              Ajouter une période
            </button>
          </div>

          {/* Vacances */}
          <div className="rounded-2xl bg-white p-6 shadow-lg">
            <div className="mb-6 flex items-center gap-3">
              <div className={`rounded-lg p-2 ${sectionStyles.holidays.bg}`}>
                <Sun className={`h-6 w-6 ${sectionStyles.holidays.icon}`} />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900">Vacances</h2>
                <p className="mt-1 text-sm text-gray-600">
                  Ajoutez une période de vacances à la fois
                </p>
              </div>
            </div>

            {/* Formulaire unique pour les vacances */}
            <div
              className={`rounded-xl border-2 border-dashed p-6 ${sectionStyles.holidays.border} mb-6 bg-gray-50/30`}
            >
              <h3 className="mb-4 font-medium text-gray-900">Nouvelle période de vacances</h3>
              <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Nom des vacances <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Vacances de Noël"
                    value={holiday.name}
                    onChange={(e) => setHoliday({ ...holiday, name: e.target.value })}
                    disabled={isSubmitting}
                    className={`w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 ${sectionStyles.holidays.focus} transition-all duration-200 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50`}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Date début <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={holiday.start}
                    onChange={(e) => setHoliday({ ...holiday, start: e.target.value })}
                    disabled={isSubmitting}
                    className={`w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 ${sectionStyles.holidays.focus} transition-all duration-200 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50`}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Date fin <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={holiday.end}
                    onChange={(e) => setHoliday({ ...holiday, end: e.target.value })}
                    disabled={isSubmitting}
                    className={`w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 ${sectionStyles.holidays.focus} transition-all duration-200 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50`}
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={addHoliday}
                disabled={!holiday.name || !holiday.start || !holiday.end || isSubmitting}
                className="inline-flex items-center gap-2 rounded-xl px-6 py-3 font-medium text-white transition-colors duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                style={{ backgroundColor: BRAND }}
              >
                <Plus className="h-4 w-4" />
                Ajouter ces vacances
              </button>
            </div>

            {/* Liste des vacances ajoutées */}
            {holidaysList.length > 0 && (
              <div className="mt-8">
                <h3 className="mb-4 font-medium text-gray-900">Vacances ajoutées</h3>
                <div className="space-y-3">
                  {holidaysList.map((h, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between rounded-lg p-4 ${sectionStyles.holidays.bg} border ${sectionStyles.holidays.border}`}
                    >
                      <div className="flex items-center gap-3">
                        <Sun className={`h-5 w-5 ${sectionStyles.holidays.icon}`} />
                        <div>
                          <span className="font-medium text-gray-900">{h.name}</span>
                          <span className="ml-3 text-sm text-gray-600">
                            Du {h.start} au {h.end}
                          </span>
                        </div>
                      </div>
                      {!isSubmitting && (
                        <button
                          type="button"
                          onClick={() => removeHoliday(index)}
                          className="rounded-lg p-1.5 transition-colors duration-200 hover:bg-white/50"
                        >
                          <X className={`h-4 w-4 ${sectionStyles.holidays.icon}`} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {holidaysList.length === 0 && (
              <div className="py-8 text-center text-gray-500">
                <Sun className="mx-auto mb-3 h-12 w-12 text-gray-300" />
                <p>Aucune vacance ajoutée pour le moment</p>
                <p className="mt-1 text-sm">
                  Remplissez le formulaire ci-dessus pour ajouter des vacances
                </p>
              </div>
            )}
          </div>

          {/* Compositions / Examens */}
          <div className="rounded-2xl bg-white p-6 shadow-lg">
            <div className="mb-6 flex items-center gap-3">
              <div className={`rounded-lg p-2 ${sectionStyles.exams.bg}`}>
                <GraduationCap className={`h-6 w-6 ${sectionStyles.exams.icon}`} />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900">Compositions / Examens</h2>
                <p className="mt-1 text-sm text-gray-600">Ajoutez un examen à la fois</p>
              </div>
            </div>

            {/* Formulaire unique pour les examens */}
            <div
              className={`rounded-xl border-2 border-dashed p-6 ${sectionStyles.exams.border} mb-6 bg-gray-50/30`}
            >
              <h3 className="mb-4 font-medium text-gray-900">Nouvel examen</h3>
              <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Nom de l'examen <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Examen du 1er trimestre"
                    value={exam.name}
                    onChange={(e) => setExam({ ...exam, name: e.target.value })}
                    disabled={isSubmitting}
                    className={`w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 ${sectionStyles.exams.focus} transition-all duration-200 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50`}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Date début <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={exam.start}
                    onChange={(e) => setExam({ ...exam, start: e.target.value })}
                    disabled={isSubmitting}
                    className={`w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 ${sectionStyles.exams.focus} transition-all duration-200 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50`}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Date fin <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={exam.end}
                    onChange={(e) => setExam({ ...exam, end: e.target.value })}
                    disabled={isSubmitting}
                    className={`w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 ${sectionStyles.exams.focus} transition-all duration-200 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50`}
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={addExam}
                disabled={!exam.name || !exam.start || !exam.end || isSubmitting}
                className="inline-flex items-center gap-2 rounded-xl px-6 py-3 font-medium text-white transition-colors duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                style={{ backgroundColor: BRAND }}
              >
                <Plus className="h-4 w-4" />
                Ajouter cet examen
              </button>
            </div>

            {/* Liste des examens ajoutés */}
            {examsList.length > 0 && (
              <div className="mt-8">
                <h3 className="mb-4 font-medium text-gray-900">Examens ajoutés</h3>
                <div className="space-y-3">
                  {examsList.map((e, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between rounded-lg p-4 ${sectionStyles.exams.bg} border ${sectionStyles.exams.border}`}
                    >
                      <div className="flex items-center gap-3">
                        <GraduationCap className={`h-5 w-5 ${sectionStyles.exams.icon}`} />
                        <div>
                          <span className="font-medium text-gray-900">{e.name}</span>
                          <span className="ml-3 text-sm text-gray-600">
                            Du {e.start} au {e.end}
                          </span>
                        </div>
                      </div>
                      {!isSubmitting && (
                        <button
                          type="button"
                          onClick={() => removeExam(index)}
                          className="rounded-lg p-1.5 transition-colors duration-200 hover:bg-white/50"
                        >
                          <X className={`h-4 w-4 ${sectionStyles.exams.icon}`} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {examsList.length === 0 && (
              <div className="py-8 text-center text-gray-500">
                <GraduationCap className="mx-auto mb-3 h-12 w-12 text-gray-300" />
                <p>Aucun examen ajouté pour le moment</p>
                <p className="mt-1 text-sm">
                  Remplissez le formulaire ci-dessus pour ajouter un examen
                </p>
              </div>
            )}
          </div>

          {/* Jours Fériés */}
          <div className="rounded-2xl bg-white p-6 shadow-lg">
            <div className="mb-6 flex items-center gap-3">
              <div className={`rounded-lg p-2 ${sectionStyles.publicHolidays.bg}`}>
                <Flag className={`h-6 w-6 ${sectionStyles.publicHolidays.icon}`} />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900">Jours Fériés</h2>
                <p className="mt-1 text-sm text-gray-600">Ajoutez les jours fériés un par un</p>
              </div>
            </div>

            {/* Formulaire unique pour les jours fériés */}
            <div
              className={`rounded-xl border-2 border-dashed p-6 ${sectionStyles.publicHolidays.border} mb-6 bg-gray-50/30`}
            >
              <h3 className="mb-4 font-medium text-gray-900">Nouveau jour férié</h3>
              <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Nom du jour férié <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Fête du Travail"
                    value={publicHoliday.name}
                    onChange={(e) => setPublicHoliday({ ...publicHoliday, name: e.target.value })}
                    disabled={isSubmitting}
                    className={`w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 ${sectionStyles.publicHolidays.focus} transition-all duration-200 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50`}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={publicHoliday.date}
                    onChange={(e) => setPublicHoliday({ ...publicHoliday, date: e.target.value })}
                    disabled={isSubmitting}
                    className={`w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 ${sectionStyles.publicHolidays.focus} transition-all duration-200 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50`}
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={addPublicHoliday}
                disabled={!publicHoliday.name || !publicHoliday.date || isSubmitting}
                className="inline-flex items-center gap-2 rounded-xl px-6 py-3 font-medium text-white transition-colors duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                style={{ backgroundColor: BRAND }}
              >
                <Plus className="h-4 w-4" />
                Ajouter ce jour férié
              </button>
            </div>

            {/* Liste des jours fériés ajoutés */}
            {publicHolidaysList.length > 0 && (
              <div className="mt-8">
                <h3 className="mb-4 font-medium text-gray-900">Jours fériés ajoutés</h3>
                <div className="space-y-3">
                  {publicHolidaysList.map((ph, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between rounded-lg p-4 ${sectionStyles.publicHolidays.bg} border ${sectionStyles.publicHolidays.border}`}
                    >
                      <div className="flex items-center gap-3">
                        <Flag className={`h-5 w-5 ${sectionStyles.publicHolidays.icon}`} />
                        <div>
                          <span className="font-medium text-gray-900">{ph.name}</span>
                          <span className="ml-3 text-sm text-gray-600">Le {ph.date}</span>
                        </div>
                      </div>
                      {!isSubmitting && (
                        <button
                          type="button"
                          onClick={() => removePublicHoliday(index)}
                          className="rounded-lg p-1.5 transition-colors duration-200 hover:bg-white/50"
                        >
                          <X className={`h-4 w-4 ${sectionStyles.publicHolidays.icon}`} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {publicHolidaysList.length === 0 && (
              <div className="py-8 text-center text-gray-500">
                <Flag className="mx-auto mb-3 h-12 w-12 text-gray-300" />
                <p>Aucun jour férié ajouté pour le moment</p>
                <p className="mt-1 text-sm">
                  Remplissez le formulaire ci-dessus pour ajouter un jour férié
                </p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="rounded-2xl bg-white p-6 shadow-lg">
            <div className="flex flex-col justify-end gap-4 sm:flex-row">
              <button
                type="button"
                onClick={() => router.push('/dashboard/director/school-years')}
                disabled={isSubmitting}
                className="rounded-xl border border-gray-300 px-8 py-3 font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 rounded-xl px-8 py-3 font-medium text-white transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                style={{ backgroundColor: BRAND }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Création en cours...
                  </>
                ) : (
                  "Créer l'année scolaire"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
