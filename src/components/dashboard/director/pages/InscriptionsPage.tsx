'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  UserPlus,
  Search,
  Eye,
  XCircle,
  Copy,
  CheckCircle,
  KeyRound,
  AlertTriangle,
  Printer,
  ChevronRight,
  ChevronLeft,
  Loader2,
  Plus,
  Users,
  Mail,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Label } from '@/components/ui/label'
import { inscriptionService } from '@/services/inscription.service'
import { studentService } from '@/services/student.service'
import { classeService } from '@/services/classe.service'
import { parentService } from '@/services/parent.service'
import { locationService } from '@/services/location.service'
import { anneeScolaireService } from '@/services/anneeScolaire.service'
import type { Inscription } from '@/types/models/inscription'
import type { EleveDto, CreateEleveRequest, AnneeScolaireResponse } from '@/types/student'
import type { ClasseDto } from '@/types/classe'
import type { Parent, ParentFormData, TypeRelation, Ville, Quartier } from '@/types'
import { TypeRelationLabels } from '@/types/models/parent'
import { useAuth } from '@/lib/auth/auth-context'
import { toast } from 'sonner'

// =====================
// Main Page Component
// =====================

export function InscriptionsPage() {
  const [inscriptions, setInscriptions] = useState<Inscription[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  // Dialogs
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isAnnulationOpen, setIsAnnulationOpen] = useState(false)
  const [isFactureOpen, setIsFactureOpen] = useState(false)

  // Selected inscription
  const [selectedInscription, setSelectedInscription] = useState<Inscription | null>(null)

  // Facture data (inscription result after creation)
  const [factureData, setFactureData] = useState<Inscription | null>(null)

  useEffect(() => {
    loadInscriptions()
  }, [])

  const loadInscriptions = async () => {
    try {
      setIsLoading(true)
      const data = await inscriptionService.getAll()
      setInscriptions(data)
    } catch {
      toast.error('Impossible de charger les inscriptions')
    } finally {
      setIsLoading(false)
    }
  }

  const filteredInscriptions = inscriptions.filter((ins) => {
    const fullName = `${ins.eleveNom} ${ins.elevePrenom}`.toLowerCase()
    const matchesSearch =
      fullName.includes(searchQuery.toLowerCase()) ||
      ins.numeroInscription?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ins.eleveMatricule?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || ins.statutInscription === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleCreationSuccess = (inscription: Inscription) => {
    setIsCreateOpen(false)
    loadInscriptions()
    setFactureData(inscription)
    setIsFactureOpen(true)
  }

  const handleViewDetails = (inscription: Inscription) => {
    setSelectedInscription(inscription)
    setIsDetailsOpen(true)
  }

  const handleAnnulerClick = (inscription: Inscription) => {
    setSelectedInscription(inscription)
    setIsAnnulationOpen(true)
  }

  const handleAnnulationSuccess = () => {
    setIsAnnulationOpen(false)
    setSelectedInscription(null)
    loadInscriptions()
  }

  const getStatutBadge = (statut: string) => {
    switch (statut) {
      case 'VALIDEE':
        return <Badge className="bg-green-100 text-green-800">Validee</Badge>
      case 'EN_ATTENTE':
        return <Badge className="bg-yellow-100 text-yellow-800">En attente</Badge>
      case 'ANNULEE':
        return <Badge className="bg-red-100 text-red-800">Annulee</Badge>
      default:
        return <Badge variant="outline">{statut}</Badge>
    }
  }

  const formatMontant = (montant: number) => {
    return new Intl.NumberFormat('fr-FR').format(montant) + ' FCFA'
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inscriptions</h1>
          <p className="text-sm text-gray-500">
            {inscriptions.length} inscription{inscriptions.length > 1 ? 's' : ''} au total
          </p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Nouvelle inscription
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Rechercher par nom, matricule ou numero..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="VALIDEE">Validee</SelectItem>
            <SelectItem value="EN_ATTENTE">En attente</SelectItem>
            <SelectItem value="ANNULEE">Annulee</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      ) : filteredInscriptions.length === 0 ? (
        <div className="py-12 text-center text-gray-500">
          {searchQuery || statusFilter !== 'all'
            ? 'Aucune inscription trouvee avec ces filtres'
            : 'Aucune inscription pour le moment'}
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Numero</TableHead>
                <TableHead>Eleve</TableHead>
                <TableHead>Classe</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInscriptions.map((ins) => (
                <TableRow key={ins.idInscription}>
                  <TableCell className="font-mono text-sm">{ins.numeroInscription}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">
                        {ins.elevePrenom} {ins.eleveNom}
                      </div>
                      <div className="text-sm text-gray-500">{ins.eleveMatricule}</div>
                    </div>
                  </TableCell>
                  <TableCell>{ins.classeNom}</TableCell>
                  <TableCell>{ins.dateInscription}</TableCell>
                  <TableCell>{formatMontant(ins.montantTotal)}</TableCell>
                  <TableCell>{getStatutBadge(ins.statutInscription)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleViewDetails(ins)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      {ins.statutInscription === 'VALIDEE' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleAnnulerClick(ins)}
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Create Dialog */}
      <CreateInscriptionDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSuccess={handleCreationSuccess}
      />

      {/* Details Dialog */}
      {selectedInscription && (
        <DetailsDialog
          open={isDetailsOpen}
          onOpenChange={setIsDetailsOpen}
          inscription={selectedInscription}
        />
      )}

      {/* Annulation Dialog */}
      {selectedInscription && (
        <AnnulationDialog
          open={isAnnulationOpen}
          onOpenChange={setIsAnnulationOpen}
          inscription={selectedInscription}
          onSuccess={handleAnnulationSuccess}
        />
      )}

      {/* Facture Dialog */}
      {factureData && (
        <FactureDialog
          open={isFactureOpen}
          onOpenChange={setIsFactureOpen}
          inscription={factureData}
        />
      )}
    </div>
  )
}

// =====================
// Create Inscription Dialog (4-step)
// =====================

const STEP_LABELS = [
  'Selectionner ou creer un eleve',
  'Associer un parent',
  'Selection de la classe',
  'Confirmation & paiement',
]
const TOTAL_STEPS = 4

function CreateInscriptionDialog({
  open,
  onOpenChange,
  onSuccess,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: (inscription: Inscription) => void
}) {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { user } = useAuth()

  // Data
  const [students, setStudents] = useState<EleveDto[]>([])
  const [classes, setClasses] = useState<ClasseDto[]>([])
  const [parents, setParents] = useState<Parent[]>([])
  const [villes, setVilles] = useState<Ville[]>([])
  const [quartiers, setQuartiers] = useState<Quartier[]>([])
  const [anneesScolaires, setAnneesScolaires] = useState<AnneeScolaireResponse[]>([])
  const [isLoadingData, setIsLoadingData] = useState(false)

  // Step 1: Student
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null)
  const [studentSearch, setStudentSearch] = useState('')
  const [studentMode, setStudentMode] = useState<'existing' | 'new'>('existing')
  const [newStudentForm, setNewStudentForm] = useState<CreateEleveRequest>({
    nom: '',
    prenom: '',
    dateNaissance: '',
    sexe: 'M',
    lieuNaissance: '',
    nationalite: 'Camerounaise',
  })
  const [studentVilleId, setStudentVilleId] = useState<number | null>(null)
  const [studentQuartiers, setStudentQuartiers] = useState<Quartier[]>([])
  const [isCreatingStudent, setIsCreatingStudent] = useState(false)

  // Step 2: Parent
  const [selectedParentId, setSelectedParentId] = useState<number | null>(null)
  const [parentSearch, setParentSearch] = useState('')
  const [parentMode, setParentMode] = useState<'existing' | 'new'>('existing')
  const [typeRelation, setTypeRelation] = useState<TypeRelation>('PERE')
  const [parentAlreadyLinked, setParentAlreadyLinked] = useState(false)
  const [newParentForm, setNewParentForm] = useState<ParentFormData>({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    adresse: '',
    quartierId: 0,
  })
  const [selectedVilleId, setSelectedVilleId] = useState<number | null>(null)
  const [isCreatingParent, setIsCreatingParent] = useState(false)
  const [createdParentCredentials, setCreatedParentCredentials] = useState<{
    email: string
    password: string
    nom: string
    prenom: string
  } | null>(null)
  const [copiedParentCredentials, setCopiedParentCredentials] = useState(false)

  // Step 3: Classe + Annee scolaire
  const [selectedClasseId, setSelectedClasseId] = useState<number | null>(null)
  const [selectedAnneeScolaireId, setSelectedAnneeScolaireId] = useState<number | null>(null)

  // Step 4: Tranches
  const [selectedTranches, setSelectedTranches] = useState<number[]>([1])

  const selectedStudent = students.find((s) => s.id === selectedStudentId)
  const selectedParent = parents.find((p) => p.idParent === selectedParentId)
  const selectedClasse = classes.find((c) => c.id === selectedClasseId)

  // Load data when dialog opens
  useEffect(() => {
    if (open) {
      loadData()
      resetForm()
    }
  }, [open])

  // Load quartiers when ville changes (parent form)
  useEffect(() => {
    if (selectedVilleId) {
      loadQuartiersByVille(selectedVilleId)
    } else {
      setQuartiers([])
    }
  }, [selectedVilleId])

  // Load quartiers when student ville changes
  useEffect(() => {
    if (studentVilleId) {
      locationService
        .getQuartiersByVille(studentVilleId)
        .then(setStudentQuartiers)
        .catch(() => setStudentQuartiers([]))
    } else {
      setStudentQuartiers([])
    }
  }, [studentVilleId])

  // Check if selected parent is already linked to selected student
  useEffect(() => {
    if (selectedStudentId && selectedParentId) {
      checkParentLink()
    }
  }, [selectedStudentId, selectedParentId])

  const loadData = async () => {
    setIsLoadingData(true)
    try {
      const [studentsData, classesData, parentsData, villesData] = await Promise.all([
        studentService.getAll(),
        classeService.getAll(),
        parentService.getParents(),
        locationService.getVilles(),
      ])
      setStudents(studentsData)
      setClasses(classesData.filter((c) => !c.statut || c.statut === 'ACTIVE'))
      setParents(parentsData)
      setVilles(villesData)
    } catch {
      toast.error('Erreur lors du chargement des donnees')
    }
    // Load annees scolaires separately (different API pattern)
    try {
      const tenant = user?.schoolId || ''
      const anneesData = await anneeScolaireService.getAll(tenant)
      setAnneesScolaires(anneesData)
      const activeYear = anneesData.find((a) => a.statut === true)
      if (activeYear) {
        setSelectedAnneeScolaireId(activeYear.id)
      }
    } catch {
      console.warn('Impossible de charger les annees scolaires')
    }
    setIsLoadingData(false)
  }

  const loadQuartiersByVille = async (villeId: number) => {
    try {
      const data = await locationService.getQuartiersByVille(villeId)
      setQuartiers(data)
    } catch {
      setQuartiers([])
    }
  }

  const checkParentLink = async () => {
    if (!selectedStudentId) return
    try {
      const relations = await parentService.getEleveParentsByEleve(Number(selectedStudentId))
      const alreadyLinked = relations.some((r) => r.parentId === selectedParentId)
      setParentAlreadyLinked(alreadyLinked)
    } catch {
      setParentAlreadyLinked(false)
    }
  }

  const resetForm = () => {
    setStep(1)
    setSelectedStudentId(null)
    setStudentSearch('')
    setStudentMode('existing')
    setNewStudentForm({
      nom: '',
      prenom: '',
      dateNaissance: '',
      sexe: 'M',
      lieuNaissance: '',
      nationalite: 'Camerounaise',
    })
    setStudentVilleId(null)
    setStudentQuartiers([])
    setSelectedParentId(null)
    setParentSearch('')
    setParentMode('existing')
    setTypeRelation('PERE')
    setParentAlreadyLinked(false)
    setNewParentForm({ nom: '', prenom: '', email: '', telephone: '', adresse: '', quartierId: 0 })
    setSelectedVilleId(null)
    setSelectedClasseId(null)
    setSelectedAnneeScolaireId(anneesScolaires.find((a) => a.statut)?.id || null)
    setSelectedTranches([1])
    setIsCreatingParent(false)
    setIsCreatingStudent(false)
    setCreatedParentCredentials(null)
    setCopiedParentCredentials(false)
  }

  // ---- Step 1 helpers ----
  const canProceedStep1 =
    studentMode === 'existing'
      ? selectedStudentId !== null
      : newStudentForm.nom.trim() !== '' &&
        newStudentForm.prenom.trim() !== '' &&
        newStudentForm.dateNaissance !== ''

  const handleCreateNewStudent = async (): Promise<boolean> => {
    setIsCreatingStudent(true)
    try {
      const created = await studentService.create(newStudentForm)
      setSelectedStudentId(created.id)
      setStudents((prev) => [...prev, created])
      toast.success(`Eleve ${created.prenom} ${created.nom} cree avec succes`)
      return true
    } catch {
      toast.error("Erreur lors de la creation de l'eleve")
      return false
    } finally {
      setIsCreatingStudent(false)
    }
  }

  // ---- Step 2 helpers ----
  const canProceedStep2 = selectedParentId !== null

  const handleCreateNewParent = async (): Promise<'created_with_credentials' | boolean> => {
    if (
      !newParentForm.nom ||
      !newParentForm.prenom ||
      !newParentForm.email ||
      !newParentForm.telephone ||
      !newParentForm.adresse ||
      !newParentForm.quartierId
    ) {
      toast.error('Veuillez remplir tous les champs obligatoires du parent')
      return false
    }
    setIsCreatingParent(true)
    try {
      const created = await parentService.createParent(newParentForm)
      setSelectedParentId(created.idParent)
      setParents((prev) => [...prev, created])
      toast.success(`Parent ${created.prenom} ${created.nom} cree avec succes`)
      if (created.generatedPassword) {
        setCreatedParentCredentials({
          email: created.email,
          password: created.generatedPassword,
          nom: created.nom,
          prenom: created.prenom,
        })
        setCopiedParentCredentials(false)
        setParentMode('existing')
        return 'created_with_credentials'
      }
      setParentMode('existing')
      return true
    } catch {
      toast.error('Erreur lors de la creation du parent')
      return false
    } finally {
      setIsCreatingParent(false)
    }
  }

  const linkParentToStudent = async (): Promise<boolean> => {
    if (!selectedStudentId || !selectedParentId || parentAlreadyLinked) return true
    try {
      await parentService.createEleveParent({
        eleveId: Number(selectedStudentId),
        parentId: selectedParentId,
        typeRelation,
        estPrincipal: true,
        autorisePriseEnCharge: true,
        autoriseUrgence: true,
      })
      return true
    } catch {
      toast.error("Erreur lors de l'association parent-eleve")
      return false
    }
  }

  // ---- Step 3 helpers ----
  const canProceedStep3 = selectedClasseId !== null && selectedAnneeScolaireId !== null

  // ---- Tranche toggle ----
  const handleTrancheToggle = (trancheNum: number) => {
    setSelectedTranches((prev) => {
      if (prev.includes(trancheNum)) {
        // Uncheck: remove this and all higher tranches
        return prev.filter((t) => t < trancheNum)
      } else {
        // Check: add this and all lower tranches
        const newTranches: number[] = []
        for (let i = 1; i <= trancheNum; i++) {
          newTranches.push(i)
        }
        return newTranches
      }
    })
  }

  // ---- Navigation ----
  const proceedAfterParentCredentials = async () => {
    setCreatedParentCredentials(null)
    // Link parent to student if not already linked
    const linkSuccess = await linkParentToStudent()
    if (!linkSuccess) return
    setStep((prev) => prev + 1)
  }

  const handleNextStep = async () => {
    if (step === 1 && studentMode === 'new') {
      const success = await handleCreateNewStudent()
      if (!success) return
    }
    if (step === 2) {
      if (parentMode === 'new') {
        const result = await handleCreateNewParent()
        if (!result) return
        // If credentials were generated, show modal — user will click "Continuer" to proceed
        if (result === 'created_with_credentials') return
      }
      // Link parent to student if not already linked
      const linkSuccess = await linkParentToStudent()
      if (!linkSuccess) return
    }
    setStep(step + 1)
  }

  const handleSubmit = async () => {
    if (!selectedStudentId || !selectedClasseId) return

    setIsSubmitting(true)
    try {
      const result = await inscriptionService.create({
        eleveId: Number(selectedStudentId),
        classeId: selectedClasseId,
        anneeScolaireId: selectedAnneeScolaireId || undefined,
        tranchesPayees: selectedTranches.length > 0 ? selectedTranches : undefined,
      })
      toast.success('Inscription creee avec succes')
      onSuccess(result)
    } catch {
      // Error already handled by apiClient toast
    } finally {
      setIsSubmitting(false)
    }
  }

  const filteredStudents = students.filter((s) => {
    const fullName = `${s.nom} ${s.prenom} ${s.matricule}`.toLowerCase()
    return fullName.includes(studentSearch.toLowerCase())
  })

  const filteredParents = parents.filter((p) => {
    const fullName = `${p.nom} ${p.prenom} ${p.telephone} ${p.matriculeParent}`.toLowerCase()
    return fullName.includes(parentSearch.toLowerCase())
  })

  const formatMontant = (montant: number) => {
    return new Intl.NumberFormat('fr-FR').format(montant) + ' FCFA'
  }

  const canProceedCurrentStep = () => {
    switch (step) {
      case 1:
        return canProceedStep1
      case 2:
        return canProceedStep2 || parentMode === 'new'
      case 3:
        return canProceedStep3
      default:
        return false
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Nouvelle inscription</DialogTitle>
            <DialogDescription>
              Etape {step} sur {TOTAL_STEPS} - {STEP_LABELS[step - 1]}
            </DialogDescription>
          </DialogHeader>

          {/* Progress bar */}
          <div className="mb-4 flex gap-2">
            {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((s) => (
              <div
                key={s}
                className={`h-2 flex-1 rounded-full transition-colors ${
                  s <= step ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>

          {isLoadingData ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : (
            <>
              {/* ========== Step 1: Select or Create Student ========== */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="flex overflow-hidden rounded-lg border">
                    <button
                      type="button"
                      className={`flex-1 px-4 py-2.5 text-sm font-medium transition-colors ${
                        studentMode === 'existing'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-600 hover:bg-gray-50'
                      }`}
                      onClick={() => {
                        setStudentMode('existing')
                        setSelectedStudentId(null)
                      }}
                    >
                      Eleve existant
                    </button>
                    <button
                      type="button"
                      className={`flex-1 px-4 py-2.5 text-sm font-medium transition-colors ${
                        studentMode === 'new'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-600 hover:bg-gray-50'
                      }`}
                      onClick={() => {
                        setStudentMode('new')
                        setSelectedStudentId(null)
                      }}
                    >
                      Nouvel eleve
                    </button>
                  </div>

                  {studentMode === 'existing' ? (
                    <>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input
                          placeholder="Rechercher un eleve par nom ou matricule..."
                          value={studentSearch}
                          onChange={(e) => setStudentSearch(e.target.value)}
                          className="pl-10"
                          autoComplete="off"
                        />
                      </div>
                      <div className="max-h-60 overflow-y-auto rounded-md border">
                        {filteredStudents.length === 0 ? (
                          <div className="p-4 text-center text-sm text-gray-500">
                            Aucun eleve trouve
                          </div>
                        ) : (
                          filteredStudents.map((student) => (
                            <div
                              key={student.id}
                              className={`flex cursor-pointer items-center justify-between border-b p-3 last:border-b-0 hover:bg-gray-50 ${
                                selectedStudentId === student.id ? 'border-blue-200 bg-blue-50' : ''
                              }`}
                              onClick={() => setSelectedStudentId(student.id)}
                            >
                              <div>
                                <div className="font-medium">
                                  {student.prenom} {student.nom}
                                </div>
                                <div className="text-sm text-gray-500">{student.matricule}</div>
                              </div>
                              {selectedStudentId === student.id && (
                                <CheckCircle className="h-5 w-5 text-blue-600" />
                              )}
                            </div>
                          ))
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="new-nom">Nom *</Label>
                          <Input
                            id="new-nom"
                            placeholder="Nom de famille"
                            value={newStudentForm.nom}
                            onChange={(e) =>
                              setNewStudentForm((prev) => ({ ...prev, nom: e.target.value }))
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-prenom">Prenom *</Label>
                          <Input
                            id="new-prenom"
                            placeholder="Prenom"
                            value={newStudentForm.prenom}
                            onChange={(e) =>
                              setNewStudentForm((prev) => ({ ...prev, prenom: e.target.value }))
                            }
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="new-date">Date de naissance *</Label>
                          <Input
                            id="new-date"
                            type="date"
                            value={newStudentForm.dateNaissance}
                            onChange={(e) =>
                              setNewStudentForm((prev) => ({
                                ...prev,
                                dateNaissance: e.target.value,
                              }))
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-sexe">Sexe *</Label>
                          <select
                            id="new-sexe"
                            value={newStudentForm.sexe}
                            onChange={(e) =>
                              setNewStudentForm((prev) => ({
                                ...prev,
                                sexe: e.target.value as 'M' | 'F',
                              }))
                            }
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            <option value="M">Masculin</option>
                            <option value="F">Feminin</option>
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="new-lieu">Lieu de naissance</Label>
                          <Input
                            id="new-lieu"
                            placeholder="Lieu de naissance"
                            value={newStudentForm.lieuNaissance || ''}
                            onChange={(e) =>
                              setNewStudentForm((prev) => ({
                                ...prev,
                                lieuNaissance: e.target.value,
                              }))
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-nationalite">Nationalite</Label>
                          <Input
                            id="new-nationalite"
                            placeholder="Nationalite"
                            value={newStudentForm.nationalite || ''}
                            onChange={(e) =>
                              setNewStudentForm((prev) => ({
                                ...prev,
                                nationalite: e.target.value,
                              }))
                            }
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Ville</Label>
                          <select
                            value={studentVilleId?.toString() || ''}
                            onChange={(e) => {
                              setStudentVilleId(e.target.value ? Number(e.target.value) : null)
                              setNewStudentForm((prev) => ({ ...prev, quartierId: undefined }))
                            }}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            <option value="">Selectionner une ville</option>
                            {villes.map((v) => (
                              <option key={v.id} value={v.id.toString()}>
                                {v.nom}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label>Quartier</Label>
                          <select
                            value={newStudentForm.quartierId?.toString() || ''}
                            onChange={(e) =>
                              setNewStudentForm((prev) => ({
                                ...prev,
                                quartierId: e.target.value ? Number(e.target.value) : undefined,
                              }))
                            }
                            disabled={!studentVilleId}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
                          >
                            <option value="">
                              {studentVilleId
                                ? 'Selectionner un quartier'
                                : "Choisir une ville d'abord"}
                            </option>
                            {studentQuartiers.map((q) => (
                              <option key={q.id} value={q.id.toString()}>
                                {q.nom}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ========== Step 2: Select or Create Parent ========== */}
              {step === 2 && (
                <div className="space-y-4">
                  <p className="text-sm text-gray-500">
                    Associer un parent a{' '}
                    <span className="font-medium">
                      {selectedStudent?.prenom} {selectedStudent?.nom}
                    </span>
                  </p>

                  <div className="flex overflow-hidden rounded-lg border">
                    <button
                      type="button"
                      className={`flex-1 px-4 py-2.5 text-sm font-medium transition-colors ${
                        parentMode === 'existing'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-600 hover:bg-gray-50'
                      }`}
                      onClick={() => {
                        setParentMode('existing')
                        setSelectedParentId(null)
                      }}
                    >
                      <Users className="mr-1 inline-block h-4 w-4" />
                      Parent existant
                    </button>
                    <button
                      type="button"
                      className={`flex-1 px-4 py-2.5 text-sm font-medium transition-colors ${
                        parentMode === 'new'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-600 hover:bg-gray-50'
                      }`}
                      onClick={() => {
                        setParentMode('new')
                        setSelectedParentId(null)
                      }}
                    >
                      <Plus className="mr-1 inline-block h-4 w-4" />
                      Nouveau parent
                    </button>
                  </div>

                  {parentMode === 'existing' ? (
                    <>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input
                          placeholder="Rechercher un parent par nom, telephone ou matricule..."
                          value={parentSearch}
                          onChange={(e) => setParentSearch(e.target.value)}
                          className="pl-10"
                          autoComplete="off"
                        />
                      </div>
                      <div className="max-h-48 overflow-y-auto rounded-md border">
                        {filteredParents.length === 0 ? (
                          <div className="p-4 text-center text-sm text-gray-500">
                            Aucun parent trouve.{' '}
                            <button
                              type="button"
                              className="text-blue-600 underline"
                              onClick={() => setParentMode('new')}
                            >
                              Creer un nouveau parent
                            </button>
                          </div>
                        ) : (
                          filteredParents.map((parent) => (
                            <div
                              key={parent.idParent}
                              className={`flex cursor-pointer items-center justify-between border-b p-3 last:border-b-0 hover:bg-gray-50 ${
                                selectedParentId === parent.idParent
                                  ? 'border-blue-200 bg-blue-50'
                                  : ''
                              }`}
                              onClick={() => setSelectedParentId(parent.idParent)}
                            >
                              <div>
                                <div className="font-medium">
                                  {parent.prenom} {parent.nom}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {parent.telephone} - {parent.email}
                                </div>
                              </div>
                              {selectedParentId === parent.idParent && (
                                <CheckCircle className="h-5 w-5 text-blue-600" />
                              )}
                            </div>
                          ))
                        )}
                      </div>

                      {/* Type de relation */}
                      {selectedParentId && !parentAlreadyLinked && (
                        <div className="space-y-2">
                          <Label>Type de relation avec l&apos;eleve *</Label>
                          <select
                            value={typeRelation}
                            onChange={(e) => setTypeRelation(e.target.value as TypeRelation)}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            {(Object.entries(TypeRelationLabels) as [TypeRelation, string][]).map(
                              ([key, label]) => (
                                <option key={key} value={key}>
                                  {label}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                      )}

                      {selectedParentId && parentAlreadyLinked && (
                        <Alert className="border-green-200 bg-green-50">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <AlertDescription className="text-green-800">
                            Ce parent est deja associe a cet eleve.
                          </AlertDescription>
                        </Alert>
                      )}
                    </>
                  ) : (
                    /* New parent form */
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <Label>Prenom *</Label>
                          <Input
                            placeholder="Prenom"
                            value={newParentForm.prenom}
                            onChange={(e) =>
                              setNewParentForm((prev) => ({ ...prev, prenom: e.target.value }))
                            }
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label>Nom *</Label>
                          <Input
                            placeholder="Nom"
                            value={newParentForm.nom}
                            onChange={(e) =>
                              setNewParentForm((prev) => ({ ...prev, nom: e.target.value }))
                            }
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <Label>Email *</Label>
                          <Input
                            type="email"
                            placeholder="email@exemple.com"
                            value={newParentForm.email}
                            onChange={(e) =>
                              setNewParentForm((prev) => ({ ...prev, email: e.target.value }))
                            }
                            autoComplete="off"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label>Telephone *</Label>
                          <Input
                            placeholder="+237 6XX XXX XXX"
                            value={newParentForm.telephone}
                            onChange={(e) =>
                              setNewParentForm((prev) => ({ ...prev, telephone: e.target.value }))
                            }
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <Label>Adresse *</Label>
                        <Input
                          placeholder="Adresse complete"
                          value={newParentForm.adresse}
                          onChange={(e) =>
                            setNewParentForm((prev) => ({ ...prev, adresse: e.target.value }))
                          }
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <Label>Ville *</Label>
                          <select
                            value={selectedVilleId?.toString() || ''}
                            onChange={(e) => {
                              setSelectedVilleId(Number(e.target.value))
                              setNewParentForm((prev) => ({ ...prev, quartierId: 0 }))
                            }}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            <option value="">Selectionner une ville</option>
                            {villes.map((v) => (
                              <option key={v.id} value={v.id.toString()}>
                                {v.nom}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <Label>Quartier *</Label>
                          <select
                            value={
                              newParentForm.quartierId ? newParentForm.quartierId.toString() : ''
                            }
                            onChange={(e) =>
                              setNewParentForm((prev) => ({
                                ...prev,
                                quartierId: Number(e.target.value),
                              }))
                            }
                            disabled={!selectedVilleId}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
                          >
                            <option value="">
                              {selectedVilleId ? 'Selectionner' : "Choisir une ville d'abord"}
                            </option>
                            {quartiers.map((q) => (
                              <option key={q.id} value={q.id.toString()}>
                                {q.nom}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <Label>Type de relation avec l&apos;eleve *</Label>
                        <select
                          value={typeRelation}
                          onChange={(e) => setTypeRelation(e.target.value as TypeRelation)}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          {(Object.entries(TypeRelationLabels) as [TypeRelation, string][]).map(
                            ([key, label]) => (
                              <option key={key} value={key}>
                                {label}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ========== Step 3: Select Class + Annee scolaire ========== */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Annee scolaire *</Label>
                    <select
                      value={selectedAnneeScolaireId?.toString() || ''}
                      onChange={(e) =>
                        setSelectedAnneeScolaireId(e.target.value ? Number(e.target.value) : null)
                      }
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <option value="">Selectionner une annee scolaire</option>
                      {anneesScolaires.map((a) => (
                        <option key={a.id} value={a.id.toString()}>
                          {a.libelle} {a.statut ? '(En cours)' : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                  <p className="text-sm text-gray-500">
                    Selectionner la classe pour{' '}
                    <span className="font-medium">
                      {selectedStudent?.prenom} {selectedStudent?.nom}
                    </span>
                  </p>
                  <div className="grid max-h-60 gap-3 overflow-y-auto">
                    {classes.map((classe) => {
                      const placesRestantes =
                        classe.capacite != null && classe.effectifActuel != null
                          ? classe.capacite - classe.effectifActuel
                          : null
                      const isFull = placesRestantes !== null && placesRestantes <= 0

                      return (
                        <Card
                          key={classe.id}
                          className={`cursor-pointer transition-colors ${
                            isFull
                              ? 'cursor-not-allowed opacity-50'
                              : selectedClasseId === classe.id
                                ? 'border-blue-500 bg-blue-50'
                                : 'hover:border-gray-400'
                          }`}
                          onClick={() => !isFull && setSelectedClasseId(classe.id)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium">{classe.nomClasse}</div>
                                <div className="text-sm text-gray-500">
                                  {classe.niveau}{' '}
                                  {classe.sousSysteme ? `- ${classe.sousSysteme}` : ''}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-semibold text-blue-600">
                                  {classe.fraisScolarite
                                    ? formatMontant(classe.fraisScolarite)
                                    : 'Non defini'}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {classe.effectifActuel || 0}/{classe.capacite || '?'} places
                                  {isFull && (
                                    <Badge className="ml-2 bg-red-100 text-red-800">Complet</Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* ========== Step 4: Confirmation & Tranche Selection ========== */}
              {step === 4 && selectedStudent && selectedClasse && (
                <div className="space-y-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Recapitulatif</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-sm text-gray-500">Eleve</span>
                          <p className="font-medium">
                            {selectedStudent.prenom} {selectedStudent.nom}
                          </p>
                          <p className="text-sm text-gray-500">{selectedStudent.matricule}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Parent</span>
                          <p className="font-medium">
                            {selectedParent
                              ? `${selectedParent.prenom} ${selectedParent.nom}`
                              : '-'}
                          </p>
                          <p className="text-sm text-gray-500">{selectedParent?.telephone}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Classe</span>
                          <p className="font-medium">{selectedClasse.nomClasse}</p>
                          <p className="text-sm text-gray-500">{selectedClasse.niveau}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Annee scolaire</span>
                          <p className="font-medium">
                            {anneesScolaires.find((a) => a.id === selectedAnneeScolaireId)
                              ?.libelle || '-'}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Frais de scolarite</span>
                          <p className="text-xl font-bold text-blue-600">
                            {selectedClasse.fraisScolarite
                              ? formatMontant(selectedClasse.fraisScolarite)
                              : 'Non defini'}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Tranche selection */}
                  {selectedClasse.fraisScolarite && (
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">Paiement des tranches</CardTitle>
                        <p className="text-sm text-gray-500">
                          Cochez les tranches que l&apos;eleve paie maintenant
                        </p>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {[
                          { num: 1, label: "Frais d'inscription", pct: 0.4 },
                          { num: 2, label: '1er versement trimestriel', pct: 0.3 },
                          { num: 3, label: '2eme versement trimestriel', pct: 0.3 },
                        ].map((tranche) => {
                          const montant = Math.round(selectedClasse.fraisScolarite! * tranche.pct)
                          const isChecked = selectedTranches.includes(tranche.num)
                          const isDisabled =
                            tranche.num > 1 && !selectedTranches.includes(tranche.num - 1)

                          return (
                            <div
                              key={tranche.num}
                              className={`flex items-center justify-between rounded-lg border p-3 transition-colors ${
                                isChecked
                                  ? 'border-green-300 bg-green-50'
                                  : isDisabled
                                    ? 'opacity-50'
                                    : ''
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <Checkbox
                                  id={`tranche-${tranche.num}`}
                                  checked={isChecked}
                                  disabled={isDisabled}
                                  onCheckedChange={() => handleTrancheToggle(tranche.num)}
                                />
                                <label
                                  htmlFor={`tranche-${tranche.num}`}
                                  className="cursor-pointer"
                                >
                                  <div className="text-sm font-medium">
                                    Tranche {tranche.num}: {tranche.label}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {Math.round(tranche.pct * 100)}% du montant total
                                  </div>
                                </label>
                              </div>
                              <div
                                className={`font-semibold ${isChecked ? 'text-green-700' : 'text-gray-600'}`}
                              >
                                {formatMontant(montant)}
                              </div>
                            </div>
                          )
                        })}

                        <div className="flex items-center justify-between border-t pt-3">
                          <span className="text-sm font-medium text-gray-700">
                            Total a payer maintenant
                          </span>
                          <span className="text-lg font-bold text-green-700">
                            {formatMontant(
                              selectedTranches.reduce((sum, t) => {
                                const pct = t === 1 ? 0.4 : 0.3
                                return sum + Math.round(selectedClasse.fraisScolarite! * pct)
                              }, 0)
                            )}
                          </span>
                        </div>

                        {selectedTranches.length < 3 && (
                          <div className="text-xs text-gray-500">
                            Reste a payer:{' '}
                            <span className="font-medium">
                              {formatMontant(
                                selectedClasse.fraisScolarite! -
                                  selectedTranches.reduce((sum, t) => {
                                    const pct = t === 1 ? 0.4 : 0.3
                                    return sum + Math.round(selectedClasse.fraisScolarite! * pct)
                                  }, 0)
                              )}
                            </span>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}

                  <Alert className="border-blue-200 bg-blue-50">
                    <AlertDescription className="text-sm text-blue-800">
                      Un compte eleve sera automatiquement cree. Les identifiants de connexion
                      seront affiches apres validation. Le parent sera notifie.
                    </AlertDescription>
                  </Alert>
                </div>
              )}
            </>
          )}

          <DialogFooter className="flex justify-between">
            <div>
              {step > 1 && (
                <Button variant="outline" onClick={() => setStep(step - 1)}>
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  Precedent
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Annuler
              </Button>
              {step < TOTAL_STEPS ? (
                <Button
                  onClick={handleNextStep}
                  disabled={!canProceedCurrentStep() || isCreatingStudent || isCreatingParent}
                >
                  {isCreatingStudent || isCreatingParent ? (
                    <>
                      <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                      Creation...
                    </>
                  ) : (
                    <>
                      Suivant
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </>
                  )}
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Inscription en cours...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Confirmer l&apos;inscription
                    </>
                  )}
                </Button>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal identifiants parent - affiché après création */}
      {createdParentCredentials && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              Compte parent cree avec succes
            </h3>
            <p className="mb-4 text-sm text-gray-600">
              Un compte a ete cree pour{' '}
              <strong>
                {createdParentCredentials.prenom} {createdParentCredentials.nom}
              </strong>
              . Voici les identifiants de connexion :
            </p>

            <div className="mb-4 space-y-3 rounded-xl bg-gray-50 p-4">
              <div>
                <p className="text-xs font-medium text-gray-500">Email (identifiant)</p>
                <p className="flex items-center gap-2 font-mono text-sm font-semibold text-gray-900">
                  <Mail className="h-4 w-4 text-[#2302B3]" />
                  {createdParentCredentials.email}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">Mot de passe</p>
                <p className="flex items-center gap-2 font-mono text-sm font-semibold text-gray-900">
                  <KeyRound className="h-4 w-4 text-[#2302B3]" />
                  {createdParentCredentials.password}
                </p>
              </div>
            </div>

            <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 p-3">
              <p className="text-xs text-amber-800">
                Partagez ces identifiants avec le parent. Il pourra se connecter et acceder a son
                espace parent.
              </p>
            </div>

            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                className="gap-2"
                onClick={async () => {
                  const text = `Identifiants DigiSchool\nEmail: ${createdParentCredentials.email}\nMot de passe: ${createdParentCredentials.password}`
                  try {
                    await navigator.clipboard.writeText(text)
                  } catch {
                    const textarea = document.createElement('textarea')
                    textarea.value = text
                    textarea.style.position = 'fixed'
                    textarea.style.opacity = '0'
                    document.body.appendChild(textarea)
                    textarea.select()
                    document.execCommand('copy')
                    document.body.removeChild(textarea)
                  }
                  setCopiedParentCredentials(true)
                  toast.success('Identifiants copies dans le presse-papiers')
                  setTimeout(() => setCopiedParentCredentials(false), 3000)
                }}
              >
                {copiedParentCredentials ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Copie
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copier
                  </>
                )}
              </Button>
              <Button
                className="bg-[#2302B3] hover:bg-[#1a0185]"
                onClick={proceedAfterParentCredentials}
              >
                Continuer
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// =====================
// Details Dialog
// =====================

function DetailsDialog({
  open,
  onOpenChange,
  inscription,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  inscription: Inscription
}) {
  const [fullInscription, setFullInscription] = useState<Inscription | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (open && inscription.idInscription) {
      loadDetails()
    }
  }, [open, inscription.idInscription])

  const loadDetails = async () => {
    setIsLoading(true)
    try {
      const data = await inscriptionService.getById(inscription.idInscription)
      setFullInscription(data)
    } catch {
      setFullInscription(inscription)
    } finally {
      setIsLoading(false)
    }
  }

  const data = fullInscription || inscription

  const formatMontant = (montant: number) => {
    return new Intl.NumberFormat('fr-FR').format(montant) + ' FCFA'
  }

  const getEcheanceStatutBadge = (statut: string) => {
    switch (statut) {
      case 'PAYEE':
        return <Badge className="bg-green-100 text-green-800">Payee</Badge>
      case 'EN_ATTENTE':
        return <Badge className="bg-yellow-100 text-yellow-800">En attente</Badge>
      case 'EN_RETARD':
        return <Badge className="bg-red-100 text-red-800">En retard</Badge>
      default:
        return <Badge variant="outline">{statut}</Badge>
    }
  }

  const handlePrint = () => {
    const printWindow = window.open('', '_blank')
    if (!printWindow) return

    printWindow.document.write(`
      <!DOCTYPE html>
      <html><head><title>Certificat de scolarite</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
        h1 { text-align: center; border-bottom: 2px solid #333; padding-bottom: 10px; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; }
        .info-item { margin-bottom: 10px; }
        .info-item label { font-weight: bold; color: #555; display: block; font-size: 12px; }
        .info-item span { font-size: 16px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f5f5f5; }
        .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #999; }
        .stamp { margin-top: 30px; text-align: right; }
        @media print { body { padding: 20px; } }
      </style></head><body>
      <h1>CERTIFICAT DE SCOLARITE</h1>
      <p style="text-align:center;color:#555;">N\u00b0 ${data.numeroInscription}</p>
      <div class="info-grid">
        <div class="info-item"><label>Eleve</label><span>${data.elevePrenom} ${data.eleveNom}</span></div>
        <div class="info-item"><label>Matricule</label><span>${data.eleveMatricule}</span></div>
        <div class="info-item"><label>Classe</label><span>${data.classeNom}</span></div>
        <div class="info-item"><label>Annee scolaire</label><span>${data.anneeScolaireLibelle || '-'}</span></div>
        <div class="info-item"><label>Date d'inscription</label><span>${data.dateInscription}</span></div>
        <div class="info-item"><label>Frais de scolarite</label><span>${formatMontant(data.montantTotal)}</span></div>
      </div>
      <h3>Echeancier de paiement</h3>
      <table>
        <thead><tr><th>N\u00b0</th><th>Libelle</th><th>Montant</th><th>Echeance</th><th>Statut</th></tr></thead>
        <tbody>
          ${(data.echeances || [])
            .map(
              (e) => `
            <tr>
              <td>${e.numero}</td>
              <td>${e.libelle}</td>
              <td>${formatMontant(e.montant)}</td>
              <td>${e.dateEcheance}</td>
              <td>${e.statut === 'PAYEE' ? 'Payee' : e.statut === 'EN_RETARD' ? 'En retard' : 'En attente'}</td>
            </tr>
          `
            )
            .join('')}
        </tbody>
      </table>
      <div class="stamp"><p>Fait le ${new Date().toLocaleDateString('fr-FR')}</p><br/><br/><p>_________________________</p><p>Signature du Directeur</p></div>
      <div class="footer"><p>Document genere automatiquement par DigiSchool</p></div>
      </body></html>
    `)
    printWindow.document.close()
    printWindow.print()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Details de l&apos;inscription</DialogTitle>
          <DialogDescription>N° {data.numeroInscription}</DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-500">Eleve</span>
                <p className="font-medium">
                  {data.elevePrenom} {data.eleveNom}
                </p>
                <p className="text-sm text-gray-500">{data.eleveMatricule}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Classe</span>
                <p className="font-medium">{data.classeNom}</p>
                <p className="text-sm text-gray-500">{data.classeNiveau}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Annee scolaire</span>
                <p className="font-medium">{data.anneeScolaireLibelle || '-'}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Date d&apos;inscription</span>
                <p className="font-medium">{data.dateInscription}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Montant total</span>
                <p className="font-medium text-blue-600">{formatMontant(data.montantTotal)}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Statut</span>
                <p>
                  {data.statutInscription === 'VALIDEE' && (
                    <Badge className="bg-green-100 text-green-800">Validee</Badge>
                  )}
                  {data.statutInscription === 'ANNULEE' && (
                    <Badge className="bg-red-100 text-red-800">Annulee</Badge>
                  )}
                  {data.statutInscription === 'EN_ATTENTE' && (
                    <Badge className="bg-yellow-100 text-yellow-800">En attente</Badge>
                  )}
                </p>
              </div>
            </div>

            {data.motifAnnulation && (
              <div className="border-t pt-3">
                <span className="text-sm text-gray-500">Motif d&apos;annulation</span>
                <p className="text-red-600">{data.motifAnnulation}</p>
              </div>
            )}

            {/* Echeancier */}
            {data.echeances && data.echeances.length > 0 && (
              <div className="border-t pt-3">
                <h4 className="mb-2 text-sm font-medium text-gray-700">Echeancier de paiement</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>N°</TableHead>
                      <TableHead>Libelle</TableHead>
                      <TableHead>Montant</TableHead>
                      <TableHead>Echeance</TableHead>
                      <TableHead>Statut</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.echeances.map((echeance) => (
                      <TableRow key={echeance.idEcheance}>
                        <TableCell>{echeance.numero}</TableCell>
                        <TableCell>{echeance.libelle}</TableCell>
                        <TableCell>{formatMontant(echeance.montant)}</TableCell>
                        <TableCell>{echeance.dateEcheance}</TableCell>
                        <TableCell>{getEcheanceStatutBadge(echeance.statut)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            Imprimer certificat
          </Button>
          <Button onClick={() => onOpenChange(false)}>Fermer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// =====================
// Annulation Dialog
// =====================

function AnnulationDialog({
  open,
  onOpenChange,
  inscription,
  onSuccess,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  inscription: Inscription
  onSuccess: () => void
}) {
  const [motif, setMotif] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (open) setMotif('')
  }, [open])

  const handleSubmit = async () => {
    if (!motif.trim()) {
      toast.error('Le motif est obligatoire')
      return
    }

    setIsSubmitting(true)
    try {
      await inscriptionService.annuler(inscription.idInscription, { motif })
      toast.success('Inscription annulee')
      onSuccess()
    } catch {
      // Error handled by apiClient
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-red-600">Annuler l&apos;inscription</DialogTitle>
          <DialogDescription>
            Vous allez annuler l&apos;inscription de{' '}
            <strong>
              {inscription.elevePrenom} {inscription.eleveNom}
            </strong>{' '}
            en {inscription.classeNom}. Cette action est irreversible.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Motif d&apos;annulation *</label>
            <Textarea
              value={motif}
              onChange={(e) => setMotif(e.target.value)}
              placeholder="Saisissez le motif de l'annulation..."
              rows={4}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Retour
          </Button>
          <Button
            variant="destructive"
            onClick={handleSubmit}
            disabled={isSubmitting || !motif.trim()}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Annulation...
              </>
            ) : (
              <>
                <XCircle className="mr-2 h-4 w-4" />
                Confirmer l&apos;annulation
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// =====================
// Facture Dialog (after inscription)
// =====================

function FactureDialog({
  open,
  onOpenChange,
  inscription,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  inscription: Inscription
}) {
  const [copiedCredentials, setCopiedCredentials] = useState(false)

  const formatMontant = (montant: number) => {
    return new Intl.NumberFormat('fr-FR').format(montant) + ' FCFA'
  }

  const echeances = inscription.echeances || []
  const totalPaye = echeances
    .filter((e) => e.statut === 'PAYEE')
    .reduce((sum, e) => sum + e.montant, 0)
  const resteAPayer = inscription.montantTotal - totalPaye

  const copyCredentials = () => {
    if (inscription.generatedEmail && inscription.generatedPassword) {
      navigator.clipboard.writeText(
        `Email: ${inscription.generatedEmail}\nMot de passe: ${inscription.generatedPassword}`
      )
      setCopiedCredentials(true)
      setTimeout(() => setCopiedCredentials(false), 3000)
    }
  }

  const handlePrintFacture = () => {
    const printWindow = window.open('', '_blank')
    if (!printWindow) return

    const echeancesRows = echeances
      .map(
        (e) => `
        <tr>
          <td style="padding:10px;border:1px solid #ddd;text-align:center">${e.numero}</td>
          <td style="padding:10px;border:1px solid #ddd">${e.libelle}</td>
          <td style="padding:10px;border:1px solid #ddd;text-align:right;font-weight:600">${formatMontant(e.montant)}</td>
          <td style="padding:10px;border:1px solid #ddd;text-align:center">${e.dateEcheance}</td>
          <td style="padding:10px;border:1px solid #ddd;text-align:center">
            <span style="padding:3px 10px;border-radius:12px;font-size:12px;font-weight:600;${
              e.statut === 'PAYEE'
                ? 'background:#dcfce7;color:#166534'
                : 'background:#fef9c3;color:#854d0e'
            }">${e.statut === 'PAYEE' ? 'Payee' : 'En attente'}</span>
          </td>
        </tr>`
      )
      .join('')

    printWindow.document.write(`
      <!DOCTYPE html>
      <html><head><title>Facture ${inscription.numeroInscription}</title>
      <style>
        * { margin:0; padding:0; box-sizing:border-box; }
        body { font-family:'Segoe UI',Arial,sans-serif; padding:30px; max-width:800px; margin:0 auto; color:#333; }
        .header { text-align:center; border-bottom:3px solid #2563eb; padding-bottom:15px; margin-bottom:20px; }
        .header h1 { font-size:22px; color:#2563eb; margin-bottom:4px; }
        .header p { color:#666; font-size:13px; }
        .facture-num { text-align:center; font-size:14px; color:#555; margin-bottom:20px; }
        .info-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:20px; }
        .info-box { background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:12px; }
        .info-box label { font-size:11px; color:#94a3b8; text-transform:uppercase; letter-spacing:0.5px; display:block; margin-bottom:4px; }
        .info-box span { font-size:15px; font-weight:600; }
        table { width:100%; border-collapse:collapse; margin:16px 0; }
        th { background:#2563eb; color:#fff; padding:10px; text-align:left; font-size:13px; }
        .summary { margin-top:16px; }
        .summary-row { display:flex; justify-content:space-between; padding:8px 12px; font-size:14px; }
        .summary-row.total { background:#2563eb; color:#fff; border-radius:6px; font-size:16px; font-weight:700; }
        .summary-row.paye { background:#dcfce7; color:#166534; border-radius:6px; font-weight:600; }
        .summary-row.reste { background:#fef2f2; color:#991b1b; border-radius:6px; font-weight:600; }
        .credentials { margin-top:20px; padding:12px; background:#eff6ff; border:1px solid #bfdbfe; border-radius:8px; }
        .credentials h3 { font-size:13px; color:#2563eb; margin-bottom:8px; }
        .credentials p { font-size:13px; margin:2px 0; }
        .footer { margin-top:30px; text-align:center; font-size:11px; color:#999; border-top:1px solid #eee; padding-top:15px; }
        .stamp { margin-top:25px; text-align:right; }
        @media print { body { padding:15px; } }
      </style></head><body>
      <div class="header">
        <h1>FACTURE D'INSCRIPTION</h1>
        <p>DigiSchool - Systeme de gestion scolaire</p>
      </div>
      <div class="facture-num">N\u00b0 <strong>${inscription.numeroInscription}</strong> | Date: <strong>${inscription.dateInscription}</strong></div>
      <div class="info-grid">
        <div class="info-box"><label>Eleve</label><span>${inscription.elevePrenom} ${inscription.eleveNom}</span></div>
        <div class="info-box"><label>Matricule</label><span>${inscription.eleveMatricule}</span></div>
        <div class="info-box"><label>Classe</label><span>${inscription.classeNom} (${inscription.classeNiveau})</span></div>
        <div class="info-box"><label>Annee scolaire</label><span>${inscription.anneeScolaireLibelle || '-'}</span></div>
      </div>
      <h3 style="font-size:14px;margin-bottom:8px;color:#333">Echeancier de paiement</h3>
      <table>
        <thead><tr>
          <th style="text-align:center;width:50px">N\u00b0</th>
          <th>Libelle</th>
          <th style="text-align:right">Montant</th>
          <th style="text-align:center">Date limite</th>
          <th style="text-align:center">Statut</th>
        </tr></thead>
        <tbody>${echeancesRows}</tbody>
      </table>
      <div class="summary">
        <div class="summary-row total"><span>Montant total</span><span>${formatMontant(inscription.montantTotal)}</span></div>
        <div class="summary-row paye" style="margin-top:6px"><span>Total paye</span><span>${formatMontant(totalPaye)}</span></div>
        ${resteAPayer > 0 ? `<div class="summary-row reste" style="margin-top:6px"><span>Reste a payer</span><span>${formatMontant(resteAPayer)}</span></div>` : ''}
      </div>
      ${
        inscription.generatedEmail
          ? `
      <div class="credentials">
        <h3>Identifiants du compte eleve</h3>
        <p><strong>Email:</strong> ${inscription.generatedEmail}</p>
        <p><strong>Mot de passe:</strong> ${inscription.generatedPassword || '-'}</p>
      </div>`
          : ''
      }
      <div class="stamp"><p>Fait le ${new Date().toLocaleDateString('fr-FR')}</p><br/><br/><p>_________________________</p><p>Signature du Directeur</p></div>
      <div class="footer"><p>Document genere automatiquement par DigiSchool</p></div>
      </body></html>
    `)
    printWindow.document.close()
    printWindow.print()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Inscription confirmee - Facture
          </DialogTitle>
          <DialogDescription>
            N° {inscription.numeroInscription} | {inscription.dateInscription}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Info eleve + classe */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border bg-gray-50 p-3">
              <span className="text-xs text-gray-500">Eleve</span>
              <p className="font-semibold">
                {inscription.elevePrenom} {inscription.eleveNom}
              </p>
              <p className="text-xs text-gray-500">{inscription.eleveMatricule}</p>
            </div>
            <div className="rounded-lg border bg-gray-50 p-3">
              <span className="text-xs text-gray-500">Classe</span>
              <p className="font-semibold">{inscription.classeNom}</p>
              <p className="text-xs text-gray-500">
                {inscription.classeNiveau} | {inscription.anneeScolaireLibelle}
              </p>
            </div>
          </div>

          {/* Echeancier */}
          <div>
            <h4 className="mb-2 text-sm font-semibold text-gray-700">Echeancier de paiement</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">N°</TableHead>
                  <TableHead>Libelle</TableHead>
                  <TableHead className="text-right">Montant</TableHead>
                  <TableHead className="text-center">Date limite</TableHead>
                  <TableHead className="text-center">Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {echeances.map((e) => (
                  <TableRow key={e.idEcheance}>
                    <TableCell className="text-center font-medium">{e.numero}</TableCell>
                    <TableCell>{e.libelle}</TableCell>
                    <TableCell className="text-right font-semibold">
                      {formatMontant(e.montant)}
                    </TableCell>
                    <TableCell className="text-center">{e.dateEcheance}</TableCell>
                    <TableCell className="text-center">
                      {e.statut === 'PAYEE' ? (
                        <Badge className="bg-green-100 text-green-800">Payee</Badge>
                      ) : (
                        <Badge className="bg-yellow-100 text-yellow-800">En attente</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Totaux */}
          <div className="space-y-2 rounded-lg border p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Montant total</span>
              <span className="text-lg font-bold text-blue-700">
                {formatMontant(inscription.montantTotal)}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-md bg-green-50 p-2">
              <span className="text-sm font-medium text-green-700">Total paye</span>
              <span className="font-bold text-green-700">{formatMontant(totalPaye)}</span>
            </div>
            {resteAPayer > 0 && (
              <div className="flex items-center justify-between rounded-md bg-red-50 p-2">
                <span className="text-sm font-medium text-red-700">Reste a payer</span>
                <span className="font-bold text-red-700">{formatMontant(resteAPayer)}</span>
              </div>
            )}
          </div>

          {/* Identifiants */}
          {inscription.generatedEmail && inscription.generatedPassword && (
            <div className="space-y-2 rounded-lg border border-blue-200 bg-blue-50 p-3">
              <div className="flex items-center gap-2">
                <KeyRound className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-800">
                  Identifiants du compte eleve
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-xs text-blue-600">Email</span>
                  <p className="font-mono text-sm font-medium">{inscription.generatedEmail}</p>
                </div>
                <div>
                  <span className="text-xs text-blue-600">Mot de passe</span>
                  <p className="font-mono text-sm font-medium">{inscription.generatedPassword}</p>
                </div>
              </div>
              <Button onClick={copyCredentials} variant="outline" size="sm" className="w-full">
                {copiedCredentials ? (
                  <>
                    <CheckCircle className="mr-2 h-3 w-3 text-green-600" /> Copie !
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-3 w-3" /> Copier les identifiants
                  </>
                )}
              </Button>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handlePrintFacture}>
            <Printer className="mr-2 h-4 w-4" />
            Imprimer la facture
          </Button>
          <Button onClick={() => onOpenChange(false)}>Fermer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
