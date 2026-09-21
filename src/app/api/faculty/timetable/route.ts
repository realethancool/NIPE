import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getFacultySession } from '../../../../lib/faculty-auth';

const prisma = new PrismaClient();

export async function GET() {
  const session = getFacultySession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const timetable = await prisma.timetable.findMany({
      where: { facultyId: session.facultyId },
      include: { subject: { select: { code: true, name: true, semester: { select: { number: true } } } } },
      orderBy: [{ dayOfWeek: 'asc' }, { startTime: 'asc' }],
    });
    return NextResponse.json({ timetable });
  } catch (error) {
    console.error('Faculty timetable error:', error);
    return NextResponse.json({ error: 'Unable to load timetable' }, { status: 500 });
  }
}
