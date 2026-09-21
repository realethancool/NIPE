import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { getSession } from '../../../../../lib/auth';

export const dynamic = 'force-dynamic';
const prisma = new PrismaClient();
const auth = () => Boolean(getSession());

export async function GET() {
  if (!auth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const [faculty, departments, subjects] = await Promise.all([
      prisma.faculty.findMany({ orderBy: { createdAt: 'desc' }, include: { department: true, facultySubjects: { include: { subject: true } } } }),
      prisma.department.findMany({ where: { active: true }, orderBy: { name: 'asc' } }),
      prisma.subject.findMany({ orderBy: { name: 'asc' } }),
    ]);
    return NextResponse.json({ faculty, departments, subjects });
  } catch (error) { console.error(error); return NextResponse.json({ error: 'Unable to load faculty data.' }, { status: 503 }); }
}

export async function POST(req: NextRequest) {
  if (!auth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const b = await req.json();
    for (const k of ['employeeNumber','name','email','password','departmentId']) if (!b[k]) return NextResponse.json({ error: `${k} is required` }, { status: 400 });
    const faculty = await prisma.faculty.create({ data: { employeeNumber: b.employeeNumber.trim(), name: b.name.trim(), email: b.email.trim(), passwordHash: await bcrypt.hash(b.password, 12), phone: b.phone?.trim() || null, departmentId: b.departmentId } });
    if (Array.isArray(b.subjectIds) && b.subjectIds.length) await prisma.facultySubject.createMany({ data: b.subjectIds.map((subjectId: string) => ({ facultyId: faculty.id, subjectId })) });
    return NextResponse.json({ faculty }, { status: 201 });
  } catch (error) { console.error(error); return NextResponse.json({ error: 'Unable to create faculty. Check employee number and email uniqueness.' }, { status: 400 }); }
}

export async function PATCH(req: NextRequest) {
  if (!auth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const b = await req.json(); if (!b.id) return NextResponse.json({ error: 'Faculty id is required' }, { status: 400 });
    const data: any = {}; for (const k of ['employeeNumber','name','email','phone','departmentId','status']) if (b[k] !== undefined) data[k] = b[k] === '' ? null : b[k];
    if (b.password) data.passwordHash = await bcrypt.hash(b.password, 12);
    const faculty = await prisma.faculty.update({ where: { id: b.id }, data });
    if (Array.isArray(b.subjectIds)) { await prisma.facultySubject.deleteMany({ where: { facultyId: b.id } }); if (b.subjectIds.length) await prisma.facultySubject.createMany({ data: b.subjectIds.map((subjectId: string) => ({ facultyId: b.id, subjectId })) }); }
    return NextResponse.json({ faculty });
  } catch (error) { console.error(error); return NextResponse.json({ error: 'Unable to update faculty.' }, { status: 400 }); }
}

export async function DELETE(req: NextRequest) {
  if (!auth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try { const id = new URL(req.url).searchParams.get('id'); if (!id) return NextResponse.json({ error: 'Faculty id is required' }, { status: 400 }); const faculty = await prisma.faculty.update({ where: { id }, data: { status: 'INACTIVE' } }); return NextResponse.json({ faculty }); }
  catch (error) { console.error(error); return NextResponse.json({ error: 'Unable to deactivate faculty.' }, { status: 400 }); }
}
