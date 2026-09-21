import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '../../../../../../lib/auth';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Demo response
    const page = {
      id: params.id,
      status: 'PUBLISHED',
      publishedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      page,
    });
  } catch (error) {
    console.error('Publish page error:', error);
    return NextResponse.json({ error: 'Failed to publish page' }, { status: 500 });
  }
}