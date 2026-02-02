'use client'

import { useState } from 'react'
import { Save, type LucideIcon } from 'lucide-react'

interface SettingsSection {
  id: string
  label: string
  icon: LucideIcon
  content: React.ReactNode
}

interface SharedSettingsPageProps {
  role: string
  sections: SettingsSection[]
}

export default function SharedSettingsPage({ role, sections }: SharedSettingsPageProps) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id ?? '')

  const active = sections.find((s) => s.id === activeSection)

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90"
          style={{ backgroundColor: '#2302B3' }}
        >
          <Save className="h-4 w-4" />
          Enregistrer
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar nav */}
        <nav className="w-64 shrink-0 space-y-1 overflow-y-auto border-r border-gray-200 p-4">
          {sections.map((section) => {
            const Icon = section.icon
            const isActive = section.id === activeSection
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => setActiveSection(section.id)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
                style={isActive ? { backgroundColor: '#2302B3' } : undefined}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {section.label}
              </button>
            )
          })}
        </nav>

        {/* Content area */}
        <div className="flex-1 overflow-y-auto p-6">{active ? active.content : null}</div>
      </div>
    </div>
  )
}
