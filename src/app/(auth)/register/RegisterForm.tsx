'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { ArrowRight, ArrowLeft, LayoutDashboard, Quote, CheckCircle2, Loader2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { apiClient } from '@/lib/api/client'
import { API_ENDPOINTS } from '@/lib/api/config'

interface GeoItem {
  id: number
  nom: string
  code?: string
}

const TYPE_SECTEUR_OPTIONS = [
  { value: 'PUBLIC', label: 'Public' },
  { value: 'PRIVE_LAIC', label: 'Privé laïque' },
  { value: 'PRIVE_CONFESSIONNEL', label: 'Privé confessionnel' },
  { value: 'PRIVE_COMMUNAUTAIRE', label: 'Communautaire' },
]

const TYPE_ETABLISSEMENT_OPTIONS = [
  { value: 'MATERNELLE', label: 'Maternelle' },
  { value: 'PRIMAIRE', label: 'Primaire' },
  { value: 'SECONDAIRE_GENERAL', label: 'Secondaire général' },
  { value: 'SECONDAIRE_TECHNIQUE', label: 'Secondaire technique' },
  { value: 'BILINGUE', label: 'Bilingue' },
  { value: 'COMPLEXE_SCOLAIRE', label: 'Complexe scolaire' },
]

const SOUS_SYSTEME_OPTIONS = [
  { value: 'FRANCOPHONE', label: 'Francophone' },
  { value: 'ANGLOPHONE', label: 'Anglophone' },
  { value: 'BILINGUE', label: 'Bilingue' },
]

