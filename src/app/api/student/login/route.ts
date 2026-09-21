import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { createStudentSession } from '../../../../lib/student-auth';

const prisma = new PrismaClient();
export async function POST(request: NextRequest) {
  try {
    const { enrollmentNumber, password } = await request.json();
    if (!enrollmentNumber || !password) return NextResponse.json({ error: 'Enrollment number and password are required' }, { status: 400 });
    const student = await prisma.student.findUnique({ where: { enrollmentNumber }, select: { id: true, passwordHash: true, status: true } });
    if (!student || student.status !== 'ACTIVE' || !(await bcrypt.compare(password, student.passwordHash))) return NextResponse.json({ error: 'Invalid enrollment number or password' }, { status: 401 });
    createStudentSession(student.id);
    return NextResponse.json({ success: true });
  } catch (e) { console.error('Student login error', e); return NextResponse.json({ error: 'Student login is unavailable until the ERP database migration is applied' }, { status: 503 }); }
}
