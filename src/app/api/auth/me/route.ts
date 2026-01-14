import { NextRequest, NextResponse } from 'next/server'

/**
 * GET /api/auth/me
 * Point d'entrée pour récupérer l'utilisateur connecté
 *
 * TODO: Connecter à l'API backend quand elle sera disponible
 */
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization')

    if (!authHeader) {
      return NextResponse.json(
        { message: 'Non autorisé' },
        { status: 401 }
      )
    }

    // TODO: Remplacer par un appel à l'API backend
    // const response = await fetch(`${process.env.API_URL}/auth/me`, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': authHeader
    //   },
    // })

    return NextResponse.json(
      {
        message: 'API backend non configurée.',
        hint: 'Les données utilisateur sont stockées localement'
      },
      { status: 501 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'Erreur lors de la récupération du profil' },
      { status: 500 }
    )
  }
}