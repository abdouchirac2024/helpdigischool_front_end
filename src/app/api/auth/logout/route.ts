import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080'

export async function POST(request: NextRequest) {
  const cookieHeader = request.headers.get('Cookie')

  // Appel backend pour révoquer le refresh token en base de données
  try {
    await fetch(`${BACKEND_URL}/api/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(cookieHeader ? { Cookie: cookieHeader } : {}),
      },
    })
  } catch {
    // Backend indisponible — on continue quand même le nettoyage local
  }

  // Effacement des cookies côté serveur Next.js (fiable — pas de dépendance au proxy)
  const response = NextResponse.json({ message: 'Déconnexion réussie' }, { status: 200 })
  response.cookies.set('access_token', '', { maxAge: 0, path: '/' })
  response.cookies.set('refresh_token', '', { maxAge: 0, path: '/' })
  return response
}
