import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    const { password } = await request.json()
    const adminPassword = process.env.ADMIN_PASSWORD || 'veigar'

    if (password === adminPassword) {
      // Crear cookie de sesión
      const cookieStore = await cookies()
      cookieStore.set('admin-auth', adminPassword, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 días
        path: '/'
      })

      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
