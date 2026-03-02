'use client'

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  ReactNode,
} from 'react'
import { Client, IMessage } from '@stomp/stompjs'
import SockJS from 'sockjs-client'
import { useAuth } from '@/lib/auth'
import { apiClient } from '@/lib/api/client'

// ---- Types ----

export interface PresenceUser {
  userId: number
  userEmail: string
  userName: string
  role: string
  status: 'ONLINE' | 'OFFLINE'
  device: string
  browser: string
  os: string
  ip: string
  connectedAt: string | null
  disconnectedAt: string | null
  lastSeenAt: string | null
  activeSessions: number
  sessionDuration: string | null
  sessionDurationSeconds: number
}

export interface PresenceEvent {
  type: 'USER_ONLINE' | 'USER_OFFLINE' | 'PRESENCE_UPDATE'
  userId: number
  userEmail: string
  userName: string
  role: string
  device: string
  browser: string
  os: string
  ip: string
  status: string
  onlineCount: number
  timestamp: string
  connectedAt: string | null
  disconnectedAt: string | null
  lastSeenAt: string | null
  sessionDuration: string | null
  sessionDurationSeconds: number
}

export interface PresenceContextType {
  /** Map userId -> PresenceUser for online users */
  onlineUsers: Map<number, PresenceUser>
  /** Map userId -> PresenceUser for recently disconnected users */
  offlineUsers: Map<number, PresenceUser>
  /** Total count of online users */
  onlineCount: number
  /** Check if a specific user is online */
  isUserOnline: (userId: number) => boolean
  /** Get presence info for a specific user (from cache or API) */
  getUserPresence: (userId: number) => PresenceUser | undefined
  /** Whether the WebSocket is connected */
  isConnected: boolean
  /** Last presence event received */
  lastEvent: PresenceEvent | null
}

const PresenceContext = createContext<PresenceContextType | undefined>(undefined)

// WebSocket backend URL (direct, not through Next.js proxy)
function getWsUrl(): string {
  if (typeof window === 'undefined') return ''
  const backendHost = process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:8080'
  return `${backendHost}/ws`
}

const HEARTBEAT_INTERVAL = 180_000 // 3 minutes

interface PresenceProviderProps {
  children: ReactNode
}

