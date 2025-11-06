import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const adminToken = request.cookies.get('admin_access_token')
  const vendorToken = request.cookies.get('vendor_access_token')
  const customerToken = request.cookies.get('customer_access_token')

  const isAuthRoute =
    pathname.startsWith('/admin/signin') ||
    pathname.startsWith('/admin/signup') ||
    pathname.startsWith('/admin/forgot-password') ||
    pathname.startsWith('/vendor/signin') ||
    pathname.startsWith('/vendor/signup') ||
    pathname.startsWith('/vendor/forgot-password') ||
    pathname.startsWith('/customer/signin') ||
    pathname.startsWith('/customer/signup') ||
    pathname.startsWith('/customer/forgot-password')

  if (isAuthRoute) {
    if (adminToken) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    }
    if (vendorToken) {
      return NextResponse.redirect(new URL('/vendor/dashboard', request.url))
    }
    if (customerToken) {
      return NextResponse.redirect(new URL('/customer/dashboard', request.url))
    }
    const res = NextResponse.next()
    res.headers.set('Cache-Control', 'no-store')
    return NextResponse.next()
  }

  if (pathname.startsWith('/admin')) {
    if (!adminToken) {
      return NextResponse.redirect(new URL('/admin/signin', request.url))
    }
    return NextResponse.next()
  }

  if (pathname.startsWith('/vendor')) {
    if (!vendorToken) {
      return NextResponse.redirect(new URL('/vendor/signin', request.url))
    }
    return NextResponse.next()
  }

  if (pathname.startsWith('/customer')) {
    if (!customerToken) {
      return NextResponse.redirect(new URL('/customer/signin', request.url))
    }
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/vendor/:path*', '/customer/:path*'],
}
