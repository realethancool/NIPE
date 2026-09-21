import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../../lib/prisma';
import { getSession } from '../../../../../../lib/auth';
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const page = await prisma.page.findUnique({
      where: { id: params.id },
      include: {
        sections: {
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!page) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    return NextResponse.json({ page });
  } catch (error) {
    console.error('Preview page error:', error);
    return NextResponse.json({ error: 'Failed to fetch page' }, { status: 500 });
  }
}