export function PresenceProvider({ children }: PresenceProviderProps) {
  const { isAuthenticated } = useAuth()

  const [onlineUsers, setOnlineUsers] = useState<Map<number, PresenceUser>>(new Map())
  const [offlineUsers, setOfflineUsers] = useState<Map<number, PresenceUser>>(new Map())
  const [onlineCount, setOnlineCount] = useState(0)
  const [isConnected, setIsConnected] = useState(false)
  const [lastEvent, setLastEvent] = useState<PresenceEvent | null>(null)

  const stompClientRef = useRef<Client | null>(null)
  const heartbeatIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Load initial presence data from REST API — cookies HttpOnly envoyés automatiquement
  const loadInitialPresence = useCallback(async () => {
    try {
      // Utilise validateStatus pour éviter les toasts sur 403 (non-admin)
      const response = await apiClient.instance.get('/presence/online', {
        validateStatus: (status) => status < 500,
      })

      if (response.status === 200) {
        const users: PresenceUser[] = response.data
        const map = new Map<number, PresenceUser>()
        users.forEach((u) => map.set(u.userId, u))
        setOnlineUsers(map)
        setOnlineCount(map.size)
      } else if (response.status === 403) {
        // Utilisateur non-admin : récupérer seulement le compteur
        const countResponse = await apiClient.instance.get('/presence/count', {
          validateStatus: (status) => status < 500,
        })
        if (countResponse.status === 200) {
          setOnlineCount(countResponse.data.count || 0)
        }
      }
    } catch (err) {
      console.warn('[Presence] Failed to load initial presence:', err)
    }
  }, [])

  // Handle incoming presence event
  const handlePresenceEvent = useCallback((event: PresenceEvent) => {
    setLastEvent(event)
    // Always update count from the server event - this is the authoritative count
    setOnlineCount(event.onlineCount)

    if (event.type === 'USER_ONLINE') {
      setOnlineUsers((prev) => {
        const next = new Map(prev)
        next.set(event.userId, {
          userId: event.userId,
          userEmail: event.userEmail,
          userName: event.userName,
          role: event.role || '',
          status: 'ONLINE',
          device: event.device || '',
          browser: event.browser || '',
          os: event.os || '',
          ip: event.ip || '',
          connectedAt: event.connectedAt || event.timestamp,
          disconnectedAt: null,
          lastSeenAt: event.timestamp,
          activeSessions: 1,
          sessionDuration: null,
          sessionDurationSeconds: 0,
        })
        return next
      })

      // Remove from offline users if they were there
      setOfflineUsers((prev) => {
        if (prev.has(event.userId)) {
          const next = new Map(prev)
          next.delete(event.userId)
          return next
        }
        return prev
      })
    } else if (event.type === 'USER_OFFLINE') {
      // Move user from online to offline with disconnect info
      setOnlineUsers((prev) => {
        if (prev.has(event.userId)) {
          const next = new Map(prev)
          const user = prev.get(event.userId)

          // Store in offline users with updated info
          setOfflineUsers((offPrev) => {
            const offNext = new Map(offPrev)
            offNext.set(event.userId, {
              userId: event.userId,
              userEmail: event.userEmail || user?.userEmail || '',
              userName: event.userName || user?.userName || '',
              role: event.role || user?.role || '',
              status: 'OFFLINE',
              device: event.device || user?.device || '',
              browser: event.browser || user?.browser || '',
              os: event.os || user?.os || '',
              ip: event.ip || user?.ip || '',
              connectedAt: event.connectedAt || user?.connectedAt || null,
              disconnectedAt: event.disconnectedAt || event.timestamp,
              lastSeenAt: event.lastSeenAt || event.timestamp,
              activeSessions: 0,
              sessionDuration: event.sessionDuration || null,
              sessionDurationSeconds: event.sessionDurationSeconds || 0,
            })
            return offNext
          })

          next.delete(event.userId)
          return next
        }

        // User wasn't in our online map but still went offline
        setOfflineUsers((offPrev) => {
          const offNext = new Map(offPrev)
          offNext.set(event.userId, {
            userId: event.userId,
            userEmail: event.userEmail,
            userName: event.userName,
            role: event.role || '',
            status: 'OFFLINE',
            device: event.device || '',
            browser: event.browser || '',
            os: event.os || '',
            ip: event.ip || '',
            connectedAt: event.connectedAt || null,
            disconnectedAt: event.disconnectedAt || event.timestamp,
            lastSeenAt: event.lastSeenAt || event.timestamp,
            activeSessions: 0,
            sessionDuration: event.sessionDuration || null,
            sessionDurationSeconds: event.sessionDurationSeconds || 0,
          })
          return offNext
        })

        return prev
      })
    }
  }, [])

  // Connect to WebSocket — obtient un ws-token court (5 min) via /api/auth/ws-token
  const connect = useCallback(() => {
    // Don't reconnect if already connected
    if (stompClientRef.current?.connected) return

    const wsUrl = getWsUrl()
    if (!wsUrl) return

    const client = new Client({
      webSocketFactory: () => new SockJS(wsUrl),

      // beforeConnect est appelé avant chaque tentative de connexion (y compris les reconnexions)
      // On récupère un token court stocké en mémoire React uniquement (jamais dans localStorage)
      beforeConnect: async () => {
        try {
          const data = await apiClient.get<{ wsToken: string; expiresIn: number }>('/auth/ws-token')
          client.connectHeaders = {
            Authorization: `Bearer ${data.wsToken}`,
          }
        } catch (err) {
          console.error('[Presence] Failed to get ws-token, aborting connection:', err)
          await client.deactivate()
        }
      },

      reconnectDelay: 5000,
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,

      onConnect: () => {
        setIsConnected(true)
        console.log('[Presence] WebSocket connected')

        // Subscribe to presence events
        client.subscribe('/topic/presence', (message: IMessage) => {
          try {
            const event: PresenceEvent = JSON.parse(message.body)
            handlePresenceEvent(event)
          } catch (err) {
            console.warn('[Presence] Failed to parse presence event:', err)
          }
        })

        // Subscribe to personal notifications (push temps réel)
        client.subscribe('/user/queue/notifications', (message: IMessage) => {
          try {
            const notif = JSON.parse(message.body)
            window.dispatchEvent(new CustomEvent('notification:new', { detail: notif }))
          } catch (err) {
            console.warn('[Presence] Failed to parse notification:', err)
          }
        })

        // Load initial data
        loadInitialPresence()

        // Start heartbeat
        if (heartbeatIntervalRef.current) {
          clearInterval(heartbeatIntervalRef.current)
        }
        heartbeatIntervalRef.current = setInterval(() => {
          if (client.connected) {
            client.publish({ destination: '/app/presence/heartbeat', body: '{}' })
          }
        }, HEARTBEAT_INTERVAL)
      },

      onDisconnect: () => {
        setIsConnected(false)
        console.log('[Presence] WebSocket disconnected')
      },

      onStompError: (frame) => {
        console.error('[Presence] STOMP error:', frame.headers['message'])
        setIsConnected(false)
      },

      onWebSocketError: (event) => {
        console.warn('[Presence] WebSocket error:', event)
        setIsConnected(false)
      },
    })

    stompClientRef.current = client
    client.activate()
  }, [handlePresenceEvent, loadInitialPresence])

  // Disconnect from WebSocket
  const disconnect = useCallback(() => {
    if (heartbeatIntervalRef.current) {
      clearInterval(heartbeatIntervalRef.current)
      heartbeatIntervalRef.current = null
    }
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current)
      reconnectTimeoutRef.current = null
    }
    if (stompClientRef.current) {
      stompClientRef.current.deactivate()
      stompClientRef.current = null
    }
    setIsConnected(false)
    setOnlineUsers(new Map())
    setOfflineUsers(new Map())
    setOnlineCount(0)
  }, [])

  // Auto-connect quand l'utilisateur est authentifié, déconnexion sinon
  useEffect(() => {
    if (isAuthenticated) {
      connect()
    } else {
      disconnect()
    }

    // Déconnexion same-tab (logout explicite)
    const handleLogout = () => disconnect()

    // Déconnexion multi-onglets : détecter la suppression de auth_user dans localStorage
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'auth_user' && !e.newValue) {
        disconnect()
      }
    }

    window.addEventListener('auth:logout', handleLogout)
    window.addEventListener('storage', handleStorage)

    return () => {
      window.removeEventListener('auth:logout', handleLogout)
      window.removeEventListener('storage', handleStorage)
      disconnect()
    }
  }, [isAuthenticated, connect, disconnect])

  // Public API
  const isUserOnline = useCallback((userId: number) => onlineUsers.has(userId), [onlineUsers])

  const getUserPresence = useCallback(
    (userId: number) => onlineUsers.get(userId) || offlineUsers.get(userId),
    [onlineUsers, offlineUsers]
  )

  const value: PresenceContextType = {
    onlineUsers,
    offlineUsers,
    onlineCount,
    isUserOnline,
    getUserPresence,
    isConnected,
    lastEvent,
  }

  return <PresenceContext.Provider value={value}>{children}</PresenceContext.Provider>
}

export function usePresence(): PresenceContextType {
  const context = useContext(PresenceContext)
  if (context === undefined) {
    throw new Error('usePresence must be used within a PresenceProvider')
  }
  return context
}

export { PresenceContext }
