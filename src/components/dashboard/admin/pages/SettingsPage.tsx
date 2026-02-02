'use client'

import { useState } from 'react'
import {
  Settings,
  Bell,
  Mail,
  Globe,
  Palette,
  Upload,
  Languages,
  Clock,
  CreditCard as CardIcon,
  Webhook,
  Key,
  FileText,
  HelpCircle,
  ExternalLink,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import SharedSettingsPage from '@/components/dashboard/shared/pages/SharedSettingsPage'

export function AdminSettingsPage() {
  const [platformName, setPlatformName] = useState('Help Digi School')
  const [supportEmail, setSupportEmail] = useState('support@helpdigischool.com')
  const [language, setLanguage] = useState('fr')
  const [timezone, setTimezone] = useState('Africa/Douala')
  const [darkMode, setDarkMode] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [marketingEmails, setMarketingEmails] = useState(false)

  const sections = [
    {
      id: 'general',
      label: 'Général',
      icon: Settings,
      content: (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
          <div className="border-b border-gray-100 p-4">
            <h3 className="font-semibold text-gray-900">Paramètres généraux</h3>
            <p className="mt-1 text-sm text-gray-500">
              Configurez les informations de base de la plateforme
            </p>
          </div>
          <div className="space-y-6 p-6">
            {/* Platform Logo */}
            <div className="flex items-start gap-6">
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2302B3] to-[#4318FF] text-3xl font-bold text-white">
                HD
              </div>
              <div className="flex-1">
                <p className="mb-2 font-semibold text-gray-900">Logo de la plateforme</p>
                <p className="mb-3 text-sm text-gray-500">Format recommandé : PNG, 512x512px</p>
                <Button variant="outline" size="sm" className="gap-2">
                  <Upload className="h-4 w-4" />
                  Changer le logo
                </Button>
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Platform Name */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Nom de la plateforme
                </label>
                <Input value={platformName} onChange={(e) => setPlatformName(e.target.value)} />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
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
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  <div className="flex items-center gap-2">
                    <Languages className="h-4 w-4" />
                    Langue par défaut
                  </div>
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2"
                >
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Fuseau horaire
                  </div>
                </label>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2"
                >
                  <option value="Africa/Douala">Africa/Douala (WAT)</option>
                  <option value="Europe/Paris">Europe/Paris (CET)</option>
                  <option value="UTC">UTC</option>
                </select>
              </div>
            </div>

            {/* Domain */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Domaine personnalisé
                </div>
              </label>
              <div className="flex gap-3">
                <Input placeholder="app.votredomaine.com" className="flex-1" />
                <Button variant="outline">Vérifier</Button>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Configurez un domaine personnalisé pour votre plateforme
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'appearance',
      label: 'Apparence',
      icon: Palette,
      content: (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
          <div className="border-b border-gray-100 p-4">
            <h3 className="font-semibold text-gray-900">Apparence</h3>
            <p className="mt-1 text-sm text-gray-500">
              Personnalisez l&apos;apparence de la plateforme
            </p>
          </div>
          <div className="space-y-6 p-6">
            {/* Theme Toggle */}
            <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-800">
                  <Palette className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Mode sombre</p>
                  <p className="text-sm text-gray-500">Activer le thème sombre</p>
                </div>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`h-6 w-12 rounded-full transition-colors ${darkMode ? 'bg-[#2302B3]' : 'bg-gray-300'}`}
              >
                <div
                  className={`h-5 w-5 rounded-full bg-white shadow transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-0.5'}`}
                />
              </button>
            </div>

            {/* Primary Color */}
            <div>
              <label className="mb-3 block text-sm font-medium text-gray-700">
                Couleur principale
              </label>
              <div className="flex gap-3">
                {['#2302B3', '#4318FF', '#7C3AED', '#2563EB', '#059669', '#DC2626'].map((color) => (
                  <button
                    key={color}
                    className="h-10 w-10 rounded-xl border-2 border-gray-200 transition-transform hover:scale-110"
                    style={{ backgroundColor: color }}
                  />
                ))}
                <button className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-dashed border-gray-300 text-gray-400">
                  +
                </button>
              </div>
            </div>

            {/* Font */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Police de caractères
              </label>
              <select className="w-full rounded-lg border border-gray-200 px-3 py-2">
                <option>Inter</option>
                <option>Roboto</option>
                <option>Open Sans</option>
                <option>Poppins</option>
              </select>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: Bell,
      content: (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
          <div className="border-b border-gray-100 p-4">
            <h3 className="font-semibold text-gray-900">Notifications</h3>
            <p className="mt-1 text-sm text-gray-500">Gérez les préférences de notification</p>
          </div>
          <div className="space-y-4 p-6">
            {/* Email Notifications */}
            <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Notifications par email</p>
                  <p className="text-sm text-gray-500">Recevoir les alertes par email</p>
                </div>
              </div>
              <button
                onClick={() => setEmailNotifications(!emailNotifications)}
                className={`h-6 w-12 rounded-full transition-colors ${emailNotifications ? 'bg-[#2302B3]' : 'bg-gray-300'}`}
              >
                <div
                  className={`h-5 w-5 rounded-full bg-white shadow transition-transform ${emailNotifications ? 'translate-x-6' : 'translate-x-0.5'}`}
                />
              </button>
            </div>

            {/* Push Notifications */}
            <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                  <Bell className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Notifications push</p>
                  <p className="text-sm text-gray-500">Notifications en temps réel</p>
                </div>
              </div>
              <button
                onClick={() => setPushNotifications(!pushNotifications)}
                className={`h-6 w-12 rounded-full transition-colors ${pushNotifications ? 'bg-[#2302B3]' : 'bg-gray-300'}`}
              >
                <div
                  className={`h-5 w-5 rounded-full bg-white shadow transition-transform ${pushNotifications ? 'translate-x-6' : 'translate-x-0.5'}`}
                />
              </button>
            </div>

            {/* Marketing Emails */}
            <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                  <Mail className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Emails marketing</p>
                  <p className="text-sm text-gray-500">Recevoir les nouveautés et offres</p>
                </div>
              </div>
              <button
                onClick={() => setMarketingEmails(!marketingEmails)}
                className={`h-6 w-12 rounded-full transition-colors ${marketingEmails ? 'bg-[#2302B3]' : 'bg-gray-300'}`}
              >
                <div
                  className={`h-5 w-5 rounded-full bg-white shadow transition-transform ${marketingEmails ? 'translate-x-6' : 'translate-x-0.5'}`}
                />
              </button>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'email',
      label: 'Emails',
      icon: Mail,
      content: (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
          <div className="border-b border-gray-100 p-4">
            <h3 className="font-semibold text-gray-900">Emails</h3>
            <p className="mt-1 text-sm text-gray-500">Configuration en cours de développement</p>
          </div>
          <div className="p-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
              <Settings className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-500">Cette section sera bientôt disponible</p>
          </div>
        </div>
      ),
    },
    {
      id: 'integrations',
      label: 'Intégrations',
      icon: Webhook,
      content: (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
          <div className="border-b border-gray-100 p-4">
            <h3 className="font-semibold text-gray-900">Intégrations</h3>
            <p className="mt-1 text-sm text-gray-500">Configuration en cours de développement</p>
          </div>
          <div className="p-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
              <Settings className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-500">Cette section sera bientôt disponible</p>
          </div>
        </div>
      ),
    },
    {
      id: 'billing',
      label: 'Facturation',
      icon: CardIcon,
      content: (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
          <div className="border-b border-gray-100 p-4">
            <h3 className="font-semibold text-gray-900">Facturation</h3>
            <p className="mt-1 text-sm text-gray-500">Configuration en cours de développement</p>
          </div>
          <div className="p-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
              <Settings className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-500">Cette section sera bientôt disponible</p>
          </div>
        </div>
      ),
    },
    {
      id: 'api',
      label: 'API',
      icon: Key,
      content: (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
          <div className="border-b border-gray-100 p-4">
            <h3 className="font-semibold text-gray-900">Clés API</h3>
            <p className="mt-1 text-sm text-gray-500">Gérez vos clés d&apos;accès API</p>
          </div>
          <div className="space-y-6 p-6">
            {/* API Key */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
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
              <label className="mb-2 block text-sm font-medium text-gray-700">Clé API Test</label>
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
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">Webhooks</h4>
                  <p className="text-sm text-gray-500">Configurez vos endpoints webhook</p>
                </div>
                <Button size="sm" className="bg-[#2302B3] hover:bg-[#1a0285]">
                  + Ajouter webhook
                </Button>
              </div>
              <div className="rounded-xl bg-gray-50 p-4 text-center text-gray-500">
                Aucun webhook configuré
              </div>
            </div>

            {/* Documentation Link */}
            <div className="flex items-center gap-3 rounded-xl bg-blue-50 p-4">
              <HelpCircle className="h-6 w-6 text-blue-600" />
              <div className="flex-1">
                <p className="font-semibold text-blue-900">Documentation API</p>
                <p className="text-sm text-blue-700">Consultez notre documentation complète</p>
              </div>
              <Button variant="ghost" size="sm" className="gap-1 text-blue-600">
                Voir <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'legal',
      label: 'Légal',
      icon: FileText,
      content: (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
          <div className="border-b border-gray-100 p-4">
            <h3 className="font-semibold text-gray-900">Légal</h3>
            <p className="mt-1 text-sm text-gray-500">Configuration en cours de développement</p>
          </div>
          <div className="p-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
              <Settings className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-500">Cette section sera bientôt disponible</p>
          </div>
        </div>
      ),
    },
  ]

  return <SharedSettingsPage role="admin" sections={sections} />
}
