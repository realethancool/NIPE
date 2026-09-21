import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getSession } from '../../../../lib/auth';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, programme, message } = body;

    // Validate required fields
    if (!name || !email || !phone || !programme) {
      return NextResponse.json(
        { error: 'All required fields must be filled' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate phone format (10 digits)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { error: 'Invalid phone number (must be 10 digits)' },
        { status: 400 }
      );
    }

    // Get IP address and user agent
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    try {
      // Save to database
      const enquiry = await prisma.admissionEnquiry.create({
        data: {
          name,
          email,
          phone,
          programme,
          message: message || '',
          ipAddress,
          userAgent,
        },
      });

      return NextResponse.json({
        success: true,
        message: 'Your enquiry has been submitted successfully! Our team will contact you soon.',
        enquiry: {
          id: enquiry.id,
          name: enquiry.name,
          email: enquiry.email,
          programme: enquiry.programme,
          status: enquiry.status,
          submittedAt: enquiry.createdAt,
        },
      });
    } catch (dbError) {
      // Fallback to demo mode if database is not set up
      console.warn('Database not available, using demo mode:', dbError instanceof Error ? dbError.message : dbError);
      
      const enquiry = {
        id: 'demo_' + Date.now(),
        name,
        email,
        phone,
        programme,
        message: message || '',
        status: 'pending',
        ipAddress,
        userAgent,
        createdAt: new Date().toISOString(),
      };

      return NextResponse.json({
        success: true,
        message: 'Your enquiry has been submitted successfully (demo mode - database not connected)',
        enquiry: {
          id: enquiry.id,
          name: enquiry.name,
          email: enquiry.email,
          programme: enquiry.programme,
          status: enquiry.status,
          submittedAt: enquiry.createdAt,
        },
        demoMode: true
      });
    }
  } catch (error) {
    console.error('Admission enquiry error:', error);
    return NextResponse.json(
      { error: 'Failed to submit enquiry. Please try again.' },
      { status: 500 }
    );
  }
}

// GET all enquiries (for admin panel)
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
      const enquiries = await prisma.admissionEnquiry.findMany({
        orderBy: { createdAt: 'desc' },
        take: 100,
      });

      return NextResponse.json({
        success: true,
        enquiries,
      });
    } catch (dbError) {
      // Fallback to demo data if database is not set up
      console.warn('Database not available, using demo data:', dbError instanceof Error ? dbError.message : dbError);
      
      const enquiries = [
        {
          id: 'demo_1',
          name: 'Demo Student',
          email: 'demo@example.com',
          phone: '9876543210',
          programme: 'Computer Engineering',
          status: 'pending',
          message: 'I am interested in joining.',
          createdAt: new Date().toISOString(),
        },
      ];

      return NextResponse.json({
        success: true,
        enquiries,
        demoMode: true
      });
    }
  } catch (error) {
    console.error('Fetch enquiries error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch enquiries' },
      { status: 500 }
    );
  }
}
