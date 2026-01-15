'use client'

import { useState } from 'react'
import {
  LayoutDashboard,
  Building2,
  Users,
  CreditCard,
  TrendingUp,
  Settings,
  BarChart3,
  Shield,
  Database,
  Bell,
  Mail,
  Globe,
  Palette,
  Save,
  Upload,
  Languages,
  Clock,
  CreditCard as CardIcon,
  Webhook,
  Key,
  FileText,
  HelpCircle,
  ExternalLink
} from 'lucide-react'
import { Sidebar, MenuItem } from '../../shared/Sidebar'
import { TopBar } from '../../shared/TopBar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const menuItems: MenuItem[] = [
  { icon: LayoutDashboard, label: 'Vue d\'ensemble', href: '/dashboard/admin' },
  { icon: Building2, label: 'Écoles', href: '/dashboard/admin/schools', badge: '127' },
  { icon: Users, label: 'Utilisateurs', href: '/dashboard/admin/users', badge: '2.4k' },
  { icon: CreditCard, label: 'Abonnements', href: '/dashboard/admin/subscriptions' },
  { icon: TrendingUp, label: 'Revenus', href: '/dashboard/admin/revenue' },
  { icon: BarChart3, label: 'Analytiques', href: '/dashboard/admin/analytics' },
  { icon: Database, label: 'Base de données', href: '/dashboard/admin/database' },
  { icon: Shield, label: 'Sécurité', href: '/dashboard/admin/security' },
  { icon: Settings, label: 'Paramètres', href: '/dashboard/admin/settings' },
]

const settingsSections = [
  { id: 'general', label: 'Général', icon: Settings },
  { id: 'appearance', label: 'Apparence', icon: Palette },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'email', label: 'Emails', icon: Mail },
  { id: 'integrations', label: 'Intégrations', icon: Webhook },
  { id: 'billing', label: 'Facturation', icon: CardIcon },
  { id: 'api', label: 'API', icon: Key },
  { id: 'legal', label: 'Légal', icon: FileText },
]

