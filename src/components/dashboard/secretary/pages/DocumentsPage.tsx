'use client'

import { useState } from 'react'
import {
  LayoutDashboard,
  Users,
  UserPlus,
  CreditCard,
  FileText,
  Phone,
  Calendar,
  Printer,
  Search,
  Plus,
  Download,
  Eye,
  Trash2,
  FileCheck,
  FilePlus,
  File,
  FolderOpen,
  Award,
  GraduationCap,
  ClipboardList
} from 'lucide-react'
import { Sidebar, MenuItem } from '../../shared/Sidebar'
import { TopBar } from '../../shared/TopBar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const menuItems: MenuItem[] = [
  { icon: LayoutDashboard, label: 'Tableau de bord', href: '/dashboard/secretary' },
  { icon: Users, label: 'Élèves', href: '/dashboard/secretary/students', badge: '342' },
  { icon: UserPlus, label: 'Inscriptions', href: '/dashboard/secretary/enrollments', badge: '5' },
  { icon: CreditCard, label: 'Paiements', href: '/dashboard/secretary/payments' },
  { icon: FileText, label: 'Documents', href: '/dashboard/secretary/documents' },
  { icon: Phone, label: 'Contacts', href: '/dashboard/secretary/contacts' },
  { icon: Calendar, label: 'Rendez-vous', href: '/dashboard/secretary/appointments', badge: '3' },
  { icon: Printer, label: 'Impressions', href: '/dashboard/secretary/printing' },
]

const documentTypes = [
  { id: 'certificate', name: 'Certificat de scolarité', icon: FileCheck, color: 'bg-blue-100 text-blue-600', count: 45 },
  { id: 'attendance', name: 'Attestation de fréquentation', icon: ClipboardList, color: 'bg-green-100 text-green-600', count: 32 },
  { id: 'report', name: 'Bulletins scolaires', icon: FileText, color: 'bg-purple-100 text-purple-600', count: 342 },
  { id: 'diploma', name: 'Diplômes', icon: Award, color: 'bg-orange-100 text-orange-600', count: 28 },
  { id: 'transfer', name: 'Certificat de transfert', icon: GraduationCap, color: 'bg-pink-100 text-pink-600', count: 12 },
  { id: 'other', name: 'Autres documents', icon: File, color: 'bg-gray-100 text-gray-600', count: 67 },
]

const recentDocuments = [
  { id: 1, type: 'Certificat de scolarité', student: 'Amina Talla', class: 'CM2-A', date: '14/01/2025', status: 'ready' },
  { id: 2, type: 'Attestation de fréquentation', student: 'Paul Ngo', class: 'CM1-B', date: '14/01/2025', status: 'ready' },
  { id: 3, type: 'Certificat de scolarité', student: 'Marie Kouam', class: 'CE2-A', date: '13/01/2025', status: 'pending' },
  { id: 4, type: 'Bulletin scolaire', student: 'Jean Mbarga', class: 'CE1-B', date: '13/01/2025', status: 'ready' },
  { id: 5, type: 'Certificat de transfert', student: 'Sophie Kamga', class: 'CP-A', date: '12/01/2025', status: 'ready' },
]

export function SecretaryDocumentsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        userName="Sophie Mballa"
        userRole="Secrétaire"
      />

      <Sidebar
        menuItems={menuItems}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="lg:ml-64 pt-16 min-h-screen">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Documents</h1>
              <p className="text-gray-600 mt-1">Génération et gestion des documents administratifs</p>
            </div>
            <Button className="bg-[#2302B3] hover:bg-[#1a0285] gap-2">
              <FilePlus className="w-4 h-4" />
              Nouveau document
            </Button>
          </div>

          {/* Document Types Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {documentTypes.map((docType) => (
              <div
                key={docType.id}
                className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${docType.color} flex items-center justify-center`}>
                    <docType.icon className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900">{docType.count}</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{docType.name}</h3>
                <p className="text-sm text-gray-500">Documents générés</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-4 w-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Générer
                </Button>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-r from-[#2302B3] to-[#4318FF] rounded-xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-4">Génération rapide</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: FileCheck, label: 'Certificat de scolarité' },
                { icon: ClipboardList, label: 'Attestation' },
                { icon: FileText, label: 'Bulletin' },
                { icon: Award, label: 'Diplôme' },
              ].map((action, i) => (
                <button
                  key={i}
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-4 transition-colors text-left"
                >
                  <action.icon className="w-8 h-8 mb-2 text-white/80" />
                  <p className="text-sm font-medium">{action.label}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Search */}
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Rechercher un document par élève..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button variant="outline" className="gap-2">
                <FolderOpen className="w-4 h-4" />
                Archives
              </Button>
            </div>
          </div>

          {/* Recent Documents */}
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">Documents récents</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Élève</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Classe</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Statut</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentDocuments.map((doc) => (
                    <tr key={doc.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                            <FileText className="w-4 h-4 text-blue-600" />
                          </div>
                          <span className="font-medium text-gray-900">{doc.type}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-900">{doc.student}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded">
                          {doc.class}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{doc.date}</td>
                      <td className="px-6 py-4">
                        {doc.status === 'ready' ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                            <FileCheck className="w-3 h-3" />
                            Prêt
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">
                            En cours
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button size="sm" variant="ghost">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Printer className="w-4 h-4" />
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