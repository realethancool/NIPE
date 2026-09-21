import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getSession } from '../../../../lib/auth';

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const session = getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const [pages, media, enquiries, news, events, students, faculty, departments, programmes, recentActivity] = await Promise.all([
      Promise.all([
        prisma.page.count({ where: { status: 'PUBLISHED' } }),
        prisma.page.count({ where: { status: 'DRAFT' } }),
        prisma.page.count(),
      ]).then(([published, draft, total]) => ({ published, draft, total })),
      prisma.media.count(),
      Promise.all([
        prisma.admissionEnquiry.count({ where: { status: 'pending' } }),
        prisma.admissionEnquiry.count({ where: { status: 'contacted' } }),
        prisma.admissionEnquiry.count({ where: { status: 'enrolled' } }),
        prisma.admissionEnquiry.count({ where: { status: 'rejected' } }),
        prisma.admissionEnquiry.count(),
      ]).then(([pending, contacted, enrolled, rejected, total]) => ({ pending, contacted, enrolled, rejected, total })),
      Promise.all([
        prisma.news.count({ where: { status: 'PUBLISHED' } }),
        prisma.news.count(),
      ]).then(([published, total]) => ({ published, total })),
      Promise.all([
        prisma.event.count({ where: { status: 'PUBLISHED' } }),
        prisma.event.count(),
      ]).then(([upcoming, total]) => ({ upcoming, total })),
      prisma.student.count(),
      prisma.faculty.count(),
      prisma.department.count({ where: { active: true } }),
      prisma.programme.count(),
      prisma.auditLog.findMany({
        take: 10,
        orderBy: { timestamp: 'desc' },
        include: { admin: { select: { username: true } } },
      }),
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        pages,
        media: { total: media },
        enquiries,
        news,
        events,
        erp: { students, faculty, departments, programmes },
      },
      recentActivity,
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    return NextResponse.json({ error: 'Failed to load dashboard data' }, { status: 500 });
  }
}
