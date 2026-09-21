import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '../../../../lib/auth';
import { sanitizeInput } from '../../../../lib/security';
import { prisma } from '../../../../lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function parseDate(value: unknown) {
  if (!value || typeof value !== 'string') return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export async function GET() {
  try {
    const session = getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const announcements = await prisma.announcement.findMany({
      orderBy: [{ priority: 'desc' }, { createdAt: 'desc' }],
    });

    return NextResponse.json({ announcements });
  } catch (error) {
    console.error('Fetch announcements error:', error);
    return NextResponse.json({ error: 'Failed to fetch announcements' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    if (!session.id) return NextResponse.json({ error: 'Invalid admin session' }, { status: 401 });

    const body = await request.json();
    const title = sanitizeInput(body.title || '');
    const shortDescription = sanitizeInput(body.shortDescription || '');
    const content = sanitizeInput(body.content || body.shortDescription || '');
    const category = sanitizeInput(body.category || 'General');
    const ctaText = body.ctaText ? sanitizeInput(body.ctaText) : null;
    const ctaUrl = body.ctaUrl ? sanitizeInput(body.ctaUrl) : null;
    const startDate = parseDate(body.startDate);
    const endDate = parseDate(body.endDate);
    const priority = Number.isFinite(Number(body.priority)) ? Number(body.priority) : 0;

    if (!title || !shortDescription) {
      return NextResponse.json({ error: 'Title and short description are required' }, { status: 400 });
    }

    if (body.startDate && !startDate) {
      return NextResponse.json({ error: 'Invalid start date' }, { status: 400 });
    }
    if (body.endDate && !endDate) {
      return NextResponse.json({ error: 'Invalid end date' }, { status: 400 });
    }
    if (startDate && endDate && endDate < startDate) {
      return NextResponse.json({ error: 'End date cannot be before start date' }, { status: 400 });
    }

    const announcement = await prisma.$transaction(async (tx) => {
      await tx.announcement.updateMany({
        where: { status: 'PUBLISHED' },
        data: { status: 'EXPIRED' },
      });

      return tx.announcement.create({
        data: {
          title,
          shortDescription,
          content,
          category,
          ctaText,
          ctaUrl,
          status: 'PUBLISHED',
          startDate,
          endDate,
          priority,
          createdById: session.id,
        },
      });
    });

    return NextResponse.json({ success: true, announcement }, { status: 201 });
  } catch (error) {
    console.error('Create announcement error:', error);
    return NextResponse.json({ error: 'Failed to create announcement' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const id = request.nextUrl.searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Announcement ID is required' }, { status: 400 });

    await prisma.announcement.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete announcement error:', error);
    return NextResponse.json({ error: 'Failed to delete announcement' }, { status: 500 });
  }
}
