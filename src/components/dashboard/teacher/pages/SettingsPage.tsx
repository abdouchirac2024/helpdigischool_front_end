'use client'

import { User, Bell, Lock, Settings } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  ProfileSection,
  SecuritySection,
  NotificationsSection,
} from '@/components/dashboard/shared/settings'
import SharedSettingsPage from '@/components/dashboard/shared/pages/SharedSettingsPage'

export function TeacherSettingsPage() {
  const sections = [
    {
      id: 'profile',
      label: 'Profil',
      icon: User,
      content: (
        <ProfileSection
          extraFields={
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <Label htmlFor="settings-subject">Matiere principale</Label>
                <Input
                  id="settings-subject"
                  defaultValue=""
                  disabled
                  className="mt-1.5 bg-gray-50"
                  placeholder="Matiere"
                />
              </div>
              <div>
                <Label htmlFor="settings-class">Classe principale</Label>
                <Input
                  id="settings-class"
                  defaultValue=""
                  disabled
                  className="mt-1.5 bg-gray-50"
                  placeholder="Classe"
                />
              </div>
            </div>
          }
        />
      ),
    },
    {
      id: 'security',
      label: 'Securite',
      icon: Lock,
      content: <SecuritySection />,
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: Bell,
      content: <NotificationsSection />,
    },
    {
      id: 'preferences',
      label: 'Preferences',
      icon: Settings,
      content: (
        <div className="rounded-xl border border-gray-100 bg-white p-6">
          <h3 className="mb-6 text-lg font-semibold">Preferences generales</h3>
          <div className="space-y-6">
            <div>
              <Label htmlFor="language">Langue</Label>
              <Select defaultValue="fr">
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fr">Francais</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="timezone">Fuseau horaire</Label>
              <Select defaultValue="waf">
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="waf">WAT (UTC+1) - Afrique de l&apos;Ouest</SelectItem>
                  <SelectItem value="eat">EAT (UTC+3) - Afrique de l&apos;Est</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="dateFormat">Format de date</Label>
              <Select defaultValue="dd/mm/yyyy">
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dd/mm/yyyy">JJ/MM/AAAA</SelectItem>
                  <SelectItem value="mm/dd/yyyy">MM/JJ/AAAA</SelectItem>
                  <SelectItem value="yyyy-mm-dd">AAAA-MM-JJ</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      ),
    },
  ]

  return <SharedSettingsPage role="teacher" sections={sections} />
}
