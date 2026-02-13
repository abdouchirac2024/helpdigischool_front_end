'use client'

import { useState, useEffect } from 'react'
import { Search, Navigation, Loader2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { locationService } from '@/services/location.service'
import type { Arrondissement } from '@/types'

export function AdminArrondissementsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [arrondissements, setArrondissements] = useState<Arrondissement[]>([])

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    setLoading(true)
    setError(null)
    try {
      const data = await locationService.getArrondissements()
      setArrondissements(data)
    } catch {
      setError('Impossible de charger les arrondissements.')
    } finally {
      setLoading(false)
    }
  }

  const filtered = arrondissements.filter(
    (a) =>
      a.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.code.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Arrondissements</h1>
        <p className="mt-1 text-gray-600">{arrondissements.length} arrondissements</p>
      </div>

      <div className="rounded-2xl border border-green-200 bg-green-50 p-5">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
            <Navigation className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{arrondissements.length}</p>
            <p className="text-sm text-gray-500">Arrondissements</p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Rechercher un arrondissement..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4">
          <AlertCircle className="h-5 w-5 text-red-500" />
          <p className="text-sm text-red-700">{error}</p>
          <Button size="sm" variant="outline" onClick={loadData} className="ml-auto">
            Reessayer
          </Button>
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-[#2302B3]" />
          <span className="ml-3 text-gray-500">Chargement...</span>
        </div>
      )}

      {!loading && !error && (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-100 bg-gray-50">
                <tr>
                  <th className="p-4 text-left font-semibold text-gray-600">#</th>
                  <th className="p-4 text-left font-semibold text-gray-600">Code</th>
                  <th className="p-4 text-left font-semibold text-gray-600">Nom</th>
                  <th className="p-4 text-left font-semibold text-gray-600">Departement</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-gray-500">
                      Aucun arrondissement trouve
                    </td>
                  </tr>
                ) : (
                  filtered.map((arr, index) => (
                    <tr
                      key={arr.id}
                      className="border-b border-gray-50 transition-colors hover:bg-gray-50"
                    >
                      <td className="p-4 text-gray-400">{index + 1}</td>
                      <td className="p-4">
                        <code className="rounded bg-gray-100 px-2 py-1 text-sm">{arr.code}</code>
                      </td>
                      <td className="p-4 font-semibold text-gray-900">{arr.nom}</td>
                      <td className="p-4">
                        <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">
                          {arr.departementNom}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="border-t border-gray-100 p-4">
            <p className="text-sm text-gray-500">{filtered.length} arrondissement(s)</p>
          </div>
        </div>
      )}
    </div>
  )
}
