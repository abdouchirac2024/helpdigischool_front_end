'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import {
  Search,
  Download,
  Eye,
  Plus,
  Loader2,
  RefreshCw,
  Users,
  UserCheck,
  UserX,
  Lock,
  Clock,
  Wifi,
  X,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  AlertTriangle,
  Trash2,
  Shield,
  Building2,
  Calendar,
  Filter,
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
import { Label } from '@/components/ui/label'
import { apiClient } from '@/lib/api/client'
import { API_ENDPOINTS } from '@/lib/api/config'
import { usePresence } from '@/lib/presence/presence-context'
import type { BackendUserInfo, UserStats } from '@/types/models/user'

type SortField = 'nom' | 'role' | 'ecoleNom' | 'status' | 'lastLogin' | 'createdAt'
type SortDir = 'asc' | 'desc'

const ROLE_LABELS: Record<string, string> = {
  SUPER_ADMIN: 'Super Admin',
  ADMIN_ECOLE: 'Admin Ecole',
  ENSEIGNANT: 'Enseignant',
  PARENT: 'Parent',
  SECRETAIRE: 'Secretaire',
  COMPTABLE: 'Comptable',
}

const STATUS_LABELS: Record<string, string> = {
  ACTIVE: 'Actif',
  INACTIVE: 'Inactif',
  LOCKED: 'Verrouille',
  PENDING: 'En attente',
}

// Helper pour afficher le temps relatif (il y a X minutes, etc.)
function formatRelativeTime(dateString: string | null | undefined): string {
  if (!dateString) return '-'
  try {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMinutes = Math.floor(diffMs / 60_000)
    const diffHours = Math.floor(diffMs / 3_600_000)
    const diffDays = Math.floor(diffMs / 86_400_000)

    if (diffMinutes < 1) return "A l'instant"
    if (diffMinutes < 60) return `Il y a ${diffMinutes} min`
    if (diffHours < 24)
      return `Il y a ${diffHours}h${diffMinutes % 60 > 0 ? String(diffMinutes % 60).padStart(2, '0') : ''}`
    if (diffDays === 1) return 'Hier'
    if (diffDays < 7) return `Il y a ${diffDays} jours`
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return dateString
  }
}

