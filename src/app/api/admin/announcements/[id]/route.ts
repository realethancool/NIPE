import { NextRequest, NextResponse } from 'next/server';
import { ContentStatus } from '@prisma/client';
import { getSession } from '../../../../../lib/auth';
import { sanitizeInput } from '../../../../../lib/security';
import { prisma } from '../../../../../lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function parseDate(value: unknown) {
  if (!value || typeof value !== 'string') return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!getSession()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const announcement = await prisma.announcement.findUnique({ where: { id: params.id } });
    if (!announcement) return NextResponse.json({ error: 'Announcement not found' }, { status: 404 });
    return NextResponse.json({ announcement });
  } catch (error) {
    console.error('Fetch announcement error:', error);
    return NextResponse.json({ error: 'Failed to fetch announcement' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!getSession()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const data: Record<string, unknown> = {};

    if (body.title !== undefined) data.title = sanitizeInput(body.title);
    if (body.shortDescription !== undefined) data.shortDescription = sanitizeInput(body.shortDescription);
    if (body.content !== undefined) data.content = sanitizeInput(body.content);
    if (body.category !== undefined) data.category = sanitizeInput(body.category);
    if (body.ctaText !== undefined) data.ctaText = sanitizeInput(body.ctaText) || null;
    if (body.ctaUrl !== undefined) data.ctaUrl = sanitizeInput(body.ctaUrl) || null;
    if (body.startDate !== undefined) data.startDate = parseDate(body.startDate);
    if (body.endDate !== undefined) data.endDate = parseDate(body.endDate);
    if (body.priority !== undefined) data.priority = Number.isFinite(Number(body.priority)) ? Number(body.priority) : 0;

    if (body.startDate !== undefined && body.startDate && !data.startDate) {
      return NextResponse.json({ error: 'Invalid start date' }, { status: 400 });
    }
    if (body.endDate !== undefined && body.endDate && !data.endDate) {
      return NextResponse.json({ error: 'Invalid end date' }, { status: 400 });
    }

    const startDate = data.startDate as Date | null | undefined;
    const endDate = data.endDate as Date | null | undefined;
    if (startDate && endDate && endDate < startDate) {
      return NextResponse.json({ error: 'End date cannot be before start date' }, { status: 400 });
    }

    if (body.status !== undefined) {
      if (!Object.values(ContentStatus).includes(body.status)) {
        return NextResponse.json({ error: 'Invalid announcement status' }, { status: 400 });
      }
      data.status = body.status;
    }

    const announcement = await prisma.$transaction(async (tx) => {
      if (data.status === ContentStatus.PUBLISHED) {
        await tx.announcement.updateMany({
          where: { status: ContentStatus.PUBLISHED, id: { not: params.id } },
          data: { status: ContentStatus.EXPIRED },
        });
      }

      return tx.announcement.update({ where: { id: params.id }, data });
    });

    return NextResponse.json({ success: true, announcement });
  } catch (error) {
    console.error('Update announcement error:', error);
    return NextResponse.json({ error: 'Failed to update announcement' }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!getSession()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    await prisma.announcement.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete announcement error:', error);
    return NextResponse.json({ error: 'Failed to delete announcement' }, { status: 500 });
  }
}
