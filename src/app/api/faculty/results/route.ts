import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getFacultySession } from '../../../../lib/faculty-auth';

const prisma = new PrismaClient();

async function assignedSubject(facultyId: string, subjectId: string) {
  return prisma.facultySubject.findUnique({
    where: { facultyId_subjectId: { facultyId, subjectId } },
    include: { subject: { select: { id: true, departmentId: true, semesterId: true, semester: { select: { number: true } } } } },
  });
}

export async function GET(req: NextRequest) {
  const session = getFacultySession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const subjectId = req.nextUrl.searchParams.get('subjectId');
  const studentId = req.nextUrl.searchParams.get('studentId');
  if (!subjectId) return NextResponse.json({ error: 'subjectId is required' }, { status: 400 });

  try {
    const assignment = await assignedSubject(session.facultyId, subjectId);
    if (!assignment) return NextResponse.json({ error: 'You are not assigned to this subject' }, { status: 403 });
    const where: any = { semesterNumber: assignment.subject.semester.number };
    if (studentId) where.studentId = studentId;
    const results = await prisma.result.findMany({
      where,
      include: { student: { select: { id: true, enrollmentNumber: true, name: true, semesterId: true, departmentId: true } }, subjects: { where: { subjectId }, select: { id: true, marks: true, grade: true, gradePoint: true, credits: true } } },
      orderBy: { student: { name: 'asc' } },
    });
    const filtered = results.filter((r) => r.student.semesterId === assignment.subject.semesterId && r.student.departmentId === assignment.subject.departmentId);
    return NextResponse.json({ results: filtered });
  } catch (error) {
    console.error('Faculty results GET error:', error);
    return NextResponse.json({ error: 'Unable to load results' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = getFacultySession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const body = await req.json();
    const subjectId = String(body.subjectId || '');
    const records = Array.isArray(body.records) ? body.records : [];
    if (!subjectId || !records.length) return NextResponse.json({ error: 'subjectId and records are required' }, { status: 400 });
    const assignment = await assignedSubject(session.facultyId, subjectId);
    if (!assignment) return NextResponse.json({ error: 'You are not assigned to this subject' }, { status: 403 });

    const studentIds = records.map((r: any) => String(r.studentId || '')).filter(Boolean);
    const students = await prisma.student.findMany({ where: { id: { in: studentIds }, status: 'ACTIVE', semesterId: assignment.subject.semesterId, departmentId: assignment.subject.departmentId }, select: { id: true } });
    const allowedStudents = new Set(students.map((s) => s.id));

    const saved = await prisma.$transaction(async (tx) => {
      const output: any[] = [];
      for (const record of records) {
        const studentId = String(record.studentId || '');
        if (!allowedStudents.has(studentId)) continue;
        const result = await tx.result.upsert({
          where: { studentId_semesterNumber: { studentId, semesterNumber: assignment.subject.semester.number } },
          update: {},
          create: { studentId, semesterNumber: assignment.subject.semester.number, status: 'DRAFT' },
        });
        const row = await tx.resultSubject.upsert({
          where: { resultId_subjectId: { resultId: result.id, subjectId } },
          update: { marks: record.marks === '' || record.marks == null ? null : Number(record.marks), grade: record.grade ? String(record.grade) : null, gradePoint: record.gradePoint === '' || record.gradePoint == null ? null : Number(record.gradePoint), credits: Number(record.credits || 0) },
          create: { resultId: result.id, subjectId, marks: record.marks === '' || record.marks == null ? null : Number(record.marks), grade: record.grade ? String(record.grade) : null, gradePoint: record.gradePoint === '' || record.gradePoint == null ? null : Number(record.gradePoint), credits: Number(record.credits || 0) },
        });
        output.push(row);
      }
      return output;
    });
    return NextResponse.json({ success: true, count: saved.length, status: 'DRAFT' });
  } catch (error) {
    console.error('Faculty results POST error:', error);
    return NextResponse.json({ error: 'Unable to save results' }, { status: 400 });
  }
}
