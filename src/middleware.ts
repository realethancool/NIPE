import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_PATHS = new Set([
  '/',
  '/admin/login',
  '/admin/forgot-password',
  '/admin/reset-password',
  '/student/login',
  '/faculty/login',
  '/api/auth/login',
  '/api/auth/forgot-password',
  '/api/auth/reset-password',
  '/api/student/login',
  '/api/faculty/login',
]);

function isPublicPath(pathname: string) {
  return PUBLIC_PATHS.has(pathname);
}

function base64UrlDecode(value: string) {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(value.length / 4) * 4, '=');
  return Uint8Array.from(atob(normalized), c => c.charCodeAt(0));
}

async function verifyJwt(token: string | undefined, expectedType?: string) {
  if (!token || !process.env.JWT_SECRET) return false;
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    const [encodedHeader, encodedPayload, encodedSignature] = parts;
    const header = JSON.parse(new TextDecoder().decode(base64UrlDecode(encodedHeader)));
    const payload = JSON.parse(new TextDecoder().decode(base64UrlDecode(encodedPayload)));
    if (header.alg !== 'HS256' || header.typ !== 'JWT') return false;
    if (expectedType && payload.type !== expectedType) return false;
    if (typeof payload.exp !== 'number' || payload.exp <= Math.floor(Date.now() / 1000)) return false;

    const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(process.env.JWT_SECRET), { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']);
    return await crypto.subtle.verify('HMAC', key, base64UrlDecode(encodedSignature), new TextEncoder().encode(`${encodedHeader}.${encodedPayload}`));
  } catch {
    return false;
  }
}

function securityHeaders(response: NextResponse) {
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  return response;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isPublicPath(pathname)) return securityHeaders(NextResponse.next());

  const isAdminRoute = pathname.startsWith('/admin') || pathname.startsWith('/api/admin');
  const isStudentRoute = pathname.startsWith('/student') || pathname.startsWith('/api/student');
  const isFacultyRoute = pathname.startsWith('/faculty') || pathname.startsWith('/api/faculty');

  if (isAdminRoute) {
    const valid = await verifyJwt(request.cookies.get('admin_session')?.value);
    if (!valid) {
      if (pathname.startsWith('/api/')) return securityHeaders(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }));
      return securityHeaders(NextResponse.redirect(new URL('/admin/login', request.url)));
    }
  }

  if (isStudentRoute) {
    const valid = await verifyJwt(request.cookies.get('student_session')?.value, 'student');
    if (!valid) {
      if (pathname.startsWith('/api/')) return securityHeaders(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }));
      return securityHeaders(NextResponse.redirect(new URL('/student/login', request.url)));
    }
  }

  if (isFacultyRoute) {
    const valid = await verifyJwt(request.cookies.get('faculty_session')?.value, 'faculty');
    if (!valid) {
      if (pathname.startsWith('/api/')) return securityHeaders(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }));
      return securityHeaders(NextResponse.redirect(new URL('/faculty/login', request.url)));
    }
  }

  return securityHeaders(NextResponse.next());
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*', '/student/:path*', '/api/student/:path*', '/faculty/:path*', '/api/faculty/:path*', '/api/auth/:path*'],
};
