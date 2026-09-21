import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '../../../../../lib/auth';
import { validateFileType, validateFileSize } from '../../../../../lib/security';

export async function POST(request: NextRequest) {
  try {
    const session = getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file
    if (!validateFileType(file)) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
    }

    if (!validateFileSize(file)) {
      return NextResponse.json({ error: 'File too large' }, { status: 400 });
    }

    // Demo response
    const media = {
      id: Date.now().toString(),
      filename: file.name,
      originalName: file.name,
      path: `/uploads/${file.name}`,
      size: file.size,
      mimeType: file.type,
    };

    return NextResponse.json({
      success: true,
      media,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}