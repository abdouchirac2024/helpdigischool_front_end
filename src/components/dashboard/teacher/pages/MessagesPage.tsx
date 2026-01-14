'use client'

import { useState } from 'react'
import {
  LayoutDashboard,
  Users,
  FileText,
  BookOpen,
  Calendar,
  MessageSquare,
  Award,
  ClipboardList,
  Search,
  Plus,
  Star,
  Paperclip,
  Send,
  MoreVertical,
  Check,
  CheckCheck
} from 'lucide-react'
import { Sidebar, MenuItem } from '../../shared/Sidebar'
import { TopBar } from '../../shared/TopBar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const menuItems: MenuItem[] = [
  { icon: LayoutDashboard, label: 'Tableau de bord', href: '/dashboard/teacher' },
  { icon: Users, label: 'Mes élèves', href: '/dashboard/teacher/students', badge: '32' },
  { icon: FileText, label: 'Saisie des notes', href: '/dashboard/teacher/grades' },
  { icon: BookOpen, label: 'Mes cours', href: '/dashboard/teacher/courses' },
  { icon: Calendar, label: 'Emploi du temps', href: '/dashboard/teacher/schedule' },
  { icon: ClipboardList, label: 'Présences', href: '/dashboard/teacher/attendance' },
  { icon: MessageSquare, label: 'Messages', href: '/dashboard/teacher/messages', badge: '3' },
  { icon: Award, label: 'Évaluations', href: '/dashboard/teacher/evaluations' },
]

const conversations = [
  {
    id: 1,
    name: 'Mme. Ngo (Parent - Paul)',
    avatar: 'N',
    lastMessage: 'Merci pour les informations concernant les devoirs.',
    time: '10:30',
    unread: 2,
    online: true
  },
  {
    id: 2,
    name: 'M. Kamga (Parent - Sarah)',
    avatar: 'K',
    lastMessage: 'Sarah sera absente demain pour un rendez-vous médical.',
    time: '09:15',
    unread: 1,
    online: false
  },
  {
    id: 3,
    name: 'Direction',
    avatar: 'D',
    lastMessage: 'Rappel: Réunion des enseignants vendredi à 16h.',
    time: 'Hier',
    unread: 0,
    online: true
  },
  {
    id: 4,
    name: 'Mme. Fotso (Parent - Jean)',
    avatar: 'F',
    lastMessage: 'D\'accord, je vais en parler avec lui ce soir.',
    time: 'Hier',
    unread: 0,
    online: false
  },
  {
    id: 5,
    name: 'M. Talla (Collègue)',
    avatar: 'T',
    lastMessage: 'As-tu les anciens sujets d\'examen de maths?',
    time: 'Lun',
    unread: 0,
    online: true
  },
]

const messages = [
  { id: 1, sender: 'them', text: 'Bonjour Madame Kouam, comment va Paul en classe?', time: '09:00' },
  { id: 2, sender: 'me', text: 'Bonjour Mme. Ngo! Paul se porte très bien. Il est très actif en classe et participe beaucoup.', time: '09:05' },
  { id: 3, sender: 'them', text: 'C\'est une bonne nouvelle! Et concernant les devoirs de mathématiques?', time: '09:10' },
  { id: 4, sender: 'me', text: 'Il progresse bien. Je vous ai envoyé les exercices supplémentaires par email. N\'hésitez pas à me contacter si vous avez des questions.', time: '10:25' },
  { id: 5, sender: 'them', text: 'Merci pour les informations concernant les devoirs.', time: '10:30' },
]

export function TeacherMessagesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])
  const [newMessage, setNewMessage] = useState('')

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        userName="Marie Kouam"
        userRole="Enseignante CM2"
      />

      <Sidebar
        menuItems={menuItems}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="lg:ml-64 pt-16 min-h-screen">
        <div className="h-[calc(100vh-4rem)] flex">
          {/* Conversations List */}
          <div className="w-full md:w-80 border-r border-gray-200 bg-white flex flex-col">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Messages</h2>
                <Button size="sm" className="bg-[#2302B3] hover:bg-[#1a0285] h-8 w-8 p-0">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Rechercher..."
                  className="pl-9 bg-gray-50 border-gray-200"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv)}
                  className={`flex items-center gap-3 p-4 cursor-pointer transition-colors ${
                    selectedConversation.id === conv.id
                      ? 'bg-[#2302B3]/5 border-l-2 border-[#2302B3]'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2302B3] to-[#4318FF] flex items-center justify-center text-white font-semibold">
                      {conv.avatar}
                    </div>
                    {conv.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-gray-900 truncate">{conv.name}</p>
                      <span className="text-xs text-gray-500">{conv.time}</span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">{conv.lastMessage}</p>
                  </div>
                  {conv.unread > 0 && (
                    <div className="w-5 h-5 rounded-full bg-[#2302B3] text-white text-xs flex items-center justify-center">
                      {conv.unread}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="hidden md:flex flex-1 flex-col bg-gray-50">
            {/* Chat Header */}
            <div className="bg-white px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2302B3] to-[#4318FF] flex items-center justify-center text-white font-semibold">
                    {selectedConversation.avatar}
                  </div>
                  {selectedConversation.online && (
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
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
                  <Star className="w-5 h-5 text-gray-500" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="w-5 h-5 text-gray-500" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="text-center">
                <span className="text-xs text-gray-500 bg-white px-3 py-1 rounded-full">
                  Aujourd'hui
                </span>
              </div>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[70%] ${
                    msg.sender === 'me'
                      ? 'bg-[#2302B3] text-white rounded-2xl rounded-br-sm'
                      : 'bg-white text-gray-900 rounded-2xl rounded-bl-sm border border-gray-100'
                  } px-4 py-3`}>
                    <p className="text-sm">{msg.text}</p>
                    <div className={`flex items-center justify-end gap-1 mt-1 ${
                      msg.sender === 'me' ? 'text-white/70' : 'text-gray-400'
                    }`}>
                      <span className="text-xs">{msg.time}</span>
                      {msg.sender === 'me' && <CheckCheck className="w-4 h-4" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="bg-white px-6 py-4 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" className="text-gray-500">
                  <Paperclip className="w-5 h-5" />
                </Button>
                <Input
                  placeholder="Écrire un message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 bg-gray-50 border-gray-200"
                />
                <Button className="bg-[#2302B3] hover:bg-[#1a0285]">
                  <Send className="w-5 h-5" />
                </Button>
              </div>
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