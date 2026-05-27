import { NextRequest, NextResponse } from 'next/server';

import { PROTECTED_ROUTES, AUTH_ROUTES, ROUTES } from './constants/routes';

/**
 * Combined Proxy for Authentication and Routing.
 *
 * Logic flow:
 * 1. Check if the path is protected or guest-only.
 * 2. Validate refreshToken/accessToken from cookies.
 * 3. Redirect accordingly with locale cookie persistence.
 * 4. i18n is handled via cookies/headers in the application layout, not URL prefixes.
 */
export default async function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Emergency Session Clear (Frontend fallback to clear HttpOnly cookie)
  // Prevents infinite redirect loop when the DB is dropped but browser still has the cookie.
  if (searchParams.get('clear_session') === '1') {
    const url = request.nextUrl.clone();
    url.searchParams.delete('clear_session');
    const response = NextResponse.redirect(url);
    if (request.cookies.has('refresh_token')) {
      response.cookies.delete('refresh_token');
    }
    return response;
  }

  // 1. Auth Logic
  // I use 'refresh_token' as indicator of a valid session (set by backend).
  const hasSession = request.cookies.has('refresh_token');

  // Check if route is protected
  const isProtectedRoute = PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  // Check if route is auth-only (login/register)
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname === route);

  // 2. Determine Response with Locale Persistence
  let response: NextResponse;

  if (isProtectedRoute && !hasSession) {
    // User is trying to access a protected route without a session
    const url = new URL(ROUTES.LOGIN, request.url);
    response = NextResponse.redirect(url);
  } else if (isAuthRoute && hasSession) {
    // User is logged in but trying to access login/register page
    const url = new URL(ROUTES.CHAT, request.url);
    response = NextResponse.redirect(url);
  } else {
    // Regular request
    response = NextResponse.next();
  }

  // Set default locale cookie if it doesn't exist (to help i18n/request.ts)
  // This ensures the cookie is set whether we are redirecting or proceeding
  if (!request.cookies.has('NEXT_LOCALE')) {
    response.cookies.set('NEXT_LOCALE', 'zh');
  }

  return response;
}

export const config = {
  // Match all pathnames except for
  // - /api (API routes)
  // - /_next (Next.js internals)
  // - /static, /favicon.ico, etc. (static files)
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
