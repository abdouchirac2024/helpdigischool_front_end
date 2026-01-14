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
  Save,
  Upload,
  User,
  Lock,
  Mail,
  Phone,
  MapPin,
  Globe,
  Building2,
  Shield,
  Palette,
  BellRing,
  Languages
} from 'lucide-react'
import { Sidebar, MenuItem } from '../../shared/Sidebar'
import { TopBar } from '../../shared/TopBar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

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

const settingsSections = [
  { id: 'profile', label: 'Mon profil', icon: User },
  { id: 'school', label: 'Établissement', icon: Building2 },
  { id: 'security', label: 'Sécurité', icon: Shield },
  { id: 'notifications', label: 'Notifications', icon: BellRing },
  { id: 'appearance', label: 'Apparence', icon: Palette },
]

export function DirectorSettingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('profile')
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)

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
              <h1 className="text-3xl font-bold text-gray-900">Paramètres</h1>
              <p className="text-gray-600 mt-1">Gérez vos préférences et paramètres</p>
            </div>
            <Button className="bg-[#2302B3] hover:bg-[#1a0285] gap-2">
              <Save className="w-4 h-4" />
              Enregistrer
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Settings Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <nav className="p-2">
                  {settingsSections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                        activeSection === section.id
                          ? 'bg-[#2302B3]/10 text-[#2302B3]'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <section.icon className="w-5 h-5" />
                      <span className="font-medium">{section.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Settings Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Profile Settings */}
              {activeSection === 'profile' && (
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-900">Informations personnelles</h3>
                    <p className="text-sm text-gray-500 mt-1">Mettez à jour vos informations de profil</p>
                  </div>
                  <div className="p-6 space-y-6">
                    {/* Avatar */}
                    <div className="flex items-center gap-6">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#2302B3] to-[#4318FF] flex items-center justify-center text-white text-3xl font-bold">
                        JK
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-2">Photo de profil</p>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Upload className="w-4 h-4" />
                          Changer la photo
                        </Button>
                      </div>
                    </div>

                    <hr className="border-gray-100" />

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                        <Input defaultValue="Jean" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                        <Input defaultValue="Kamga" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <Input type="email" defaultValue="j.kamga@lycee-yaounde.cm" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                        <Input type="tel" defaultValue="+237 6 77 88 99 00" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Titre / Fonction</label>
                      <Input defaultValue="Directeur d'établissement" />
                    </div>
                  </div>
                </div>
              )}

              {/* School Settings */}
              {activeSection === 'school' && (
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-900">Informations de l'établissement</h3>
                    <p className="text-sm text-gray-500 mt-1">Gérez les informations de votre école</p>
                  </div>
                  <div className="p-6 space-y-6">
                    {/* School Logo */}
                    <div className="flex items-center gap-6">
                      <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#2302B3] to-[#4318FF] flex items-center justify-center text-white text-2xl font-bold">
                        LBY
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-2">Logo de l'école</p>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Upload className="w-4 h-4" />
                          Changer le logo
                        </Button>
                      </div>
                    </div>

                    <hr className="border-gray-100" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nom de l'établissement</label>
                        <Input defaultValue="Lycée Bilingue de Yaoundé" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email de contact</label>
                        <Input type="email" defaultValue="contact@lycee-yaounde.cm" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                        <Input type="tel" defaultValue="+237 222 22 22 22" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Adresse</label>
                        <Input defaultValue="Avenue Kennedy, Yaoundé, Cameroun" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Année scolaire</label>
                        <Input defaultValue="2024-2025" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Trimestre actuel</label>
                        <select className="w-full border border-gray-200 rounded-lg px-3 py-2">
                          <option>1er Trimestre</option>
                          <option>2ème Trimestre</option>
                          <option>3ème Trimestre</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Settings */}
              {activeSection === 'security' && (
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-900">Sécurité du compte</h3>
                    <p className="text-sm text-gray-500 mt-1">Protégez votre compte</p>
                  </div>
                  <div className="p-6 space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe actuel</label>
                      <Input type="password" placeholder="••••••••" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nouveau mot de passe</label>
                        <Input type="password" placeholder="••••••••" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirmer le mot de passe</label>
                        <Input type="password" placeholder="••••••••" />
                      </div>
                    </div>

                    <hr className="border-gray-100" />

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                          <Shield className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Authentification à deux facteurs</p>
                          <p className="text-sm text-gray-500">Ajoutez une couche de sécurité supplémentaire</p>
                        </div>
                      </div>
                      <Button variant="outline">Activer</Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Settings */}
              {activeSection === 'notifications' && (
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-900">Préférences de notifications</h3>
                    <p className="text-sm text-gray-500 mt-1">Choisissez comment vous souhaitez être notifié</p>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                          <Mail className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Notifications par email</p>
                          <p className="text-sm text-gray-500">Recevoir les alertes par email</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setEmailNotifications(!emailNotifications)}
                        className={`w-12 h-6 rounded-full transition-colors ${emailNotifications ? 'bg-[#2302B3]' : 'bg-gray-300'}`}
                      >
                        <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${emailNotifications ? 'translate-x-6' : 'translate-x-0.5'}`} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                          <Phone className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Notifications SMS</p>
                          <p className="text-sm text-gray-500">Recevoir les alertes urgentes par SMS</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setSmsNotifications(!smsNotifications)}
                        className={`w-12 h-6 rounded-full transition-colors ${smsNotifications ? 'bg-[#2302B3]' : 'bg-gray-300'}`}
                      >
                        <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${smsNotifications ? 'translate-x-6' : 'translate-x-0.5'}`} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                          <Bell className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Notifications push</p>
                          <p className="text-sm text-gray-500">Notifications dans l'application</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setPushNotifications(!pushNotifications)}
                        className={`w-12 h-6 rounded-full transition-colors ${pushNotifications ? 'bg-[#2302B3]' : 'bg-gray-300'}`}
                      >
                        <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${pushNotifications ? 'translate-x-6' : 'translate-x-0.5'}`} />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Appearance Settings */}
              {activeSection === 'appearance' && (
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-900">Apparence</h3>
                    <p className="text-sm text-gray-500 mt-1">Personnalisez l'interface</p>
                  </div>
                  <div className="p-6 space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Langue</label>
                      <select className="w-full border border-gray-200 rounded-lg px-3 py-2">
                        <option>Français</option>
                        <option>English</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Thème</label>
                      <div className="flex gap-4">
                        <button className="flex-1 p-4 border-2 border-[#2302B3] rounded-xl bg-white">
                          <div className="w-full h-8 bg-gray-100 rounded mb-2" />
                          <p className="text-sm font-medium text-gray-900">Clair</p>
                        </button>
                        <button className="flex-1 p-4 border-2 border-gray-200 rounded-xl bg-gray-900">
                          <div className="w-full h-8 bg-gray-700 rounded mb-2" />
                          <p className="text-sm font-medium text-white">Sombre</p>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
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