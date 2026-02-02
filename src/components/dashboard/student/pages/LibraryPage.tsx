'use client'

import { useState } from 'react'
import { Search, Download, Eye, BookMarked } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const resources = [
  {
    id: 1,
    title: 'Manuel de Mathématiques CM2',
    type: 'Manuel',
    subject: 'Mathématiques',
    format: 'PDF',
    size: '15 MB',
    color: 'bg-blue-500',
  },
  {
    id: 2,
    title: 'Exercices de Français - Conjugaison',
    type: 'Exercices',
    subject: 'Français',
    format: 'PDF',
    size: '2.5 MB',
    color: 'bg-purple-500',
  },
  {
    id: 3,
    title: 'Le système solaire - Vidéo',
    type: 'Vidéo',
    subject: 'Sciences',
    format: 'MP4',
    size: '120 MB',
    color: 'bg-green-500',
  },
  {
    id: 4,
    title: "Carte de l'Afrique",
    type: 'Document',
    subject: 'Histoire-Géo',
    format: 'PDF',
    size: '5 MB',
    color: 'bg-orange-500',
  },
  {
    id: 5,
    title: 'Vocabulaire anglais - Audio',
    type: 'Audio',
    subject: 'Anglais',
    format: 'MP3',
    size: '25 MB',
    color: 'bg-red-500',
  },
  {
    id: 6,
    title: 'Fiches de révision - Examens',
    type: 'Fiches',
    subject: 'Toutes matières',
    format: 'PDF',
    size: '8 MB',
    color: 'bg-yellow-500',
  },
]

export function StudentLibraryPage() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Bibliothèque</h1>
          <p className="mt-1 text-gray-600">Accède à tes ressources pédagogiques</p>
        </div>
      </div>

      {/* Search */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Rechercher un document..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline">Filtrer</Button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {['Tous', 'Manuels', 'Exercices', 'Vidéos', 'Fiches'].map((cat) => (
          <Button
            key={cat}
            variant={cat === 'Tous' ? 'default' : 'outline'}
            size="sm"
            className={cat === 'Tous' ? 'bg-[#2302B3]' : ''}
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource) => (
          <div
            key={resource.id}
            className="overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all hover:shadow-lg"
          >
            <div className={`${resource.color} h-2`} />
            <div className="p-6">
              <div className="mb-4 flex items-start justify-between">
                <div
                  className={`h-12 w-12 rounded-xl ${resource.color}/10 flex items-center justify-center`}
                >
                  <BookMarked className={`h-6 w-6 ${resource.color.replace('bg-', 'text-')}`} />
                </div>
                <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-500">
                  {resource.format}
                </span>
              </div>
              <h3 className="mb-2 font-bold text-gray-900">{resource.title}</h3>
              <div className="mb-4 flex items-center gap-2 text-sm text-gray-500">
                <span>{resource.type}</span>
                <span>•</span>
                <span>{resource.subject}</span>
                <span>•</span>
                <span>{resource.size}</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 gap-2">
                  <Eye className="h-4 w-4" />
                  Voir
                </Button>
                <Button size="sm" className="flex-1 gap-2 bg-[#2302B3] hover:bg-[#1a0285]">
                  <Download className="h-4 w-4" />
                  Télécharger
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
