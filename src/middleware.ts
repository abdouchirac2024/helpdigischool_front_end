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

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Get auth token from cookie or header
  const token =
    request.cookies.get('auth_token')?.value ||
    request.headers.get('authorization')?.replace('Bearer ', '')

  // Check if the path is public
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith('/api/') || pathname.startsWith('/_next/')
  )

  // Allow public routes
  if (isPublicRoute) {
    // If user is authenticated and tries to access login/register, redirect to dashboard
    if (token && (pathname === '/login' || pathname === '/register')) {
      // We need to decode the token to get the role
      // For now, redirect to generic dashboard which will handle role-based redirect
      return NextResponse.redirect(new URL('/dashboard', request.url))
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
