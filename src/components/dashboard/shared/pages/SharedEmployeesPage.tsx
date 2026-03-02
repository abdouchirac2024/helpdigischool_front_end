'use client'

import { useState, useEffect } from 'react'
import {
  Users,
  Search,
  Plus,
  Eye,
  Phone,
  Mail,
  Star,
  Briefcase,
  Printer,
  Pencil,
  MapPin,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { employeeService, Employee } from '@/services/employee.service'

const BRAND = '#2302B3'

interface SharedSchoolYearsPageProps {
  role: 'director' | 'teacher'
}

export default function EmployeesPage({ role }: SharedSchoolYearsPageProps) {
  const router = useRouter()

  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')

  // 🔥 Chargement depuis le backend
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await employeeService.getAll()
        setEmployees(data)
        console.log('data=>', data)
      } catch (error) {
        console.error('Erreur chargement employés', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEmployees()
  }, [])

  // Liste unique des rôles présents
  const roles = [...new Set(employees.map((e) => e.role))]

  // Filtrage des employés
  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.role?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.neighborhood?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesRole = roleFilter === 'all' || emp.role === roleFilter

    return matchesSearch && matchesRole
  })

  // Badge de statut
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

  if (loading) {
    return <div className="p-6">Chargement...</div>
  }

  return (
    <div className="space-y-6 p-6">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Personnel de l’établissement</h1>
          <p className="mt-1 text-gray-600">{employees.length} employés</p>
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
              onClick={() => router.push('/dashboard/director/employees/new')}
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white hover:opacity-90"
              style={{ backgroundColor: BRAND }}
            >
              <Plus className="h-4 w-4" />
              Nouvel employé
            </button>
          </div>
        )}
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{employees.length}</p>
              <p className="text-sm text-gray-500">Total personnel</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50">
              <Briefcase className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{roles.length}</p>
              <p className="text-sm text-gray-500">Rôles</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50">
              <Star className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {employees.length > 0
                  ? (
                      employees.reduce((acc, e) => acc + (e.rating || 0), 0) / employees.length
                    ).toFixed(1)
                  : '0'}
              </p>
              <p className="text-sm text-gray-500">Note moyenne</p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= FILTER ================= */}
      <div className="rounded-2xl border border-gray-100 bg-white p-4">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Rechercher un employé..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant={roleFilter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setRoleFilter('all')}
              className={roleFilter === 'all' ? 'bg-[#2302B3]' : ''}
            >
              Tous
            </Button>

            {roles.map((role) => (
              <Button
                key={role}
                variant={roleFilter === role ? 'default' : 'outline'}
                size="sm"
                onClick={() => setRoleFilter(role)}
                className={roleFilter === role ? 'bg-[#2302B3]' : ''}
              >
                {role}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* ================= GRID ================= */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredEmployees.map((emp) => (
          <div
            key={emp.id}
            className="overflow-hidden rounded-2xl border border-gray-100 bg-white transition-shadow hover:shadow-lg"
          >
            <div className="p-6">
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#2302B3] to-[#4318FF] text-lg font-bold text-white">
                    {emp.firstName?.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{emp.firstName}</h3>
                    <p className="text-sm font-medium text-[#2302B3]">{emp.role}</p>
                  </div>
                </div>

                {getStatusBadge(emp.status)}
              </div>

              <p className="mb-1 text-sm text-gray-600">{emp.speciality}</p>
              <div className="mb-4 space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  {emp.phone}
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  {emp.email}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  {emp.neighborhood}
                </div>
              </div>

              <div className="flex gap-2 border-t border-gray-100 pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-1"
                  onClick={() => router.push(`/dashboard/director/employees/${emp.id}`)}
                >
                  <Eye className="h-4 w-4" />
                  Profil
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-1"
                  onClick={() => router.push(`/dashboard/director/employees/edit/${emp.id}`)}
                >
                  <Pencil className="h-4 w-4" />
                  Modification
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
