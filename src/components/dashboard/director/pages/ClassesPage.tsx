'use client'

import { useState, useEffect } from 'react'
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
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
import { Niveau, SousSysteme } from '@/types/classe'
import { toast } from 'sonner'

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

const emptyForm: CreateClasseRequest = {
  nomClasse: '',
  niveau: Niveau.PRIMAIRE,
  sousSysteme: SousSysteme.FRANCOPHONE,
  section: '',
  capacite: undefined,
  fraisScolarite: undefined,
  description: '',
}

export function DirectorClassesPage() {
  const [classes, setClasses] = useState<ClasseDto[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [levelFilter, setLevelFilter] = useState('all')

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingClasse, setEditingClasse] = useState<ClasseDto | null>(null)
  const [formData, setFormData] = useState<CreateClasseRequest>({ ...emptyForm })
  const [isSaving, setIsSaving] = useState(false)

  // Delete confirmation
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
  const overallAverage = 'N/A'

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
        <Button className="gap-2 bg-[#2302B3] hover:bg-[#1a0285]" onClick={openCreateDialog}>
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
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-1"
                  onClick={() => openEditDialog(cls)}
                >
                  <Edit className="h-4 w-4" />
                  Modifier
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1 text-red-600 hover:bg-red-50 hover:text-red-700"
                  onClick={() => openDeleteDialog(cls)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create/Edit Dialog */}
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
            {/* Nom de la classe */}
            <div className="grid gap-2">
              <Label htmlFor="nomClasse">Nom de la classe *</Label>
              <Input
                id="nomClasse"
                placeholder="Ex: CM2 A, 6ème B..."
                value={formData.nomClasse}
                onChange={(e) => setFormData((prev) => ({ ...prev, nomClasse: e.target.value }))}
              />
            </div>

            {/* Niveau + Sous-système */}
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

            {/* Section */}
            <div className="grid gap-2">
              <Label htmlFor="section">Section</Label>
              <Input
                id="section"
                placeholder="Ex: A, B, C..."
                value={formData.section || ''}
                onChange={(e) => setFormData((prev) => ({ ...prev, section: e.target.value }))}
              />
            </div>

            {/* Capacité + Frais */}
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
                <Label htmlFor="fraisScolarite">Frais de scolarité (FCFA)</Label>
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

            {/* Description */}
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

      {/* Delete Confirmation Dialog */}
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
