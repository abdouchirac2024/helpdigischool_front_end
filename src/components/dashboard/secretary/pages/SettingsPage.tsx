'use client'

import { useState } from 'react'
import {
  LayoutDashboard,
  Users,
  UserPlus,
  CreditCard,
  FileText,
  Phone,
  Calendar,
  Printer,
  Settings,
  User,
  Bell,
  Lock,
  Globe,
  Smartphone,
  Mail,
  MapPin,
  Camera,
  Save
} from 'lucide-react'
import { Sidebar, MenuItem } from '../../shared/Sidebar'
import { TopBar } from '../../shared/TopBar'
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'

const menuItems: MenuItem[] = [
  { icon: LayoutDashboard, label: 'Tableau de bord', href: '/dashboard/secretary' },
  { icon: Users, label: 'Élèves', href: '/dashboard/secretary/students', badge: '342' },
  { icon: UserPlus, label: 'Inscriptions', href: '/dashboard/secretary/enrollments', badge: '5' },
  { icon: CreditCard, label: 'Paiements', href: '/dashboard/secretary/payments' },
  { icon: FileText, label: 'Documents', href: '/dashboard/secretary/documents' },
  { icon: Phone, label: 'Contacts', href: '/dashboard/secretary/contacts' },
  { icon: Calendar, label: 'Rendez-vous', href: '/dashboard/secretary/appointments', badge: '3' },
  { icon: Printer, label: 'Impressions', href: '/dashboard/secretary/printing' },
  { icon: Settings, label: 'Paramètres', href: '/dashboard/secretary/settings' },
]

export function SecretarySettingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        userName="Sophie Mballa"
        userRole="Secrétaire"
      />

      <Sidebar
        menuItems={menuItems}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="lg:ml-64 pt-16 min-h-screen pb-20 lg:pb-0">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Paramètres</h1>
            <p className="text-gray-600 mt-1">Gérez votre compte et vos préférences</p>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="bg-white border border-gray-200">
              <TabsTrigger value="profile" className="gap-2">
                <User className="w-4 h-4" />
                Profil
              </TabsTrigger>
              <TabsTrigger value="notifications" className="gap-2">
                <Bell className="w-4 h-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="security" className="gap-2">
                <Lock className="w-4 h-4" />
                Sécurité
              </TabsTrigger>
              <TabsTrigger value="preferences" className="gap-2">
                <Settings className="w-4 h-4" />
                Préférences
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <div className="bg-white rounded-xl p-6 border border-gray-100">
                <h3 className="text-lg font-semibold mb-6">Informations personnelles</h3>

                {/* Avatar */}
                <div className="flex items-center gap-6 mb-6 pb-6 border-b border-gray-200">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#2302B3] to-[#4318FF] flex items-center justify-center text-white text-3xl font-bold">
                      SM
                    </div>
                    <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center hover:bg-gray-50">
                      <Camera className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Photo de profil</h4>
                    <p className="text-sm text-gray-500 mb-2">JPG, PNG ou GIF. Max 2MB.</p>
                    <Button variant="outline" size="sm">Changer la photo</Button>
                  </div>
                </div>

                {/* Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input id="firstName" defaultValue="Sophie" className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Nom</Label>
                    <Input id="lastName" defaultValue="Mballa" className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <div className="relative mt-1.5">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input id="email" type="email" defaultValue="s.mballa@lycee-yaounde.cm" className="pl-10" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phone">Téléphone</Label>
                    <div className="relative mt-1.5">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input id="phone" defaultValue="+237 6 55 44 33 22" className="pl-10" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="poste">Poste</Label>
                    <Input id="poste" defaultValue="Secrétaire principale" className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="service">Service</Label>
                    <Input id="service" defaultValue="Administration" className="mt-1.5" />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Adresse</Label>
                    <div className="relative mt-1.5">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input id="address" defaultValue="Yaoundé, Cameroun" className="pl-10" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-6 pt-6 border-t border-gray-200">
                  <Button className="bg-[#2302B3] hover:bg-[#1a0285] gap-2">
                    <Save className="w-4 h-4" />
                    Enregistrer les modifications
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-6">
              <div className="bg-white rounded-xl p-6 border border-gray-100">
                <h3 className="text-lg font-semibold mb-6">Préférences de notification</h3>

                <div className="space-y-6">
                  {[
                    { title: 'Notifications par email', desc: 'Recevoir des emails pour les mises à jour importantes', icon: Mail },
                    { title: 'Notifications SMS', desc: 'Recevoir des SMS pour les alertes urgentes', icon: Smartphone },
                    { title: 'Notifications push', desc: 'Recevoir des notifications sur votre appareil', icon: Bell },
                    { title: 'Nouvelles inscriptions', desc: 'Être notifié des nouvelles demandes d\'inscription', icon: UserPlus },
                    { title: 'Paiements reçus', desc: 'Confirmation des paiements enregistrés', icon: CreditCard },
                    { title: 'Rendez-vous', desc: 'Rappels de rendez-vous', icon: Calendar },
                    { title: 'Documents générés', desc: 'Notification quand un document est prêt', icon: FileText },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                          <item.icon className="w-5 h-5 text-blue-600" />
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
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="space-y-6">
              <div className="bg-white rounded-xl p-6 border border-gray-100">
                <h3 className="text-lg font-semibold mb-6">Sécurité du compte</h3>

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

                <div className="flex justify-end mt-6 pt-6 border-t border-gray-200">
                  <Button className="bg-[#2302B3] hover:bg-[#1a0285]">
                    Changer le mot de passe
                  </Button>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-100">
                <h3 className="text-lg font-semibold mb-4">Authentification à deux facteurs</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Ajoutez une couche de sécurité supplémentaire à votre compte
                </p>
                <Button variant="outline">Activer 2FA</Button>
              </div>
            </TabsContent>

            {/* Preferences Tab */}
            <TabsContent value="preferences" className="space-y-6">
              <div className="bg-white rounded-xl p-6 border border-gray-100">
                <h3 className="text-lg font-semibold mb-6">Préférences générales</h3>

                <div className="space-y-6">
                  <div>
                    <Label htmlFor="language">Langue</Label>
                    <div className="relative mt-1.5">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
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
                        <SelectItem value="waf">WAT (UTC+1) - Afrique de l'Ouest</SelectItem>
                        <SelectItem value="eat">EAT (UTC+3) - Afrique de l'Est</SelectItem>
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

                  <div>
                    <Label htmlFor="printFormat">Format d'impression par défaut</Label>
                    <Select defaultValue="a4">
                      <SelectTrigger className="mt-1.5">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="a4">A4</SelectItem>
                        <SelectItem value="letter">Letter</SelectItem>
                        <SelectItem value="legal">Legal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end mt-6 pt-6 border-t border-gray-200">
                  <Button className="bg-[#2302B3] hover:bg-[#1a0285] gap-2">
                    <Save className="w-4 h-4" />
                    Enregistrer
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
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