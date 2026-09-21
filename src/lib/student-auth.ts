import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const COOKIE = 'student_session';
function secret() { if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET is not configured'); return process.env.JWT_SECRET; }

export function createStudentSession(studentId: string) {
  const token = jwt.sign({ studentId, type: 'student' }, secret(), { expiresIn: '8h' });
  cookies().set(COOKIE, token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', maxAge: 8 * 60 * 60, path: '/' });
}

export function getStudentSession(): { studentId: string } | null {
  const token = cookies().get(COOKIE)?.value;
  if (!token) return null;
  try {
    const p = jwt.verify(token, secret()) as { studentId?: string; type?: string };
    return p.type === 'student' && p.studentId ? { studentId: p.studentId } : null;
  } catch {
    return null;
  }
}

export function clearStudentSession() { cookies().delete(COOKIE); }
