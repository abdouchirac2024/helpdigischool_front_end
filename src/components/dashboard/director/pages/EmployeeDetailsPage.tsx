'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Eye, Phone, Mail, Star, Briefcase, Calendar, MapPin, DollarSign, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { employeeService, Employee } from '@/services/employee.service'

interface Props {
  id: number
}

export default function EmployeeDetailsPage({ id }: Props) {
  const router = useRouter()
  const [employee, setEmployee] = useState<Employee | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const data = await employeeService.getById(id)
        setEmployee(data)
      } catch (error) {
        console.error('Erreur récupération employé', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEmployee()
  }, [id])

  if (loading) return <div className="p-6">Chargement...</div>
  if (!employee) return <div className="p-6">Employé introuvable</div>

  const getStatusBadge = (status: string) => {
    const styles = {
      ACTIF: 'bg-green-100 text-green-700',
      EN_CONGE: 'bg-yellow-100 text-yellow-700',
      EN_PERMISSION: 'bg-yellow-50 text-yellow-800',
      SANCTIONNE: 'bg-red-100 text-red-700',
      SUSPENDU: 'bg-red-50 text-red-800',
      DESACTIVE: 'bg-gray-100 text-gray-700',
      RETRAITE: 'bg-gray-50 text-gray-800',
      DEMISSIONNAIRE: 'bg-gray-200 text-gray-700',
      LICENCIE: 'bg-gray-300 text-gray-800',
      EN_ESSAI: 'bg-blue-100 text-blue-700',
      ABSENT_NON_JUSTIFIE: 'bg-red-200 text-red-900',
    }

    const labels = {
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

    return (
      <span
        className={`rounded-full px-2 py-1 text-xs font-semibold ${
          styles[status as keyof typeof styles]
        }`}
      >
        {labels[status as keyof typeof labels]}
      </span>
    )
  }

  return (
    <div className="flex min-h-screen justify-center bg-gray-50 p-6">
      <div className="w-full max-w-2xl rounded-3xl border border-gray-100 bg-white p-8 shadow-xl">
        {/* HEADER */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">
            Détails de {employee.firstName} {employee.lastName}
          </h1>
          <Button variant="outline" onClick={() => router.push('/dashboard/director/employees')}>
            Retour
          </Button>
        </div>

        {/* INFO EMPLOYÉ */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#2302B3] to-[#4318FF] text-xl font-bold text-white">
              {employee.firstName.charAt(0)}
            </div>
            <div>
              <p className="text-lg font-bold">
                {employee.firstName} {employee.lastName}
              </p>
              <p className="text-sm text-[#2302B3]">
                {employee.role === 'ENSEIGNANT' ? `Maître - ${employee.speciality}` : employee.role}
              </p>
              {getStatusBadge(employee.status)}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 text-gray-700 md:grid-cols-2">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gray-400" /> {employee.phone}
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gray-400" /> {employee.email}
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-400" /> {employee.rating}
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-green-600" /> {employee.experience} année(s)
              d'expérience(s)
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-400" /> {employee.neighborhood}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-400" /> {employee.hireDate}
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-gray-400" /> {employee.grade}
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-green-600" /> {employee.salary} FCFA
            </div>
            <div className="col-span-2 flex items-center gap-2">
              <Home className="h-4 w-4 text-gray-400" />
              {employee.address ? employee.address : "Pas d'adresse complète"}
            </div>
          </div>

          {/* ACTIONS */}
          <div className="mt-6 flex gap-3">
            <Button
              variant="outline"
              className="flex-1 gap-2"
              onClick={() => router.push(`/dashboard/director/employee/${employee.id}/edit`)}
            >
              <Calendar className="h-4 w-4" /> Modification
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
