import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getSession } from '../../../../../lib/auth';

export const dynamic = 'force-dynamic';
const prisma = new PrismaClient();
const auth = () => Boolean(getSession());

export async function GET() {
  if (!auth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const [departments, programmes, semesters, subjects] = await Promise.all([
      prisma.department.findMany({ orderBy: { name: 'asc' }, include: { _count: { select: { students: true, faculty: true, programmes: true, subjects: true } } } }),
      prisma.programme.findMany({ orderBy: { name: 'asc' }, include: { department: true, _count: { select: { students: true, semesters: true } } } }),
      prisma.semester.findMany({ orderBy: [{ programmeId: 'asc' }, { number: 'asc' }], include: { programme: true, _count: { select: { subjects: true, students: true } } } }),
      prisma.subject.findMany({ orderBy: { name: 'asc' }, include: { department: true, semester: { include: { programme: true } }, _count: { select: { facultySubjects: true, timetable: true } } } }),
    ]);
    return NextResponse.json({ departments, programmes, semesters, subjects });
  } catch (e) { console.error(e); return NextResponse.json({ error: 'Unable to load academic setup.' }, { status: 503 }); }
}

export async function POST(req: NextRequest) {
  if (!auth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const b = await req.json();
    if (!b.entity) return NextResponse.json({ error: 'entity is required' }, { status: 400 });
    let item;
    if (b.entity === 'department') {
      if (!b.name || !b.code) return NextResponse.json({ error: 'Department name and code are required' }, { status: 400 });
      item = await prisma.department.create({ data: { name: b.name.trim(), code: b.code.trim().toUpperCase() } });
    } else if (b.entity === 'programme') {
      if (!b.name || !b.code || !b.departmentId) return NextResponse.json({ error: 'Programme name, code and department are required' }, { status: 400 });
      item = await prisma.programme.create({ data: { name: b.name.trim(), code: b.code.trim().toUpperCase(), departmentId: b.departmentId } });
    } else if (b.entity === 'semester') {
      const number = Number(b.number); if (!b.programmeId || !number || number < 1) return NextResponse.json({ error: 'Programme and semester number are required' }, { status: 400 });
      item = await prisma.semester.create({ data: { number, programmeId: b.programmeId } });
    } else if (b.entity === 'subject') {
      const credits = Number(b.credits || 0); if (!b.code || !b.name || !b.departmentId || !b.semesterId) return NextResponse.json({ error: 'Subject code, name, department and semester are required' }, { status: 400 });
      item = await prisma.subject.create({ data: { code: b.code.trim().toUpperCase(), name: b.name.trim(), credits, departmentId: b.departmentId, semesterId: b.semesterId } });
    } else return NextResponse.json({ error: 'Unknown entity' }, { status: 400 });
    return NextResponse.json({ item }, { status: 201 });
  } catch (e) { console.error(e); return NextResponse.json({ error: 'Could not create record. Check unique codes and relationships.' }, { status: 400 }); }
}

export async function PATCH(req: NextRequest) {
  if (!auth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const b = await req.json(); if (!b.entity || !b.id) return NextResponse.json({ error: 'entity and id are required' }, { status: 400 });
    let item;
    if (b.entity === 'department') item = await prisma.department.update({ where: { id: b.id }, data: { name: b.name, code: b.code?.toUpperCase(), active: b.active } });
    else if (b.entity === 'programme') item = await prisma.programme.update({ where: { id: b.id }, data: { name: b.name, code: b.code?.toUpperCase(), departmentId: b.departmentId } });
    else if (b.entity === 'semester') item = await prisma.semester.update({ where: { id: b.id }, data: { number: Number(b.number), programmeId: b.programmeId } });
    else if (b.entity === 'subject') item = await prisma.subject.update({ where: { id: b.id }, data: { code: b.code?.toUpperCase(), name: b.name, credits: Number(b.credits || 0), departmentId: b.departmentId, semesterId: b.semesterId } });
    else return NextResponse.json({ error: 'Unknown entity' }, { status: 400 });
    return NextResponse.json({ item });
  } catch (e) { console.error(e); return NextResponse.json({ error: 'Could not update record.' }, { status: 400 }); }
}

export async function DELETE(req: NextRequest) {
  if (!auth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const entity = new URL(req.url).searchParams.get('entity'); const id = new URL(req.url).searchParams.get('id');
    if (!entity || !id) return NextResponse.json({ error: 'entity and id are required' }, { status: 400 });
    if (entity === 'department') await prisma.department.update({ where: { id }, data: { active: false } });
    else if (entity === 'programme') await prisma.programme.delete({ where: { id } });
    else if (entity === 'semester') await prisma.semester.delete({ where: { id } });
    else if (entity === 'subject') await prisma.subject.delete({ where: { id } });
    else return NextResponse.json({ error: 'Unknown entity' }, { status: 400 });
    return NextResponse.json({ success: true });
  } catch (e) { console.error(e); return NextResponse.json({ error: 'Could not remove record. It may still be referenced by students or academic records.' }, { status: 409 }); }
}
