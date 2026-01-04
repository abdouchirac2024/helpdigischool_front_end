/**
 * Types liés à la messagerie
 */

// Type de message
export type MessageType = 'direct' | 'announcement' | 'notification'

// Priorité du message
export type MessagePriority = 'low' | 'normal' | 'high' | 'urgent'

// Statut du message
export type MessageStatus = 'draft' | 'sent' | 'delivered' | 'read'

// Destinataire cible
export type RecipientType =
  | 'user'         // Utilisateur spécifique
  | 'class'        // Toute une classe (parents)
  | 'teachers'     // Tous les enseignants
  | 'parents'      // Tous les parents
  | 'all'          // Tout le monde

// Message
export interface Message {
  id: string
  schoolId: string
  senderId: string
  type: MessageType
  subject: string
  content: string
  priority: MessagePriority
  recipientType: RecipientType
  recipientIds?: string[] // IDs des destinataires spécifiques
  classIds?: string[] // IDs des classes ciblées
  attachments?: MessageAttachment[]
  status: MessageStatus
  sentAt?: Date
  createdAt: Date
  updatedAt: Date
}

// Pièce jointe
export interface MessageAttachment {
  id: string
  name: string
  url: string
  mimeType: string
  size: number // en bytes
}

// Réception de message
export interface MessageRecipient {
  id: string
  messageId: string
  recipientId: string
  isRead: boolean
  readAt?: Date
  isDeleted: boolean
  deletedAt?: Date
}

// Message avec infos expéditeur (pour affichage)
export interface MessageWithSender extends Message {
  senderName: string
  senderRole: string
  senderAvatar?: string
  isRead: boolean
}

// Conversation (thread de messages)
export interface Conversation {
  id: string
  participants: {
    userId: string
    name: string
    avatar?: string
    role: string
  }[]
  lastMessage?: {
    content: string
    senderId: string
    sentAt: Date
  }
  unreadCount: number
  createdAt: Date
  updatedAt: Date
}

// Annonce scolaire
export interface Announcement {
  id: string
  schoolId: string
  title: string
  content: string
  authorId: string
  authorName: string
  priority: MessagePriority
  targetAudience: RecipientType
  targetClassIds?: string[]
  isPinned: boolean
  expiresAt?: Date
  attachments?: MessageAttachment[]
  createdAt: Date
  updatedAt: Date
}

// Notification push
export interface Notification {
  id: string
  userId: string
  type: 'grade' | 'attendance' | 'payment' | 'message' | 'announcement' | 'system'
  title: string
  body: string
  data?: Record<string, unknown>
  isRead: boolean
  readAt?: Date
  createdAt: Date
}

// Préférences de notification
export interface NotificationPreferences {
  userId: string
  emailEnabled: boolean
  pushEnabled: boolean
  smsEnabled: boolean
  gradeNotifications: boolean
  attendanceNotifications: boolean
  paymentNotifications: boolean
  messageNotifications: boolean
  announcementNotifications: boolean
}