/**
 * Types lies aux notifications in-app
 */

export type NotificationType = 'VALIDATION_ECOLE' | 'REJET_ECOLE' | 'INFO'

export interface AppNotification {
  id: number
  titre: string
  message: string
  type: NotificationType
  lu: boolean
  createdAt: string
}

/** Reponse du endpoint GET /notifications/unread/count */
export interface UnreadCountResponse {
  count: number
}
