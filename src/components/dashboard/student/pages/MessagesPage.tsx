'use client'

import { useState } from 'react'
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  Award,
  FileText,
  MessageSquare,
  Library,
  Settings,
  Search,
  Send,
  Paperclip
} from 'lucide-react'
import { Sidebar, MenuItem } from '../../shared/Sidebar'
import { TopBar } from '../../shared/TopBar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const menuItems: MenuItem[] = [
  { icon: LayoutDashboard, label: 'Tableau de bord', href: '/dashboard/student' },
  { icon: Award, label: 'Mes Notes', href: '/dashboard/student/grades' },
  { icon: BookOpen, label: 'Mes Cours', href: '/dashboard/student/courses' },
  { icon: Calendar, label: 'Emploi du temps', href: '/dashboard/student/schedule' },
  { icon: FileText, label: 'Devoirs', href: '/dashboard/student/homework', badge: '3' },
  { icon: MessageSquare, label: 'Messages', href: '/dashboard/student/messages', badge: '2' },
  { icon: Library, label: 'Bibliothèque', href: '/dashboard/student/library' },
  { icon: Settings, label: 'Paramètres', href: '/dashboard/student/settings' },
]

const conversations = [
  {
    id: 1,
    name: 'M. Kamga',
    role: 'Prof. Mathématiques',
    lastMessage: 'N\'oublie pas l\'exercice pour demain',
    time: '10:30',
    unread: 2,
    avatar: 'MK'
  },
  {
    id: 2,
    name: 'Mme Kouam',
    role: 'Prof. Français',
    lastMessage: 'Très bon travail sur ta rédaction !',
    time: 'Hier',
    unread: 0,
    avatar: 'MK'
  },
  {
    id: 3,
    name: 'Secrétariat',
    role: 'Administration',
    lastMessage: 'Votre attestation est prête',
    time: 'Lun',
    unread: 1,
    avatar: 'SE'
  },
]

const messages = [
  { id: 1, sender: 'teacher', text: 'Bonjour Amina, comment vas-tu ?', time: '09:00' },
  { id: 2, sender: 'student', text: 'Bonjour Monsieur, je vais bien merci !', time: '09:05' },
  { id: 3, sender: 'teacher', text: 'J\'ai vu que tu as eu 17 au dernier contrôle, félicitations !', time: '09:10' },
  { id: 4, sender: 'student', text: 'Merci beaucoup ! J\'ai beaucoup travaillé les fractions.', time: '09:15' },
  { id: 5, sender: 'teacher', text: 'C\'est très bien, continue comme ça. N\'oublie pas l\'exercice pour demain.', time: '10:30' },
]

export function StudentMessagesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        userName="Amina Talla"
        userRole="Élève - CM2-A"
      />

      <Sidebar
        menuItems={menuItems}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="lg:ml-64 pt-16 min-h-screen pb-20 lg:pb-0">
        <div className="h-[calc(100vh-4rem)] flex">
          {/* Conversations List */}
          <div className="w-80 border-r border-gray-200 bg-white flex flex-col">
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Messages</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input placeholder="Rechercher..." className="pl-10" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv)}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                    selectedConversation.id === conv.id ? 'bg-[#2302B3]/5 border-l-4 border-l-[#2302B3]' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#2302B3] flex items-center justify-center text-white font-semibold">
                      {conv.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-gray-900 truncate">{conv.name}</p>
                        <span className="text-xs text-gray-500">{conv.time}</span>
                      </div>
                      <p className="text-xs text-gray-500">{conv.role}</p>
                      <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                    </div>
                    {conv.unread > 0 && (
                      <span className="w-5 h-5 rounded-full bg-[#2302B3] text-white text-xs flex items-center justify-center">
                        {conv.unread}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col bg-gray-50">
            {/* Chat Header */}
            <div className="p-4 bg-white border-b border-gray-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#2302B3] flex items-center justify-center text-white font-semibold">
                {selectedConversation.avatar}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{selectedConversation.name}</p>
                <p className="text-sm text-gray-500">{selectedConversation.role}</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'student' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] p-4 rounded-2xl ${
                      msg.sender === 'student'
                        ? 'bg-[#2302B3] text-white rounded-br-md'
                        : 'bg-white text-gray-900 rounded-bl-md border border-gray-100'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <p className={`text-xs mt-1 ${msg.sender === 'student' ? 'text-white/70' : 'text-gray-400'}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-100">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon">
                  <Paperclip className="w-5 h-5 text-gray-500" />
                </Button>
                <Input
                  placeholder="Écris ton message..."
                  className="flex-1"
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