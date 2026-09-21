import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getFacultySession } from '../../../../lib/faculty-auth';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const s = getFacultySession();
  if (!s) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const params = req.nextUrl.searchParams;
    const subjectId = params.get('subjectId');
    const date = params.get('date');
    const period = params.get('period');
    if (subjectId && date && period) {
      const allowed = await prisma.facultySubject.findUnique({ where: { facultyId_subjectId: { facultyId: s.facultyId, subjectId } }, select: { subjectId: true } });
      if (!allowed) return NextResponse.json({ error: 'You are not assigned to this subject' }, { status: 403 });
      const records = await prisma.attendance.findMany({ where: { subjectId, date: new Date(date), period: Number(period), facultyId: s.facultyId }, select: { studentId: true, status: true } });
      return NextResponse.json({ records });
    }
    const assignments = await prisma.facultySubject.findMany({
      where: { facultyId: s.facultyId },
      include: { subject: { select: { id: true, code: true, name: true, credits: true, departmentId: true, semester: { select: { number: true, id: true } } } } },
    });
    return NextResponse.json({ subjects: assignments.map((x) => x.subject) });
  } catch {
    return NextResponse.json({ error: 'ERP database migration is required' }, { status: 503 });
  }
}

export async function POST(req: NextRequest) {
  const s = getFacultySession();
  if (!s) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const b = await req.json();
    if (!b.subjectId || !b.date || !b.period || !Array.isArray(b.records)) return NextResponse.json({ error: 'subjectId, date, period and records are required' }, { status: 400 });
    const allowed = await prisma.facultySubject.findUnique({ where: { facultyId_subjectId: { facultyId: s.facultyId, subjectId: b.subjectId } }, include: { subject: { select: { semesterId: true, departmentId: true } } } });
    if (!allowed) return NextResponse.json({ error: 'You are not assigned to this subject' }, { status: 403 });
    const ids = b.records.map((x: any) => String(x.studentId || '')).filter(Boolean);
    const students = await prisma.student.findMany({ where: { id: { in: ids }, status: 'ACTIVE', semesterId: allowed.subject.semesterId, departmentId: allowed.subject.departmentId }, select: { id: true } });
    const valid = new Set(students.map((x) => x.id));
    const rows = await prisma.$transaction(b.records.filter((x: any) => valid.has(String(x.studentId))).map((x: any) => prisma.attendance.upsert({ where: { studentId_subjectId_date_period: { studentId: x.studentId, subjectId: b.subjectId, date: new Date(b.date), period: Number(b.period) } }, update: { status: x.status, facultyId: s.facultyId }, create: { studentId: x.studentId, subjectId: b.subjectId, date: new Date(b.date), period: Number(b.period), status: x.status, facultyId: s.facultyId } })));
    return NextResponse.json({ success: true, count: rows.length });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Unable to save attendance' }, { status: 400 });
  }
}
