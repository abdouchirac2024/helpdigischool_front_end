'use client'

import { useState } from 'react'
import {
  CreditCard,
  FileText,
  Calendar,
  Printer,
  Plus,
  CheckCircle,
  Clock,
  AlertCircle,
  FileCheck,
  Trash2,
  RefreshCcw,
  Settings,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const printQueue = [
  {
    id: 1,
    document: 'Certificat de scolarité - Amina Talla',
    pages: 1,
    copies: 2,
    status: 'printing',
    printer: 'HP LaserJet Pro',
    addedAt: '10:30',
  },
  {
    id: 2,
    document: 'Bulletin CM2-A - 1er Trimestre',
    pages: 32,
    copies: 1,
    status: 'queued',
    printer: 'HP LaserJet Pro',
    addedAt: '10:28',
  },
  {
    id: 3,
    document: 'Liste des élèves CE2',
    pages: 3,
    copies: 1,
    status: 'queued',
    printer: 'HP LaserJet Pro',
    addedAt: '10:25',
  },
  {
    id: 4,
    document: 'Attestation - Paul Ngo',
    pages: 1,
    copies: 1,
    status: 'completed',
    printer: 'HP LaserJet Pro',
    addedAt: '10:20',
  },
  {
    id: 5,
    document: 'Certificat de scolarité - Marie Kouam',
    pages: 1,
    copies: 2,
    status: 'completed',
    printer: 'HP LaserJet Pro',
    addedAt: '10:15',
  },
  {
    id: 6,
    document: 'Convocations parents CM1',
    pages: 28,
    copies: 1,
    status: 'error',
    printer: 'HP LaserJet Pro',
    addedAt: '10:10',
  },
]

const printers = [
  { id: 1, name: 'HP LaserJet Pro', status: 'online', paper: 85, ink: 70, location: 'Secrétariat' },
  {
    id: 2,
    name: 'Canon ImageRunner',
    status: 'online',
    paper: 100,
    ink: 90,
    location: 'Salle des profs',
  },
  { id: 3, name: 'Epson WorkForce', status: 'offline', paper: 20, ink: 45, location: 'Direction' },
]

export function SecretaryPrintingPage() {
  const [selectedPrinter, setSelectedPrinter] = useState('all')

  const getStatusConfig = (status: string) => {
    const configs = {
      printing: {
        bg: 'bg-blue-100',
        text: 'text-blue-700',
        icon: RefreshCcw,
        label: 'En cours',
        animate: true,
      },
      queued: {
        bg: 'bg-yellow-100',
        text: 'text-yellow-700',
        icon: Clock,
        label: 'En attente',
        animate: false,
      },
      completed: {
        bg: 'bg-green-100',
        text: 'text-green-700',
        icon: CheckCircle,
        label: 'Terminé',
        animate: false,
      },
      error: {
        bg: 'bg-red-100',
        text: 'text-red-700',
        icon: AlertCircle,
        label: 'Erreur',
        animate: false,
      },
    }
    return configs[status as keyof typeof configs]
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Impressions</h1>
          <p className="mt-1 text-gray-600">Gestion de la file d'attente d'impression</p>
        </div>
        <Button className="gap-2 bg-[#2302B3] hover:bg-[#1a0285]">
          <Plus className="h-4 w-4" />
          Nouvelle impression
        </Button>
      </div>

      {/* Printers Status */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {printers.map((printer) => (
          <div key={printer.id} className="rounded-xl border border-gray-100 bg-white p-6">
            <div className="mb-4 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                    printer.status === 'online' ? 'bg-green-100' : 'bg-red-100'
                  }`}
                >
                  <Printer
                    className={`h-5 w-5 ${printer.status === 'online' ? 'text-green-600' : 'text-red-600'}`}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{printer.name}</h3>
                  <p className="text-xs text-gray-500">{printer.location}</p>
                </div>
              </div>
              <span
                className={`rounded-full px-2 py-1 text-xs font-semibold ${
                  printer.status === 'online'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {printer.status === 'online' ? 'En ligne' : 'Hors ligne'}
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-gray-600">Papier</span>
                  <span className="font-semibold">{printer.paper}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                  <div
                    className={`h-full ${printer.paper > 50 ? 'bg-green-500' : printer.paper > 20 ? 'bg-yellow-500' : 'bg-red-500'}`}
                    style={{ width: `${printer.paper}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-gray-600">Encre</span>
                  <span className="font-semibold">{printer.ink}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                  <div
                    className={`h-full ${printer.ink > 50 ? 'bg-blue-500' : printer.ink > 20 ? 'bg-yellow-500' : 'bg-red-500'}`}
                    style={{ width: `${printer.ink}%` }}
                  />
                </div>
              </div>
            </div>

            <Button variant="outline" size="sm" className="mt-4 w-full gap-2">
              <Settings className="h-4 w-4" />
              Paramètres
            </Button>
          </div>
        ))}
      </div>

      {/* Print Queue */}
      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h3 className="font-semibold text-gray-900">File d'attente</h3>
          <div className="flex items-center gap-3">
            <Select value={selectedPrinter} onValueChange={setSelectedPrinter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Imprimante" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les imprimantes</SelectItem>
                {printers.map((p) => (
                  <SelectItem key={p.id} value={p.name}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="gap-2">
              <RefreshCcw className="h-4 w-4" />
              Actualiser
            </Button>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {printQueue.map((job) => {
            const statusConfig = getStatusConfig(job.status)
            const StatusIcon = statusConfig.icon
            return (
              <div key={job.id} className="flex items-center gap-4 p-4 hover:bg-gray-50">
                <div
                  className={`h-10 w-10 rounded-lg ${statusConfig.bg} flex items-center justify-center`}
                >
                  <StatusIcon
                    className={`h-5 w-5 ${statusConfig.text} ${statusConfig.animate ? 'animate-spin' : ''}`}
                  />
                </div>

                <div className="flex-1">
                  <p className="font-medium text-gray-900">{job.document}</p>
                  <div className="mt-1 flex items-center gap-4">
                    <span className="text-sm text-gray-500">{job.pages} page(s)</span>
                    <span className="text-sm text-gray-500">{job.copies} copie(s)</span>
                    <span className="text-sm text-gray-500">{job.printer}</span>
                    <span className="text-sm text-gray-400">{job.addedAt}</span>
                  </div>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${statusConfig.bg} ${statusConfig.text}`}
                >
                  {statusConfig.label}
                </span>

                <div className="flex items-center gap-1">
                  {job.status === 'queued' && (
                    <Button size="sm" variant="outline" className="gap-1">
                      <Printer className="h-4 w-4" />
                      Imprimer
                    </Button>
                  )}
                  {job.status === 'error' && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1 border-orange-200 text-orange-600"
                    >
                      <RefreshCcw className="h-4 w-4" />
                      Réessayer
                    </Button>
                  )}
                  {job.status === 'completed' && (
                    <Button size="sm" variant="ghost" className="gap-1">
                      <FileCheck className="h-4 w-4 text-green-600" />
                    </Button>
                  )}
                  {(job.status === 'queued' || job.status === 'error') && (
                    <Button size="sm" variant="ghost" className="text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Quick Print Templates */}
      <div className="rounded-xl border border-gray-100 bg-white p-6">
        <h3 className="mb-4 font-semibold text-gray-900">Impressions rapides</h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            {
              icon: FileText,
              label: 'Liste de classe',
              description: "Imprimer la liste d'une classe",
            },
            { icon: FileCheck, label: 'Certificats', description: 'Certificats de scolarité' },
            { icon: CreditCard, label: 'Reçus', description: 'Reçus de paiement' },
            { icon: Calendar, label: 'Emploi du temps', description: 'Planning hebdomadaire' },
          ].map((template, i) => (
            <button
              key={i}
              className="rounded-xl border-2 border-dashed border-gray-200 p-4 text-left transition-all hover:border-[#2302B3] hover:bg-[#2302B3]/5"
            >
              <template.icon className="mb-2 h-8 w-8 text-[#2302B3]" />
              <p className="font-semibold text-gray-900">{template.label}</p>
              <p className="mt-1 text-xs text-gray-500">{template.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
