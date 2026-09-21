import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { getSession } from '../../../../../lib/auth';

export const dynamic = 'force-dynamic';
const prisma = new PrismaClient();

function authorized() { return Boolean(getSession()); }

export async function GET() {
  if (!authorized()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const [students, departments, programmes, semesters] = await Promise.all([
      prisma.student.findMany({ orderBy: { createdAt: 'desc' }, include: { department: true, programme: true, semester: true }, take: 500 }),
      prisma.department.findMany({ where: { active: true }, orderBy: { name: 'asc' } }),
      prisma.programme.findMany({ where: { department: { active: true } }, include: { department: true }, orderBy: { name: 'asc' } }),
      prisma.semester.findMany({ include: { programme: true }, orderBy: [{ programmeId: 'asc' }, { number: 'asc' }] }),
    ]);
    return NextResponse.json({ students, departments, programmes, semesters });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Unable to load ERP student data.' }, { status: 503 });
  }
}

export async function POST(req: NextRequest) {
  if (!authorized()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const b = await req.json();
    for (const k of ['enrollmentNumber', 'name', 'password', 'departmentId', 'programmeId', 'semesterId']) {
      if (!b[k]) return NextResponse.json({ error: `${k} is required` }, { status: 400 });
    }
    const student = await prisma.student.create({ data: {
      enrollmentNumber: b.enrollmentNumber.trim(), admissionNumber: b.admissionNumber?.trim() || null,
      name: b.name.trim(), passwordHash: await bcrypt.hash(b.password, 12), email: b.email?.trim() || null,
      phone: b.phone?.trim() || null, age: b.age ? Number(b.age) : null, address: b.address?.trim() || null,
      departmentId: b.departmentId, programmeId: b.programmeId, semesterId: b.semesterId,
      admissionYear: b.admissionYear ? Number(b.admissionYear) : null,
    }});
    return NextResponse.json({ student }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Unable to create student. Check enrollment, admission number and email uniqueness.' }, { status: 400 });
  }
}

export async function PATCH(req: NextRequest) {
  if (!authorized()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const b = await req.json();
    if (!b.id) return NextResponse.json({ error: 'Student id is required' }, { status: 400 });
    const data: any = {};
    for (const key of ['enrollmentNumber','admissionNumber','name','email','phone','address','departmentId','programmeId','semesterId']) if (b[key] !== undefined) data[key] = b[key] === '' ? null : b[key];
    for (const key of ['age','admissionYear']) if (b[key] !== undefined) data[key] = b[key] === '' ? null : Number(b[key]);
    if (b.status !== undefined) data.status = b.status;
    if (b.password) data.passwordHash = await bcrypt.hash(b.password, 12);
    const student = await prisma.student.update({ where: { id: b.id }, data, include: { department: true, programme: true, semester: true } });
    return NextResponse.json({ student });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Unable to update student. Check unique fields.' }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!authorized()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const id = new URL(req.url).searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Student id is required' }, { status: 400 });
    const student = await prisma.student.update({ where: { id }, data: { status: 'INACTIVE' } });
    return NextResponse.json({ student });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Unable to deactivate student.' }, { status: 400 });
  }
}
