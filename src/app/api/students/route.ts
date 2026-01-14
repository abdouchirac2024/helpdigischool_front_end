import { NextRequest, NextResponse } from 'next/server'

/**
 * API Routes pour la gestion des élèves
 *
 * GET /api/students - Liste des élèves
 * POST /api/students - Créer un élève
 *
 * TODO: Connecter à l'API backend quand elle sera disponible
 */

export async function GET(request: NextRequest) {
  try {
    // TODO: Remplacer par un appel à l'API backend
    // const authHeader = request.headers.get('Authorization')
    // const { searchParams } = new URL(request.url)
    // const response = await fetch(`${process.env.API_URL}/students?${searchParams}`, {
    //   headers: { 'Authorization': authHeader || '' },
    // })

    return NextResponse.json(
      {
        message: 'API backend non configurée.',
        data: [],
        meta: { currentPage: 1, totalPages: 0, totalItems: 0, itemsPerPage: 10 }
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'Erreur lors de la récupération des élèves' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // TODO: Remplacer par un appel à l'API backend

    return NextResponse.json(
      { message: 'API backend non configurée.' },
      { status: 501 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'Erreur lors de la création de l\'élève' },
      { status: 500 }
    )
  }
}