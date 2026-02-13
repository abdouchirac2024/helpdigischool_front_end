import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080'
// Note : Le tenant est extrait automatiquement du JWT par le backend (JwtAuthFilter)

export async function proxyToBackend(
  request: NextRequest,
  path: string,
  options?: { method?: string }
): Promise<NextResponse> {
  const method = options?.method || request.method
  const url = `${BACKEND_URL}${path}`

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  const authHeader = request.headers.get('Authorization')
  if (authHeader) {
    headers['Authorization'] = authHeader
  }

  const cookie = request.headers.get('Cookie')
  if (cookie) {
    headers['Cookie'] = cookie
  }

  try {
    const fetchOptions: RequestInit = { method, headers }

    if (method !== 'GET' && method !== 'HEAD') {
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

    const responseHeaders = new Headers()
    const setCookie = response.headers.get('Set-Cookie')
    if (setCookie) {
      responseHeaders.set('Set-Cookie', setCookie)
    }
    responseHeaders.set('Content-Type', response.headers.get('Content-Type') || 'application/json')

    const data = await response.text()

    return new NextResponse(data, {
      status: response.status,
      headers: responseHeaders,
    })
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Erreur de connexion au serveur backend',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 502 }
    )
  }
}
