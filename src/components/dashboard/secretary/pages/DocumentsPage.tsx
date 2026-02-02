'use client'

import { useState } from 'react'
import {
  FileText,
  Printer,
  Search,
  Plus,
  Download,
  Eye,
  FileCheck,
  FilePlus,
  File,
  FolderOpen,
  Award,
  GraduationCap,
  ClipboardList,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const documentTypes = [
  {
    id: 'certificate',
    name: 'Certificat de scolarité',
    icon: FileCheck,
    color: 'bg-blue-100 text-blue-600',
    count: 45,
  },
  {
    id: 'attendance',
    name: 'Attestation de fréquentation',
    icon: ClipboardList,
    color: 'bg-green-100 text-green-600',
    count: 32,
  },
  {
    id: 'report',
    name: 'Bulletins scolaires',
    icon: FileText,
    color: 'bg-purple-100 text-purple-600',
    count: 342,
  },
  {
    id: 'diploma',
    name: 'Diplômes',
    icon: Award,
    color: 'bg-orange-100 text-orange-600',
    count: 28,
  },
  {
    id: 'transfer',
    name: 'Certificat de transfert',
    icon: GraduationCap,
    color: 'bg-pink-100 text-pink-600',
    count: 12,
  },
  {
    id: 'other',
    name: 'Autres documents',
    icon: File,
    color: 'bg-gray-100 text-gray-600',
    count: 67,
  },
]

const recentDocuments = [
  {
    id: 1,
    type: 'Certificat de scolarité',
    student: 'Amina Talla',
    class: 'CM2-A',
    date: '14/01/2025',
    status: 'ready',
  },
  {
    id: 2,
    type: 'Attestation de fréquentation',
    student: 'Paul Ngo',
    class: 'CM1-B',
    date: '14/01/2025',
    status: 'ready',
  },
  {
    id: 3,
    type: 'Certificat de scolarité',
    student: 'Marie Kouam',
    class: 'CE2-A',
    date: '13/01/2025',
    status: 'pending',
  },
  {
    id: 4,
    type: 'Bulletin scolaire',
    student: 'Jean Mbarga',
    class: 'CE1-B',
    date: '13/01/2025',
    status: 'ready',
  },
  {
    id: 5,
    type: 'Certificat de transfert',
    student: 'Sophie Kamga',
    class: 'CP-A',
    date: '12/01/2025',
    status: 'ready',
  },
]

export function SecretaryDocumentsPage() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Documents</h1>
          <p className="mt-1 text-gray-600">Génération et gestion des documents administratifs</p>
        </div>
        <Button className="gap-2 bg-[#2302B3] hover:bg-[#1a0285]">
          <FilePlus className="h-4 w-4" />
          Nouveau document
        </Button>
      </div>

      {/* Document Types Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {documentTypes.map((docType) => (
          <div
            key={docType.id}
            className="group cursor-pointer rounded-xl border border-gray-100 bg-white p-6 transition-all hover:shadow-lg"
          >
            <div className="mb-4 flex items-start justify-between">
              <div
                className={`h-12 w-12 rounded-xl ${docType.color} flex items-center justify-center`}
              >
                <docType.icon className="h-6 w-6" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{docType.count}</span>
            </div>
            <h3 className="mb-1 font-semibold text-gray-900">{docType.name}</h3>
            <p className="text-sm text-gray-500">Documents générés</p>
            <Button
              variant="ghost"
              size="sm"
              className="mt-4 w-full opacity-0 transition-opacity group-hover:opacity-100"
            >
              <Plus className="mr-2 h-4 w-4" />
              Générer
            </Button>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="rounded-xl bg-gradient-to-r from-[#2302B3] to-[#4318FF] p-6 text-white">
        <h3 className="mb-4 text-lg font-semibold">Génération rapide</h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { icon: FileCheck, label: 'Certificat de scolarité' },
            { icon: ClipboardList, label: 'Attestation' },
            { icon: FileText, label: 'Bulletin' },
            { icon: Award, label: 'Diplôme' },
          ].map((action, i) => (
            <button
              key={i}
              className="rounded-xl bg-white/10 p-4 text-left backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              <action.icon className="mb-2 h-8 w-8 text-white/80" />
              <p className="text-sm font-medium">{action.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="rounded-xl border border-gray-100 bg-white p-4">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Rechercher un document par élève..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <FolderOpen className="h-4 w-4" />
            Archives
          </Button>
        </div>
      </div>

      {/* Recent Documents */}
      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white">
        <div className="border-b border-gray-100 px-6 py-4">
          <h3 className="font-semibold text-gray-900">Documents récents</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-600">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-600">
                  Élève
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-600">
                  Classe
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-600">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-600">
                  Statut
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold uppercase text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentDocuments.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                        <FileText className="h-4 w-4 text-blue-600" />
                      </div>
                      <span className="font-medium text-gray-900">{doc.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900">{doc.student}</td>
                  <td className="px-6 py-4">
                    <span className="rounded bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-700">
                      {doc.class}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{doc.date}</td>
                  <td className="px-6 py-4">
                    {doc.status === 'ready' ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
                        <FileCheck className="h-3 w-3" />
                        Prêt
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-700">
                        En cours
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button size="sm" variant="ghost">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Printer className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
