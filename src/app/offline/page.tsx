'use client'

export default function OfflinePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <div className="mx-auto max-w-md">
        <div className="mb-8 text-6xl">📡</div>
        <h1 className="mb-4 text-3xl font-bold text-gray-900">Vous etes hors ligne</h1>
        <p className="mb-8 text-lg text-gray-600">
          Il semble que vous n&apos;ayez pas de connexion internet. Verifiez votre connexion et
          reessayez.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
        >
          Reessayer
        </button>
      </div>
    </div>
  )
}