export function AdminSettingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('general')
  const [platformName, setPlatformName] = useState('Help Digi School')
  const [supportEmail, setSupportEmail] = useState('support@helpdigischool.com')
  const [language, setLanguage] = useState('fr')
  const [timezone, setTimezone] = useState('Africa/Douala')
  const [darkMode, setDarkMode] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [marketingEmails, setMarketingEmails] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        schoolName="Admin SaaS"
        userName="Admin Principal"
        userRole="Super Admin"
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
              <p className="text-gray-600 mt-1">Configurez les paramètres de la plateforme</p>
            </div>
            <Button className="bg-[#2302B3] hover:bg-[#1a0285] gap-2">
              <Save className="w-4 h-4" />
              Sauvegarder
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Settings Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-900">Configuration</h3>
                </div>
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
              {/* General Settings */}
              {activeSection === 'general' && (
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-900">Paramètres généraux</h3>
                    <p className="text-sm text-gray-500 mt-1">Configurez les informations de base de la plateforme</p>
                  </div>
                  <div className="p-6 space-y-6">
                    {/* Platform Logo */}
                    <div className="flex items-start gap-6">
                      <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#2302B3] to-[#4318FF] flex items-center justify-center text-white text-3xl font-bold">
                        HD
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 mb-2">Logo de la plateforme</p>
                        <p className="text-sm text-gray-500 mb-3">Format recommandé : PNG, 512x512px</p>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Upload className="w-4 h-4" />
                          Changer le logo
                        </Button>
                      </div>
                    </div>

                    <hr className="border-gray-100" />

                    {/* Platform Name */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nom de la plateforme
                        </label>
                        <Input
                          value={platformName}
                          onChange={(e) => setPlatformName(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email de support
                        </label>
                        <Input
                          type="email"
                          value={supportEmail}
                          onChange={(e) => setSupportEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Language & Timezone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <div className="flex items-center gap-2">
                            <Languages className="w-4 h-4" />
                            Langue par défaut
                          </div>
                        </label>
                        <select
                          value={language}
                          onChange={(e) => setLanguage(e.target.value)}
                          className="w-full border border-gray-200 rounded-lg px-3 py-2"
                        >
                          <option value="fr">Français</option>
                          <option value="en">English</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            Fuseau horaire
                          </div>
                        </label>
                        <select
                          value={timezone}
                          onChange={(e) => setTimezone(e.target.value)}
                          className="w-full border border-gray-200 rounded-lg px-3 py-2"
                        >
                          <option value="Africa/Douala">Africa/Douala (WAT)</option>
                          <option value="Europe/Paris">Europe/Paris (CET)</option>
                          <option value="UTC">UTC</option>
                        </select>
                      </div>
                    </div>

                    {/* Domain */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4" />
                          Domaine personnalisé
                        </div>
                      </label>
                      <div className="flex gap-3">
                        <Input
                          placeholder="app.votredomaine.com"
                          className="flex-1"
                        />
                        <Button variant="outline">Vérifier</Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Configurez un domaine personnalisé pour votre plateforme
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Appearance Settings */}
              {activeSection === 'appearance' && (
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-900">Apparence</h3>
                    <p className="text-sm text-gray-500 mt-1">Personnalisez l'apparence de la plateforme</p>
                  </div>
                  <div className="p-6 space-y-6">
                    {/* Theme Toggle */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center">
                          <Palette className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Mode sombre</p>
                          <p className="text-sm text-gray-500">Activer le thème sombre</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setDarkMode(!darkMode)}
                        className={`w-12 h-6 rounded-full transition-colors ${darkMode ? 'bg-[#2302B3]' : 'bg-gray-300'}`}
                      >
                        <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-0.5'}`} />
                      </button>
                    </div>

                    {/* Primary Color */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Couleur principale
                      </label>
                      <div className="flex gap-3">
                        {['#2302B3', '#4318FF', '#7C3AED', '#2563EB', '#059669', '#DC2626'].map((color) => (
                          <button
                            key={color}
                            className="w-10 h-10 rounded-xl border-2 border-gray-200 hover:scale-110 transition-transform"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                        <button className="w-10 h-10 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                          +
                        </button>
                      </div>
                    </div>

                    {/* Font */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Police de caractères
                      </label>
                      <select className="w-full border border-gray-200 rounded-lg px-3 py-2">
                        <option>Inter</option>
                        <option>Roboto</option>
                        <option>Open Sans</option>
                        <option>Poppins</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Settings */}
              {activeSection === 'notifications' && (
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                    <p className="text-sm text-gray-500 mt-1">Gérez les préférences de notification</p>
                  </div>
                  <div className="p-6 space-y-4">
                    {/* Email Notifications */}
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

                    {/* Push Notifications */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                          <Bell className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Notifications push</p>
                          <p className="text-sm text-gray-500">Notifications en temps réel</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setPushNotifications(!pushNotifications)}
                        className={`w-12 h-6 rounded-full transition-colors ${pushNotifications ? 'bg-[#2302B3]' : 'bg-gray-300'}`}
                      >
                        <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${pushNotifications ? 'translate-x-6' : 'translate-x-0.5'}`} />
                      </button>
                    </div>

                    {/* Marketing Emails */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                          <Mail className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Emails marketing</p>
                          <p className="text-sm text-gray-500">Recevoir les nouveautés et offres</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setMarketingEmails(!marketingEmails)}
                        className={`w-12 h-6 rounded-full transition-colors ${marketingEmails ? 'bg-[#2302B3]' : 'bg-gray-300'}`}
                      >
                        <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${marketingEmails ? 'translate-x-6' : 'translate-x-0.5'}`} />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* API Settings */}
              {activeSection === 'api' && (
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-900">Clés API</h3>
                    <p className="text-sm text-gray-500 mt-1">Gérez vos clés d'accès API</p>
                  </div>
                  <div className="p-6 space-y-6">
                    {/* API Key */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Clé API Production
                      </label>
                      <div className="flex gap-3">
                        <Input
                          type="password"
                          value="sk_live_xxxxxxxxxxxxxxxxxxxx"
                          readOnly
                          className="flex-1 font-mono"
                        />
                        <Button variant="outline">Copier</Button>
                        <Button variant="outline" className="text-red-600 hover:text-red-700">
                          Régénérer
                        </Button>
                      </div>
                    </div>

                    {/* Test API Key */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Clé API Test
                      </label>
                      <div className="flex gap-3">
                        <Input
                          type="password"
                          value="sk_test_xxxxxxxxxxxxxxxxxxxx"
                          readOnly
                          className="flex-1 font-mono"
                        />
                        <Button variant="outline">Copier</Button>
                        <Button variant="outline" className="text-red-600 hover:text-red-700">
                          Régénérer
                        </Button>
                      </div>
                    </div>

                    <hr className="border-gray-100" />

                    {/* Webhooks */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-gray-900">Webhooks</h4>
                          <p className="text-sm text-gray-500">Configurez vos endpoints webhook</p>
                        </div>
                        <Button size="sm" className="bg-[#2302B3] hover:bg-[#1a0285]">
                          + Ajouter webhook
                        </Button>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4 text-center text-gray-500">
                        Aucun webhook configuré
                      </div>
                    </div>

                    {/* Documentation Link */}
                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
                      <HelpCircle className="w-6 h-6 text-blue-600" />
                      <div className="flex-1">
                        <p className="font-semibold text-blue-900">Documentation API</p>
                        <p className="text-sm text-blue-700">Consultez notre documentation complète</p>
                      </div>
                      <Button variant="ghost" size="sm" className="text-blue-600 gap-1">
                        Voir <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Other sections placeholder */}
              {['email', 'integrations', 'billing', 'legal'].includes(activeSection) && (
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-900">
                      {settingsSections.find(s => s.id === activeSection)?.label}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">Configuration en cours de développement</p>
                  </div>
                  <div className="p-12 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
                      <Settings className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500">Cette section sera bientôt disponible</p>
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