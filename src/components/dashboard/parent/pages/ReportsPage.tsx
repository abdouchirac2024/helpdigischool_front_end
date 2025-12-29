'use client'

import { useState } from 'react'
import { 
  LayoutDashboard,
  User,
  FileText,
  CreditCard,
  MessageSquare,
  Calendar,
  Award,
  Download,
  Eye,
  Filter,
  Search
} from 'lucide-react'
import { Sidebar, MenuItem } from '../../shared/Sidebar'
import { TopBar } from '../../shared/TopBar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const menuItems: MenuItem[] = [
  { icon: LayoutDashboard, label: 'Tableau de bord', href: '/dashboard/parent' },
  { icon: User, label: 'Mes enfants', href: '/dashboard/parent/children' },
  { icon: FileText, label: 'Bulletins', href: '/dashboard/parent/reports' },
  { icon: Award, label: 'Notes & Résultats', href: '/dashboard/parent/grades' },
  { icon: CreditCard, label: 'Paiements', href: '/dashboard/parent/payments' },
  { icon: Calendar, label: 'Emploi du temps', href: '/dashboard/parent/schedule' },
  { icon: MessageSquare, label: 'Messages', href: '/dashboard/parent/messages', badge: '2' },
]

const reports = [
  { id: 1, student: 'Amina Talla', class: 'CM2-A', period: '1er Trimestre', year: '2024-2025', average: 15.8, rank: 3, total: 32, date: '15/12/2024', status: 'available' },
  { id: 2, student: 'Paul Talla', class: 'CE2-B', period: '1er Trimestre', year: '2024-2025', average: 14.2, rank: 8, total: 28, date: '15/12/2024', status: 'available' },
  { id: 3, student: 'Amina Talla', class: 'CM2-A', period: '2ème Trimestre', year: '2023-2024', average: 15.2, rank: 4, total: 32, date: '15/03/2024', status: 'available' },
  { id: 4, student: 'Paul Talla', class: 'CE2-B', period: '2ème Trimestre', year: '2023-2024', average: 13.8, rank: 10, total: 28, date: '15/03/2024', status: 'available' },
]

export function ParentReportsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [childFilter, setChildFilter] = useState('all')
  const [yearFilter, setYearFilter] = useState('all')

  const filteredReports = reports.filter(report => {
    const matchesChild = childFilter === 'all' || report.student.includes(childFilter)
    const matchesYear = yearFilter === 'all' || report.year === yearFilter
    return matchesChild && matchesYear
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar 
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        userName="Jean Talla"
        userRole="Parent"
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
              <h1 className="text-3xl font-bold text-gray-900">Bulletins Scolaires</h1>
              <p className="text-gray-600 mt-1">{filteredReports.length} bulletins disponibles</p>
            </div>
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Tout télécharger
            </Button>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4">
              <Select value={childFilter} onValueChange={setChildFilter}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <Filter className="w-4 h-4 mr-2" />
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
                  <Filter className="w-4 h-4 mr-2" />
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReports.map((report) => (
              <div key={report.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="bg-gradient-to-r from-[#2302B3] to-[#4318FF] p-4">
                  <div className="flex items-center justify-between text-white">
                    <FileText className="w-8 h-8" />
                    <span className="px-2 py-1 bg-white/20 rounded-full text-xs font-semibold">
                      {report.period}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-1">{report.student}</h3>
                  <p className="text-sm text-gray-500 mb-4">{report.class} • {report.year}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Moyenne</span>
                      <span className="font-bold text-[#2302B3]">{report.average}/20</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Rang</span>
                      <span className="font-bold text-gray-900">{report.rank}/{report.total}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Date</span>
                      <span className="text-sm text-gray-900">{report.date}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 gap-2">
                      <Eye className="w-4 h-4" />
                      Voir
                    </Button>
                    <Button size="sm" className="flex-1 bg-[#2302B3] hover:bg-[#1a0285] gap-2">
                      <Download className="w-4 h-4" />
                      PDF
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
