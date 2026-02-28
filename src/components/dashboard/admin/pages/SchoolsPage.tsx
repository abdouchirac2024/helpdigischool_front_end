'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import {
  Search,
  Filter,
  Download,
  Eye,
  MapPin,
  CheckCircle,
  XCircle,
  Loader2,
  Phone,
  Mail,
  Calendar,
  Shield,
  Palette,
  RefreshCw,
  School,
  Users,
  Clock,
  AlertTriangle,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  X,
  Building2,
  Globe,
  ExternalLink,
} from 'lucide-react'
import { toast } from 'sonner'
import { Pagination } from '../../shared/Pagination'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { apiClient } from '@/lib/api/client'
import { API_ENDPOINTS } from '@/lib/api/config'
import type { SchoolBackend } from '@/types/models/school'

interface SchoolStats {
  total: number
  enAttente: number
  validees: number
  rejetees: number
  suspendues: number
}

type SortField = 'nom' | 'regionNom' | 'nombreEleves' | 'createdAt' | 'statutEcole'
type SortDir = 'asc' | 'desc'

export function AdminSchoolsPage() {
  const [schools, setSchools] = useState<SchoolBackend[]>([])
  const [stats, setStats] = useState<SchoolStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [statsLoading, setStatsLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [regionFilter, setRegionFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [secteurFilter, setSecteurFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortField, setSortField] = useState<SortField>('createdAt')
  const [sortDir, setSortDir] = useState<SortDir>('desc')
  const itemsPerPage = 15

  // Rejection dialog state
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false)
  const [schoolToReject, setSchoolToReject] = useState<SchoolBackend | null>(null)
  const [motifRejet, setMotifRejet] = useState('')
  const [actionLoadingId, setActionLoadingId] = useState<number | null>(null)

  // Confirmation dialog state
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
  const [schoolToValidate, setSchoolToValidate] = useState<SchoolBackend | null>(null)

  // Detail dialog state
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)
  const [detailSchool, setDetailSchool] = useState<SchoolBackend | null>(null)
  const [detailLoading, setDetailLoading] = useState(false)

  // Debounce search
  const debounceRef = useRef<ReturnType<typeof setTimeout>>()
  useEffect(() => {
    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(searchQuery)
    }, 300)
    return () => clearTimeout(debounceRef.current)
  }, [searchQuery])

  useEffect(() => {
    fetchSchools()
    fetchStats()
  }, [])

  async function fetchSchools() {
    setLoading(true)
    setError(false)
    try {
      const data = await apiClient.get<SchoolBackend[]>(API_ENDPOINTS.schools.all)
      setSchools(data)
    } catch {
      setError(true)
      toast.error('Impossible de charger la liste des écoles.')
    } finally {
      setLoading(false)
    }
  }

  async function fetchStats() {
    setStatsLoading(true)
    try {
      const data = await apiClient.get<SchoolStats>(API_ENDPOINTS.schools.stats)
      setStats(data)
    } catch {
      // Stats non critiques
    } finally {
      setStatsLoading(false)
    }
  }

  async function handleRefresh() {
    setRefreshing(true)
    try {
      const [schoolsData, statsData] = await Promise.all([
        apiClient.get<SchoolBackend[]>(API_ENDPOINTS.schools.all),
        apiClient.get<SchoolStats>(API_ENDPOINTS.schools.stats).catch(() => null),
      ])
      setSchools(schoolsData)
      if (statsData) setStats(statsData)
      setError(false)
      toast.success('Données actualisées.')
    } catch {
      toast.error('Erreur lors du rafraîchissement.')
    } finally {
      setRefreshing(false)
    }
  }

  async function openDetailDialog(school: SchoolBackend) {
    setDetailDialogOpen(true)
    setDetailLoading(true)
    try {
      const data = await apiClient.get<SchoolBackend>(API_ENDPOINTS.schools.byId(String(school.id)))
      setDetailSchool(data)
    } catch {
      setDetailSchool(school)
    } finally {
      setDetailLoading(false)
    }
  }

  function requestValidation(school: SchoolBackend) {
    setSchoolToValidate(school)
    setConfirmDialogOpen(true)
  }

  async function handleValidate() {
    if (!schoolToValidate) return
    setActionLoadingId(schoolToValidate.id)
    try {
      await apiClient.put(API_ENDPOINTS.schools.validate(String(schoolToValidate.id)), {
        approuve: true,
      })
      toast.success(`L'école "${schoolToValidate.nom}" a été validée avec succès.`)
      setConfirmDialogOpen(false)
      setSchoolToValidate(null)
      setDetailDialogOpen(false)
      setDetailSchool(null)
      await Promise.all([fetchSchools(), fetchStats()])
    } catch {
      toast.error(`Erreur lors de la validation de l'école "${schoolToValidate.nom}".`)
    } finally {
      setActionLoadingId(null)
    }
  }

  function openRejectDialog(school: SchoolBackend) {
    setSchoolToReject(school)
    setMotifRejet('')
    setRejectDialogOpen(true)
  }

  async function handleReject() {
    if (!schoolToReject) return
    if (!motifRejet.trim()) {
      toast.error('Le motif de rejet est obligatoire.')
      return
    }

    setActionLoadingId(schoolToReject.id)
    try {
      await apiClient.put(API_ENDPOINTS.schools.validate(String(schoolToReject.id)), {
        approuve: false,
        motifRejet: motifRejet.trim(),
      })
      toast.success(`L'école "${schoolToReject.nom}" a été rejetée.`)
      setRejectDialogOpen(false)
      setSchoolToReject(null)
      setMotifRejet('')
      setDetailDialogOpen(false)
      setDetailSchool(null)
      await Promise.all([fetchSchools(), fetchStats()])
    } catch {
      toast.error(`Erreur lors du rejet de l'école "${schoolToReject.nom}".`)
    } finally {
      setActionLoadingId(null)
    }
  }

  function handleExportCSV() {
    if (filteredAndSortedSchools.length === 0) {
      toast.error('Aucune école à exporter.')
      return
    }

    const headers = [
      'Code',
      'Nom',
      'Secteur',
      'Type',
      'Sous-système',
      'Région',
      'Ville',
      'Élèves',
      'Statut',
      'Directeur',
      'Email',
      'Téléphone',
      'Date inscription',
    ]
    const rows = filteredAndSortedSchools.map((s) => [
      s.codeEcole || '',
      s.nom || '',
      getTypeSecteurLabel(s.typeSecteur),
      getTypeEtablissementLabel(s.typeEtablissement),
      getSousSystemeLabel(s.sousSysteme) || '',
      s.regionNom || '',
      s.villeNom || '',
      s.nombreEleves != null ? String(s.nombreEleves) : '',
      getStatusLabel(s.statutEcole),
      s.directeurNom || '',
      s.email || '',
      s.telephone || '',
      formatDate(s.createdAt),
    ])

    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(','))
      .join('\n')

    const BOM = '\uFEFF'
    const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `ecoles_export_${new Date().toISOString().slice(0, 10)}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    toast.success(`${filteredAndSortedSchools.length} école(s) exportée(s).`)
  }

  // Filtrage
  const filteredSchools = useMemo(() => {
    return schools.filter((school) => {
      const query = debouncedSearch.toLowerCase()
      const matchesSearch =
        !query ||
        [
          school.nom,
          school.codeEcole,
          school.email,
          school.directeurNom,
          school.villeNom,
          school.telephone,
        ]
          .filter(Boolean)
          .some((field) => field!.toLowerCase().includes(query))
      const matchesRegion = regionFilter === 'all' || school.regionNom === regionFilter
      const matchesStatus = statusFilter === 'all' || school.statutEcole === statusFilter
      const matchesSecteur = secteurFilter === 'all' || school.typeSecteur === secteurFilter
      return matchesSearch && matchesRegion && matchesStatus && matchesSecteur
    })
  }, [schools, debouncedSearch, regionFilter, statusFilter, secteurFilter])

  // Tri
  const filteredAndSortedSchools = useMemo(() => {
    const sorted = [...filteredSchools]
    sorted.sort((a, b) => {
      let cmp = 0
      switch (sortField) {
        case 'nom':
          cmp = (a.nom || '').localeCompare(b.nom || '', 'fr')
          break
        case 'regionNom':
          cmp = (a.regionNom || '').localeCompare(b.regionNom || '', 'fr')
          break
        case 'nombreEleves':
          cmp = (a.nombreEleves ?? 0) - (b.nombreEleves ?? 0)
          break
        case 'createdAt':
          cmp = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          break
        case 'statutEcole':
          cmp = a.statutEcole.localeCompare(b.statutEcole)
          break
      }
      return sortDir === 'asc' ? cmp : -cmp
    })
    return sorted
  }, [filteredSchools, sortField, sortDir])

  const totalPages = Math.ceil(filteredAndSortedSchools.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedSchools = filteredAndSortedSchools.slice(startIndex, startIndex + itemsPerPage)

  // Reset page 1 quand filtres changent
  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearch, regionFilter, statusFilter, secteurFilter, sortField, sortDir])

  // Régions uniques
  const regions = useMemo(
    () => Array.from(new Set(schools.map((s) => s.regionNom).filter(Boolean))).sort() as string[],
    [schools]
  )

  // Nombre de filtres actifs
  const activeFiltersCount = [
    regionFilter !== 'all',
    statusFilter !== 'all',
    secteurFilter !== 'all',
    debouncedSearch !== '',
  ].filter(Boolean).length

  function resetFilters() {
    setSearchQuery('')
    setRegionFilter('all')
    setStatusFilter('all')
    setSecteurFilter('all')
  }

  const toggleSort = useCallback(
    (field: SortField) => {
      if (sortField === field) {
        setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
      } else {
        setSortField(field)
        setSortDir('asc')
      }
    },
    [sortField]
  )

  // === Helpers ===

  function isNew(createdAt: string): boolean {
    try {
      return Date.now() - new Date(createdAt).getTime() < 48 * 60 * 60 * 1000
    } catch {
      return false
    }
  }

  const getSousSystemeLabel = (type?: string) => {
    const labels: Record<string, string> = {
      FRANCOPHONE: 'Francophone',
      ANGLOPHONE: 'Anglophone',
      BILINGUE: 'Bilingue',
    }
    return labels[type || ''] || null
  }

  const getTypeSecteurLabel = (type?: string) => {
    const labels: Record<string, string> = {
      PUBLIC: 'Public',
      PRIVE_LAIC: 'Privé laïque',
      PRIVE_CONFESSIONNEL: 'Privé confessionnel',
      PRIVE_COMMUNAUTAIRE: 'Communautaire',
    }
    return labels[type || ''] || '-'
  }

  const getTypeSecteurBadge = (type?: string) => {
    if (!type) return <span className="text-sm text-gray-400">-</span>
    const styles: Record<string, string> = {
      PUBLIC: 'bg-blue-100 text-blue-700 border-blue-200',
      PRIVE_LAIC: 'bg-purple-100 text-purple-700 border-purple-200',
      PRIVE_CONFESSIONNEL: 'bg-orange-100 text-orange-700 border-orange-200',
      PRIVE_COMMUNAUTAIRE: 'bg-teal-100 text-teal-700 border-teal-200',
    }
    return (
      <span
        className={`rounded-full border px-2 py-1 text-xs font-semibold ${styles[type] || 'border-gray-200 bg-gray-100 text-gray-700'}`}
      >
        {getTypeSecteurLabel(type)}
      </span>
    )
  }

  const getTypeEtablissementLabel = (type?: string) => {
    const labels: Record<string, string> = {
      MATERNELLE: 'Maternelle',
      PRIMAIRE: 'Primaire',
      SECONDAIRE_GENERAL: 'Sec. général',
      SECONDAIRE_TECHNIQUE: 'Sec. technique',
      BILINGUE: 'Bilingue',
      COMPLEXE_SCOLAIRE: 'Complexe scolaire',
    }
    return labels[type || ''] || '-'
  }

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      EN_ATTENTE: 'En attente',
      VALIDEE: 'Validée',
      REJETEE: 'Rejetée',
      SUSPENDUE: 'Suspendue',
    }
    return labels[status] || status
  }

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      EN_ATTENTE: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      VALIDEE: 'bg-green-100 text-green-700 border-green-200',
      REJETEE: 'bg-red-100 text-red-700 border-red-200',
      SUSPENDUE: 'bg-gray-100 text-gray-700 border-gray-200',
    }
    return (
      <span
        className={`rounded-full border px-2 py-1 text-xs font-semibold ${styles[status] || 'border-gray-200 bg-gray-100 text-gray-700'}`}
      >
        {getStatusLabel(status)}
      </span>
    )
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('fr-FR')
    } catch {
      return dateString
    }
  }

  const formatDateTime = (dateString?: string) => {
    if (!dateString) return '-'
    try {
      return new Date(dateString).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    } catch {
      return dateString
    }
  }

  // Config des stats
  const statsCards: {
    label: string
    value: number | undefined
    color: string
    filterValue: string
    icon: React.ReactNode
    bgActive: string
  }[] = [
    {
      label: 'Total écoles',
      value: stats?.total ?? schools.length,
      color: 'text-gray-900',
      filterValue: 'all',
      icon: <School className="h-5 w-5 text-primary" />,
      bgActive: 'border-primary bg-primary/5 ring-1 ring-primary',
    },
    {
      label: 'Validées',
      value: stats?.validees ?? 0,
      color: 'text-green-600',
      filterValue: 'VALIDEE',
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      bgActive: 'border-green-500 bg-green-50 ring-1 ring-green-500',
    },
    {
      label: 'En attente',
      value: stats?.enAttente ?? 0,
      color: 'text-yellow-600',
      filterValue: 'EN_ATTENTE',
      icon: <Clock className="h-5 w-5 text-yellow-500" />,
      bgActive: 'border-yellow-500 bg-yellow-50 ring-1 ring-yellow-500',
    },
    {
      label: 'Rejetées',
      value: stats?.rejetees ?? 0,
      color: 'text-red-600',
      filterValue: 'REJETEE',
      icon: <XCircle className="h-5 w-5 text-red-500" />,
      bgActive: 'border-red-500 bg-red-50 ring-1 ring-red-500',
    },
    {
      label: 'Suspendues',
      value: stats?.suspendues ?? 0,
      color: 'text-gray-600',
      filterValue: 'SUSPENDUE',
      icon: <AlertTriangle className="h-5 w-5 text-gray-400" />,
      bgActive: 'border-gray-500 bg-gray-50 ring-1 ring-gray-500',
    },
  ]

  // Icône de tri pour les en-têtes
  function SortIcon({ field }: { field: SortField }) {
    if (sortField !== field) return <ArrowUpDown className="ml-1 inline h-3 w-3 opacity-40" />
    return sortDir === 'asc' ? (
      <ArrowUp className="ml-1 inline h-3 w-3 text-primary" />
    ) : (
      <ArrowDown className="ml-1 inline h-3 w-3 text-primary" />
    )
  }

  // === RENDER ===

  // État de chargement initial avec skeleton
  if (loading) {
    return (
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-8 w-64 animate-pulse rounded-lg bg-gray-200" />
            <div className="mt-2 h-4 w-40 animate-pulse rounded bg-gray-200" />
          </div>
          <div className="h-10 w-28 animate-pulse rounded-xl bg-gray-200" />
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="rounded-xl border border-gray-100 bg-white p-4">
              <div className="mb-2 h-4 w-20 animate-pulse rounded bg-gray-200" />
              <div className="h-8 w-12 animate-pulse rounded bg-gray-200" />
            </div>
          ))}
        </div>
        <div className="h-12 animate-pulse rounded-xl bg-gray-200" />
        <div className="rounded-xl border border-gray-100 bg-white">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 border-b border-gray-100 px-6 py-4">
              <div className="h-10 w-10 animate-pulse rounded-lg bg-gray-200" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-48 animate-pulse rounded bg-gray-200" />
                <div className="h-3 w-32 animate-pulse rounded bg-gray-200" />
              </div>
              <div className="h-6 w-16 animate-pulse rounded-full bg-gray-200" />
              <div className="h-6 w-20 animate-pulse rounded-full bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  // État d'erreur
  if (error && schools.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-16 text-center">
        <div className="mb-4 rounded-full bg-red-100 p-4">
          <AlertTriangle className="h-8 w-8 text-red-500" />
        </div>
        <h2 className="mb-2 text-xl font-semibold text-gray-900">
          Impossible de charger les écoles
        </h2>
        <p className="mb-6 max-w-md text-gray-500">
          Vérifiez votre connexion Internet et que le serveur backend est accessible.
        </p>
        <Button onClick={fetchSchools} className="gap-2 bg-primary hover:bg-primary-dark">
          <RefreshCw className="h-4 w-4" />
          Réessayer
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      {/* En-tête */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Écoles</h1>
          <p className="mt-1 text-gray-600">
            {filteredAndSortedSchools.length} école
            {filteredAndSortedSchools.length !== 1 ? 's' : ''}
            {regionFilter !== 'all' ? ` • ${regionFilter}` : ` • ${regions.length} régions`}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Actualisation...' : 'Actualiser'}
          </Button>
          <Button variant="outline" size="sm" className="gap-2" onClick={handleExportCSV}>
            <Download className="h-4 w-4" />
            Exporter ({filteredAndSortedSchools.length})
          </Button>
        </div>
      </div>

      {/* Stats cliquables */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        {statsCards.map((card) => {
          const isActive = statusFilter === card.filterValue
          return (
            <button
              key={card.filterValue}
              type="button"
              onClick={() =>
                setStatusFilter(isActive && card.filterValue !== 'all' ? 'all' : card.filterValue)
              }
              className={`group relative rounded-xl border p-4 text-left transition-all duration-200 ${
                isActive
                  ? card.bgActive
                  : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm'
              }`}
            >
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-medium text-gray-500">{card.label}</p>
                {card.icon}
              </div>
              {statsLoading ? (
                <div className="h-8 w-14 animate-pulse rounded bg-gray-200" />
              ) : (
                <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
              )}
            </button>
          )
        })}
      </div>

      {/* Filtres */}
      <div className="rounded-xl border border-gray-100 bg-white p-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Rechercher par nom, code, email, directeur, ville, tél..."
              className="pl-10 pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <Select value={regionFilter} onValueChange={setRegionFilter}>
            <SelectTrigger className="w-full md:w-[200px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Région" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les régions</SelectItem>
              {regions.map((region) => (
                <SelectItem key={region} value={region}>
                  {region}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="EN_ATTENTE">En attente</SelectItem>
              <SelectItem value="VALIDEE">Validée</SelectItem>
              <SelectItem value="REJETEE">Rejetée</SelectItem>
              <SelectItem value="SUSPENDUE">Suspendue</SelectItem>
            </SelectContent>
          </Select>
          <Select value={secteurFilter} onValueChange={setSecteurFilter}>
            <SelectTrigger className="w-full md:w-[200px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Secteur" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les secteurs</SelectItem>
              <SelectItem value="PUBLIC">Public</SelectItem>
              <SelectItem value="PRIVE_LAIC">Privé laïque</SelectItem>
              <SelectItem value="PRIVE_CONFESSIONNEL">Privé confessionnel</SelectItem>
              <SelectItem value="PRIVE_COMMUNAUTAIRE">Communautaire</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Filtres actifs */}
        {activeFiltersCount > 0 && (
          <div className="mt-3 flex items-center gap-2 border-t border-gray-100 pt-3">
            <span className="text-xs text-gray-500">
              {activeFiltersCount} filtre{activeFiltersCount > 1 ? 's' : ''} actif
              {activeFiltersCount > 1 ? 's' : ''}
            </span>
            <button
              type="button"
              onClick={resetFilters}
              className="flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-200"
            >
              <X className="h-3 w-3" />
              Réinitialiser
            </button>
          </div>
        )}
      </div>

      {/* Tableau des écoles */}
      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th
                  className="cursor-pointer px-6 py-4 text-left text-xs font-semibold uppercase text-gray-600 hover:text-gray-900"
                  onClick={() => toggleSort('nom')}
                >
                  École <SortIcon field="nom" />
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-600">
                  Secteur
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-600">
                  Type
                </th>
                <th
                  className="cursor-pointer px-6 py-4 text-left text-xs font-semibold uppercase text-gray-600 hover:text-gray-900"
                  onClick={() => toggleSort('regionNom')}
                >
                  Localisation <SortIcon field="regionNom" />
                </th>
                <th
                  className="cursor-pointer px-6 py-4 text-left text-xs font-semibold uppercase text-gray-600 hover:text-gray-900"
                  onClick={() => toggleSort('nombreEleves')}
                >
                  Élèves <SortIcon field="nombreEleves" />
                </th>
                <th
                  className="cursor-pointer px-6 py-4 text-left text-xs font-semibold uppercase text-gray-600 hover:text-gray-900"
                  onClick={() => toggleSort('statutEcole')}
                >
                  Statut <SortIcon field="statutEcole" />
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-600">
                  Directeur
                </th>
                <th
                  className="cursor-pointer px-6 py-4 text-left text-xs font-semibold uppercase text-gray-600 hover:text-gray-900"
                  onClick={() => toggleSort('createdAt')}
                >
                  Inscription <SortIcon field="createdAt" />
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedSchools.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-6 py-16 text-center">
                    <Building2 className="mx-auto mb-3 h-10 w-10 text-gray-300" />
                    <p className="font-medium text-gray-500">Aucune école trouvée</p>
                    <p className="mt-1 text-sm text-gray-400">
                      {activeFiltersCount > 0
                        ? 'Essayez de modifier vos critères de recherche ou de réinitialiser les filtres.'
                        : 'Aucune école enregistrée pour le moment.'}
                    </p>
                    {activeFiltersCount > 0 && (
                      <Button variant="outline" size="sm" className="mt-4" onClick={resetFilters}>
                        Réinitialiser les filtres
                      </Button>
                    )}
                  </td>
                </tr>
              ) : (
                paginatedSchools.map((school) => {
                  const isActionLoading = actionLoadingId === school.id
                  return (
                    <tr
                      key={school.id}
                      className="cursor-pointer transition-colors hover:bg-gray-50/80"
                      onClick={() => openDetailDialog(school)}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary text-sm font-semibold text-white">
                            {school.nom.charAt(0)}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="truncate font-medium text-gray-900">{school.nom}</p>
                              {isNew(school.createdAt) && (
                                <span className="shrink-0 rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-bold leading-tight text-white">
                                  Nouveau
                                </span>
                              )}
                            </div>
                            <p className="truncate text-sm text-gray-500">{school.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">{getTypeSecteurBadge(school.typeSecteur)}</td>
                      <td className="px-6 py-4">
                        <div>
                          <span className="text-sm text-gray-900">
                            {getTypeEtablissementLabel(school.typeEtablissement)}
                          </span>
                          {getSousSystemeLabel(school.sousSysteme) && (
                            <p className="text-xs text-gray-500">
                              {getSousSystemeLabel(school.sousSysteme)}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-start gap-2">
                          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
                          <div>
                            <span className="text-sm text-gray-900">{school.regionNom || '-'}</span>
                            {school.villeNom && (
                              <p className="text-xs text-gray-500">{school.villeNom}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-semibold text-gray-900">
                          {school.nombreEleves != null
                            ? school.nombreEleves.toLocaleString('fr-FR')
                            : '-'}
                        </span>
                      </td>
                      <td className="px-6 py-4">{getStatusBadge(school.statutEcole)}</td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {school.directeurNom || '-'}
                          </p>
                          <p className="text-xs text-gray-500">{school.directeurEmail || ''}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">
                          {formatDate(school.createdAt)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div
                          className="flex items-center justify-end gap-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {school.statutEcole !== 'VALIDEE' && (
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 gap-1 px-2 text-green-600 hover:bg-green-50 hover:text-green-700"
                              onClick={() => requestValidation(school)}
                              disabled={isActionLoading}
                            >
                              {isActionLoading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <CheckCircle className="h-4 w-4" />
                              )}
                              Valider
                            </Button>
                          )}
                          {school.statutEcole !== 'REJETEE' && (
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 gap-1 px-2 text-red-600 hover:bg-red-50 hover:text-red-700"
                              onClick={() => openRejectDialog(school)}
                              disabled={isActionLoading}
                            >
                              <XCircle className="h-4 w-4" />
                              Rejeter
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 text-gray-500 hover:text-primary"
                            onClick={() => openDetailDialog(school)}
                            title="Voir les détails"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Résumé + Pagination */}
        {filteredAndSortedSchools.length > 0 && (
          <div className="border-t border-gray-100">
            <div className="flex items-center justify-between px-6 py-2 text-xs text-gray-500">
              <span>
                Affichage de {startIndex + 1} à{' '}
                {Math.min(startIndex + itemsPerPage, filteredAndSortedSchools.length)} sur{' '}
                {filteredAndSortedSchools.length} école
                {filteredAndSortedSchools.length !== 1 ? 's' : ''}
              </span>
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              itemsPerPage={itemsPerPage}
              totalItems={filteredAndSortedSchools.length}
            />
          </div>
        )}
      </div>

      {/* Dialog de détail */}
      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              {detailSchool && (
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary font-semibold text-white">
                  {detailSchool.nom.charAt(0)}
                </div>
              )}
              <div className="min-w-0">
                <span className="block truncate">{detailSchool?.nom || 'Chargement...'}</span>
                {detailSchool && (
                  <p className="text-sm font-normal text-gray-500">{detailSchool.codeEcole}</p>
                )}
              </div>
              {detailSchool && (
                <div className="ml-auto shrink-0">{getStatusBadge(detailSchool.statutEcole)}</div>
              )}
            </DialogTitle>
            <DialogDescription>
              {detailSchool ? `Fiche complète de l'école` : 'Chargement des informations...'}
            </DialogDescription>
          </DialogHeader>

          {detailLoading ? (
            <div className="space-y-4 py-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-10 animate-pulse rounded bg-gray-100" />
                    <div className="h-10 animate-pulse rounded bg-gray-100" />
                  </div>
                </div>
              ))}
            </div>
          ) : detailSchool ? (
            <div className="space-y-5 py-2">
              {/* Informations générales */}
              <DetailSection icon={<Shield className="h-4 w-4" />} title="Informations générales">
                <DetailField label="Nom" value={detailSchool.nom} />
                <DetailField label="Code école" value={detailSchool.codeEcole} mono />
                <DetailField label="Slug" value={detailSchool.slug} mono />
                <DetailBadge label="Type Secteur">
                  {getTypeSecteurBadge(detailSchool.typeSecteur)}
                </DetailBadge>
                <DetailField
                  label="Type Établissement"
                  value={getTypeEtablissementLabel(detailSchool.typeEtablissement)}
                />
                <DetailField
                  label="Sous-système"
                  value={getSousSystemeLabel(detailSchool.sousSysteme) || '-'}
                />
                <DetailField
                  label="Année de fondation"
                  value={
                    detailSchool.anneeFondation != null ? String(detailSchool.anneeFondation) : '-'
                  }
                />
                <DetailField
                  label="N° autorisation"
                  value={detailSchool.numeroAutorisation || '-'}
                />
                <DetailField label="Devise / Slogan" value={detailSchool.devise || '-'} span2 />
                <DetailField
                  label="Nombre d'élèves"
                  value={
                    detailSchool.nombreEleves != null
                      ? detailSchool.nombreEleves.toLocaleString('fr-FR')
                      : '-'
                  }
                />
                <DetailField
                  label="Nombre de classes"
                  value={
                    detailSchool.nombreClasses != null ? String(detailSchool.nombreClasses) : '-'
                  }
                />
              </DetailSection>

              {/* Localisation */}
              <DetailSection icon={<MapPin className="h-4 w-4" />} title="Localisation">
                <DetailField label="Région" value={detailSchool.regionNom || '-'} />
                <DetailField label="Département" value={detailSchool.departementNom || '-'} />
                <DetailField label="Ville" value={detailSchool.villeNom || '-'} />
                <DetailField label="Quartier" value={detailSchool.quartierNom || '-'} />
                <DetailField label="Adresse" value={detailSchool.adresse || '-'} span2 />
                <DetailField label="Boîte postale" value={detailSchool.boitePostale || '-'} />
              </DetailSection>

              {/* Contact */}
              <DetailSection icon={<Phone className="h-4 w-4" />} title="Contact">
                <DetailLink
                  label="Téléphone"
                  value={detailSchool.telephone}
                  href={detailSchool.telephone ? `tel:${detailSchool.telephone}` : undefined}
                  icon={<Phone className="h-3 w-3" />}
                />
                <DetailLink
                  label="Email"
                  value={detailSchool.email}
                  href={detailSchool.email ? `mailto:${detailSchool.email}` : undefined}
                  icon={<Mail className="h-3 w-3" />}
                />
                <DetailLink
                  label="Site web"
                  value={detailSchool.siteWeb}
                  href={
                    detailSchool.siteWeb
                      ? detailSchool.siteWeb.startsWith('http')
                        ? detailSchool.siteWeb
                        : `https://${detailSchool.siteWeb}`
                      : undefined
                  }
                  icon={<Globe className="h-3 w-3" />}
                  external
                />
              </DetailSection>

              {/* Directeur */}
              <DetailSection icon={<Users className="h-4 w-4" />} title="Directeur">
                <DetailField label="Nom complet" value={detailSchool.directeurNom || '-'} />
                <DetailLink
                  label="Email"
                  value={detailSchool.directeurEmail}
                  href={
                    detailSchool.directeurEmail
                      ? `mailto:${detailSchool.directeurEmail}`
                      : undefined
                  }
                  icon={<Mail className="h-3 w-3" />}
                />
              </DetailSection>

              {/* Statut & dates */}
              <DetailSection icon={<Calendar className="h-4 w-4" />} title="Statut & dates">
                <DetailBadge label="Statut">{getStatusBadge(detailSchool.statutEcole)}</DetailBadge>
                <DetailField
                  label="Date d'inscription"
                  value={formatDateTime(detailSchool.createdAt)}
                />
                {detailSchool.statutEcole === 'VALIDEE' && detailSchool.dateValidation && (
                  <DetailField
                    label="Date de validation"
                    value={formatDateTime(detailSchool.dateValidation)}
                  />
                )}
                {detailSchool.statutEcole === 'REJETEE' && detailSchool.motifRejet && (
                  <div className="col-span-2">
                    <p className="text-xs font-medium text-gray-500">Motif de rejet</p>
                    <p className="mt-1 rounded-lg bg-red-50 p-3 text-sm leading-relaxed text-red-700">
                      {detailSchool.motifRejet}
                    </p>
                  </div>
                )}
              </DetailSection>

              {/* Branding */}
              {(detailSchool.logoUrl ||
                detailSchool.couleurPrimaire ||
                detailSchool.couleurSecondaire) && (
                <DetailSection icon={<Palette className="h-4 w-4" />} title="Branding">
                  {detailSchool.logoUrl && (
                    <div className="col-span-2">
                      <p className="text-xs font-medium text-gray-500">Logo</p>
                      <div className="mt-1 flex items-center gap-3">
                        <img
                          src={detailSchool.logoUrl}
                          alt="Logo"
                          className="h-14 w-14 rounded-lg border bg-white object-contain p-1"
                          onError={(e) => {
                            ;(e.target as HTMLImageElement).style.display = 'none'
                          }}
                        />
                        <span className="truncate text-xs text-gray-400">
                          {detailSchool.logoUrl}
                        </span>
                      </div>
                    </div>
                  )}
                  {detailSchool.couleurPrimaire && (
                    <div>
                      <p className="text-xs font-medium text-gray-500">Couleur primaire</p>
                      <div className="mt-1 flex items-center gap-2">
                        <div
                          className="h-7 w-7 rounded-lg border shadow-sm"
                          style={{ backgroundColor: detailSchool.couleurPrimaire }}
                        />
                        <span className="font-mono text-sm text-gray-700">
                          {detailSchool.couleurPrimaire}
                        </span>
                      </div>
                    </div>
                  )}
                  {detailSchool.couleurSecondaire && (
                    <div>
                      <p className="text-xs font-medium text-gray-500">Couleur secondaire</p>
                      <div className="mt-1 flex items-center gap-2">
                        <div
                          className="h-7 w-7 rounded-lg border shadow-sm"
                          style={{ backgroundColor: detailSchool.couleurSecondaire }}
                        />
                        <span className="font-mono text-sm text-gray-700">
                          {detailSchool.couleurSecondaire}
                        </span>
                      </div>
                    </div>
                  )}
                </DetailSection>
              )}
            </div>
          ) : null}

          <DialogFooter className="gap-2 sm:gap-0">
            {detailSchool && detailSchool.statutEcole !== 'VALIDEE' && (
              <Button
                variant="ghost"
                className="gap-1 text-green-600 hover:bg-green-50 hover:text-green-700"
                onClick={() => requestValidation(detailSchool)}
                disabled={actionLoadingId === detailSchool.id}
              >
                {actionLoadingId === detailSchool.id ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <CheckCircle className="h-4 w-4" />
                )}
                Valider
              </Button>
            )}
            {detailSchool && detailSchool.statutEcole !== 'REJETEE' && (
              <Button
                variant="ghost"
                className="gap-1 text-red-600 hover:bg-red-50 hover:text-red-700"
                onClick={() => openRejectDialog(detailSchool)}
                disabled={actionLoadingId === detailSchool.id}
              >
                <XCircle className="h-4 w-4" />
                Rejeter
              </Button>
            )}
            <Button variant="outline" onClick={() => setDetailDialogOpen(false)}>
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de confirmation de validation */}
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmer la validation</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir valider l&apos;école{' '}
              {schoolToValidate ? `"${schoolToValidate.nom}"` : ''} ? Cette action autorisera
              l&apos;école à utiliser la plateforme.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => {
                setConfirmDialogOpen(false)
                setSchoolToValidate(null)
              }}
              disabled={actionLoadingId !== null}
            >
              Annuler
            </Button>
            <Button
              className="gap-1 bg-green-600 hover:bg-green-700"
              onClick={handleValidate}
              disabled={actionLoadingId !== null}
            >
              {actionLoadingId ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Validation...
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4" />
                  Confirmer la validation
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de rejet */}
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rejeter l&apos;école</DialogTitle>
            <DialogDescription>
              Vous êtes sur le point de rejeter l&apos;inscription de l&apos;école
              {schoolToReject ? ` "${schoolToReject.nom}"` : ''}. Veuillez indiquer le motif du
              rejet.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="motifRejet">Motif du rejet *</Label>
              <Textarea
                id="motifRejet"
                placeholder="Décrivez la raison du rejet de cette école..."
                value={motifRejet}
                onChange={(e) => setMotifRejet(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setRejectDialogOpen(false)}
              disabled={actionLoadingId !== null}
            >
              Annuler
            </Button>
            <Button
              variant="destructive"
              onClick={handleReject}
              disabled={actionLoadingId !== null || !motifRejet.trim()}
            >
              {actionLoadingId ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Rejet en cours...
                </>
              ) : (
                'Confirmer le rejet'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// === Composants réutilisables pour le dialog de détail ===

function DetailSection({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-lg border border-gray-100 bg-gray-50/50 p-4">
      <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
        {icon}
        {title}
      </h3>
      <div className="grid grid-cols-2 gap-x-6 gap-y-3">{children}</div>
    </section>
  )
}

function DetailField({
  label,
  value,
  span2,
  mono,
}: {
  label: string
  value: string
  span2?: boolean
  mono?: boolean
}) {
  return (
    <div className={span2 ? 'col-span-2' : ''}>
      <p className="text-xs font-medium text-gray-500">{label}</p>
      <p className={`mt-0.5 text-sm text-gray-900 ${mono ? 'font-mono' : ''}`}>{value}</p>
    </div>
  )
}

function DetailBadge({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-medium text-gray-500">{label}</p>
      <div className="mt-1">{children}</div>
    </div>
  )
}

function DetailLink({
  label,
  value,
  href,
  icon,
  external,
}: {
  label: string
  value?: string
  href?: string
  icon: React.ReactNode
  external?: boolean
}) {
  if (!value) {
    return (
      <div>
        <p className="text-xs font-medium text-gray-500">{label}</p>
        <p className="mt-0.5 text-sm text-gray-400">-</p>
      </div>
    )
  }
  return (
    <div>
      <p className="text-xs font-medium text-gray-500">{label}</p>
      {href ? (
        <a
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          className="mt-0.5 inline-flex items-center gap-1 text-sm text-primary underline-offset-2 hover:underline"
        >
          {icon}
          {value}
          {external && <ExternalLink className="h-3 w-3" />}
        </a>
      ) : (
        <p className="mt-0.5 text-sm text-gray-900">{value}</p>
      )}
    </div>
  )
}
