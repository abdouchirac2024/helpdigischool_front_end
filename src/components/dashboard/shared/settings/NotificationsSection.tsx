'use client'

import { useState, useEffect, ReactNode } from 'react'
import { Mail, Phone, Bell } from 'lucide-react'

const STORAGE_KEY = 'notification_preferences'

interface NotificationsSectionProps {
  extraItems?: ReactNode
}

interface NotifPrefs {
  email: boolean
  sms: boolean
  push: boolean
}

function loadPrefs(): NotifPrefs {
  if (typeof window === 'undefined') return { email: true, sms: true, push: true }
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch {
    // ignore
  }
  return { email: true, sms: true, push: true }
}

function Toggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`h-6 w-12 rounded-full transition-colors ${enabled ? 'bg-primary' : 'bg-gray-300'}`}
    >
      <div
        className={`h-5 w-5 rounded-full bg-white shadow transition-transform ${enabled ? 'translate-x-6' : 'translate-x-0.5'}`}
      />
    </button>
  )
}

export default function NotificationsSection({ extraItems }: NotificationsSectionProps) {
  const [prefs, setPrefs] = useState<NotifPrefs>(loadPrefs)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs))
  }, [prefs])

  const toggle = (key: keyof NotifPrefs) => {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const items = [
    {
      key: 'email' as const,
      title: 'Notifications par email',
      desc: 'Recevoir les alertes par email',
      icon: Mail,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      key: 'sms' as const,
      title: 'Notifications SMS',
      desc: 'Recevoir les alertes urgentes par SMS',
      icon: Phone,
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      key: 'push' as const,
      title: 'Notifications push',
      desc: "Notifications dans l'application",
      icon: Bell,
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
  ]

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
      <div className="border-b border-gray-100 p-4">
        <h3 className="font-semibold text-gray-900">Preferences de notifications</h3>
        <p className="mt-1 text-sm text-gray-500">Choisissez comment vous souhaitez etre notifie</p>
      </div>
      <div className="space-y-4 p-6">
        {items.map((item) => {
          const Icon = item.icon
          return (
            <div
              key={item.key}
              className="flex items-center justify-between rounded-xl bg-gray-50 p-4"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${item.iconBg}`}
                >
                  <Icon className={`h-5 w-5 ${item.iconColor}`} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </div>
              <Toggle enabled={prefs[item.key]} onToggle={() => toggle(item.key)} />
            </div>
          )
        })}

        {extraItems}
      </div>
    </div>
  )
}
