import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const COOKIE_NAME = 'dcn_admin_session'

export async function POST() {
  try {
    const cookieStore = await cookies()
    cookieStore.delete(COOKIE_NAME)

    return NextResponse.json({ success: true, message: 'Logout berhasil' })
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}
