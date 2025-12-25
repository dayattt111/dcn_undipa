import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const ADMIN_SECRET = process.env.ADMIN_SECRET_KEY || 'default_secret_change_this'
const COOKIE_NAME = 'dcn_admin_session'
const COOKIE_MAX_AGE = 60 * 60 * 24 // 24 hours

export async function POST(request: Request) {
  try {
    const { password } = await request.json()

    if (!password) {
      return NextResponse.json(
        { success: false, message: 'Password diperlukan' },
        { status: 400 }
      )
    }

    if (password !== ADMIN_SECRET) {
      return NextResponse.json(
        { success: false, message: 'Password salah' },
        { status: 401 }
      )
    }

    // Create a simple session token
    const sessionToken = Buffer.from(
      JSON.stringify({
        authenticated: true,
        timestamp: Date.now(),
        expires: Date.now() + COOKIE_MAX_AGE * 1000,
      })
    ).toString('base64')

    // Set secure cookie
    const cookieStore = await cookies()
    cookieStore.set(COOKIE_NAME, sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: COOKIE_MAX_AGE,
      path: '/',
    })

    return NextResponse.json({ success: true, message: 'Login berhasil' })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}
