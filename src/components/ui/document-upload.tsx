'use client'

import { useState, useRef, useCallback } from 'react'
import { FileText, Loader2, X, AlertCircle, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ACCEPTED_FORMATS = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
const MAX_SIZE_MB = 10
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024

interface DocumentUploadProps {
  label: string
  required?: boolean
  currentFileUrl?: string
  onFileSelected: (file: File) => Promise<string>
  onFileRemoved?: () => void
  disabled?: boolean
}

export function DocumentUpload({
  label,
  required = false,
  currentFileUrl,
  onFileSelected,
  onFileRemoved,
  disabled = false,
}: DocumentUploadProps) {
  const [fileUrl, setFileUrl] = useState<string | null>(currentFileUrl || null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const isPdf = fileUrl?.toLowerCase().endsWith('.pdf')

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return

      setError(null)

      // Validate format
      if (!ACCEPTED_FORMATS.includes(file.type)) {
        setError('Format non supporté. Utilisez JPG, PNG, WebP ou PDF.')
        return
      }

      // Validate size
      if (file.size > MAX_SIZE_BYTES) {
        setError(`Le fichier ne doit pas dépasser ${MAX_SIZE_MB}MB.`)
        return
      }

      // Upload
      setIsUploading(true)
      try {
        const url = await onFileSelected(file)
        setFileUrl(url)
      } catch {
        setError("Erreur lors de l'upload. Veuillez réessayer.")
      } finally {
        setIsUploading(false)
      }

      // Reset input so same file can be re-selected
      if (inputRef.current) inputRef.current.value = ''
    },
    [onFileSelected]
  )

  const handleRemove = useCallback(() => {
    setFileUrl(null)
    setError(null)
    onFileRemoved?.()
    if (inputRef.current) inputRef.current.value = ''
  }, [onFileRemoved])

  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </p>

      <div className="relative">
        {/* Document box */}
        <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 transition-colors hover:bg-gray-100">
          {fileUrl ? (
            isPdf ? (
              <div className="flex flex-col items-center justify-center gap-1">
                <FileText className="h-10 w-10 text-red-500" />
                <span className="text-[10px] font-semibold text-gray-400">PDF</span>
              </div>
            ) : (
              <img src={fileUrl} alt="Document" className="h-full w-full object-cover" />
            )
          ) : (
            <Upload className="h-8 w-8 text-gray-300" />
          )}

          {/* Loading overlay */}
          {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/40">
              <Loader2 className="h-6 w-6 animate-spin text-white" />
            </div>
          )}
        </div>

        {/* Remove button */}
        {fileUrl && !isUploading && !disabled && (
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
        className="h-8 gap-1.5 px-3 text-xs"
      >
        {isUploading ? (
          <>
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            Upload...
          </>
        ) : (
          <>
            <Upload className="h-3.5 w-3.5" />
            {fileUrl ? 'Changer' : 'Choisir un fichier'}
          </>
        )}
      </Button>

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_FORMATS.join(',')}
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
