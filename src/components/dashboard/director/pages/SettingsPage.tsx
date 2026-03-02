'use client'

import { useState } from 'react'
import { Upload, User, Shield, Mail, Phone, Bell, Building2, Palette, BellRing } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import SharedSettingsPage from '@/components/dashboard/shared/pages/SharedSettingsPage'

export function DirectorSettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)

  const sections = [
    {
      id: 'profile',
      label: 'Mon profil',
      icon: User,
      content: (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
          <div className="border-b border-gray-100 p-4">
            <h3 className="font-semibold text-gray-900">Informations personnelles</h3>
            <p className="mt-1 text-sm text-gray-500">Mettez à jour vos informations de profil</p>
          </div>
          <div className="space-y-6 p-6">
            {/* Avatar */}
            <div className="flex items-center gap-6">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#2302B3] to-[#4318FF] text-3xl font-bold text-white">
                JK
              </div>
              <div>
                <p className="mb-2 font-semibold text-gray-900">Photo de profil</p>
                <Button variant="outline" size="sm" className="gap-2">
                  <Upload className="h-4 w-4" />
                  Changer la photo
                </Button>
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Form Fields */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Prénom</label>
                <Input defaultValue="Jean" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Nom</label>
                <Input defaultValue="Kamga" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Email</label>
                <Input type="email" defaultValue="j.kamga@lycee-yaounde.cm" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Téléphone</label>
                <Input type="tel" defaultValue="+237 6 77 88 99 00" />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Titre / Fonction
              </label>
              <Input defaultValue="Directeur d'établissement" />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'school',
      label: 'Établissement',
      icon: Building2,
      content: (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
          <div className="border-b border-gray-100 p-4">
            <h3 className="font-semibold text-gray-900">Informations de l&apos;établissement</h3>
            <p className="mt-1 text-sm text-gray-500">Gérez les informations de votre école</p>
          </div>
          <div className="space-y-6 p-6">
            {/* School Logo */}
            <div className="flex items-center gap-6">
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2302B3] to-[#4318FF] text-2xl font-bold text-white">
                LBY
              </div>
              <div>
                <p className="mb-2 font-semibold text-gray-900">Logo de l&apos;école</p>
                <Button variant="outline" size="sm" className="gap-2">
                  <Upload className="h-4 w-4" />
                  Changer le logo
                </Button>
              </div>
            </div>

            <hr className="border-gray-100" />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Nom de l&apos;établissement
                </label>
                <Input defaultValue="Lycée Bilingue de Yaoundé" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Email de contact
                </label>
                <Input type="email" defaultValue="contact@lycee-yaounde.cm" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Téléphone</label>
                <Input type="tel" defaultValue="+237 222 22 22 22" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-700">Adresse</label>
                <Input defaultValue="Avenue Kennedy, Yaoundé, Cameroun" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Année scolaire
                </label>
                <Input defaultValue="2024-2025" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Trimestre actuel
                </label>
                <select className="w-full rounded-lg border border-gray-200 px-3 py-2">
                  <option>1er Trimestre</option>
                  <option>2ème Trimestre</option>
                  <option>3ème Trimestre</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'security',
      label: 'Sécurité',
      icon: Shield,
      content: (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
          <div className="border-b border-gray-100 p-4">
            <h3 className="font-semibold text-gray-900">Sécurité du compte</h3>
            <p className="mt-1 text-sm text-gray-500">Protégez votre compte</p>
          </div>
          <div className="space-y-6 p-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Mot de passe actuel
              </label>
              <Input type="password" placeholder="••••••••" />
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Nouveau mot de passe
                </label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Confirmer le mot de passe
                </label>
                <Input type="password" placeholder="••••••••" />
              </div>
            </div>

            <hr className="border-gray-100" />

            <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                  <Shield className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Authentification à deux facteurs</p>
                  <p className="text-sm text-gray-500">
                    Ajoutez une couche de sécurité supplémentaire
                  </p>
                </div>
              </div>
              <Button variant="outline">Activer</Button>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: BellRing,
      content: (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
          <div className="border-b border-gray-100 p-4">
            <h3 className="font-semibold text-gray-900">Préférences de notifications</h3>
            <p className="mt-1 text-sm text-gray-500">
              Choisissez comment vous souhaitez être notifié
            </p>
          </div>
          <div className="space-y-4 p-6">
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

            <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                  <Phone className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Notifications SMS</p>
                  <p className="text-sm text-gray-500">Recevoir les alertes urgentes par SMS</p>
                </div>
              </div>
              <button
                onClick={() => setSmsNotifications(!smsNotifications)}
                className={`h-6 w-12 rounded-full transition-colors ${smsNotifications ? 'bg-[#2302B3]' : 'bg-gray-300'}`}
              >
                <div
                  className={`h-5 w-5 rounded-full bg-white shadow transition-transform ${smsNotifications ? 'translate-x-6' : 'translate-x-0.5'}`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                  <Bell className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Notifications push</p>
                  <p className="text-sm text-gray-500">Notifications dans l&apos;application</p>
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
            <p className="mt-1 text-sm text-gray-500">Personnalisez l&apos;interface</p>
          </div>
          <div className="space-y-6 p-6">
            <div>
              <label className="mb-3 block text-sm font-medium text-gray-700">Langue</label>
              <select className="w-full rounded-lg border border-gray-200 px-3 py-2">
                <option>Français</option>
                <option>English</option>
              </select>
            </div>

            <div>
              <label className="mb-3 block text-sm font-medium text-gray-700">Thème</label>
              <div className="flex gap-4">
                <button className="flex-1 rounded-xl border-2 border-[#2302B3] bg-white p-4">
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
