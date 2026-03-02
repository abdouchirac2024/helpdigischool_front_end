/**
 * Route Next.js pour le téléchargement des fichiers depuis MongoDB GridFS
 * Proxy binaire-safe : utilise arrayBuffer() au lieu de text() pour ne pas corrompre les images/PDFs
 * Accès public : pas d'Authorization requise (les IDs MongoDB ObjectId sont impossibles à deviner)
 */

import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ fileId: string }> }
) {
  const { fileId } = await params
  const url = `${BACKEND_URL}/api/files/${fileId}`

  try {
    const response = await fetch(url, {
      method: 'GET',
    })

    if (!response.ok) {
      return new NextResponse(null, { status: response.status })
    }

    // Utiliser arrayBuffer() pour conserver les données binaires intactes (images, PDFs)
    const buffer = await response.arrayBuffer()

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'application/octet-stream',
        'Content-Disposition': response.headers.get('Content-Disposition') || 'inline',
        'Content-Length': String(buffer.byteLength),
        'Cache-Control': 'private, max-age=3600',
      },
    })
  } catch {
    return NextResponse.json(
      { error: 'Fichier introuvable ou serveur indisponible' },
      { status: 502 }
    )
  }
}
