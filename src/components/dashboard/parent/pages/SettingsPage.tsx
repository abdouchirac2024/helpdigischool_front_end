'use client'

import {
  User,
  FileText,
  CreditCard,
  MessageSquare,
  Award,
  Bell,
  Lock,
  Globe,
  Smartphone,
  Mail,
  Phone,
  MapPin,
  Camera,
  Save,
  Settings,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import SharedSettingsPage from '@/components/dashboard/shared/pages/SharedSettingsPage'

export function ParentSettingsPage() {
  const sections = [
    {
      id: 'profile',
      label: 'Profil',
      icon: User,
      content: (
        <div className="rounded-xl border border-gray-100 bg-white p-6">
          <h3 className="mb-6 text-lg font-semibold">Informations personnelles</h3>

          {/* Avatar */}
          <div className="mb-6 flex items-center gap-6 border-b border-gray-200 pb-6">
            <div className="relative">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#2302B3] to-[#4318FF] text-3xl font-bold text-white">
                JT
              </div>
              <button className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-200 bg-white hover:bg-gray-50">
                <Camera className="h-4 w-4 text-gray-600" />
              </button>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Photo de profil</h4>
              <p className="mb-2 text-sm text-gray-500">JPG, PNG ou GIF. Max 2MB.</p>
              <Button variant="outline" size="sm">
                Changer la photo
              </Button>
            </div>
          </div>

          {/* Form */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <Label htmlFor="firstName">Prénom</Label>
              <Input id="firstName" defaultValue="Jean" className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="lastName">Nom</Label>
              <Input id="lastName" defaultValue="Talla" className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative mt-1.5">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  defaultValue="jean.talla@email.cm"
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="phone">Téléphone</Label>
              <div className="relative mt-1.5">
                <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input id="phone" defaultValue="+237 6 88 77 66 55" className="pl-10" />
              </div>
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="address">Adresse</Label>
              <div className="relative mt-1.5">
                <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input id="address" defaultValue="Douala, Akwa" className="pl-10" />
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end border-t border-gray-200 pt-6">
            <Button className="gap-2 bg-[#2302B3] hover:bg-[#1a0285]">
              <Save className="h-4 w-4" />
              Enregistrer les modifications
            </Button>
          </div>
        </div>
      ),
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: Bell,
      content: (
        <div className="rounded-xl border border-gray-100 bg-white p-6">
          <h3 className="mb-6 text-lg font-semibold">Préférences de notification</h3>

          <div className="space-y-6">
            {[
              {
                title: 'Notifications par email',
                desc: 'Recevoir des emails pour les mises à jour importantes',
                icon: Mail,
              },
              {
                title: 'Notifications SMS',
                desc: 'Recevoir des SMS pour les alertes urgentes',
                icon: Smartphone,
              },
              {
                title: 'Notifications push',
                desc: 'Recevoir des notifications sur votre appareil',
                icon: Bell,
              },
              {
                title: 'Nouvelles notes',
                desc: 'Être notifié quand de nouvelles notes sont publiées',
                icon: Award,
              },
              {
                title: 'Bulletins disponibles',
                desc: 'Être notifié quand les bulletins sont prêts',
                icon: FileText,
              },
              {
                title: 'Rappels de paiement',
                desc: 'Recevoir des rappels pour les paiements',
                icon: CreditCard,
              },
              {
                title: 'Messages des enseignants',
                desc: 'Être notifié des nouveaux messages',
                icon: MessageSquare,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between border-b border-gray-100 py-4 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                    <item.icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{item.title}</p>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>
                <Switch defaultChecked={i < 5} />
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'security',
      label: 'Sécurité',
      icon: Lock,
      content: (
        <div className="space-y-6">
          <div className="rounded-xl border border-gray-100 bg-white p-6">
            <h3 className="mb-6 text-lg font-semibold">Sécurité du compte</h3>

            <div className="space-y-6">
              <div>
                <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                <Input id="currentPassword" type="password" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                <Input id="newPassword" type="password" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                <Input id="confirmPassword" type="password" className="mt-1.5" />
              </div>
            </div>

            <div className="mt-6 flex justify-end border-t border-gray-200 pt-6">
              <Button className="bg-[#2302B3] hover:bg-[#1a0285]">Changer le mot de passe</Button>
            </div>
          </div>

          <div className="rounded-xl border border-gray-100 bg-white p-6">
            <h3 className="mb-4 text-lg font-semibold">Authentification à deux facteurs</h3>
            <p className="mb-4 text-sm text-gray-600">
              Ajoutez une couche de sécurité supplémentaire à votre compte
            </p>
            <Button variant="outline">Activer 2FA</Button>
          </div>
        </div>
      ),
    },
    {
      id: 'preferences',
      label: 'Préférences',
      icon: Settings,
      content: (
        <div className="rounded-xl border border-gray-100 bg-white p-6">
          <h3 className="mb-6 text-lg font-semibold">Préférences générales</h3>

          <div className="space-y-6">
            <div>
              <Label htmlFor="language">Langue</Label>
              <div className="relative mt-1.5">
                <Globe className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Select defaultValue="fr">
                  <SelectTrigger className="pl-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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

          <div className="mt-6 flex justify-end border-t border-gray-200 pt-6">
            <Button className="gap-2 bg-[#2302B3] hover:bg-[#1a0285]">
              <Save className="h-4 w-4" />
              Enregistrer
            </Button>
          </div>
        </div>
      ),
    },
  ]

  return <SharedSettingsPage role="parent" sections={sections} />
}
