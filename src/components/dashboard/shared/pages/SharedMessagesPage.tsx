'use client'

import { useState } from 'react'
import { Search, Plus, Star, Paperclip, Send, MoreVertical, CheckCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface Conversation {
  id: number
  name: string
  avatar: string
  lastMessage: string
  time: string
  unread: number
  online: boolean
}

interface Message {
  id: number
  sender: 'me' | 'them'
  text: string
  time: string
}

interface SharedMessagesPageProps {
  role: 'teacher' | 'student' | 'parent'
}

const conversationsByRole: Record<string, Conversation[]> = {
  teacher: [
    {
      id: 1,
      name: 'Mme. Ngo (Parent - Paul)',
      avatar: 'N',
      lastMessage: 'Merci pour les informations concernant les devoirs.',
      time: '10:30',
      unread: 2,
      online: true,
    },
    {
      id: 2,
      name: 'M. Kamga (Parent - Sarah)',
      avatar: 'K',
      lastMessage: 'Sarah sera absente demain pour un rendez-vous médical.',
      time: '09:15',
      unread: 1,
      online: false,
    },
    {
      id: 3,
      name: 'Direction',
      avatar: 'D',
      lastMessage: 'Rappel: Réunion des enseignants vendredi à 16h.',
      time: 'Hier',
      unread: 0,
      online: true,
    },
    {
      id: 4,
      name: 'Mme. Fotso (Parent - Jean)',
      avatar: 'F',
      lastMessage: "D'accord, je vais en parler avec lui ce soir.",
      time: 'Hier',
      unread: 0,
      online: false,
    },
    {
      id: 5,
      name: 'M. Talla (Collègue)',
      avatar: 'T',
      lastMessage: "As-tu les anciens sujets d'examen de maths?",
      time: 'Lun',
      unread: 0,
      online: true,
    },
  ],
  student: [
    {
      id: 1,
      name: 'M. Kouam (Mathématiques)',
      avatar: 'K',
      lastMessage: "N'oubliez pas de rendre le devoir avant vendredi.",
      time: '11:00',
      unread: 1,
      online: true,
    },
    {
      id: 2,
      name: 'Mme. Biya (Français)',
      avatar: 'B',
      lastMessage: 'Très bon travail sur la dernière rédaction!',
      time: '09:45',
      unread: 0,
      online: false,
    },
    {
      id: 3,
      name: 'Administration',
      avatar: 'A',
      lastMessage: 'Votre attestation de scolarité est prête.',
      time: 'Hier',
      unread: 3,
      online: true,
    },
    {
      id: 4,
      name: 'M. Ndongo (Sciences)',
      avatar: 'N',
      lastMessage: 'Le TP de chimie est reporté à mardi prochain.',
      time: 'Mar',
      unread: 0,
      online: false,
    },
  ],
  parent: [
    {
      id: 1,
      name: 'Mme. Kouam (Prof. Maths)',
      avatar: 'K',
      lastMessage: 'Paul progresse bien en mathématiques ce trimestre.',
      time: '14:20',
      unread: 1,
      online: true,
    },
    {
      id: 2,
      name: 'Administration',
      avatar: 'A',
      lastMessage: 'Le bulletin du 2e trimestre est disponible.',
      time: '10:00',
      unread: 2,
      online: true,
    },
    {
      id: 3,
      name: 'Secrétariat',
      avatar: 'S',
      lastMessage: 'Veuillez fournir le certificat médical avant lundi.',
      time: 'Hier',
      unread: 0,
      online: false,
    },
    {
      id: 4,
      name: 'M. Ndongo (Prof. Sciences)',
      avatar: 'N',
      lastMessage: 'Paul a été très actif pendant le cours de SVT.',
      time: 'Lun',
      unread: 0,
      online: true,
    },
    {
      id: 5,
      name: 'Mme. Biya (Prof. Français)',
      avatar: 'B',
      lastMessage: 'La sortie pédagogique est confirmée pour le 15 mars.',
      time: 'Ven',
      unread: 0,
      online: false,
    },
  ],
}

const messagesByRole: Record<string, Message[]> = {
  teacher: [
    {
      id: 1,
      sender: 'them',
      text: 'Bonjour Madame Kouam, comment va Paul en classe?',
      time: '09:00',
    },
    {
      id: 2,
      sender: 'me',
      text: 'Bonjour Mme. Ngo! Paul se porte très bien. Il est très actif en classe et participe beaucoup.',
      time: '09:05',
    },
    {
      id: 3,
      sender: 'them',
      text: "C'est une bonne nouvelle! Et concernant les devoirs de mathématiques?",
      time: '09:10',
    },
    {
      id: 4,
      sender: 'me',
      text: "Il progresse bien. Je vous ai envoyé les exercices supplémentaires par email. N'hésitez pas à me contacter si vous avez des questions.",
      time: '10:25',
    },
    {
      id: 5,
      sender: 'them',
      text: 'Merci pour les informations concernant les devoirs.',
      time: '10:30',
    },
  ],
  student: [
    {
      id: 1,
      sender: 'them',
      text: "Bonjour, n'oubliez pas que le devoir de maths est à rendre vendredi.",
      time: '08:30',
    },
    {
      id: 2,
      sender: 'me',
      text: 'Bonjour Monsieur. Oui, je suis en train de le terminer.',
      time: '08:45',
    },
    {
      id: 3,
      sender: 'them',
      text: "Très bien. N'hésitez pas si vous avez des questions sur l'exercice 5.",
      time: '09:00',
    },
    {
      id: 4,
      sender: 'me',
      text: "Justement, je ne comprends pas la deuxième partie. Pourriez-vous m'aider?",
      time: '10:50',
    },
    {
      id: 5,
      sender: 'them',
      text: "N'oubliez pas de rendre le devoir avant vendredi.",
      time: '11:00',
    },
  ],
  parent: [
    {
      id: 1,
      sender: 'me',
      text: 'Bonjour Madame Kouam, comment se passe le trimestre pour Paul?',
      time: '13:00',
    },
    {
      id: 2,
      sender: 'them',
      text: 'Bonjour! Paul travaille très bien. Ses notes en mathématiques se sont beaucoup améliorées.',
      time: '13:15',
    },
    { id: 3, sender: 'me', text: "C'est rassurant. Et au niveau du comportement?", time: '13:20' },
    {
      id: 4,
      sender: 'them',
      text: 'Aucun souci, il est très respectueux et attentif en classe.',
      time: '14:10',
    },
    {
      id: 5,
      sender: 'them',
      text: 'Paul progresse bien en mathématiques ce trimestre.',
      time: '14:20',
    },
  ],
}

export default function SharedMessagesPage({ role }: SharedMessagesPageProps) {
  const conversations = conversationsByRole[role]
  const messages = messagesByRole[role]

  const [selectedConversation, setSelectedConversation] = useState<Conversation>(conversations[0])
  const [messageText, setMessageText] = useState('')

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Conversations List */}
      <div className="flex w-full flex-col border-r border-gray-200 bg-white md:w-80">
        <div className="border-b border-gray-100 p-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Messages</h2>
            <Button size="sm" className="h-8 w-8 bg-[#2302B3] p-0 hover:bg-[#1a0285]">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input placeholder="Rechercher..." className="border-gray-200 bg-gray-50 pl-9" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => setSelectedConversation(conv)}
              className={`flex cursor-pointer items-center gap-3 p-4 transition-colors ${
                selectedConversation.id === conv.id
                  ? 'border-l-2 border-[#2302B3] bg-[#2302B3]/5'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#2302B3] to-[#4318FF] font-semibold text-white">
                  {conv.avatar}
                </div>
                {conv.online && (
                  <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="truncate font-semibold text-gray-900">{conv.name}</p>
                  <span className="ml-2 shrink-0 text-xs text-gray-500">{conv.time}</span>
                </div>
                <p className="truncate text-sm text-gray-500">{conv.lastMessage}</p>
              </div>
              {conv.unread > 0 && (
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#2302B3] text-xs text-white">
                  {conv.unread}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="hidden flex-1 flex-col bg-gray-50 md:flex">
        {/* Chat Header */}
        <div className="flex items-center justify-between border-b border-gray-100 bg-white px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#2302B3] to-[#4318FF] font-semibold text-white">
                {selectedConversation.avatar}
              </div>
              {selectedConversation.online && (
                <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500" />
              )}
            </div>
            <div>
              <p className="font-semibold text-gray-900">{selectedConversation.name}</p>
              <p className="text-xs text-gray-500">
                {selectedConversation.online ? 'En ligne' : 'Hors ligne'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Star className="h-5 w-5 text-gray-500" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5 text-gray-500" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 space-y-4 overflow-y-auto p-6">
          <div className="text-center">
            <span className="rounded-full bg-white px-3 py-1 text-xs text-gray-500">
              Aujourd&apos;hui
            </span>
          </div>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] ${
                  msg.sender === 'me'
                    ? 'rounded-2xl rounded-br-sm bg-[#2302B3] text-white'
                    : 'rounded-2xl rounded-bl-sm border border-gray-100 bg-white text-gray-900'
                } px-4 py-3`}
              >
                <p className="text-sm">{msg.text}</p>
                <div
                  className={`mt-1 flex items-center justify-end gap-1 ${
                    msg.sender === 'me' ? 'text-white/70' : 'text-gray-400'
                  }`}
                >
                  <span className="text-xs">{msg.time}</span>
                  {msg.sender === 'me' && <CheckCheck className="h-4 w-4" />}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="border-t border-gray-100 bg-white px-6 py-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-gray-500">
              <Paperclip className="h-5 w-5" />
            </Button>
            <Input
              placeholder="Écrire un message..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              className="flex-1 border-gray-200 bg-gray-50"
            />
            <Button className="bg-[#2302B3] hover:bg-[#1a0285]">
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
