import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getStudentSession } from '../../../../lib/student-auth';
const prisma = new PrismaClient();
export async function GET() {
  const session = getStudentSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const student = await prisma.student.findUnique({ where: { id: session.studentId }, select: { id:true,enrollmentNumber:true,name:true,photoUrl:true,email:true,phone:true,age:true,address:true,department:{select:{id:true,name:true,code:true}},programme:{select:{id:true,name:true,code:true}},semester:{select:{number:true}},status:true } });
    if (!student || student.status !== 'ACTIVE') return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    return NextResponse.json({ student: { ...student, semester: student.semester.number } });
  } catch { return NextResponse.json({ error: 'ERP database migration is required' }, { status: 503 }); }
}
