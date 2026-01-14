'use client'

import { useState } from 'react'
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  School,
  Settings,
  FileText,
  CreditCard,
  Calendar,
  BarChart3,
  Bell,
  Check,
  CheckCheck,
  Trash2,
  AlertCircle,
  Info,
  AlertTriangle,
  MessageSquare,
  UserPlus,
  BookOpen,
  Clock,
  Filter
} from 'lucide-react'
import { Sidebar, MenuItem } from '../../shared/Sidebar'
import { TopBar } from '../../shared/TopBar'
import { Button } from '@/components/ui/button'

const menuItems: MenuItem[] = [
  { icon: LayoutDashboard, label: 'Vue d\'ensemble', href: '/dashboard/director' },
  { icon: Users, label: 'Élèves', href: '/dashboard/director/students', badge: '342' },
  { icon: School, label: 'Classes', href: '/dashboard/director/classes', badge: '12' },
  { icon: GraduationCap, label: 'Enseignants', href: '/dashboard/director/teachers', badge: '18' },
  { icon: FileText, label: 'Notes & Bulletins', href: '/dashboard/director/grades' },
  { icon: CreditCard, label: 'Paiements', href: '/dashboard/director/payments' },
  { icon: Calendar, label: 'Emploi du temps', href: '/dashboard/director/schedule' },
  { icon: BarChart3, label: 'Statistiques', href: '/dashboard/director/stats' },
  { icon: Bell, label: 'Notifications', href: '/dashboard/director/notifications', badge: '5' },
  { icon: Settings, label: 'Paramètres', href: '/dashboard/director/settings' },
]

const notifications = [
  { id: 1, type: 'urgent', icon: AlertCircle, title: 'Réunion parents d\'élèves', message: 'Rappel: Réunion prévue demain à 14h00 en salle polyvalente', time: 'Il y a 10 min', read: false },
  { id: 2, type: 'payment', icon: CreditCard, title: 'Nouveau paiement reçu', message: 'M. Nkolo a effectué un paiement de 150,000 FCFA pour Amina Nkolo', time: 'Il y a 30 min', read: false },
  { id: 3, type: 'info', icon: Info, title: 'Notes du 1er trimestre', message: 'Les notes de toutes les classes ont été saisies. Vérification requise.', time: 'Il y a 1h', read: false },
  { id: 4, type: 'warning', icon: AlertTriangle, title: 'Absence prolongée', message: 'L\'élève Jean Talla (5ème A) est absent depuis 3 jours', time: 'Il y a 2h', read: false },
  { id: 5, type: 'message', icon: MessageSquare, title: 'Message de Mme Ngo', message: 'Demande de rendez-vous concernant les cours supplémentaires', time: 'Il y a 3h', read: false },
  { id: 6, type: 'user', icon: UserPlus, title: 'Nouvel élève inscrit', message: 'Thomas Essomba a été inscrit en 6ème B par Mme Essomba', time: 'Il y a 5h', read: true },
  { id: 7, type: 'info', icon: BookOpen, title: 'Bulletins générés', message: '285 bulletins du 1er trimestre sont prêts pour impression', time: 'Hier 16:30', read: true },
  { id: 8, type: 'info', icon: Calendar, title: 'Emploi du temps modifié', message: 'Le cours de physique de M. Mbarga a été déplacé au jeudi', time: 'Hier 14:00', read: true },
  { id: 9, type: 'payment', icon: CreditCard, title: 'Rappel de paiement', message: '15 élèves ont des frais de scolarité en retard', time: 'Hier 09:00', read: true },
  { id: 10, type: 'message', icon: MessageSquare, title: 'Message du rectorat', message: 'Nouvelle circulaire concernant les examens de fin d\'année', time: '12/01/2025', read: true },
]

export function DirectorNotificationsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [filter, setFilter] = useState('all')
  const [notificationList, setNotificationList] = useState(notifications)

  const filteredNotifications = notificationList.filter(n => {
    if (filter === 'all') return true
    if (filter === 'unread') return !n.read
    return n.type === filter
  })

  const unreadCount = notificationList.filter(n => !n.read).length

  const markAllAsRead = () => {
    setNotificationList(notificationList.map(n => ({ ...n, read: true })))
  }

  const markAsRead = (id: number) => {
    setNotificationList(notificationList.map(n =>
      n.id === id ? { ...n, read: true } : n
    ))
  }

  const deleteNotification = (id: number) => {
    setNotificationList(notificationList.filter(n => n.id !== id))
  }

  const getTypeStyle = (type: string) => {
    const styles: Record<string, string> = {
      urgent: 'bg-red-100 text-red-600',
      warning: 'bg-orange-100 text-orange-600',
      payment: 'bg-green-100 text-green-600',
      info: 'bg-blue-100 text-blue-600',
      message: 'bg-purple-100 text-purple-600',
      user: 'bg-pink-100 text-pink-600',
    }
    return styles[type] || 'bg-gray-100 text-gray-600'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        schoolName="Lycée Bilingue de Yaoundé"
        userName="M. Kamga Jean"
        userRole="Directeur"
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
              <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
              <p className="text-gray-600 mt-1">{unreadCount} notification{unreadCount > 1 ? 's' : ''} non lue{unreadCount > 1 ? 's' : ''}</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2" onClick={markAllAsRead}>
                <CheckCheck className="w-4 h-4" />
                Tout marquer lu
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl p-4 border border-gray-100">
            <div className="flex gap-2 flex-wrap">
              {[
                { value: 'all', label: 'Toutes' },
                { value: 'unread', label: 'Non lues', count: unreadCount },
                { value: 'urgent', label: 'Urgentes' },
                { value: 'payment', label: 'Paiements' },
                { value: 'message', label: 'Messages' },
                { value: 'info', label: 'Informations' },
              ].map((f) => (
                <Button
                  key={f.value}
                  variant={filter === f.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter(f.value)}
                  className={filter === f.value ? 'bg-[#2302B3] hover:bg-[#1a0285]' : ''}
                >
                  {f.label}
                  {f.count !== undefined && f.count > 0 && (
                    <span className="ml-1.5 px-1.5 py-0.5 text-xs rounded-full bg-red-500 text-white">
                      {f.count}
                    </span>
                  )}
                </Button>
              ))}
            </div>
          </div>

          {/* Notifications List */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            {filteredNotifications.length === 0 ? (
              <div className="p-12 text-center">
                <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Aucune notification</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 flex items-start gap-4 hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-blue-50/50' : ''}`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${getTypeStyle(notification.type)}`}>
                      <notification.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className={`font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                            {notification.title}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                        </div>
                        {!notification.read && (
                          <span className="w-2 h-2 rounded-full bg-[#2302B3] flex-shrink-0 mt-2" />
                        )}
                      </div>
                      <div className="flex items-center gap-4 mt-3">
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {notification.time}
                        </span>
                        <div className="flex gap-2">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 text-xs gap-1"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <Check className="w-3 h-3" />
                              Marquer lu
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 text-xs text-red-600 hover:text-red-700 hover:bg-red-50 gap-1"
                            onClick={() => deleteNotification(notification.id)}
                          >
                            <Trash2 className="w-3 h-3" />
                            Supprimer
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
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