export function AdminUsersPage() {
  const {
    onlineUsers,
    offlineUsers,
    onlineCount,
    isUserOnline,
    getUserPresence,
    isConnected: wsConnected,
  } = usePresence()

  // Derive a Set of connected user IDs for quick lookup
  const connectedUserIds = useMemo(() => {
    const ids = new Set<number>()
    onlineUsers.forEach((_, userId) => ids.add(userId))
    return ids
  }, [onlineUsers])

  const [users, setUsers] = useState<BackendUserInfo[]>([])
  const [stats, setStats] = useState<UserStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [statsLoading, setStatsLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  // Filters
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [schoolFilter, setSchoolFilter] = useState('all')
  const [connectedOnly, setConnectedOnly] = useState(false)

  // Sorting & pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [sortField, setSortField] = useState<SortField>('createdAt')
  const [sortDir, setSortDir] = useState<SortDir>('desc')
  const itemsPerPage = 15

  // Dialogs
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)
  const [detailUser, setDetailUser] = useState<BackendUserInfo | null>(null)
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [statusDialogOpen, setStatusDialogOpen] = useState(false)
  const [statusUser, setStatusUser] = useState<BackendUserInfo | null>(null)
  const [newStatus, setNewStatus] = useState('')
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deleteUser, setDeleteUser] = useState<BackendUserInfo | null>(null)
  const [actionLoading, setActionLoading] = useState(false)

  // Add form
  const [addForm, setAddForm] = useState({
    email: '',
    password: '',
    nom: '',
    prenom: '',
    role: '',
    tenantId: '',
  })

  // Debounce search
  const debounceRef = useRef<ReturnType<typeof setTimeout>>()
  useEffect(() => {
    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(searchQuery)
    }, 300)
    return () => clearTimeout(debounceRef.current)
  }, [searchQuery])

  useEffect(() => {
    fetchUsers()
    fetchStats()
  }, [])

  async function fetchUsers() {
    setLoading(true)
    setError(false)
    try {
      const data = await apiClient.get<BackendUserInfo[]>(API_ENDPOINTS.users.base)
      setUsers(data)
    } catch {
      setError(true)
      toast.error('Impossible de charger la liste des utilisateurs.')
    } finally {
      setLoading(false)
    }
  }

  async function fetchStats() {
    setStatsLoading(true)
    try {
      const data = await apiClient.get<UserStats>(API_ENDPOINTS.users.stats)
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
      const [usersData, statsData] = await Promise.all([
        apiClient.get<BackendUserInfo[]>(API_ENDPOINTS.users.base),
        apiClient.get<UserStats>(API_ENDPOINTS.users.stats).catch(() => null),
      ])
      setUsers(usersData)
      if (statsData) setStats(statsData)
      setError(false)
      toast.success('Donnees actualisees.')
    } catch {
      toast.error('Erreur lors du rafraichissement.')
    } finally {
      setRefreshing(false)
    }
  }

  // === Add user ===
  async function handleAddUser() {
    if (
      !addForm.email ||
      !addForm.password ||
      !addForm.nom ||
      !addForm.prenom ||
      !addForm.role ||
      !addForm.tenantId
    ) {
      toast.error('Tous les champs sont obligatoires.')
      return
    }
    setActionLoading(true)
    try {
      await apiClient.post(API_ENDPOINTS.users.base, {
        email: addForm.email,
        password: addForm.password,
        nom: addForm.nom,
        prenom: addForm.prenom,
        role: addForm.role,
        tenantId: addForm.tenantId,
      })
      toast.success('Utilisateur cree avec succes.')
      setAddDialogOpen(false)
      setAddForm({ email: '', password: '', nom: '', prenom: '', role: '', tenantId: '' })
      await Promise.all([fetchUsers(), fetchStats()])
    } catch {
      toast.error("Erreur lors de la creation de l'utilisateur.")
    } finally {
      setActionLoading(false)
    }
  }

  // === Change status ===
  function openStatusDialog(user: BackendUserInfo) {
    setStatusUser(user)
    setNewStatus(user.status)
    setStatusDialogOpen(true)
  }

  async function handleChangeStatus() {
    if (!statusUser || !newStatus) return
    setActionLoading(true)
    try {
      await apiClient.put(
        `${API_ENDPOINTS.users.updateStatus(String(statusUser.id))}?status=${newStatus}`
      )
      toast.success(`Statut de ${statusUser.prenom} ${statusUser.nom} mis a jour.`)
      setStatusDialogOpen(false)
      setStatusUser(null)
      await Promise.all([fetchUsers(), fetchStats()])
    } catch (error: any) {
      console.error('Erreur changement statut:', error)
      const message =
        error?.response?.data?.message || error?.message || 'Erreur lors du changement de statut.'
      toast.error(message)
    } finally {
      setActionLoading(false)
    }
  }

  // === Delete user ===
  function openDeleteDialog(user: BackendUserInfo) {
    setDeleteUser(user)
    setDeleteDialogOpen(true)
  }

  async function handleDelete() {
    if (!deleteUser) return
    setActionLoading(true)
    try {
      await apiClient.delete(API_ENDPOINTS.users.byId(String(deleteUser.id)))
      toast.success(`Utilisateur ${deleteUser.prenom} ${deleteUser.nom} supprime.`)
      setDeleteDialogOpen(false)
      setDeleteUser(null)
      await Promise.all([fetchUsers(), fetchStats()])
    } catch {
      toast.error("Erreur lors de la suppression de l'utilisateur.")
    } finally {
      setActionLoading(false)
    }
  }

  // === CSV Export ===
  function handleExportCSV() {
    if (filteredAndSortedUsers.length === 0) {
      toast.error('Aucun utilisateur a exporter.')
      return
    }

    const headers = [
      'ID',
      'Nom',
      'Prenom',
      'Email',
      'Telephone',
      'Role',
      'Ecole',
      'Statut',
      'Derniere connexion',
      'Cree le',
      'Connecte',
    ]
    const rows = filteredAndSortedUsers.map((u) => [
      String(u.id),
      u.nom || '',
      u.prenom || '',
      u.email || '',
      u.telephone || '',
      ROLE_LABELS[u.role] || u.role,
      u.ecoleNom || '-',
      STATUS_LABELS[u.status] || u.status,
      formatDateTime(u.lastLogin),
      formatDate(u.createdAt),
      isUserOnline(u.id) ? 'Oui' : 'Non',
    ])

    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(','))
      .join('\n')

    const BOM = '\uFEFF'
    const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `utilisateurs_export_${new Date().toISOString().slice(0, 10)}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    toast.success(`${filteredAndSortedUsers.length} utilisateur(s) exporte(s).`)
  }

  // === Filtering ===
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const query = debouncedSearch.toLowerCase()
      const matchesSearch =
        !query ||
        [user.nom, user.prenom, user.email]
          .filter(Boolean)
          .some((field) => field!.toLowerCase().includes(query))
      const matchesRole = roleFilter === 'all' || user.role === roleFilter
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter
      const matchesSchool = schoolFilter === 'all' || (user.ecoleNom || '-') === schoolFilter
      const matchesConnected = !connectedOnly || isUserOnline(user.id)
      return matchesSearch && matchesRole && matchesStatus && matchesSchool && matchesConnected
    })
  }, [users, debouncedSearch, roleFilter, statusFilter, schoolFilter, connectedOnly, isUserOnline])

  // === Sorting ===
  const filteredAndSortedUsers = useMemo(() => {
    const sorted = [...filteredUsers]
    sorted.sort((a, b) => {
      let cmp = 0
      switch (sortField) {
        case 'nom':
          cmp = `${a.nom} ${a.prenom}`.localeCompare(`${b.nom} ${b.prenom}`, 'fr')
          break
        case 'role':
          cmp = (ROLE_LABELS[a.role] || a.role).localeCompare(ROLE_LABELS[b.role] || b.role, 'fr')
          break
        case 'ecoleNom':
          cmp = (a.ecoleNom || '').localeCompare(b.ecoleNom || '', 'fr')
          break
        case 'status':
          cmp = a.status.localeCompare(b.status)
          break
        case 'lastLogin':
          cmp = new Date(a.lastLogin || 0).getTime() - new Date(b.lastLogin || 0).getTime()
          break
        case 'createdAt':
          cmp = new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime()
          break
      }
      return sortDir === 'asc' ? cmp : -cmp
    })
    return sorted
  }, [filteredUsers, sortField, sortDir])

  const totalPages = Math.ceil(filteredAndSortedUsers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedUsers = filteredAndSortedUsers.slice(startIndex, startIndex + itemsPerPage)

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearch, roleFilter, statusFilter, schoolFilter, connectedOnly, sortField, sortDir])

  // Unique schools
  const schools = useMemo(
    () => Array.from(new Set(users.map((u) => u.ecoleNom).filter(Boolean))).sort() as string[],
    [users]
  )

  // Active filters count
  const activeFiltersCount = [
    roleFilter !== 'all',
    statusFilter !== 'all',
    schoolFilter !== 'all',
    connectedOnly,
    debouncedSearch !== '',
  ].filter(Boolean).length

  function resetFilters() {
    setSearchQuery('')
    setRoleFilter('all')
    setStatusFilter('all')
    setSchoolFilter('all')
    setConnectedOnly(false)
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
  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      ACTIVE: 'bg-green-100 text-green-700 border-green-200',
      INACTIVE: 'bg-gray-100 text-gray-700 border-gray-200',
      LOCKED: 'bg-red-100 text-red-700 border-red-200',
      PENDING: 'bg-orange-100 text-orange-700 border-orange-200',
    }
    return (
      <span
        className={`rounded-full border px-2 py-1 text-xs font-semibold ${styles[status] || 'border-gray-200 bg-gray-100 text-gray-700'}`}
      >
        {STATUS_LABELS[status] || status}
      </span>
    )
  }

  const getRoleBadge = (role: string) => {
    const styles: Record<string, string> = {
      SUPER_ADMIN: 'bg-red-100 text-red-700 border-red-200',
      ADMIN_ECOLE: 'bg-purple-100 text-purple-700 border-purple-200',
      ENSEIGNANT: 'bg-blue-100 text-blue-700 border-blue-200',
      PARENT: 'bg-green-100 text-green-700 border-green-200',
      SECRETAIRE: 'bg-pink-100 text-pink-700 border-pink-200',
      COMPTABLE: 'bg-amber-100 text-amber-700 border-amber-200',
    }
    return (
      <span
        className={`rounded-full border px-2 py-1 text-xs font-semibold ${styles[role] || 'border-gray-200 bg-gray-100 text-gray-700'}`}
      >
        {ROLE_LABELS[role] || role}
      </span>
    )
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-'
    try {
      return new Date(dateString).toLocaleDateString('fr-FR')
    } catch {
      return dateString
    }
  }

  const formatDateTime = (dateString: string | null) => {
    if (!dateString) return '-'
    try {
      return new Date(dateString).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    } catch {
      return dateString
    }
  }

  const getInitials = (user: BackendUserInfo) => {
    return `${(user.prenom || '')[0] || ''}${(user.nom || '')[0] || ''}`.toUpperCase()
  }

  // Stats cards config
  const statsCards: {
    label: string
    value: number | undefined
    color: string
    filterFn: () => void
    icon: React.ReactNode
    bgActive: string
    isActive: boolean
  }[] = [
    {
      label: 'Total',
      value: stats?.total ?? users.length,
      color: 'text-gray-900',
      filterFn: () => {
        setStatusFilter('all')
        setConnectedOnly(false)
      },
      icon: <Users className="h-5 w-5 text-primary" />,
      bgActive: 'border-primary bg-primary/5 ring-1 ring-primary',
      isActive: statusFilter === 'all' && !connectedOnly,
    },
    {
      label: 'Actifs',
      value: stats?.active ?? 0,
      color: 'text-green-600',
      filterFn: () => {
        setStatusFilter(statusFilter === 'ACTIVE' ? 'all' : 'ACTIVE')
        setConnectedOnly(false)
      },
      icon: <UserCheck className="h-5 w-5 text-green-500" />,
      bgActive: 'border-green-500 bg-green-50 ring-1 ring-green-500',
      isActive: statusFilter === 'ACTIVE',
    },
    {
      label: 'Inactifs',
      value: stats?.inactive ?? 0,
      color: 'text-gray-600',
      filterFn: () => {
        setStatusFilter(statusFilter === 'INACTIVE' ? 'all' : 'INACTIVE')
        setConnectedOnly(false)
      },
      icon: <UserX className="h-5 w-5 text-gray-400" />,
      bgActive: 'border-gray-500 bg-gray-50 ring-1 ring-gray-500',
      isActive: statusFilter === 'INACTIVE',
    },
    {
      label: 'Verrouilles',
      value: stats?.locked ?? 0,
      color: 'text-red-600',
      filterFn: () => {
        setStatusFilter(statusFilter === 'LOCKED' ? 'all' : 'LOCKED')
        setConnectedOnly(false)
      },
      icon: <Lock className="h-5 w-5 text-red-500" />,
      bgActive: 'border-red-500 bg-red-50 ring-1 ring-red-500',
      isActive: statusFilter === 'LOCKED',
    },
    {
      label: 'En attente',
      value: stats?.pending ?? 0,
      color: 'text-orange-600',
      filterFn: () => {
        setStatusFilter(statusFilter === 'PENDING' ? 'all' : 'PENDING')
        setConnectedOnly(false)
      },
      icon: <Clock className="h-5 w-5 text-orange-500" />,
      bgActive: 'border-orange-500 bg-orange-50 ring-1 ring-orange-500',
      isActive: statusFilter === 'PENDING',
    },
    {
      label: 'Connectes',
      value: onlineCount,
      color: 'text-teal-600',
      filterFn: () => {
        setConnectedOnly(!connectedOnly)
        setStatusFilter('all')
      },
      icon: <Wifi className={`h-5 w-5 ${wsConnected ? 'text-teal-500' : 'text-gray-400'}`} />,
      bgActive: 'border-teal-500 bg-teal-50 ring-1 ring-teal-500',
      isActive: connectedOnly,
    },
  ]

  function SortIcon({ field }: { field: SortField }) {
    if (sortField !== field) return <ArrowUpDown className="ml-1 inline h-3 w-3 opacity-40" />
    return sortDir === 'asc' ? (
      <ArrowUp className="ml-1 inline h-3 w-3 text-primary" />
    ) : (
      <ArrowDown className="ml-1 inline h-3 w-3 text-primary" />
    )
  }

  // === RENDER ===

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
        <div className="grid grid-cols-2 gap-3 md:grid-cols-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-xl border border-gray-100 bg-white p-4">
              <div className="mb-2 h-4 w-20 animate-pulse rounded bg-gray-200" />
              <div className="h-8 w-12 animate-pulse rounded bg-gray-200" />
            </div>
          ))}
        </div>
        <div className="h-12 animate-pulse rounded-xl bg-gray-200" />
        <div className="rounded-xl border border-gray-100 bg-white">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 border-b border-gray-100 px-6 py-4">
              <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-48 animate-pulse rounded bg-gray-200" />
                <div className="h-3 w-32 animate-pulse rounded bg-gray-200" />
              </div>
              <div className="h-6 w-16 animate-pulse rounded-full bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error && users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-16 text-center">
        <div className="mb-4 rounded-full bg-red-100 p-4">
          <AlertTriangle className="h-8 w-8 text-red-500" />
        </div>
        <h2 className="mb-2 text-xl font-semibold text-gray-900">
          Impossible de charger les utilisateurs
        </h2>
        <p className="mb-6 max-w-md text-gray-500">
          Verifiez votre connexion Internet et que le serveur backend est accessible.
        </p>
        <Button onClick={fetchUsers} className="gap-2 bg-primary hover:bg-primary-dark">
          <RefreshCw className="h-4 w-4" />
          Reessayer
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Utilisateurs</h1>
          <p className="mt-1 text-gray-600">
            {filteredAndSortedUsers.length} utilisateur
            {filteredAndSortedUsers.length !== 1 ? 's' : ''}
            {connectedOnly ? ' connecte(s)' : ''}
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
            Exporter ({filteredAndSortedUsers.length})
          </Button>
          <Button
            size="sm"
            className="gap-2 bg-primary hover:bg-primary-dark"
            onClick={() => setAddDialogOpen(true)}
          >
            <Plus className="h-4 w-4" />
            Nouvel utilisateur
          </Button>
        </div>
      </div>

      {/* Stats cliquables */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-6">
        {statsCards.map((card) => (
          <button
            key={card.label}
            type="button"
            onClick={card.filterFn}
            className={`group relative rounded-xl border p-4 text-left transition-all duration-200 ${
              card.isActive
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
        ))}
      </div>

      {/* Filtres */}
      <div className="rounded-xl border border-gray-100 bg-white p-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Rechercher par nom, prenom, email..."
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
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les roles</SelectItem>
              {Object.entries(ROLE_LABELS).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  {label}
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
              {Object.entries(STATUS_LABELS).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={schoolFilter} onValueChange={setSchoolFilter}>
            <SelectTrigger className="w-full md:w-[200px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Ecole" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les ecoles</SelectItem>
              {schools.map((school) => (
                <SelectItem key={school} value={school}>
                  {school}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

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
              Reinitialiser
            </button>
          </div>
        )}
      </div>

      {/* Tableau */}
      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th
                  className="cursor-pointer px-6 py-4 text-left text-xs font-semibold uppercase text-gray-600 hover:text-gray-900"
                  onClick={() => toggleSort('nom')}
                >
                  Utilisateur <SortIcon field="nom" />
                </th>
                <th
                  className="cursor-pointer px-6 py-4 text-left text-xs font-semibold uppercase text-gray-600 hover:text-gray-900"
                  onClick={() => toggleSort('role')}
                >
                  Role <SortIcon field="role" />
                </th>
                <th
                  className="cursor-pointer px-6 py-4 text-left text-xs font-semibold uppercase text-gray-600 hover:text-gray-900"
                  onClick={() => toggleSort('ecoleNom')}
                >
                  Ecole <SortIcon field="ecoleNom" />
                </th>
                <th
                  className="cursor-pointer px-6 py-4 text-left text-xs font-semibold uppercase text-gray-600 hover:text-gray-900"
                  onClick={() => toggleSort('status')}
                >
                  Statut <SortIcon field="status" />
                </th>
                <th
                  className="cursor-pointer px-6 py-4 text-left text-xs font-semibold uppercase text-gray-600 hover:text-gray-900"
                  onClick={() => toggleSort('lastLogin')}
                >
                  Derniere connexion <SortIcon field="lastLogin" />
                </th>
                <th
                  className="cursor-pointer px-6 py-4 text-left text-xs font-semibold uppercase text-gray-600 hover:text-gray-900"
                  onClick={() => toggleSort('createdAt')}
                >
                  Cree le <SortIcon field="createdAt" />
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center">
                    <Users className="mx-auto mb-3 h-10 w-10 text-gray-300" />
                    <p className="font-medium text-gray-500">Aucun utilisateur trouve</p>
                    <p className="mt-1 text-sm text-gray-400">
                      {activeFiltersCount > 0
                        ? 'Essayez de modifier vos criteres de recherche ou de reinitialiser les filtres.'
                        : 'Aucun utilisateur enregistre pour le moment.'}
                    </p>
                    {activeFiltersCount > 0 && (
                      <Button variant="outline" size="sm" className="mt-4" onClick={resetFilters}>
                        Reinitialiser les filtres
                      </Button>
                    )}
                  </td>
                </tr>
              ) : (
                paginatedUsers.map((user) => {
                  const isConnected = connectedUserIds.has(user.id)
                  return (
                    <tr key={user.id} className="transition-colors hover:bg-gray-50/80">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-sm font-semibold text-white">
                              {getInitials(user)}
                            </div>
                            {isConnected ? (
                              <span
                                className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500"
                                title={(() => {
                                  const p = getUserPresence(user.id)
                                  if (!p) return 'En ligne'
                                  const parts = ['En ligne']
                                  if (p.device) parts.push(p.device)
                                  if (p.sessionDuration) parts.push(`Duree: ${p.sessionDuration}`)
                                  return parts.join(' - ')
                                })()}
                              >
                                <span className="absolute inset-0 animate-ping rounded-full bg-green-400 opacity-75" />
                              </span>
                            ) : (
                              (() => {
                                const p = getUserPresence(user.id)
                                if (p && p.disconnectedAt) {
                                  return (
                                    <span
                                      className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-gray-400"
                                      title={`Hors ligne - ${formatRelativeTime(p.disconnectedAt)}${p.sessionDuration ? ` (session: ${p.sessionDuration})` : ''}`}
                                    />
                                  )
                                }
                                return null
                              })()
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="truncate font-medium text-gray-900">
                              {user.prenom} {user.nom}
                            </p>
                            <p className="truncate text-sm text-gray-500">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">{getRoleBadge(user.role)}</td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-700">{user.ecoleNom || '-'}</p>
                      </td>
                      <td className="px-6 py-4">{getStatusBadge(user.status)}</td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-500">{formatDateTime(user.lastLogin)}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-500">{formatDate(user.createdAt)}</p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 text-gray-500 hover:text-primary"
                            title="Voir les details"
                            onClick={() => {
                              setDetailUser(user)
                              setDetailDialogOpen(true)
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 text-gray-500 hover:text-orange-600"
                            title="Changer le statut"
                            onClick={() => openStatusDialog(user)}
                          >
                            <Shield className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 text-gray-500 hover:text-red-600"
                            title="Supprimer"
                            onClick={() => openDeleteDialog(user)}
                          >
                            <Trash2 className="h-4 w-4" />
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

        {filteredAndSortedUsers.length > 0 && (
          <div className="border-t border-gray-100">
            <div className="flex items-center justify-between px-6 py-2 text-xs text-gray-500">
              <span>
                Affichage de {startIndex + 1} a{' '}
                {Math.min(startIndex + itemsPerPage, filteredAndSortedUsers.length)} sur{' '}
                {filteredAndSortedUsers.length} utilisateur
                {filteredAndSortedUsers.length !== 1 ? 's' : ''}
              </span>
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              itemsPerPage={itemsPerPage}
              totalItems={filteredAndSortedUsers.length}
            />
          </div>
        )}
      </div>

      {/* Dialog Detail */}
      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              {detailUser && (
                <div className="relative">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary font-semibold text-white">
                    {getInitials(detailUser)}
                  </div>
                  {connectedUserIds.has(detailUser.id) && (
                    <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500" />
                  )}
                </div>
              )}
              <div className="min-w-0">
                <span className="block truncate">
                  {detailUser ? `${detailUser.prenom} ${detailUser.nom}` : 'Chargement...'}
                </span>
                {detailUser && (
                  <p className="text-sm font-normal text-gray-500">{detailUser.email}</p>
                )}
              </div>
              {detailUser && (
                <div className="ml-auto shrink-0">{getStatusBadge(detailUser.status)}</div>
              )}
            </DialogTitle>
            <DialogDescription>
              {detailUser ? "Informations completes de l'utilisateur" : 'Chargement...'}
            </DialogDescription>
          </DialogHeader>

          {detailUser && (
            <div className="space-y-5 py-2">
              <DetailSection icon={<Shield className="h-4 w-4" />} title="General">
                <DetailField label="ID" value={String(detailUser.id)} mono />
                <DetailField label="Email" value={detailUser.email} />
                <DetailField label="Nom" value={detailUser.nom} />
                <DetailField label="Prenom" value={detailUser.prenom} />
                <DetailField label="Telephone" value={detailUser.telephone || '-'} />
                <DetailField label="Role" value={ROLE_LABELS[detailUser.role] || detailUser.role} />
                <DetailField
                  label="Statut"
                  value={STATUS_LABELS[detailUser.status] || detailUser.status}
                />
                <DetailField
                  label="Connecte"
                  value={connectedUserIds.has(detailUser.id) ? 'Oui' : 'Non'}
                />
              </DetailSection>

              <DetailSection icon={<Building2 className="h-4 w-4" />} title="Ecole">
                <DetailField label="Tenant ID" value={detailUser.tenantId} mono />
                <DetailField label="Nom ecole" value={detailUser.ecoleNom || '-'} />
                <DetailField label="Code ecole" value={detailUser.codeEcole || '-'} mono />
                <DetailField label="Statut ecole" value={detailUser.statutEcole || '-'} />
              </DetailSection>

              <DetailSection icon={<Calendar className="h-4 w-4" />} title="Activite">
                <DetailField
                  label="Derniere connexion"
                  value={formatDateTime(detailUser.lastLogin)}
                />
                <DetailField label="Cree le" value={formatDateTime(detailUser.createdAt)} />
              </DetailSection>

              {/* Presence en temps reel */}
              {(() => {
                const presence = getUserPresence(detailUser.id)
                const isOnlineNow = connectedUserIds.has(detailUser.id)
                return (
                  <DetailSection icon={<Wifi className="h-4 w-4" />} title="Presence en ligne">
                    <DetailField
                      label="Statut actuel"
                      value={isOnlineNow ? 'En ligne' : presence ? 'Hors ligne' : 'Inconnu'}
                    />
                    {presence && (
                      <>
                        {presence.device && (
                          <DetailField label="Appareil" value={presence.device} />
                        )}
                        {presence.browser && (
                          <DetailField label="Navigateur" value={presence.browser} />
                        )}
                        {presence.os && <DetailField label="Systeme" value={presence.os} />}
                        {presence.ip && presence.ip !== 'unknown' && (
                          <DetailField label="Adresse IP" value={presence.ip} />
                        )}
                        {presence.connectedAt && (
                          <DetailField
                            label="Connecte depuis"
                            value={formatRelativeTime(presence.connectedAt)}
                          />
                        )}
                        {!isOnlineNow && presence.disconnectedAt && (
                          <DetailField
                            label="Deconnecte"
                            value={formatRelativeTime(presence.disconnectedAt)}
                          />
                        )}
                        {presence.sessionDuration && (
                          <DetailField
                            label={
                              isOnlineNow
                                ? 'Duree de session (en cours)'
                                : 'Derniere duree de session'
                            }
                            value={presence.sessionDuration}
                          />
                        )}
                        {presence.lastSeenAt && (
                          <DetailField
                            label="Derniere activite"
                            value={formatRelativeTime(presence.lastSeenAt)}
                          />
                        )}
                      </>
                    )}
                  </DetailSection>
                )
              })()}
            </div>
          )}

          <DialogFooter className="gap-2 sm:gap-0">
            {detailUser && (
              <Button
                variant="ghost"
                className="gap-1 text-orange-600 hover:bg-orange-50 hover:text-orange-700"
                onClick={() => {
                  setDetailDialogOpen(false)
                  openStatusDialog(detailUser)
                }}
              >
                <Shield className="h-4 w-4" />
                Changer statut
              </Button>
            )}
            <Button variant="outline" onClick={() => setDetailDialogOpen(false)}>
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog Ajouter */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Nouvel utilisateur</DialogTitle>
            <DialogDescription>
              Creer un nouveau compte utilisateur sur la plateforme.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="add-prenom">Prenom *</Label>
                <Input
                  id="add-prenom"
                  value={addForm.prenom}
                  onChange={(e) => setAddForm({ ...addForm, prenom: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-nom">Nom *</Label>
                <Input
                  id="add-nom"
                  value={addForm.nom}
                  onChange={(e) => setAddForm({ ...addForm, nom: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-email">Email *</Label>
              <Input
                id="add-email"
                type="email"
                value={addForm.email}
                onChange={(e) => setAddForm({ ...addForm, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-password">Mot de passe *</Label>
              <Input
                id="add-password"
                type="password"
                value={addForm.password}
                onChange={(e) => setAddForm({ ...addForm, password: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Role *</Label>
              <Select
                value={addForm.role}
                onValueChange={(v) => setAddForm({ ...addForm, role: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selectionner un role" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(ROLE_LABELS).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Ecole (Tenant ID) *</Label>
              <Select
                value={addForm.tenantId}
                onValueChange={(v) => setAddForm({ ...addForm, tenantId: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selectionner une ecole" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GLOBAL">GLOBAL (Super Admin)</SelectItem>
                  {Array.from(
                    new Set(users.map((u) => u.tenantId).filter((t) => t && t !== 'GLOBAL'))
                  )
                    .sort()
                    .map((tid) => {
                      const school = users.find((u) => u.tenantId === tid)
                      return (
                        <SelectItem key={tid} value={tid}>
                          {school?.ecoleNom ? `${school.ecoleNom} (${tid})` : tid}
                        </SelectItem>
                      )
                    })}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setAddDialogOpen(false)}
              disabled={actionLoading}
            >
              Annuler
            </Button>
            <Button
              className="gap-1 bg-primary hover:bg-primary-dark"
              onClick={handleAddUser}
              disabled={actionLoading}
            >
              {actionLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Creation...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" /> Creer
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog Changer Statut */}
      <Dialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Changer le statut</DialogTitle>
            <DialogDescription>
              Modifier le statut du compte de{' '}
              {statusUser ? `${statusUser.prenom} ${statusUser.nom}` : ''}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Nouveau statut</Label>
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Selectionner un statut" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(STATUS_LABELS).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setStatusDialogOpen(false)
                setStatusUser(null)
              }}
              disabled={actionLoading}
            >
              Annuler
            </Button>
            <Button
              className="gap-1 bg-primary hover:bg-primary-dark"
              onClick={handleChangeStatus}
              disabled={actionLoading || newStatus === statusUser?.status}
            >
              {actionLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Mise a jour...
                </>
              ) : (
                'Confirmer'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog Supprimer */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Supprimer l&apos;utilisateur</DialogTitle>
            <DialogDescription>
              Etes-vous sur de vouloir supprimer definitivement le compte de{' '}
              <strong>{deleteUser ? `${deleteUser.prenom} ${deleteUser.nom}` : ''}</strong> ? Cette
              action est irreversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => {
                setDeleteDialogOpen(false)
                setDeleteUser(null)
              }}
              disabled={actionLoading}
            >
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={actionLoading}>
              {actionLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Suppression...
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" /> Supprimer
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// === Composants reutilisables pour le dialog detail ===

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

function DetailField({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <p className="text-xs font-medium text-gray-500">{label}</p>
      <p className={`mt-0.5 text-sm text-gray-900 ${mono ? 'font-mono' : ''}`}>{value}</p>
    </div>
  )
}
