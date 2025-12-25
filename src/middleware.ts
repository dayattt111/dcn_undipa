import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const COOKIE_NAME = 'dcn_admin_session'

// Protected admin routes (except login page)
const protectedRoutes = [
  '/dcn-admin',
  '/dcn-admin/programs',
  '/dcn-admin/portfolio',
  '/dcn-admin/career',
  '/dcn-admin/leaderboard',
  '/dcn-admin/settings',
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if it's an admin route (excluding login)
  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + '/')
  )
  const isLoginPage = pathname === '/dcn-admin/login'

  if (isProtectedRoute && !isLoginPage) {
    // Check for auth cookie
    const sessionCookie = request.cookies.get(COOKIE_NAME)

    if (!sessionCookie) {
      // Redirect to login if no session
      const loginUrl = new URL('/dcn-admin/login', request.url)
      return NextResponse.redirect(loginUrl)
    }

    try {
      // Validate session
      const session = JSON.parse(Buffer.from(sessionCookie.value, 'base64').toString())

      if (!session.authenticated || session.expires < Date.now()) {
        // Session expired, redirect to login
        const loginUrl = new URL('/dcn-admin/login', request.url)
        const response = NextResponse.redirect(loginUrl)
        response.cookies.delete(COOKIE_NAME)
        return response
      }
    } catch {
      // Invalid session, redirect to login
      const loginUrl = new URL('/dcn-admin/login', request.url)
      const response = NextResponse.redirect(loginUrl)
      response.cookies.delete(COOKIE_NAME)
      return response
    }
  }

  // If authenticated user tries to access login page, redirect to dashboard
  if (isLoginPage) {
    const sessionCookie = request.cookies.get(COOKIE_NAME)
    if (sessionCookie) {
      try {
        const session = JSON.parse(Buffer.from(sessionCookie.value, 'base64').toString())
        if (session.authenticated && session.expires > Date.now()) {
          const dashboardUrl = new URL('/dcn-admin', request.url)
          return NextResponse.redirect(dashboardUrl)
        }
      } catch {
        // Invalid session, allow access to login
      }
    }
  }

  // Add security headers
  const response = NextResponse.next()

  // Prevent admin pages from being indexed
  if (pathname.startsWith('/dcn-admin')) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow')
  }

  return response
}

export const config = {
  matcher: ['/dcn-admin/:path*'],
}
