import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '../../../../lib/auth';
import { sanitizeInput } from '../../../../lib/security';

// GET all pages (demo mode)
export async function GET(request: NextRequest) {
  try {
    const session = getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Demo data
    const pages = [
      {
        id: '1',
        title: 'Home',
        slug: 'home',
        status: 'PUBLISHED',
        updatedAt: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'About',
        slug: 'about',
        status: 'PUBLISHED',
        updatedAt: new Date().toISOString(),
      },
    ];

    return NextResponse.json({ pages });
  } catch (error) {
    console.error('Fetch pages error:', error);
    return NextResponse.json({ error: 'Failed to fetch pages' }, { status: 500 });
  }
}

// POST create page (demo mode)
export async function POST(request: NextRequest) {
  try {
    const session = getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, slug } = body;

    if (!title || !slug) {
      return NextResponse.json({ error: 'Title and slug are required' }, { status: 400 });
    }

    // Demo response
    const page = {
      id: Date.now().toString(),
      title: sanitizeInput(title),
      slug: sanitizeInput(slug),
      status: 'DRAFT',
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      page,
    });
  } catch (error) {
    console.error('Create page error:', error);
    return NextResponse.json({ error: 'Failed to create page' }, { status: 500 });
  }
}