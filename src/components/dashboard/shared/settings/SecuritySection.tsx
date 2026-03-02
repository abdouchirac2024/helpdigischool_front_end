'use client'

import { useState } from 'react'
import { Shield, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { apiClient } from '@/lib/api/client'
import { API_ENDPOINTS } from '@/lib/api/config'
import { toast } from 'sonner'

export default function SecuritySection() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [saving, setSaving] = useState(false)

  const handleChangePassword = async () => {
    // Client-side validation
    if (!currentPassword) {
      toast.error('Le mot de passe actuel est obligatoire')
      return
    }
    if (newPassword.length < 8) {
      toast.error('Le nouveau mot de passe doit contenir au moins 8 caracteres')
      return
    }
    if (newPassword !== confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas')
      return
    }
    if (newPassword === currentPassword) {
      toast.error("Le nouveau mot de passe doit etre different de l'ancien")
      return
    }

    setSaving(true)
    try {
      await apiClient.put(API_ENDPOINTS.users.changePassword, {
        currentPassword,
        newPassword,
        confirmPassword,
      })

      toast.success('Mot de passe modifie avec succes')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch {
      // Error toast is handled by the API client interceptor
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
        <div className="border-b border-gray-100 p-4">
          <h3 className="font-semibold text-gray-900">Securite du compte</h3>
          <p className="mt-1 text-sm text-gray-500">Protegez votre compte</p>
        </div>
        <div className="space-y-6 p-6">
          <div>
            <Label htmlFor="settings-currentPassword">Mot de passe actuel</Label>
            <Input
              id="settings-currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1.5"
            />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <Label htmlFor="settings-newPassword">Nouveau mot de passe</Label>
              <Input
                id="settings-newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1.5"
              />
              <p className="mt-1 text-xs text-gray-400">Minimum 8 caracteres</p>
            </div>
            <div>
              <Label htmlFor="settings-confirmPassword">Confirmer le mot de passe</Label>
              <Input
                id="settings-confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1.5"
              />
            </div>
          </div>

          <div className="flex justify-end border-t border-gray-200 pt-6">
            <Button
              onClick={handleChangePassword}
              disabled={saving}
              className="bg-primary hover:bg-primary-dark"
            >
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Changer le mot de passe
            </Button>
          </div>
        </div>
      </div>

      {/* 2FA Placeholder */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
              <Shield className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Authentification a deux facteurs</p>
              <p className="text-sm text-gray-500">Ajoutez une couche de securite supplementaire</p>
            </div>
          </div>
          <Button variant="outline" disabled>
            Bientot disponible
          </Button>
        </div>
      </div>
    </div>
  )
}
