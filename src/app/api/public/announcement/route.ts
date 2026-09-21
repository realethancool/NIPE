import { NextResponse } from 'next/server';
import { ContentStatus } from '@prisma/client';
import { prisma } from '../../../../lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const announcement = await prisma.announcement.findFirst({
      where: { status: ContentStatus.PUBLISHED },
      orderBy: [{ priority: 'desc' }, { createdAt: 'desc' }],
      select: {
        id: true,
        title: true,
        shortDescription: true,
        ctaText: true,
        ctaUrl: true,
      },
    });

    return NextResponse.json(
      { announcement },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          Pragma: 'no-cache',
          Expires: '0',
        },
      }
    );
  } catch (error) {
    console.error('Public announcement error:', error);
    return NextResponse.json(
      { announcement: null, error: 'Failed to load announcement' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}
