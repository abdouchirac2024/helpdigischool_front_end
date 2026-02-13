'use client'

import { useState, useEffect } from 'react'
import {
  Search,
  Link2,
  Loader2,
  AlertCircle,
  Plus,
  Edit,
  Trash2,
  Phone,
  X,
  Star,
  UserCheck,
} from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { parentService } from '@/services/parent.service'
import { studentService, type Eleve } from '@/services/student.service'
import type { EleveParent, EleveParentFormData, Parent, TypeRelation } from '@/types'
import { TypeRelationLabels } from '@/types/models/parent'

export function AdminEleveParentsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [relations, setRelations] = useState<EleveParent[]>([])
  const [parents, setParents] = useState<Parent[]>([])
  const [eleves, setEleves] = useState<Eleve[]>([])

  // Modal state
  const [showModal, setShowModal] = useState(false)
  const [editingRelation, setEditingRelation] = useState<EleveParent | null>(null)
  const [formData, setFormData] = useState<EleveParentFormData>({
    eleveId: 0,
    parentId: 0,
    typeRelation: 'PERE',
    estPrincipal: false,
    autorisePriseEnCharge: true,
    autoriseUrgence: true,
    notes: '',
  })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadRelations()
    loadParents()
    loadEleves()
  }, [])

  async function loadRelations() {
    setLoading(true)
    setError(null)
    try {
      const data = await parentService.getEleveParents()
      setRelations(data)
    } catch {
      setError('Impossible de charger les relations. Vérifiez que le backend est démarré.')
    } finally {
      setLoading(false)
    }
  }

  async function loadParents() {
    try {
      const data = await parentService.getParents()
      setParents(data)
    } catch {
      console.error('Impossible de charger les parents')
    }
  }

  async function loadEleves() {
    try {
      const data = await studentService.getEleves()
      setEleves(data)
    } catch {
      console.error('Impossible de charger les élèves')
    }
  }

  function openCreateModal() {
    setEditingRelation(null)
    setFormData({
      eleveId: 0,
      parentId: 0,
      typeRelation: 'PERE',
      estPrincipal: false,
      autorisePriseEnCharge: true,
      autoriseUrgence: true,
      notes: '',
    })
    setShowModal(true)
  }

  function openEditModal(relation: EleveParent) {
    setEditingRelation(relation)
    setFormData({
      eleveId: relation.eleveId,
      parentId: relation.parentId,
      typeRelation: relation.typeRelation,
      estPrincipal: relation.estPrincipal,
      autorisePriseEnCharge: relation.autorisePriseEnCharge,
      autoriseUrgence: relation.autoriseUrgence,
      notes: relation.notes || '',
    })
    setShowModal(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!formData.eleveId || !formData.parentId) {
      toast.error('Veuillez sélectionner un élève et un parent')
      return
    }

    // Prevent double submission
    if (saving) return

    setSaving(true)
    try {
      if (editingRelation) {
        await parentService.updateEleveParent(editingRelation.idEleveParent, formData)
        toast.success('Relation modifiée avec succès')
      } else {
        await parentService.createEleveParent(formData)
        toast.success('Relation créée avec succès')
      }
      setShowModal(false)
      await loadRelations()
    } catch (err: unknown) {
      console.error('Erreur lors de la sauvegarde:', err)
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la sauvegarde'
      toast.error(errorMessage)
    } finally {
      setSaving(false)
    }
  }

  const [showDeleteConfirm, setShowDeleteConfirm] = useState<EleveParent | null>(null)
  const [deleting, setDeleting] = useState(false)

  async function handleDelete(relation: EleveParent) {
    setShowDeleteConfirm(relation)
  }

  async function confirmDelete() {
    if (!showDeleteConfirm || deleting) return
    setDeleting(true)
    try {
      await parentService.deleteEleveParent(showDeleteConfirm.idEleveParent)
      toast.success('Relation supprimée avec succès')
      setShowDeleteConfirm(null)
      await loadRelations()
    } catch (err: unknown) {
      console.error('Erreur lors de la suppression:', err)
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la suppression'
      toast.error(errorMessage)
    } finally {
      setDeleting(false)
    }
  }

  const filtered = relations.filter(
    (r) =>
      (r.eleveNom && r.eleveNom.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (r.elevePrenom && r.elevePrenom.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (r.eleveClasse && r.eleveClasse.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (r.parentNom && r.parentNom.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (r.parentPrenom && r.parentPrenom.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (r.eleveMatricule && r.eleveMatricule.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (r.parentMatricule && r.parentMatricule.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const typeRelationOptions: TypeRelation[] = [
    'PERE',
    'MERE',
    'TUTEUR_LEGAL',
    'GRAND_PARENT',
    'ONCLE',
    'TANTE',
    'AUTRE',
  ]

  // Stats
  const principalCount = relations.filter((r) => r.estPrincipal).length
  const urgenceCount = relations.filter((r) => r.autoriseUrgence).length
  const priseEnChargeCount = relations.filter((r) => r.autorisePriseEnCharge).length

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Relations Élève-Parent</h1>
          <p className="mt-1 text-gray-600">{relations.length} relation(s) enregistrée(s)</p>
        </div>
        <Button onClick={openCreateModal} className="bg-[#2302B3] hover:bg-[#1a0285]">
          <Plus className="mr-2 h-4 w-4" />
          Ajouter une relation
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
              <Link2 className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{relations.length}</p>
              <p className="text-sm text-gray-500">Total relations</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-50">
              <Star className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{principalCount}</p>
              <p className="text-sm text-gray-500">Parents principaux</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50">
              <Phone className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{urgenceCount}</p>
              <p className="text-sm text-gray-500">Contacts urgence</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50">
              <UserCheck className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{priseEnChargeCount}</p>
              <p className="text-sm text-gray-500">Prise en charge</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="rounded-2xl border border-gray-100 bg-white p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Rechercher par nom, classe, matricule..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4">
          <AlertCircle className="h-5 w-5 text-red-500" />
          <p className="text-sm text-red-700">{error}</p>
          <Button size="sm" variant="outline" onClick={loadRelations} className="ml-auto">
            Réessayer
          </Button>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-[#2302B3]" />
          <span className="ml-3 text-gray-500">Chargement...</span>
        </div>
      )}

      {/* Table */}
      {!loading && !error && (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-100 bg-gray-50">
                <tr>
                  <th className="p-4 text-left font-semibold text-gray-600">Élève</th>
                  <th className="p-4 text-left font-semibold text-gray-600">Classe</th>
                  <th className="p-4 text-left font-semibold text-gray-600">Parent</th>
                  <th className="p-4 text-left font-semibold text-gray-600">Téléphone</th>
                  <th className="p-4 text-left font-semibold text-gray-600">Relation</th>
                  <th className="p-4 text-left font-semibold text-gray-600">Rôles</th>
                  <th className="p-4 text-right font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-gray-500">
                      Aucune relation trouvée
                    </td>
                  </tr>
                ) : (
                  filtered.map((relation) => (
                    <tr
                      key={relation.idEleveParent}
                      className="border-b border-gray-50 transition-colors hover:bg-gray-50"
                    >
                      <td className="p-4">
                        <div>
                          <div className="font-semibold text-gray-900">
                            {relation.elevePrenom} {relation.eleveNom}
                          </div>
                          <code className="text-xs text-gray-500">{relation.eleveMatricule}</code>
                        </div>
                      </td>
                      <td className="p-4">
                        {relation.eleveClasse ? (
                          <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700">
                            {relation.eleveClasse}
                          </span>
                        ) : (
                          <span className="text-xs text-gray-400">Non inscrit</span>
                        )}
                      </td>
                      <td className="p-4">
                        <div>
                          <div className="font-semibold text-gray-900">
                            {relation.parentPrenom} {relation.parentNom}
                          </div>
                          <code className="text-xs text-gray-500">{relation.parentMatricule}</code>
                        </div>
                      </td>
                      <td className="p-4">
                        {relation.parentTelephone ? (
                          <div className="flex items-center gap-1 text-sm text-gray-700">
                            <Phone className="h-4 w-4 text-gray-400" />
                            {relation.parentTelephone}
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400">-</span>
                        )}
                      </td>
                      <td className="p-4">
                        <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-700">
                          {TypeRelationLabels[relation.typeRelation]}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1">
                          {relation.estPrincipal && (
                            <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-semibold text-yellow-700">
                              Principal
                            </span>
                          )}
                          {relation.autoriseUrgence && (
                            <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">
                              Urgence
                            </span>
                          )}
                          {relation.autorisePriseEnCharge && (
                            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
                              Récupération
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            onClick={() => openEditModal(relation)}
                          >
                            <Edit className="h-4 w-4 text-gray-500" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                            onClick={() => handleDelete(relation)}
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
          <div className="border-t border-gray-100 p-4">
            <p className="text-sm text-gray-500">{filtered.length} relation(s)</p>
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white p-6">
              <h2 className="text-xl font-bold">
                {editingRelation ? 'Modifier la relation' : 'Ajouter une relation'}
              </h2>
              <Button variant="ghost" size="sm" onClick={() => setShowModal(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 p-6">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Élève <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full rounded-md border border-gray-300 p-2"
                  required
                  value={formData.eleveId || ''}
                  onChange={(e) => setFormData({ ...formData, eleveId: Number(e.target.value) })}
                  disabled={!!editingRelation}
                >
                  <option value="">Sélectionner un élève</option>
                  {eleves.map((eleve) => (
                    <option key={eleve.idEleve} value={eleve.idEleve}>
                      {eleve.prenom} {eleve.nom} ({eleve.matricule})
                    </option>
                  ))}
                </select>
                <p className="mt-1 text-xs text-gray-500">
                  Seuls les élèves de votre établissement sont affichés
                </p>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Parent <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full rounded-md border border-gray-300 p-2"
                  required
                  value={formData.parentId || ''}
                  onChange={(e) => setFormData({ ...formData, parentId: Number(e.target.value) })}
                  disabled={!!editingRelation}
                >
                  <option value="">Sélectionner un parent</option>
                  {parents.map((p) => (
                    <option key={p.idParent} value={p.idParent}>
                      {p.prenom} {p.nom} ({p.matriculeParent})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Type de relation <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full rounded-md border border-gray-300 p-2"
                  required
                  value={formData.typeRelation}
                  onChange={(e) =>
                    setFormData({ ...formData, typeRelation: e.target.value as TypeRelation })
                  }
                >
                  {typeRelationOptions.map((type) => (
                    <option key={type} value={type}>
                      {TypeRelationLabels[type]}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-3 rounded-lg border border-gray-200 p-4">
                <h3 className="font-medium text-gray-900">Autorisations</h3>

                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={formData.estPrincipal}
                    onChange={(e) => setFormData({ ...formData, estPrincipal: e.target.checked })}
                    className="h-4 w-4 rounded border-gray-300 text-[#2302B3]"
                  />
                  <div>
                    <span className="text-sm font-medium text-gray-700">Parent principal</span>
                    <p className="text-xs text-gray-500">
                      Reçoit toutes les notifications importantes
                    </p>
                  </div>
                </label>

                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={formData.autoriseUrgence}
                    onChange={(e) =>
                      setFormData({ ...formData, autoriseUrgence: e.target.checked })
                    }
                    className="h-4 w-4 rounded border-gray-300 text-[#2302B3]"
                  />
                  <div>
                    <span className="text-sm font-medium text-gray-700">
                      Contact d&apos;urgence
                    </span>
                    <p className="text-xs text-gray-500">
                      Peut être contacté en cas d&apos;urgence
                    </p>
                  </div>
                </label>

                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={formData.autorisePriseEnCharge}
                    onChange={(e) =>
                      setFormData({ ...formData, autorisePriseEnCharge: e.target.checked })
                    }
                    className="h-4 w-4 rounded border-gray-300 text-[#2302B3]"
                  />
                  <div>
                    <span className="text-sm font-medium text-gray-700">
                      Autorisé à récupérer l&apos;enfant
                    </span>
                    <p className="text-xs text-gray-500">
                      Peut venir chercher l&apos;enfant à l&apos;école
                    </p>
                  </div>
                </label>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Notes</label>
                <textarea
                  className="w-full rounded-md border border-gray-300 p-3"
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Notes supplémentaires..."
                />
              </div>

              <div className="flex justify-end gap-3 border-t pt-4">
                <Button type="button" variant="outline" onClick={() => setShowModal(false)}>
                  Annuler
                </Button>
                <Button type="submit" disabled={saving} className="bg-[#2302B3] hover:bg-[#1a0185]">
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enregistrement...
                    </>
                  ) : editingRelation ? (
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
              Êtes-vous sûr de vouloir supprimer la relation entre{' '}
              <strong>
                {showDeleteConfirm.elevePrenom} {showDeleteConfirm.eleveNom}
              </strong>{' '}
              et{' '}
              <strong>
                {showDeleteConfirm.parentPrenom} {showDeleteConfirm.parentNom}
              </strong>{' '}
              ?
            </p>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(null)}
                disabled={deleting}
              >
                Annuler
              </Button>
              <Button
                className="bg-red-600 hover:bg-red-700"
                onClick={confirmDelete}
                disabled={deleting}
              >
                {deleting ? (
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
    </div>
  )
}