export default function RegisterForm() {
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const totalSteps = 3
  const [isLoading, setIsLoading] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Geographic cascade data
  const [regions, setRegions] = useState<GeoItem[]>([])
  const [departements, setDepartements] = useState<GeoItem[]>([])
  const [arrondissements, setArrondissements] = useState<GeoItem[]>([])
  const [villes, setVilles] = useState<GeoItem[]>([])
  const [quartiers, setQuartiers] = useState<GeoItem[]>([])
  const [geoLoading, setGeoLoading] = useState<string | null>(null)

  // Auto-slide carousel (2 slides)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 2)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const [formData, setFormData] = useState({
    schoolName: '',
    typeSecteur: '',
    typeEtablissement: '',
    sousSysteme: '',
    regionId: '',
    departementId: '',
    arrondissementId: '',
    villeId: '',
    quartierId: '',
    adresse: '',
    boitePostale: '',
    schoolPhone: '',
    schoolEmail: '',
    studentsCount: '',
    anneeFondation: '',
    numeroAutorisation: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  })

  // Load regions on mount
  useEffect(() => {
    async function loadRegions() {
      try {
        const data = await apiClient.get<GeoItem[]>(API_ENDPOINTS.localisation.regions)
        setRegions(data)
      } catch {
        // Fail silently, user can retry
      }
    }
    loadRegions()
  }, [])

  // Cascade: load departements when region changes
  const loadDepartements = useCallback(async (regionId: string) => {
    if (!regionId) {
      setDepartements([])
      return
    }
    setGeoLoading('departements')
    try {
      const data = await apiClient.get<GeoItem[]>(
        API_ENDPOINTS.localisation.departementsByRegion(Number(regionId))
      )
      setDepartements(data)
    } catch {
      setDepartements([])
    } finally {
      setGeoLoading(null)
    }
  }, [])

  const loadArrondissements = useCallback(async (deptId: string) => {
    if (!deptId) {
      setArrondissements([])
      return
    }
    setGeoLoading('arrondissements')
    try {
      const data = await apiClient.get<GeoItem[]>(
        API_ENDPOINTS.localisation.arrondissementsByDepartement(Number(deptId))
      )
      setArrondissements(data)
    } catch {
      setArrondissements([])
    } finally {
      setGeoLoading(null)
    }
  }, [])

  const loadVilles = useCallback(async (arrId: string) => {
    if (!arrId) {
      setVilles([])
      return
    }
    setGeoLoading('villes')
    try {
      const data = await apiClient.get<GeoItem[]>(
        API_ENDPOINTS.localisation.villesByArrondissement(Number(arrId))
      )
      setVilles(data)
    } catch {
      setVilles([])
    } finally {
      setGeoLoading(null)
    }
  }, [])

  const loadQuartiers = useCallback(async (villeId: string) => {
    if (!villeId) {
      setQuartiers([])
      return
    }
    setGeoLoading('quartiers')
    try {
      const data = await apiClient.get<GeoItem[]>(
        API_ENDPOINTS.localisation.quartiersByVille(Number(villeId))
      )
      setQuartiers(data)
    } catch {
      setQuartiers([])
    } finally {
      setGeoLoading(null)
    }
  }, [])

  const handleRegionChange = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      regionId: val,
      departementId: '',
      arrondissementId: '',
      villeId: '',
      quartierId: '',
    }))
    setDepartements([])
    setArrondissements([])
    setVilles([])
    setQuartiers([])
    loadDepartements(val)
  }

  const handleDepartementChange = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      departementId: val,
      arrondissementId: '',
      villeId: '',
      quartierId: '',
    }))
    setArrondissements([])
    setVilles([])
    setQuartiers([])
    loadArrondissements(val)
  }

  const handleArrondissementChange = (val: string) => {
    setFormData((prev) => ({ ...prev, arrondissementId: val, villeId: '', quartierId: '' }))
    setVilles([])
    setQuartiers([])
    loadVilles(val)
  }

  const handleVilleChange = (val: string) => {
    setFormData((prev) => ({ ...prev, villeId: val, quartierId: '' }))
    setQuartiers([])
    loadQuartiers(val)
  }

  const handleQuartierChange = (val: string) => {
    setFormData((prev) => ({ ...prev, quartierId: val }))
  }

  const handleNextStep = () => {
    if (step === 1) {
      if (!formData.schoolName || !formData.typeSecteur) {
        toast({
          title: 'Champs requis',
          description: "Veuillez remplir le nom de l'école et le type de secteur.",
          variant: 'destructive',
        })
        return
      }
    }
    if (step === 2) {
      if (!formData.quartierId || !formData.schoolEmail || !formData.adresse) {
        toast({
          title: 'Champs requis',
          description:
            "Veuillez sélectionner un quartier, renseigner l'adresse et l'email de l'école.",
          variant: 'destructive',
        })
        return
      }
    }
    setStep((prev) => Math.min(prev + 1, totalSteps))
  }

  const handlePrevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.acceptTerms) {
      toast({
        title: 'Conditions requises',
        description: "Veuillez accepter les conditions d'utilisation.",
        variant: 'destructive',
      })
      return
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: 'Erreur',
        description: 'Les mots de passe ne correspondent pas.',
        variant: 'destructive',
      })
      return
    }

    if (formData.password.length < 6) {
      toast({
        title: 'Erreur',
        description: 'Le mot de passe doit faire au moins 6 caractères.',
        variant: 'destructive',
      })
      return
    }

    setIsLoading(true)

    try {
      const payload = {
        schoolName: formData.schoolName,
        quartierId: Number(formData.quartierId),
        typeSecteur: formData.typeSecteur,
        typeEtablissement: formData.typeEtablissement || null,
        sousSysteme: formData.sousSysteme || null,
        adresse: formData.adresse,
        telephone: formData.schoolPhone || null,
        email: formData.schoolEmail,
        nombreEleves: formData.studentsCount ? parseInt(formData.studentsCount) : null,
        boitePostale: formData.boitePostale || null,
        devise: null,
        siteWeb: null,
        anneeFondation: formData.anneeFondation ? parseInt(formData.anneeFondation) : null,
        numeroAutorisation: formData.numeroAutorisation || null,
        adminPrenom: formData.firstName,
        adminNom: formData.lastName,
        adminEmail: formData.email,
        adminTelephone: formData.phone || null,
        password: formData.password,
      }

      await apiClient.post(API_ENDPOINTS.schools.register, payload)

      setIsSubmitted(true)
      toast({
        title: 'Inscription soumise avec succès!',
        description: 'Votre demande sera examinée par notre équipe.',
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur lors de l'inscription"
      toast({ title: 'Erreur', description: message, variant: 'destructive' })
    } finally {
      setIsLoading(false)
    }
  }

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Generate subdomain preview
  const subdomainPreview = formData.schoolName
    ? formData.schoolName
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .slice(0, 20)
    : 'votre-ecole'

  // Success screen after submission
  if (isSubmitted) {
    return (
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left Side - Same carousel */}
        <div className="relative hidden flex-col overflow-hidden lg:flex">
          <div className="absolute inset-0">
            <Image
              src="/register.jpeg"
              alt="École camerounaise"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-between p-12">
              <Link
                href="/"
                className="relative z-10 flex items-center gap-3 transition-opacity hover:opacity-80"
              >
                <Image
                  src="/hel.jpeg"
                  alt="Help Digi School Logo"
                  width={50}
                  height={50}
                  className="rounded-xl"
                />
                <div>
                  <h2 className="text-2xl font-bold text-[#2302B3]">Help Digi School</h2>
                  <p className="text-sm text-black">L&apos;éducation digitale pour tous</p>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side - Success Message */}
        <div className="relative flex flex-col items-center justify-center bg-slate-50 p-6 lg:p-16">
          <div className="mx-auto w-full max-w-md text-center">
            <div className="mb-8">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="mb-4 text-3xl font-black tracking-tight text-gray-900">
                Inscription soumise!
              </h1>
              <p className="mb-2 text-lg leading-relaxed text-gray-600">
                Votre demande d&apos;inscription pour <strong>{formData.schoolName}</strong> a été
                envoyée avec succès.
              </p>
              <p className="text-gray-500">
                Notre équipe va examiner votre dossier. Vous recevrez une notification par email à{' '}
                <strong>{formData.email}</strong> dès que votre école sera validée.
              </p>
            </div>

            <div className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 text-left">
              <h3 className="mb-4 font-semibold text-gray-900">Prochaines étapes</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#2302B3]/10">
                    <span className="text-xs font-bold text-[#2302B3]">1</span>
                  </div>
                  <p className="text-sm text-gray-600">Notre équipe examine votre inscription</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#2302B3]/10">
                    <span className="text-xs font-bold text-[#2302B3]">2</span>
                  </div>
                  <p className="text-sm text-gray-600">Vous recevez un email de confirmation</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#2302B3]/10">
                    <span className="text-xs font-bold text-[#2302B3]">3</span>
                  </div>
                  <p className="text-sm text-gray-600">Connectez-vous et configurez votre école</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button asChild variant="outline" className="h-12 flex-1">
                <Link href="/">Retour à l&apos;accueil</Link>
              </Button>
              <Button asChild className="h-12 flex-1 bg-[#2302B3] hover:bg-[#1c0291]">
                <Link href="/login">Se connecter</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left Side - Carousel */}
      <div className="relative hidden flex-col overflow-hidden lg:flex">
        {/* Slide 1: Register Image */}
        <div
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            currentSlide === 0 ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
          }`}
        >
          <Image
            src="/register.jpeg"
            alt="École camerounaise"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-between p-12">
            <Link
              href="/"
              className="relative z-10 flex items-center gap-3 transition-opacity hover:opacity-80"
            >
              <Image
                src="/hel.jpeg"
                alt="Help Digi School Logo"
                width={50}
                height={50}
                className="rounded-xl"
              />
              <div>
                <h2 className="text-2xl font-bold text-[#2302B3]">Help Digi School</h2>
                <p className="text-sm text-black">L&apos;éducation digitale pour tous</p>
              </div>
            </Link>
            <div className="relative z-10">
              <div className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-lg backdrop-blur-md">
                <Quote className="mb-3 h-8 w-8 text-white/30" />
                <p className="mb-4 font-medium leading-relaxed text-white">
                  &quot;Depuis que nous utilisons Help Digi School, la gestion des bulletins est
                  passée de 3 semaines à 3 jours. C&apos;est une révolution!&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-sm font-bold text-white">
                    JD
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Jean Dupont</p>
                    <p className="text-xs text-white/70">Directeur, École Les Champions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 2: Register2 Image */}
        <div
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            currentSlide === 1
              ? 'translate-x-0 opacity-100'
              : currentSlide < 1
                ? 'translate-x-full opacity-0'
                : '-translate-x-full opacity-0'
          }`}
        >
          <Image src="/register2.jpeg" alt="Enfants à l'école" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2302B3]/90 via-[#2302B3]/40 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-between p-12">
            <Link
              href="/"
              className="relative z-10 flex items-center gap-3 transition-opacity hover:opacity-80"
            >
              <Image
                src="/hel.jpeg"
                alt="Help Digi School Logo"
                width={50}
                height={50}
                className="rounded-xl"
              />
              <div>
                <h2 className="text-2xl font-bold text-[#2302B3]">Help Digi School</h2>
                <p className="text-sm text-black">L&apos;éducation digitale pour tous</p>
              </div>
            </Link>
            <div className="relative z-10">
              <div className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-lg backdrop-blur-md">
                <Quote className="mb-3 h-8 w-8 text-white/30" />
                <p className="mb-4 font-medium leading-relaxed text-white">
                  &quot;Grâce à Help Digi School, nous avons réduit nos coûts administratifs de 40%
                  et amélioré la satisfaction des parents.&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-sm font-bold text-white">
                    PN
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Paul Nkoulou</p>
                    <p className="text-xs text-white/70">
                      Directeur, Complexe Scolaire La Réussite
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {[0, 1].map((index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? 'w-8 bg-white shadow-lg'
                  : 'w-2 bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Right Side - Multi-step Form */}
      <div className="relative flex flex-col justify-center overflow-y-auto bg-slate-50 p-6 lg:p-16">
        {/* Interactive Dashboard Preview */}
        <div className="absolute right-6 top-6 hidden duration-700 animate-in fade-in slide-in-from-top-4 sm:block lg:right-12 lg:top-12">
          <div className="w-72 rotate-1 transform rounded-xl border border-slate-100 bg-white p-4 shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-transform duration-500 hover:rotate-0">
            <div className="mb-3 flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                <LayoutDashboard className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Aperçu
                </p>
                <p className="w-40 truncate text-sm font-bold text-gray-800">
                  {formData.schoolName || 'Votre École'}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-2 w-3/4 rounded bg-slate-100" />
              <div className="h-2 w-1/2 rounded bg-slate-100" />
              <div className="mt-3 flex gap-2">
                <div className="flex h-8 w-full items-center justify-center rounded-lg border border-blue-100 bg-blue-50 text-[10px] font-medium text-blue-600">
                  {subdomainPreview}.helpdigi.cm
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-md pt-8 lg:pt-0">
          {/* Logo for mobile */}
          <Link
            href="/"
            className="mb-8 flex items-center gap-3 transition-opacity hover:opacity-80 lg:hidden"
          >
            <Image
              src="/hel.jpeg"
              alt="Help Digi School Logo"
              width={45}
              height={45}
              className="rounded-xl shadow-md"
            />
            <div>
              <h2 className="text-xl font-bold text-[#2302B3]">Help Digi School</h2>
              <p className="text-xs text-black">L&apos;éducation digitale pour tous</p>
            </div>
          </Link>

          {/* Header & Progress */}
          <div className="mb-8">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-medium text-[#2302B3]">
                Étape {step} sur {totalSteps}
              </p>
              <Link
                href="/"
                className="text-sm text-gray-400 transition-colors hover:text-gray-600"
              >
                Retour à l&apos;accueil
              </Link>
            </div>

            {/* Progress Bar */}
            <div className="mb-6 h-2 w-full overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#2302B3] to-[#4318FF] transition-all duration-500 ease-out"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>

            <h1 className="mb-2 text-3xl font-black tracking-tight text-gray-900">
              {step === 1 && "Informations de l'école"}
              {step === 2 && 'Localisation & Contact'}
              {step === 3 && 'Créez votre compte'}
            </h1>
            <p className="text-gray-500">
              {step === 1 && "Type d'établissement et identité de votre école"}
              {step === 2 && 'Localisation géographique et coordonnées'}
              {step === 3 && 'Finalisez votre inscription en quelques secondes'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="relative">
            {/* Step 1: School Identity */}
            <div
              className={`transition-all duration-300 ease-in-out ${
                step === 1
                  ? 'translate-x-0 opacity-100'
                  : 'pointer-events-none absolute inset-0 -translate-x-10 opacity-0'
              }`}
            >
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label className="text-base">Comment s&apos;appelle votre établissement? *</Label>
                  <Input
                    placeholder="Ex: Groupe Scolaire Bilingue..."
                    className="h-14 border-gray-200 bg-white text-lg shadow-sm focus:ring-2 focus:ring-[#2302B3]/20"
                    value={formData.schoolName}
                    onChange={(e) => updateFormData('schoolName', e.target.value)}
                    autoFocus
                  />
                </div>

                <div className="space-y-2">
                  <Label>Type de secteur *</Label>
                  <Select
                    value={formData.typeSecteur}
                    onValueChange={(val) => updateFormData('typeSecteur', val)}
                  >
                    <SelectTrigger className="h-12 bg-white">
                      <SelectValue placeholder="Choisir le type de secteur..." />
                    </SelectTrigger>
                    <SelectContent>
                      {TYPE_SECTEUR_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Type d&apos;établissement</Label>
                    <Select
                      value={formData.typeEtablissement}
                      onValueChange={(val) => updateFormData('typeEtablissement', val)}
                    >
                      <SelectTrigger className="h-12 bg-white">
                        <SelectValue placeholder="Choisir..." />
                      </SelectTrigger>
                      <SelectContent>
                        {TYPE_ETABLISSEMENT_OPTIONS.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Sous-système</Label>
                    <Select
                      value={formData.sousSysteme}
                      onValueChange={(val) => updateFormData('sousSysteme', val)}
                    >
                      <SelectTrigger className="h-12 bg-white">
                        <SelectValue placeholder="Choisir..." />
                      </SelectTrigger>
                      <SelectContent>
                        {SOUS_SYSTEME_OPTIONS.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nombre d&apos;élèves</Label>
                    <Input
                      type="number"
                      placeholder="Ex: 300"
                      className="h-12 bg-white"
                      value={formData.studentsCount}
                      onChange={(e) => updateFormData('studentsCount', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Année de fondation</Label>
                    <Input
                      type="number"
                      placeholder="Ex: 1995"
                      className="h-12 bg-white"
                      value={formData.anneeFondation}
                      onChange={(e) => updateFormData('anneeFondation', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>N° autorisation ministérielle</Label>
                  <Input
                    placeholder="Ex: AUTH-2024-001 (optionnel)"
                    className="h-12 bg-white"
                    value={formData.numeroAutorisation}
                    onChange={(e) => updateFormData('numeroAutorisation', e.target.value)}
                  />
                </div>

                <Button
                  type="button"
                  onClick={handleNextStep}
                  className="group mt-4 h-14 w-full bg-[#2302B3] text-lg shadow-lg shadow-blue-900/20 hover:bg-[#1c0291]"
                >
                  Continuer
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>

            {/* Step 2: Location & Contact */}
            <div
              className={`transition-all duration-300 ease-in-out ${
                step === 2
                  ? 'translate-x-0 opacity-100'
                  : step < 2
                    ? 'pointer-events-none absolute inset-0 translate-x-10 opacity-0'
                    : 'pointer-events-none absolute inset-0 -translate-x-10 opacity-0'
              }`}
            >
              <div className="space-y-4">
                {/* Geographic Cascade */}
                <div className="space-y-2">
                  <Label>Région *</Label>
                  <Select value={formData.regionId} onValueChange={handleRegionChange}>
                    <SelectTrigger className="h-12 bg-white">
                      <SelectValue placeholder="Sélectionner la région..." />
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map((r) => (
                        <SelectItem key={r.id} value={String(r.id)}>
                          {r.nom}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Département *</Label>
                    <Select
                      value={formData.departementId}
                      onValueChange={handleDepartementChange}
                      disabled={!formData.regionId || geoLoading === 'departements'}
                    >
                      <SelectTrigger className="h-12 bg-white">
                        {geoLoading === 'departements' ? (
                          <span className="flex items-center gap-2 text-gray-400">
                            <Loader2 className="h-4 w-4 animate-spin" /> Chargement...
                          </span>
                        ) : (
                          <SelectValue placeholder="Département..." />
                        )}
                      </SelectTrigger>
                      <SelectContent>
                        {departements.map((d) => (
                          <SelectItem key={d.id} value={String(d.id)}>
                            {d.nom}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Arrondissement *</Label>
                    <Select
                      value={formData.arrondissementId}
                      onValueChange={handleArrondissementChange}
                      disabled={!formData.departementId || geoLoading === 'arrondissements'}
                    >
                      <SelectTrigger className="h-12 bg-white">
                        {geoLoading === 'arrondissements' ? (
                          <span className="flex items-center gap-2 text-gray-400">
                            <Loader2 className="h-4 w-4 animate-spin" /> Chargement...
                          </span>
                        ) : (
                          <SelectValue placeholder="Arrondissement..." />
                        )}
                      </SelectTrigger>
                      <SelectContent>
                        {arrondissements.map((a) => (
                          <SelectItem key={a.id} value={String(a.id)}>
                            {a.nom}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Ville *</Label>
                    <Select
                      value={formData.villeId}
                      onValueChange={handleVilleChange}
                      disabled={!formData.arrondissementId || geoLoading === 'villes'}
                    >
                      <SelectTrigger className="h-12 bg-white">
                        {geoLoading === 'villes' ? (
                          <span className="flex items-center gap-2 text-gray-400">
                            <Loader2 className="h-4 w-4 animate-spin" /> Chargement...
                          </span>
                        ) : (
                          <SelectValue placeholder="Ville..." />
                        )}
                      </SelectTrigger>
                      <SelectContent>
                        {villes.map((v) => (
                          <SelectItem key={v.id} value={String(v.id)}>
                            {v.nom}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Quartier *</Label>
                    <Select
                      value={formData.quartierId}
                      onValueChange={handleQuartierChange}
                      disabled={!formData.villeId || geoLoading === 'quartiers'}
                    >
                      <SelectTrigger className="h-12 bg-white">
                        {geoLoading === 'quartiers' ? (
                          <span className="flex items-center gap-2 text-gray-400">
                            <Loader2 className="h-4 w-4 animate-spin" /> Chargement...
                          </span>
                        ) : (
                          <SelectValue placeholder="Quartier..." />
                        )}
                      </SelectTrigger>
                      <SelectContent>
                        {quartiers.map((q) => (
                          <SelectItem key={q.id} value={String(q.id)}>
                            {q.nom}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Adresse *</Label>
                  <Input
                    placeholder="Ex: Rue de la Paix, à côté du marché..."
                    className="h-12 bg-white"
                    value={formData.adresse}
                    onChange={(e) => updateFormData('adresse', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Boîte postale</Label>
                  <Input
                    placeholder="Ex: BP 1234"
                    className="h-12 bg-white"
                    value={formData.boitePostale}
                    onChange={(e) => updateFormData('boitePostale', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Téléphone école</Label>
                    <Input
                      placeholder="+237 6XX XXX XXX"
                      className="h-12 bg-white"
                      value={formData.schoolPhone}
                      onChange={(e) => updateFormData('schoolPhone', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Email école *</Label>
                    <Input
                      type="email"
                      placeholder="contact@ecole.cm"
                      className="h-12 bg-white"
                      value={formData.schoolEmail}
                      onChange={(e) => updateFormData('schoolEmail', e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevStep}
                    className="h-14 border-gray-300 px-6 hover:bg-gray-50"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    type="button"
                    onClick={handleNextStep}
                    className="group h-14 flex-1 bg-[#2302B3] text-lg shadow-lg shadow-blue-900/20 hover:bg-[#1c0291]"
                  >
                    Continuer
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Step 3: Admin Account */}
            <div
              className={`transition-all duration-300 ease-in-out ${
                step === 3
                  ? 'translate-x-0 opacity-100'
                  : 'pointer-events-none absolute inset-0 translate-x-10 opacity-0'
              }`}
            >
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Prénom *</Label>
                    <Input
                      placeholder="Jean"
                      className="h-12 bg-white"
                      value={formData.firstName}
                      onChange={(e) => updateFormData('firstName', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Nom *</Label>
                    <Input
                      placeholder="Dupont"
                      className="h-12 bg-white"
                      value={formData.lastName}
                      onChange={(e) => updateFormData('lastName', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Email Directeur *</Label>
                  <Input
                    type="email"
                    placeholder="directeur@ecole.cm"
                    className="h-12 bg-white"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Téléphone Directeur</Label>
                  <Input
                    placeholder="+237 6XX XXX XXX"
                    className="h-12 bg-white"
                    value={formData.phone}
                    onChange={(e) => updateFormData('phone', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Mot de passe *</Label>
                  <Input
                    type="password"
                    placeholder="Minimum 6 caractères"
                    className="h-12 bg-white"
                    value={formData.password}
                    onChange={(e) => updateFormData('password', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Confirmer *</Label>
                  <Input
                    type="password"
                    placeholder="Confirmer le mot de passe"
                    className="h-12 bg-white"
                    value={formData.confirmPassword}
                    onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <Checkbox
                    id="terms"
                    checked={formData.acceptTerms}
                    onCheckedChange={(c) => updateFormData('acceptTerms', c as boolean)}
                    className="data-[state=checked]:bg-[#2302B3]"
                  />
                  <Label htmlFor="terms" className="cursor-pointer text-sm">
                    J&apos;accepte les conditions d&apos;utilisation
                  </Label>
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevStep}
                    className="h-14 border-gray-300 px-6 hover:bg-gray-50"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    type="submit"
                    className="h-14 flex-1 bg-[#2302B3] text-lg shadow-lg shadow-blue-900/20 hover:bg-[#1c0291]"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Création...' : "Terminer l'inscription"}
                  </Button>
                </div>
              </div>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            Déjà un compte?{' '}
            <Link href="/login" className="font-bold text-[#2302B3] hover:underline">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
