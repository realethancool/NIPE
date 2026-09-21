import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '../../../../../lib/auth';
import { sanitizeInput } from '../../../../../lib/security';

// GET single page (demo mode)
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Demo page data
    const page = {
      id: params.id,
      title: 'Home',
      slug: 'home',
      status: 'PUBLISHED',
      content: {},
      seoTitle: 'Noble Institute of Physical Education',
      seoDescription: 'A future-focused institution',
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({ page });
  } catch (error) {
    console.error('Fetch page error:', error);
    return NextResponse.json({ error: 'Failed to fetch page' }, { status: 500 });
  }
}

// PUT update page (demo mode)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, slug, status } = body;

    // Demo response
    const updatedPage = {
      id: params.id,
      title: sanitizeInput(title) || 'Home',
      slug: sanitizeInput(slug) || 'home',
      status: status || 'PUBLISHED',
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      page: updatedPage,
    });
  } catch (error) {
    console.error('Update page error:', error);
    return NextResponse.json({ error: 'Failed to update page' }, { status: 500 });
  }
}

// DELETE page (demo mode)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete page error:', error);
    return NextResponse.json({ error: 'Failed to delete page' }, { status: 500 });
  }
}