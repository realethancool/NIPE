import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // TODO: Add authentication check
    // const session = getSession();
    // if (!session) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    // TODO: Uncomment when database is set up
    // const enquiry = await prisma.admissionEnquiry.findUnique({
    //   where: { id: params.id },
    // });

    // Demo data for now
    const enquiry = {
      id: params.id,
      name: 'Demo Student',
      email: 'demo@example.com',
      phone: '9876543210',
      programme: 'Computer Engineering',
      status: 'pending',
      message: 'I am interested in joining the Computer Engineering programme.',
      ipAddress: '192.168.1.1',
      userAgent: 'Mozilla/5.0...',
      createdAt: new Date().toISOString(),
    };

    if (!enquiry) {
      return NextResponse.json(
        { error: 'Enquiry not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      enquiry,
    });
  } catch (error) {
    console.error('Fetch enquiry error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch enquiry' },
      { status: 500 }
    );
  }
}
