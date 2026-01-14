import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/auth/logout
 * Point d'entrée pour la déconnexion
 *
 * TODO: Connecter à l'API backend quand elle sera disponible
 */
export async function POST(request: NextRequest) {
  try {
    // TODO: Remplacer par un appel à l'API backend
    // const authHeader = request.headers.get('Authorization')
    // const response = await fetch(`${process.env.API_URL}/auth/logout`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': authHeader || ''
    //   },
    // })

    return NextResponse.json(
      { success: true, message: 'Déconnexion réussie' },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'Erreur lors de la déconnexion' },
      { status: 500 }
    )
  }
}