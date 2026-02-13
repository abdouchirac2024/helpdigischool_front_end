'use client'

import { useState, useEffect } from 'react'
import { Search, Map, Loader2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { locationService } from '@/services/location.service'
import type { Region, Departement } from '@/types'

export function AdminDepartementsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [regionFilter, setRegionFilter] = useState('all')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [regions, setRegions] = useState<Region[]>([])
  const [departements, setDepartements] = useState<Departement[]>([])

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    setLoading(true)
    setError(null)
    try {
      const [regs, depts] = await Promise.all([
        locationService.getRegions(),
        locationService.getDepartements(),
      ])
      setRegions(regs)
      setDepartements(depts)
    } catch {
      setError('Impossible de charger les departements.')
    } finally {
      setLoading(false)
    }
  }

  async function handleRegionFilter(value: string) {
    setRegionFilter(value)
    if (value === 'all') {
      setLoading(true)
      try {
        const data = await locationService.getDepartements()
        setDepartements(data)
      } catch {
        setError('Erreur de chargement.')
      } finally {
        setLoading(false)
      }
    } else {
      setLoading(true)
      try {
        const data = await locationService.getDepartementsByRegion(Number(value))
        setDepartements(data)
      } catch {
        setError('Erreur de chargement.')
      } finally {
        setLoading(false)
      }
    }
  }

  const filtered = departements.filter(
    (d) =>
      d.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.code.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Departements</h1>
          <p className="mt-1 text-gray-600">{departements.length} departements</p>
        </div>
      </div>

      <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
            <Map className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{departements.length}</p>
            <p className="text-sm text-gray-500">Departements</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-gray-100 bg-white p-4">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Rechercher un departement..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={regionFilter} onValueChange={handleRegionFilter}>
            <SelectTrigger className="w-full md:w-[220px]">
              <SelectValue placeholder="Filtrer par region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les regions</SelectItem>
              {regions.map((r) => (
                <SelectItem key={r.id} value={String(r.id)}>
                  {r.nom}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
                  <th className="p-4 text-left font-semibold text-gray-600">Chef-lieu</th>
                  <th className="p-4 text-left font-semibold text-gray-600">Region</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-500">
                      Aucun departement trouve
                    </td>
                  </tr>
                ) : (
                  filtered.map((dept, index) => (
                    <tr
                      key={dept.id}
                      className="border-b border-gray-50 transition-colors hover:bg-gray-50"
                    >
                      <td className="p-4 text-gray-400">{index + 1}</td>
                      <td className="p-4">
                        <code className="rounded bg-gray-100 px-2 py-1 text-sm">{dept.code}</code>
                      </td>
                      <td className="p-4 font-semibold text-gray-900">{dept.nom}</td>
                      <td className="p-4 text-gray-600">{dept.chefLieu || '-'}</td>
                      <td className="p-4">
                        <span className="rounded-full bg-purple-100 px-2 py-1 text-xs font-semibold text-purple-700">
                          {dept.regionNom}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="border-t border-gray-100 p-4">
            <p className="text-sm text-gray-500">{filtered.length} departement(s)</p>
          </div>
        </div>
      )}
    </div>
  )
}
