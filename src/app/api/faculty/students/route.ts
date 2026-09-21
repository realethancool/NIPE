import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getFacultySession } from '../../../../lib/faculty-auth';

const prisma = new PrismaClient();

export async function GET() {
  const session = getFacultySession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const assignments = await prisma.facultySubject.findMany({ where: { facultyId: session.facultyId }, select: { subject: { select: { semesterId: true, departmentId: true } } } });
    const pairs = assignments.map((x) => x.subject);
    if (!pairs.length) return NextResponse.json({ students: [] });
    const students = await prisma.student.findMany({
      where: { status: 'ACTIVE', OR: pairs.map((pair) => ({ semesterId: pair.semesterId, departmentId: pair.departmentId })) },
      select: { id: true, enrollmentNumber: true, name: true, email: true, phone: true, departmentId: true, programme: { select: { name: true, code: true } }, department: { select: { name: true, code: true } }, semester: { select: { number: true } } },
      orderBy: { name: 'asc' },
    });
    return NextResponse.json({ students });
  } catch (error) {
    console.error('Faculty students error:', error);
    return NextResponse.json({ error: 'Unable to load students' }, { status: 500 });
  }
}
