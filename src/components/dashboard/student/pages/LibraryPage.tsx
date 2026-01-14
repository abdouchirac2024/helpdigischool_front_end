'use client'

import { useState } from 'react'
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  Award,
  FileText,
  MessageSquare,
  Library,
  Settings,
  Search,
  Download,
  Eye,
  BookMarked
} from 'lucide-react'
import { Sidebar, MenuItem } from '../../shared/Sidebar'
import { TopBar } from '../../shared/TopBar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const menuItems: MenuItem[] = [
  { icon: LayoutDashboard, label: 'Tableau de bord', href: '/dashboard/student' },
  { icon: Award, label: 'Mes Notes', href: '/dashboard/student/grades' },
  { icon: BookOpen, label: 'Mes Cours', href: '/dashboard/student/courses' },
  { icon: Calendar, label: 'Emploi du temps', href: '/dashboard/student/schedule' },
  { icon: FileText, label: 'Devoirs', href: '/dashboard/student/homework', badge: '3' },
  { icon: MessageSquare, label: 'Messages', href: '/dashboard/student/messages', badge: '2' },
  { icon: Library, label: 'Bibliothèque', href: '/dashboard/student/library' },
  { icon: Settings, label: 'Paramètres', href: '/dashboard/student/settings' },
]

const resources = [
  {
    id: 1,
    title: 'Manuel de Mathématiques CM2',
    type: 'Manuel',
    subject: 'Mathématiques',
    format: 'PDF',
    size: '15 MB',
    color: 'bg-blue-500'
  },
  {
    id: 2,
    title: 'Exercices de Français - Conjugaison',
    type: 'Exercices',
    subject: 'Français',
    format: 'PDF',
    size: '2.5 MB',
    color: 'bg-purple-500'
  },
  {
    id: 3,
    title: 'Le système solaire - Vidéo',
    type: 'Vidéo',
    subject: 'Sciences',
    format: 'MP4',
    size: '120 MB',
    color: 'bg-green-500'
  },
  {
    id: 4,
    title: 'Carte de l\'Afrique',
    type: 'Document',
    subject: 'Histoire-Géo',
    format: 'PDF',
    size: '5 MB',
    color: 'bg-orange-500'
  },
  {
    id: 5,
    title: 'Vocabulaire anglais - Audio',
    type: 'Audio',
    subject: 'Anglais',
    format: 'MP3',
    size: '25 MB',
    color: 'bg-red-500'
  },
  {
    id: 6,
    title: 'Fiches de révision - Examens',
    type: 'Fiches',
    subject: 'Toutes matières',
    format: 'PDF',
    size: '8 MB',
    color: 'bg-yellow-500'
  },
]

export function StudentLibraryPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        userName="Amina Talla"
        userRole="Élève - CM2-A"
      />

      <Sidebar
        menuItems={menuItems}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="lg:ml-64 pt-16 min-h-screen pb-20 lg:pb-0">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Bibliothèque</h1>
              <p className="text-gray-600 mt-1">Accède à tes ressources pédagogiques</p>
            </div>
          </div>

          {/* Search */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
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
          <div className="flex gap-2 flex-wrap">
            {['Tous', 'Manuels', 'Exercices', 'Vidéos', 'Fiches'].map((cat) => (
              <Button key={cat} variant={cat === 'Tous' ? 'default' : 'outline'} size="sm" className={cat === 'Tous' ? 'bg-[#2302B3]' : ''}>
                {cat}
              </Button>
            ))}
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <div
                key={resource.id}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all"
              >
                <div className={`${resource.color} h-2`} />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl ${resource.color}/10 flex items-center justify-center`}>
                      <BookMarked className={`w-6 h-6 ${resource.color.replace('bg-', 'text-')}`} />
                    </div>
                    <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {resource.format}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{resource.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <span>{resource.type}</span>
                    <span>•</span>
                    <span>{resource.subject}</span>
                    <span>•</span>
                    <span>{resource.size}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 gap-2">
                      <Eye className="w-4 h-4" />
                      Voir
                    </Button>
                    <Button size="sm" className="flex-1 bg-[#2302B3] hover:bg-[#1a0285] gap-2">
                      <Download className="w-4 h-4" />
                      Télécharger
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}