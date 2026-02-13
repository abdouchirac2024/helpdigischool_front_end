'use client'

import { useState, useEffect } from 'react'
import {
  MapPin,
  Search,
  ChevronRight,
  Globe,
  Building,
  Home,
  Map,
  Loader2,
  AlertCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { locationService } from '@/services/location.service'
import type { Region, Departement, Arrondissement, Ville, Quartier } from '@/types'

type Tab = 'regions' | 'departements' | 'arrondissements' | 'villes' | 'quartiers'

export function AdminLocationPage() {
  const [activeTab, setActiveTab] = useState<Tab>('regions')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Data
  const [regions, setRegions] = useState<Region[]>([])
  const [departements, setDepartements] = useState<Departement[]>([])
  const [arrondissements, setArrondissements] = useState<Arrondissement[]>([])
  const [villes, setVilles] = useState<Ville[]>([])
  const [quartiers, setQuartiers] = useState<Quartier[]>([])

  // Selected parent for filtering
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null)
  const [selectedDepartement, setSelectedDepartement] = useState<Departement | null>(null)
  const [selectedArrondissement, setSelectedArrondissement] = useState<Arrondissement | null>(null)
  const [selectedVille, setSelectedVille] = useState<Ville | null>(null)

  // Load regions on mount
  useEffect(() => {
    loadRegions()
  }, [])

  async function loadRegions() {
    setLoading(true)
    setError(null)
    try {
      const data = await locationService.getRegions()
      setRegions(data)
    } catch {
      setError('Impossible de charger les regions. Verifiez que le backend est demarre.')
    } finally {
      setLoading(false)
    }
  }

  async function handleSelectRegion(region: Region) {
    setSelectedRegion(region)
    setSelectedDepartement(null)
    setSelectedArrondissement(null)
    setSelectedVille(null)
    setActiveTab('departements')
    setLoading(true)
    setError(null)
    try {
      const data = await locationService.getDepartementsByRegion(region.id)
      setDepartements(data)
    } catch {
      setError('Impossible de charger les departements.')
    } finally {
      setLoading(false)
    }
  }

  async function handleSelectDepartement(dept: Departement) {
    setSelectedDepartement(dept)
    setSelectedArrondissement(null)
    setSelectedVille(null)
    setActiveTab('arrondissements')
    setLoading(true)
    setError(null)
    try {
      const data = await locationService.getArrondissementsByDepartement(dept.id)
      setArrondissements(data)
    } catch {
      setError('Impossible de charger les arrondissements.')
    } finally {
      setLoading(false)
    }
  }

  async function handleSelectArrondissement(arr: Arrondissement) {
    setSelectedArrondissement(arr)
    setSelectedVille(null)
    setActiveTab('villes')
    setLoading(true)
    setError(null)
    try {
      const data = await locationService.getVillesByArrondissement(arr.id)
      setVilles(data)
    } catch {
      setError('Impossible de charger les villes.')
    } finally {
      setLoading(false)
    }
  }

  async function handleSelectVille(ville: Ville) {
    setSelectedVille(ville)
    setActiveTab('quartiers')
    setLoading(true)
    setError(null)
    try {
      const data = await locationService.getQuartiersByVille(ville.id)
      setQuartiers(data)
    } catch {
      setError('Impossible de charger les quartiers.')
    } finally {
      setLoading(false)
    }
  }

  function handleBackToRegions() {
    setActiveTab('regions')
    setSelectedRegion(null)
    setSelectedDepartement(null)
    setSelectedArrondissement(null)
    setSelectedVille(null)
    setSearchQuery('')
  }

  function handleBackToDepartements() {
    setActiveTab('departements')
    setSelectedDepartement(null)
    setSelectedArrondissement(null)
    setSelectedVille(null)
    setSearchQuery('')
  }

  function handleBackToArrondissements() {
    setActiveTab('arrondissements')
    setSelectedArrondissement(null)
    setSelectedVille(null)
    setSearchQuery('')
  }

  function handleBackToVilles() {
    setActiveTab('villes')
    setSelectedVille(null)
    setSearchQuery('')
  }

  // Filter by search
  const filteredRegions = regions.filter(
    (r) =>
      r.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.code.toLowerCase().includes(searchQuery.toLowerCase())
  )
  const filteredDepartements = departements.filter(
    (d) =>
      d.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.code.toLowerCase().includes(searchQuery.toLowerCase())
  )
  const filteredArrondissements = arrondissements.filter(
    (a) =>
      a.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.code.toLowerCase().includes(searchQuery.toLowerCase())
  )
  const filteredVilles = villes.filter(
    (v) =>
      v.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.code.toLowerCase().includes(searchQuery.toLowerCase())
  )
  const filteredQuartiers = quartiers.filter(
    (q) =>
      q.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.code.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const tabs: { key: Tab; label: string; icon: typeof Globe; count: number }[] = [
    { key: 'regions', label: 'Regions', icon: Globe, count: regions.length },
    { key: 'departements', label: 'Departements', icon: Map, count: departements.length },
    {
      key: 'arrondissements',
      label: 'Arrondissements',
      icon: MapPin,
      count: arrondissements.length,
    },
    { key: 'villes', label: 'Villes', icon: Building, count: villes.length },
    { key: 'quartiers', label: 'Quartiers', icon: Home, count: quartiers.length },
  ]

  // Breadcrumb
  const breadcrumb: { label: string; onClick: () => void }[] = [
    { label: 'Cameroun', onClick: handleBackToRegions },
  ]
  if (selectedRegion) {
    breadcrumb.push({ label: selectedRegion.nom, onClick: handleBackToDepartements })
  }
  if (selectedDepartement) {
    breadcrumb.push({ label: selectedDepartement.nom, onClick: handleBackToArrondissements })
  }
  if (selectedArrondissement) {
    breadcrumb.push({ label: selectedArrondissement.nom, onClick: handleBackToVilles })
  }
  if (selectedVille) {
    breadcrumb.push({ label: selectedVille.nom, onClick: () => {} })
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Localisation</h1>
          <p className="mt-1 text-gray-600">Gestion geographique du Cameroun</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              if (tab.key === 'regions') handleBackToRegions()
            }}
            className={`rounded-2xl border p-5 text-left transition-all ${
              activeTab === tab.key
                ? 'border-[#2302B3] bg-[#2302B3]/5'
                : 'border-gray-100 bg-white hover:shadow-md'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                  activeTab === tab.key ? 'bg-[#2302B3]/10' : 'bg-gray-50'
                }`}
              >
                <tab.icon
                  className={`h-5 w-5 ${
                    activeTab === tab.key ? 'text-[#2302B3]' : 'text-gray-500'
                  }`}
                />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{tab.count}</p>
                <p className="text-xs text-gray-500">{tab.label}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center gap-1 text-sm">
        {breadcrumb.map((item, i) => (
          <span key={i} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="h-4 w-4 text-gray-400" />}
            <button
              onClick={item.onClick}
              className={`rounded px-2 py-1 transition-colors ${
                i === breadcrumb.length - 1
                  ? 'font-semibold text-[#2302B3]'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {item.label}
            </button>
          </span>
        ))}
      </div>

      {/* Search */}
      <div className="rounded-2xl border border-gray-100 bg-white p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder={`Rechercher dans ${activeTab}...`}
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

      {/* Content */}
      {!loading && !error && (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
          {/* REGIONS */}
          {activeTab === 'regions' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-100 bg-gray-50">
                  <tr>
                    <th className="p-4 text-left font-semibold text-gray-600">Code</th>
                    <th className="p-4 text-left font-semibold text-gray-600">Nom</th>
                    <th className="p-4 text-right font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRegions.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="p-8 text-center text-gray-500">
                        Aucune region trouvee
                      </td>
                    </tr>
                  ) : (
                    filteredRegions.map((region) => (
                      <tr
                        key={region.id}
                        className="cursor-pointer border-b border-gray-50 transition-colors hover:bg-gray-50"
                        onClick={() => handleSelectRegion(region)}
                      >
                        <td className="p-4">
                          <code className="rounded bg-gray-100 px-2 py-1 text-sm">
                            {region.code}
                          </code>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#2302B3] to-[#4318FF] font-semibold text-white">
                              {region.nom.charAt(0)}
                            </div>
                            <span className="font-semibold text-gray-900">{region.nom}</span>
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <Button size="sm" variant="ghost" className="gap-1">
                            Voir departements
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* DEPARTEMENTS */}
          {activeTab === 'departements' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-100 bg-gray-50">
                  <tr>
                    <th className="p-4 text-left font-semibold text-gray-600">Code</th>
                    <th className="p-4 text-left font-semibold text-gray-600">Nom</th>
                    <th className="p-4 text-left font-semibold text-gray-600">Chef-lieu</th>
                    <th className="p-4 text-left font-semibold text-gray-600">Region</th>
                    <th className="p-4 text-right font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDepartements.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-gray-500">
                        Aucun departement trouve
                      </td>
                    </tr>
                  ) : (
                    filteredDepartements.map((dept) => (
                      <tr
                        key={dept.id}
                        className="cursor-pointer border-b border-gray-50 transition-colors hover:bg-gray-50"
                        onClick={() => handleSelectDepartement(dept)}
                      >
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
                        <td className="p-4 text-right">
                          <Button size="sm" variant="ghost" className="gap-1">
                            Voir arrondissements
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* ARRONDISSEMENTS */}
          {activeTab === 'arrondissements' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-100 bg-gray-50">
                  <tr>
                    <th className="p-4 text-left font-semibold text-gray-600">Code</th>
                    <th className="p-4 text-left font-semibold text-gray-600">Nom</th>
                    <th className="p-4 text-left font-semibold text-gray-600">Departement</th>
                    <th className="p-4 text-right font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredArrondissements.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="p-8 text-center text-gray-500">
                        Aucun arrondissement trouve
                      </td>
                    </tr>
                  ) : (
                    filteredArrondissements.map((arr) => (
                      <tr
                        key={arr.id}
                        className="cursor-pointer border-b border-gray-50 transition-colors hover:bg-gray-50"
                        onClick={() => handleSelectArrondissement(arr)}
                      >
                        <td className="p-4">
                          <code className="rounded bg-gray-100 px-2 py-1 text-sm">{arr.code}</code>
                        </td>
                        <td className="p-4 font-semibold text-gray-900">{arr.nom}</td>
                        <td className="p-4">
                          <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">
                            {arr.departementNom}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <Button size="sm" variant="ghost" className="gap-1">
                            Voir villes
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* VILLES */}
          {activeTab === 'villes' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-100 bg-gray-50">
                  <tr>
                    <th className="p-4 text-left font-semibold text-gray-600">Code</th>
                    <th className="p-4 text-left font-semibold text-gray-600">Nom</th>
                    <th className="p-4 text-left font-semibold text-gray-600">Code Postal</th>
                    <th className="p-4 text-left font-semibold text-gray-600">Arrondissement</th>
                    <th className="p-4 text-right font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVilles.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-gray-500">
                        Aucune ville trouvee
                      </td>
                    </tr>
                  ) : (
                    filteredVilles.map((ville) => (
                      <tr
                        key={ville.id}
                        className="cursor-pointer border-b border-gray-50 transition-colors hover:bg-gray-50"
                        onClick={() => handleSelectVille(ville)}
                      >
                        <td className="p-4">
                          <code className="rounded bg-gray-100 px-2 py-1 text-sm">
                            {ville.code}
                          </code>
                        </td>
                        <td className="p-4 font-semibold text-gray-900">{ville.nom}</td>
                        <td className="p-4 text-gray-600">{ville.codePostal || '-'}</td>
                        <td className="p-4">
                          <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
                            {ville.arrondissementNom}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <Button size="sm" variant="ghost" className="gap-1">
                            Voir quartiers
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* QUARTIERS */}
          {activeTab === 'quartiers' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-100 bg-gray-50">
                  <tr>
                    <th className="p-4 text-left font-semibold text-gray-600">Code</th>
                    <th className="p-4 text-left font-semibold text-gray-600">Nom</th>
                    <th className="p-4 text-left font-semibold text-gray-600">Description</th>
                    <th className="p-4 text-left font-semibold text-gray-600">Ville</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredQuartiers.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="p-8 text-center text-gray-500">
                        Aucun quartier trouve
                      </td>
                    </tr>
                  ) : (
                    filteredQuartiers.map((q) => (
                      <tr
                        key={q.id}
                        className="border-b border-gray-50 transition-colors hover:bg-gray-50"
                      >
                        <td className="p-4">
                          <code className="rounded bg-gray-100 px-2 py-1 text-sm">{q.code}</code>
                        </td>
                        <td className="p-4 font-semibold text-gray-900">{q.nom}</td>
                        <td className="p-4 text-gray-600">{q.description || '-'}</td>
                        <td className="p-4">
                          <span className="rounded-full bg-orange-100 px-2 py-1 text-xs font-semibold text-orange-700">
                            {q.villeNom}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Footer count */}
          <div className="border-t border-gray-100 p-4">
            <p className="text-sm text-gray-500">
              {activeTab === 'regions' && `${filteredRegions.length} region(s)`}
              {activeTab === 'departements' && `${filteredDepartements.length} departement(s)`}
              {activeTab === 'arrondissements' &&
                `${filteredArrondissements.length} arrondissement(s)`}
              {activeTab === 'villes' && `${filteredVilles.length} ville(s)`}
              {activeTab === 'quartiers' && `${filteredQuartiers.length} quartier(s)`}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
