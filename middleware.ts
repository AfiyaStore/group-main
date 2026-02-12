// 
import { NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

const publicPages = [
  '/',
  '/search',
  '/sign-in',
  '/sign-up',
  '/cart',
  '/product/(.*)',
  '/page/(.*)',
]

const intlMiddleware = createMiddleware(routing)

export function middleware(req: any) {
  const pathname = req.nextUrl.pathname

  // public page হলে next
  const isPublic = publicPages.some((p) => new RegExp(`^${p}$`).test(pathname))
  if (isPublic) return intlMiddleware(req)

  // logged in না হলে sign-in page এ redirect
  if (!req.auth) {
    const signInUrl = new URL(`/sign-in?callbackUrl=${encodeURIComponent(pathname)}`, req.nextUrl.origin)
    return NextResponse.redirect(signInUrl)
  }

  // logged in হলে i18n middleware চালাও
  return intlMiddleware(req)
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
