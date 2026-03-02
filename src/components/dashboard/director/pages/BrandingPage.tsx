'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { apiClient } from '@/lib/api/client'
import { API_ENDPOINTS } from '@/lib/api/config'
import { useAuth } from '@/lib/auth'
import { useSchoolBranding } from '@/hooks/use-school-branding'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import {
  Palette,
  Save,
  Globe,
  Copy,
  ImageIcon,
  Loader2,
  Upload,
  Eye,
  RotateCcw,
  Check,
  Sparkles,
  Monitor,
  Smartphone,
  X,
} from 'lucide-react'
import type { SchoolBackend } from '@/types/models/school'

// Preset color themes for quick selection
const COLOR_PRESETS = [
  { name: 'Violet Royal', primary: '#2302B3', secondary: '#4318FF' },
  { name: 'Bleu Ocean', primary: '#0369A1', secondary: '#38BDF8' },
  { name: 'Vert Emeraude', primary: '#047857', secondary: '#34D399' },
  { name: 'Rouge Passion', primary: '#B91C1C', secondary: '#F87171' },
  { name: 'Orange Sunset', primary: '#C2410C', secondary: '#FB923C' },
  { name: 'Rose Moderne', primary: '#BE185D', secondary: '#F472B6' },
  { name: 'Indigo Nuit', primary: '#3730A3', secondary: '#818CF8' },
  { name: 'Teal Frais', primary: '#0F766E', secondary: '#2DD4BF' },
]

const MAX_LOGO_SIZE_MB = 2
const ACCEPTED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml']

