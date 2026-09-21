type PdfData = Record<string, string | number | null | undefined>;

function pdfEscape(value: string) {
  return value.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
}

function wrap(text: string, max = 88) {
  const words = String(text || '').split(/\s+/);
  const lines: string[] = [];
  let line = '';
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > max && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines.length ? lines : [''];
}

export function createAdmissionPdf(data: PdfData) {
  const lines: string[] = [
    'NOBLE INSTITUTE OF PHYSICAL EDUCATION',
    'ADMISSION APPLICATION FORM',
    '-----------------------------------------------',
    `Application Number: ${data.applicationNumber || '-'}`,
    `Submitted: ${data.submittedAt || '-'}`,
    '',
    'STUDENT DETAILS',
    `Name: ${data.name || '-'}`,
    `Age: ${data.age ?? '-'}`,
    `Mobile Number: ${data.phone || '-'}`,
    `Email ID: ${data.email || '-'}`,
    `Preferred Course: ${data.preferredCourse || '-'}`,
    `Caste Category: ${data.caste || '-'}`,
    '',
    'DOCUMENTS SUBMITTED',
    `Caste Certificate: ${data.casteCertificate || 'Not applicable'}`,
    `10th Marksheet (SSC): ${data.tenthMarksheet || 'Not submitted'}`,
    `12th Marksheet (HSC): ${data.twelfthMarksheet || 'Not submitted'}`,
    `School Leaving Certificate: ${data.schoolLeaving || 'Not submitted'}`,
    `Income Certificate: ${data.incomeCertificate || 'Not submitted'}`,
    `Aadhar Card: ${data.aadharCard || 'Not submitted'}`,
    `Passport Size Photos: ${data.passportPhotos || 'Not submitted'}`,
    `Gujarat CET/ACPC Allotment Letter: ${data.allotmentLetter || 'Not provided'}`,
    `Non-Creamy Layer Certificate: ${data.nonCreamyLayer || 'Not provided'}`,
    '',
    'This document is a system-generated admission application receipt.',
  ];

  const content: string[] = ['BT', '/F1 12 Tf', '50 760 Td'];
  let first = true;
  for (const raw of lines) {
    for (const line of wrap(raw)) {
      if (!first) content.push('0 -18 Td');
      content.push(`(${pdfEscape(line)}) Tj`);
      first = false;
    }
  }
  content.push('ET');
  const stream = content.join('\n');

  const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
    `<< /Length ${Buffer.byteLength(stream, 'utf8')} >>\nstream\n${stream}\nendstream`,
  ];

  let pdf = '%PDF-1.4\n';
  const offsets: number[] = [0];
  for (let i = 0; i < objects.length; i++) {
    offsets.push(Buffer.byteLength(pdf, 'utf8'));
    pdf += `${i + 1} 0 obj\n${objects[i]}\nendobj\n`;
  }
  const xref = Buffer.byteLength(pdf, 'utf8');
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let i = 1; i <= objects.length; i++) {
    pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;

  return Buffer.from(pdf, 'utf8');
}
