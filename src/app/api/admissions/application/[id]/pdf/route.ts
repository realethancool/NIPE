import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createAdmissionPdf } from '@/lib/admission-pdf';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const token = request.nextUrl.searchParams.get('token');
  const application = await prisma.admissionApplication.findUnique({ where: { id: params.id } });
  if (!application || !token || token !== application.publicToken) {
    return NextResponse.json({ error: 'Invalid application link' }, { status: 404 });
  }

  const pdf = createAdmissionPdf({
    applicationNumber: application.applicationNumber,
    submittedAt: application.createdAt.toLocaleString('en-IN'),
    name: application.name,
    age: application.age,
    phone: application.phone,
    email: application.email,
    preferredCourse: application.preferredCourse,
    caste: application.caste,
    casteCertificate: application.casteCertificateName,
    tenthMarksheet: application.tenthMarksheetName,
    twelfthMarksheet: application.twelfthMarksheetName,
    schoolLeaving: application.schoolLeavingName,
    incomeCertificate: application.incomeCertificateName,
    aadharCard: application.aadharCardName,
    passportPhotos: [application.passportPhoto1Name, application.passportPhoto2Name, application.passportPhoto3Name, application.passportPhoto4Name].filter(Boolean).join(', '),
    allotmentLetter: application.allotmentLetterName,
    nonCreamyLayer: application.nonCreamyLayerName,
  });

  return new NextResponse(pdf, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${application.applicationNumber}.pdf"`,
      'Cache-Control': 'no-store',
    },
  });
}
