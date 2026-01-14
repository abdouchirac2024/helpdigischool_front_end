import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/auth/login
 * Point d'entrée pour l'authentification
 *
 * TODO: Connecter à l'API backend quand elle sera disponible
 * Pour l'instant, l'authentification est gérée côté client avec des données mock
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // TODO: Remplacer par un appel à l'API backend
    // const response = await fetch(`${process.env.API_URL}/auth/login`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, password }),
    // })

    // Pour l'instant, retourner une erreur indiquant d'utiliser l'auth côté client
    return NextResponse.json(
      {
        message: 'API backend non configurée. Utilisez l\'authentification côté client.',
        hint: 'L\'authentification mock est disponible dans auth-context.tsx'
      },
      { status: 501 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'Erreur lors de la connexion' },
      { status: 500 }
    )
  }
}
