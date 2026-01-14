import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/auth/register
 * Point d'entrée pour l'inscription d'une nouvelle école
 *
 * TODO: Connecter à l'API backend quand elle sera disponible
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // TODO: Remplacer par un appel à l'API backend
    // const response = await fetch(`${process.env.API_URL}/auth/register`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(body),
    // })

    return NextResponse.json(
      {
        message: 'API backend non configurée.',
        hint: 'L\'inscription mock est disponible dans auth-context.tsx'
      },
      { status: 501 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'Erreur lors de l\'inscription' },
      { status: 500 }
    )
  }
}