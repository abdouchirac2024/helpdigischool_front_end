'use client'

import { useState, useEffect } from 'react'
import {
  Users,
  School,
  Search,
  Plus,
  Eye,
  Edit,
  UserPlus,
  Clock,
  TrendingUp,
  Award,
  Loader2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { classeService } from '@/services/classe.service'
import type { ClasseDto } from '@/types/classe'
import { toast } from 'sonner'

export function DirectorClassesPage() {
  const [classes, setClasses] = useState<ClasseDto[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [levelFilter, setLevelFilter] = useState('all')

  useEffect(() => {
    loadClasses()
  }, [])

  const loadClasses = async () => {
    try {
      setIsLoading(true)
      const data = await classeService.getAll()
      setClasses(data)
    } catch (error) {
      console.error('Failed to load classes:', error)
      toast.error('Impossible de charger les classes')
    } finally {
      setIsLoading(false)
    }
  }

  const filteredClasses = classes.filter((cls) => {
    const matchesSearch =
      cls.nomClasse.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (cls.titulaireNom || '').toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLevel = levelFilter === 'all' || cls.niveau === levelFilter
    return matchesSearch && matchesLevel
  })

  // Calculate stats
  const totalStudents = classes.reduce((acc, cls) => acc + (cls.effectifActuel || 0), 0)
  const averageStudents = classes.length > 0 ? Math.round(totalStudents / classes.length) : 0

  // Note: 'average' (grade) is not yet in the backend DTO, using placeholder for now
  // const overallAverage = (
  //   classes.reduce((acc, cls) => acc + (cls.average || 0), 0) / classes.length
  // ).toFixed(1)
  const overallAverage = 'N/A'

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#2302B3]" />
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Classes</h1>
          <p className="mt-1 text-gray-600">
            {classes.length} classes • {totalStudents} élèves
          </p>
        </div>
        <Button className="gap-2 bg-[#2302B3] hover:bg-[#1a0285]">
          <Plus className="h-4 w-4" />
          Nouvelle classe
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
              <School className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{classes.length}</p>
              <p className="text-sm text-gray-500">Total classes</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{totalStudents}</p>
              <p className="text-sm text-gray-500">Total élèves</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{averageStudents}</p>
              <p className="text-sm text-gray-500">Élèves/classe</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50">
              <Award className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{overallAverage}</p>
              <p className="text-sm text-gray-500">Moyenne générale</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-gray-100 bg-white p-4">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Rechercher une classe ou un enseignant..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {['all', '6ème', '5ème', '4ème', '3ème', '2nde', '1ère', 'Terminale'].map((level) => (
              <Button
                key={level}
                variant={levelFilter === level ? 'default' : 'outline'}
                size="sm"
                onClick={() => setLevelFilter(level)}
                className={levelFilter === level ? 'bg-[#2302B3] hover:bg-[#1a0285]' : ''}
              >
                {level === 'all' ? 'Tous' : level}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredClasses.map((cls) => (
          <div
            key={cls.id}
            className="overflow-hidden rounded-2xl border border-gray-100 bg-white transition-shadow hover:shadow-lg"
          >
            <div className={`bg-blue-500 p-4`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white">{cls.nomClasse}</h3>
                  <p className="text-sm text-white/80">{cls.niveau}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
                  <School className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
            <div className="space-y-4 p-4">
              {/* Teacher */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#2302B3] to-[#4318FF] text-sm font-semibold text-white">
                  {cls.titulaireNom
                    ? cls.titulaireNom.split(' ')[1]?.charAt(0) || cls.titulaireNom.charAt(0)
                    : '?'}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{cls.titulaireNom || 'Non assigné'}</p>
                  <p className="text-xs text-gray-500">Professeur principal</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-lg bg-gray-50 p-2 text-center">
                  <p className="text-lg font-bold text-gray-900">{cls.effectifActuel || 0}</p>
                  <p className="text-xs text-gray-500">Élèves</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-2 text-center">
                  <p className="text-lg font-bold text-gray-900">-</p>
                  <p className="text-xs text-gray-500">Moyenne</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-2 text-center">
                  <p className="text-lg font-bold text-gray-900">-</p>
                  <p className="text-xs text-gray-500">Salle</p>
                </div>
              </div>

              {/* Schedule */}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>Horaires: 8h-15h</span>
              </div>

              {/* Actions */}
              <div className="flex gap-2 border-t border-gray-100 pt-2">
                <Button variant="outline" size="sm" className="flex-1 gap-1">
                  <Eye className="h-4 w-4" />
                  Voir
                </Button>
                <Button variant="outline" size="sm" className="flex-1 gap-1">
                  <Edit className="h-4 w-4" />
                  Modifier
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <UserPlus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
