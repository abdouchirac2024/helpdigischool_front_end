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
  User,
  Shield,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  ProfileSection,
  SecuritySection,
  NotificationsSection,
} from '@/components/dashboard/shared/settings'
import SharedSettingsPage from '@/components/dashboard/shared/pages/SharedSettingsPage'

export function AdminSettingsPage() {
  const [platformName, setPlatformName] = useState('Help Digi School')
  const [supportEmail, setSupportEmail] = useState('support@helpdigischool.com')
  const [language, setLanguage] = useState('fr')
  const [timezone, setTimezone] = useState('Africa/Douala')
  const [darkMode, setDarkMode] = useState(false)

  const sections = [
    {
      id: 'profile',
      label: 'Mon profil',
      icon: User,
      content: (
        <ProfileSection
          extraFields={
            <div>
              <Label htmlFor="settings-admin-role">Role</Label>
              <Input
                id="settings-admin-role"
                defaultValue="Super Admin"
                disabled
                className="mt-1.5 bg-gray-50"
              />
            </div>
          }
        />
      ),
    },
    {
      id: 'security',
      label: 'Securite',
      icon: Shield,
      content: <SecuritySection />,
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: Bell,
      content: <NotificationsSection />,
    },
    {
      id: 'general',
      label: 'General',
      icon: Settings,
      content: (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
          <div className="border-b border-gray-100 p-4">
            <h3 className="font-semibold text-gray-900">Parametres generaux</h3>
            <p className="mt-1 text-sm text-gray-500">
              Configurez les informations de base de la plateforme
            </p>
          </div>
          <div className="space-y-6 p-6">
            {/* Platform Logo */}
            <div className="flex items-start gap-6">
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-3xl font-bold text-white">
                HD
              </div>
              <div className="flex-1">
                <p className="mb-2 font-semibold text-gray-900">Logo de la plateforme</p>
                <p className="mb-3 text-sm text-gray-500">Format recommande : PNG, 512x512px</p>
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
                    Langue par defaut
                  </div>
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2"
                >
                  <option value="fr">Francais</option>
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
                  Domaine personnalise
                </div>
              </label>
              <div className="flex gap-3">
                <Input placeholder="app.votredomaine.com" className="flex-1" />
                <Button variant="outline">Verifier</Button>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Configurez un domaine personnalise pour votre plateforme
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
                  <p className="text-sm text-gray-500">Activer le theme sombre</p>
                </div>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`h-6 w-12 rounded-full transition-colors ${darkMode ? 'bg-primary' : 'bg-gray-300'}`}
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
              </div>
            </div>

            {/* Font */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Police de caracteres
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
      id: 'email',
      label: 'Emails',
      icon: Mail,
      content: (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
          <div className="border-b border-gray-100 p-4">
            <h3 className="font-semibold text-gray-900">Emails</h3>
            <p className="mt-1 text-sm text-gray-500">Configuration en cours de developpement</p>
          </div>
          <div className="p-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
              <Settings className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-500">Cette section sera bientot disponible</p>
          </div>
        </div>
      ),
    },
    {
      id: 'integrations',
      label: 'Integrations',
      icon: Webhook,
      content: (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
          <div className="border-b border-gray-100 p-4">
            <h3 className="font-semibold text-gray-900">Integrations</h3>
            <p className="mt-1 text-sm text-gray-500">Configuration en cours de developpement</p>
          </div>
          <div className="p-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
              <Settings className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-500">Cette section sera bientot disponible</p>
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
            <p className="mt-1 text-sm text-gray-500">Configuration en cours de developpement</p>
          </div>
          <div className="p-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
              <Settings className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-500">Cette section sera bientot disponible</p>
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
            <h3 className="font-semibold text-gray-900">Cles API</h3>
            <p className="mt-1 text-sm text-gray-500">Gerez vos cles d&apos;acces API</p>
          </div>
          <div className="space-y-6 p-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Cle API Production
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
                  Regenerer
                </Button>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Cle API Test</label>
              <div className="flex gap-3">
                <Input
                  type="password"
                  value="sk_test_xxxxxxxxxxxxxxxxxxxx"
                  readOnly
                  className="flex-1 font-mono"
                />
                <Button variant="outline">Copier</Button>
                <Button variant="outline" className="text-red-600 hover:text-red-700">
                  Regenerer
                </Button>
              </div>
            </div>

            <hr className="border-gray-100" />

            <div>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">Webhooks</h4>
                  <p className="text-sm text-gray-500">Configurez vos endpoints webhook</p>
                </div>
                <Button size="sm" className="bg-primary hover:bg-primary-dark">
                  + Ajouter webhook
                </Button>
              </div>
              <div className="rounded-xl bg-gray-50 p-4 text-center text-gray-500">
                Aucun webhook configure
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl bg-blue-50 p-4">
              <HelpCircle className="h-6 w-6 text-blue-600" />
              <div className="flex-1">
                <p className="font-semibold text-blue-900">Documentation API</p>
                <p className="text-sm text-blue-700">Consultez notre documentation complete</p>
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
      label: 'Legal',
      icon: FileText,
      content: (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
          <div className="border-b border-gray-100 p-4">
            <h3 className="font-semibold text-gray-900">Legal</h3>
            <p className="mt-1 text-sm text-gray-500">Configuration en cours de developpement</p>
          </div>
          <div className="p-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
              <Settings className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-500">Cette section sera bientot disponible</p>
          </div>
        </div>
      ),
    },
  ]

  return <SharedSettingsPage role="admin" sections={sections} />
}
