import { NextRequest, NextResponse } from 'next/server'

/**
 * API Routes pour la gestion des paiements
 *
 * GET /api/payments - Liste des paiements
 * POST /api/payments - Enregistrer un paiement
 *
 * TODO: Connecter à l'API backend quand elle sera disponible
 */

export async function GET(request: NextRequest) {
  try {
    // TODO: Remplacer par un appel à l'API backend

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
      { message: 'Erreur lors de la récupération des paiements' },
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
      { message: 'Erreur lors de l\'enregistrement du paiement' },
      { status: 500 }
    )
  }
}