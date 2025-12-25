import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const COOKIE_NAME = 'dcn_admin_session'

export async function GET() {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get(COOKIE_NAME)

    if (!sessionCookie) {
      return NextResponse.json({ authenticated: false })
    }

    try {
      const session = JSON.parse(Buffer.from(sessionCookie.value, 'base64').toString())
      
      if (session.authenticated && session.expires > Date.now()) {
        return NextResponse.json({ authenticated: true })
      }
    } catch {
      // Invalid session
    }

    return NextResponse.json({ authenticated: false })
  } catch (error) {
    console.error('Check auth error:', error)
    return NextResponse.json({ authenticated: false })
  }
}
