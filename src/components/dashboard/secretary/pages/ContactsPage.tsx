'use client'

import { useState } from 'react'
import {
  Users,
  Search,
  Plus,
  Mail,
  MapPin,
  Edit,
  MessageSquare,
  User,
  Building,
  GraduationCap,
  Phone,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const contacts = [
  {
    id: 1,
    name: 'M. Talla Jean',
    type: 'parent',
    role: 'Parent de Amina Talla',
    phone: '6 77 88 99 00',
    email: 'talla.jean@email.com',
    address: 'Quartier Bastos, Yaoundé',
  },
  {
    id: 2,
    name: 'Mme Ngo Sophie',
    type: 'parent',
    role: 'Parent de Paul Ngo',
    phone: '6 55 66 77 88',
    email: 'ngo.sophie@email.com',
    address: 'Quartier Nlongkak, Yaoundé',
  },
  {
    id: 3,
    name: 'M. Kouam Pierre',
    type: 'parent',
    role: 'Parent de Marie Kouam',
    phone: '6 33 44 55 66',
    email: 'kouam.p@email.com',
    address: 'Quartier Mvan, Yaoundé',
  },
  {
    id: 4,
    name: 'Mme Kouam Marie',
    type: 'teacher',
    role: 'Enseignante CM2-A',
    phone: '6 99 00 11 22',
    email: 'kouam.m@ecole.cm',
    address: 'Quartier Essos, Yaoundé',
  },
  {
    id: 5,
    name: 'M. Nkolo André',
    type: 'teacher',
    role: 'Enseignant CE2-B',
    phone: '6 11 22 33 44',
    email: 'nkolo.a@ecole.cm',
    address: 'Quartier Biyem-Assi, Yaoundé',
  },
  {
    id: 6,
    name: 'M. Directeur Biya',
    type: 'staff',
    role: 'Directeur',
    phone: '6 00 11 22 33',
    email: 'directeur@ecole.cm',
    address: 'École Primaire Excellence',
  },
  {
    id: 7,
    name: 'Mme Fotso Claire',
    type: 'staff',
    role: 'Comptable',
    phone: '6 22 33 44 55',
    email: 'comptable@ecole.cm',
    address: 'École Primaire Excellence',
  },
  {
    id: 8,
    name: 'Dr. Mbarga Paul',
    type: 'external',
    role: 'Médecin scolaire',
    phone: '6 44 55 66 77',
    email: 'dr.mbarga@clinique.cm',
    address: 'Clinique Centrale, Yaoundé',
  },
]

const contactCategories = [
  { id: 'all', label: 'Tous', icon: Users, count: contacts.length },
  {
    id: 'parent',
    label: 'Parents',
    icon: User,
    count: contacts.filter((c) => c.type === 'parent').length,
  },
  {
    id: 'teacher',
    label: 'Enseignants',
    icon: GraduationCap,
    count: contacts.filter((c) => c.type === 'teacher').length,
  },
  {
    id: 'staff',
    label: 'Personnel',
    icon: Building,
    count: contacts.filter((c) => c.type === 'staff').length,
  },
  {
    id: 'external',
    label: 'Externes',
    icon: Users,
    count: contacts.filter((c) => c.type === 'external').length,
  },
]

export function SecretaryContactsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || contact.type === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getTypeColor = (type: string) => {
    const colors = {
      parent: 'bg-blue-100 text-blue-600',
      teacher: 'bg-green-100 text-green-600',
      staff: 'bg-purple-100 text-purple-600',
      external: 'bg-orange-100 text-orange-600',
    }
    return colors[type as keyof typeof colors]
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contacts</h1>
          <p className="mt-1 text-gray-600">Annuaire des contacts de l'école</p>
        </div>
        <Button className="gap-2 bg-[#2302B3] hover:bg-[#1a0285]">
          <Plus className="h-4 w-4" />
          Ajouter contact
        </Button>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {contactCategories.map((cat) => (
          <Button
            key={cat.id}
            variant={selectedCategory === cat.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(cat.id)}
            className={`gap-2 ${selectedCategory === cat.id ? 'bg-[#2302B3]' : ''}`}
          >
            <cat.icon className="h-4 w-4" />
            {cat.label}
            <span
              className={`ml-1 rounded-full px-2 py-0.5 text-xs ${
                selectedCategory === cat.id ? 'bg-white/20' : 'bg-gray-100'
              }`}
            >
              {cat.count}
            </span>
          </Button>
        ))}
      </div>

      {/* Search */}
      <div className="rounded-xl border border-gray-100 bg-white p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Rechercher par nom, rôle ou email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Contacts Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredContacts.map((contact) => (
          <div
            key={contact.id}
            className="rounded-xl border border-gray-100 bg-white p-6 transition-shadow hover:shadow-lg"
          >
            <div className="mb-4 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`h-12 w-12 rounded-full ${getTypeColor(contact.type)} flex items-center justify-center text-lg font-bold`}
                >
                  {contact.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                  <p className="text-sm text-gray-500">{contact.role}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <a
                href={`tel:${contact.phone}`}
                className="flex items-center gap-3 text-sm text-gray-600 hover:text-[#2302B3]"
              >
                <Phone className="h-4 w-4" />
                {contact.phone}
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-3 text-sm text-gray-600 hover:text-[#2302B3]"
              >
                <Mail className="h-4 w-4" />
                {contact.email}
              </a>
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <MapPin className="h-4 w-4" />
                {contact.address}
              </div>
            </div>

            <div className="mt-4 flex gap-2 border-t border-gray-100 pt-4">
              <Button size="sm" variant="outline" className="flex-1 gap-1">
                <Phone className="h-4 w-4" />
                Appeler
              </Button>
              <Button size="sm" variant="outline" className="flex-1 gap-1">
                <MessageSquare className="h-4 w-4" />
                Message
              </Button>
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
