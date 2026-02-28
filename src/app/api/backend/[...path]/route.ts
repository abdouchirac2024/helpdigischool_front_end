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
  // Conserver le query string (?status=INACTIVE, ?tenant=..., etc.)
  const url = `${BACKEND_URL}${backendPath}${request.nextUrl.search}`

  // Detect multipart requests (file uploads)
  const incomingContentType = request.headers.get('Content-Type') || ''
  const isMultipart = incomingContentType.includes('multipart/form-data')

  const headers: Record<string, string> = {
    Accept: 'application/json',
  }

  if (isMultipart) {
    // Forward the original Content-Type which includes the boundary parameter
    headers['Content-Type'] = incomingContentType
  } else {
    headers['Content-Type'] = 'application/json'
  }

  // Forward authorization header if present
  const authHeader = request.headers.get('Authorization')
  if (authHeader) {
    headers['Authorization'] = authHeader
  }

  // Forward cookies (required for HttpOnly JWT: access_token, refresh_token)
  const cookieHeader = request.headers.get('Cookie')
  if (cookieHeader) {
    headers['Cookie'] = cookieHeader
  }

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fetchOptions: any = {
      method: request.method,
      headers,
      signal: controller.signal,
    }

    // Add body for non-GET requests
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      if (isMultipart) {
        // Stream the raw body directly to the backend (preserves multipart encoding)
        fetchOptions.body = request.body
        fetchOptions.duplex = 'half'
      } else {
        try {
          const body = await request.text()
          if (body) {
            fetchOptions.body = body
          }
        } catch {
          // No body
        }
      }
    }

    const response = await fetch(url, fetchOptions)
    clearTimeout(timeoutId)

    // Handle 204 No Content (common for DELETE)
    if (response.status === 204) {
      return new NextResponse(null, { status: 204 })
    }

    const responseContentType = response.headers.get('Content-Type') || 'application/json'

    // Collect Set-Cookie headers from backend to forward to browser
    const setCookieHeaders = response.headers.getSetCookie?.() ?? []

    // For binary responses (images, files), forward as array buffer
    if (
      responseContentType.startsWith('image/') ||
      responseContentType === 'application/octet-stream'
    ) {
      const data = await response.arrayBuffer()
      const binaryResponse = new NextResponse(data, {
        status: response.status,
        headers: {
          'Content-Type': responseContentType,
          'Cache-Control': response.headers.get('Cache-Control') || 'public, max-age=86400',
        },
      })
      setCookieHeaders.forEach((cookie) => binaryResponse.headers.append('Set-Cookie', cookie))
      return binaryResponse
    }

    const data = await response.text()

    const nextResponse = new NextResponse(data || null, {
      status: response.status,
      headers: {
        'Content-Type': responseContentType,
      },
    })

    // Forward Set-Cookie headers (access_token, refresh_token from backend)
    setCookieHeaders.forEach((cookie) => nextResponse.headers.append('Set-Cookie', cookie))

    return nextResponse
  } catch (error) {
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
