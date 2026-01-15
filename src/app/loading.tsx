import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        {/* Spinner */}
        <div className="relative">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto" />
        </div>

        {/* Text */}
        <p className="mt-4 text-gray-600 font-medium">
          Chargement en cours...
        </p>

        {/* Subtitle */}
        <p className="mt-1 text-sm text-gray-400">
          Veuillez patienter
        </p>
      </div>
    </div>
  )
}