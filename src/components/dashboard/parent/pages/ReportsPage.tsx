'use client'

import { useState } from 'react'
import { FileText, Download, Eye, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const reports = [
  {
    id: 1,
    student: 'Amina Talla',
    class: 'CM2-A',
    period: '1er Trimestre',
    year: '2024-2025',
    average: 15.8,
    rank: 3,
    total: 32,
    date: '15/12/2024',
    status: 'available',
  },
  {
    id: 2,
    student: 'Paul Talla',
    class: 'CE2-B',
    period: '1er Trimestre',
    year: '2024-2025',
    average: 14.2,
    rank: 8,
    total: 28,
    date: '15/12/2024',
    status: 'available',
  },
  {
    id: 3,
    student: 'Amina Talla',
    class: 'CM2-A',
    period: '2ème Trimestre',
    year: '2023-2024',
    average: 15.2,
    rank: 4,
    total: 32,
    date: '15/03/2024',
    status: 'available',
  },
  {
    id: 4,
    student: 'Paul Talla',
    class: 'CE2-B',
    period: '2ème Trimestre',
    year: '2023-2024',
    average: 13.8,
    rank: 10,
    total: 28,
    date: '15/03/2024',
    status: 'available',
  },
]

export function ParentReportsPage() {
  const [childFilter, setChildFilter] = useState('all')
  const [yearFilter, setYearFilter] = useState('all')

  const filteredReports = reports.filter((report) => {
    const matchesChild = childFilter === 'all' || report.student.includes(childFilter)
    const matchesYear = yearFilter === 'all' || report.year === yearFilter
    return matchesChild && matchesYear
  })

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Bulletins Scolaires</h1>
          <p className="mt-1 text-gray-600">{filteredReports.length} bulletins disponibles</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Tout télécharger
        </Button>
      </div>

      {/* Filters */}
      <div className="rounded-xl border border-gray-100 bg-white p-4">
        <div className="flex flex-col gap-4 md:flex-row">
          <Select value={childFilter} onValueChange={setChildFilter}>
            <SelectTrigger className="w-full md:w-[200px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Enfant" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les enfants</SelectItem>
              <SelectItem value="Amina">Amina Talla</SelectItem>
              <SelectItem value="Paul">Paul Talla</SelectItem>
            </SelectContent>
          </Select>
          <Select value={yearFilter} onValueChange={setYearFilter}>
            <SelectTrigger className="w-full md:w-[200px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Année" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les années</SelectItem>
              <SelectItem value="2024-2025">2024-2025</SelectItem>
              <SelectItem value="2023-2024">2023-2024</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredReports.map((report) => (
          <div
            key={report.id}
            className="overflow-hidden rounded-xl border border-gray-100 bg-white transition-shadow hover:shadow-lg"
          >
            <div className="bg-gradient-to-r from-[#2302B3] to-[#4318FF] p-4">
              <div className="flex items-center justify-between text-white">
                <FileText className="h-8 w-8" />
                <span className="rounded-full bg-white/20 px-2 py-1 text-xs font-semibold">
                  {report.period}
                </span>
              </div>
            </div>

            <div className="p-6">
              <h3 className="mb-1 text-lg font-bold text-gray-900">{report.student}</h3>
              <p className="mb-4 text-sm text-gray-500">
                {report.class} • {report.year}
              </p>

              <div className="mb-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Moyenne</span>
                  <span className="font-bold text-[#2302B3]">{report.average}/20</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Rang</span>
                  <span className="font-bold text-gray-900">
                    {report.rank}/{report.total}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Date</span>
                  <span className="text-sm text-gray-900">{report.date}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 gap-2">
                  <Eye className="h-4 w-4" />
                  Voir
                </Button>
                <Button size="sm" className="flex-1 gap-2 bg-[#2302B3] hover:bg-[#1a0285]">
                  <Download className="h-4 w-4" />
                  PDF
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
