import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRY = '8h'; // 8 hours

function getJwtSecret(): string {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not configured');
  }

  return JWT_SECRET;
}

export function generateToken(payload: any): string {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: JWT_EXPIRY });
}

export function setSessionCookie(token: string) {
  const cookieStore = cookies();
  cookieStore.set('admin_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 8 * 60 * 60, // 8 hours
    path: '/',
  });
}

export function getSession() {
  const cookieStore = cookies();
  const token = cookieStore.get('admin_session');
  if (!token) return null;
  
  try {
    const payload = jwt.verify(token.value, getJwtSecret());
    return payload as any;
  } catch {
    return null;
  }
}

export function clearSession() {
  const cookieStore = cookies();
  cookieStore.delete('admin_session');
}

export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, getJwtSecret());
  } catch {
    return null;
  }
}
