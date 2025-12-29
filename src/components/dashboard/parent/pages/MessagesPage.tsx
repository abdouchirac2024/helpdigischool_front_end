'use client'

import { useState } from 'react'
import { 
  LayoutDashboard,
  User,
  FileText,
  CreditCard,
  MessageSquare,
  Calendar,
  Award,
  Send,
  Paperclip,
  Search,
  Phone,
  Video,
  MoreVertical
} from 'lucide-react'
import { Sidebar, MenuItem } from '../../shared/Sidebar'
import { TopBar } from '../../shared/TopBar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const menuItems: MenuItem[] = [
  { icon: LayoutDashboard, label: 'Tableau de bord', href: '/dashboard/parent' },
  { icon: User, label: 'Mes enfants', href: '/dashboard/parent/children' },
  { icon: FileText, label: 'Bulletins', href: '/dashboard/parent/reports' },
  { icon: Award, label: 'Notes & Résultats', href: '/dashboard/parent/grades' },
  { icon: CreditCard, label: 'Paiements', href: '/dashboard/parent/payments' },
  { icon: Calendar, label: 'Emploi du temps', href: '/dashboard/parent/schedule' },
  { icon: MessageSquare, label: 'Messages', href: '/dashboard/parent/messages', badge: '2' },
]

const conversations = [
  { id: 1, name: 'Mme Kouam (Enseignante)', role: 'Enseignante CM2-A', avatar: 'MK', lastMessage: 'Bonjour, je voulais vous parler des progrès d\'Amina...', time: 'Il y a 5 min', unread: 2, online: true },
  { id: 2, name: 'M. Directeur', role: 'Direction', avatar: 'MD', lastMessage: 'Réunion parents-profs le 20 janvier', time: 'Il y a 1h', unread: 0, online: false },
  { id: 3, name: 'Secrétariat', role: 'Administration', avatar: 'SE', lastMessage: 'Votre paiement a été enregistré', time: 'Hier', unread: 0, online: true },
]

const messages = [
  { id: 1, sender: 'Mme Kouam', text: 'Bonjour M. Talla, j\'espère que vous allez bien.', time: '10:30', isMine: false },
  { id: 2, sender: 'Moi', text: 'Bonjour Madame, oui merci. Comment puis-je vous aider?', time: '10:32', isMine: true },
  { id: 3, sender: 'Mme Kouam', text: 'Je voulais vous parler des progrès d\'Amina en mathématiques. Elle fait vraiment des efforts remarquables ce trimestre.', time: '10:33', isMine: false },
  { id: 4, sender: 'Moi', text: 'C\'est une excellente nouvelle! Nous travaillons ensemble à la maison.', time: '10:35', isMine: true },
  { id: 5, sender: 'Mme Kouam', text: 'C\'est formidable. Continuez ainsi. Elle a obtenu 18/20 au dernier devoir.', time: '10:36', isMine: false },
]

export function ParentMessagesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])
  const [messageText, setMessageText] = useState('')

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar 
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        userName="Jean Talla"
        userRole="Parent"
      />
      
      <Sidebar 
        menuItems={menuItems}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="lg:ml-64 pt-16 min-h-screen pb-20 lg:pb-0">
        <div className="h-[calc(100vh-4rem)]">
          <div className="grid grid-cols-1 lg:grid-cols-3 h-full">
            {/* Conversations List */}
            <div className="lg:col-span-1 bg-white border-r border-gray-200 overflow-y-auto">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Messages</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input placeholder="Rechercher..." className="pl-10" />
                </div>
              </div>
              
              <div className="divide-y divide-gray-200">
                {conversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv)}
                    className={`w-full p-4 hover:bg-gray-50 transition-colors text-left ${
                      selectedConversation.id === conv.id ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2302B3] to-[#4318FF] flex items-center justify-center text-white font-semibold">
                          {conv.avatar}
                        </div>
                        {conv.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-semibold text-gray-900 truncate">{conv.name}</p>
                          <span className="text-xs text-gray-500">{conv.time}</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-1">{conv.role}</p>
                        <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                      </div>
                      {conv.unread > 0 && (
                        <div className="w-6 h-6 rounded-full bg-[#2302B3] flex items-center justify-center">
                          <span className="text-xs font-semibold text-white">{conv.unread}</span>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="lg:col-span-2 flex flex-col bg-white">
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2302B3] to-[#4318FF] flex items-center justify-center text-white font-semibold">
                      {selectedConversation.avatar}
                    </div>
                    {selectedConversation.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{selectedConversation.name}</p>
                    <p className="text-sm text-gray-500">{selectedConversation.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="ghost" className="h-9 w-9 p-0">
                    <Phone className="w-5 h-5" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-9 w-9 p-0">
                    <Video className="w-5 h-5" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-9 w-9 p-0">
                    <MoreVertical className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isMine ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[70%] ${message.isMine ? 'order-2' : 'order-1'}`}>
                      <div
                        className={`rounded-2xl px-4 py-2 ${
                          message.isMine
                            ? 'bg-[#2302B3] text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                      </div>
                      <p className={`text-xs text-gray-500 mt-1 ${message.isMine ? 'text-right' : 'text-left'}`}>
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-end gap-2">
                  <Button size="sm" variant="ghost" className="h-10 w-10 p-0">
                    <Paperclip className="w-5 h-5" />
                  </Button>
                  <Textarea
                    placeholder="Écrivez votre message..."
                    className="resize-none"
                    rows={1}
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                  />
                  <Button className="bg-[#2302B3] hover:bg-[#1a0285] h-10 w-10 p-0">
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
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
