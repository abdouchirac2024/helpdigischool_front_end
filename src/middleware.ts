import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Routes that don't require authentication
const publicRoutes = [
  '/',
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/about',
  '/contact',
  '/features',
  '/pricing',
  '/api/health',
]

// Routes that require authentication
const protectedRoutes = ['/dashboard']

// Role-based route access
const roleRoutes: Record<string, string[]> = {
  admin: ['/dashboard/admin'],
  director: ['/dashboard/director'],
  teacher: ['/dashboard/teacher'],
  parent: ['/dashboard/parent'],
  secretary: ['/dashboard/secretary'],
  student: ['/dashboard/student'],
}

// Role to default dashboard mapping
const roleDashboards: Record<string, string> = {
  admin: '/dashboard/admin',
  director: '/dashboard/director',
  teacher: '/dashboard/teacher',
  parent: '/dashboard/parent',
  secretary: '/dashboard/secretary',
  student: '/dashboard/student',
}

// Extract subdomain from host header (e.g. "ecole-la-victoire.localhost:3000" → "ecole-la-victoire")
function getSubdomain(host: string | null): string | null {
  if (!host) return null
  const hostWithoutPort = host.split(':')[0]
  const parts = hostWithoutPort.split('.')
  // "ecole-la-victoire.localhost" → ["ecole-la-victoire", "localhost"] → subdomain
  // "localhost" → ["localhost"] → no subdomain
  // "ecole.helpdigischool.com" → ["ecole", "helpdigischool", "com"] → subdomain
  if (parts.length >= 2 && parts[parts.length - 1] !== 'com') {
    // Dev: *.localhost
    return parts.slice(0, -1).join('.')
  }
  if (parts.length >= 3 && parts[parts.length - 1] === 'com') {
    // Prod: *.helpdigischool.com
    return parts.slice(0, -2).join('.')
  }
  return null
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // --- Subdomain branding logic ---
  const host = request.headers.get('host')
  const subdomain = getSubdomain(host)

  if (subdomain) {
    // On subdomain root, redirect to /login
    if (pathname === '/') {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // --- Standard auth logic ---

  // Get auth token from HttpOnly cookie (access_token) or Authorization header
  const token =
    request.cookies.get('access_token')?.value ||
    request.headers.get('authorization')?.replace('Bearer ', '')

  // Check if the path is public
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith('/api/') || pathname.startsWith('/_next/')
  )

  // Allow public routes
  if (isPublicRoute) {
    // If user is authenticated and tries to access login/register, redirect to dashboard
    if (token && (pathname === '/login' || pathname === '/register')) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    // On /login with subdomain, pass the slug via response header
    if (subdomain && pathname === '/login') {
      const response = NextResponse.next()
      response.headers.set('x-school-slug', subdomain)
      return response
    }

    return NextResponse.next()
  }

  // Check if route requires authentication
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

  if (isProtectedRoute) {
    // No token - redirect to login
    if (!token) {
      const url = new URL('/login', request.url)
      url.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(url)
    }

    // Token exists - allow access
    // Role-based access control will be handled by the client-side AuthProvider
    // because we can't reliably decode JWT in edge middleware without a secret
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
