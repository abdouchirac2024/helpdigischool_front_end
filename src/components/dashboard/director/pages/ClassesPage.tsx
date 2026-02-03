'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Users,
  School,
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  Clock,
  TrendingUp,
  Award,
  Loader2,
  AlertCircle,
  Filter,
  ChevronDown,
  MoreHorizontal,
  GraduationCap,
  X,
  LayoutGrid,
  List,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  classeService,
  type ClasseDto,
  type CreateClasseRequest,
  type Niveau,
  type SousSysteme,
  type StatutClasse,
} from '@/services/classe.service'

const NIVEAU_LABELS: Record<Niveau, string> = {
  MATERNELLE: 'Maternelle',
  PRIMAIRE: 'Primaire',
  COLLEGE: 'College',
  LYCEE: 'Lycee',
  NURSERY: 'Nursery',
  PRIMARY: 'Primary',
  SECONDARY: 'Secondary',
  HIGH_SCHOOL: 'High School',
}

const SOUS_SYSTEME_LABELS: Record<SousSysteme, string> = {
  FRANCOPHONE: 'Francophone',
  ANGLOPHONE: 'Anglophone',
  BILINGUE: 'Bilingue',
}

const STATUT_LABELS: Record<StatutClasse, string> = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  ARCHIVEE: 'Archivee',
}

const NIVEAU_COLORS: Record<Niveau, string> = {
  MATERNELLE: 'bg-pink-500',
  PRIMAIRE: 'bg-blue-500',
  COLLEGE: 'bg-green-500',
  LYCEE: 'bg-purple-500',
  NURSERY: 'bg-pink-500',
  PRIMARY: 'bg-blue-500',
  SECONDARY: 'bg-green-500',
  HIGH_SCHOOL: 'bg-purple-500',
}

const STATUT_COLORS: Record<StatutClasse, string> = {
  ACTIVE: 'bg-green-100 text-green-800',
  INACTIVE: 'bg-yellow-100 text-yellow-800',
  ARCHIVEE: 'bg-gray-100 text-gray-800',
}

type ModalMode = 'create' | 'edit' | 'view' | null

const EMPTY_FORM: CreateClasseRequest & { statut?: StatutClasse } = {
  nomClasse: '',
  niveau: 'COLLEGE',
  sousSysteme: 'FRANCOPHONE',
  section: '',
  capacite: 40,
  fraisScolarite: 0,
  description: '',
  ecoleId: 1,
  anneeScolaireId: undefined,
  titulaireId: undefined,
}

