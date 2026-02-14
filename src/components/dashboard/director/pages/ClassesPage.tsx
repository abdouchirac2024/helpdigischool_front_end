'use client'

import { useState, useEffect, useMemo } from 'react'
import {
  Users,
  School,
  Search,
  Plus,
  Eye,
  Edit,
  Clock,
  TrendingUp,
  Award,
  Loader2,
  Trash2,
  LayoutGrid,
  List,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  SlidersHorizontal,
  X,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { classeService } from '@/services/classe.service'
import type { ClasseDto, CreateClasseRequest } from '@/types/classe'
import { Niveau, SousSysteme, StatutClasse } from '@/types/classe'
import { toast } from 'sonner'

// ── Labels ──────────────────────────────────────────────────
const NIVEAU_LABELS: Record<string, string> = {
  MATERNELLE: 'Maternelle',
  PRIMAIRE: 'Primaire',
  COLLEGE: 'Collège',
  LYCEE: 'Lycée',
  NURSERY: 'Nursery',
  PRIMARY: 'Primary',
  SECONDARY: 'Secondary',
  HIGH_SCHOOL: 'High School',
}

const SOUS_SYSTEME_LABELS: Record<string, string> = {
  FRANCOPHONE: 'Francophone',
  ANGLOPHONE: 'Anglophone',
  BILINGUE: 'Bilingue',
}

const STATUT_CONFIG: Record<string, { label: string; color: string }> = {
  ACTIVE: { label: 'Active', color: 'bg-green-100 text-green-700' },
  INACTIVE: { label: 'Inactive', color: 'bg-gray-100 text-gray-600' },
  ARCHIVEE: { label: 'Archivée', color: 'bg-orange-100 text-orange-700' },
}

const ITEMS_PER_PAGE_OPTIONS = [6, 12, 24, 48]

const emptyForm: CreateClasseRequest = {
  nomClasse: '',
  niveau: Niveau.PRIMAIRE,
  sousSysteme: SousSysteme.FRANCOPHONE,
  section: '',
  capacite: undefined,
  fraisScolarite: undefined,
  description: '',
}

type SortField = 'nomClasse' | 'niveau' | 'effectifActuel' | 'titulaireNom' | 'statut'
type SortDir = 'asc' | 'desc'
type ViewMode = 'grid' | 'table'

// ── Component ───────────────────────────────────────────────
export function DirectorClassesPage() {
  const [classes, setClasses] = useState<ClasseDto[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Filters
  const [searchQuery, setSearchQuery] = useState('')
  const [niveauFilter, setNiveauFilter] = useState('all')
  const [sousSystemeFilter, setSousSystemeFilter] = useState('all')
  const [statutFilter, setStatutFilter] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  // View & Pagination
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(12)

  // Sorting (table mode)
  const [sortField, setSortField] = useState<SortField>('nomClasse')
  const [sortDir, setSortDir] = useState<SortDir>('asc')

  // Dialogs
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingClasse, setEditingClasse] = useState<ClasseDto | null>(null)
  const [formData, setFormData] = useState<CreateClasseRequest>({ ...emptyForm })
  const [isSaving, setIsSaving] = useState(false)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [viewingClasse, setViewingClasse] = useState<ClasseDto | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deletingClasse, setDeletingClasse] = useState<ClasseDto | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

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

  // ── Derived: unique filter values from data ───────────────
  const availableNiveaux = useMemo(
    () => [...new Set(classes.map((c) => c.niveau).filter(Boolean))],
    [classes]
  )
  const availableSousSys = useMemo(
    () => [...new Set(classes.map((c) => c.sousSysteme).filter(Boolean))] as string[],
    [classes]
  )
  const availableStatuts = useMemo(
    () => [...new Set(classes.map((c) => c.statut || 'ACTIVE').filter(Boolean))],
    [classes]
  )

  // ── Filter + Sort + Paginate ──────────────────────────────
  const filteredClasses = useMemo(() => {
    let result = classes.filter((cls) => {
      const q = searchQuery.toLowerCase()
      const matchesSearch =
        !q ||
        cls.nomClasse.toLowerCase().includes(q) ||
        (cls.titulaireNom || '').toLowerCase().includes(q) ||
        (cls.section || '').toLowerCase().includes(q) ||
        (cls.anneeScolaireLibelle || '').toLowerCase().includes(q)
      const matchesNiveau = niveauFilter === 'all' || cls.niveau === niveauFilter
      const matchesSousSys = sousSystemeFilter === 'all' || cls.sousSysteme === sousSystemeFilter
      const matchesStatut = statutFilter === 'all' || (cls.statut || 'ACTIVE') === statutFilter
      return matchesSearch && matchesNiveau && matchesSousSys && matchesStatut
    })

    // Sort
    result.sort((a, b) => {
      let valA: string | number = ''
      let valB: string | number = ''
      switch (sortField) {
        case 'nomClasse':
          valA = a.nomClasse.toLowerCase()
          valB = b.nomClasse.toLowerCase()
          break
        case 'niveau':
          valA = a.niveau || ''
          valB = b.niveau || ''
          break
        case 'effectifActuel':
          valA = a.effectifActuel || 0
          valB = b.effectifActuel || 0
          break
        case 'titulaireNom':
          valA = (a.titulaireNom || '').toLowerCase()
          valB = (b.titulaireNom || '').toLowerCase()
          break
        case 'statut':
          valA = a.statut || 'ACTIVE'
          valB = b.statut || 'ACTIVE'
          break
      }
      if (valA < valB) return sortDir === 'asc' ? -1 : 1
      if (valA > valB) return sortDir === 'asc' ? 1 : -1
      return 0
    })

    return result
  }, [classes, searchQuery, niveauFilter, sousSystemeFilter, statutFilter, sortField, sortDir])

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, niveauFilter, sousSystemeFilter, statutFilter, itemsPerPage])

  const totalPages = Math.max(1, Math.ceil(filteredClasses.length / itemsPerPage))
  const paginatedClasses = filteredClasses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // Stats
  const totalStudents = classes.reduce((acc, cls) => acc + (cls.effectifActuel || 0), 0)
  const averageStudents = classes.length > 0 ? Math.round(totalStudents / classes.length) : 0

  const activeFiltersCount =
    (niveauFilter !== 'all' ? 1 : 0) +
    (sousSystemeFilter !== 'all' ? 1 : 0) +
    (statutFilter !== 'all' ? 1 : 0)

  // ── Handlers ──────────────────────────────────────────────
  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortField(field)
      setSortDir('asc')
    }
  }

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field)
      return <ArrowUpDown className="ml-1 inline h-3.5 w-3.5 text-gray-400" />
    return sortDir === 'asc' ? (
      <ArrowUp className="ml-1 inline h-3.5 w-3.5 text-[#2302B3]" />
    ) : (
      <ArrowDown className="ml-1 inline h-3.5 w-3.5 text-[#2302B3]" />
    )
  }

  const clearFilters = () => {
    setSearchQuery('')
    setNiveauFilter('all')
    setSousSystemeFilter('all')
    setStatutFilter('all')
  }

  const openViewDialog = (cls: ClasseDto) => {
    setViewingClasse(cls)
    setViewDialogOpen(true)
  }
  const openCreateDialog = () => {
    setEditingClasse(null)
    setFormData({ ...emptyForm })
    setDialogOpen(true)
  }
  const openEditDialog = (cls: ClasseDto) => {
    setEditingClasse(cls)
    setFormData({
      nomClasse: cls.nomClasse,
      niveau: cls.niveau,
      sousSysteme: (cls.sousSysteme as SousSysteme) || SousSysteme.FRANCOPHONE,
      section: cls.section || '',
      capacite: cls.capacite,
      statut: cls.statut || StatutClasse.ACTIVE,
      fraisScolarite: cls.fraisScolarite,
      description: cls.description || '',
      anneeScolaireId: cls.anneeScolaireId,
      titulaireId: cls.titulaireId,
    })
    setDialogOpen(true)
  }
  const handleSave = async () => {
    if (!formData.nomClasse.trim()) {
      toast.error('Le nom de la classe est requis')
      return
    }
    setIsSaving(true)
    try {
      if (editingClasse) {
        await classeService.update(editingClasse.id, formData)
        toast.success('Classe modifiée avec succès')
      } else {
        await classeService.create(formData)
        toast.success('Classe créée avec succès')
      }
      setDialogOpen(false)
      await loadClasses()
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Une erreur est survenue'
      toast.error(editingClasse ? 'Erreur lors de la modification' : 'Erreur lors de la création', {
        description: message,
      })
    } finally {
      setIsSaving(false)
    }
  }
  const openDeleteDialog = (cls: ClasseDto) => {
    setDeletingClasse(cls)
    setDeleteDialogOpen(true)
  }
  const handleToggleStatut = async (cls: ClasseDto) => {
    const newStatut =
      (cls.statut || 'ACTIVE') === 'ACTIVE' ? StatutClasse.INACTIVE : StatutClasse.ACTIVE
    try {
      await classeService.update(cls.id, { statut: newStatut })
      toast.success(
        newStatut === StatutClasse.ACTIVE
          ? `${cls.nomClasse} activée`
          : `${cls.nomClasse} désactivée`
      )
      await loadClasses()
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Une erreur est survenue'
      toast.error('Erreur lors du changement de statut', { description: message })
    }
  }

  const handleDelete = async () => {
    if (!deletingClasse) return
    setIsDeleting(true)
    try {
      await classeService.delete(deletingClasse.id)
      toast.success('Classe supprimée avec succès')
      setDeleteDialogOpen(false)
      setDeletingClasse(null)
      await loadClasses()
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Une erreur est survenue'
      toast.error('Erreur lors de la suppression', { description: message })
    } finally {
      setIsDeleting(false)
    }
  }

  // ── Loading ───────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#2302B3]" />
      </div>
    )
  }

  // ── Render ────────────────────────────────────────────────
  return (
    <div className="space-y-6 p-6">
      {/* ─── Header ──────────────────────────────────────── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Classes</h1>
          <p className="mt-1 text-gray-600">
            {classes.length} classes &bull; {totalStudents} élèves
          </p>
        </div>
        <Button className="gap-2 bg-[#2302B3] hover:bg-[#1a0285]" onClick={openCreateDialog}>
          <Plus className="h-4 w-4" />
          Nouvelle classe
        </Button>
      </div>

      {/* ─── Stats Cards ─────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50">
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
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50">
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
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-50">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{averageStudents}</p>
              <p className="text-sm text-gray-500">Moy. élèves/classe</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-50">
              <Award className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {classes.filter((c) => (c.statut || 'ACTIVE') === 'ACTIVE').length}
              </p>
              <p className="text-sm text-gray-500">Classes actives</p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Toolbar: Search + Filters + View Toggle ─────── */}
      <div className="rounded-2xl border border-gray-100 bg-white p-4">
        <div className="flex flex-col gap-3">
          {/* Row 1: Search + Filter toggle + View toggle */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Rechercher par nom, enseignant, section..."
                className="h-10 pl-10 text-sm"
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

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filtres
                {activeFiltersCount > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#2302B3] text-[10px] font-bold text-white">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>

              <div className="h-6 w-px bg-gray-200" />

              <div className="flex rounded-lg border border-gray-200">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center justify-center rounded-l-lg px-3 py-2 transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-[#2302B3] text-white'
                      : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`flex items-center justify-center rounded-r-lg px-3 py-2 transition-colors ${
                    viewMode === 'table'
                      ? 'bg-[#2302B3] text-white'
                      : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Row 2: Filter dropdowns (collapsible) */}
          {showFilters && (
            <div className="flex flex-col gap-3 border-t border-gray-100 pt-3 sm:flex-row sm:items-end">
              <div className="flex-1">
                <label className="mb-1 block text-xs font-medium text-gray-500">Niveau</label>
                <Select value={niveauFilter} onValueChange={setNiveauFilter}>
                  <SelectTrigger className="h-9 text-sm">
                    <SelectValue placeholder="Tous les niveaux" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les niveaux</SelectItem>
                    {availableNiveaux.map((n) => (
                      <SelectItem key={n} value={n}>
                        {NIVEAU_LABELS[n] || n}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1">
                <label className="mb-1 block text-xs font-medium text-gray-500">Sous-système</label>
                <Select value={sousSystemeFilter} onValueChange={setSousSystemeFilter}>
                  <SelectTrigger className="h-9 text-sm">
                    <SelectValue placeholder="Tous" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous</SelectItem>
                    {availableSousSys.map((s) => (
                      <SelectItem key={s} value={s}>
                        {SOUS_SYSTEME_LABELS[s] || s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1">
                <label className="mb-1 block text-xs font-medium text-gray-500">Statut</label>
                <Select value={statutFilter} onValueChange={setStatutFilter}>
                  <SelectTrigger className="h-9 text-sm">
                    <SelectValue placeholder="Tous" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    {availableStatuts.map((s) => (
                      <SelectItem key={s} value={s}>
                        {STATUT_CONFIG[s]?.label || s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {activeFiltersCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="gap-1 text-gray-500"
                >
                  <X className="h-3.5 w-3.5" />
                  Réinitialiser
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Result count */}
        <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3 text-sm text-gray-500">
          <span>
            {filteredClasses.length} résultat{filteredClasses.length !== 1 ? 's' : ''}
            {filteredClasses.length !== classes.length && ` sur ${classes.length}`}
          </span>
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {niveauFilter !== 'all' && (
                <Badge variant="secondary" className="gap-1 text-xs">
                  {NIVEAU_LABELS[niveauFilter] || niveauFilter}
                  <button onClick={() => setNiveauFilter('all')}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {sousSystemeFilter !== 'all' && (
                <Badge variant="secondary" className="gap-1 text-xs">
                  {SOUS_SYSTEME_LABELS[sousSystemeFilter] || sousSystemeFilter}
                  <button onClick={() => setSousSystemeFilter('all')}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {statutFilter !== 'all' && (
                <Badge variant="secondary" className="gap-1 text-xs">
                  {STATUT_CONFIG[statutFilter]?.label || statutFilter}
                  <button onClick={() => setStatutFilter('all')}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ─── TABLE VIEW ──────────────────────────────────── */}
      {viewMode === 'table' && (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/80">
                <TableHead
                  className="cursor-pointer select-none"
                  onClick={() => toggleSort('nomClasse')}
                >
                  Classe <SortIcon field="nomClasse" />
                </TableHead>
                <TableHead
                  className="cursor-pointer select-none"
                  onClick={() => toggleSort('niveau')}
                >
                  Niveau <SortIcon field="niveau" />
                </TableHead>
                <TableHead className="hidden md:table-cell">Sous-système</TableHead>
                <TableHead
                  className="cursor-pointer select-none text-center"
                  onClick={() => toggleSort('effectifActuel')}
                >
                  Effectif <SortIcon field="effectifActuel" />
                </TableHead>
                <TableHead className="hidden lg:table-cell">Capacité</TableHead>
                <TableHead
                  className="cursor-pointer select-none"
                  onClick={() => toggleSort('titulaireNom')}
                >
                  Titulaire <SortIcon field="titulaireNom" />
                </TableHead>
                <TableHead
                  className="hidden cursor-pointer select-none md:table-cell"
                  onClick={() => toggleSort('statut')}
                >
                  Statut <SortIcon field="statut" />
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedClasses.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="py-12 text-center text-gray-500">
                    Aucune classe trouvée
                  </TableCell>
                </TableRow>
              ) : (
                paginatedClasses.map((cls) => {
                  const statut = cls.statut || 'ACTIVE'
                  const cfg = STATUT_CONFIG[statut] || STATUT_CONFIG.ACTIVE
                  return (
                    <TableRow key={cls.id} className="group">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#2302B3]/10">
                            <School className="h-4 w-4 text-[#2302B3]" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{cls.nomClasse}</p>
                            {cls.section && (
                              <p className="text-xs text-gray-500">Section {cls.section}</p>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{NIVEAU_LABELS[cls.niveau] || cls.niveau}</span>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <span className="text-sm text-gray-600">
                          {cls.sousSysteme
                            ? SOUS_SYSTEME_LABELS[cls.sousSysteme] || cls.sousSysteme
                            : '-'}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="font-semibold text-gray-900">
                          {cls.effectifActuel || 0}
                        </span>
                      </TableCell>
                      <TableCell className="hidden text-center lg:table-cell">
                        <span className="text-sm text-gray-600">{cls.capacite || '-'}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">
                          {cls.titulaireNom || (
                            <span className="italic text-gray-400">Non assigné</span>
                          )}
                        </span>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${cfg.color}`}
                        >
                          {cfg.label}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => openViewDialog(cls)}
                          >
                            <Eye className="h-4 w-4 text-gray-500" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => openEditDialog(cls)}
                          >
                            <Edit className="h-4 w-4 text-gray-500" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            title={statut === 'ACTIVE' ? 'Désactiver' : 'Activer'}
                            onClick={() => handleToggleStatut(cls)}
                          >
                            {statut === 'ACTIVE' ? (
                              <ToggleRight className="h-4 w-4 text-green-500" />
                            ) : (
                              <ToggleLeft className="h-4 w-4 text-gray-400" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => openDeleteDialog(cls)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* ─── GRID VIEW ───────────────────────────────────── */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {paginatedClasses.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white py-16">
              <School className="mb-3 h-12 w-12 text-gray-300" />
              <p className="text-lg font-medium text-gray-500">Aucune classe trouvée</p>
              <p className="mt-1 text-sm text-gray-400">Essayez de modifier vos filtres</p>
            </div>
          ) : (
            paginatedClasses.map((cls) => {
              const statut = cls.statut || 'ACTIVE'
              const cfg = STATUT_CONFIG[statut] || STATUT_CONFIG.ACTIVE
              return (
                <div
                  key={cls.id}
                  className="group overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all hover:shadow-lg"
                >
                  <div className="bg-gradient-to-r from-[#2302B3] to-[#4318FF] p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-white">{cls.nomClasse}</h3>
                        <p className="text-sm text-white/70">
                          {NIVEAU_LABELS[cls.niveau] || cls.niveau}
                          {cls.section ? ` • Section ${cls.section}` : ''}
                        </p>
                      </div>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                          statut === 'ACTIVE'
                            ? 'bg-white/20 text-white'
                            : 'bg-white/90 text-gray-700'
                        }`}
                      >
                        {cfg.label}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 p-4">
                    {/* Teacher */}
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#2302B3] to-[#4318FF] text-xs font-semibold text-white">
                        {cls.titulaireNom
                          ? (
                              cls.titulaireNom.split(' ')[1]?.charAt(0) ||
                              cls.titulaireNom.charAt(0)
                            ).toUpperCase()
                          : '?'}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-gray-900">
                          {cls.titulaireNom || 'Non assigné'}
                        </p>
                        <p className="text-xs text-gray-500">Professeur principal</p>
                      </div>
                    </div>

                    {/* Stats row */}
                    <div className="grid grid-cols-3 gap-2">
                      <div className="rounded-xl bg-gray-50 p-2.5 text-center">
                        <p className="text-lg font-bold text-gray-900">{cls.effectifActuel || 0}</p>
                        <p className="text-[10px] uppercase tracking-wide text-gray-500">Élèves</p>
                      </div>
                      <div className="rounded-xl bg-gray-50 p-2.5 text-center">
                        <p className="text-lg font-bold text-gray-900">{cls.capacite || '-'}</p>
                        <p className="text-[10px] uppercase tracking-wide text-gray-500">
                          Capacité
                        </p>
                      </div>
                      <div className="rounded-xl bg-gray-50 p-2.5 text-center">
                        <p className="text-lg font-bold text-gray-900">
                          {cls.fraisScolarite ? `${Math.round(cls.fraisScolarite / 1000)}k` : '-'}
                        </p>
                        <p className="text-[10px] uppercase tracking-wide text-gray-500">Frais</p>
                      </div>
                    </div>

                    {/* Sous-système tag */}
                    {cls.sousSysteme && (
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="rounded-md bg-gray-100 px-2 py-0.5 font-medium">
                          {SOUS_SYSTEME_LABELS[cls.sousSysteme] || cls.sousSysteme}
                        </span>
                        {cls.anneeScolaireLibelle && (
                          <span className="rounded-md bg-gray-100 px-2 py-0.5 font-medium">
                            {cls.anneeScolaireLibelle}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2 border-t border-gray-100 pt-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 gap-1 text-xs"
                        onClick={() => openViewDialog(cls)}
                      >
                        <Eye className="h-3.5 w-3.5" />
                        Voir
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 gap-1 text-xs"
                        onClick={() => openEditDialog(cls)}
                      >
                        <Edit className="h-3.5 w-3.5" />
                        Modifier
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className={`gap-1 text-xs ${
                          statut === 'ACTIVE'
                            ? 'text-green-600 hover:bg-green-50 hover:text-green-700'
                            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                        }`}
                        title={statut === 'ACTIVE' ? 'Désactiver' : 'Activer'}
                        onClick={() => handleToggleStatut(cls)}
                      >
                        {statut === 'ACTIVE' ? (
                          <ToggleRight className="h-3.5 w-3.5" />
                        ) : (
                          <ToggleLeft className="h-3.5 w-3.5" />
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1 text-xs text-red-600 hover:bg-red-50 hover:text-red-700"
                        onClick={() => openDeleteDialog(cls)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      )}

      {/* ─── Pagination ──────────────────────────────────── */}
      {filteredClasses.length > 0 && (
        <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-white px-4 py-3 sm:flex-row">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Afficher</span>
            <Select
              value={String(itemsPerPage)}
              onValueChange={(val) => setItemsPerPage(Number(val))}
            >
              <SelectTrigger className="h-8 w-[70px] text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ITEMS_PER_PAGE_OPTIONS.map((n) => (
                  <SelectItem key={n} value={String(n)}>
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span>par page</span>
          </div>

          <div className="text-sm text-gray-600">
            Page {currentPage} sur {totalPages}
            <span className="ml-2 text-gray-400">
              ({(currentPage - 1) * itemsPerPage + 1}-
              {Math.min(currentPage * itemsPerPage, filteredClasses.length)} sur{' '}
              {filteredClasses.length})
            </span>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* Page numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
              .reduce<(number | 'dots')[]>((acc, p, i, arr) => {
                if (i > 0 && p - (arr[i - 1] as number) > 1) acc.push('dots')
                acc.push(p)
                return acc
              }, [])
              .map((item, i) =>
                item === 'dots' ? (
                  <span key={`dots-${i}`} className="px-1 text-gray-400">
                    ...
                  </span>
                ) : (
                  <Button
                    key={item}
                    variant={currentPage === item ? 'default' : 'outline'}
                    size="sm"
                    className={`h-8 w-8 p-0 text-xs ${
                      currentPage === item ? 'bg-[#2302B3] hover:bg-[#1a0285]' : ''
                    }`}
                    onClick={() => setCurrentPage(item)}
                  >
                    {item}
                  </Button>
                )
              )}

            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* ═══ DIALOGS ═══════════════════════════════════════ */}

      {/* ─── Create / Edit ───────────────────────────────── */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>{editingClasse ? 'Modifier la classe' : 'Nouvelle classe'}</DialogTitle>
            <DialogDescription>
              {editingClasse
                ? `Modifier les informations de ${editingClasse.nomClasse}`
                : 'Remplissez les informations pour créer une nouvelle classe'}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="nomClasse">Nom de la classe *</Label>
              <Input
                id="nomClasse"
                placeholder="Ex: CM2 A, 6ème B..."
                value={formData.nomClasse}
                onChange={(e) => setFormData((prev) => ({ ...prev, nomClasse: e.target.value }))}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Niveau *</Label>
                <Select
                  value={formData.niveau}
                  onValueChange={(val) =>
                    setFormData((prev) => ({ ...prev, niveau: val as Niveau }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(Niveau).map((n) => (
                      <SelectItem key={n} value={n}>
                        {NIVEAU_LABELS[n] || n}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Sous-système</Label>
                <Select
                  value={formData.sousSysteme || ''}
                  onValueChange={(val) =>
                    setFormData((prev) => ({ ...prev, sousSysteme: val as SousSysteme }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(SousSysteme).map((s) => (
                      <SelectItem key={s} value={s}>
                        {SOUS_SYSTEME_LABELS[s] || s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="section">Section</Label>
              <Input
                id="section"
                placeholder="Ex: A, B, C..."
                value={formData.section || ''}
                onChange={(e) => setFormData((prev) => ({ ...prev, section: e.target.value }))}
              />
            </div>

            {editingClasse && (
              <div className="grid gap-2">
                <Label>Statut</Label>
                <Select
                  value={formData.statut || StatutClasse.ACTIVE}
                  onValueChange={(val) =>
                    setFormData((prev) => ({ ...prev, statut: val as StatutClasse }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner le statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={StatutClasse.ACTIVE}>
                      <span className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-green-500" />
                        Active
                      </span>
                    </SelectItem>
                    <SelectItem value={StatutClasse.INACTIVE}>
                      <span className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-gray-400" />
                        Inactive
                      </span>
                    </SelectItem>
                    <SelectItem value={StatutClasse.ARCHIVEE}>
                      <span className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-orange-500" />
                        Archivée
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="capacite">Capacité</Label>
                <Input
                  id="capacite"
                  type="number"
                  placeholder="Ex: 40"
                  value={formData.capacite ?? ''}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      capacite: e.target.value ? Number(e.target.value) : undefined,
                    }))
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="fraisScolarite">Frais scolarité (FCFA)</Label>
                <Input
                  id="fraisScolarite"
                  type="number"
                  placeholder="Ex: 50000"
                  value={formData.fraisScolarite ?? ''}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      fraisScolarite: e.target.value ? Number(e.target.value) : undefined,
                    }))
                  }
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Description optionnelle..."
                value={formData.description || ''}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)} disabled={isSaving}>
              Annuler
            </Button>
            <Button
              className="bg-[#2302B3] hover:bg-[#1a0285]"
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {editingClasse ? 'Modification...' : 'Création...'}
                </>
              ) : editingClasse ? (
                'Enregistrer'
              ) : (
                'Créer la classe'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ─── View Detail ─────────────────────────────────── */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{viewingClasse?.nomClasse}</DialogTitle>
            <DialogDescription>Détails de la classe</DialogDescription>
          </DialogHeader>
          {viewingClasse && (
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-gray-50 p-3">
                  <p className="text-xs text-gray-500">Niveau</p>
                  <p className="font-semibold text-gray-900">
                    {NIVEAU_LABELS[viewingClasse.niveau] || viewingClasse.niveau}
                  </p>
                </div>
                <div className="rounded-lg bg-gray-50 p-3">
                  <p className="text-xs text-gray-500">Sous-système</p>
                  <p className="font-semibold text-gray-900">
                    {viewingClasse.sousSysteme
                      ? SOUS_SYSTEME_LABELS[viewingClasse.sousSysteme] || viewingClasse.sousSysteme
                      : '-'}
                  </p>
                </div>
                <div className="rounded-lg bg-gray-50 p-3">
                  <p className="text-xs text-gray-500">Section</p>
                  <p className="font-semibold text-gray-900">{viewingClasse.section || '-'}</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-3">
                  <p className="text-xs text-gray-500">Statut</p>
                  <p className="font-semibold text-gray-900">
                    {STATUT_CONFIG[viewingClasse.statut || 'ACTIVE']?.label || 'Active'}
                  </p>
                </div>
                <div className="rounded-lg bg-gray-50 p-3">
                  <p className="text-xs text-gray-500">Effectif actuel</p>
                  <p className="font-semibold text-gray-900">
                    {viewingClasse.effectifActuel ?? 0}
                    {viewingClasse.capacite ? ` / ${viewingClasse.capacite}` : ''}
                  </p>
                </div>
                <div className="rounded-lg bg-gray-50 p-3">
                  <p className="text-xs text-gray-500">Frais de scolarité</p>
                  <p className="font-semibold text-gray-900">
                    {viewingClasse.fraisScolarite
                      ? `${viewingClasse.fraisScolarite.toLocaleString()} FCFA`
                      : '-'}
                  </p>
                </div>
              </div>
              <div className="rounded-lg bg-gray-50 p-3">
                <p className="text-xs text-gray-500">Professeur principal</p>
                <p className="font-semibold text-gray-900">
                  {viewingClasse.titulaireNom || 'Non assigné'}
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-3">
                <p className="text-xs text-gray-500">Année scolaire</p>
                <p className="font-semibold text-gray-900">
                  {viewingClasse.anneeScolaireLibelle || '-'}
                </p>
              </div>
              {viewingClasse.description && (
                <div className="rounded-lg bg-gray-50 p-3">
                  <p className="text-xs text-gray-500">Description</p>
                  <p className="text-sm text-gray-900">{viewingClasse.description}</p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
              Fermer
            </Button>
            <Button
              className="bg-[#2302B3] hover:bg-[#1a0285]"
              onClick={() => {
                setViewDialogOpen(false)
                if (viewingClasse) openEditDialog(viewingClasse)
              }}
            >
              <Edit className="mr-2 h-4 w-4" />
              Modifier
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ─── Delete Confirmation ─────────────────────────── */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Supprimer la classe</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer la classe{' '}
              <strong>{deletingClasse?.nomClasse}</strong> ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={isDeleting}
            >
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Suppression...
                </>
              ) : (
                'Supprimer'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
