'use client'

import { useState, useRef, useCallback, ReactNode } from 'react'
import { Save, Upload, Loader2, Trash2, Camera, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/lib/auth/auth-context'
import { apiClient } from '@/lib/api/client'
import { API_ENDPOINTS } from '@/lib/api/config'
import { toast } from 'sonner'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 Mo
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']

function getAvatarFullUrl(avatarUrl: string | undefined): string | null {
  if (!avatarUrl) return null
  // If it starts with http, it's already a full URL
  if (avatarUrl.startsWith('http')) return avatarUrl
  // Otherwise, prepend the backend base URL
  const backendBase =
    typeof window !== 'undefined' && window.location.hostname === 'localhost'
      ? '/api/backend'
      : process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'
  // avatarUrl is like "/api/users/avatar/file/xxx.jpg", strip "/api" prefix
  const path = avatarUrl.startsWith('/api/') ? avatarUrl.substring(4) : avatarUrl
  return `${backendBase}${path}`
}

interface ProfileSectionProps {
  extraFields?: ReactNode
}

export default function ProfileSection({ extraFields }: ProfileSectionProps) {
  const { user, updateUser } = useAuth()

  const [firstName, setFirstName] = useState(user?.profile.firstName ?? '')
  const [lastName, setLastName] = useState(user?.profile.lastName ?? '')
  const [phone, setPhone] = useState(user?.profile.phone ?? '')
  const [saving, setSaving] = useState(false)

  // Avatar state
  const [uploading, setUploading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  const currentAvatarUrl = avatarPreview || getAvatarFullUrl(user?.profile.avatar)

  const validateFile = (file: File): string | null => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return 'Format non supporte. Utilisez JPG, PNG, GIF ou WebP.'
    }
    if (file.size > MAX_FILE_SIZE) {
      return 'La taille du fichier ne doit pas depasser 5 Mo.'
    }
    return null
  }

  const handleAvatarUpload = useCallback(
    async (file: File) => {
      const error = validateFile(file)
      if (error) {
        toast.error(error)
        return
      }

      // Show preview immediately
      const previewUrl = URL.createObjectURL(file)
      setAvatarPreview(previewUrl)

      setUploading(true)
      try {
        const response = await apiClient.upload<{
          id: number
          nom: string
          prenom: string
          telephone: string | null
          avatarUrl: string | null
        }>(API_ENDPOINTS.users.uploadAvatar, file)

        updateUser({
          profile: {
            ...user!.profile,
            avatar: response.avatarUrl || undefined,
          },
        })

        // Clear preview and use actual URL
        setAvatarPreview(null)
        toast.success('Photo de profil mise a jour')
      } catch {
        // Revert preview on error
        setAvatarPreview(null)
      } finally {
        setUploading(false)
      }
    },
    [user, updateUser]
  )

  const handleDeleteAvatar = async () => {
    setDeleting(true)
    try {
      await apiClient.delete(API_ENDPOINTS.users.uploadAvatar)

      updateUser({
        profile: {
          ...user!.profile,
          avatar: undefined,
        },
      })

      setAvatarPreview(null)
      toast.success('Photo de profil supprimee')
    } catch {
      // Error handled by interceptor
    } finally {
      setDeleting(false)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleAvatarUpload(file)
    }
    // Reset input so same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith('image/')) {
      handleAvatarUpload(file)
    } else {
      toast.error('Veuillez deposer un fichier image (JPG, PNG, GIF ou WebP)')
    }
  }

  const handleSave = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      toast.error('Le nom et le prenom sont obligatoires')
      return
    }

    setSaving(true)
    try {
      const response = await apiClient.put<{
        id: number
        nom: string
        prenom: string
        telephone: string | null
      }>(API_ENDPOINTS.users.updateProfile, {
        nom: lastName.trim(),
        prenom: firstName.trim(),
        telephone: phone.trim() || null,
      })

      updateUser({
        profile: {
          ...user!.profile,
          firstName: response.prenom,
          lastName: response.nom,
          phone: response.telephone || undefined,
        },
      })

      toast.success('Profil mis a jour avec succes')
    } catch {
      // Error toast is handled by the API client interceptor
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
      <div className="border-b border-gray-100 p-4">
        <h3 className="font-semibold text-gray-900">Informations personnelles</h3>
        <p className="mt-1 text-sm text-gray-500">Mettez a jour vos informations de profil</p>
      </div>
      <div className="space-y-6 p-6">
        {/* Avatar Upload */}
        <div className="flex items-start gap-6">
          {/* Avatar with overlay */}
          <div
            className={`group relative cursor-pointer ${isDragging ? 'scale-105' : ''} transition-transform`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => !uploading && fileInputRef.current?.click()}
          >
            {currentAvatarUrl ? (
              <img
                src={currentAvatarUrl}
                alt={`${firstName} ${lastName}`}
                className="h-24 w-24 rounded-full border-2 border-gray-200 object-cover"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-3xl font-bold text-white">
                {initials}
              </div>
            )}

            {/* Hover overlay */}
            <div
              className={`absolute inset-0 flex items-center justify-center rounded-full transition-opacity ${
                isDragging
                  ? 'bg-primary/60 opacity-100'
                  : 'bg-black/40 opacity-0 group-hover:opacity-100'
              }`}
            >
              {uploading ? (
                <Loader2 className="h-6 w-6 animate-spin text-white" />
              ) : (
                <Camera className="h-6 w-6 text-white" />
              )}
            </div>

            {/* Drag indicator ring */}
            {isDragging && (
              <div className="absolute -inset-1 animate-pulse rounded-full border-2 border-dashed border-primary" />
            )}
          </div>

          <div className="flex-1">
            <p className="mb-1 font-semibold text-gray-900">Photo de profil</p>
            <p className="mb-3 text-sm text-gray-500">JPG, PNG, GIF ou WebP. Max 5 Mo.</p>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
              >
                {uploading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Upload en cours...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4" />
                    {currentAvatarUrl ? 'Changer la photo' : 'Ajouter une photo'}
                  </>
                )}
              </Button>

              {currentAvatarUrl && !uploading && (
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 text-red-600 hover:bg-red-50 hover:text-red-700"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDeleteAvatar()
                  }}
                  disabled={deleting}
                >
                  {deleting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                  Supprimer
                </Button>
              )}
            </div>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/gif,image/webp"
              className="hidden"
              onChange={handleFileSelect}
            />
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* Form Fields */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <Label htmlFor="settings-firstName">Prenom</Label>
            <Input
              id="settings-firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="settings-lastName">Nom</Label>
            <Input
              id="settings-lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="settings-email">Email</Label>
            <Input
              id="settings-email"
              type="email"
              value={user?.email ?? ''}
              disabled
              className="mt-1.5 bg-gray-50"
            />
            <p className="mt-1 text-xs text-gray-400">L&apos;email ne peut pas etre modifie</p>
          </div>
          <div>
            <Label htmlFor="settings-phone">Telephone</Label>
            <Input
              id="settings-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+237 6XX XX XX XX"
              className="mt-1.5"
            />
          </div>
        </div>

        {/* Extra fields from role */}
        {extraFields}

        <div className="flex justify-end border-t border-gray-200 pt-6">
          <Button
            onClick={handleSave}
            disabled={saving}
            className="gap-2 bg-primary hover:bg-primary-dark"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Enregistrer
          </Button>
        </div>
      </div>
    </div>
  )
}
