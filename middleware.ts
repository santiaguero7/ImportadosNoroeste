import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Si es una ruta de admin, verificar autenticación
  if (pathname.startsWith('/admin')) {
    const authToken = request.cookies.get('admin-auth')?.value
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'
    
    // Si no hay token o no coincide, redirigir a login
    if (!authToken || authToken !== adminPassword) {
      return NextResponse.redirect(new URL('/admin-login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}
