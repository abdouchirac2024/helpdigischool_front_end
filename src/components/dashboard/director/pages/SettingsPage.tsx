'use client'

import { User, Building2, Shield, BellRing, Palette } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  ProfileSection,
  SecuritySection,
  NotificationsSection,
} from '@/components/dashboard/shared/settings'
import SharedSettingsPage from '@/components/dashboard/shared/pages/SharedSettingsPage'

export function DirectorSettingsPage() {
  const sections = [
    {
      id: 'profile',
      label: 'Mon profil',
      icon: User,
      content: (
        <ProfileSection
          extraFields={
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <Label htmlFor="settings-school">Etablissement</Label>
                <Input
                  id="settings-school"
                  defaultValue=""
                  disabled
                  className="mt-1.5 bg-gray-50"
                  placeholder="Nom de l'etablissement"
                />
              </div>
              <div>
                <Label htmlFor="settings-function">Titre / Fonction</Label>
                <Input
                  id="settings-function"
                  defaultValue="Directeur d'etablissement"
                  disabled
                  className="mt-1.5 bg-gray-50"
                />
              </div>
            </div>
          }
        />
      ),
    },
    {
      id: 'school',
      label: 'Etablissement',
      icon: Building2,
      content: (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
          <div className="border-b border-gray-100 p-4">
            <h3 className="font-semibold text-gray-900">Informations de l&apos;etablissement</h3>
            <p className="mt-1 text-sm text-gray-500">Cette section sera bientot disponible</p>
          </div>
          <div className="p-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
              <Building2 className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-500">Gestion de l&apos;etablissement bientot disponible</p>
          </div>
        </div>
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
      icon: BellRing,
      content: <NotificationsSection />,
    },
    {
      id: 'appearance',
      label: 'Apparence',
      icon: Palette,
      content: (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
          <div className="border-b border-gray-100 p-4">
            <h3 className="font-semibold text-gray-900">Apparence</h3>
            <p className="mt-1 text-sm text-gray-500">Personnalisez l&apos;interface</p>
          </div>
          <div className="space-y-6 p-6">
            <div>
              <label className="mb-3 block text-sm font-medium text-gray-700">Langue</label>
              <select className="w-full rounded-lg border border-gray-200 px-3 py-2">
                <option>Francais</option>
                <option>English</option>
              </select>
            </div>
            <div>
              <label className="mb-3 block text-sm font-medium text-gray-700">Theme</label>
              <div className="flex gap-4">
                <button className="flex-1 rounded-xl border-2 border-primary bg-white p-4">
                  <div className="mb-2 h-8 w-full rounded bg-gray-100" />
                  <p className="text-sm font-medium text-gray-900">Clair</p>
                </button>
                <button className="flex-1 rounded-xl border-2 border-gray-200 bg-gray-900 p-4">
                  <div className="mb-2 h-8 w-full rounded bg-gray-700" />
                  <p className="text-sm font-medium text-white">Sombre</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ]

  return <SharedSettingsPage role="director" sections={sections} />
}
