'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Employee, employeeService } from '@/services/employee.service'

interface Props {
  id: number
}

const STATUS_LABELS: Record<string, string> = {
  ACTIF: 'Actif',
  EN_CONGE: 'En congé',
  EN_PERMISSION: 'En permission',
  SANCTIONNE: 'Sanctionné',
  SUSPENDU: 'Suspendu',
  DESACTIVE: 'Désactivé',
  RETRAITE: 'Retraité',
  DEMISSIONNAIRE: 'Démissionnaire',
  LICENCIE: 'Licencié',
  EN_ESSAI: 'En période d’essai',
  ABSENT_NON_JUSTIFIE: 'Absent non justifié',
}

export default function EmployeeEditForm({ id }: Props) {
  const router = useRouter()
  const [employee, setEmployee] = useState<Employee | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const data = await employeeService.getById(id)
        setEmployee(data)
      } catch (err) {
        setError("Impossible de charger l'employé")
      } finally {
        setLoading(false)
      }
    }

    fetchEmployee()
  }, [id])

  const handleChange = (field: keyof Employee, value: string) => {
    if (!employee) return
    setEmployee({ ...employee, [field]: value })
  }

  const handleSubmit = async () => {
    if (!employee) return
    try {
      setSaving(true)
      await employeeService.update(id, employee)
      router.push(`/dashboard/director/employees`)
    } catch (err) {
      setError('Erreur lors de la modification')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="p-6">Chargement...</div>
  if (!employee) return <div className="p-6">Employé introuvable</div>

  return (
    <div className="flex min-h-screen justify-center bg-gray-50 p-6">
      <div className="w-full max-w-2xl rounded-3xl border border-gray-100 bg-white p-8 shadow-xl">
        <h1 className="mb-6 text-2xl font-bold">Modification de {employee.firstName}</h1>

        {error && <div className="mb-4 rounded bg-red-100 p-2 text-red-600">{error}</div>}

        <div className="space-y-4">
          {/* Nom */}
          <div>
            <label className="text-sm font-medium">Nom</label>
            <input
              type="text"
              value={employee.firstName || ''}
              onChange={(e) => handleChange('firstName', e.target.value)}
              className="mt-1 w-full rounded-lg border p-2"
            />
          </div>

          {/* Rôle / Type */}
          <div>
            <label className="text-sm font-medium">Rôle</label>
            <select
              value={employee.type || ''}
              onChange={(e) => handleChange('type', e.target.value)}
              className="mt-1 w-full rounded-lg border p-2"
            >
              <option value="Enseignant">Enseignant</option>
              <option value="Secrétaire">Secrétaire</option>
              <option value="Surveillant">Surveillant</option>
              <option value="Comptable">Comptable</option>
              <option value="Directeur">Directeur</option>
              <option value="Autre">Autre</option>
            </select>
          </div>

          {/* Spécialité */}
          <div>
            <label className="text-sm font-medium">Spécialité</label>
            <input
              type="text"
              value={employee.specialty || ''}
              onChange={(e) => handleChange('specialty', e.target.value)}
              className="mt-1 w-full rounded-lg border p-2"
            />
          </div>

          {/* Expérience */}
          <div>
            <label className="text-sm font-medium">Expérience</label>
            <input
              type="text"
              value={employee.experience || ''}
              onChange={(e) => handleChange('experience', e.target.value)}
              placeholder="Ex: 5 ans"
              className="mt-1 w-full rounded-lg border p-2"
            />
          </div>

          {/* Téléphone */}
          <div>
            <label className="text-sm font-medium">Téléphone</label>
            <input
              type="text"
              value={employee.phone || ''}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="mt-1 w-full rounded-lg border p-2"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              value={employee.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              className="mt-1 w-full rounded-lg border p-2"
            />
          </div>

          {/* Statut */}
          <div>
            <label className="text-sm font-medium">Statut</label>
            <select
              value={employee.status || 'ACTIF'}
              onChange={(e) => handleChange('status', e.target.value)}
              className="mt-1 w-full rounded-lg border p-2"
            >
              {Object.entries(STATUS_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* Boutons */}
          <div className="flex gap-3 pt-4">
            <Button
              className="flex-1 bg-[#2302B3] hover:bg-[#1a0285]"
              onClick={handleSubmit}
              disabled={saving}
            >
              {saving ? 'Enregistrement...' : 'Enregistrer'}
            </Button>

            <Button
              variant="outline"
              className="flex-1"
              onClick={() => router.push(`/dashboard/director/employees`)}
            >
              Annuler
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