export function DirectorClassesPage() {
  const [classes, setClasses] = useState<ClasseDto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [niveauFilter, setNiveauFilter] = useState<string>('all')
  const [statutFilter, setStatutFilter] = useState<string>('all')
  const [sousSystemeFilter, setSousSystemeFilter] = useState<string>('all')

  // View mode (grid or list)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(9)

  // Modal state
  const [modalMode, setModalMode] = useState<ModalMode>(null)
  const [selectedClasse, setSelectedClasse] = useState<ClasseDto | null>(null)
  const [formData, setFormData] = useState<CreateClasseRequest & { statut?: StatutClasse }>(
    EMPTY_FORM
  )
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  // Delete confirmation
  const [deleteTarget, setDeleteTarget] = useState<ClasseDto | null>(null)
  const [deleting, setDeleting] = useState(false)

  const fetchClasses = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await classeService.getAll()
      setClasses(data)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erreur lors du chargement des classes'
      setError(message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchClasses()
  }, [fetchClasses])

  // Filtres
  const filteredClasses = classes.filter((cls) => {
    const matchesSearch =
      cls.nomClasse.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (cls.titulaireNom && cls.titulaireNom.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesNiveau = niveauFilter === 'all' || cls.niveau === niveauFilter
    const matchesStatut = statutFilter === 'all' || cls.statut === statutFilter
    const matchesSousSysteme = sousSystemeFilter === 'all' || cls.sousSysteme === sousSystemeFilter
    return matchesSearch && matchesNiveau && matchesStatut && matchesSousSysteme
  })

  // Stats
  const totalStudents = classes.reduce((acc, cls) => acc + (cls.effectifActuel || 0), 0)
  const activeClasses = classes.filter((c) => c.statut === 'ACTIVE').length
  const averageStudents = classes.length > 0 ? Math.round(totalStudents / classes.length) : 0

  // Niveaux presents dans les classes pour le filtre
  const niveauxPresents = [...new Set(classes.map((c) => c.niveau))]

  // Sous-systemes presents dans les classes pour le filtre
  const sousSystemesPresents = [...new Set(classes.map((c) => c.sousSysteme))]

  // Count active filters
  const activeFiltersCount = [
    niveauFilter !== 'all',
    statutFilter !== 'all',
    sousSystemeFilter !== 'all',
    searchQuery !== '',
  ].filter(Boolean).length

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('')
    setNiveauFilter('all')
    setStatutFilter('all')
    setSousSystemeFilter('all')
    setCurrentPage(1)
  }

  // Pagination logic
  const totalPages = Math.ceil(filteredClasses.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedClasses = filteredClasses.slice(startIndex, endIndex)

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, niveauFilter, statutFilter, sousSystemeFilter])

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }

  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i)
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i)
      } else {
        pages.push(1)
        pages.push('...')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i)
        pages.push('...')
        pages.push(totalPages)
      }
    }
    return pages
  }

  // Ouvrir modal creation
  const openCreate = () => {
    setFormData({ ...EMPTY_FORM })
    setFormError(null)
    setSelectedClasse(null)
    setModalMode('create')
  }

  // Ouvrir modal edition
  const openEdit = (cls: ClasseDto) => {
    setFormData({
      nomClasse: cls.nomClasse,
      niveau: cls.niveau,
      sousSysteme: cls.sousSysteme,
      section: cls.section || '',
      capacite: cls.capacite || 40,
      fraisScolarite: cls.fraisScolarite || 0,
      description: cls.description || '',
      ecoleId: cls.ecoleId || 1,
      anneeScolaireId: cls.anneeScolaireId || undefined,
      titulaireId: cls.titulaireId || undefined,
      statut: cls.statut,
    })
    setFormError(null)
    setSelectedClasse(cls)
    setModalMode('edit')
  }

  // Ouvrir modal vue
  const openView = (cls: ClasseDto) => {
    setSelectedClasse(cls)
    setModalMode('view')
  }

  const closeModal = () => {
    setModalMode(null)
    setSelectedClasse(null)
    setFormError(null)
  }

  // Soumettre formulaire (create ou update)
  const handleSubmit = async () => {
    if (!formData.nomClasse.trim()) {
      setFormError('Le nom de la classe est obligatoire')
      return
    }

    try {
      setSaving(true)
      setFormError(null)

      if (modalMode === 'create') {
        await classeService.create(formData)
      } else if (modalMode === 'edit' && selectedClasse?.id) {
        await classeService.update(selectedClasse.id, formData)
      }

      closeModal()
      await fetchClasses()
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erreur lors de la sauvegarde'
      setFormError(message)
    } finally {
      setSaving(false)
    }
  }

  // Supprimer
  const handleDelete = async () => {
    if (!deleteTarget?.id) return
    try {
      setDeleting(true)
      await classeService.delete(deleteTarget.id)
      setDeleteTarget(null)
      await fetchClasses()
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erreur lors de la suppression'
      setFormError(message)
      setDeleteTarget(null)
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Classes</h1>
          <p className="mt-1 text-gray-600">
            {classes.length} classes &bull; {totalStudents} eleves
          </p>
        </div>
        <Button className="gap-2 bg-[#2302B3] hover:bg-[#1a0285]" onClick={openCreate}>
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
              <Award className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{activeClasses}</p>
              <p className="text-sm text-gray-500">Classes actives</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{totalStudents}</p>
              <p className="text-sm text-gray-500">Total eleves</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{averageStudents}</p>
              <p className="text-sm text-gray-500">Eleves/classe</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters - Improved Design */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        {/* Filter Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2302B3]/10">
              <Filter className="h-4 w-4 text-[#2302B3]" />
            </div>
            <span className="font-semibold text-gray-700">Filtres</span>
            {activeFiltersCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#2302B3] text-xs font-medium text-white">
                {activeFiltersCount}
              </span>
            )}
          </div>
          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="gap-1 text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
              Reinitialiser
            </Button>
          )}
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
          {/* Search */}
          <div className="flex-1">
            <Label className="mb-2 block text-xs font-medium text-gray-500">Recherche</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Rechercher une classe ou un titulaire..."
                className="h-10 border-gray-200 bg-gray-50/50 pl-10 transition-colors focus:border-[#2302B3] focus:bg-white focus:ring-[#2302B3]/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Niveau Filter */}
          <div className="min-w-[160px]">
            <Label className="mb-2 block text-xs font-medium text-gray-500">Niveau</Label>
            <Select value={niveauFilter} onValueChange={setNiveauFilter}>
              <SelectTrigger className="h-10 border-gray-200 bg-gray-50/50 transition-colors focus:border-[#2302B3] focus:bg-white focus:ring-[#2302B3]/20">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-gray-400" />
                  <SelectValue placeholder="Tous les niveaux" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les niveaux</SelectItem>
                {niveauxPresents.map((niveau) => (
                  <SelectItem key={niveau} value={niveau}>
                    <div className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${NIVEAU_COLORS[niveau]}`} />
                      {NIVEAU_LABELS[niveau]}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sous-systeme Filter */}
          <div className="min-w-[160px]">
            <Label className="mb-2 block text-xs font-medium text-gray-500">Sous-systeme</Label>
            <Select value={sousSystemeFilter} onValueChange={setSousSystemeFilter}>
              <SelectTrigger className="h-10 border-gray-200 bg-gray-50/50 transition-colors focus:border-[#2302B3] focus:bg-white focus:ring-[#2302B3]/20">
                <SelectValue placeholder="Tous" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                {sousSystemesPresents.map((ss) => (
                  <SelectItem key={ss} value={ss}>
                    {SOUS_SYSTEME_LABELS[ss]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Statut Filter */}
          <div className="min-w-[140px]">
            <Label className="mb-2 block text-xs font-medium text-gray-500">Statut</Label>
            <Select value={statutFilter} onValueChange={setStatutFilter}>
              <SelectTrigger className="h-10 border-gray-200 bg-gray-50/50 transition-colors focus:border-[#2302B3] focus:bg-white focus:ring-[#2302B3]/20">
                <SelectValue placeholder="Tous" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                {(Object.keys(STATUT_LABELS) as StatutClasse[]).map((statut) => (
                  <SelectItem key={statut} value={statut}>
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-2 w-2 rounded-full ${statut === 'ACTIVE' ? 'bg-green-500' : statut === 'INACTIVE' ? 'bg-yellow-500' : 'bg-gray-400'}`}
                      />
                      {STATUT_LABELS[statut]}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Active Filters Tags */}
        {activeFiltersCount > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-gray-100 pt-4">
            <span className="text-xs text-gray-500">Filtres actifs:</span>
            {searchQuery && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[#2302B3]/10 px-3 py-1 text-xs font-medium text-[#2302B3]">
                Recherche: "{searchQuery}"
                <button onClick={() => setSearchQuery('')} className="hover:text-[#1a0285]">
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {niveauFilter !== 'all' && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[#2302B3]/10 px-3 py-1 text-xs font-medium text-[#2302B3]">
                Niveau: {NIVEAU_LABELS[niveauFilter as Niveau]}
                <button onClick={() => setNiveauFilter('all')} className="hover:text-[#1a0285]">
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {sousSystemeFilter !== 'all' && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[#2302B3]/10 px-3 py-1 text-xs font-medium text-[#2302B3]">
                {SOUS_SYSTEME_LABELS[sousSystemeFilter as SousSysteme]}
                <button
                  onClick={() => setSousSystemeFilter('all')}
                  className="hover:text-[#1a0285]"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {statutFilter !== 'all' && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[#2302B3]/10 px-3 py-1 text-xs font-medium text-[#2302B3]">
                Statut: {STATUT_LABELS[statutFilter as StatutClasse]}
                <button onClick={() => setStatutFilter('all')} className="hover:text-[#1a0285]">
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
          <AlertCircle className="h-5 w-5 text-red-500" />
          <p className="text-sm text-red-700">{error}</p>
          <Button variant="outline" size="sm" onClick={fetchClasses}>
            Reessayer
          </Button>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-[#2302B3]" />
          <span className="ml-3 text-gray-600">Chargement des classes...</span>
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && classes.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <School className="h-16 w-16 text-gray-300" />
          <p className="mt-4 text-lg font-medium text-gray-600">Aucune classe</p>
          <p className="text-sm text-gray-400">Commencez par creer une nouvelle classe</p>
          <Button className="mt-4 gap-2 bg-[#2302B3] hover:bg-[#1a0285]" onClick={openCreate}>
            <Plus className="h-4 w-4" />
            Nouvelle classe
          </Button>
        </div>
      )}

      {/* View Toggle & Results Count */}
      {!loading && filteredClasses.length > 0 && (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">{filteredClasses.length}</span> classe
            {filteredClasses.length > 1 ? 's' : ''} trouvee{filteredClasses.length > 1 ? 's' : ''}
          </p>
          <div className="flex items-center gap-3">
            {/* Items per page */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Afficher</span>
              <Select
                value={itemsPerPage.toString()}
                onValueChange={(v) => {
                  setItemsPerPage(Number(v))
                  setCurrentPage(1)
                }}
              >
                <SelectTrigger className="h-9 w-[70px] border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6">6</SelectItem>
                  <SelectItem value="9">9</SelectItem>
                  <SelectItem value="12">12</SelectItem>
                  <SelectItem value="24">24</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* View toggle */}
            <div className="flex items-center rounded-lg border border-gray-200 bg-white p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex h-8 w-8 items-center justify-center rounded-md transition-all ${
                  viewMode === 'grid'
                    ? 'bg-[#2302B3] text-white shadow-sm'
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                }`}
                title="Vue grille"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex h-8 w-8 items-center justify-center rounded-md transition-all ${
                  viewMode === 'list'
                    ? 'bg-[#2302B3] text-white shadow-sm'
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                }`}
                title="Vue liste"
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== GRID VIEW ==================== */}
      {!loading && filteredClasses.length > 0 && viewMode === 'grid' && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {paginatedClasses.map((cls) => (
            <div
              key={cls.id}
              className="group overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all hover:border-gray-200 hover:shadow-lg"
            >
              <div className={`${NIVEAU_COLORS[cls.niveau] || 'bg-gray-500'} p-4`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white">{cls.nomClasse}</h3>
                    <p className="text-sm text-white/80">
                      {NIVEAU_LABELS[cls.niveau]} - {SOUS_SYSTEME_LABELS[cls.sousSysteme]}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
                      <School className="h-5 w-5 text-white" />
                    </div>
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${STATUT_COLORS[cls.statut]}`}
                    >
                      {STATUT_LABELS[cls.statut]}
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-4 p-4">
                {/* Titulaire */}
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#2302B3] to-[#4318FF] text-sm font-semibold text-white">
                    {cls.titulaireNom ? cls.titulaireNom.charAt(0).toUpperCase() : '?'}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {cls.titulaireNom || 'Non assigne'}
                    </p>
                    <p className="text-xs text-gray-500">Titulaire</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-lg bg-gray-50 p-2 text-center">
                    <p className="text-lg font-bold text-gray-900">{cls.effectifActuel || 0}</p>
                    <p className="text-xs text-gray-500">Eleves</p>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-2 text-center">
                    <p className="text-lg font-bold text-gray-900">{cls.capacite || '-'}</p>
                    <p className="text-xs text-gray-500">Capacite</p>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-2 text-center">
                    <p className="text-lg font-bold text-gray-900">{cls.section || '-'}</p>
                    <p className="text-xs text-gray-500">Section</p>
                  </div>
                </div>

                {/* Frais */}
                {cls.fraisScolarite != null && cls.fraisScolarite > 0 && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>Frais: {cls.fraisScolarite.toLocaleString()} FCFA</span>
                  </div>
                )}

                {/* Ecole & Annee */}
                <div className="space-y-1 text-xs text-gray-500">
                  {cls.ecoleNom && <p>Ecole: {cls.ecoleNom}</p>}
                  {cls.anneeScolaireLibelle && <p>Annee: {cls.anneeScolaireLibelle}</p>}
                </div>

                {/* Actions */}
                <div className="flex gap-2 border-t border-gray-100 pt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-1 border-gray-200 hover:border-[#2302B3]/20 hover:bg-[#2302B3]/5 hover:text-[#2302B3]"
                    onClick={() => openView(cls)}
                  >
                    <Eye className="h-4 w-4" />
                    Voir
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-1 border-gray-200 hover:border-[#2302B3]/20 hover:bg-[#2302B3]/5 hover:text-[#2302B3]"
                    onClick={() => openEdit(cls)}
                  >
                    <Edit className="h-4 w-4" />
                    Modifier
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 border-gray-200 text-red-500 hover:border-red-200 hover:bg-red-50 hover:text-red-700"
                    onClick={() => setDeleteTarget(cls)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ==================== LIST VIEW ==================== */}
      {!loading && filteredClasses.length > 0 && viewMode === 'list' && (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          {/* Table Header */}
          <div className="border-b border-gray-100 bg-gray-50/80 px-6 py-4">
            <div className="grid grid-cols-12 items-center gap-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
              <div className="col-span-3">Classe</div>
              <div className="col-span-2">Titulaire</div>
              <div className="col-span-2 text-center">Effectif</div>
              <div className="col-span-2">Sous-systeme</div>
              <div className="col-span-1 text-center">Statut</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-50">
            {paginatedClasses.map((cls) => (
              <div
                key={cls.id}
                className="group grid grid-cols-12 items-center gap-4 px-6 py-4 transition-colors hover:bg-gray-50/50"
              >
                {/* Classe Info */}
                <div className="col-span-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${NIVEAU_COLORS[cls.niveau] || 'bg-gray-500'}`}
                    >
                      <School className="h-5 w-5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-gray-900">{cls.nomClasse}</p>
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-block h-1.5 w-1.5 rounded-full ${NIVEAU_COLORS[cls.niveau]}`}
                        />
                        <p className="truncate text-xs text-gray-500">
                          {NIVEAU_LABELS[cls.niveau]}
                        </p>
                        {cls.section && (
                          <span className="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-600">
                            Sec. {cls.section}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Titulaire */}
                <div className="col-span-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#2302B3] to-[#4318FF] text-xs font-semibold text-white">
                      {cls.titulaireNom ? cls.titulaireNom.charAt(0).toUpperCase() : '?'}
                    </div>
                    <span className="truncate text-sm text-gray-700">
                      {cls.titulaireNom || (
                        <span className="italic text-gray-400">Non assigne</span>
                      )}
                    </span>
                  </div>
                </div>

                {/* Effectif */}
                <div className="col-span-2 text-center">
                  <div className="inline-flex flex-col items-center">
                    <div className="flex items-baseline gap-1">
                      <span className="text-lg font-bold text-gray-900">
                        {cls.effectifActuel || 0}
                      </span>
                      <span className="text-sm text-gray-400">/ {cls.capacite || '-'}</span>
                    </div>
                    <div className="mt-1 h-1.5 w-16 overflow-hidden rounded-full bg-gray-200">
                      <div
                        className={`h-full rounded-full transition-all ${
                          cls.capacite && cls.effectifActuel
                            ? cls.effectifActuel / cls.capacite > 0.9
                              ? 'bg-red-500'
                              : cls.effectifActuel / cls.capacite > 0.7
                                ? 'bg-yellow-500'
                                : 'bg-green-500'
                            : 'bg-gray-300'
                        }`}
                        style={{
                          width:
                            cls.capacite && cls.effectifActuel
                              ? `${Math.min((cls.effectifActuel / cls.capacite) * 100, 100)}%`
                              : '0%',
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Sous-systeme */}
                <div className="col-span-2">
                  <span className="inline-flex items-center rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                    {SOUS_SYSTEME_LABELS[cls.sousSysteme]}
                  </span>
                  {cls.fraisScolarite != null && cls.fraisScolarite > 0 && (
                    <p className="mt-1 text-xs text-gray-500">
                      {cls.fraisScolarite.toLocaleString()} FCFA
                    </p>
                  )}
                </div>

                {/* Statut */}
                <div className="col-span-1 text-center">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${STATUT_COLORS[cls.statut]}`}
                  >
                    <span
                      className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                        cls.statut === 'ACTIVE'
                          ? 'bg-green-500'
                          : cls.statut === 'INACTIVE'
                            ? 'bg-yellow-500'
                            : 'bg-gray-400'
                      }`}
                    />
                    {STATUT_LABELS[cls.statut]}
                  </span>
                </div>

                {/* Actions */}
                <div className="col-span-2 flex justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 opacity-0 transition-opacity hover:bg-[#2302B3]/10 hover:text-[#2302B3] group-hover:opacity-100"
                    onClick={() => openView(cls)}
                    title="Voir les details"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 opacity-0 transition-opacity hover:bg-[#2302B3]/10 hover:text-[#2302B3] group-hover:opacity-100"
                    onClick={() => openEdit(cls)}
                    title="Modifier"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-red-500 opacity-0 transition-opacity hover:bg-red-50 hover:text-red-700 group-hover:opacity-100"
                    onClick={() => setDeleteTarget(cls)}
                    title="Supprimer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================== PAGINATION ==================== */}
      {!loading && filteredClasses.length > 0 && totalPages > 1 && (
        <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-white px-6 py-4 sm:flex-row">
          {/* Info */}
          <p className="text-sm text-gray-500">
            Affichage de <span className="font-medium text-gray-700">{startIndex + 1}</span> -{' '}
            <span className="font-medium text-gray-700">
              {Math.min(endIndex, filteredClasses.length)}
            </span>{' '}
            sur <span className="font-medium text-gray-700">{filteredClasses.length}</span> classes
          </p>

          {/* Pagination Controls */}
          <div className="flex items-center gap-1">
            {/* First Page */}
            <Button
              variant="outline"
              size="sm"
              className="h-9 w-9 border-gray-200 p-0"
              onClick={() => goToPage(1)}
              disabled={currentPage === 1}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>

            {/* Previous Page */}
            <Button
              variant="outline"
              size="sm"
              className="h-9 w-9 border-gray-200 p-0"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1 px-2">
              {getPageNumbers().map((page, index) =>
                page === '...' ? (
                  <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
                    ...
                  </span>
                ) : (
                  <Button
                    key={page}
                    variant={currentPage === page ? 'default' : 'outline'}
                    size="sm"
                    className={`h-9 w-9 p-0 ${
                      currentPage === page
                        ? 'border-transparent bg-[#2302B3] text-white hover:bg-[#1a0285]'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={() => goToPage(page as number)}
                  >
                    {page}
                  </Button>
                )
              )}
            </div>

            {/* Next Page */}
            <Button
              variant="outline"
              size="sm"
              className="h-9 w-9 border-gray-200 p-0"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            {/* Last Page */}
            <Button
              variant="outline"
              size="sm"
              className="h-9 w-9 border-gray-200 p-0"
              onClick={() => goToPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* No results after filter */}
      {!loading && !error && classes.length > 0 && filteredClasses.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <Search className="h-12 w-12 text-gray-300" />
          <p className="mt-4 text-gray-600">Aucune classe ne correspond aux filtres</p>
        </div>
      )}

      {/* ==================== MODAL CREATE / EDIT ==================== */}
      <Dialog
        open={modalMode === 'create' || modalMode === 'edit'}
        onOpenChange={(open) => !open && closeModal()}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {modalMode === 'create' ? 'Nouvelle classe' : 'Modifier la classe'}
            </DialogTitle>
            <DialogDescription>
              {modalMode === 'create'
                ? 'Remplissez les informations pour creer une nouvelle classe.'
                : `Modification de ${selectedClasse?.nomClasse}`}
            </DialogDescription>
          </DialogHeader>

          {formError && (
            <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <p className="text-sm text-red-700">{formError}</p>
            </div>
          )}

          <div className="grid gap-4 py-4">
            {/* Nom */}
            <div className="grid gap-2">
              <Label htmlFor="nomClasse">Nom de la classe *</Label>
              <Input
                id="nomClasse"
                placeholder="Ex: 6eme A, CM2-B..."
                value={formData.nomClasse}
                onChange={(e) => setFormData({ ...formData, nomClasse: e.target.value })}
              />
            </div>

            {/* Niveau + Sous-systeme */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Niveau *</Label>
                <Select
                  value={formData.niveau}
                  onValueChange={(v) => setFormData({ ...formData, niveau: v as Niveau })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(Object.keys(NIVEAU_LABELS) as Niveau[]).map((n) => (
                      <SelectItem key={n} value={n}>
                        {NIVEAU_LABELS[n]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Sous-systeme *</Label>
                <Select
                  value={formData.sousSysteme}
                  onValueChange={(v) => setFormData({ ...formData, sousSysteme: v as SousSysteme })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(Object.keys(SOUS_SYSTEME_LABELS) as SousSysteme[]).map((s) => (
                      <SelectItem key={s} value={s}>
                        {SOUS_SYSTEME_LABELS[s]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Section + Capacite */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="section">Section</Label>
                <Input
                  id="section"
                  placeholder="Ex: A, B, C..."
                  value={formData.section || ''}
                  onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="capacite">Capacite</Label>
                <Input
                  id="capacite"
                  type="number"
                  min={1}
                  value={formData.capacite || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, capacite: parseInt(e.target.value) || undefined })
                  }
                />
              </div>
            </div>

            {/* Frais */}
            <div className="grid gap-2">
              <Label htmlFor="frais">Frais de scolarite (FCFA)</Label>
              <Input
                id="frais"
                type="number"
                min={0}
                value={formData.fraisScolarite || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    fraisScolarite: parseFloat(e.target.value) || undefined,
                  })
                }
              />
            </div>

            {/* Statut (only in edit mode) */}
            {modalMode === 'edit' && (
              <div className="grid gap-2">
                <Label>Statut</Label>
                <Select
                  value={formData.statut || 'ACTIVE'}
                  onValueChange={(v) => setFormData({ ...formData, statut: v as StatutClasse })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(Object.keys(STATUT_LABELS) as StatutClasse[]).map((s) => (
                      <SelectItem key={s} value={s}>
                        {STATUT_LABELS[s]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Ecole ID */}
            <div className="grid gap-2">
              <Label htmlFor="ecoleId">ID Ecole *</Label>
              <Input
                id="ecoleId"
                type="number"
                min={1}
                value={formData.ecoleId || ''}
                onChange={(e) =>
                  setFormData({ ...formData, ecoleId: parseInt(e.target.value) || 1 })
                }
              />
            </div>

            {/* Annee scolaire ID + Titulaire ID */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="anneeScolaireId">ID Annee scolaire</Label>
                <Input
                  id="anneeScolaireId"
                  type="number"
                  min={1}
                  placeholder="Optionnel"
                  value={formData.anneeScolaireId || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      anneeScolaireId: parseInt(e.target.value) || undefined,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="titulaireId">ID Titulaire</Label>
                <Input
                  id="titulaireId"
                  type="number"
                  min={1}
                  placeholder="Optionnel"
                  value={formData.titulaireId || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, titulaireId: parseInt(e.target.value) || undefined })
                  }
                />
              </div>
            </div>

            {/* Description */}
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Description de la classe..."
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={closeModal} disabled={saving}>
              Annuler
            </Button>
            <Button
              className="bg-[#2302B3] hover:bg-[#1a0285]"
              onClick={handleSubmit}
              disabled={saving}
            >
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {modalMode === 'create' ? 'Creer' : 'Enregistrer'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ==================== MODAL VIEW ==================== */}
      <Dialog open={modalMode === 'view'} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Details de la classe</DialogTitle>
            <DialogDescription>{selectedClasse?.nomClasse}</DialogDescription>
          </DialogHeader>

          {selectedClasse && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Nom</p>
                  <p className="font-semibold">{selectedClasse.nomClasse}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Statut</p>
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${STATUT_COLORS[selectedClasse.statut]}`}
                  >
                    {STATUT_LABELS[selectedClasse.statut]}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Niveau</p>
                  <p className="font-semibold">{NIVEAU_LABELS[selectedClasse.niveau]}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Sous-systeme</p>
                  <p className="font-semibold">{SOUS_SYSTEME_LABELS[selectedClasse.sousSysteme]}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Section</p>
                  <p className="font-semibold">{selectedClasse.section || '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Capacite</p>
                  <p className="font-semibold">{selectedClasse.capacite ?? '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Effectif actuel</p>
                  <p className="font-semibold">{selectedClasse.effectifActuel ?? 0}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Frais de scolarite</p>
                  <p className="font-semibold">
                    {selectedClasse.fraisScolarite
                      ? `${selectedClasse.fraisScolarite.toLocaleString()} FCFA`
                      : '-'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Titulaire</p>
                  <p className="font-semibold">{selectedClasse.titulaireNom || 'Non assigne'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Ecole</p>
                  <p className="font-semibold">{selectedClasse.ecoleNom || '-'}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-gray-500">Annee scolaire</p>
                  <p className="font-semibold">{selectedClasse.anneeScolaireLibelle || '-'}</p>
                </div>
              </div>
              {selectedClasse.description && (
                <div>
                  <p className="text-xs text-gray-500">Description</p>
                  <p className="text-sm text-gray-700">{selectedClasse.description}</p>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={closeModal}>
              Fermer
            </Button>
            <Button
              className="bg-[#2302B3] hover:bg-[#1a0285]"
              onClick={() => {
                if (selectedClasse) {
                  closeModal()
                  openEdit(selectedClasse)
                }
              }}
            >
              <Edit className="mr-2 h-4 w-4" />
              Modifier
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ==================== MODAL DELETE CONFIRMATION ==================== */}
      <Dialog open={deleteTarget !== null} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Voulez-vous vraiment supprimer la classe &laquo; {deleteTarget?.nomClasse} &raquo; ?
              Cette action est irreversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)} disabled={deleting}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={deleting}>
              {deleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