export function BrandingPage() {
  const { user } = useAuth()
  const { setBranding } = useSchoolBranding()
  const [school, setSchool] = useState<SchoolBackend | null>(null)
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)

  // Branding state
  const [logoUrl, setLogoUrl] = useState('')
  const [couleurPrimaire, setCouleurPrimaire] = useState('#2302B3')
  const [couleurSecondaire, setCouleurSecondaire] = useState('#4318FF')

  // UI state
  const [logoInputMode, setLogoInputMode] = useState<'upload' | 'url'>('upload')
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop')
  const [hasChanges, setHasChanges] = useState(false)
  const [logoPreviewError, setLogoPreviewError] = useState(false)
  const [activeColorPicker, setActiveColorPicker] = useState<'primary' | 'secondary' | null>(null)

  // Original values for change detection
  const [originalValues, setOriginalValues] = useState({
    logoUrl: '',
    couleurPrimaire: '#2302B3',
    couleurSecondaire: '#4318FF',
  })

  const fileInputRef = useRef<HTMLInputElement>(null)
  const dragAreaRef = useRef<HTMLDivElement>(null)

  const fetchSchool = useCallback(async () => {
    try {
      let s: SchoolBackend | null = null

      // Try fetching by ecoleId first (most reliable)
      if (user?.ecoleId) {
        try {
          s = await apiClient.get<SchoolBackend>(API_ENDPOINTS.schools.byId(String(user.ecoleId)))
        } catch {
          // Fallback to list endpoint
        }
      }

      // Fallback: try the list endpoint
      if (!s) {
        const schools = await apiClient.get<SchoolBackend[]>(API_ENDPOINTS.schools.base)
        if (schools && schools.length > 0) {
          s = schools[0]
        }
      }

      if (s) {
        setSchool(s)
        const vals = {
          logoUrl: s.logoUrl || '',
          couleurPrimaire: s.couleurPrimaire || '#2302B3',
          couleurSecondaire: s.couleurSecondaire || '#4318FF',
        }
        setLogoUrl(vals.logoUrl)
        setCouleurPrimaire(vals.couleurPrimaire)
        setCouleurSecondaire(vals.couleurSecondaire)
        setOriginalValues(vals)
        setLogoPreviewError(false)
      }
    } catch {
      setLoadError(true)
      toast.error("Impossible de charger les informations de l'ecole")
    } finally {
      setLoading(false)
    }
  }, [user?.ecoleId])

  useEffect(() => {
    fetchSchool()
  }, [fetchSchool])

  // Track changes
  useEffect(() => {
    setHasChanges(
      logoUrl !== originalValues.logoUrl ||
        couleurPrimaire !== originalValues.couleurPrimaire ||
        couleurSecondaire !== originalValues.couleurSecondaire
    )
  }, [logoUrl, couleurPrimaire, couleurSecondaire, originalValues])

  async function handleSave() {
    if (!school) return
    setSaving(true)
    try {
      await apiClient.put(API_ENDPOINTS.schools.branding(String(school.id)), {
        logoUrl: logoUrl || null,
        couleurPrimaire,
        couleurSecondaire,
      })
      setOriginalValues({ logoUrl, couleurPrimaire, couleurSecondaire })
      setHasChanges(false)
      // Update dashboard colors instantly (sidebar, topbar)
      setBranding({
        primaryColor: couleurPrimaire,
        secondaryColor: couleurSecondaire,
        logoUrl: logoUrl || null,
      })
      toast.success('Branding mis a jour avec succes !')
    } catch {
      toast.error('Erreur lors de la mise a jour du branding')
    } finally {
      setSaving(false)
    }
  }

  function handleReset() {
    setLogoUrl(originalValues.logoUrl)
    setCouleurPrimaire(originalValues.couleurPrimaire)
    setCouleurSecondaire(originalValues.couleurSecondaire)
    setLogoPreviewError(false)
    toast.info('Modifications annulees')
  }

  function handleCopySlug() {
    if (!school?.slug) return
    const isDev = typeof window !== 'undefined' && window.location.hostname.endsWith('localhost')
    const url = isDev
      ? `${school.slug}.localhost:${window.location.port || '3000'}`
      : `${school.slug}.helpdigischool.com`
    navigator.clipboard.writeText(url)
    toast.success('URL copiee dans le presse-papiers')
  }

  async function handleFileUpload(file: File) {
    // Validate file type
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      toast.error('Format non supporte. Utilisez PNG, JPG, WebP ou SVG.')
      return
    }

    // Validate file size
    if (file.size > MAX_LOGO_SIZE_MB * 1024 * 1024) {
      toast.error(`Le fichier est trop volumineux (max ${MAX_LOGO_SIZE_MB}MB)`)
      return
    }

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || "Erreur lors de l'upload")
      }
      const { url } = await res.json()
      setLogoUrl(url)
      setLogoPreviewError(false)
      toast.success('Logo uploade avec succes !')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erreur lors de l'upload du logo")
    } finally {
      setUploading(false)
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) handleFileUpload(file)
    // Reset input value so same file can be re-selected
    e.target.value = ''
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault()
    e.stopPropagation()
    dragAreaRef.current?.classList.add('border-primary', 'bg-violet-50')
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault()
    e.stopPropagation()
    dragAreaRef.current?.classList.remove('border-primary', 'bg-violet-50')
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    e.stopPropagation()
    dragAreaRef.current?.classList.remove('border-primary', 'bg-violet-50')
    const file = e.dataTransfer.files?.[0]
    if (file) handleFileUpload(file)
  }

  function handleRemoveLogo() {
    setLogoUrl('')
    setLogoPreviewError(false)
  }

  function applyPreset(preset: (typeof COLOR_PRESETS)[number]) {
    setCouleurPrimaire(preset.primary)
    setCouleurSecondaire(preset.secondary)
    toast.success(`Theme "${preset.name}" applique`)
  }

  function getSchoolInitials(): string {
    if (!school?.nom) return '??'
    return school.nom
      .split(' ')
      .filter((w) => w.length > 0)
      .slice(0, 3)
      .map((w) => w[0])
      .join('')
      .toUpperCase()
  }

  function getContrastColor(hex: string): string {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
    return luminance > 0.5 ? '#1f2937' : '#ffffff'
  }

  if (loading) {
    return (
      <div className="flex h-96 flex-col items-center justify-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-primary" />
        <p className="text-sm text-gray-500">Chargement du branding...</p>
      </div>
    )
  }

  if (!school) {
    return (
      <div className="flex h-96 flex-col items-center justify-center gap-4 text-gray-500">
        <Palette className="h-12 w-12 text-gray-300" />
        <p className="text-lg font-medium">
          {loadError ? 'Erreur de chargement' : 'Aucune ecole trouvee'}
        </p>
        <p className="text-sm">
          {loadError
            ? 'Impossible de contacter le serveur. Verifiez votre connexion.'
            : 'Veuillez verifier votre compte.'}
        </p>
        {loadError && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setLoading(true)
              setLoadError(false)
              fetchSchool()
            }}
            className="gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reessayer
          </Button>
        )}
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4 pb-32 sm:p-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-2xl shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${couleurPrimaire}, ${couleurSecondaire})`,
            }}
          >
            <Palette className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Identite visuelle</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Personnalisez l&apos;apparence de <span className="font-medium">{school.nom}</span>
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {hasChanges && (
            <Button variant="ghost" size="sm" onClick={handleReset} className="gap-2 text-gray-500">
              <RotateCcw className="h-4 w-4" />
              Annuler
            </Button>
          )}
          <Button
            onClick={handleSave}
            disabled={saving || !hasChanges}
            size="sm"
            className="gap-2 text-white shadow-lg"
            style={{
              background: hasChanges
                ? `linear-gradient(135deg, ${couleurPrimaire}, ${couleurSecondaire})`
                : undefined,
              opacity: !hasChanges ? 0.5 : 1,
            }}
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {saving ? 'Enregistrement...' : 'Enregistrer'}
          </Button>
        </div>
      </div>

      {/* Unsaved changes banner */}
      {hasChanges && (
        <div className="flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 dark:border-amber-800 dark:bg-amber-950/30">
          <div className="h-2 w-2 animate-pulse rounded-full bg-amber-500" />
          <p className="text-sm text-amber-700 dark:text-amber-400">
            Vous avez des modifications non enregistrees
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Left Column: Settings */}
        <div className="space-y-6 lg:col-span-3">
          {/* Section: URL personnalisee */}
          <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-4 dark:border-gray-800">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950">
                <Globe className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">URL personnalisee</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  L&apos;adresse unique de votre ecole
                </p>
              </div>
            </div>
            <div className="p-5">
              <Label
                htmlFor="slug"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Slug de l&apos;ecole
              </Label>
              <div className="flex items-center gap-2">
                <div className="flex flex-1 items-center overflow-hidden rounded-xl border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
                  <Input
                    id="slug"
                    value={school.slug ? `${school.slug}.helpdigischool.com` : ''}
                    readOnly
                    className="border-0 bg-transparent font-mono text-sm focus-visible:ring-0"
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopySlug}
                  className="shrink-0 gap-2"
                >
                  <Copy className="h-4 w-4" />
                  <span className="hidden sm:inline">Copier</span>
                </Button>
              </div>
              {typeof window !== 'undefined' &&
                window.location.hostname.endsWith('localhost') &&
                school.slug && (
                  <p className="mt-2 text-xs text-gray-400">
                    URL de test :{' '}
                    <span className="font-mono">
                      {school.slug}.localhost:{window.location.port || '3000'}
                    </span>
                  </p>
                )}
            </div>
          </section>

          {/* Section: Logo */}
          <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 dark:bg-purple-950">
                  <ImageIcon className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Logo</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Le logo de votre etablissement
                  </p>
                </div>
              </div>
              {/* Toggle upload/url mode */}
              <div className="flex rounded-lg border border-gray-200 p-0.5 dark:border-gray-700">
                <button
                  onClick={() => setLogoInputMode('upload')}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                    logoInputMode === 'upload'
                      ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Upload
                </button>
                <button
                  onClick={() => setLogoInputMode('url')}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                    logoInputMode === 'url'
                      ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  URL
                </button>
              </div>
            </div>

            <div className="p-5">
              {logoInputMode === 'upload' ? (
                <div className="space-y-4">
                  {/* Drop zone */}
                  <div
                    ref={dragAreaRef}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className="group relative cursor-pointer rounded-xl border-2 border-dashed border-gray-200 p-8 text-center transition-all hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept={ACCEPTED_IMAGE_TYPES.join(',')}
                      onChange={handleFileChange}
                      className="hidden"
                    />

                    {uploading ? (
                      <div className="flex flex-col items-center gap-3">
                        <Loader2 className="h-10 w-10 animate-spin text-gray-400" />
                        <p className="text-sm font-medium text-gray-600">Upload en cours...</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-3">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 transition-colors group-hover:bg-gray-200 dark:bg-gray-800 dark:group-hover:bg-gray-700">
                          <Upload className="h-6 w-6 text-gray-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Glissez-deposez votre logo ici
                          </p>
                          <p className="mt-1 text-xs text-gray-400">
                            ou{' '}
                            <span className="text-purple-600 underline dark:text-purple-400">
                              parcourir vos fichiers
                            </span>
                          </p>
                        </div>
                        <p className="text-xs text-gray-400">
                          PNG, JPG, WebP ou SVG &bull; Max {MAX_LOGO_SIZE_MB}MB
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  <Label
                    htmlFor="logoUrl"
                    className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    URL du logo
                  </Label>
                  <Input
                    id="logoUrl"
                    type="url"
                    placeholder="https://exemple.com/logo.png"
                    value={logoUrl}
                    onChange={(e) => {
                      setLogoUrl(e.target.value)
                      setLogoPreviewError(false)
                    }}
                  />
                </div>
              )}

              {/* Logo preview */}
              {logoUrl && !logoPreviewError && (
                <div className="mt-4 flex items-center gap-4 rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800/50">
                  <div className="relative">
                    <img
                      src={logoUrl}
                      alt="Logo de l'ecole"
                      className="h-20 w-20 rounded-xl border border-gray-200 bg-white object-contain p-1 dark:border-gray-700"
                      onError={() => setLogoPreviewError(true)}
                    />
                    <button
                      onClick={handleRemoveLogo}
                      className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shadow-md transition-transform hover:scale-110"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Logo actuel
                    </p>
                    <p className="mt-0.5 truncate text-xs text-gray-400" title={logoUrl}>
                      {logoUrl.length > 50 ? logoUrl.slice(0, 50) + '...' : logoUrl}
                    </p>
                  </div>
                </div>
              )}

              {logoUrl && logoPreviewError && (
                <div className="mt-4 flex items-center gap-3 rounded-xl border border-red-100 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950/30">
                  <X className="h-5 w-5 shrink-0 text-red-500" />
                  <div>
                    <p className="text-sm font-medium text-red-700 dark:text-red-400">
                      Image inaccessible
                    </p>
                    <p className="text-xs text-red-500">
                      Verifiez l&apos;URL ou uploadez un nouveau logo
                    </p>
                  </div>
                  <button
                    onClick={handleRemoveLogo}
                    className="ml-auto text-xs font-medium text-red-600 underline hover:text-red-700"
                  >
                    Supprimer
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* Section: Couleurs */}
          <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-4 dark:border-gray-800">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-50 dark:bg-pink-950">
                <Palette className="h-4 w-4 text-pink-600 dark:text-pink-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Couleurs</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Definissez l&apos;identite chromatique de votre ecole
                </p>
              </div>
            </div>

            <div className="space-y-6 p-5">
              {/* Color presets */}
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-gray-400" />
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Themes predifinis
                  </Label>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {COLOR_PRESETS.map((preset) => {
                    const isActive =
                      preset.primary === couleurPrimaire && preset.secondary === couleurSecondaire
                    return (
                      <button
                        key={preset.name}
                        onClick={() => applyPreset(preset)}
                        className={`group relative flex items-center gap-2 rounded-xl border-2 p-2.5 transition-all hover:shadow-md ${
                          isActive
                            ? 'border-gray-900 shadow-md dark:border-white'
                            : 'border-gray-100 hover:border-gray-200 dark:border-gray-800 dark:hover:border-gray-700'
                        }`}
                      >
                        <div className="flex shrink-0 -space-x-1">
                          <div
                            className="h-6 w-6 rounded-full border-2 border-white shadow-sm"
                            style={{ backgroundColor: preset.primary }}
                          />
                          <div
                            className="h-6 w-6 rounded-full border-2 border-white shadow-sm"
                            style={{ backgroundColor: preset.secondary }}
                          />
                        </div>
                        <span className="truncate text-xs font-medium text-gray-600 dark:text-gray-400">
                          {preset.name}
                        </span>
                        {isActive && (
                          <Check className="absolute right-1.5 top-1.5 h-3.5 w-3.5 text-green-600" />
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Custom color pickers */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* Primary */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Couleur primaire
                  </Label>
                  <div
                    className={`flex items-center gap-3 rounded-xl border-2 p-3 transition-all ${
                      activeColorPicker === 'primary'
                        ? 'border-gray-900 dark:border-white'
                        : 'border-gray-100 dark:border-gray-800'
                    }`}
                    onClick={() => setActiveColorPicker('primary')}
                  >
                    <div className="relative">
                      <input
                        type="color"
                        value={couleurPrimaire}
                        onChange={(e) => setCouleurPrimaire(e.target.value)}
                        onFocus={() => setActiveColorPicker('primary')}
                        onBlur={() => setActiveColorPicker(null)}
                        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                      />
                      <div
                        className="h-10 w-10 rounded-lg border border-gray-200 shadow-inner dark:border-gray-700"
                        style={{ backgroundColor: couleurPrimaire }}
                      />
                    </div>
                    <Input
                      value={couleurPrimaire}
                      onChange={(e) => {
                        const val = e.target.value
                        if (/^#[0-9a-fA-F]{0,6}$/.test(val) || val === '') {
                          setCouleurPrimaire(val || '#')
                        }
                      }}
                      className="border-0 bg-transparent font-mono text-sm uppercase shadow-none focus-visible:ring-0"
                      maxLength={7}
                      onFocus={() => setActiveColorPicker('primary')}
                      onBlur={() => setActiveColorPicker(null)}
                    />
                  </div>
                </div>

                {/* Secondary */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Couleur secondaire
                  </Label>
                  <div
                    className={`flex items-center gap-3 rounded-xl border-2 p-3 transition-all ${
                      activeColorPicker === 'secondary'
                        ? 'border-gray-900 dark:border-white'
                        : 'border-gray-100 dark:border-gray-800'
                    }`}
                    onClick={() => setActiveColorPicker('secondary')}
                  >
                    <div className="relative">
                      <input
                        type="color"
                        value={couleurSecondaire}
                        onChange={(e) => setCouleurSecondaire(e.target.value)}
                        onFocus={() => setActiveColorPicker('secondary')}
                        onBlur={() => setActiveColorPicker(null)}
                        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                      />
                      <div
                        className="h-10 w-10 rounded-lg border border-gray-200 shadow-inner dark:border-gray-700"
                        style={{ backgroundColor: couleurSecondaire }}
                      />
                    </div>
                    <Input
                      value={couleurSecondaire}
                      onChange={(e) => {
                        const val = e.target.value
                        if (/^#[0-9a-fA-F]{0,6}$/.test(val) || val === '') {
                          setCouleurSecondaire(val || '#')
                        }
                      }}
                      className="border-0 bg-transparent font-mono text-sm uppercase shadow-none focus-visible:ring-0"
                      maxLength={7}
                      onFocus={() => setActiveColorPicker('secondary')}
                      onBlur={() => setActiveColorPicker(null)}
                    />
                  </div>
                </div>
              </div>

              {/* Gradient preview strip */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Apercu du gradient
                </Label>
                <div
                  className="h-12 w-full rounded-xl shadow-inner"
                  style={{
                    background: `linear-gradient(135deg, ${couleurPrimaire}, ${couleurSecondaire})`,
                  }}
                />
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Live Preview */}
        <div className="lg:col-span-2">
          <div className="sticky top-20">
            <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-50 dark:bg-green-950">
                    <Eye className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Apercu en direct</h3>
                </div>
                {/* Preview mode toggle */}
                <div className="flex rounded-lg border border-gray-200 p-0.5 dark:border-gray-700">
                  <button
                    onClick={() => setPreviewMode('desktop')}
                    className={`rounded-md p-1.5 transition-all ${
                      previewMode === 'desktop'
                        ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                    title="Bureau"
                  >
                    <Monitor className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setPreviewMode('mobile')}
                    className={`rounded-md p-1.5 transition-all ${
                      previewMode === 'mobile'
                        ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                    title="Mobile"
                  >
                    <Smartphone className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-center p-5">
                <div
                  className={`overflow-hidden rounded-2xl border border-gray-100 shadow-xl transition-all dark:border-gray-800 ${
                    previewMode === 'mobile' ? 'w-56' : 'w-full'
                  }`}
                >
                  {/* Preview Header */}
                  <div
                    className="relative flex flex-col items-center justify-center overflow-hidden py-8"
                    style={{
                      background: `linear-gradient(135deg, ${couleurPrimaire}, ${couleurSecondaire})`,
                    }}
                  >
                    {/* Decorative circles */}
                    <div
                      className="absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-10"
                      style={{ backgroundColor: '#ffffff' }}
                    />
                    <div
                      className="absolute -bottom-4 -left-4 h-16 w-16 rounded-full opacity-10"
                      style={{ backgroundColor: '#ffffff' }}
                    />

                    {logoUrl && !logoPreviewError ? (
                      <div className="relative z-10 mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 p-2 backdrop-blur-sm">
                        <img
                          src={logoUrl}
                          alt="Logo"
                          className="h-full w-full rounded-xl object-contain"
                          onError={() => setLogoPreviewError(true)}
                        />
                      </div>
                    ) : (
                      <div className="relative z-10 mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                        <span className="text-2xl font-bold text-white">{getSchoolInitials()}</span>
                      </div>
                    )}
                    <h4
                      className="relative z-10 px-4 text-center font-bold"
                      style={{
                        color: getContrastColor(couleurPrimaire),
                        fontSize: previewMode === 'mobile' ? '0.875rem' : '1rem',
                      }}
                    >
                      {school.nom}
                    </h4>
                    {school.devise && (
                      <p
                        className="relative z-10 mt-1 px-4 text-center text-xs opacity-80"
                        style={{ color: getContrastColor(couleurPrimaire) }}
                      >
                        {school.devise}
                      </p>
                    )}
                  </div>

                  {/* Preview Body */}
                  <div className="space-y-3 bg-white p-4 dark:bg-gray-900">
                    {/* Color swatches */}
                    <div className="flex items-center justify-center gap-3">
                      <div className="flex items-center gap-1.5">
                        <div
                          className="h-4 w-4 rounded-full border border-gray-200 shadow-sm"
                          style={{ backgroundColor: couleurPrimaire }}
                        />
                        <span className="font-mono text-[10px] text-gray-400">
                          {couleurPrimaire}
                        </span>
                      </div>
                      <div className="h-3 w-px bg-gray-200" />
                      <div className="flex items-center gap-1.5">
                        <div
                          className="h-4 w-4 rounded-full border border-gray-200 shadow-sm"
                          style={{ backgroundColor: couleurSecondaire }}
                        />
                        <span className="font-mono text-[10px] text-gray-400">
                          {couleurSecondaire}
                        </span>
                      </div>
                    </div>

                    {/* Preview buttons */}
                    <div className="flex gap-2">
                      <div
                        className="flex-1 rounded-lg py-2 text-center text-xs font-semibold transition-shadow hover:shadow-md"
                        style={{
                          backgroundColor: couleurPrimaire,
                          color: getContrastColor(couleurPrimaire),
                        }}
                      >
                        Primaire
                      </div>
                      <div
                        className="flex-1 rounded-lg py-2 text-center text-xs font-semibold transition-shadow hover:shadow-md"
                        style={{
                          backgroundColor: couleurSecondaire,
                          color: getContrastColor(couleurSecondaire),
                        }}
                      >
                        Secondaire
                      </div>
                    </div>

                    {/* Preview UI elements */}
                    <div className="space-y-2 rounded-lg border border-gray-100 p-3 dark:border-gray-800">
                      <div className="flex items-center gap-2">
                        <div
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: couleurPrimaire }}
                        />
                        <div className="h-2 flex-1 rounded-full bg-gray-100 dark:bg-gray-800">
                          <div
                            className="h-2 w-3/4 rounded-full"
                            style={{
                              background: `linear-gradient(90deg, ${couleurPrimaire}, ${couleurSecondaire})`,
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: couleurSecondaire }}
                        />
                        <div className="h-2 flex-1 rounded-full bg-gray-100 dark:bg-gray-800">
                          <div
                            className="h-2 w-1/2 rounded-full"
                            style={{
                              background: `linear-gradient(90deg, ${couleurPrimaire}, ${couleurSecondaire})`,
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: couleurPrimaire }}
                        />
                        <div className="h-2 flex-1 rounded-full bg-gray-100 dark:bg-gray-800">
                          <div
                            className="h-2 w-[90%] rounded-full"
                            style={{
                              background: `linear-gradient(90deg, ${couleurPrimaire}, ${couleurSecondaire})`,
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Preview link style */}
                    <div className="flex items-center justify-center gap-1 pt-1">
                      <span
                        className="text-[10px] font-medium underline"
                        style={{ color: couleurPrimaire }}
                      >
                        Lien primaire
                      </span>
                      <span className="text-[10px] text-gray-300">&bull;</span>
                      <span
                        className="text-[10px] font-medium underline"
                        style={{ color: couleurSecondaire }}
                      >
                        Lien secondaire
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Floating save bar on mobile */}
      {hasChanges && (
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white/90 p-4 backdrop-blur-lg dark:border-gray-800 dark:bg-gray-900/90 lg:hidden">
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={handleReset} className="flex-1 gap-2">
              <RotateCcw className="h-4 w-4" />
              Annuler
            </Button>
            <Button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 gap-2 text-white"
              style={{
                background: `linear-gradient(135deg, ${couleurPrimaire}, ${couleurSecondaire})`,
              }}
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {saving ? 'Enregistrement...' : 'Enregistrer'}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
