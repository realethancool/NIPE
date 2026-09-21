import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '../../../../lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const allowedCourses = ['Computer Engineering', 'Civil Engineering', 'Mechanical Engineering', 'Information Technology', 'Bachelor of Business Administration'];
const allowedCaste = ['SC', 'ST', 'OBC', 'General'];
const requiredFiles = ['tenthMarksheet', 'twelfthMarksheet', 'schoolLeaving', 'aadharCard', 'passportPhoto1', 'passportPhoto2', 'passportPhoto3', 'passportPhoto4'];
const maxDocumentBytes = 5 * 1024 * 1024;
const maxPhotoBytes = 2 * 1024 * 1024;

async function readFile(form: FormData, key: string, required = false) {
  const value = form.get(key);
  if (!(value instanceof File) || value.size === 0) {
    if (required) throw new Error(`${key} is required`);
    return null;
  }
  const max = key.startsWith('passportPhoto') ? maxPhotoBytes : maxDocumentBytes;
  if (value.size > max) throw new Error(`${key} is too large`);
  return { bytes: Buffer.from(await value.arrayBuffer()), name: value.name, mime: value.type || 'application/octet-stream' };
}

export async function POST(request: NextRequest) {
  try {
    const form = await request.formData();
    const name = String(form.get('name') || '').trim();
    const age = Number(form.get('age'));
    const phone = String(form.get('phone') || '').trim();
    const email = String(form.get('email') || '').trim().toLowerCase();
    const preferredCourse = String(form.get('preferredCourse') || '').trim();
    const caste = String(form.get('caste') || '').trim();

    if (!name || !Number.isInteger(age) || age < 14 || age > 60 || !phone || !email || !preferredCourse || !caste) return NextResponse.json({ error: 'Please complete all required student details.' }, { status: 400 });
    if (!allowedCourses.includes(preferredCourse)) return NextResponse.json({ error: 'Invalid course selected.' }, { status: 400 });
    if (!allowedCaste.includes(caste)) return NextResponse.json({ error: 'Invalid caste category.' }, { status: 400 });
    if (!/^[6-9]\d{9}$/.test(phone)) return NextResponse.json({ error: 'Enter a valid 10-digit mobile number.' }, { status: 400 });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 });

    const files: Record<string, Awaited<ReturnType<typeof readFile>>> = {};
    for (const key of requiredFiles) files[key] = await readFile(form, key, true);
    files.casteCertificate = (caste === 'SC' || caste === 'ST') ? await readFile(form, 'casteCertificate', true) : await readFile(form, 'casteCertificate');
    files.incomeCertificate = await readFile(form, 'incomeCertificate');
    files.allotmentLetter = await readFile(form, 'allotmentLetter');
    files.nonCreamyLayer = await readFile(form, 'nonCreamyLayer');

    const suffix = `${Date.now().toString().slice(-8)}${crypto.randomInt(100, 1000)}`;
    const applicationNumber = `NIT-ADM-${new Date().getFullYear()}-${suffix}`;
    const publicToken = crypto.randomBytes(24).toString('hex');
    const ipAddress = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const data: any = { applicationNumber, publicToken, name, age, phone, email, preferredCourse, caste, ipAddress, userAgent };
    for (const [key, file] of Object.entries(files)) if (file) { data[key] = file.bytes; data[`${key}Name`] = file.name; data[`${key}Mime`] = file.mime; }

    const application = await prisma.admissionApplication.create({ data });
    return NextResponse.json({ success: true, applicationNumber: application.applicationNumber, applicationId: application.id, pdfUrl: `/api/admissions/application/${application.id}/pdf?token=${application.publicToken}`, message: 'Application submitted successfully. Please download your application receipt.' }, { status: 201 });
  } catch (error) {
    console.error('Admission application error:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to submit application.' }, { status: 400 });
  }
}
