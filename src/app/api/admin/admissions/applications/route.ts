import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';
import { getSession } from '../../../../../lib/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(_request: NextRequest) {
  const session = getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const applications = await prisma.admissionApplication.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true, applicationNumber: true, name: true, age: true, phone: true, email: true,
      preferredCourse: true, caste: true, status: true, createdAt: true,
    },
    take: 500,
  });
  return NextResponse.json({ success: true, applications });
}
