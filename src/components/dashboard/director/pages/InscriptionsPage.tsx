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
  FileText,
  FileUp,
  CreditCard,
  User,
  Phone,
  MapPin,
  Calendar,
  Info,
  Stethoscope,
  GraduationCap,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
import { PhotoUpload } from '@/components/ui/photo-upload'
import { DocumentUpload } from '@/components/ui/document-upload'
import { fileService } from '@/services/file.service'
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
  const [isImportOpen, setIsImportOpen] = useState(false)

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
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsImportOpen(true)}>
            <FileUp className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Button onClick={() => setIsCreateOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Nouvelle inscription
          </Button>
        </div>
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
                    <div className="flex items-center gap-3">
                      {ins.elevePhotoUrl ? (
                        <div className="group relative">
                          <img
                            src={ins.elevePhotoUrl}
                            alt=""
                            className="h-10 w-10 rounded-full border border-gray-100 object-cover shadow-sm transition-transform group-hover:scale-110"
                            onError={(e) => {
                              ;(e.target as HTMLImageElement).src =
                                `https://ui-avatars.com/api/?name=${ins.elevePrenom}+${ins.eleveNom}&background=random`
                            }}
                          />
                        </div>
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-indigo-100 bg-indigo-50 text-[11px] font-bold text-indigo-500 shadow-inner">
                          {ins.elevePrenom[0]}
                          {ins.eleveNom[0]}
                        </div>
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="font-medium">
                            {ins.elevePrenom} {ins.eleveNom}
                          </div>
                          <div className="flex items-center gap-1">
                            {ins.eleveActeNaissanceUrl && (
                              <a
                                href={ins.eleveActeNaissanceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Acte de naissance"
                                className="text-red-500 hover:text-red-700"
                              >
                                <FileText className="h-3 w-3" />
                              </a>
                            )}
                            {ins.eleveCertificatMedicalUrl && (
                              <a
                                href={ins.eleveCertificatMedicalUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Certificat médical"
                                className="text-blue-500 hover:text-blue-700"
                              >
                                <Stethoscope className="h-3 w-3" />
                              </a>
                            )}
                            {ins.eleveBulletinUrl && (
                              <a
                                href={ins.eleveBulletinUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Dernier bulletin"
                                className="text-emerald-500 hover:text-emerald-700"
                              >
                                <GraduationCap className="h-3 w-3" />
                              </a>
                            )}
                          </div>
                        </div>
                        <div className="font-mono text-[11px] text-gray-500">
                          {ins.eleveMatricule}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-gray-900">{ins.classeNom}</div>
                      <div className="text-[11px] text-gray-500">{ins.classeNiveau}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{ins.dateInscription}</TableCell>
                  <TableCell className="font-semibold text-gray-900">
                    {formatMontant(ins.montantTotal)}
                  </TableCell>
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
    acteNaissanceUrl: '',
    certificatMedicalUrl: '',
    bulletinUrl: '',
  })
  const [studentVilleId, setStudentVilleId] = useState<number | null>(null)
  const [studentQuartiers, setStudentQuartiers] = useState<Quartier[]>([])
  const [isCreatingStudent, setIsCreatingStudent] = useState(false)
  const [studentPhotoUrl, setStudentPhotoUrl] = useState<string | null>(null)

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
  const [parentPhotoUrl, setParentPhotoUrl] = useState<string | null>(null)
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

  // Step 4: Tranches & Finances
  const [selectedTranches, setSelectedTranches] = useState<number[]>([1])
  const [remise, setRemise] = useState(0)
  const [transport, setTransport] = useState(0)
  const [cantine, setCantine] = useState(0)
  const [assurance, setAssurance] = useState(0)

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
      let anneesData = await anneeScolaireService.getAll(tenant)

      // Calculer l'année scolaire courante selon la date au Cameroun (UTC+1)
      const nowCameroon = new Date(
        new Date().toLocaleString('en-US', { timeZone: 'Africa/Douala' })
      )
      const month = nowCameroon.getMonth() + 1
      const year = nowCameroon.getFullYear()
      const startYear = month >= 9 ? year : year - 1
      const currentLabel = `${startYear}-${startYear + 1}`

      // Si aucune année scolaire n'existe, créer automatiquement l'année courante
      if (anneesData.length === 0 && tenant) {
        try {
          await anneeScolaireService.create({
            label: currentLabel,
            from: `${startYear}-09-01`,
            to: `${startYear + 1}-07-31`,
            current: true,
            tenantId: tenant,
          })
          anneesData = await anneeScolaireService.getAll(tenant)
        } catch {
          console.warn("Impossible de creer l'annee scolaire automatiquement")
        }
      }

      setAnneesScolaires(anneesData)

      // Auto-select: priorité à l'année active, sinon match par date Cameroun
      const activeYear = anneesData.find((a) => a.statut === true)
      if (activeYear) {
        setSelectedAnneeScolaireId(activeYear.id)
      } else {
        const matchedYear = anneesData.find((a) => a.libelle.includes(currentLabel))
        if (matchedYear) {
          setSelectedAnneeScolaireId(matchedYear.id)
        } else if (anneesData.length > 0) {
          setSelectedAnneeScolaireId(anneesData[anneesData.length - 1].id)
        }
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
    setRemise(0)
    setTransport(0)
    setCantine(0)
    setAssurance(0)
    setIsCreatingParent(false)
    setIsCreatingStudent(false)
    setCreatedParentCredentials(null)
    setCopiedParentCredentials(false)
    setStudentPhotoUrl(null)
    setParentPhotoUrl(null)
  }

  // ---- Step 1 helpers ----
  const canProceedStep1 =
    studentMode === 'existing'
      ? selectedStudentId !== null
      : newStudentForm.nom.trim() !== '' &&
        newStudentForm.prenom.trim() !== '' &&
        newStudentForm.dateNaissance !== '' &&
        studentPhotoUrl !== null

  const handleCreateNewStudent = async (): Promise<boolean> => {
    if (!studentPhotoUrl) {
      toast.error("Veuillez ajouter une photo de l'élève")
      return false
    }
    setIsCreatingStudent(true)
    try {
      const created = await studentService.create({ ...newStudentForm, photoUrl: studentPhotoUrl })
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
    if (!parentPhotoUrl) {
      toast.error('Veuillez ajouter une photo du parent')
      return false
    }
    setIsCreatingParent(true)
    try {
      const created = await parentService.createParent({
        ...newParentForm,
        photoUrl: parentPhotoUrl,
      })
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
        remise: remise > 0 ? remise : undefined,
        fraisTransport: transport > 0 ? transport : undefined,
        fraisCantine: cantine > 0 ? cantine : undefined,
        fraisAssurance: assurance > 0 ? assurance : undefined,
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
                    <PhotoUpload
                      label="Photo de l'élève"
                      required
                      currentPhotoUrl={studentPhotoUrl || undefined}
                      initials={
                        newStudentForm.prenom && newStudentForm.nom
                          ? `${newStudentForm.prenom[0]}${newStudentForm.nom[0]}`
                          : undefined
                      }
                      onPhotoSelected={async (file) => {
                        const result = await fileService.upload(file)
                        setStudentPhotoUrl(result.url)
                        return result.url
                      }}
                      onPhotoRemoved={() => setStudentPhotoUrl(null)}
                    />
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
                    <div className="space-y-4 border-t pt-4">
                      <Label className="text-sm font-semibold text-gray-700">
                        Documents numérisés
                      </Label>
                      <div className="grid grid-cols-2 gap-4">
                        <DocumentUpload
                          label="Acte de naissance"
                          onFileSelected={async (file) => {
                            const result = await fileService.upload(file)
                            setNewStudentForm((prev: any) => ({
                              ...prev,
                              acteNaissanceUrl: result.url,
                            }))
                            return result.url
                          }}
                          onFileRemoved={() =>
                            setNewStudentForm((prev: any) => ({ ...prev, acteNaissanceUrl: '' }))
                          }
                        />
                        <DocumentUpload
                          label="Certificat médical"
                          onFileSelected={async (file) => {
                            const result = await fileService.upload(file)
                            setNewStudentForm((prev: any) => ({
                              ...prev,
                              certificatMedicalUrl: result.url,
                            }))
                            return result.url
                          }}
                          onFileRemoved={() =>
                            setNewStudentForm((prev: any) => ({
                              ...prev,
                              certificatMedicalUrl: '',
                            }))
                          }
                        />
                        <DocumentUpload
                          label="Dernier bulletin"
                          onFileSelected={async (file) => {
                            const result = await fileService.upload(file)
                            setNewStudentForm((prev: any) => ({ ...prev, bulletinUrl: result.url }))
                            return result.url
                          }}
                          onFileRemoved={() =>
                            setNewStudentForm((prev: any) => ({ ...prev, bulletinUrl: '' }))
                          }
                        />
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
                    <PhotoUpload
                      label="Photo du parent"
                      required
                      currentPhotoUrl={parentPhotoUrl || undefined}
                      initials={
                        newParentForm.prenom && newParentForm.nom
                          ? `${newParentForm.prenom[0]}${newParentForm.nom[0]}`
                          : undefined
                      }
                      onPhotoSelected={async (file) => {
                        const result = await fileService.upload(file)
                        setParentPhotoUrl(result.url)
                        return result.url
                      }}
                      onPhotoRemoved={() => setParentPhotoUrl(null)}
                    />
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
                  {(() => {
                    const nowCameroon = new Date(
                      new Date().toLocaleString('en-US', { timeZone: 'Africa/Douala' })
                    )
                    const m = nowCameroon.getMonth() + 1
                    const y = nowCameroon.getFullYear()
                    const currentLabel = `${m >= 9 ? y : y - 1}-${m >= 9 ? y + 1 : y}`
                    return (
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
                            {a.libelle}{' '}
                            {a.statut
                              ? '(En cours)'
                              : a.libelle.includes(currentLabel)
                                ? '(Annee actuelle)'
                                : ''}
                          </option>
                        ))}
                      </select>
                    )
                  })()}
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
                          {selectedParent ? `${selectedParent.prenom} ${selectedParent.nom}` : '-'}
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
                          {anneesScolaires.find((a) => a.id === selectedAnneeScolaireId)?.libelle ||
                            '-'}
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
                      <div className="grid grid-cols-2 gap-4 border-t pt-4">
                        <div className="space-y-2">
                          <Label htmlFor="remise">Remise / Bourse (FCFA)</Label>
                          <Input
                            id="remise"
                            type="number"
                            min="0"
                            value={remise}
                            onChange={(e) => setRemise(Number(e.target.value))}
                            placeholder="Ex: 5000"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="transport">Frais transport (FCFA)</Label>
                          <Input
                            id="transport"
                            type="number"
                            min="0"
                            value={transport}
                            onChange={(e) => setTransport(Number(e.target.value))}
                            placeholder="Ex: 10000"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cantine">Frais cantine (FCFA)</Label>
                          <Input
                            id="cantine"
                            type="number"
                            min="0"
                            value={cantine}
                            onChange={(e) => setCantine(Number(e.target.value))}
                            placeholder="Ex: 15000"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="assurance">Frais assurance (FCFA)</Label>
                          <Input
                            id="assurance"
                            type="number"
                            min="0"
                            value={assurance}
                            onChange={(e) => setAssurance(Number(e.target.value))}
                            placeholder="Ex: 2000"
                          />
                        </div>
                      </div>

                      {[
                        { num: 1, label: "Frais d'inscription", pct: 0.4 },
                        { num: 2, label: '1er versement trimestriel', pct: 0.3 },
                        { num: 3, label: '2eme versement trimestriel', pct: 0.3 },
                      ].map((tranche) => {
                        const totalCalculated =
                          selectedClasse.fraisScolarite! - remise + transport + cantine + assurance
                        const montant = Math.round(totalCalculated * tranche.pct)
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
                              <label htmlFor={`tranche-${tranche.num}`} className="cursor-pointer">
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
                              const totalCalc =
                                selectedClasse.fraisScolarite! -
                                remise +
                                transport +
                                cantine +
                                assurance
                              return sum + Math.round(totalCalc * pct)
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
                                remise +
                                transport +
                                cantine +
                                assurance -
                                selectedTranches.reduce((sum, t) => {
                                  const pct = t === 1 ? 0.4 : 0.3
                                  const totalCalc =
                                    selectedClasse.fraisScolarite! -
                                    remise +
                                    transport +
                                    cantine +
                                    assurance
                                  return sum + Math.round(totalCalc * pct)
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
                    Un compte eleve sera automatiquement cree. Les identifiants de connexion seront
                    affiches apres validation. Le parent sera notifie.
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

        {/* Modal identifiants parent - à l'intérieur du DialogContent pour éviter le focus trap */}
        {createdParentCredentials && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center bg-white/95 p-6 duration-300 animate-in fade-in zoom-in">
            <div className="w-full max-w-md space-y-5">
              {/* Header avec boutons en haut - comme demandé */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 shadow-sm">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold leading-tight text-gray-900">
                      Compte parent créé
                    </h3>
                    <p className="text-sm font-medium text-gray-500">
                      {createdParentCredentials.prenom} {createdParentCredentials.nom}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 gap-2 border-2 font-semibold transition-all hover:bg-gray-50 active:scale-95"
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
                      toast.success('Identifiants copiés avec succès')
                      setTimeout(() => setCopiedParentCredentials(false), 3000)
                    }}
                  >
                    {copiedParentCredentials ? (
                      <>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Copié
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copier
                      </>
                    )}
                  </Button>
                  <Button
                    size="sm"
                    className="h-9 gap-2 bg-[#2302B3] font-semibold shadow-md transition-all hover:bg-[#1a0185] active:scale-95"
                    onClick={async () => {
                      // On copie aussi au clic sur continuer comme suggéré
                      const text = `Identifiants DigiSchool\nEmail: ${createdParentCredentials.email}\nMot de passe: ${createdParentCredentials.password}`
                      try {
                        await navigator.clipboard.writeText(text)
                      } catch {
                        /* ignore */
                      }
                      proceedAfterParentCredentials()
                    }}
                  >
                    Continuer
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-3 rounded-2xl border border-gray-100 bg-gray-50/80 p-5 shadow-inner">
                <div
                  className="group cursor-pointer rounded-xl border border-transparent bg-white p-3 transition-all hover:border-[#2302B3]/20 hover:shadow-sm"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(createdParentCredentials.email)
                    } catch {
                      /* ignore */
                    }
                    toast.success('Email copié')
                  }}
                >
                  <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                    Email (Identifiant)
                  </p>
                  <p className="flex items-center gap-3 font-mono text-sm font-bold text-gray-900">
                    <Mail className="h-4 w-4 text-[#2302B3]" />
                    <span className="truncate">{createdParentCredentials.email}</span>
                    <Copy className="ml-auto h-3.5 w-3.5 text-gray-300 transition-colors group-hover:text-[#2302B3]" />
                  </p>
                </div>

                <div
                  className="group cursor-pointer rounded-xl border border-transparent bg-white p-3 transition-all hover:border-[#2302B3]/20 hover:shadow-sm"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(createdParentCredentials.password)
                    } catch {
                      /* ignore */
                    }
                    toast.success('Mot de passe copié')
                  }}
                >
                  <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                    Mot de passe
                  </p>
                  <p className="flex items-center gap-3 font-mono text-sm font-bold text-gray-900">
                    <KeyRound className="h-4 w-4 text-[#2302B3]" />
                    <span>{createdParentCredentials.password}</span>
                    <Copy className="ml-auto h-3.5 w-3.5 text-gray-300 transition-colors group-hover:text-[#2302B3]" />
                  </p>
                </div>
              </div>

              <div className="rounded-xl border-l-4 border-amber-400 bg-amber-50 p-4 shadow-sm">
                <p className="text-xs font-medium leading-relaxed text-amber-900">
                  <span className="font-bold underline">Important :</span> Communiquez ces
                  identifiants au parent pour qu&apos;il puisse accéder à son espace personnel
                  DigiSchool.
                </p>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
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
            <Tabs defaultValue="eleve" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="eleve">Eleve</TabsTrigger>
                <TabsTrigger value="parents">Parents</TabsTrigger>
                <TabsTrigger value="finances">Finances</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>

              {/* Onglet Eleve */}
              <TabsContent value="eleve" className="space-y-4 pt-4">
                <div className="flex items-center gap-4 border-b pb-4">
                  {data.elevePhotoUrl ? (
                    <img
                      src={data.elevePhotoUrl}
                      alt="Photo eleve"
                      className="h-20 w-20 rounded-full border-2 border-white object-cover shadow-md"
                      onError={(e) => {
                        ;(e.target as HTMLImageElement).src =
                          `https://ui-avatars.com/api/?name=${data.elevePrenom}+${data.eleveNom}&background=random&size=128`
                      }}
                    />
                  ) : (
                    <div className="flex h-20 w-20 items-center justify-center rounded-full border border-indigo-100 bg-indigo-50 shadow-inner">
                      <User className="h-10 w-10 text-indigo-400" />
                    </div>
                  )}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {data.elevePrenom} {data.eleveNom}
                    </h3>
                    <p className="font-mono text-sm text-gray-500">{data.eleveMatricule}</p>
                    <div className="mt-1">
                      {data.statutInscription === 'VALIDEE' && (
                        <Badge className="bg-green-100 text-green-800">Validee</Badge>
                      )}
                      {data.statutInscription === 'ANNULEE' && (
                        <Badge className="bg-red-100 text-red-800">Annulee</Badge>
                      )}
                      {data.statutInscription === 'EN_ATTENTE' && (
                        <Badge className="bg-yellow-100 text-yellow-800">En attente</Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                  <div className="space-y-1">
                    <Label className="flex items-center gap-2 text-gray-500">
                      <Calendar className="h-4 w-4" /> Date de naissance
                    </Label>
                    <p className="font-medium">{data.eleveDateNaissance || '-'}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="flex items-center gap-2 text-gray-500">
                      <MapPin className="h-4 w-4" /> Lieu de naissance
                    </Label>
                    <p className="font-medium">{data.eleveLieuNaissance || '-'}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="flex items-center gap-2 text-gray-500">
                      <User className="h-4 w-4" /> Sexe
                    </Label>
                    <p className="font-medium">{data.eleveSexe || '-'}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="flex items-center gap-2 text-gray-500">
                      <Info className="h-4 w-4" /> Nationalite
                    </Label>
                    <p className="font-medium">{data.eleveNationalite || '-'}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="flex items-center gap-2 text-gray-500">
                      <MapPin className="h-4 w-4" /> Adresse / Quartier
                    </Label>
                    <p className="font-medium">
                      {data.eleveQuartier}
                      {data.eleveVille ? `, ${data.eleveVille}` : ''}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <Label className="flex items-center gap-2 text-gray-500">
                      <Calendar className="h-4 w-4" /> Inscrit le
                    </Label>
                    <p className="font-medium">{data.dateInscription}</p>
                  </div>
                </div>

                <div className="rounded-lg bg-blue-50 p-4">
                  <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-blue-800">
                    Informations Académiques
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-xs text-blue-600">Classe</span>
                      <p className="font-bold text-blue-900">{data.classeNom}</p>
                    </div>
                    <div>
                      <span className="text-xs text-blue-600">Niveau</span>
                      <p className="font-bold text-blue-900">{data.classeNiveau}</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Onglet Parents */}
              <TabsContent value="parents" className="space-y-4 pt-4">
                {data.parents && data.parents.length > 0 ? (
                  <div className="space-y-4">
                    {data.parents.map((p, idx) => (
                      <div key={idx} className="rounded-xl border bg-white p-4 shadow-sm">
                        <div className="mb-2 flex items-center justify-between">
                          <h4 className="flex items-center gap-2 font-bold text-gray-900">
                            <Users className="h-4 w-4 text-gray-400" />
                            {p.prenom} {p.nom}
                          </h4>
                          {p.principal && (
                            <Badge className="bg-amber-100 text-amber-800">Principal</Badge>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-y-2 text-sm">
                          <p className="flex items-center gap-2 text-gray-600">
                            <Info className="h-3.5 w-3.5" /> {p.relation || 'Relation'}
                          </p>
                          <p className="flex items-center gap-2 font-mono text-xs text-gray-500">
                            ID: {p.matricule}
                          </p>
                          <p className="flex items-center gap-2 text-gray-600">
                            <Phone className="h-3.5 w-3.5" /> {p.telephone}
                          </p>
                          <p className="flex items-center gap-2 text-gray-600">
                            <Mail className="h-3.5 w-3.5" /> {p.email}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                    <Users className="mb-2 h-12 w-12 opacity-20" />
                    <p>Aucun parent associe</p>
                  </div>
                )}
              </TabsContent>

              {/* Onglet Finances */}
              <TabsContent value="finances" className="space-y-6 pt-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="rounded-lg bg-gray-50 p-3 text-center">
                    <span className="text-[10px] font-bold uppercase text-gray-400">Total</span>
                    <p className="font-bold text-gray-900">{formatMontant(data.montantTotal)}</p>
                  </div>
                  <div className="rounded-lg bg-green-50 p-3 text-center">
                    <span className="text-[10px] font-bold uppercase text-green-600">Payé</span>
                    <p className="font-bold text-green-700">
                      {formatMontant(
                        (data.echeances || [])
                          .filter((e) => e.statut === 'PAYEE')
                          .reduce((sum, e) => sum + e.montant, 0)
                      )}
                    </p>
                  </div>
                  <div className="rounded-lg bg-red-50 p-3 text-center">
                    <span className="text-[10px] font-bold uppercase text-red-600">Reste</span>
                    <p className="font-bold text-red-700">
                      {formatMontant(
                        data.montantTotal -
                          (data.echeances || [])
                            .filter((e) => e.statut === 'PAYEE')
                            .reduce((sum, e) => sum + e.montant, 0)
                      )}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-gray-700">Détails de la scolarité</h4>
                  <div className="overflow-hidden rounded-lg border bg-white">
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell className="py-2 text-sm text-gray-500">
                            Frais de scolarité
                          </TableCell>
                          <TableCell className="py-2 text-right font-medium">
                            {formatMontant(data.fraisScolarite || 0)}
                          </TableCell>
                        </TableRow>
                        {data.remise && (
                          <TableRow>
                            <TableCell className="py-2 text-sm text-red-500">
                              Remise / Bourse
                            </TableCell>
                            <TableCell className="py-2 text-right font-medium text-red-600">
                              -{formatMontant(data.remise)}
                            </TableCell>
                          </TableRow>
                        )}
                        {data.fraisTransport && (
                          <TableRow>
                            <TableCell className="py-2 text-sm text-gray-500">
                              Frais transport
                            </TableCell>
                            <TableCell className="py-2 text-right font-medium">
                              {formatMontant(data.fraisTransport)}
                            </TableCell>
                          </TableRow>
                        )}
                        {data.fraisCantine && (
                          <TableRow>
                            <TableCell className="py-2 text-sm text-gray-500">
                              Frais cantine
                            </TableCell>
                            <TableCell className="py-2 text-right font-medium">
                              {formatMontant(data.fraisCantine)}
                            </TableCell>
                          </TableRow>
                        )}
                        {data.fraisAssurance && (
                          <TableRow>
                            <TableCell className="py-2 text-sm text-gray-500">
                              Frais assurance
                            </TableCell>
                            <TableCell className="py-2 text-right font-medium">
                              {formatMontant(data.fraisAssurance)}
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-gray-700">Echéancier</h4>
                  <div className="overflow-hidden rounded-lg border bg-white">
                    <Table>
                      <TableHeader className="bg-gray-50">
                        <TableRow>
                          <TableHead className="h-9 py-0">Libelle</TableHead>
                          <TableHead className="h-9 py-0 text-right">Montant</TableHead>
                          <TableHead className="h-9 py-0 text-center">Echeance</TableHead>
                          <TableHead className="h-9 py-0 text-center">Statut</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {(data.echeances || []).map((echeance) => (
                          <TableRow key={echeance.idEcheance}>
                            <TableCell className="py-2 text-sm">{echeance.libelle}</TableCell>
                            <TableCell className="py-2 text-right text-sm">
                              {formatMontant(echeance.montant)}
                            </TableCell>
                            <TableCell className="py-2 text-center text-xs">
                              {echeance.dateEcheance}
                            </TableCell>
                            <TableCell className="py-2 text-center">
                              {getEcheanceStatutBadge(echeance.statut)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </TabsContent>

              {/* Onglet Documents */}
              <TabsContent value="documents" className="pt-4">
                <div className="grid grid-cols-2 gap-4">
                  {data.eleveActeNaissanceUrl && (
                    <a
                      href={data.eleveActeNaissanceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col items-center gap-3 rounded-xl border p-4 transition-all hover:bg-gray-50"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500 transition-colors group-hover:bg-red-100">
                        <FileText className="h-6 w-6" />
                      </div>
                      <span className="text-xs font-bold text-gray-700">Acte de naissance</span>
                    </a>
                  )}
                  {data.eleveCertificatMedicalUrl && (
                    <a
                      href={data.eleveCertificatMedicalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col items-center gap-3 rounded-xl border p-4 transition-all hover:bg-gray-50"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-500 transition-colors group-hover:bg-blue-100">
                        <FileText className="h-6 w-6" />
                      </div>
                      <span className="text-xs font-bold text-gray-700">Certificat médical</span>
                    </a>
                  )}
                  {data.eleveBulletinUrl && (
                    <a
                      href={data.eleveBulletinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col items-center gap-3 rounded-xl border p-4 transition-all hover:bg-gray-50"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 transition-colors group-hover:bg-emerald-100">
                        <FileText className="h-6 w-6" />
                      </div>
                      <span className="text-xs font-bold text-gray-700">Dernier bulletin</span>
                    </a>
                  )}
                  {!data.eleveActeNaissanceUrl &&
                    !data.eleveCertificatMedicalUrl &&
                    !data.eleveBulletinUrl && (
                      <div className="col-span-2 flex flex-col items-center justify-center py-10 text-gray-400">
                        <FileUp className="mb-2 h-12 w-12 opacity-20" />
                        <p>Aucun document numerise</p>
                      </div>
                    )}
                </div>
              </TabsContent>
            </Tabs>

            {data.motifAnnulation && (
              <Alert variant="destructive" className="mt-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Motif d&apos;annulation :</strong> {data.motifAnnulation}
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={async () => {
              try {
                await studentService.downloadCard(Number(data.eleveId))
              } catch {
                toast.error('Erreur lors du téléchargement de la carte')
              }
            }}
          >
            <CreditCard className="mr-2 h-4 w-4" />
            Télécharger la carte
          </Button>
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
        `Matricule: ${inscription.eleveMatricule}\nEmail: ${inscription.generatedEmail}\nMot de passe: ${inscription.generatedPassword}`
      )
      setCopiedCredentials(true)
      setTimeout(() => setCopiedCredentials(false), 3000)
    }
  }

  const handlePrintFacture = () => {
    const printWindow = window.open('', '_blank')
    if (!printWindow) return

    const extraFeesRows = [
      { label: 'Frais de scolarité', amount: inscription.fraisScolarite || 0 },
      { label: 'Remise / Bourse (FCFA)', amount: -(inscription.remise || 0) },
      { label: 'Frais transport (FCFA)', amount: inscription.fraisTransport || 0 },
      { label: 'Frais cantine (FCFA)', amount: inscription.fraisCantine || 0 },
      { label: 'Frais assurance (FCFA)', amount: inscription.fraisAssurance || 0 },
    ]
      .filter((f) => f.amount !== 0)
      .map(
        (f) => `
        <tr style="background:#f8fafc">
          <td colspan="2" style="padding:8px 10px;border:1px solid #ddd;font-size:12px;color:#666">${f.label}</td>
          <td style="padding:8px 10px;border:1px solid #ddd;text-align:right;font-size:12px;font-weight:600;${f.amount < 0 ? 'color:#dc2626' : ''}">${formatMontant(f.amount)}</td>
          <td colspan="2" style="border:1px solid #ddd"></td>
        </tr>`
      )
      .join('')

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
        <tbody>
          ${extraFeesRows}
          <tr style="height:10px"><td colspan="5" style="border:none"></td></tr>
          ${echeancesRows}
        </tbody>
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
        <p><strong>Matricule:</strong> ${inscription.eleveMatricule}</p>
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

          {/* Détail des frais */}
          <div className="rounded-lg border bg-gray-50/50 p-3">
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Détail des frais
            </h4>
            <div className="space-y-1.5">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Frais de scolarité</span>
                <span className="font-medium">
                  {formatMontant(inscription.fraisScolarite || 0)}
                </span>
              </div>
              {inscription.remise ? (
                <div className="flex justify-between text-sm text-red-600">
                  <span>Remise</span>
                  <span className="font-medium">- {formatMontant(inscription.remise)}</span>
                </div>
              ) : null}
              {inscription.fraisTransport ? (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Transport</span>
                  <span className="font-medium">{formatMontant(inscription.fraisTransport)}</span>
                </div>
              ) : null}
              {inscription.fraisCantine ? (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Cantine</span>
                  <span className="font-medium">{formatMontant(inscription.fraisCantine)}</span>
                </div>
              ) : null}
              {inscription.fraisAssurance ? (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Assurance</span>
                  <span className="font-medium">{formatMontant(inscription.fraisAssurance)}</span>
                </div>
              ) : null}
            </div>
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
                <div className="col-span-2">
                  <span className="text-xs text-blue-600">Matricule</span>
                  <p className="font-mono text-sm font-bold text-blue-900">
                    {inscription.eleveMatricule}
                  </p>
                </div>
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

// =====================
// Import Dialog
// =====================

function ImportDialog({
  open,
  onOpenChange,
  onSuccess,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}) {
  const [file, setFile] = useState<File | null>(null)
  const [isImporting, setIsImporting] = useState(false)
  const [results, setResults] = useState<
    { status: string; message: string; matricule?: string }[] | null
  >(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleImport = async () => {
    if (!file) return
    setIsImporting(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/api/v1/students/import`,
        {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('auth-storage') ? JSON.parse(localStorage.getItem('auth-storage')!).state.token : ''}`,
          },
        }
      )

      if (!res.ok) throw new Error("Erreur lors de l'importation")
      const data = await res.json()
      setResults(data)
      toast.success('Importation terminee')
    } catch {
      toast.error("Une erreur s'est produite lors de l'importation")
    } finally {
      setIsImporting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Importation massive d&apos;eleves</DialogTitle>
          <DialogDescription>
            Telechargez un fichier Excel (.xlsx) contenant les colonnes: nom, prenom, sexe (M/F),
            date de naissance (AAAA-MM-JJ), lieu de naissance, nationalite.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {!results ? (
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 p-8">
              <input
                type="file"
                accept=".xlsx"
                onChange={handleFileChange}
                className="hidden"
                id="excel-upload"
              />
              <label
                htmlFor="excel-upload"
                className="flex cursor-pointer flex-col items-center hover:text-blue-600"
              >
                <Printer className="mb-2 h-10 w-10 text-gray-400" />
                <span className="text-sm font-medium">
                  {file ? file.name : 'Cliquez pour choisir un fichier Excel'}
                </span>
                <span className="mt-1 text-xs text-gray-500">Format supporte: .xlsx</span>
              </label>
            </div>
          ) : (
            <div className="max-h-60 overflow-y-auto rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Statut</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Matricule</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((r, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        {r.status === 'SUCCESS' ? (
                          <Badge className="bg-green-100 text-green-800">Succes</Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-800">Erreur</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-sm">{r.message}</TableCell>
                      <TableCell className="font-mono text-xs">{r.matricule || '-'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>

        <DialogFooter>
          {results ? (
            <Button
              onClick={() => {
                setResults(null)
                setFile(null)
                onSuccess()
              }}
            >
              Terminer
            </Button>
          ) : (
            <>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Annuler
              </Button>
              <Button onClick={handleImport} disabled={!file || isImporting}>
                {isImporting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Importation...
                  </>
                ) : (
                  "Lancer l'importation"
                )}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
