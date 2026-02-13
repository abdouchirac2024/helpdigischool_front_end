'use client'

import { useState, useEffect } from 'react'
import { Search, Globe, Loader2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { locationService } from '@/services/location.service'
import type { Region } from '@/types'

export function AdminRegionsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [regions, setRegions] = useState<Region[]>([])

  useEffect(() => {
    loadRegions()
  }, [])

  async function loadRegions() {
    setLoading(true)
    setError(null)
    try {
      const data = await locationService.getRegions()
      setRegions(data)
    } catch (err) {
      console.error('[RegionsPage] Error:', err)
      setError('Impossible de charger les regions. Verifiez que le backend est demarre.')
    } finally {
      setLoading(false)
    }
  }

  const filtered = regions.filter(
    (r) =>
      r.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.code.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Regions du Cameroun</h1>
          <p className="mt-1 text-gray-600">{regions.length} regions</p>
        </div>
      </div>

      {/* Stats */}
      <div className="rounded-2xl border border-[#2302B3] bg-[#2302B3]/5 p-5">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2302B3]/10">
            <Globe className="h-6 w-6 text-[#2302B3]" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{regions.length}</p>
            <p className="text-sm text-gray-500">Regions</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="rounded-2xl border border-gray-100 bg-white p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Rechercher une region..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4">
          <AlertCircle className="h-5 w-5 text-red-500" />
          <p className="text-sm text-red-700">{error}</p>
          <Button size="sm" variant="outline" onClick={loadRegions} className="ml-auto">
            Reessayer
          </Button>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-[#2302B3]" />
          <span className="ml-3 text-gray-500">Chargement...</span>
        </div>
      )}

      {/* Table */}
      {!loading && !error && (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-100 bg-gray-50">
                <tr>
                  <th className="p-4 text-left font-semibold text-gray-600">#</th>
                  <th className="p-4 text-left font-semibold text-gray-600">Code</th>
                  <th className="p-4 text-left font-semibold text-gray-600">Nom</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="p-8 text-center text-gray-500">
                      Aucune region trouvee
                    </td>
                  </tr>
                ) : (
                  filtered.map((region, index) => (
                    <tr
                      key={region.id}
                      className="border-b border-gray-50 transition-colors hover:bg-gray-50"
                    >
                      <td className="p-4 text-gray-400">{index + 1}</td>
                      <td className="p-4">
                        <code className="rounded bg-gray-100 px-2 py-1 text-sm">{region.code}</code>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#2302B3] to-[#4318FF] font-semibold text-white">
                            {region.nom.charAt(0)}
                          </div>
                          <span className="font-semibold text-gray-900">{region.nom}</span>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="border-t border-gray-100 p-4">
            <p className="text-sm text-gray-500">{filtered.length} region(s)</p>
          </div>
        </div>
      )}
    </div>
  )
}
