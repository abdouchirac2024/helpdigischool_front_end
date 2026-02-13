'use client'

import { useState, useEffect } from 'react'
import {
  Search,
  Users,
  Loader2,
  AlertCircle,
  Download,
  Phone,
  Eye,
  Edit,
  UserCheck,
  Mail,
  UserPlus,
  X,
  MapPin,
  Briefcase,
  Trash2,
  Calendar,
  FileText,
} from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { parentService } from '@/services/parent.service'
import { locationService } from '@/services/location.service'
import type { Parent, ParentFormData, Quartier, Ville, PieceIdentiteType } from '@/types'
import { PieceIdentiteTypeLabels } from '@/types/models/parent'

const initialFormData: ParentFormData = {
  nom: '',
  prenom: '',
  email: '',
  telephone: '',
  telephoneSecondaire: '',
  adresse: '',
  quartierId: 0,
  profession: '',
  employeur: '',
  pieceIdentiteType: undefined,
  pieceIdentiteNumero: '',
}

export function AdminParentsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [villeFilter, setVilleFilter] = useState('all')
  const [quartierFilter, setQuartierFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [quartiersForFilter, setQuartiersForFilter] = useState<Quartier[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [parents, setParents] = useState<Parent[]>([])
  const [quartiers, setQuartiers] = useState<Quartier[]>([])
  const [villes, setVilles] = useState<Ville[]>([])

  // Form specific state for ville/quartier cascade
  const [selectedVilleId, setSelectedVilleId] = useState<number | null>(null)
  const [filteredQuartiers, setFilteredQuartiers] = useState<Quartier[]>([])

  // Modal state
  const [showModal, setShowModal] = useState(false)
  const [editingParent, setEditingParent] = useState<Parent | null>(null)
  const [formData, setFormData] = useState<ParentFormData>(initialFormData)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState<'info' | 'contact' | 'identite'>('info')

  // View modal state
  const [viewingParent, setViewingParent] = useState<Parent | null>(null)

  useEffect(() => {
    loadParents()
    loadQuartiers()
    loadVilles()
  }, [])

  // Load quartiers when ville changes in form
  useEffect(() => {
    if (selectedVilleId) {
      loadQuartiersByVille(selectedVilleId)
    } else {
      setFilteredQuartiers([])
    }
  }, [selectedVilleId])

  // Filter quartiers for the table filter when villeFilter changes
  useEffect(() => {
    if (villeFilter === 'all') {
      setQuartiersForFilter(quartiers)
    } else {
      const filtered = quartiers.filter((q) => q.villeId.toString() === villeFilter)
      setQuartiersForFilter(filtered)
    }
    // Reset quartier filter when ville filter changes
    setQuartierFilter('all')
  }, [villeFilter, quartiers])

  async function loadParents() {
    setLoading(true)
    setError(null)
    try {
      const data = await parentService.getParents()
      setParents(data)
    } catch {
      setError('Impossible de charger les parents. Vérifiez que le backend est démarré.')
    } finally {
      setLoading(false)
    }
  }

  async function loadQuartiers() {
    try {
      const data = await locationService.getQuartiers()
      setQuartiers(data)
    } catch {
      console.error('Impossible de charger les quartiers')
    }
  }

  async function loadVilles() {
    try {
      const data = await locationService.getVilles()
      setVilles(data)
    } catch {
      console.error('Impossible de charger les villes')
    }
  }

  async function loadQuartiersByVille(villeId: number) {
    try {
      const data = await locationService.getQuartiersByVille(villeId)
      setFilteredQuartiers(data)
    } catch {
      console.error('Impossible de charger les quartiers de cette ville')
      setFilteredQuartiers([])
    }
  }

  function openCreateModal() {
    setEditingParent(null)
    setFormData(initialFormData)
    setSelectedVilleId(null)
    setFilteredQuartiers([])
    setActiveTab('info')
    setShowModal(true)
  }

  function openEditModal(parent: Parent) {
    setEditingParent(parent)
    setFormData({
      nom: parent.nom,
      prenom: parent.prenom,
      email: parent.email,
      telephone: parent.telephone,
      telephoneSecondaire: parent.telephoneSecondaire || '',
      adresse: parent.adresse,
      quartierId: parent.quartierId,
      profession: parent.profession || '',
      employeur: parent.employeur || '',
      pieceIdentiteType: parent.pieceIdentiteType,
      pieceIdentiteNumero: parent.pieceIdentiteNumero || '',
    })
    // Find ville from quartier to set up cascade
    const quartier = quartiers.find((q) => q.id === parent.quartierId)
    if (quartier) {
      setSelectedVilleId(quartier.villeId)
      loadQuartiersByVille(quartier.villeId)
    } else {
      setSelectedVilleId(null)
      setFilteredQuartiers([])
    }
    setActiveTab('info')
    setShowModal(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    // Validation des champs obligatoires
    if (
      !formData.nom ||
      !formData.prenom ||
      !formData.email ||
      !formData.telephone ||
      !formData.adresse ||
      !formData.quartierId
    ) {
      toast.error(
        'Veuillez remplir tous les champs obligatoires (Nom, Prénom, Email, Téléphone, Adresse, Quartier)'
      )
      return
    }

    setSaving(true)
    try {
      if (editingParent) {
        await parentService.updateParent(editingParent.idParent, formData)
        toast.success('Parent modifié avec succès')
      } else {
        await parentService.createParent(formData)
        toast.success('Parent créé avec succès')
      }
      setShowModal(false)
      loadParents()
    } catch (err: unknown) {
      console.error('Erreur lors de la sauvegarde:', err)
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la sauvegarde'
      toast.error(errorMessage)
    } finally {
      setSaving(false)
    }
  }

  const [deleting, setDeleting] = useState<number | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<Parent | null>(null)

  async function handleDelete(parent: Parent) {
    setShowDeleteConfirm(parent)
  }

  async function confirmDelete() {
    if (!showDeleteConfirm) return
    const parentToDelete = showDeleteConfirm
    setDeleting(parentToDelete.idParent)
    try {
      await parentService.deleteParent(parentToDelete.idParent)
      toast.success(`Parent ${parentToDelete.prenom} ${parentToDelete.nom} supprimé avec succès`)
      setShowDeleteConfirm(null)
      // Recharger la liste après suppression
      await loadParents()
    } catch (err) {
      console.error('Erreur lors de la suppression:', err)
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la suppression'
      toast.error(errorMessage)
      // Recharger quand même pour vérifier si la suppression a réussi
      setShowDeleteConfirm(null)
      await loadParents()
    } finally {
      setDeleting(null)
    }
  }

  const filteredParents = parents.filter((parent) => {
    const matchesSearch =
      parent.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      parent.prenom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      parent.matriculeParent.toLowerCase().includes(searchQuery.toLowerCase()) ||
      parent.email.toLowerCase().includes(searchQuery.toLowerCase())

    // Ville filter: find the quartier's ville
    let matchesVille = true
    if (villeFilter !== 'all' && parent.quartierId) {
      const parentQuartier = quartiers.find((q) => q.id === parent.quartierId)
      matchesVille = parentQuartier ? parentQuartier.villeId.toString() === villeFilter : false
    } else if (villeFilter !== 'all' && !parent.quartierId) {
      matchesVille = false
    }

    const matchesQuartier =
      quartierFilter === 'all' ||
      (parent.quartierId && parent.quartierId.toString() === quartierFilter)

    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'actif' && parent.actif === true) ||
      (statusFilter === 'inactif' && parent.actif === false) ||
      (statusFilter === 'complete' &&
        parent.profession &&
        parent.employeur &&
        parent.pieceIdentiteNumero)

    return matchesSearch && matchesVille && matchesQuartier && matchesStatus
  })

  // Stats calculations
  const activeParents = parents.filter((p) => p.actif).length
  const parentsWithProfession = parents.filter((p) => p.profession).length
  const completeProfiles = parents.filter(
    (p) => p.profession && p.employeur && p.pieceIdentiteNumero
  ).length
  const completionRate =
    parents.length > 0 ? Math.round((completeProfiles / parents.length) * 100) : 0

  const getStatusBadge = (parent: Parent) => {
    if (!parent.actif) {
      return (
        <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-700">
          Inactif
        </span>
      )
    }
    if (parent.profession && parent.employeur && parent.pieceIdentiteNumero) {
      return (
        <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
          Complet
        </span>
      )
    }
    return (
      <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-700">
        Partiel
      </span>
    )
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Parents</h1>
          <p className="mt-1 text-gray-600">{filteredParents.length} parents enregistrés</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Exporter
          </Button>
          <Button onClick={openCreateModal} className="gap-2 bg-[#2302B3] hover:bg-[#1a0285]">
            <UserPlus className="h-4 w-4" />
            Nouveau parent
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{parents.length}</p>
              <p className="text-sm text-gray-500">Total parents</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50">
              <UserCheck className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{activeParents}</p>
              <p className="text-sm text-gray-500">Parents actifs</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50">
              <Briefcase className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{parentsWithProfession}</p>
              <p className="text-sm text-gray-500">Avec profession</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50">
              <UserCheck className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{completionRate}%</p>
              <p className="text-sm text-gray-500">Profils complets</p>
            </div>
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4">
          <AlertCircle className="h-5 w-5 text-red-500" />
          <p className="text-sm text-red-700">{error}</p>
          <Button size="sm" variant="outline" onClick={loadParents} className="ml-auto">
            Réessayer
          </Button>
        </div>
      )}

      {/* Filters */}
      <div className="rounded-2xl border border-gray-100 bg-white p-4">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Rechercher par nom, matricule ou email..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={villeFilter} onValueChange={setVilleFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Ville" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les villes</SelectItem>
              {villes.map((v) => (
                <SelectItem key={v.id} value={v.id.toString()}>
                  {v.nom}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={quartierFilter} onValueChange={setQuartierFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Quartier" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les quartiers</SelectItem>
              {quartiersForFilter.map((q) => (
                <SelectItem key={q.id} value={q.id.toString()}>
                  {q.nom}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="actif">Actif</SelectItem>
              <SelectItem value="inactif">Inactif</SelectItem>
              <SelectItem value="complete">Profil complet</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-[#2302B3]" />
          <span className="ml-3 text-gray-500">Chargement...</span>
        </div>
      )}

      {/* Parents Table */}
      {!loading && !error && (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1800px]">
              <thead className="border-b border-gray-100 bg-gray-50">
                <tr>
                  <th className="whitespace-nowrap p-4 text-left font-semibold text-gray-600">
                    ID
                  </th>
                  <th className="whitespace-nowrap p-4 text-left font-semibold text-gray-600">
                    Matricule
                  </th>
                  <th className="whitespace-nowrap p-4 text-left font-semibold text-gray-600">
                    Photo
                  </th>
                  <th className="whitespace-nowrap p-4 text-left font-semibold text-gray-600">
                    Nom
                  </th>
                  <th className="whitespace-nowrap p-4 text-left font-semibold text-gray-600">
                    Prénom
                  </th>
                  <th className="whitespace-nowrap p-4 text-left font-semibold text-gray-600">
                    Email
                  </th>
                  <th className="whitespace-nowrap p-4 text-left font-semibold text-gray-600">
                    Téléphone
                  </th>
                  <th className="whitespace-nowrap p-4 text-left font-semibold text-gray-600">
                    Tél. Secondaire
                  </th>
                  <th className="whitespace-nowrap p-4 text-left font-semibold text-gray-600">
                    Adresse
                  </th>
                  <th className="whitespace-nowrap p-4 text-left font-semibold text-gray-600">
                    Quartier
                  </th>
                  <th className="whitespace-nowrap p-4 text-left font-semibold text-gray-600">
                    Profession
                  </th>
                  <th className="whitespace-nowrap p-4 text-left font-semibold text-gray-600">
                    Employeur
                  </th>
                  <th className="whitespace-nowrap p-4 text-left font-semibold text-gray-600">
                    Type Pièce
                  </th>
                  <th className="whitespace-nowrap p-4 text-left font-semibold text-gray-600">
                    N° Pièce
                  </th>
                  <th className="whitespace-nowrap p-4 text-left font-semibold text-gray-600">
                    Statut
                  </th>
                  <th className="whitespace-nowrap p-4 text-left font-semibold text-gray-600">
                    Créé le
                  </th>
                  <th className="whitespace-nowrap p-4 text-left font-semibold text-gray-600">
                    Modifié le
                  </th>
                  <th className="whitespace-nowrap p-4 text-left font-semibold text-gray-600">
                    Supprimé le
                  </th>
                  <th className="sticky right-0 whitespace-nowrap bg-gray-50 p-4 text-right font-semibold text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredParents.length === 0 ? (
                  <tr>
                    <td colSpan={19} className="p-8 text-center text-gray-500">
                      Aucun parent trouvé
                    </td>
                  </tr>
                ) : (
                  filteredParents.map((parent) => (
                    <tr
                      key={parent.idParent}
                      className="border-b border-gray-50 transition-colors hover:bg-gray-50"
                    >
                      {/* ID */}
                      <td className="whitespace-nowrap p-4 text-sm text-gray-600">
                        {parent.idParent}
                      </td>
                      {/* Matricule */}
                      <td className="whitespace-nowrap p-4">
                        <code className="rounded bg-gray-100 px-2 py-1 text-sm">
                          {parent.matriculeParent}
                        </code>
                      </td>
                      {/* Photo */}
                      <td className="whitespace-nowrap p-4">
                        {parent.photoUrl ? (
                          <img
                            src={parent.photoUrl}
                            alt={`${parent.prenom} ${parent.nom}`}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#2302B3] to-[#4318FF] font-semibold text-white">
                            {parent.prenom.charAt(0)}
                            {parent.nom.charAt(0)}
                          </div>
                        )}
                      </td>
                      {/* Nom */}
                      <td className="whitespace-nowrap p-4 font-medium text-gray-900">
                        {parent.nom}
                      </td>
                      {/* Prénom */}
                      <td className="whitespace-nowrap p-4 font-medium text-gray-900">
                        {parent.prenom}
                      </td>
                      {/* Email */}
                      <td className="whitespace-nowrap p-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="h-3 w-3" />
                          {parent.email}
                        </div>
                      </td>
                      {/* Téléphone */}
                      <td className="whitespace-nowrap p-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="h-3 w-3" />
                          {parent.telephone}
                        </div>
                      </td>
                      {/* Téléphone Secondaire */}
                      <td className="whitespace-nowrap p-4 text-sm text-gray-600">
                        {parent.telephoneSecondaire ? (
                          <div className="flex items-center gap-2">
                            <Phone className="h-3 w-3" />
                            {parent.telephoneSecondaire}
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      {/* Adresse */}
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="h-3 w-3 flex-shrink-0" />
                          <span className="max-w-[200px] truncate" title={parent.adresse}>
                            {parent.adresse}
                          </span>
                        </div>
                      </td>
                      {/* Quartier */}
                      <td className="whitespace-nowrap p-4 text-sm text-gray-600">
                        {parent.quartierNom || <span className="text-gray-400">-</span>}
                      </td>
                      {/* Profession */}
                      <td className="whitespace-nowrap p-4">
                        {parent.profession ? (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Briefcase className="h-3 w-3" />
                            {parent.profession}
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      {/* Employeur */}
                      <td className="whitespace-nowrap p-4 text-sm text-gray-600">
                        {parent.employeur || <span className="text-gray-400">-</span>}
                      </td>
                      {/* Type Pièce Identité */}
                      <td className="whitespace-nowrap p-4">
                        {parent.pieceIdentiteType ? (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <FileText className="h-3 w-3" />
                            {PieceIdentiteTypeLabels[parent.pieceIdentiteType]}
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      {/* Numéro Pièce Identité */}
                      <td className="whitespace-nowrap p-4 text-sm text-gray-600">
                        {parent.pieceIdentiteNumero || <span className="text-gray-400">-</span>}
                      </td>
                      {/* Statut */}
                      <td className="whitespace-nowrap p-4">{getStatusBadge(parent)}</td>
                      {/* Créé le */}
                      <td className="whitespace-nowrap p-4">
                        {parent.createdAt ? (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="h-3 w-3" />
                            {new Date(parent.createdAt).toLocaleDateString('fr-FR', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      {/* Modifié le */}
                      <td className="whitespace-nowrap p-4">
                        {parent.updatedAt ? (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="h-3 w-3" />
                            {new Date(parent.updatedAt).toLocaleDateString('fr-FR', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      {/* Supprimé le */}
                      <td className="whitespace-nowrap p-4">
                        {parent.deletedAt ? (
                          <div className="flex items-center gap-2 text-sm text-red-600">
                            <Calendar className="h-3 w-3" />
                            {new Date(parent.deletedAt).toLocaleDateString('fr-FR', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      {/* Actions */}
                      <td className="sticky right-0 whitespace-nowrap bg-white p-4">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            onClick={() => setViewingParent(parent)}
                          >
                            <Eye className="h-4 w-4 text-gray-500" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            onClick={() => openEditModal(parent)}
                          >
                            <Edit className="h-4 w-4 text-gray-500" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 text-red-500 hover:bg-red-50 hover:text-red-700"
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              handleDelete(parent)
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-gray-100 p-4">
            <p className="text-sm text-gray-500">
              Affichage 1-{Math.min(filteredParents.length, 10)} sur {filteredParents.length}{' '}
              parents
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Précédent
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-[#2302B3] text-white hover:bg-[#1a0285]"
              >
                1
              </Button>
              <Button variant="outline" size="sm">
                Suivant
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white p-6">
              <h2 className="text-xl font-bold">
                {editingParent ? 'Modifier le parent' : 'Ajouter un parent'}
              </h2>
              <Button variant="ghost" size="sm" onClick={() => setShowModal(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Tabs */}
            <div className="border-b px-6">
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setActiveTab('info')}
                  className={`border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                    activeTab === 'info'
                      ? 'border-[#2302B3] text-[#2302B3]'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Informations
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('contact')}
                  className={`border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                    activeTab === 'contact'
                      ? 'border-[#2302B3] text-[#2302B3]'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Contact & Adresse
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('identite')}
                  className={`border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                    activeTab === 'identite'
                      ? 'border-[#2302B3] text-[#2302B3]'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Profession & Identité
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              {/* Tab: Informations */}
              {activeTab === 'info' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Prénom <span className="text-red-500">*</span>
                      </label>
                      <Input
                        required
                        value={formData.prenom}
                        onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                        placeholder="Jean"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Nom <span className="text-red-500">*</span>
                      </label>
                      <Input
                        required
                        value={formData.nom}
                        onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                        placeholder="Dupont"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jean.dupont@email.com"
                    />
                    <p className="mt-1 text-xs text-gray-500">L&apos;email doit être unique</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Téléphone principal <span className="text-red-500">*</span>
                      </label>
                      <Input
                        required
                        value={formData.telephone}
                        onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                        placeholder="+237 6XX XXX XXX"
                      />
                      <p className="mt-1 text-xs text-gray-500">Le téléphone doit être unique</p>
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Téléphone secondaire
                      </label>
                      <Input
                        value={formData.telephoneSecondaire}
                        onChange={(e) =>
                          setFormData({ ...formData, telephoneSecondaire: e.target.value })
                        }
                        placeholder="+237 6XX XXX XXX"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Tab: Contact & Adresse */}
              {activeTab === 'contact' && (
                <div className="space-y-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Adresse complète <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      className="w-full rounded-md border border-gray-300 p-3"
                      rows={3}
                      value={formData.adresse}
                      onChange={(e) => setFormData({ ...formData, adresse: e.target.value })}
                      placeholder="Numéro, Rue, Immeuble, Appartement..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Ville <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        className="w-full rounded-md border border-gray-300 p-2"
                        value={selectedVilleId || ''}
                        onChange={(e) => {
                          const villeId = e.target.value ? Number(e.target.value) : null
                          setSelectedVilleId(villeId)
                          // Reset quartier when ville changes
                          setFormData({ ...formData, quartierId: 0 })
                        }}
                      >
                        <option value="">Sélectionner une ville</option>
                        {villes.map((v) => (
                          <option key={v.id} value={v.id}>
                            {v.nom}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Quartier <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        className="w-full rounded-md border border-gray-300 p-2"
                        value={formData.quartierId || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            quartierId: e.target.value ? Number(e.target.value) : 0,
                          })
                        }
                        disabled={!selectedVilleId}
                      >
                        <option value="">
                          {selectedVilleId
                            ? 'Sélectionner un quartier'
                            : "Sélectionnez d'abord une ville"}
                        </option>
                        {filteredQuartiers.map((q) => (
                          <option key={q.id} value={q.id}>
                            {q.nom}
                          </option>
                        ))}
                      </select>
                      {!selectedVilleId && (
                        <p className="mt-1 text-xs text-amber-600">
                          Veuillez d&apos;abord sélectionner une ville
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab: Profession & Identité */}
              {activeTab === 'identite' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Profession
                      </label>
                      <Input
                        value={formData.profession}
                        onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                        placeholder="Ingénieur, Médecin, Enseignant..."
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Employeur
                      </label>
                      <Input
                        value={formData.employeur}
                        onChange={(e) => setFormData({ ...formData, employeur: e.target.value })}
                        placeholder="Nom de l'entreprise"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Type de pièce d&apos;identité
                      </label>
                      <select
                        className="w-full rounded-md border border-gray-300 p-2"
                        value={formData.pieceIdentiteType || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            pieceIdentiteType: e.target.value
                              ? (e.target.value as PieceIdentiteType)
                              : undefined,
                          })
                        }
                      >
                        <option value="">Sélectionner un type</option>
                        {Object.entries(PieceIdentiteTypeLabels).map(([key, label]) => (
                          <option key={key} value={key}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Numéro de pièce d&apos;identité
                      </label>
                      <Input
                        value={formData.pieceIdentiteNumero}
                        onChange={(e) =>
                          setFormData({ ...formData, pieceIdentiteNumero: e.target.value })
                        }
                        placeholder="Numéro de la pièce"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 flex justify-end gap-3 border-t pt-4">
                <Button type="button" variant="outline" onClick={() => setShowModal(false)}>
                  Annuler
                </Button>
                <Button type="submit" disabled={saving} className="bg-[#2302B3] hover:bg-[#1a0185]">
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enregistrement...
                    </>
                  ) : editingParent ? (
                    'Modifier'
                  ) : (
                    'Ajouter'
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <Trash2 className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">Confirmer la suppression</h3>
            <p className="mb-6 text-gray-600">
              Êtes-vous sûr de vouloir supprimer le parent{' '}
              <strong>
                {showDeleteConfirm.prenom} {showDeleteConfirm.nom}
              </strong>{' '}
              ? Cette action est irréversible.
            </p>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(null)}
                disabled={deleting !== null}
              >
                Annuler
              </Button>
              <Button
                className="bg-red-600 hover:bg-red-700"
                onClick={confirmDelete}
                disabled={deleting !== null}
              >
                {deleting !== null ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Suppression...
                  </>
                ) : (
                  'Supprimer'
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* View Parent Modal */}
      {viewingParent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white p-6">
              <div className="flex items-center gap-4">
                {viewingParent.photoUrl ? (
                  <img
                    src={viewingParent.photoUrl}
                    alt={`${viewingParent.prenom} ${viewingParent.nom}`}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#2302B3] to-[#4318FF] text-xl font-semibold text-white">
                    {viewingParent.prenom.charAt(0)}
                    {viewingParent.nom.charAt(0)}
                  </div>
                )}
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {viewingParent.prenom} {viewingParent.nom}
                  </h2>
                  <code className="rounded bg-gray-100 px-2 py-1 text-sm">
                    {viewingParent.matriculeParent}
                  </code>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setViewingParent(null)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="p-6">
              {/* Informations personnelles */}
              <div className="mb-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                  <Users className="h-5 w-5 text-[#2302B3]" />
                  Informations personnelles
                </h3>
                <div className="grid grid-cols-2 gap-4 rounded-xl bg-gray-50 p-4">
                  <div>
                    <p className="text-sm text-gray-500">ID</p>
                    <p className="font-medium text-gray-900">{viewingParent.idParent}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Matricule</p>
                    <p className="font-medium text-gray-900">{viewingParent.matriculeParent}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Nom</p>
                    <p className="font-medium text-gray-900">{viewingParent.nom}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Prénom</p>
                    <p className="font-medium text-gray-900">{viewingParent.prenom}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Statut</p>
                    <p className="font-medium">
                      {viewingParent.actif ? (
                        <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
                          Actif
                        </span>
                      ) : (
                        <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-700">
                          Inactif
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="mb-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                  <Phone className="h-5 w-5 text-[#2302B3]" />
                  Contact
                </h3>
                <div className="grid grid-cols-2 gap-4 rounded-xl bg-gray-50 p-4">
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="flex items-center gap-2 font-medium text-gray-900">
                      <Mail className="h-4 w-4" />
                      {viewingParent.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Téléphone principal</p>
                    <p className="flex items-center gap-2 font-medium text-gray-900">
                      <Phone className="h-4 w-4" />
                      {viewingParent.telephone}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Téléphone secondaire</p>
                    <p className="font-medium text-gray-900">
                      {viewingParent.telephoneSecondaire || (
                        <span className="text-gray-400">Non renseigné</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Adresse */}
              <div className="mb-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                  <MapPin className="h-5 w-5 text-[#2302B3]" />
                  Adresse
                </h3>
                <div className="grid grid-cols-2 gap-4 rounded-xl bg-gray-50 p-4">
                  <div className="col-span-2">
                    <p className="text-sm text-gray-500">Adresse complète</p>
                    <p className="font-medium text-gray-900">{viewingParent.adresse}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-500">Quartier</p>
                    <p className="font-medium text-gray-900">
                      {viewingParent.quartierNom || (
                        <span className="text-gray-400">Non renseigné</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Profession */}
              <div className="mb-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                  <Briefcase className="h-5 w-5 text-[#2302B3]" />
                  Profession
                </h3>
                <div className="grid grid-cols-2 gap-4 rounded-xl bg-gray-50 p-4">
                  <div>
                    <p className="text-sm text-gray-500">Profession</p>
                    <p className="font-medium text-gray-900">
                      {viewingParent.profession || (
                        <span className="text-gray-400">Non renseigné</span>
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Employeur</p>
                    <p className="font-medium text-gray-900">
                      {viewingParent.employeur || (
                        <span className="text-gray-400">Non renseigné</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Pièce d'identité */}
              <div className="mb-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                  <FileText className="h-5 w-5 text-[#2302B3]" />
                  Pièce d&apos;identité
                </h3>
                <div className="grid grid-cols-2 gap-4 rounded-xl bg-gray-50 p-4">
                  <div>
                    <p className="text-sm text-gray-500">Type de pièce</p>
                    <p className="font-medium text-gray-900">
                      {viewingParent.pieceIdentiteType ? (
                        PieceIdentiteTypeLabels[viewingParent.pieceIdentiteType]
                      ) : (
                        <span className="text-gray-400">Non renseigné</span>
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Numéro de pièce</p>
                    <p className="font-medium text-gray-900">
                      {viewingParent.pieceIdentiteNumero || (
                        <span className="text-gray-400">Non renseigné</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Dates */}
              <div className="mb-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                  <Calendar className="h-5 w-5 text-[#2302B3]" />
                  Historique
                </h3>
                <div className="grid grid-cols-3 gap-4 rounded-xl bg-gray-50 p-4">
                  <div>
                    <p className="text-sm text-gray-500">Créé le</p>
                    <p className="font-medium text-gray-900">
                      {viewingParent.createdAt ? (
                        new Date(viewingParent.createdAt).toLocaleDateString('fr-FR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      ) : (
                        <span className="text-gray-400">Non disponible</span>
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Modifié le</p>
                    <p className="font-medium text-gray-900">
                      {viewingParent.updatedAt ? (
                        new Date(viewingParent.updatedAt).toLocaleDateString('fr-FR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      ) : (
                        <span className="text-gray-400">Non disponible</span>
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Supprimé le</p>
                    <p className="font-medium text-gray-900">
                      {viewingParent.deletedAt ? (
                        <span className="text-red-600">
                          {new Date(viewingParent.deletedAt).toLocaleDateString('fr-FR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 border-t pt-4">
                <Button variant="outline" onClick={() => setViewingParent(null)}>
                  Fermer
                </Button>
                <Button
                  className="bg-[#2302B3] hover:bg-[#1a0185]"
                  onClick={() => {
                    setViewingParent(null)
                    openEditModal(viewingParent)
                  }}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Modifier
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
