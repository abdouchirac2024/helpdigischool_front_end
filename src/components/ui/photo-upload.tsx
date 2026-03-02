'use client'

import { useState, useRef, useCallback } from 'react'
import { Camera, Loader2, X, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ACCEPTED_FORMATS = ['image/jpeg', 'image/png', 'image/webp']
const MAX_SIZE_MB = 5
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024

// Compresse et redimensionne l'image côté client avant l'upload
// Réduit une photo de 4MB → ~150KB (20x plus rapide à uploader)
function compressImage(file: File, maxDimension = 800, quality = 0.85): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const objectUrl = URL.createObjectURL(file)

    img.onload = () => {
      URL.revokeObjectURL(objectUrl)

      let { width, height } = img
      if (width > maxDimension || height > maxDimension) {
        if (width > height) {
          height = Math.round((height * maxDimension) / width)
          width = maxDimension
        } else {
          width = Math.round((width * maxDimension) / height)
          height = maxDimension
        }
      }

      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      if (!ctx) return resolve(file)

      ctx.drawImage(img, 0, 0, width, height)
      canvas.toBlob(
        (blob) => {
          if (!blob) return resolve(file)
          resolve(new File([blob], file.name.replace(/\.[^.]+$/, '.jpg'), { type: 'image/jpeg' }))
        },
        'image/jpeg',
        quality
      )
    }

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl)
      reject(new Error("Impossible de lire l'image"))
    }

    img.src = objectUrl
  })
}

interface PhotoUploadProps {
  label: string
  required?: boolean
  currentPhotoUrl?: string
  initials?: string
  onPhotoSelected: (file: File) => Promise<string>
  onPhotoRemoved?: () => void
  disabled?: boolean
}

export function PhotoUpload({
  label,
  required = false,
  currentPhotoUrl,
  initials,
  onPhotoSelected,
  onPhotoRemoved,
  disabled = false,
}: PhotoUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentPhotoUrl || null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return

      setError(null)

      // Validate format
      if (!ACCEPTED_FORMATS.includes(file.type)) {
        setError('Format non supporté. Utilisez JPG, PNG ou WebP.')
        return
      }

      // Validate size
      if (file.size > MAX_SIZE_BYTES) {
        setError(`La photo ne doit pas dépasser ${MAX_SIZE_MB}MB.`)
        return
      }

      // Aperçu immédiat avec le fichier original
      const objectUrl = URL.createObjectURL(file)
      setPreviewUrl(objectUrl)

      // Compression côté client avant upload (4MB → ~150KB)
      setIsUploading(true)
      try {
        const compressed = await compressImage(file)
        await onPhotoSelected(compressed)
      } catch {
        setError("Erreur lors de l'upload. Veuillez réessayer.")
        setPreviewUrl(currentPhotoUrl || null)
      } finally {
        setIsUploading(false)
      }

      // Reset input so same file can be re-selected
      if (inputRef.current) inputRef.current.value = ''
    },
    [onPhotoSelected, currentPhotoUrl]
  )

  const handleRemove = useCallback(() => {
    setPreviewUrl(null)
    setError(null)
    onPhotoRemoved?.()
    if (inputRef.current) inputRef.current.value = ''
  }, [onPhotoRemoved])

  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </p>

      <div className="relative">
        {/* Avatar circle */}
        <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-gray-300 bg-gray-50">
          {previewUrl ? (
            <img src={previewUrl} alt="Aperçu" className="h-full w-full object-cover" />
          ) : initials ? (
            <span className="text-xl font-bold text-gray-400">{initials}</span>
          ) : (
            <Camera className="h-8 w-8 text-gray-300" />
          )}

          {/* Loading overlay */}
          {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40">
              <Loader2 className="h-6 w-6 animate-spin text-white" />
            </div>
          )}
        </div>

        {/* Remove button */}
        {previewUrl && !isUploading && !disabled && (
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shadow-sm transition-colors hover:bg-red-600"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Upload button */}
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={disabled || isUploading}
        onClick={() => inputRef.current?.click()}
        className="gap-1.5 text-xs"
      >
        {isUploading ? (
          <>
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            Upload...
          </>
        ) : (
          <>
            <Camera className="h-3.5 w-3.5" />
            {previewUrl ? 'Changer' : 'Choisir une photo'}
          </>
        )}
      </Button>

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Error message */}
      {error && (
        <p className="flex items-center gap-1 text-xs text-red-500">
          <AlertCircle className="h-3 w-3" />
          {error}
        </p>
      )}
    </div>
  )
}
