'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { employeeService } from '@/services'

const BRAND = '#2302B3'

export default function EmployeeForm() {
  const router = useRouter()

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    role: '',
    subject: '',
    phone: '',
    email: '',
    neighborhood: '',
    hireDate: '',
    experience: '',
    grade: '',
    status: 'ACTIF',
    address: '',
    salary: '',
    speciality: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validateForm = () => {
    return form.firstName && form.lastName && form.role && form.email
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!validateForm()) {
      setError('Veuillez remplir tous les champs obligatoires.')
      return
    }

    setIsSubmitting(true)

    try {
      console.log('Données à envoyer:', form)

      // Appel du service backend pour créer l'employé
      const newEmployee = await employeeService.create(form)
      console.log('Employé créé:', newEmployee)

      alert('Employé créé avec succès !')
      router.push('/dashboard/director/employees')
    } catch (err) {
      console.error('Erreur lors de la création :', err)
      setError(err instanceof Error ? err.message : 'Une erreur est survenue lors de la création')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-3xl rounded-3xl border border-gray-100 bg-white p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Nouvel employé</h1>
          <p className="mt-2 text-gray-500">Ajouter un membre du personnel</p>
          {error && <p className="mt-2 text-red-500">{error}</p>}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* NOM + PRENOM */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input label="Prénom" name="firstName" value={form.firstName} onChange={handleChange} />
            <Input label="Nom" name="lastName" value={form.lastName} onChange={handleChange} />
          </div>

          {/* EMAIL + TELEPHONE */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
            />
            <Input label="Téléphone" name="phone" value={form.phone} onChange={handleChange} />
          </div>

          {/* RÔLE */}
          <Select
            label="Rôle"
            name="role"
            value={form.role}
            onChange={handleChange}
            options={[
              { value: '', label: 'Choisir un rôle' },
              { value: 'ENSEIGNANT', label: 'Maître' },
              { value: 'SECRETAIRE', label: 'Secrétaire' },
              { value: 'CHAUFFEUR', label: 'Chauffeur' },
              { value: 'COMPTABLE', label: 'Comptable' },
            ]}
          />

          {/* SPÉCIALITÉ selon le rôle */}
          {form.role && (
            <Select
              label="Spécialité"
              name="speciality"
              value={form.speciality}
              onChange={handleChange}
              options={[
                { value: '', label: 'Choisir une spécialité' },
                ...(form.role === 'ENSEIGNANT'
                  ? [
                      { value: 'Mathématiques', label: 'Mathématiques' },
                      { value: 'Français', label: 'Français' },
                      { value: 'Anglais', label: 'Anglais' },
                      { value: 'Physique', label: 'Physique' },
                      { value: 'SVT', label: 'SVT' },
                      { value: 'Informatique', label: 'Informatique' },
                    ]
                  : []),
                ...(form.role === 'SECRETAIRE'
                  ? [{ value: 'Administratif', label: 'Administratif' }]
                  : []),
                ...(form.role === 'CHAUFFEUR' ? [{ value: 'Transport', label: 'Transport' }] : []),
                ...(form.role === 'COMPTABLE' ? [{ value: 'Finance', label: 'Finance' }] : []),
              ]}
            />
          )}

          {/* QUARTIER + DATE D'EMBAUCHE */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Select
              label="Quartier"
              name="neighborhood"
              value={form.neighborhood}
              onChange={handleChange}
              options={[
                { value: '', label: 'Choisir un quartier' },
                { value: 'Akwa', label: 'Akwa' },
                { value: 'Bonapriso', label: 'Bonapriso' },
                { value: 'Makepe', label: 'Makepe' },
                { value: 'Deido', label: 'Deido' },
                { value: 'Logpom', label: 'Logpom' },
              ]}
            />
            <Input
              label="Date d'embauche"
              name="hireDate"
              type="date"
              value={form.hireDate}
              onChange={handleChange}
            />
          </div>

          {/* EXPERIENCE + GRADE */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Années d'expérience"
              name="experience"
              type="number"
              value={form.experience}
              onChange={handleChange}
            />
            <Select
              label="Grade"
              name="grade"
              value={form.grade}
              onChange={handleChange}
              options={[
                { value: '', label: 'Choisir un grade' },
                { value: 'Junior', label: 'Junior' },
                { value: 'Intermédiaire', label: 'Intermédiaire' },
                { value: 'Senior', label: 'Senior' },
                { value: 'Principal', label: 'Principal' },
              ]}
            />
          </div>

          {/* STATUT + SALAIRE */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Select
              label="Statut"
              name="status"
              value={form.status}
              onChange={handleChange}
              options={[
                { value: 'ACTIF', label: 'Actif' },
                { value: 'DESACTIVE', label: 'Inactif' },
              ]}
            />
            <Input
              label="Salaire"
              name="salary"
              type="number"
              value={form.salary}
              onChange={handleChange}
            />
          </div>

          {/* ADRESSE */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Adresse complète</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2302B3]"
            />
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => router.push('/dashboard/director/employees')}
              className="rounded-xl border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Annuler
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl px-6 py-2 text-sm font-medium text-white shadow-md hover:opacity-90"
              style={{ backgroundColor: BRAND }}
            >
              {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

/* 🔥 Composants réutilisables */
function Input({ label, ...props }: any) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">{label}</label>
      <input
        {...props}
        required
        className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2302B3]"
      />
    </div>
  )
}

function Select({ label, options, ...props }: any) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">{label}</label>
      <select
        {...props}
        required
        className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2302B3]"
      >
        {options.map((opt: any) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}
