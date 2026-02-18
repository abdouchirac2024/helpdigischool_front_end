/**
 * API Route Proxy - Proxifie toutes les requêtes vers le backend Spring Boot
 * Résout les problèmes CORS en faisant passer les requêtes par le serveur Next.js
 *
 * Note: Le tenant est extrait automatiquement du JWT token par le backend (JwtAuthFilter)
 * Pas besoin d'envoyer X-Tenant-ID - le backend utilise le tenantId du token
 */

import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080'

async function handleRequest(request: NextRequest, path: string[]) {
  const backendPath = `/api/${path.join('/')}`
  const searchParams = request.nextUrl.searchParams.toString()
  const url = searchParams
    ? `${BACKEND_URL}${backendPath}?${searchParams}`
    : `${BACKEND_URL}${backendPath}`

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }

  // Forward authorization header if present (le backend extraira le tenant du JWT)
  const authHeader = request.headers.get('Authorization')
  if (authHeader) {
    headers['Authorization'] = authHeader
  }

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000)

    const fetchOptions: RequestInit = {
      method: request.method,
      headers,
      signal: controller.signal,
    }

    // Add body for non-GET requests
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      try {
        const body = await request.text()
        if (body) {
          fetchOptions.body = body
        }
      } catch {
        // No body
      }
    }

    const response = await fetch(url, fetchOptions)
    clearTimeout(timeoutId)

    // Handle 204 No Content (common for DELETE)
    if (response.status === 204) {
      return new NextResponse(null, { status: 204 })
    }

    const data = await response.text()

    return new NextResponse(data || null, {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'application/json',
      },
    })
  } catch (error) {
    // Check if it's an abort error (timeout)
    if (error instanceof Error && error.name === 'AbortError') {
      return NextResponse.json(
        {
          message: 'La requête a expiré. Le serveur met trop de temps à répondre.',
          error: 'Timeout',
        },
        { status: 504 }
      )
    }

    return NextResponse.json(
      {
        message: 'Erreur de connexion au serveur backend',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 502 }
    )
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params
  return handleRequest(request, path)
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params
  return handleRequest(request, path)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params
  return handleRequest(request, path)
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params
  return handleRequest(request, path)
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params
  return handleRequest(request, path)
}
